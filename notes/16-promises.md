# 🤝 Discover Promises in Node.js

## 🇬🇧 English Version

### 1. What is a Promise?

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation.

- **Analogy:** Ordering a pizza. You don't get the pizza instantly, but you get a "receipt" (Promise). Later, it will either be "Delivered" (Fulfilled) or "Cancelled" (Rejected).

### 2. Promise States

- **Pending:** Initial state, waiting for the operation to finish.
- **Fulfilled:** Operation completed successfully.
- **Rejected:** Operation failed (error).
- **Settled:** Finished (either fulfilled or rejected).

### 3. Creating and Using Promises

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation Successful!");
  } else {
    reject("Something went wrong.");
  }
});

// Consuming the Promise
myPromise
  .then((result) => console.log(result)) // Handle Success
  .catch((error) => console.error(error)) // Handle Failure
  .finally(() => console.log("Done")); // Always runs
```

### 4. Async/Await (Modern Syntax)

Syntactic sugar for Promises that makes asynchronous code look synchronous.

```javascript
async function doTask() {
  try {
    const result = await myPromise; // Waits for promise to resolve
    console.log(result);
  } catch (error) {
    console.error(error); // Catches rejection
  }
}
```

### 5. Advanced Promise Methods

- **`Promise.all([p1, p2])`**: Waits for **all** promises to succeed. Fails immediately if **any** promise rejects.
- **`Promise.allSettled([p1, p2])`**: Waits for all to finish, regardless of success or failure.
- **`Promise.race([p1, p2])`**: Returns result of the **first** promise that settles (wins the race).
- **`Promise.any([p1, p2])`**: Returns result of the **first** promise that fulfills (succeeds). Ignores failures unless all fail.
- **`Promise.try(fn)`**: Executes a function (sync or async) and wraps the result in a Promise. Handles synchronous errors automatically.
- **`Promise.withResolvers()`**: Returns an object `{ promise, resolve, reject }`, allowing you to control the promise from outside the executor.

### 6. Top-Level Await

In **ECMAScript Modules** (ESM), you can use `await` at the top level of a file without wrapping it in an `async` function.

```javascript
// In a module (.mjs)
const data = await fetchData();
console.log(data);
```

### 7. Node.js Event Loop Scheduling

Node.js has special queues for different types of async tasks:

- **`process.nextTick()`**: Runs immediately after current operation, _before_ anything else. High priority.
- **`queueMicrotask()`**: Runs after current script, used for Promises.
- **`setImmediate()`**: Runs in the next iteration of the event loop (after I/O).

---

## 🇻🇳 Vietnamese Version

### 1. Promise là gì?

**Promise** (Lời hứa) là một đối tượng đại diện cho việc hoàn thành (hoặc thất bại) của một tác vụ bất đồng bộ trong tương lai.

- **Ví dụ:** Bạn đặt bánh pizza. Bạn chưa có bánh ngay, nhưng có "hóa đơn" (Promise). Sau này, bánh sẽ "Được giao" (Thành công) hoặc "Bị hủy" (Thất bại).

### 2. Các trạng thái của Promise

- **Pending (Đang chờ):** Trạng thái ban đầu, chưa xong việc.
- **Fulfilled (Đã hoàn thành):** Tác vụ thành công.
- **Rejected (Bị từ chối):** Tác vụ thất bại (có lỗi).
- **Settled (Đã chốt):** Đã xong (dù thành công hay thất bại).

### 3. Tạo và Sử dụng Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
  const thanhCong = true;
  if (thanhCong) {
    resolve("Thao tác thành công!");
  } else {
    reject("Có lỗi xảy ra.");
  }
});

// Sử dụng Promise
myPromise
  .then((ketQua) => console.log(ketQua)) // Xử lý khi thành công
  .catch((loi) => console.error(loi)) // Xử lý khi lỗi
  .finally(() => console.log("Xong")); // Luôn chạy
```

### 4. Async/Await (Cú pháp hiện đại)

Cách viết giúp code bất đồng bộ trông gọn gàng như code đồng bộ.

```javascript
async function thucHienTacVu() {
  try {
    const ketQua = await myPromise; // Đợi Promise giải quyết
    console.log(ketQua);
  } catch (loi) {
    console.error(loi); // Bắt lỗi nếu Promise bị reject
  }
}
```

### 5. Các phương thức Promise nâng cao

- **`Promise.all([p1, p2])`**: Chờ **tất cả** cùng thành công. Lỗi ngay lập tức nếu có **bất kỳ** cái nào thất bại.
- **`Promise.allSettled([p1, p2])`**: Chờ tất cả chạy xong, bất kể thành công hay thất bại.
- **`Promise.race([p1, p2])`**: Lấy kết quả của cái nào chạy xong **đầu tiên** (đua về đích).
- **`Promise.any([p1, p2])`**: Lấy kết quả của cái nào **thành công đầu tiên**. Chỉ báo lỗi nếu tất cả đều thất bại.
- **`Promise.try(fn)`**: Chạy một hàm (đồng bộ hoặc bất đồng bộ) và trả về Promise. Giúp bắt lỗi đồng bộ dễ dàng hơn.
- **`Promise.withResolvers()`**: Trả về đối tượng `{ promise, resolve, reject }`, cho phép giải quyết Promise từ bên ngoài.

### 6. Top-Level Await

Trong **ECMAScript Modules** (ESM), bạn có thể dùng `await` ngay ở cấp cao nhất của file mà không cần bọc trong hàm `async`.

```javascript
// Trong module (.mjs)
const data = await layDuLieu();
console.log(data);
```

### 7. Lập lịch trong Event Loop

Node.js có các hàng đợi ưu tiên cho tác vụ bất đồng bộ:

- **`process.nextTick()`**: Chạy ngay lập tức sau tác vụ hiện tại, _trước_ tất cả mọi thứ khác. Ưu tiên cao nhất.
- **`queueMicrotask()`**: Chạy sau script hiện tại, thường dùng cho Promises.
- **`setImmediate()`**: Chạy vào vòng lặp tiếp theo của Event Loop (sau các tác vụ I/O).
