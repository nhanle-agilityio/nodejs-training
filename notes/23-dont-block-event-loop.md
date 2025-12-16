# 🚫 Don't Block the Event Loop (or the Worker Pool)

## 🇬🇧 English Version

### 1. The Golden Rule

**"Node.js is fast when the work associated with each client at any given time is 'small'."**
Since Node.js handles many clients with few threads (one Event Loop + a few Workers), one heavy task can make everyone else wait.

### 2. What runs where?

- **Event Loop (Main Thread):** Runs your JavaScript code (callbacks, initialization, promises). It must be fast!
- **Worker Pool (libuv):** Runs heavy tasks (File I/O, DNS, Crypto, Zlib). Default pool size is 4.

### 3. How to Block the Event Loop (Bad Practices)

If the Event Loop is blocked, **NO** new requests can be handled. The server freezes.

- **ReDoS (Regular Expression Denial of Service):** Using vulnerable regex patterns on user input.
  - _Bad:_ `/(a+)+$/` on long strings.
  - _Fix:_ Use simple string methods (`indexOf`) or safe regex tools (`safe-regex`).
- **Sync Core APIs:** Using `fs.readFileSync`, `crypto.randomBytesSync`, `zlib.inflateSync` in server handlers.
- **JSON DOS:** `JSON.parse` or `JSON.stringify` on massive objects.
  - _Fix:_ Use streaming JSON libraries (`JSONStream`).
- **Heavy Calculation:** `O(n^2)` loops or heavy math.

### 4. Solutions for Heavy Tasks

- **Partitioning:** Break a large calculation into small steps. Use `setImmediate()` to yield control back to the Event Loop between steps.
- **Offloading:** Move heavy work to a **Worker Thread** or a separate Child Process.
  - Use Node.js built-in `Worker Threads` module.
  - Use a separate microservice for heavy lifting.

### 5. Don't Block the Worker Pool

Even though Workers run in the background, blocking them is also bad. If all workers are busy reading a huge file or generating crypto keys, new I/O tasks (like DNS lookups) will wait.

- **Solution:** Partition heavy I/O tasks (e.g., read files as streams instead of reading all at once).

---

## 🇻🇳 Vietnamese Version

### 1. Quy tắc vàng

**"Node.js chỉ nhanh khi khối lượng công việc cho mỗi client tại một thời điểm là 'nhỏ'."**
Vì Node.js xử lý nhiều client với rất ít luồng (một Event Loop + vài Worker), chỉ một tác vụ nặng cũng có thể bắt tất cả những người khác phải chờ đợi.

### 2. Cái gì chạy ở đâu?

- **Event Loop (Luồng chính):** Chạy mã JavaScript của bạn (callback, khởi tạo, promise). Nó bắt buộc phải rất nhanh!
- **Worker Pool (libuv):** Chạy các tác vụ nặng (Đọc ghi File, DNS, Mã hóa, Nén). Mặc định chỉ có 4 worker.

### 3. Cách làm tắc nghẽn Event Loop (Thói quen xấu)

Nếu Event Loop bị chặn, **KHÔNG** yêu cầu mới nào được xử lý. Server sẽ bị treo.

- **ReDoS (Tấn công từ chối dịch vụ bằng Regex):** Dùng regex phức tạp, dễ tổn thương trên dữ liệu người dùng nhập.
  - _Xấu:_ `/(a+)+$/` với chuỗi dài.
  - _Sửa:_ Dùng các hàm chuỗi đơn giản (`indexOf`) hoặc công cụ regex an toàn (`safe-regex`).
- **API Đồng bộ:** Dùng `fs.readFileSync`, `crypto.randomBytesSync`... trong khi đang xử lý request của user.
- **JSON DOS:** `JSON.parse` hoặc `JSON.stringify` trên các object khổng lồ.
  - _Sửa:_ Dùng thư viện JSON dạng dòng chảy (`JSONStream`).
- **Tính toán nặng:** Vòng lặp lồng nhau `O(n^2)` hoặc tính toán phức tạp.

### 4. Giải pháp cho tác vụ nặng

- **Phân nhỏ (Partitioning):** Chia một tính toán lớn thành nhiều bước nhỏ. Dùng `setImmediate()` để trả lại quyền điều khiển cho Event Loop giữa các bước.
- **Chuyển tải (Offloading):** Đẩy việc nặng sang một **Worker Thread** hoặc Child Process riêng biệt.
  - Dùng module `Worker Threads` có sẵn của Node.js.
  - Dùng một microservice riêng để xử lý việc nặng.

### 5. Đừng chặn Worker Pool

Dù Worker chạy ngầm, nhưng làm tắc chúng cũng không tốt. Nếu tất cả worker đều bận đọc file lớn hoặc mã hóa, các tác vụ I/O mới (như phân giải DNS) sẽ phải xếp hàng chờ.

- **Giải pháp:** Phân nhỏ tác vụ I/O (ví dụ: đọc file bằng Stream thay vì đọc một lần hết luôn).
