# 🔥 Flame Graphs in Node.js

## 🇬🇧 English Version

### 1. What is a Flame Graph?

A **Flame Graph** is a visualization of CPU usage.

- **Y-axis (Height):** Stack depth. It shows the chain of function calls (who called whom).
- **X-axis (Width):** Time (or number of samples). **Wider bars** mean the function (and its children) spent more time on the CPU.
- **Goal:** Find the widest bars to identify bottlenecks (synchronous code blocking the event loop).

### 2. Tools to Create Flame Graphs

1.  **`0x` (Zero-Ex):** A popular, easy-to-use npm tool.
    - Install: `npm install -g 0x`
    - Run: `0x app.js`
    - Result: Opens an interactive flame graph in your browser automatically.

2.  **Linux `perf` + Brendan Gregg's Tools:** The manual, low-level way (Linux only).
    - Record: `perf record -e cycles:u -g -- node --perf-basic-prof app.js`
    - Convert: Process the output using `stackcollapse-perf.pl` and `flamegraph.pl` scripts.

### 3. Profiling Flags

When profiling Node.js, you often need flags to make JavaScript function names visible to system tools (like `perf`):

- `--perf-basic-prof`: Generates a mapping file for JS symbols.
- `--interpreted-frames-native-stack`: Helps resolve interpreted frames in newer V8 versions (Node 10+).

---

## 🇻🇳 Vietnamese Version

### 1. Flame Graph là gì?

**Flame Graph (Biểu đồ lửa)** là một dạng biểu đồ trực quan hóa việc sử dụng CPU.

- **Trục tung (Cao):** Độ sâu ngăn xếp (Stack depth). Nó cho biết chuỗi các hàm gọi nhau.
- **Trục hoành (Rộng):** Thời gian (hoặc số lượng mẫu). **Thanh càng rộng** nghĩa là hàm đó (và các hàm con của nó) chiếm càng nhiều thời gian CPU.
- **Mục tiêu:** Tìm các thanh rộng nhất để xác định nút thắt cổ chai (đoạn code đồng bộ làm nghẽn CPU).

### 2. Công cụ tạo Flame Graphs

1.  **`0x`:** Công cụ npm phổ biến, dễ dùng nhất.
    - Cài đặt: `npm install -g 0x`
    - Chạy: `0x app.js`
    - Kết quả: Tự động mở biểu đồ tương tác trên trình duyệt.

2.  **Linux `perf` + Bộ công cụ của Brendan Gregg:** Cách thủ công, cấp thấp (chỉ trên Linux).
    - Ghi lại: `perf record -e cycles:u -g -- node --perf-basic-prof app.js`
    - Chuyển đổi: Xử lý dữ liệu đầu ra bằng các script `stackcollapse-perf.pl` và `flamegraph.pl`.

### 3. Các cờ (Flags) khi đo lường

Khi đo lường Node.js, bạn thường cần các cờ để hiển thị tên hàm JavaScript cho các công cụ hệ thống (như `perf`):

- `--perf-basic-prof`: Tạo file ánh xạ cho các ký hiệu JS.
- `--interpreted-frames-native-stack`: Giúp giải quyết các khung (frames) thông dịch trong các phiên bản V8 mới (Node 10+).
