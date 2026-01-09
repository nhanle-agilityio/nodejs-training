import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text", nullable: true })
    bio: string

    @Column({ nullable: true })
    avatar: string

    @Column({ nullable: true })
    website: string

    @OneToOne(() => User, user => user.profile)
    user: User
}
