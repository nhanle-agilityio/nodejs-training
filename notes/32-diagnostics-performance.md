# 🐌 Diagnostics: Poor Performance

## 🇬🇧 English Version

### 1. The Scenario

Your application is slow (high latency), but external factors like databases or APIs are working fine. The bottleneck seems to be in your Node.js code (high CPU usage).

### 2. Goal

Identify which functions or parts of your code are consuming the most CPU time. This helps in optimization to reduce costs and improve user experience.

### 3. Profiling Methods

#### A. V8 Sampling Profiler

Node.js has a built-in profiler that samples the stack periodically.

- **Run with Profiler:**
  ```bash
  node --prof app.js
  ```
  This generates an `isolate-0x....log` file.
- **Process the Log:**
  To make the log readable:
  ```bash
  node --prof-process isolate-0x....log > processed.txt
  ```
  Open `processed.txt` to see which functions took the most time.

#### B. Linux `perf`

A powerful system-wide profiling tool (Linux only).

- It gives deeper insights into both JavaScript code and C++ native code/system calls.
- Requires `perf` tool installed on the OS.

---

## 🇻🇳 Vietnamese Version

### 1. Tình huống

Ứng dụng của bạn chạy chậm (độ trễ cao), nhưng các yếu tố bên ngoài như Database hay API vẫn ổn. Nút thắt cổ chai có vẻ nằm ở chính code Node.js của bạn (ngốn CPU).

### 2. Mục tiêu

Xác định xem hàm nào hoặc đoạn code nào đang tiêu tốn nhiều CPU nhất. Việc này giúp tối ưu hóa code, giảm chi phí server và tăng trải nghiệm người dùng.

### 3. Các phương pháp đo lường (Profiling)

#### A. V8 Sampling Profiler

Node.js có sẵn công cụ profiler tích hợp, nó sẽ lấy mẫu (sample) ngăn xếp định kỳ.

- **Chạy với Profiler:**
  ```bash
  node --prof app.js
  ```
  Lệnh này sẽ tạo ra một file log dạng `isolate-0x....log`.
- **Xử lý Log:**
  Để đọc được file log trên:
  ```bash
  node --prof-process isolate-0x....log > processed.txt
  ```
  Mở file `processed.txt` ra để xem hàm nào chiếm nhiều thời gian nhất.

#### B. Linux `perf`

Một công cụ đo lường cấp hệ thống mạnh mẽ (chỉ có trên Linux).

- Nó cho cái nhìn sâu hơn vào cả code JavaScript lẫn code C++ native và các lời gọi hệ thống (system calls).
- Yêu cầu phải cài đặt công cụ `perf` trên hệ điều hành.
