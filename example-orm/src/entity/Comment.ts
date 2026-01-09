import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { Post } from "./Post"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    content: string

    @Column()
    authorName: string

    @ManyToOne(() => Post, post => post.comments)
    post: Post

    @CreateDateColumn()
    createdAt: Date
}
