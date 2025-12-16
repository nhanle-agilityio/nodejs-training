# 🎭 Mocking in Node.js Tests

## 🇬🇧 English Version

### 1. What is Mocking?

Mocking creates a "fake" version of a component (function, module, or API) to control its behavior during tests.

- **Purpose:** To isolate the code being tested and avoid side effects (like database writes or API calls).
- **Stub vs Mock:** A stub usually does nothing, while a mock has a fake implementation (`when 'A' happens, return 'B'`).

### 2. Built-in Mocking (`node:test`)

The native test runner provides powerful mocking capabilities.

- **Mocking Functions:**

  ```javascript
  import { mock } from "node:test";
  const sum = mock.fn((a, b) => a + b);

  sum(2, 3);
  console.log(sum.mock.calls.length); // 1
  ```

- **Mocking Modules (ESM):**
  You can replace entire modules using `mock.module()`.

  ```javascript
  import { mock } from "node:test";

  // Mock the './database.mjs' module before importing it
  mock.module("./database.mjs", {
    namedExports: {
      save: mock.fn(() => "Mocked Save"),
    },
  });

  const { save } = await import("./database.mjs");
  console.log(save()); // 'Mocked Save'
  ```

### 3. Mocking Time (`mock.timers`)

Control time to test `setTimeout`, `setInterval`, or date-dependent logic without waiting.

```javascript
import { mock } from "node:test";

// Freeze time at a specific date
mock.timers.enable({ now: new Date("2023-01-01T00:00:00Z") });

// Tick time forward
mock.timers.tick(1000); // Advance 1 second
```

### 4. Mocking HTTP Requests (with `undici`)

Since Node.js doesn't expose `fetch` internals easily yet, you can use the `undici` library (Node's underlying HTTP client) to intercept requests.

```javascript
import { MockAgent, setGlobalDispatcher } from "undici";

const agent = new MockAgent();
setGlobalDispatcher(agent);

agent
  .get("https://api.example.com")
  .intercept({ path: "/users" })
  .reply(200, { id: 1, name: "Test User" });
```

---

## 🇻🇳 Vietnamese Version

### 1. Mocking là gì?

Mocking là việc tạo ra một phiên bản "giả" của một thành phần (hàm, module, hoặc API) để kiểm soát hành vi của nó trong lúc test.

- **Mục đích:** Để cô lập đoạn code cần test và tránh các tác dụng phụ không mong muốn (như ghi vào database hay gọi API thật).
- **Stub vs Mock:** Stub thường là một hàm rỗng, còn Mock có cài đặt giả (`khi gặp 'A', hãy trả về 'B'`).

### 2. Mocking tích hợp sẵn (`node:test`)

Trình chạy test tự nhiên của Node.js cung cấp các tính năng mocking mạnh mẽ.

- **Mock hàm:**

  ```javascript
  import { mock } from "node:test";
  const sum = mock.fn((a, b) => a + b);

  sum(2, 3);
  console.log(sum.mock.calls.length); // 1
  ```

- **Mock Module (ESM):**
  Bạn có thể thay thế toàn bộ module bằng `mock.module()`.

  ```javascript
  import { mock } from "node:test";

  // Mock module './database.mjs' trước khi import nó
  mock.module("./database.mjs", {
    namedExports: {
      save: mock.fn(() => "Đã lưu giả"),
    },
  });

  const { save } = await import("./database.mjs");
  console.log(save()); // 'Đã lưu giả'
  ```

### 3. Mock thời gian (`mock.timers`)

Kiểm soát thời gian để test `setTimeout`, `setInterval` hoặc logic phụ thuộc ngày tháng mà không cần chờ đợi thực tế.

```javascript
import { mock } from "node:test";

// Đóng băng thời gian tại một thời điểm cụ thể
mock.timers.enable({ now: new Date("2023-01-01T00:00:00Z") });

// Tua nhanh thời gian
mock.timers.tick(1000); // Tiến thêm 1 giây
```

### 4. Mock HTTP Requests (với `undici`)

Vì Node.js chưa lộ rõ phần lõi `fetch` để mock dễ dàng, bạn có thể dùng thư viện `undici` (client HTTP nền tảng của Node) để chặn các request.

```javascript
import { MockAgent, setGlobalDispatcher } from "undici";

const agent = new MockAgent();
setGlobalDispatcher(agent);

agent
  .get("https://api.example.com")
  .intercept({ path: "/users" })
  .reply(200, { id: 1, name: "Test User" });
```
