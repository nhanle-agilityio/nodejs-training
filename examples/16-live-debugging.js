/**
 * This example creates a simple HTTP server to demonstrate "Live Debugging".
 * You can attach a debugger and set breakpoints in the request handler.
 *
 * Run: node --inspect examples/16-live-debugging.js
 */

const http = require("http");

const server = http.createServer((req, res) => {
  // SET BREAKPOINT HERE in DevTools
  const url = req.url;
  const method = req.method;

  console.log(`Request received: ${method} ${url}`);

  debugger; // This statement pauses execution if a debugger is attached!

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello! Debugger didn't stop me (or you resumed).");
  } else if (url === "/json") {
    const data = { message: "Hello JSON", id: 123 };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("--- Live Debugging Demo ---");
  console.log("Server listening on http://localhost:3000");
  console.log("1. Run: node --inspect examples/16-live-debugging.js");
  console.log("2. Open Chrome -> chrome://inspect");
  console.log('3. Click "inspect"');
  console.log("4. Visit http://localhost:3000");
});
