# ⏲️ Discover JavaScript Timers

## 🇬🇧 English Version

### 1. `setTimeout()`

Executes a function **once** after a specified delay (in milliseconds).

- **Syntax:** `setTimeout(callback, delay, arg1, arg2, ...)`
- **Example:**
  ```javascript
  const timerId = setTimeout(
    (name) => {
      console.log(`Hello, ${name}!`);
    },
    2000,
    "Alice",
  ); // Runs after 2 seconds
  ```
- **Cancelling:** Use `clearTimeout(timerId)` to stop the timer before it runs.

### 2. Zero Delay (`setTimeout(..., 0)`)

Using a delay of `0` doesn't execute the function _immediately_. It puts the function at the end of the current execution queue.

```javascript
setTimeout(() => console.log("After"), 0);
console.log("Before");

// Output:
// Before
// After
```

_Note: This is useful to defer non-urgent code to the next event loop iteration._

### 3. `setInterval()`

Executes a function **repeatedly** at specified intervals.

- **Example:**
  ```javascript
  const intervalId = setInterval(() => {
    console.log("Checking status...");
  }, 1000); // Runs every 1 second
  ```
- **Stopping:** Use `clearInterval(intervalId)` to stop the loop.

### 4. Recursive `setTimeout` (Better than `setInterval`)

If a function takes longer to execute than the interval time, `setInterval` can cause overlaps (running multiple times at once).
To avoid this, use recursive `setTimeout` to ensure the next run only waits **after** the previous one finishes.

```javascript
const myFunction = () => {
  // Do some heavy work...
  console.log("Task done");

  // Schedule the next run only after work is done
  setTimeout(myFunction, 1000);
};

// Start the first run
setTimeout(myFunction, 1000);
```

---

## 🇻🇳 Vietnamese Version

### 1. `setTimeout()`

Thực thi một hàm **một lần duy nhất** sau một khoảng thời gian chờ (tính bằng mili giây).

- **Cú pháp:** `setTimeout(ham_callback, thoi_gian_cho, tham_so1, tham_so2, ...)`
- **Ví dụ:**
  ```javascript
  const timerId = setTimeout(
    (ten) => {
      console.log(`Xin chào, ${ten}!`);
    },
    2000,
    "Alice",
  ); // Chạy sau 2 giây
  ```
- **Hủy bỏ:** Dùng `clearTimeout(timerId)` để hủy hẹn giờ trước khi nó kịp chạy.

### 2. Độ trễ bằng 0 (`setTimeout(..., 0)`)

Đặt thời gian chờ là `0` không có nghĩa là hàm sẽ chạy _ngay lập tức_. Nó sẽ đẩy hàm đó xuống cuối hàng đợi thực thi hiện tại.

```javascript
setTimeout(() => console.log("Sau"), 0);
console.log("Trước");

// Kết quả:
// Trước
// Sau
```

_Lưu ý: Kỹ thuật này hữu ích để hoãn các đoạn code không gấp sang vòng lặp sự kiện tiếp theo._

### 3. `setInterval()`

Thực thi một hàm **lặp đi lặp lại** sau mỗi khoảng thời gian nhất định.

- **Ví dụ:**
  ```javascript
  const intervalId = setInterval(() => {
    console.log("Đang kiểm tra trạng thái...");
  }, 1000); // Chạy mỗi 1 giây
  ```
- **Dừng lặp:** Dùng `clearInterval(intervalId)` để dừng vòng lặp.

### 4. `setTimeout` đệ quy (Tốt hơn `setInterval`)

Nếu một hàm mất nhiều thời gian để chạy hơn khoảng thời gian interval, `setInterval` có thể gây ra hiện tượng chồng chéo (nhiều lần chạy cùng lúc).
Để tránh điều này, hãy dùng `setTimeout` đệ quy để đảm bảo lần chạy tiếp theo chỉ được lên lịch **sau khi** lần chạy trước đã hoàn tất.

```javascript
const hamCuaToi = () => {
  // Làm việc gì đó nặng...
  console.log("Xong việc");

  // Chỉ hẹn giờ chạy lần tới sau khi đã xong việc hiện tại
  setTimeout(hamCuaToi, 1000);
};

// Bắt đầu chạy lần đầu tiên
setTimeout(hamCuaToi, 1000);
```
