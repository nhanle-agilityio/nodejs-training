# 📂 Node.js File Paths

## 🇬🇧 English Version

### 1. Introduction

File paths differ between operating systems.

- **Linux/macOS:** `/users/joe/file.txt` (Forward slash `/`)
- **Windows:** `C:\users\joe\file.txt` (Backslash `\`)

To handle these differences automatically, use the `path` module.

```javascript
const path = require("node:path");
```

### 2. Extracting Information

You can get specific parts of a file path.

- **`dirname`**: The parent folder.
- **`basename`**: The filename (including extension).
- **`extname`**: The file extension.

```javascript
const notes = "/users/joe/notes.txt";

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt

// Get filename without extension
path.basename(notes, path.extname(notes)); // notes
```

### 3. Working with Paths

- **`path.join()`**: Joins path segments using the platform-specific separator.

  ```javascript
  path.join("/", "users", "joe", "notes.txt");
  // Returns '/users/joe/notes.txt' on Linux
  ```

- **`path.resolve()`**: Resolves a sequence of paths into an **absolute path**. It behaves like navigating via `cd` command.

  ```javascript
  // If current dir is /Users/me
  path.resolve("joe.txt"); // /Users/me/joe.txt
  path.resolve("tmp", "joe.txt"); // /Users/me/tmp/joe.txt
  path.resolve("/etc", "joe.txt"); // /etc/joe.txt (Absolute path ignores previous segments)
  ```

- **`path.normalize()`**: Fixes paths with `..`, `.`, or double slashes `//`.
  ```javascript
  path.normalize("/users/joe/..//test.txt"); // /users/test.txt
  ```

---

## 🇻🇳 Vietnamese Version

### 1. Giới thiệu

Đường dẫn tập tin (Path) khác nhau tùy thuộc vào hệ điều hành.

- **Linux/macOS:** Dùng dấu gạch chéo `/` (ví dụ: `/users/joe/file.txt`).
- **Windows:** Dùng dấu gạch ngược `\` (ví dụ: `C:\users\joe\file.txt`).

Để xử lý sự khác biệt này một cách tự động, hãy dùng module `path`.

```javascript
const path = require("node:path");
```

### 2. Trích xuất thông tin

Bạn có thể lấy các thành phần cụ thể của một đường dẫn.

- **`dirname`**: Thư mục cha chứa file.
- **`basename`**: Tên file (bao gồm cả đuôi).
- **`extname`**: Đuôi file (phần mở rộng).

```javascript
const notes = "/users/joe/notes.txt";

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt

// Lấy tên file không kèm đuôi
path.basename(notes, path.extname(notes)); // notes
```

### 3. Thao tác với đường dẫn

- **`path.join()`**: Nối các đoạn đường dẫn lại với nhau bằng dấu phân cách phù hợp với hệ điều hành.

  ```javascript
  path.join("/", "users", "joe", "notes.txt");
  // Trả về '/users/joe/notes.txt' trên Linux
  ```

- **`path.resolve()`**: Giải quyết chuỗi đường dẫn thành một **đường dẫn tuyệt đối**. Nó hoạt động giống như lệnh `cd`.

  ```javascript
  // Giả sử thư mục hiện tại là /Users/me
  path.resolve("joe.txt"); // /Users/me/joe.txt
  path.resolve("tmp", "joe.txt"); // /Users/me/tmp/joe.txt
  path.resolve("/etc", "joe.txt"); // /etc/joe.txt (Đường dẫn tuyệt đối sẽ bỏ qua các phần trước đó)
  ```

- **`path.normalize()`**: Chuẩn hóa đường dẫn, xử lý các dấu `..`, `.` hoặc gạch chéo kép `//`.
  ```javascript
  path.normalize("/users/joe/..//test.txt"); // /users/test.txt
  ```
