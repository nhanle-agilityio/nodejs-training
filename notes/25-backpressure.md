# 🛑 Backpressure in Streams

## 🇬🇧 English Version

### 1. What is Backpressure?

**Backpressure** is a flow control mechanism used when data is produced faster than it can be consumed.

- **Analogy:** A water pipe. If you pour water into a funnel faster than it can drain, it overflows. Backpressure is the mechanism that signals the faucet to slow down or stop pouring.
- **In Node.js:** It prevents memory overflow (RAM usage spike) when reading huge files or handling fast network requests.

### 2. The Problem: Memory Exhaustion

Without backpressure, if a **Readable** stream pushes data faster than a **Writable** stream can process:

- The system buffers all pending data in RAM.
- **Result:** High memory usage, overworked Garbage Collector (GC), and eventual process crash (Memory Exhaustion).

### 3. How Backpressure Works

The mechanism relies on the return value of `.write()`:

1.  **Consumer:** When the internal buffer is full (`highWaterMark` reached), `stream.write(chunk)` returns `false`.
2.  **Signal:** This signals the **Producer** (Readable stream) to **pause** reading/sending data.
3.  **Resume:** Once the Consumer finishes processing the buffer, it emits a `'drain'` event.
4.  **Action:** The Producer listens for `'drain'` and resumes sending data.

### 4. `pipe()` handles this automatically

The `.pipe()` method automatically manages backpressure for you.

```javascript
readable.pipe(writable);
// If 'writable' gets full, 'readable' pauses automatically.
// When 'writable' drains, 'readable' resumes.
```

### 5. Implementing Custom Streams (Best Practices)

If you implement custom streams, **you must respect backpressure manually**.

**For Readable Streams:**

- Check the return value of `.push()`.
- If `.push(chunk)` returns `false`, **stop** pushing data until `_read()` is called again.

```javascript
// Good Practice
_read(size) {
  let canPush = true;
  while (canPush && (data = getData())) {
    canPush = this.push(data); // Stop if buffer is full
  }
}
```

**For Writable Streams:**

- Respect the `highWaterMark`.
- Call the `callback()` only when you are done processing the chunk.

### 6. `.cork()` and `.uncork()`

- `.cork()`: Forces buffering of all writes (holds them in memory).
- `.uncork()`: Flushes all buffered data.
- **Use Case:** Optimizing multiple small writes into a single larger operation (like sending headers + body in one TCP packet).

---

## 🇻🇳 Vietnamese Version

### 1. Backpressure là gì?

**Backpressure** (Áp lực ngược) là cơ chế kiểm soát luồng dữ liệu khi tốc độ sản sinh dữ liệu nhanh hơn tốc độ tiêu thụ.

- **Ví dụ:** Cái phễu. Nếu bạn đổ nước vào phễu nhanh hơn tốc độ nó chảy ra, nước sẽ tràn. Backpressure là tín hiệu báo cho người đổ nước biết hãy đổ chậm lại hoặc dừng lại.
- **Trong Node.js:** Nó ngăn chặn tràn bộ nhớ (RAM) khi đọc file lớn hoặc xử lý mạng tốc độ cao.

### 2. Vấn đề: Cạn kiệt bộ nhớ

Nếu không có Backpressure, khi nguồn đọc (**Readable**) đẩy dữ liệu nhanh hơn nguồn ghi (**Writable**) có thể xử lý:

- Hệ thống sẽ lưu tạm (buffer) toàn bộ dữ liệu chờ vào RAM.
- **Hậu quả:** RAM tăng vọt, Garbage Collector (GC) hoạt động quá tải, và ứng dụng bị sập (Crash).

### 3. Cơ chế hoạt động

Cơ chế này dựa vào giá trị trả về của hàm `.write()`:

1.  **Bên tiêu thụ:** Khi bộ đệm đầy (đạt ngưỡng `highWaterMark`), hàm `stream.write(chunk)` trả về `false`.
2.  **Tín hiệu:** Đây là dấu hiệu bảo **Bên sản xuất** (Readable) hãy **tạm dừng** gửi dữ liệu.
3.  **Tiếp tục:** Khi Bên tiêu thụ xử lý xong bộ đệm, nó phát sự kiện `'drain'` (đã rút cạn).
4.  **Hành động:** Bên sản xuất lắng nghe `'drain'` và tiếp tục gửi dữ liệu.

### 4. `pipe()` tự động làm việc này

Hàm `.pipe()` tự động quản lý backpressure cho bạn.

```javascript
readable.pipe(writable);
// Nếu 'writable' đầy, 'readable' tự động dừng.
// Khi 'writable' rỗng, 'readable' tự chạy lại.
```

### 5. Triển khai Stream tùy chỉnh (Thực hành tốt nhất)

Nếu bạn tự viết Stream, **bạn bắt buộc phải tuân thủ backpressure thủ công**.

**Với Readable Streams:**

- Kiểm tra giá trị trả về của `.push()`.
- Nếu `.push(chunk)` trả về `false`, **dừng** đẩy dữ liệu cho đến khi hàm `_read()` được gọi lại.

```javascript
// Thực hành tốt
_read(size) {
  let coTheDayTiep = true;
  while (coTheDayTiep && (data = layDuLieu())) {
    coTheDayTiep = this.push(data); // Dừng nếu bộ đệm đầy
  }
}
```

**Với Writable Streams:**

- Tuân thủ giới hạn `highWaterMark`.
- Chỉ gọi `callback()` khi bạn thực sự xử lý xong chunk dữ liệu đó.

### 6. `.cork()` và `.uncork()`

- `.cork()`: Buộc stream phải gom tất cả các lệnh ghi vào bộ nhớ đệm (chưa gửi đi ngay).
- `.uncork()`: Xả (gửi) tất cả dữ liệu đang bị gom.
- **Mục đích:** Tối ưu hóa bằng cách gom nhiều lần ghi nhỏ thành một lần ghi lớn (ví dụ: gửi header + body trong cùng một gói tin TCP).
