# 🔢 Working with File Descriptors in Node.js

## 🇬🇧 English Version

### 1. What is a File Descriptor?

Before interacting with a file (reading, writing, etc.), you often need to open it. When you open a file, the Operating System assigns it a unique number called a **File Descriptor (fd)**. This number acts as a reference or handle to the open file.

### 2. Opening a File to get a Descriptor

You use the `fs.open()` method to get an `fd`.

- **Asynchronous (Callback):**

  ```javascript
  const fs = require("node:fs");

  fs.open("/path/to/file.txt", "r", (err, fd) => {
    if (err) return console.error(err);
    // 'fd' is the file descriptor number (e.g., 3)
    console.log("File descriptor:", fd);

    // Always close the file when done!
    fs.close(fd, (err) => {
      /* ... */
    });
  });
  ```

- **Synchronous:**
  ```javascript
  try {
    const fd = fs.openSync("/path/to/file.txt", "r");
    console.log(fd);
    // Perform operations...
    fs.closeSync(fd);
  } catch (err) {
    console.error(err);
  }
  ```

### 3. Promise-based (FileHandle)

With `fs/promises`, instead of a raw number `fd`, you get a **FileHandle** object. This object is a wrapper around the file descriptor and has methods attached to it.

```javascript
const fs = require("node:fs/promises");

async function example() {
  let filehandle;
  try {
    // Returns a FileHandle object
    filehandle = await fs.open("/path/to/file.txt", "r");

    // Access the raw fd number if needed
    console.log(filehandle.fd);

    // Use methods directly on the handle
    const content = await filehandle.readFile({ encoding: "utf8" });
    console.log(content);
  } finally {
    // Critical: Always close the file handle!
    if (filehandle) await filehandle.close();
  }
}
```

### 4. Flags (Modes)

The second argument to `fs.open` specifies the mode:

- **`r`**: Open for reading (fails if file doesn't exist).
- **`r+`**: Reading and writing (fails if file doesn't exist).
- **`w+`**: Reading and writing (creates file or truncates/overwrites it).
- **`a`**: Open for appending (creates file if needed).
- **`a+`**: Reading and appending (creates file if needed).

---

## 🇻🇳 Vietnamese Version

### 1. File Descriptor là gì?

Trước khi tương tác với file (đọc, ghi...), bạn thường cần phải mở nó. Khi bạn mở một file, Hệ điều hành sẽ gán cho nó một con số định danh duy nhất gọi là **File Descriptor (fd)**. Con số này đóng vai trò như một "chiếc thẻ" tham chiếu đến file đang mở.

### 2. Mở file để lấy Descriptor

Bạn dùng phương thức `fs.open()` để lấy `fd`.

- **Bất đồng bộ (Callback):**

  ```javascript
  const fs = require("node:fs");

  fs.open("/duong/dan/file.txt", "r", (err, fd) => {
    if (err) return console.error(err);
    // 'fd' là số file descriptor (ví dụ: 3)
    console.log("File descriptor:", fd);

    // Luôn đóng file khi dùng xong!
    fs.close(fd, (err) => {
      /* ... */
    });
  });
  ```

- **Đồng bộ (Synchronous):**
  ```javascript
  try {
    const fd = fs.openSync("/duong/dan/file.txt", "r");
    console.log(fd);
    // Thực hiện thao tác...
    fs.closeSync(fd);
  } catch (err) {
    console.error(err);
  }
  ```

### 3. Dựa trên Promise (FileHandle)

Với `fs/promises`, thay vì nhận về một số `fd` thô, bạn sẽ nhận được một đối tượng **FileHandle**. Đối tượng này bao bọc lấy file descriptor và cung cấp sẵn các phương thức để thao tác.

```javascript
const fs = require("node:fs/promises");

async function example() {
  let filehandle;
  try {
    // Trả về đối tượng FileHandle
    filehandle = await fs.open("/duong/dan/file.txt", "r");

    // Truy cập số fd thô nếu cần
    console.log(filehandle.fd);

    // Dùng phương thức trực tiếp trên handle
    const content = await filehandle.readFile({ encoding: "utf8" });
    console.log(content);
  } finally {
    // Quan trọng: Luôn phải đóng file handle!
    if (filehandle) await filehandle.close();
  }
}
```

### 4. Cờ (Chế độ mở file)

Tham số thứ hai của `fs.open` quy định chế độ mở file:

- **`r`**: Mở để đọc (báo lỗi nếu file không tồn tại).
- **`r+`**: Đọc và ghi (báo lỗi nếu file không tồn tại).
- **`w+`**: Đọc và ghi (tạo file mới hoặc ghi đè/xóa trắng file cũ).
- **`a`**: Mở để ghi nối tiếp (tạo file mới nếu chưa có).
- **`a+`**: Đọc và ghi nối tiếp (tạo file mới nếu chưa có).
