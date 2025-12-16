# Hành Trình Học Node.js - Tóm Tắt Toàn Diện

**Hướng Dẫn Đầy Đủ Về Các Kiến Thức Cơ Bản Node.js**

---

## 📚 Mục Lục

1. [Cơ Bản Dòng Lệnh](#1-cơ-bản-dòng-lệnh)
2. [Thao Tác File System](#2-thao-tác-file-system)
3. [Lập Trình Bất Đồng Bộ](#3-lập-trình-bất-đồng-bộ)
4. [Modules & Streams](#4-modules--streams)
5. [Chẩn Đoán & Gỡ Lỗi](#5-chẩn-đoán--gỡ-lỗi)
6. [Kiểm Thử (Testing)](#6-kiểm-thử-testing)
7. [NPX & Quản Lý Package](#7-npx--quản-lý-package)

---

## 1. Cơ Bản Dòng Lệnh

### Chạy Script Node.js
- **Thực thi cơ bản**: `node app.js`
- **Shebang cho file thực thi**: `#!/usr/bin/env node`
- **Chế độ watch**: `node --watch script.js` (tự động tải lại khi có thay đổi)
- **Task runner**: `node --run <task>` (chạy scripts từ package.json)

### REPL (Shell Tương Tác)
- Khởi động bằng: `node`
- Biến đặc biệt `_` lưu kết quả cuối cùng
- Các lệnh chấm: `.help`, `.editor`, `.exit`
- Kiểm tra và thử nghiệm nhanh

### Xuất Dữ Liệu Console
- Ghi log cơ bản: `console.log()`, `console.error()`, `console.warn()`
- Định dạng: `console.count()`, `console.time()`, `console.trace()`
- Màu sắc đầu ra: `styleText()` từ `node:util`

### Biến Môi Trường
- Truy cập qua: `process.env.TEN_BIEN`
- Hỗ trợ `.env` tự nhiên: `node --env-file=.env script.js`
- Tải theo chương trình: `process.loadEnvFile()`

---

## 2. Thao Tác File System

### Thông Tin & Trạng Thái File
```javascript
const fs = require('fs');
const stats = fs.statSync('file.txt');
stats.isFile();        // Kiểm tra có phải file
stats.isDirectory();   // Kiểm tra có phải thư mục
stats.size;            // Kích thước file (bytes)
```

### Làm Việc Với Đường Dẫn
```javascript
const path = require('path');
path.dirname('/path/to/file.txt');   // Lấy thư mục
path.basename('/path/to/file.txt');  // Lấy tên file
path.extname('file.txt');            // Lấy phần mở rộng
path.join('dir', 'file.txt');        // Nối đường dẫn an toàn
```

### Đọc File
- **Toàn bộ file**: `fs.readFile()`, `fs.readFileSync()`, `fsPromises.readFile()`
- **Streams** (file lớn): `fs.createReadStream()`

### Ghi File
- **Ghi đè**: `fs.writeFile()`, `fs.writeFileSync()`
- **Thêm vào**: `fs.appendFile()`
- **Flags**: `r`, `w`, `a`, `r+`, `w+`, `a+`

### File Descriptors
- Thao tác file cấp thấp
- Mở: `fs.open(path, 'r', callback)`
- Đọc/Ghi với fd: `fs.read(fd, buffer, ...)`
- Luôn đóng: `fs.close(fd, callback)`

### Làm Việc Với Thư Mục
```javascript
fs.existsSync('dir');              // Kiểm tra tồn tại
fs.mkdirSync('dir', {recursive: true}); // Tạo thư mục
fs.readdirSync('dir');             // Liệt kê nội dung
fs.rmSync('dir', {recursive: true}); // Xóa thư mục
```

### Vấn Đề Filesystem Đa Nền Tảng
- **Phân biệt hoa thường**: Windows (không phân biệt), Linux/Mac (phân biệt)
- **Chuẩn hóa Unicode**: NFC vs NFD
- **Thực hành tốt nhất**: Luôn chuẩn hóa để so sánh: `str.normalize('NFC')`

---

## 3. Lập Trình Bất Đồng Bộ

### Callbacks (Mẫu Truyền Thống)
```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```
- **Error-first callbacks**: Tham số đầu tiên luôn là lỗi
- **Vấn đề**: Callback hell (callbacks lồng nhau)

### Promises (Cách Tiếp Cận Hiện Đại)
```javascript
const fsPromises = require('fs').promises;

fsPromises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log('Xong'));
```

**Trạng thái**: Pending → Fulfilled/Rejected → Settled

**Phương thức nâng cao**:
- `Promise.all([p1, p2])` - Chờ tất cả (thất bại nếu có bất kỳ cái nào thất bại)
- `Promise.race([p1, p2])` - Cái nào hoàn thành đầu tiên thắng
- `Promise.allSettled([p1, p2])` - Chờ tất cả (không bao giờ reject)
- `Promise.any([p1, p2])` - Cái nào thành công đầu tiên thắng

### Async/Await (Cú Pháp Sạch Nhất)
```javascript
async function readData() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### Timers (Bộ Đếm Thời Gian)
- `setTimeout(fn, ms)` - Chạy một lần sau độ trễ
- `setInterval(fn, ms)` - Chạy lặp lại
- `setImmediate(fn)` - Chạy trong vòng lặp event loop tiếp theo
- `process.nextTick(fn)` - Chạy ngay lập tức sau thao tác hiện tại (ưu tiên cao nhất)

### Event Loop & Non-Blocking
**Các pha Event Loop**:
1. Timers → Pending callbacks → Poll → Check → Close callbacks

**Thứ tự ưu tiên**:
```
process.nextTick() (cao nhất)
  ↓
Microtasks (Promises)
  ↓
setImmediate()
  ↓
setTimeout()
```

**Nguyên tắc chính**: Không bao giờ chặn event loop!
- Dùng phương thức async, không phải sync (`*Sync`)
- Tránh regex phức tạp (tấn công ReDoS)
- Phân chia các tính toán nặng
- Chuyển sang Worker Threads khi cần

### Event Emitter
```javascript
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();
emitter.on('event', (arg) => console.log(arg));
emitter.emit('event', 'Xin chào!');
```

---

## 4. Modules & Streams

### Hệ Thống Module

**CommonJS (Truyền thống)**:
```javascript
// Export
module.exports = { hello: () => 'Xin chào' };

// Import
const myModule = require('./myModule');
```

**ES Modules (Hiện đại)**:
```javascript
// Export
export function hello() { return 'Xin chào'; }
export default subtract;

// Import
import { hello } from './myModule.mjs';
import subtract from './myModule.mjs';
```

### Streams (Xử Lý Dữ Liệu Hiệu Quả)

**4 Loại**:
1. **Readable** - Nguồn dữ liệu (đọc từ)
2. **Writable** - Đích đến (ghi vào)
3. **Duplex** - Vừa đọc vừa ghi
4. **Transform** - Biến đổi dữ liệu khi đi qua

**Sử dụng cơ bản**:
```javascript
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

// Pipe (tự động xử lý backpressure)
readStream.pipe(writeStream);

// Hoặc dùng pipeline (xử lý lỗi tốt hơn)
const { pipeline } = require('stream');
pipeline(readStream, writeStream, (err) => {
  if (err) console.error(err);
});
```

**Backpressure**: Ngăn tràn bộ nhớ khi producer nhanh hơn consumer
- `write()` trả về `false` khi buffer đầy
- Lắng nghe sự kiện `'drain'` để tiếp tục
- `pipe()` tự động xử lý điều này

**Object Mode**: Stream các đối tượng JavaScript thay vì buffers
```javascript
const stream = new Transform({
  objectMode: true,
  transform(obj, encoding, callback) {
    this.push({ ...obj, processed: true });
    callback();
  }
});
```

### Xuất Bản Packages

**Các trường quan trọng trong package.json**:
```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "./index.js",
  "exports": {
    ".": {
      "require": "./index.cjs",
      "import": "./index.mjs"
    }
  },
  "type": "module",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Cho công cụ CLI** (sẵn sàng cho npx):
```json
{
  "bin": {
    "my-tool": "./cli.js"
  }
}
```

**Tính Ổn Định ABI (Node-API)**:
- Native addons hoạt động trên các phiên bản Node.js mà không cần biên dịch lại
- Giao diện nhị phân tương thích về phía trước

---

## 5. Chẩn Đoán & Gỡ Lỗi

### Vấn Đề Bộ Nhớ

**Triệu chứng**:
- Crash Out of Memory (OOM)
- Heap sử dụng tăng dần
- Hiệu suất chậm

**Công cụ**:
- **Heap Snapshot**: `node --inspect` + Chrome DevTools
- **Heap Profiler**: Theo dõi phân bổ theo thời gian
- **GC Traces**: `node --trace-gc script.js`

### Hiệu Suất CPU

**Phương pháp Profiling**:
```bash
# V8 Sampling Profiler
node --prof script.js
node --prof-process isolate-*.log > profile.txt

# Flame Graphs (với perf trên Linux)
perf record -F 99 -p PID -g
perf script > out.perf
```

**Công cụ**:
- `0x` - Trình tạo flame graph tự động
- Tab Performance trong Chrome DevTools

### Gỡ Lỗi Trực Tiếp
```bash
# Khởi động với inspector
node --inspect script.js

# Hoặc dừng ngay khi bắt đầu
node --inspect-brk script.js

# Kết nối qua chrome://inspect
```

**Tính năng**:
- Đặt breakpoints
- Chạy từng bước code
- Kiểm tra biến
- Đánh giá biểu thức trong console

### Các Vấn Đề Hiệu Suất Phổ Biến
- **Thao tác sync chặn**: Dùng các phương án async thay thế
- **ReDoS**: Tránh regex phức tạp trên input người dùng
- **JSON DOS**: Giới hạn kích thước JSON payload
- **Tính toán nặng**: Phân chia hoặc dùng Worker Threads

---

## 6. Kiểm Thử (Testing)

### Test Runner Tích Hợp (Node.js v18+)

**Cấu trúc cơ bản**:
```javascript
const { test, describe } = require('node:test');
const assert = require('node:assert');

describe('Hàm toán học', () => {
  test('cộng số', () => {
    assert.strictEqual(2 + 2, 4);
  });
  
  test('thao tác async', async () => {
    const result = await fetchData();
    assert.strictEqual(result.status, 'ok');
  });
});
```

**Chạy tests**:
```bash
node --test                           # Chạy tất cả tests
node --test tests/myfile.test.js      # Chạy file cụ thể
node --test --watch                   # Chế độ watch
```

### Các Assertion Phổ Biến
```javascript
assert.strictEqual(actual, expected);        // ===
assert.deepStrictEqual(obj1, obj2);          // So sánh sâu
assert.ok(value);                            // Truthy
assert.throws(() => fn());                   // Nên throw
assert.rejects(async () => await fn());      // Nên reject
```

### Hooks (Thiết Lập/Dọn Dẹp)
```javascript
describe('suite', () => {
  before(() => { /* chạy một lần trước tất cả tests */ });
  after(() => { /* chạy một lần sau tất cả tests */ });
  beforeEach(() => { /* chạy trước mỗi test */ });
  afterEach(() => { /* chạy sau mỗi test */ });
});
```

### Mocking
```javascript
const { mock } = require('node:test');

// Mock function
const fn = mock.fn(() => 42);
fn();
assert.strictEqual(fn.mock.calls.length, 1);

// Mock timers
mock.timers.enable();
mock.timers.tick(1000);  // Tua 1 giây
```

### Độ Phủ Code (Code Coverage)
```bash
node --test --experimental-test-coverage

# Với ngưỡng
node --test --experimental-test-coverage \
  --test-coverage-lines=90
```

---

## 7. NPX & Quản Lý Package

### NPX là gì?
- Thực thi npm packages **mà không cài đặt vĩnh viễn**
- Hoàn hảo cho lệnh một lần
- Luôn dùng phiên bản mới nhất (nếu chỉ định)
- Packages được cache nhưng không thêm vào dependencies

### Cách Sử Dụng Phổ Biến
```bash
# Chạy package trực tiếp
npx cowsay "Xin chào"

# Phiên bản cụ thể
npx typescript@4.9.0 --version

# Tạo dự án mới
npx create-react-app my-app
npx create-next-app my-next-app

# Chạy công cụ local
npx eslint .
npx prettier --write .

# Bỏ qua prompt cài đặt
npx -y http-server
```

### Tạo Packages Sẵn Sàng Cho NPX

**1. Thêm shebang vào script**:
```javascript
#!/usr/bin/env node
console.log('Xin chào từ CLI!');
```

**2. Cấu hình package.json**:
```json
{
  "name": "my-cli-tool",
  "version": "1.0.0",
  "bin": {
    "my-tool": "./cli.js"
  }
}
```

**3. Làm cho có thể thực thi**:
```bash
chmod +x cli.js
```

**4. Xuất bản**:
```bash
npm publish
```

**5. Sử dụng**:
```bash
npx my-cli-tool
```

---

## 🎯 Điểm Chính Cần Ghi Nhớ

### Nguyên Tắc Cơ Bản

1. **Async Theo Mặc Định**: Luôn ưu tiên phương thức async hơn sync
2. **Không Bao Giờ Chặn**: Đừng chặn event loop hoặc worker pool
3. **Streams Cho Dữ Liệu Lớn**: Dùng streams thay vì tải toàn bộ file
4. **Error-First Callbacks**: Luôn xử lý lỗi như tham số đầu tiên
5. **Promises > Callbacks**: Dùng async/await cho code sạch hơn

### Thực Hành Tốt Nhất

**Thao Tác File**:
```javascript
// ❌ Tệ - Chặn event loop
const data = fs.readFileSync('large-file.txt');

// ✅ Tốt - Không chặn
const data = await fsPromises.readFile('large-file.txt');

// ✅ Tốt hơn - Cho file rất lớn
const stream = fs.createReadStream('huge-file.txt');
```

**Xử Lý Lỗi**:
```javascript
// ❌ Tệ - Rejection không được xử lý
async function badCode() {
  const data = await fetchData(); // Không có try-catch!
}

// ✅ Tốt - Xử lý lỗi đúng cách
async function goodCode() {
  try {
    const data = await fetchData();
    return data;
  } catch (err) {
    console.error('Thất bại:', err);
    throw err;
  }
}
```

**Tổ Chức Module**:
```javascript
// ✅ Dùng ES Modules khi có thể
import { readFile } from 'fs/promises';

// ✅ Hoặc CommonJS cho tương thích
const { readFile } = require('fs').promises;
```

### Các Mẫu Phổ Biến

**1. Điều Khiển Luồng Async**:
```javascript
// Tuần tự (lần lượt)
const result1 = await task1();
const result2 = await task2(result1);

// Song song (tất cả cùng lúc)
const [r1, r2, r3] = await Promise.all([task1(), task2(), task3()]);

// Đồng thời giới hạn
async function runInBatches(tasks, limit) {
  const results = [];
  for (let i = 0; i < tasks.length; i += limit) {
    const batch = tasks.slice(i, i + limit);
    results.push(...await Promise.all(batch.map(t => t())));
  }
  return results;
}
```

**2. Stream Pipeline**:
```javascript
const { pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');

pipeline(
  createReadStream('input.txt'),
  createGzip(),
  createWriteStream('input.txt.gz'),
  (err) => {
    if (err) console.error('Pipeline thất bại:', err);
    else console.log('Pipeline thành công');
  }
);
```

**3. Mẫu Event Emitter**:
```javascript
class DataProcessor extends EventEmitter {
  async process(data) {
    this.emit('start', data.length);
    try {
      const result = await heavyOperation(data);
      this.emit('complete', result);
      return result;
    } catch (err) {
      this.emit('error', err);
      throw err;
    }
  }
}
```

---

## 📖 Tài Nguyên Học Tập Đã Tạo

### Ghi Chú (38 file)
1. Dòng lệnh: Chạy scripts, REPL, console output, env variables
2. HTTP: Transactions, enterprise network config
3. File System: Stats, paths, reading, writing, descriptors, folders, cross-platform
4. Async: Callbacks, flow control, promises, timers, blocking, event loop, emitters
5. Modules: Streams, backpressure, publishing, Node-API, ABI stability
6. Diagnostics: User journey, memory, debugging, performance, flame graphs
7. Testing: Introduction, test runner, mocking, coverage
8. NPX: Hướng dẫn đầy đủ với ví dụ

### Ví Dụ (24 file)
- Ví dụ cơ bản: executable script, streams, file descriptors, Unicode, env files
- Ví dụ async: blocking vs non-blocking, event loop order, event emitter, promises, partitioning
- Ví dụ module: CommonJS, ESM, readable/writable/transform streams, pipe, backpressure, object mode
- Ví dụ diagnostic: memory leak simulator, CPU profiling, live debugging, performance monitoring
- NPX: CLI demo tool, ví dụ thực tế

### Tests (2 file)
- `basic.test.js`: Hướng dẫn toàn diện về các kiến thức cơ bản testing
- `README.md`: Hướng dẫn testing cho người mới bắt đầu

---

## 🚀 Bước Tiếp Theo

1. **Thực hành**: Chạy tất cả các ví dụ trong thư mục `examples/`
2. **Kiểm thử**: Thử các file test và viết test của riêng bạn
3. **Xây dựng**: Tạo một công cụ CLI hoặc API Node.js nhỏ
4. **Khám phá**: Tìm hiểu các framework (Express, Fastify, NestJS)
5. **Triển khai**: Học về deployment production và monitoring

---

**Chúc mừng!** Bạn đã học xong tất cả các khái niệm cơ bản của Node.js. Bây giờ bạn đã sẵn sàng để xây dựng các ứng dụng production! 🎉

