# 🌐 Anatomy of an HTTP Transaction in Node.js

## 🇬🇧 English Version

### 1. Creating a Server

Node.js uses the `http` module to create web servers.

- **`createServer`**: Takes a callback (request handler) that is executed for every incoming request.
- **Request Handler**: Receives two arguments: `request` (IncomingMessage) and `response` (ServerResponse).
- **`listen(port)`**: Starts the server and listens for connections on the specified port.

```javascript
const http = require("node:http");

const server = http.createServer((request, response) => {
  // Handle request here
});

server.listen(8080);
```

### 2. The `request` Object (IncomingMessage)

This object contains details about the incoming HTTP request.

- **Method & URL**: `request.method` (e.g., 'GET', 'POST') and `request.url` (path relative to the server).
- **Headers**: `request.headers` (object with lowercase keys).
- **Body (Data)**: The request object implements the `ReadableStream` interface. You read the body by listening to `'data'` and `'end'` events.

```javascript
let body = [];
request
  .on("data", (chunk) => {
    body.push(chunk); // Collect chunks
  })
  .on("end", () => {
    body = Buffer.concat(body).toString(); // Combine and convert to string
    // Process the full body here
  });
```

### 3. The `response` Object (ServerResponse)

This object is used to send data back to the client. It implements the `WritableStream` interface.

- **Status Code**: Default is 200. Change it via `response.statusCode = 404;`.
- **Headers**: Set headers using `response.setHeader('Content-Type', 'application/json');`.
- **Sending Data**: Use `response.write()` to send chunks of the body.
- **Finishing**: Always call `response.end()` to finish the response. You can also pass the final data chunk to `end()`.

```javascript
response.statusCode = 200;
response.setHeader("Content-Type", "text/plain");
response.end("Hello World");
```

### 4. Error Handling

Since both `request` and `response` are streams, they can emit errors. **Always** listen for the `'error'` event to prevent your server from crashing.

```javascript
request.on("error", (err) => {
  console.error(err);
  response.statusCode = 400;
  response.end();
});
```

### 5. Echo Server Example (Using Streams)

Since `request` is a readable stream and `response` is a writable stream, you can pipe data directly from one to the other!

```javascript
if (request.method === "POST" && request.url === "/echo") {
  request.pipe(response);
} else {
  response.statusCode = 404;
  response.end();
}
```

---

## 🇻🇳 Vietnamese Version

### 1. Tạo Server

Node.js sử dụng module `http` để tạo máy chủ web.

- **`createServer`**: Nhận vào một hàm callback (xử lý yêu cầu) sẽ được chạy mỗi khi có yêu cầu gửi đến.
- **Hàm xử lý (Handler)**: Nhận hai tham số: `request` (Yêu cầu đến) và `response` (Phản hồi đi).
- **`listen(port)`**: Khởi động server và lắng nghe kết nối trên cổng (port) đã định.

```javascript
const http = require("node:http");

const server = http.createServer((request, response) => {
  // Xử lý yêu cầu tại đây
});

server.listen(8080);
```

### 2. Đối tượng `request` (IncomingMessage)

Chứa thông tin về yêu cầu HTTP được gửi đến.

- **Method & URL**: `request.method` (vd: 'GET', 'POST') và `request.url` (đường dẫn).
- **Headers**: `request.headers` (object chứa các header, tên key viết thường).
- **Body (Dữ liệu)**: Đối tượng request là một `ReadableStream` (luồng đọc). Bạn đọc dữ liệu bằng cách lắng nghe sự kiện `'data'` và `'end'`.

```javascript
let body = [];
request
  .on("data", (chunk) => {
    body.push(chunk); // Gom các mảnh dữ liệu
  })
  .on("end", () => {
    body = Buffer.concat(body).toString(); // Nối lại và chuyển thành chuỗi
    // Xử lý toàn bộ dữ liệu tại đây
  });
```

### 3. Đối tượng `response` (ServerResponse)

Dùng để gửi dữ liệu phản hồi lại cho client. Nó là một `WritableStream` (luồng ghi).

- **Mã trạng thái (Status Code)**: Mặc định là 200. Đổi bằng `response.statusCode = 404;`.
- **Headers**: Thiết lập header bằng `response.setHeader('Content-Type', 'application/json');`.
- **Gửi dữ liệu**: Dùng `response.write()` để gửi từng phần nội dung.
- **Kết thúc**: Luôn phải gọi `response.end()` để hoàn tất phản hồi. Bạn có thể truyền nội dung cuối cùng vào hàm `end()`.

```javascript
response.statusCode = 200;
response.setHeader("Content-Type", "text/plain");
response.end("Xin chào thế giới");
```

### 4. Xử lý lỗi

Vì cả `request` và `response` đều là stream, chúng có thể phát sinh lỗi. **Luôn luôn** lắng nghe sự kiện `'error'` để tránh việc server bị crash (dừng hoạt động).

```javascript
request.on("error", (err) => {
  console.error(err);
  response.statusCode = 400;
  response.end();
});
```

### 5. Ví dụ Echo Server (Dùng Streams)

Vì `request` là luồng đọc và `response` là luồng ghi, bạn có thể nối ống (`pipe`) trực tiếp dữ liệu từ request sang response!

```javascript
if (request.method === "POST" && request.url === "/echo") {
  request.pipe(response);
} else {
  response.statusCode = 404;
  response.end();
}
```
