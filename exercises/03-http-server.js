/**
 * Exercise 3: HTTP Server Basics
 *
 * Learn about:
 * - Creating HTTP servers
 * - Handling requests and responses
 * - URL parsing
 * - HTTP methods
 * - Status codes
 */

const http = require("http");
const url = require("url");

console.log("🌐 Exercise 3: HTTP Server Basics\n");

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Set response headers
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  // Handle different routes
  if (pathname === "/") {
    res.writeHead(200);
    res.end(`
            <html>
                <head><title>Node.js Training - HTTP Server</title></head>
                <body>
                    <h1>Welcome to Node.js HTTP Server!</h1>
                    <h2>Available Routes:</h2>
                    <ul>
                        <li><a href="/hello">/hello</a> - Simple greeting</li>
                        <li><a href="/info">/info</a> - Request information</li>
                        <li><a href="/time">/time</a> - Current time</li>
                        <li><a href="/data?name=John&age=25">/data?name=John&age=25</a> - Query parameters example</li>
                    </ul>
                </body>
            </html>
        `);
  } else if (pathname === "/hello") {
    res.writeHead(200);
    res.end("<h1>Hello from Node.js Server!</h1>");
  } else if (pathname === "/info") {
    res.writeHead(200);
    res.end(`
            <html>
                <head><title>Request Info</title></head>
                <body>
                    <h1>Request Information</h1>
                    <p><strong>Method:</strong> ${req.method}</p>
                    <p><strong>URL:</strong> ${req.url}</p>
                    <p><strong>Pathname:</strong> ${pathname}</p>
                    <p><strong>Query:</strong> ${JSON.stringify(query)}</p>
                    <p><strong>Headers:</strong></p>
                    <pre>${JSON.stringify(req.headers, null, 2)}</pre>
                </body>
            </html>
        `);
  } else if (pathname === "/time") {
    res.writeHead(200);
    res.end(`
            <html>
                <head><title>Current Time</title></head>
                <body>
                    <h1>Current Time</h1>
                    <p>Server time: ${new Date().toISOString()}</p>
                    <p>Local time: ${new Date().toString()}</p>
                </body>
            </html>
        `);
  } else if (pathname === "/data") {
    res.writeHead(200);
    res.end(`
            <html>
                <head><title>Query Data</title></head>
                <body>
                    <h1>Query Parameters</h1>
                    <p>Name: ${query.name || "Not provided"}</p>
                    <p>Age: ${query.age || "Not provided"}</p>
                    <p>All query params: ${JSON.stringify(query)}</p>
                </body>
            </html>
        `);
  } else {
    res.writeHead(404);
    res.end(`
            <html>
                <head><title>404 Not Found</title></head>
                <body>
                    <h1>404 - Page Not Found</h1>
                    <p>The requested path "${pathname}" was not found.</p>
                    <a href="/">Go back home</a>
                </body>
            </html>
        `);
  }

  // Log the request
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`   Open your browser and visit: http://localhost:${PORT}`);
  console.log(`   Press Ctrl+C to stop the server\n`);
});

// Handle server errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `❌ Port ${PORT} is already in use. Please use a different port.`,
    );
  } else {
    console.error("Server error:", err);
  }
});

