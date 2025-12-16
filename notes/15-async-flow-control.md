# 🚦 Asynchronous Flow Control

## 🇬🇧 English Version

### 1. The Core Concept

JavaScript handles I/O operations (file reading, network requests) asynchronously to prevent "blocking" the main thread.

- **Synchronous:** Code executes line-by-line. If one line takes 5 seconds, the next line waits 5 seconds.
- **Asynchronous:** Code initiates a task (e.g., `setTimeout`, network request) and continues executing the next lines immediately. The task results are processed later via a **callback**.

### 2. Control Flow Patterns

When you have multiple asynchronous tasks, managing their order is crucial.

#### A. Serial (Sequential)

Running tasks one after another. Task B starts only after Task A finishes.

- **Use case:** Task B needs the result of Task A.
- **Implementation:** Call the next function inside the callback of the previous one.

```javascript
function serial(operation) {
  execute(operation, (result) => {
    // Start next operation only after this one is done
    serial(nextOperation);
  });
}
```

#### B. Full Parallel

Running all tasks at the same time.

- **Use case:** Sending emails to 100 people. You don't need to wait for email #1 to finish before sending email #2.
- **Implementation:** Loop through items and start the async task for each one immediately. Track a counter to know when all are finished.

```javascript
let count = 0;
items.forEach((item) => {
  asyncTask(item, () => {
    count++;
    if (count === items.length) {
      console.log("All done!");
    }
  });
});
```

#### C. Limited Parallel (Concurrency Limit)

Running tasks in parallel, but limiting how many run at once (e.g., max 5 downloads at a time).

- **Use case:** Processing a list of 1 million items without crashing memory or overwhelming the network.

---

## 🇻🇳 Vietnamese Version

### 1. Khái niệm cốt lõi

JavaScript xử lý các tác vụ I/O (đọc file, gọi mạng) một cách bất đồng bộ để tránh làm "tắc nghẽn" (block) luồng chính.

- **Đồng bộ (Synchronous):** Mã chạy từng dòng. Nếu một dòng tốn 5 giây, dòng tiếp theo phải chờ 5 giây.
- **Bất đồng bộ (Asynchronous):** Mã khởi động một tác vụ (ví dụ: `setTimeout`, gọi mạng) và chạy tiếp các dòng sau ngay lập tức. Kết quả của tác vụ sẽ được xử lý sau thông qua **hàm gọi lại (callback)**.

### 2. Các mẫu điều khiển luồng (Control Flow Patterns)

Khi bạn có nhiều tác vụ bất đồng bộ, việc quản lý thứ tự chạy của chúng rất quan trọng.

#### A. Tuần tự (Serial)

Chạy các tác vụ nối tiếp nhau. Tác vụ B chỉ bắt đầu sau khi Tác vụ A hoàn thành.

- **Khi nào dùng:** Tác vụ B cần kết quả của Tác vụ A.
- **Cách làm:** Gọi hàm tiếp theo bên trong callback của hàm trước đó.

```javascript
function serial(tacvu) {
  thucThi(tacvu, (ketqua) => {
    // Chỉ bắt đầu tác vụ tiếp theo sau khi tác vụ này xong
    serial(tacvuTiepTheo);
  });
}
```

#### B. Song song toàn bộ (Full Parallel)

Chạy tất cả các tác vụ cùng một lúc.

- **Khi nào dùng:** Gửi email cho 100 người. Bạn không cần chờ email #1 gửi xong mới gửi email #2.
- **Cách làm:** Duyệt qua danh sách và khởi động tác vụ bất đồng bộ cho từng phần tử ngay lập tức. Dùng biến đếm để biết khi nào tất cả đã xong.

```javascript
let count = 0;
items.forEach((item) => {
  tacVuBatDongBo(item, () => {
    count++;
    if (count === items.length) {
      console.log("Xong tất cả!");
    }
  });
});
```

#### C. Song song giới hạn (Limited Parallel)

Chạy song song nhưng giới hạn số lượng tác vụ chạy cùng lúc (ví dụ: tối đa 5 file tải xuống cùng lúc).

- **Khi nào dùng:** Xử lý danh sách 1 triệu phần tử mà không muốn làm tràn bộ nhớ hoặc quá tải mạng.
