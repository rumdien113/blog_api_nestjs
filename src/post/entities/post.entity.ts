import { Comment } from "src/comment/entities/comment.entity";
import { Like } from "src/like/entities/like.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: true })
    slug: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ nullable: true})
    thumbnnail: string;

    @Column({ default: true})
    published: boolean;

    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE'})
    author: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @ManyToMany(() => Tag, tag => tag.posts)
    @JoinTable()
    tags: Tag[];

    @OneToMany(() => Like, Like => Like.post)
    likes: Like[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
