# ⏳ JavaScript Asynchronous Programming & Callbacks

## 🇬🇧 English Version

### 1. Asynchronicity

Computers are asynchronous by design. They execute programs for small time slots, switching between them rapidly. This allows long-running operations (like network requests) to happen in the background without freezing the entire system.

### 2. JavaScript & Single Thread

JavaScript is **Single Threaded** and **Synchronous** by default.

- Code executes line by line.
- It cannot create new threads to run code in parallel.

**How does it handle async tasks (like clicks or network requests)?**
It relies on the environment (Browser APIs or Node.js C++ APIs) to handle these tasks and notify JavaScript when they are done.

### 3. Callbacks

A **Callback** is a function passed as an argument to another function, which is executed later when an event occurs or a task completes.

- **Example (Timer):**
  ```javascript
  setTimeout(() => {
    console.log("Runs after 2 seconds");
  }, 2000);
  ```

### 4. Error-First Callbacks (Node.js Standard)

In Node.js, the standard convention for callbacks is **"Error-First"**.

- The **first argument** is reserved for an error object (if any).
- If there is no error, the first argument is `null` or `undefined`.
- The **second argument** contains the successful result data.

```javascript
const fs = require("node:fs");

fs.readFile("/file.json", (err, data) => {
  if (err) {
    // Handle error first
    console.error("Error reading file:", err);
    return;
  }
  // Process data if no error
  console.log(data);
});
```

### 5. Callback Hell

Using too many nested callbacks leads to deep nesting, making code hard to read and maintain. This is known as **"Callback Hell"**.

```javascript
doA(() => {
  doB(() => {
    doC(() => {
      // Hard to read!
    });
  });
});
```

_Solution:_ Use **Promises** or **Async/Await** (covered in later topics).

---

## 🇻🇳 Vietnamese Version

### 1. Bất đồng bộ (Asynchronicity)

Về bản chất, máy tính hoạt động bất đồng bộ. Chúng chạy các chương trình trong các khoảng thời gian nhỏ và chuyển đổi qua lại rất nhanh. Điều này cho phép các tác vụ tốn thời gian (như gọi mạng) chạy nền mà không làm treo toàn bộ hệ thống.

### 2. JavaScript & Đơn luồng (Single Thread)

JavaScript mặc định là **Đơn luồng (Single Threaded)** và **Đồng bộ (Synchronous)**.

- Mã chạy từng dòng một.
- Nó không thể tạo luồng mới để chạy song song.

**Làm sao nó xử lý việc bất đồng bộ (như click chuột, gọi API)?**
Nó dựa vào môi trường (Browser APIs hoặc Node.js APIs) để xử lý các tác vụ này và báo lại cho JavaScript khi xong việc.

### 3. Callbacks (Hàm gọi lại)

**Callback** là một hàm được truyền vào một hàm khác như một tham số, và sẽ được thực thi sau khi một sự kiện xảy ra hoặc một tác vụ hoàn tất.

- **Ví dụ (Hẹn giờ):**
  ```javascript
  setTimeout(() => {
    console.log("Chạy sau 2 giây");
  }, 2000);
  ```

### 4. Error-First Callbacks (Tiêu chuẩn Node.js)

Trong Node.js, quy tắc chuẩn cho callback là **"Lỗi trước tiên" (Error-First)**.

- **Tham số đầu tiên** luôn dành cho lỗi (nếu có).
- Nếu không có lỗi, tham số đầu tiên là `null` hoặc `undefined`.
- **Tham số thứ hai** chứa dữ liệu kết quả thành công.

```javascript
const fs = require("node:fs");

fs.readFile("/file.json", (err, data) => {
  if (err) {
    // Xử lý lỗi trước
    console.error("Lỗi đọc file:", err);
    return;
  }
  // Xử lý dữ liệu nếu không lỗi
  console.log(data);
});
```

### 5. Địa ngục Callback (Callback Hell)

Dùng quá nhiều callback lồng nhau dẫn đến mã nguồn bị thụt đầu dòng quá sâu, khó đọc và khó bảo trì. Hiện tượng này gọi là **"Callback Hell"**.

```javascript
doA(() => {
  doB(() => {
    doC(() => {
      // Khó đọc quá!
    });
  });
});
```

_Giải pháp:_ Sử dụng **Promises** hoặc **Async/Await** (sẽ học ở các phần sau).
