# Node.js Training

A comprehensive Node.js training project with progressive exercises covering fundamental concepts and practical applications.

## 📚 Overview

This project contains a series of exercises designed to help you learn Node.js from the ground up. Each exercise builds upon previous concepts and introduces new topics progressively.

## 🚀 Getting Started

### Prerequisites

- Node.js installed (version 14 or higher recommended)
- Basic knowledge of JavaScript

### Installation

1. Clone or download this repository
2. Navigate to the project directory:

   ```bash
   cd nodejs-training
   ```

3. No dependencies required! This project uses only Node.js built-in modules.

## 📖 Exercises

### Exercise 1: Basic Node.js Concepts

**Run:** `npm run exercise1`

Learn about:

- Console methods
- Process object
- Environment variables
- Timers (setTimeout, setInterval)

### Exercise 2: File System Operations

**Run:** `npm run exercise2`

Learn about:

- Reading files (sync and async)
- Writing files
- Working with directories
- File paths

### Exercise 3: HTTP Server Basics

**Run:** `npm run exercise3`

Learn about:

- Creating HTTP servers
- Handling requests and responses
- URL parsing
- HTTP methods and status codes

**Note:** This starts a server on `http://localhost:3000`. Open it in your browser!

### Exercise 4: Modules and Exports

**Run:** `npm run exercise4`

Learn about:

- Creating custom modules
- Exporting functions and objects
- Requiring modules
- CommonJS module system

### Exercise 5: Async/Await and Promises

**Run:** `npm run exercise5`

Learn about:

- Callbacks
- Promises
- Async/await syntax
- Error handling
- Parallel vs sequential execution

### Exercise 6: Simple REST API

**Run:** `npm run exercise6`

Learn about:

- Building a REST API
- Handling different HTTP methods
- JSON parsing
- CRUD operations

**Note:** This starts a server on `http://localhost:3001`. Visit `/api/docs` for API documentation.

## 🎯 Learning Path

1. Start with **Exercise 1** to understand Node.js basics
2. Move to **Exercise 2** to learn file operations
3. Try **Exercise 3** to build your first web server
4. Explore **Exercise 4** to understand module system
5. Master **Exercise 5** for asynchronous programming
6. Build **Exercise 6** to create a REST API

## 📝 Project Structure

```
nodejs-training/
├── exercises/
│   ├── 01-basics.js          # Basic Node.js concepts
│   ├── 02-filesystem.js      # File system operations
│   ├── 03-http-server.js     # HTTP server basics
│   ├── 04-modules.js         # Modules and exports
│   ├── 05-async-await.js     # Async programming
│   ├── 06-rest-api.js        # REST API
│   └── utils/                # Custom modules
│       ├── mathUtils.js
│       ├── stringUtils.js
│       ├── greeter.js
│       └── Calculator.js
├── data/                     # Generated data files (created by exercises)
├── index.js                  # Main entry point
├── package.json              # Project configuration
└── README.md                 # This file
```

## 💡 Tips

- Read the comments in each exercise file - they explain what's happening
- Experiment by modifying the code to see what happens
- Try to solve problems before looking at solutions
- Use Node.js documentation: https://nodejs.org/docs/

## 🔧 Available Commands

- `npm start` - Show welcome message and available exercises
- `npm run exercise1` - Run Exercise 1
- `npm run exercise2` - Run Exercise 2
- `npm run exercise3` - Run Exercise 3 (starts HTTP server)
- `npm run exercise4` - Run Exercise 4
- `npm run exercise5` - Run Exercise 5
- `npm run exercise6` - Run Exercise 6 (starts REST API server)

## 📚 Next Steps

After completing these exercises, consider learning:

- Express.js framework
- Database integration (MongoDB, PostgreSQL)
- Authentication and authorization
- Testing (Jest, Mocha)
- Deployment and production best practices

## 🤝 Contributing

Feel free to modify and extend these exercises to suit your learning needs!

## 📄 License

ISC

---

Happy learning! 🎉
