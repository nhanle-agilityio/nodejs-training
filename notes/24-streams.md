# 🌊 How to use Streams in Node.js

## 🇬🇧 English Version

### 1. What are Streams?

Streams are a fundamental concept in Node.js for managing data flow efficiently.

- **Analogy:** Streaming a video. You don't wait for the entire 10GB movie to download before watching. You watch it in **chunks** as it arrives.
- **Without Streams:** Reading a 4GB file into memory will crash a server with 1GB RAM.
- **With Streams:** You read 64KB chunks at a time, keeping RAM usage low.
- **Benefits:** Memory efficiency, time efficiency (start processing immediately), and composability.

### 2. Stream Types

- **Readable:** A source you can read from (e.g., `fs.createReadStream`, `process.stdin`, `http.IncomingMessage`).
  - **Flowing Mode:** Data flows automatically (like water from a tap). Uses events like `'data'`.
  - **Paused Mode:** You must explicitly call `stream.read()` to get data.
- **Writable:** A destination you can write to (e.g., `fs.createWriteStream`, `process.stdout`, `http.ServerResponse`).
- **Duplex:** Both Readable and Writable (e.g., TCP Sockets).
- **Transform:** Duplex streams where output is computed from input (e.g., Compression `zlib`, Encryption).

### 3. Key Methods & Events

- **Reading:**
  - `stream.on('data', chunk => ...)`: Handling data chunks.
  - `stream.on('end', () => ...)`: Finished reading.
  - `stream.pause()` / `stream.resume()`: Control flow.
- **Writing:**
  - `stream.write(chunk)`: Writes data. Returns `false` if buffer is full (backpressure).
  - `stream.end()`: Signals no more data to write.
  - `stream.on('drain', () => ...)`: Buffer is empty, ready for more writes.
- **Piping:**
  - **`.pipe(destination)`:** Takes data from a readable stream and writes it to a destination.
    ```javascript
    readableStream.pipe(writableStream);
    ```
  - **`pipeline()` (Recommended):** A safer version of `.pipe()` that handles error cleanup properly.
    ```javascript
    const { pipeline } = require("node:stream");
    pipeline(readStream, transformStream, writeStream, (err) => {
      if (err) console.error("Pipeline failed", err);
      else console.log("Pipeline succeeded");
    });
    ```

### 4. Backpressure

If the readable stream is faster than the writable stream (e.g., reading from fast disk -> writing to slow network), the internal buffer fills up.

- **Mechanism:** `writable.write()` returns `false`.
- **Action:** The readable stream should pause.
- **Resume:** When the writable stream drains (`'drain'` event), the readable stream resumes.
- `pipe()` and `pipeline()` handle this automatically.

### 5. Async Iterators

Modern Node.js allows using `for await...of` loop with streams, which is cleaner than events.

```javascript
const fs = require("fs");
const readStream = fs.createReadStream("./file.txt");

async function processFile() {
  for await (const chunk of readStream) {
    console.log("Received chunk:", chunk.length);
  }
  console.log("Done");
}
processFile();
```

### 6. Object Mode

By default, streams work with Buffers/Strings.

- **Object Mode:** Allows streams to push generic JavaScript objects.
  ```javascript
  const { Readable } = require("stream");
  const myStream = Readable.from([{ id: 1 }, { id: 2 }]); // Creates object-mode stream
  ```

### 7. Node.js Streams vs Web Streams

Node.js Streams are unique to Node.js and have existed for a long time.

- **Web Streams:** The modern standard API (WHATWG Streams) available in browsers (and now in Node.js global scope).
- **Differences:** Different API methods (e.g., `pipeTo()` vs `pipe()`, `getReader()` vs `read()`).
- **Interoperability:** You can convert between them using `.toWeb()` and `.fromWeb()` methods in Node.js.

---

## 🇻🇳 Vietnamese Version

### 1. Streams là gì?

Streams là khái niệm cơ bản trong Node.js để quản lý luồng dữ liệu một cách hiệu quả.

- **Ví dụ:** Xem phim trực tuyến. Bạn không đợi tải hết bộ phim 10GB rồi mới xem. Bạn xem từng **phần nhỏ (chunk)** ngay khi nó tải về.
- **Không dùng Streams:** Đọc một file 4GB vào bộ nhớ sẽ làm sập server có 1GB RAM.
- **Dùng Streams:** Bạn đọc từng mảnh 64KB một lần, giữ cho việc sử dụng RAM luôn thấp.
- **Lợi ích:** Tiết kiệm bộ nhớ, xử lý nhanh hơn (xử lý ngay khi có dữ liệu), và khả năng kết hợp (composability).

### 2. Các loại Stream

- **Readable:** Nguồn dữ liệu để đọc (ví dụ: `fs.createReadStream`, `process.stdin`).
  - **Flowing Mode:** Dữ liệu chảy tự động (như nước vòi). Dùng sự kiện `'data'`.
  - **Paused Mode:** Bạn phải tự gọi `stream.read()` để lấy dữ liệu.
- **Writable:** Đích đến để ghi dữ liệu (ví dụ: `fs.createWriteStream`, `process.stdout`).
- **Duplex:** Vừa đọc vừa ghi (ví dụ: TCP Sockets).
- **Transform:** Stream Duplex mà đầu ra được tính toán từ đầu vào (ví dụ: Nén `zlib`, Mã hóa).

### 3. Phương thức & Sự kiện chính

- **Đọc:**
  - `stream.on('data', chunk => ...)`: Xử lý từng phần dữ liệu.
  - `stream.on('end', () => ...)`: Đã đọc xong.
- **Ghi:**
  - `stream.write(chunk)`: Ghi dữ liệu. Trả về `false` nếu bộ đệm đầy.
  - `stream.end()`: Báo hiệu không còn dữ liệu để ghi.
  - `stream.on('drain', () => ...)`: Bộ đệm đã rỗng, sẵn sàng ghi tiếp.
- **Nối ống (Piping):**
  - **`.pipe(destination)`:** Lấy dữ liệu từ nguồn đọc và đổ vào đích ghi.
  - **`pipeline()` (Khuyên dùng):** Phiên bản an toàn hơn của `.pipe()`, tự động xử lý lỗi và dọn dẹp tài nguyên.

### 4. Backpressure (Áp lực ngược)

Nếu tốc độ đọc nhanh hơn tốc độ ghi (ví dụ: đọc từ ổ cứng nhanh -> gửi qua mạng chậm), bộ đệm nội bộ sẽ bị đầy.

- **Cơ chế:** Hàm `write()` trả về `false`.
- **Hành động:** Nguồn đọc sẽ tạm dừng gửi dữ liệu.
- **Tiếp tục:** Khi đích ghi xử lý xong (`drain`), nguồn đọc mới tiếp tục gửi.
- `pipe()` và `pipeline()` tự động xử lý việc này.

### 5. Async Iterators

Node.js hiện đại cho phép dùng vòng lặp `for await...of` với streams, giúp code gọn hơn so với dùng sự kiện.

```javascript
const fs = require("fs");
const readStream = fs.createReadStream("./file.txt");

async function processFile() {
  for await (const chunk of readStream) {
    console.log("Nhận được chunk:", chunk.length);
  }
  console.log("Xong");
}
processFile();
```

### 6. Object Mode

Mặc định stream làm việc với Buffer/String.

- **Object Mode:** Cho phép stream truyền các đối tượng JavaScript thông thường (object, array) thay vì chỉ nhị phân.

### 7. Node.js Streams và Web Streams

Node.js Streams là đặc thù của Node.js và đã tồn tại từ lâu.

- **Web Streams:** Là chuẩn API hiện đại (WHATWG) có sẵn trên trình duyệt (và giờ cũng có trong Node.js).
- **Khác biệt:** API khác nhau (ví dụ: `pipeTo()` so với `pipe()`, `getReader()` so với `read()`).
- **Chuyển đổi:** Bạn có thể chuyển đổi qua lại giữa hai loại này bằng các hàm `.toWeb()` và `.fromWeb()` trong Node.js.
