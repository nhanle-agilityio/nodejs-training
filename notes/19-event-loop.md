# 🔄 The Node.js Event Loop

## 🇬🇧 English Version

### 1. What is the Event Loop?

The **Event Loop** is the mechanism that allows Node.js to perform non-blocking I/O operations despite being single-threaded. It offloads heavy tasks (file I/O, network) to the system kernel and executes their callbacks when they complete.

### 2. Phases of the Event Loop

The Event Loop is a cycle of **phases**. Each phase has a FIFO queue of callbacks to execute.

1.  **timers:** Executes callbacks from `setTimeout()` and `setInterval()`.
2.  **pending callbacks:** Executes I/O callbacks deferred to the next loop iteration (e.g., some TCP errors).
3.  **idle, prepare:** Used internally.
4.  **poll:** Retrieves new I/O events; executes I/O related callbacks (e.g., file read/write). Node.js will often block here waiting for new I/O.
5.  **check:** Executes callbacks from `setImmediate()`.
6.  **close callbacks:** Executes close events (e.g., `socket.on('close', ...)`).

### 3. `setImmediate()` vs `setTimeout()`

- **`setTimeout(..., 0)`**: Schedules a script to run after a minimum delay (0ms).
- **`setImmediate()`**: Schedules a script to run **immediately after the current Poll phase** finishes.

**Order:**

- If called within the main module: The order is **non-deterministic** (random).
- If called within an I/O callback (e.g., inside `fs.readFile`): **`setImmediate` always runs first**.

```javascript
const fs = require("fs");
fs.readFile(__filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
});
// Output:
// immediate
// timeout
```

### 4. `process.nextTick()` (Special Case)

`process.nextTick()` is **NOT** part of the Event Loop phases.

- It runs **immediately** after the current operation finishes, regardless of the current phase.
- **Priority:** It has higher priority than `setTimeout` and `setImmediate`.
- **Danger:** Recursive `nextTick` calls can "starve" the I/O loop (preventing it from ever reaching the poll phase).

**When to use:**

1.  To handle errors/cleanup before the event loop continues.
2.  To allow a callback to run _after_ the call stack unwinds but _before_ the event loop proceeds (e.g., emitting an event in a constructor).

```javascript
// Emitting event in constructor requires nextTick
class MyEmitter extends EventEmitter {
  constructor() {
    super();
    process.nextTick(() => {
      this.emit("event");
    });
  }
}
```

---

## 🇻🇳 Vietnamese Version

### 1. Event Loop (Vòng lặp sự kiện) là gì?

**Event Loop** là cơ chế cho phép Node.js thực hiện các tác vụ I/O không chặn (non-blocking) mặc dù nó chỉ chạy trên một luồng đơn (single thread). Nó làm việc bằng cách đẩy các tác vụ nặng (ổ cứng, mạng) cho nhân hệ điều hành xử lý và chạy các hàm callback khi tác vụ hoàn tất.

### 2. Các pha của Event Loop

Event Loop hoạt động theo một vòng tròn gồm các **pha**. Mỗi pha có một hàng đợi (queue) chứa các callback cần thực thi.

1.  **timers:** Chạy các callback của `setTimeout()` và `setInterval()`.
2.  **pending callbacks:** Chạy các I/O callback bị hoãn lại (ví dụ: lỗi TCP).
3.  **idle, prepare:** Dùng nội bộ.
4.  **poll:** Lấy các sự kiện I/O mới; chạy callback liên quan I/O (ví dụ: đọc/ghi file). Node.js thường sẽ chờ (block) ở đây để đợi I/O mới.
5.  **check:** Chạy các callback của `setImmediate()`.
6.  **close callbacks:** Chạy các sự kiện đóng (ví dụ: `socket.on('close', ...)`).

### 3. `setImmediate()` và `setTimeout()`

- **`setTimeout(..., 0)`**: Lên lịch chạy sau một khoảng trễ tối thiểu (0ms).
- **`setImmediate()`**: Lên lịch chạy **ngay sau khi pha Poll hiện tại** kết thúc.

**Thứ tự:**

- Nếu gọi trong module chính: Thứ tự là **ngẫu nhiên** (không xác định).
- Nếu gọi trong một I/O callback (ví dụ: bên trong `fs.readFile`): **`setImmediate` luôn chạy trước**.

```javascript
const fs = require("fs");
fs.readFile(__filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
});
// Kết quả luôn là:
// immediate
// timeout
```

### 4. `process.nextTick()` (Trường hợp đặc biệt)

`process.nextTick()` **KHÔNG** thuộc về các pha của Event Loop.

- Nó chạy **ngay lập tức** sau khi thao tác hiện tại hoàn tất, bất kể đang ở pha nào.
- **Ưu tiên:** Nó có độ ưu tiên cao hơn cả `setTimeout` và `setImmediate`.
- **Nguy hiểm:** Gọi `nextTick` đệ quy liên tục có thể làm "đói" (starve) vòng lặp I/O (khiến nó không bao giờ đến được pha poll).

**Khi nào dùng:**

1.  Để xử lý lỗi/dọn dẹp trước khi event loop tiếp tục.
2.  Để cho phép một callback chạy _sau khi_ call stack hiện tại xong nhưng _trước khi_ event loop đi tiếp (ví dụ: phát sự kiện trong hàm khởi tạo constructor).

```javascript
// Phát sự kiện trong constructor cần dùng nextTick
class MyEmitter extends EventEmitter {
  constructor() {
    super();
    process.nextTick(() => {
      this.emit("event");
    });
  }
}
```
