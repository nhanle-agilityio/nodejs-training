# 📄 Node.js File Stats

## 🇬🇧 English Version

### 1. Overview

Every file has metadata (details) associated with it, such as size, creation time, and type. Node.js allows you to inspect these details using the `stat()` method from the `fs` (File System) module.

### 2. Methods to Get Stats

There are three main ways to get file statistics:

- **Asynchronous (Callback-based):**

  ```javascript
  const fs = require("node:fs");

  fs.stat("/path/to/file.txt", (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    // Access stats here
  });
  ```

- **Synchronous (Blocking):**
  Blocks the execution until stats are returned. Useful for scripts, but avoid in high-performance servers.

  ```javascript
  try {
    const stats = fs.statSync("/path/to/file.txt");
  } catch (err) {
    console.error(err);
  }
  ```

- **Promise-based (Async/Await):**
  The modern and recommended approach.

  ```javascript
  const fs = require("node:fs/promises");

  async function getStats() {
    try {
      const stats = await fs.stat("/path/to/file.txt");
      console.log(stats);
    } catch (err) {
      console.error(err);
    }
  }
  ```

### 3. Common Stats Properties & Methods

Once you have the `stats` object, you can check various properties:

- `stats.isFile()`: Returns `true` if it's a regular file.
- `stats.isDirectory()`: Returns `true` if it's a directory (folder).
- `stats.isSymbolicLink()`: Returns `true` if it's a symbolic link.
- `stats.size`: The size of the file in bytes.

```javascript
const stats = await fs.stat("example.txt");
console.log(`Is file? ${stats.isFile()}`);
console.log(`Size: ${stats.size} bytes`);
```

---

## 🇻🇳 Vietnamese Version

### 1. Tổng quan

Mỗi tập tin đều đi kèm với các siêu dữ liệu (thông tin chi tiết) như kích thước, thời gian tạo và loại tập tin. Node.js cho phép bạn xem các thông tin này bằng phương thức `stat()` từ module `fs` (File System).

### 2. Các phương pháp lấy thông tin (Stats)

Có 3 cách chính để lấy thông tin file:

- **Bất đồng bộ (Callback-based):**

  ```javascript
  const fs = require("node:fs");

  fs.stat("/duong/dan/file.txt", (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    // Xử lý stats tại đây
  });
  ```

- **Đồng bộ (Synchronous - Blocking):**
  Chặn luồng thực thi cho đến khi lấy được thông tin. Hữu ích cho các script đơn giản, nhưng nên tránh dùng trong server hiệu năng cao.

  ```javascript
  try {
    const stats = fs.statSync("/duong/dan/file.txt");
  } catch (err) {
    console.error(err);
  }
  ```

- **Dựa trên Promise (Async/Await):**
  Cách tiếp cận hiện đại và được khuyến khích.

  ```javascript
  const fs = require("node:fs/promises");

  async function getStats() {
    try {
      const stats = await fs.stat("/duong/dan/file.txt");
      console.log(stats);
    } catch (err) {
      console.error(err);
    }
  }
  ```

### 3. Các thuộc tính & phương thức phổ biến

Khi đã có đối tượng `stats`, bạn có thể kiểm tra các thông tin sau:

- `stats.isFile()`: Trả về `true` nếu là file thường.
- `stats.isDirectory()`: Trả về `true` nếu là thư mục (folder).
- `stats.isSymbolicLink()`: Trả về `true` nếu là liên kết tượng trưng (symbolic link).
- `stats.size`: Kích thước file tính bằng byte.

```javascript
const stats = await fs.stat("example.txt");
console.log(`Là file? ${stats.isFile()}`);
console.log(`Kích thước: ${stats.size} bytes`);
```
