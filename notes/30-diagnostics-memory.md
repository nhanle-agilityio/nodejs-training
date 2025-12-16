# 🧠 Memory Diagnostics in Node.js

## 🇬🇧 English Version

### 1. Introduction

Node.js uses a **Garbage Collector (GC)** to manage memory automatically. However, memory leaks can still occur if references to objects are held unintentionally (e.g., in global variables or closures), preventing the GC from freeing them.

### 2. Scenario 1: Process runs out of memory (OOM)

- **Symptoms:**
  - Memory usage increases continuously over time (fast or slow).
  - The process eventually crashes and restarts.
  - Performance degrades before the crash due to heavy GC activity.
- **Side Effects:**
  - Dropped requests (502 errors).
  - High CPU usage (GC trying desperately to free memory).
  - Event Loop blocking.

### 3. Scenario 2: Inefficient Memory Usage

- **Symptoms:**
  - The app uses more memory than expected for its workload.
  - Frequent GC cycles.
- **Side Effects:**
  - Higher latency.
  - Increased infrastructure costs.

### 4. Debugging Tools

To solve memory issues, you need to identify **what** is taking up space and **who** is holding onto it.

- **Heap Snapshot:** A static picture of memory at a specific point in time. Great for finding leaks by comparing snapshots.
- **Heap Profiler:** Tracks memory allocation over time.
- **GC Traces:** Logs garbage collection activity to understand frequency and duration.

---

## 🇻🇳 Vietnamese Version

### 1. Giới thiệu

Node.js sử dụng bộ thu gom rác (**Garbage Collector - GC**) để quản lý bộ nhớ tự động. Tuy nhiên, rò rỉ bộ nhớ (memory leak) vẫn có thể xảy ra nếu các đối tượng vẫn được tham chiếu một cách vô tình (ví dụ: trong biến toàn cục hoặc closure), khiến GC không thể giải phóng chúng.

### 2. Kịch bản 1: Hết bộ nhớ (Out of Memory - OOM)

- **Triệu chứng:**
  - Dung lượng bộ nhớ tăng liên tục theo thời gian.
  - Tiến trình (process) cuối cùng bị sập và khởi động lại.
  - Hiệu năng giảm sút trước khi sập do GC phải hoạt động liên tục.
- **Tác dụng phụ:**
  - Mất kết nối, lỗi request (502).
  - CPU tăng cao (do GC cố gắng giải phóng bộ nhớ trong vô vọng).
  - Chặn Event Loop gây chậm ứng dụng.

### 3. Kịch bản 2: Sử dụng bộ nhớ kém hiệu quả

- **Triệu chứng:**
  - Ứng dụng dùng nhiều RAM hơn mức cần thiết cho tác vụ đó.
  - GC phải chạy quá thường xuyên.
- **Tác dụng phụ:**
  - Độ trễ cao (lag).
  - Tốn chi phí hạ tầng server.

### 4. Công cụ Gỡ lỗi (Debugging)

Để giải quyết, bạn cần biết **cái gì** đang chiếm chỗ và **ai** đang giữ nó lại.

- **Heap Snapshot:** Chụp ảnh nhanh bộ nhớ tại một thời điểm. So sánh các bản chụp để tìm rò rỉ.
- **Heap Profiler:** Theo dõi việc cấp phát bộ nhớ theo thời gian.
- **GC Traces:** Ghi log hoạt động của GC để hiểu tần suất và thời gian chạy của nó.
