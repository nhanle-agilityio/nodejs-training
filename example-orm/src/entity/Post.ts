import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column("text")
    content: string

    @ManyToOne(() => User, user => user.posts)
    author: User

    @OneToMany(() => Comment, comment => comment.post, { cascade: true })
    comments: Comment[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
