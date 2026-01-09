import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Profile } from "./entity/Profile"
import { Post } from "./entity/Post"
import { Comment } from "./entity/Comment"
import { Category } from "./entity/Category"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    logging: false,
    entities: [User, Profile, Post, Comment, Category],
    migrations: ["src/migration/*.ts"],
    migrationsTableName: "migrations",
    migrationsRun: false,
    subscribers: [],
})
