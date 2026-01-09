import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { User } from "./User"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @ManyToMany(() => User, user => user.categories)
    users: User[]
}
