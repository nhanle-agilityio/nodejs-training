# 📡 The Node.js Event Emitter

## 🇬🇧 English Version

### 1. Introduction

In Node.js, the **Event System** is a core pattern used to handle asynchronous actions. It is built around the `events` module and the `EventEmitter` class.
Many Node.js core modules (like `http`, `stream`, `fs`) inherit from `EventEmitter`.

### 2. Basic Usage

You need to import the module and instantiate the class.

```javascript
const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();
```

### 3. Key Methods

- **`on(eventName, listener)`**: Adds a callback function (listener) that runs **every time** the event is triggered.

  ```javascript
  eventEmitter.on("start", () => {
    console.log("Started!");
  });
  ```

- **`emit(eventName, ...args)`**: Triggers the event, optionally passing arguments to the listeners.

  ```javascript
  eventEmitter.emit("start");
  ```

- **Passing Arguments:**

  ```javascript
  eventEmitter.on("data", (id, msg) => {
    console.log(`ID: ${id}, Message: ${msg}`);
  });

  eventEmitter.emit("data", 1, "Hello World");
  // Output: ID: 1, Message: Hello World
  ```

- **`once(eventName, listener)`**: Adds a listener that runs **only once** and then removes itself.

  ```javascript
  eventEmitter.once("init", () => console.log("Initialized"));
  eventEmitter.emit("init"); // Logs "Initialized"
  eventEmitter.emit("init"); // Nothing happens
  ```

- **`off(eventName, listener)`** or **`removeListener`**: Removes a specific listener.
- **`removeAllListeners(eventName)`**: Removes all listeners for a specific event.

---

## 🇻🇳 Vietnamese Version

### 1. Giới thiệu

Trong Node.js, **Hệ thống Sự kiện (Event System)** là một mẫu thiết kế cốt lõi để xử lý các hành động bất đồng bộ. Nó được xây dựng xung quanh module `events` và lớp `EventEmitter`.
Rất nhiều module có sẵn của Node.js (như `http`, `stream`, `fs`) đều kế thừa từ `EventEmitter`.

### 2. Cách dùng cơ bản

Bạn cần import module và tạo một thể hiện (instance) của lớp đó.

```javascript
const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();
```

### 3. Các phương thức chính

- **`on(eventName, listener)`**: Thêm một hàm callback (listener) sẽ chạy **mỗi khi** sự kiện được kích hoạt.

  ```javascript
  eventEmitter.on("start", () => {
    console.log("Đã bắt đầu!");
  });
  ```

- **`emit(eventName, ...args)`**: Kích hoạt sự kiện, có thể truyền thêm tham số cho các listener.

  ```javascript
  eventEmitter.emit("start");
  ```

- **Truyền tham số:**

  ```javascript
  eventEmitter.on("data", (id, msg) => {
    console.log(`ID: ${id}, Tin nhắn: ${msg}`);
  });

  eventEmitter.emit("data", 1, "Xin chào");
  // Kết quả: ID: 1, Tin nhắn: Xin chào
  ```

- **`once(eventName, listener)`**: Thêm một listener chỉ chạy **duy nhất một lần**, sau đó tự hủy.

  ```javascript
  eventEmitter.once("init", () => console.log("Đã khởi tạo"));
  eventEmitter.emit("init"); // In ra "Đã khởi tạo"
  eventEmitter.emit("init"); // Không có gì xảy ra
  ```

- **`off(eventName, listener)`** hoặc **`removeListener`**: Gỡ bỏ một listener cụ thể.
- **`removeAllListeners(eventName)`**: Gỡ bỏ tất cả listener của một sự kiện.
