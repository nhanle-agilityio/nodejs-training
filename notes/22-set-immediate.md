# ⏩ Understanding `setImmediate()`

## 🇬🇧 English Version

### 1. What is `setImmediate()`?

`setImmediate()` schedules a callback function to run **asynchronously** in the next iteration of the Event Loop (specifically in the "check" phase).

```javascript
setImmediate(() => {
  console.log("Run immediately after I/O");
});
```

### 2. The Hierarchy of Async Queues

To understand when `setImmediate` runs, we need to look at the execution order of queues:

1.  **`process.nextTick` queue**: Runs first (Highest priority).
2.  **Promises microtask queue** (`.then()`, `catch`, `await`): Runs second.
3.  **Macrotask queue**: (Includes `setTimeout`, `setInterval`, `setImmediate`).

### 3. Execution Order Example

```javascript
const baz = () => console.log("baz (setImmediate)");
const foo = () => console.log("foo (nextTick)");
const zoo = () => console.log("zoo (nextTick inside promise)");

const start = () => {
  console.log("start");

  setImmediate(baz); // Macrotask

  new Promise((resolve) => {
    resolve("bar (promise)");
  }).then((res) => {
    console.log(res); // Microtask
    process.nextTick(zoo); // New nextTick from Microtask
  });

  process.nextTick(foo); // nextTick
};

start();
```

**Output (CommonJS):**

1.  `start` (Synchronous)
2.  `foo (nextTick)` (process.nextTick queue)
3.  `bar (promise)` (Promises microtask queue)
4.  `zoo (nextTick inside promise)` (Newly added to nextTick queue)
5.  `baz (setImmediate)` (Macrotask queue - last)

### 4. Special Note on ES Modules (`.mjs`)

In ES Modules, the entire script is wrapped as an async operation. This slightly changes the initial order because the script itself is already in the microtask queue.
**Output (ESM):** `start` -> `bar` -> `foo` -> `zoo` -> `baz`

---

## 🇻🇳 Vietnamese Version

### 1. `setImmediate()` là gì?

`setImmediate()` lên lịch cho một hàm callback chạy **bất đồng bộ** vào vòng lặp tiếp theo của Event Loop (cụ thể là ở pha "check").

```javascript
setImmediate(() => {
  console.log("Chạy ngay sau pha I/O");
});
```

### 2. Thứ bậc của các hàng đợi bất đồng bộ

Để hiểu khi nào `setImmediate` chạy, ta cần biết thứ tự ưu tiên:

1.  **Hàng đợi `process.nextTick`**: Chạy đầu tiên (Ưu tiên cao nhất).
2.  **Hàng đợi Promises microtask** (`.then()`, `catch`, `await`): Chạy thứ hai.
3.  **Hàng đợi Macrotask**: (Gồm `setTimeout`, `setInterval`, `setImmediate`).

### 3. Ví dụ về thứ tự thực thi

```javascript
const baz = () => console.log("baz (setImmediate)");
const foo = () => console.log("foo (nextTick)");
const zoo = () => console.log("zoo (nextTick trong promise)");

const start = () => {
  console.log("start");

  setImmediate(baz); // Macrotask

  new Promise((resolve) => {
    resolve("bar (promise)");
  }).then((res) => {
    console.log(res); // Microtask
    process.nextTick(zoo); // Thêm nextTick mới từ Microtask
  });

  process.nextTick(foo); // nextTick
};

start();
```

**Kết quả (CommonJS):**

1.  `start` (Đồng bộ)
2.  `foo (nextTick)` (Hàng đợi process.nextTick)
3.  `bar (promise)` (Hàng đợi Promises microtask)
4.  `zoo (nextTick trong promise)` (Mới được thêm vào hàng đợi nextTick)
5.  `baz (setImmediate)` (Hàng đợi Macrotask - chạy cuối cùng)

### 4. Lưu ý đặc biệt với ES Modules (`.mjs`)

Trong ES Modules, toàn bộ script được bao bọc như một tác vụ bất đồng bộ. Điều này làm thay đổi nhẹ thứ tự ban đầu vì bản thân script đã nằm trong hàng đợi microtask.
**Kết quả (ESM):** `start` -> `bar` -> `foo` -> `zoo` -> `baz`
