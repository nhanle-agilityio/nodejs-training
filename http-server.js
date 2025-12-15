const http = require("node:http");
const url = require("url");

const server = http.createServer((request, response) => {
  // parse the url
  const parsedUrl = url.parse(request.url, true);
  const path = parsedUrl.pathname;

  // If the path is /, return a simple HTML page with a link to /hello
  if (path === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end('<h1>Home</h1><a href="/hello">Hello</a>');
  } else if (path === "/hello") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end('<h1>Hello World</h1><a href="/">Home</a>');
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html");
    response.end('<h1>404 Not Found</h1><a href="/">Home</a>');
  }

  // log the request
  console.log(`${new Date().toISOString()} - ${request.method} ${request.url}`);
});

server.listen(8080, () => {
  console.log("Open your browser and visit: http://localhost:8080");
});
