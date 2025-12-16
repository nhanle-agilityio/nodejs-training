# ⚡ Understanding `process.nextTick()`

## 🇬🇧 English Version

### 1. What is a "Tick"?

In Node.js, every time the runtime starts processing JavaScript code from the event loop, it's called a **Tick**.
`process.nextTick()` does **not** technically execute in the "next" tick; it executes **immediately after the current operation** and **before** the event loop continues to the next phase.

### 2. How it works

- When you call `process.nextTick(callback)`, the callback is added to a special high-priority queue.
- The engine executes all callbacks in this queue as soon as the current synchronous code finishes, before moving on to I/O, timers, or other phases.

### 3. Comparison with `setTimeout(..., 0)`

- **`process.nextTick(() => {})`**: Executes **ASAP**. It cuts in line right after the current function finishes.
- **`setTimeout(() => {}, 0)`**: Executes at the end of the next timer phase (which might be much later).

### 4. When to use it?

Use `nextTick` when you need a function to run asynchronously (after the current stack) but **before** the event loop processes any new I/O events.

- Common use case: Ensuring an event handler is attached before an event is emitted (e.g., in a constructor).

```javascript
console.log("Start");

process.nextTick(() => {
  console.log("Next Tick");
});

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");

// Output:
// Start
// End
// Next Tick
// Timeout
```

---

## 🇻🇳 Vietnamese Version

### 1. "Tick" là gì?

Trong Node.js, mỗi khi môi trường thực thi (runtime) bắt đầu xử lý mã JavaScript từ vòng lặp sự kiện, nó được gọi là một **Tick**.
`process.nextTick()` thực tế **không** chạy vào tick "tiếp theo"; nó chạy **ngay lập tức sau khi thao tác hiện tại hoàn tất** và **trước khi** vòng lặp sự kiện chuyển sang pha tiếp theo.

### 2. Cách hoạt động

- Khi bạn gọi `process.nextTick(callback)`, callback đó được thêm vào một hàng đợi đặc biệt có độ ưu tiên cao.
- Node.js sẽ chạy tất cả các callback trong hàng đợi này ngay khi đoạn code đồng bộ hiện tại chạy xong, trước khi chuyển sang xử lý I/O hay bộ hẹn giờ (timers).

### 3. So sánh với `setTimeout(..., 0)`

- **`process.nextTick(() => {})`**: Chạy **sớm nhất có thể**. Nó "chen hàng" ngay sau khi hàm hiện tại chạy xong.
- **`setTimeout(() => {}, 0)`**: Chạy vào cuối pha timer tiếp theo (thường là muộn hơn nhiều).

### 4. Khi nào nên dùng?

Dùng `nextTick` khi bạn cần một hàm chạy bất đồng bộ (sau khi stack hiện tại xong) nhưng phải **trước khi** vòng lặp sự kiện xử lý bất kỳ sự kiện I/O mới nào.

- Ví dụ phổ biến: Đảm bảo bộ lắng nghe sự kiện (event handler) đã được gắn xong trước khi sự kiện được phát ra (thường gặp trong constructor).

```javascript
console.log("Bắt đầu");

process.nextTick(() => {
  console.log("Next Tick (Ưu tiên cao)");
});

setTimeout(() => {
  console.log("Timeout (Ưu tiên thấp)");
}, 0);

console.log("Kết thúc");

// Kết quả:
// Bắt đầu
// Kết thúc
// Next Tick (Ưu tiên cao)
// Timeout (Ưu tiên thấp)
```
