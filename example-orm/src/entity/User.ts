import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, ManyToMany, JoinColumn, JoinTable } from "typeorm"
import { Profile } from "./Profile"
import { Post } from "./Post"
import { Category } from "./Category"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column({ default: true })
    isActive: boolean

    // One-to-One relation with Profile
    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn()
    profile: Profile

    // One-to-Many relation with Post
    @OneToMany(() => Post, post => post.author)
    posts: Post[]

    // Many-to-Many relation with Category
    @ManyToMany(() => Category, category => category.users)
    @JoinTable()
    categories: Category[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
