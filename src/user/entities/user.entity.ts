import { Comment } from "src/comment/entities/comment.entity";
import { Like } from "src/like/entities/like.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true})
    email: string

    @Column()
    name: string

    @Column({ nullable: true})
    bio: string

    @Column({ nullable: true })
    avatar: string

    @Column()
    password: string

    @Column({ nullable: true})
    hashedRefreshToken: string

    @Column({ default: 'user'})
    role: string

    @OneToMany(() => Post, post => post.author)
    posts: Post[]

    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[]

    @OneToMany(() => Like, like => like.user)
    likes: Like[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}
