/**
 * Exercise 6: Simple REST API
 *
 * Learn about:
 * - Building a REST API
 * - Handling different HTTP methods
 * - JSON parsing
 * - CRUD operations
 * - Status codes
 */

const http = require("http");
const url = require("url");

console.log("🚀 Exercise 6: Simple REST API\n");

// Simple in-memory database
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

let nextId = 4;

// Helper function to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Helper function to send JSON response
function sendJSON(res, statusCode, data) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(statusCode);
  res.end(JSON.stringify(data, null, 2));
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS request (CORS preflight)
  if (method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route: GET /api/users - Get all users
  if (pathname === "/api/users" && method === "GET") {
    sendJSON(res, 200, { success: true, data: users });
    return;
  }

  // Route: GET /api/users/:id - Get user by ID
  if (pathname.startsWith("/api/users/") && method === "GET") {
    const id = parseInt(pathname.split("/")[3]);
    const user = users.find((u) => u.id === id);

    if (user) {
      sendJSON(res, 200, { success: true, data: user });
    } else {
      sendJSON(res, 404, { success: false, message: "User not found" });
    }
    return;
  }

  // Route: POST /api/users - Create new user
  if (pathname === "/api/users" && method === "POST") {
    try {
      const body = await parseBody(req);
      const { name, email } = body;

      if (!name || !email) {
        sendJSON(res, 400, {
          success: false,
          message: "Name and email are required",
        });
        return;
      }

      const newUser = {
        id: nextId++,
        name,
        email,
      };

      users.push(newUser);
      sendJSON(res, 201, { success: true, data: newUser });
    } catch (err) {
      sendJSON(res, 400, { success: false, message: "Invalid JSON" });
    }
    return;
  }

  // Route: PUT /api/users/:id - Update user
  if (pathname.startsWith("/api/users/") && method === "PUT") {
    try {
      const id = parseInt(pathname.split("/")[3]);
      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex === -1) {
        sendJSON(res, 404, { success: false, message: "User not found" });
        return;
      }

      const body = await parseBody(req);
      const { name, email } = body;

      if (name) users[userIndex].name = name;
      if (email) users[userIndex].email = email;

      sendJSON(res, 200, { success: true, data: users[userIndex] });
    } catch (err) {
      sendJSON(res, 400, { success: false, message: "Invalid JSON" });
    }
    return;
  }

  // Route: DELETE /api/users/:id - Delete user
  if (pathname.startsWith("/api/users/") && method === "DELETE") {
    const id = parseInt(pathname.split("/")[3]);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      sendJSON(res, 404, { success: false, message: "User not found" });
      return;
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    sendJSON(res, 200, { success: true, data: deletedUser });
    return;
  }

  // Route: GET /api/docs - API documentation
  if (pathname === "/api/docs" && method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`
            <html>
                <head>
                    <title>REST API Documentation</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        h1 { color: #333; }
                        .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
                        code { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; }
                    </style>
                </head>
                <body>
                    <h1>REST API Documentation</h1>
                    <h2>Endpoints:</h2>
                    
                    <div class="endpoint">
                        <h3>GET /api/users</h3>
                        <p>Get all users</p>
                        <code>curl http://localhost:3001/api/users</code>
                    </div>

                    <div class="endpoint">
                        <h3>GET /api/users/:id</h3>
                        <p>Get user by ID</p>
                        <code>curl http://localhost:3001/api/users/1</code>
                    </div>

                    <div class="endpoint">
                        <h3>POST /api/users</h3>
                        <p>Create new user</p>
                        <code>curl -X POST http://localhost:3001/api/users -H "Content-Type: application/json" -d '{"name":"John","email":"john@example.com"}'</code>
                    </div>

                    <div class="endpoint">
                        <h3>PUT /api/users/:id</h3>
                        <p>Update user</p>
                        <code>curl -X PUT http://localhost:3001/api/users/1 -H "Content-Type: application/json" -d '{"name":"Alice Updated"}'</code>
                    </div>

                    <div class="endpoint">
                        <h3>DELETE /api/users/:id</h3>
                        <p>Delete user</p>
                        <code>curl -X DELETE http://localhost:3001/api/users/1</code>
                    </div>
                </body>
            </html>
        `);
    return;
  }

  // 404 for unknown routes
  sendJSON(res, 404, { success: false, message: "Route not found" });
});

// Start server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ REST API Server is running on http://localhost:${PORT}`);
  console.log(`   API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`   Test endpoints: http://localhost:${PORT}/api/users`);
  console.log(`   Press Ctrl+C to stop the server\n`);

  console.log("Example commands to test the API:");
  console.log("  curl http://localhost:3001/api/users");
  console.log("  curl http://localhost:3001/api/users/1");
  console.log(
    '  curl -X POST http://localhost:3001/api/users -H "Content-Type: application/json" -d \'{"name":"John","email":"john@example.com"}\'',
  );
  console.log("");
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `❌ Port ${PORT} is already in use. Please use a different port.`,
    );
  } else {
    console.error("Server error:", err);
  }
});

