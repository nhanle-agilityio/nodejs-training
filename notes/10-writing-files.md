# ✍️ Writing Files with Node.js

## 🇬🇧 English Version

### 1. Writing to a File (Overwrite)

The default behavior of file writing methods is to **replace** the file content if it exists, or create a new file if it doesn't.

- **Asynchronous (Callback):**

  ```javascript
  const fs = require("node:fs");
  const content = "Some content!";

  fs.writeFile("/path/to/file.txt", content, (err) => {
    if (err) console.error(err);
    else console.log("File written successfully");
  });
  ```

- **Synchronous (Blocking):**

  ```javascript
  try {
    fs.writeFileSync("/path/to/file.txt", content);
  } catch (err) {
    console.error(err);
  }
  ```

- **Promise-based (Async/Await):**

  ```javascript
  const fs = require("node:fs/promises");

  async function write() {
    try {
      await fs.writeFile("/path/to/file.txt", content);
    } catch (err) {
      console.error(err);
    }
  }
  ```

### 2. File Flags (Control Behavior)

You can change how the file is opened using flags passed in the options object `{ flag: '...' }`.

- **`r+`**: Open for reading and writing. (File must exist).
- **`w+`**: Open for reading and writing. Positions stream at the **beginning**. (Creates file if missing).
- **`a`**: Open for writing. Positions stream at the **end**. (Creates file if missing).
- **`a+`**: Open for reading and writing. Positions stream at the **end**. (Creates file if missing).

Example:

```javascript
// Open for appending using a flag
fs.writeFile("file.txt", "New Content", { flag: "a+" }, (err) => {});
```

### 3. Appending to a File

Instead of using flags with `writeFile`, you can use the dedicated `appendFile` method to add content to the end of a file.

- **Using Promises:**

  ```javascript
  const fs = require("node:fs/promises");

  async function append() {
    try {
      await fs.appendFile("file.log", "Log entry\n");
    } catch (err) {
      console.error(err);
    }
  }
  ```

---

## 🇻🇳 Vietnamese Version

### 1. Ghi file (Ghi đè)

Hành vi mặc định của các phương thức ghi file là **thay thế toàn bộ** nội dung nếu file đã tồn tại, hoặc tạo file mới nếu chưa có.

- **Bất đồng bộ (Callback):**

  ```javascript
  const fs = require("node:fs");
  const content = "Nội dung file!";

  fs.writeFile("/duong/dan/file.txt", content, (err) => {
    if (err) console.error(err);
    else console.log("Ghi file thành công");
  });
  ```

- **Đồng bộ (Synchronous):**

  ```javascript
  try {
    fs.writeFileSync("/duong/dan/file.txt", content);
  } catch (err) {
    console.error(err);
  }
  ```

- **Dựa trên Promise (Async/Await):**

  ```javascript
  const fs = require("node:fs/promises");

  async function write() {
    try {
      await fs.writeFile("/duong/dan/file.txt", content);
    } catch (err) {
      console.error(err);
    }
  }
  ```

### 2. Cờ (File Flags)

Bạn có thể thay đổi cách mở file bằng các cờ được truyền trong object tùy chọn `{ flag: '...' }`.

- **`r+`**: Mở để đọc và ghi. (File bắt buộc phải tồn tại).
- **`w+`**: Mở để đọc và ghi. Con trỏ đặt ở **đầu** file. (Tạo file mới nếu chưa có).
- **`a`**: Mở để ghi. Con trỏ đặt ở **cuối** file. (Tạo file mới nếu chưa có).
- **`a+`**: Mở để đọc và ghi. Con trỏ đặt ở **cuối** file. (Tạo file mới nếu chưa có).

Ví dụ:

```javascript
// Mở để ghi nối thêm dùng flag
fs.writeFile("file.txt", "Nội dung mới", { flag: "a+" }, (err) => {});
```

### 3. Ghi nối tiếp (Appending)

Thay vì dùng `writeFile` với các cờ phức tạp, bạn có thể dùng phương thức chuyên dụng `appendFile` để thêm nội dung vào cuối file.

- **Dùng Promises:**

  ```javascript
  const fs = require("node:fs/promises");

  async function append() {
    try {
      await fs.appendFile("file.log", "Dòng log mới\n");
    } catch (err) {
      console.error(err);
    }
  }
  ```
