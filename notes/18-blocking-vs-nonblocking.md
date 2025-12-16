# 🛑 Blocking vs Non-Blocking in Node.js

## 🇬🇧 English Version

### 1. What is Blocking?

**Blocking** implies that the execution of JavaScript in the Node.js process must wait until a non-JavaScript operation (like I/O) completes.

- **Cause:** The Event Loop is paused (blocked) and cannot execute any other code.
- **Synchronous methods:** In Node.js standard library, methods ending with `Sync` (e.g., `readFileSync`) are blocking.

### 2. What is Non-Blocking?

**Non-Blocking** operations allow the execution to proceed immediately without waiting for the operation to finish.

- **Mechanism:** The system handles the operation in the background (using libuv) and calls a callback function when done.
- **Asynchronous methods:** All I/O methods in Node.js have async versions (e.g., `readFile`).

### 3. Comparison

| Feature            | Blocking (Synchronous)     | Non-Blocking (Asynchronous)              |
| :----------------- | :------------------------- | :--------------------------------------- |
| **Execution**      | Waits for completion       | Continues immediately                    |
| **Code Style**     | Simple, linear             | Uses callbacks, Promises, or Async/Await |
| **Performance**    | Can freeze the app if slow | High concurrency, handles many requests  |
| **Error Handling** | `try...catch`              | Error-first callback or `.catch()`       |

### 4. Code Example

**Blocking (Synchronous):**

```javascript
const fs = require("node:fs");
// Execution STOPS here until file is fully read
const data = fs.readFileSync("/file.md");
console.log(data);
moreWork(); // This waits for readFileSync
```

**Non-Blocking (Asynchronous):**

```javascript
const fs = require("node:fs");
// Execution starts reading and MOVES ON immediately
fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
  console.log(data); // Runs later when file is ready
});
moreWork(); // Runs IMMEDIATELY, likely before console.log(data)
```

### 5. Dangers of Mixing

Mixing blocking and non-blocking code can lead to unpredictable results (Race Conditions).

**Bad Example:**

```javascript
fs.readFile('file.txt', (err, data) => { ... });
fs.unlinkSync('file.txt'); // Deletes file BEFORE read finishes!
```

**Good Example (Correct Order):**

```javascript
fs.readFile('file.txt', (err, data) => {
  // Read first...
  console.log(data);
  // ...then delete inside the callback
  fs.unlink('file.txt', (err) => { ... });
});
```

---

## 🇻🇳 Vietnamese Version

### 1. Blocking (Chặn) là gì?

**Blocking** nghĩa là quá trình thực thi mã JavaScript trong Node.js bị dừng lại để chờ một tác vụ không phải JavaScript (như đọc ổ cứng, mạng) hoàn tất.

- **Nguyên nhân:** Vòng lặp sự kiện (Event Loop) bị chặn và không thể chạy đoạn code nào khác.
- **Phương thức đồng bộ:** Trong thư viện chuẩn Node.js, các hàm có đuôi `Sync` (ví dụ `readFileSync`) là hàm gây chặn.

### 2. Non-Blocking (Không chặn) là gì?

**Non-Blocking** cho phép mã tiếp tục chạy ngay lập tức mà không cần chờ tác vụ đó xong.

- **Cơ chế:** Hệ thống xử lý tác vụ trong nền (dùng thư viện libuv) và sẽ gọi lại hàm (callback) khi xong việc.
- **Phương thức bất đồng bộ:** Tất cả các hàm I/O trong Node.js đều có phiên bản bất đồng bộ (ví dụ `readFile`).

### 3. So sánh

| Đặc điểm            | Blocking (Đồng bộ)                | Non-Blocking (Bất đồng bộ)                            |
| :------------------ | :-------------------------------- | :---------------------------------------------------- |
| **Thực thi**        | Chờ cho đến khi xong              | Chạy tiếp ngay lập tức                                |
| **Phong cách code** | Đơn giản, tuần tự                 | Dùng callback, Promise, hoặc Async/Await              |
| **Hiệu năng**       | Có thể làm treo ứng dụng nếu chậm | Xử lý đồng thời cao, chịu tải tốt                     |
| **Xử lý lỗi**       | Dùng `try...catch`                | Dùng callback tham số đầu tiên là lỗi hoặc `.catch()` |

### 4. Ví dụ Code

**Blocking (Đồng bộ):**

```javascript
const fs = require("node:fs");
// Việc thực thi DỪNG lại ở đây cho đến khi đọc xong file
const data = fs.readFileSync("/file.md");
console.log(data);
lamViecKhac(); // Hàm này phải chờ readFileSync xong mới chạy
```

**Non-Blocking (Bất đồng bộ):**

```javascript
const fs = require("node:fs");
// Bắt đầu đọc file và CHẠY TIẾP ngay lập tức dòng dưới
fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
  console.log(data); // Chạy sau, khi file đã đọc xong
});
lamViecKhac(); // Chạy NGAY LẬP TỨC, khả năng cao là trước cả console.log(data)
```

### 5. Nguy hiểm khi dùng lẫn lộn

Dùng lẫn lộn code chặn và không chặn có thể dẫn đến kết quả không đoán trước được (Race Conditions).

**Ví dụ Sai:**

```javascript
fs.readFile('file.txt', (err, data) => { ... });
fs.unlinkSync('file.txt'); // Xóa file TRƯỚC KHI đọc xong!
```

**Ví dụ Đúng (Thứ tự chuẩn):**

```javascript
fs.readFile('file.txt', (err, data) => {
  // Đọc trước...
  console.log(data);
  // ...sau đó mới xóa bên trong callback
  fs.unlink('file.txt', (err) => { ... });
});
```
