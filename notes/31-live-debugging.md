# 🐞 Live Debugging in Node.js

## 🇬🇧 English Version

### 1. The Scenario

Your application runs but doesn't behave as expected (e.g., returns wrong data, empty fields in JSON). This is usually a logic error, not a crash.

### 2. What is Live Debugging?

Live debugging allows you to inspect a running process without stopping it immediately. You can:

- **Step through code:** Execute line by line.
- **Inspect variables:** See current values in memory.
- **Control execution:** Pause, resume, step in/out of functions.

### 3. Using the Inspector

Node.js has a built-in **Inspector** compatible with Chrome DevTools.

- **Start with Inspector:**

  ```bash
  node --inspect app.js
  ```

  This opens a debugger port (default: 9229).

- **Break on Start:**

  ```bash
  node --inspect-brk app.js
  ```

  Stops execution at the very first line so you can attach a debugger before the app runs.

- **Connecting:**
  Open Chrome and go to `chrome://inspect`. You will see your Node.js target there. Click "inspect" to open DevTools.

---

## 🇻🇳 Vietnamese Version

### 1. Tình huống

Ứng dụng của bạn chạy bình thường nhưng kết quả không như mong đợi (ví dụ: trả về dữ liệu sai, thiếu trường trong JSON). Đây thường là lỗi logic chứ không phải lỗi sập app.

### 2. Live Debugging là gì?

Live debugging (Gỡ lỗi trực tiếp) cho phép bạn kiểm tra một tiến trình đang chạy. Bạn có thể:

- **Chạy từng dòng:** Xem code chạy từng bước một.
- **Soi biến:** Xem giá trị hiện tại của các biến trong bộ nhớ.
- **Điều khiển:** Tạm dừng, tiếp tục, hoặc nhảy vào/ra khỏi các hàm.

### 3. Sử dụng Inspector

Node.js tích hợp sẵn trình gỡ lỗi **Inspector**, tương thích với Chrome DevTools.

- **Chạy với Inspector:**

  ```bash
  node --inspect app.js
  ```

  Lệnh này mở một cổng gỡ lỗi (mặc định: 9229).

- **Dừng ngay khi khởi động:**

  ```bash
  node --inspect-brk app.js
  ```

  Dừng thực thi ngay dòng code đầu tiên để bạn kịp kết nối trình gỡ lỗi trước khi app chạy.

- **Kết nối:**
  Mở trình duyệt Chrome và truy cập `chrome://inspect`. Bạn sẽ thấy mục tiêu Node.js của mình ở đó. Nhấn "inspect" để mở DevTools.
