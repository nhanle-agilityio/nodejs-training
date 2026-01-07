import express, { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

const app = express()
app.use(express.json())

const PORT = 3000

try {
    AppDataSource.initialize()
    console.log("Data Source has been initialized!")

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
} catch (error) {
    console.error("Error during Data Source initialization:", error)
}


// GET /users - Get all users
app.get("/users", async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" })
    }
})

// GET /users/:id - Get user by ID
app.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) })
        
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" })
    }
})

// POST /users - Create a new user
app.post("/users", async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const { firstName, lastName, age, isActive } = req.body

        const user = new User()
        user.firstName = firstName
        user.lastName = lastName
        user.age = age
        user.isActive = isActive !== undefined ? isActive : true

        const savedUser = await userRepository.save(user)
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" })
    }
})
