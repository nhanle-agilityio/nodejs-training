# 📖 Reading Files with Node.js

## 🇬🇧 English Version

### 1. Simple File Reading

Node.js provides the `fs` (File System) module to read files. There are three main ways:

- **Asynchronous (Callback):**
  The simplest way. Passes the file content to a callback function.

  ```javascript
  const fs = require("node:fs");

  fs.readFile("/path/to/file.txt", "utf8", (err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
  ```

- **Synchronous (Blocking):**
  Blocks execution until reading is complete.

  ```javascript
  try {
    const data = fs.readFileSync("/path/to/file.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
  ```

- **Promise-based (Async/Await):**
  Recommended for modern applications.

  ```javascript
  const fs = require("node:fs/promises");

  async function read() {
    try {
      const data = await fs.readFile("/path/to/file.txt", { encoding: "utf8" });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  ```

**Note:** All these methods read the **entire file** into memory. For large files, this can cause high memory usage.

### 2. Reading Large Files (Streams)

For big files, use **Streams** to read data in chunks instead of loading everything at once.

```javascript
const fs = require("node:fs");

async function readBigFile(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  for await (const chunk of readStream) {
    console.log("--- Received Chunk ---");
    console.log(chunk);
  }
}
```

This approach is memory-efficient because it processes one chunk at a time.

---

## 🇻🇳 Vietnamese Version

### 1. Đọc file cơ bản

Node.js cung cấp module `fs` để đọc file. Có 3 cách chính:

- **Bất đồng bộ (Callback):**
  Cách đơn giản nhất. Dữ liệu file sẽ được trả về trong hàm callback.

  ```javascript
  const fs = require("node:fs");

  fs.readFile("/duong/dan/file.txt", "utf8", (err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
  ```

- **Đồng bộ (Synchronous):**
  Chặn luồng thực thi cho đến khi đọc xong file.

  ```javascript
  try {
    const data = fs.readFileSync("/duong/dan/file.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
  ```

- **Dựa trên Promise (Async/Await):**
  Khuyên dùng cho các ứng dụng hiện đại.

  ```javascript
  const fs = require("node:fs/promises");

  async function read() {
    try {
      const data = await fs.readFile("/duong/dan/file.txt", {
        encoding: "utf8",
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  ```

**Lưu ý:** Tất cả các cách trên đều đọc **toàn bộ file** vào bộ nhớ (RAM). Với file lớn, cách này sẽ ngốn rất nhiều tài nguyên.

### 2. Đọc file lớn (Streams)

Với file dung lượng lớn, hãy dùng **Streams** để đọc từng phần (chunk) thay vì tải tất cả cùng lúc.

```javascript
const fs = require("node:fs");

async function readBigFile(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  for await (const chunk of readStream) {
    console.log("--- Nhận được một phần ---");
    console.log(chunk);
  }
}
```

Cách này tiết kiệm bộ nhớ hơn vì nó chỉ xử lý từng phần nhỏ một lúc.
