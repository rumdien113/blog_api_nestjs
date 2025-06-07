# --- BASE ---
FROM node:22-alpine AS base
LABEL author="Rumdien113"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- BUILD APP ---
FROM base AS build
LABEL author="Rumdien113"
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- PRODUCTION ---
FROM node:22-alpine AS prod
LABEL author="Rumdien113"
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/main"]