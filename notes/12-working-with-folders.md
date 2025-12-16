# 📂 Working with Folders in Node.js

## 🇬🇧 English Version

### 1. Check & Create Folders

The `fs` module allows you to manage directories.

- **Check Existence:** Use `fs.access()` or `fs.existsSync()` (sync).
- **Create Folder:** Use `fs.mkdir()` or `fs.mkdirSync()`.

```javascript
const fs = require("node:fs");
const folderName = "./my-folder";

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log("Folder created!");
  }
} catch (err) {
  console.error(err);
}
```

### 2. Read Directory Content

Use `fs.readdir()` or `fs.readdirSync()` to list files and subfolders in a directory.

```javascript
const folderPath = "./";

// Get list of filenames
const items = fs.readdirSync(folderPath);

// Filter to keep only files (not directories)
const files = items.filter((item) => {
  return fs.lstatSync(item).isFile();
});
console.log(files);
```

### 3. Rename Folder

Use `fs.rename()` to rename a folder (same method used for files).

```javascript
fs.rename("./old-name", "./new-name", (err) => {
  if (err) console.error(err);
  else console.log("Renamed successfully");
});
```

### 4. Remove Folder

- **Empty Folder:** Use `fs.rmdir()`.
- **Non-empty Folder:** Use `fs.rm()` with `{ recursive: true }`.

```javascript
// Delete folder and all its contents
fs.rm("./my-folder", { recursive: true, force: true }, (err) => {
  if (err) console.error(err);
  else console.log("Folder deleted!");
});
```

_Note: `force: true` prevents errors if the folder doesn't exist._

---

## 🇻🇳 Vietnamese Version

### 1. Kiểm tra & Tạo thư mục

Module `fs` cho phép bạn quản lý các thư mục.

- **Kiểm tra tồn tại:** Dùng `fs.access()` hoặc `fs.existsSync()` (đồng bộ).
- **Tạo thư mục:** Dùng `fs.mkdir()` hoặc `fs.mkdirSync()`.

```javascript
const fs = require("node:fs");
const folderName = "./my-folder";

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log("Đã tạo thư mục!");
  }
} catch (err) {
  console.error(err);
}
```

### 2. Đọc nội dung thư mục

Dùng `fs.readdir()` hoặc `fs.readdirSync()` để liệt kê danh sách file và thư mục con.

```javascript
const folderPath = "./";

// Lấy danh sách tên file/thư mục
const items = fs.readdirSync(folderPath);

// Lọc chỉ lấy file (loại bỏ thư mục con)
const files = items.filter((item) => {
  return fs.lstatSync(item).isFile();
});
console.log(files);
```

### 3. Đổi tên thư mục

Dùng `fs.rename()` để đổi tên thư mục (giống hệt đổi tên file).

```javascript
fs.rename("./ten-cu", "./ten-moi", (err) => {
  if (err) console.error(err);
  else console.log("Đổi tên thành công");
});
```

### 4. Xóa thư mục

- **Thư mục rỗng:** Dùng `fs.rmdir()`.
- **Thư mục có nội dung:** Dùng `fs.rm()` với tùy chọn `{ recursive: true }`.

```javascript
// Xóa thư mục và toàn bộ nội dung bên trong
fs.rm("./my-folder", { recursive: true, force: true }, (err) => {
  if (err) console.error(err);
  else console.log("Đã xóa thư mục!");
});
```

_Lưu ý: `force: true` giúp tránh báo lỗi nếu thư mục không tồn tại._
