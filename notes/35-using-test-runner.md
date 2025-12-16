# 🛠️ Using Node.js Test Runner

## 🇬🇧 English Version

### 1. Basic Structure

The native test runner (`node:test`) uses a structure familiar to Jest or Mocha users.

- **Import:** `import { test, describe, it } from 'node:test';`
- **Assertion:** `import assert from 'node:assert/strict';`

```javascript
import { test, describe, it } from "node:test";
import assert from "node:assert/strict";

test("top level test", () => {
  assert.equal(1, 1);
});

describe("A suite", () => {
  it("should pass", () => {
    assert.strictEqual("a", "a");
  });
});
```

### 2. Setup & Teardown

You can use hooks to run code before/after tests.

- `before()`: Runs once before all tests in the suite.
- `after()`: Runs once after all tests.
- `beforeEach()`: Runs before each individual test.
- `afterEach()`: Runs after each individual test.

```javascript
import { describe, it, before, after } from "node:test";

describe("Database Tests", () => {
  before(() => console.log("Connecting DB..."));
  after(() => console.log("Disconnecting DB..."));

  it("queries data", () => {
    /* ... */
  });
});
```

### 3. Dynamic Tests

You can generate tests dynamically using loops.

- **Use `t.test()`** inside a parent test context to create sub-tests dynamically.

```javascript
import { test } from "node:test";
import assert from "node:assert/strict";

const inputs = [1, 2, 3];

test("Dynamic tests", (t) => {
  for (const num of inputs) {
    t.test(`Square of ${num}`, () => {
      assert.equal(num * num, num ** 2);
    });
  }
});
```

### 4. Snapshot Testing (Experimental)

Node.js supports snapshot testing (verifying output matches a previously saved "snapshot").

- Enable with flag: `--experimental-test-snapshots`
- Usage: `t.assert.snapshot(value)`

```javascript
test("Snapshot test", (t) => {
  const result = { id: 1, name: "Node" };
  t.assert.snapshot(result);
});
```

---

## 🇻🇳 Vietnamese Version

### 1. Cấu trúc cơ bản

Trình chạy test tự nhiên (`node:test`) có cấu trúc quen thuộc với người dùng Jest hoặc Mocha.

- **Import:** `import { test, describe, it } from 'node:test';`
- **Assertion (Khẳng định):** `import assert from 'node:assert/strict';`

```javascript
import { test, describe, it } from "node:test";
import assert from "node:assert/strict";

test("test cấp cao nhất", () => {
  assert.equal(1, 1);
});

describe("Một bộ test", () => {
  it("sẽ chạy qua", () => {
    assert.strictEqual("a", "a");
  });
});
```

### 2. Thiết lập & Dọn dẹp (Setup & Teardown)

Bạn có thể dùng các hook để chạy code trước/sau các bài test.

- `before()`: Chạy 1 lần trước tất cả các test trong bộ.
- `after()`: Chạy 1 lần sau khi tất cả xong.
- `beforeEach()`: Chạy trước mỗi bài test riêng lẻ.
- `afterEach()`: Chạy sau mỗi bài test riêng lẻ.

```javascript
import { describe, it, before, after } from "node:test";

describe("Test Cơ sở dữ liệu", () => {
  before(() => console.log("Đang kết nối DB..."));
  after(() => console.log("Đang ngắt kết nối DB..."));

  it("truy vấn dữ liệu", () => {
    /* ... */
  });
});
```

### 3. Test Động (Dynamic Tests)

Bạn có thể sinh các bài test động bằng vòng lặp.

- **Dùng `t.test()`** bên trong ngữ cảnh test cha để tạo các test con.

```javascript
import { test } from "node:test";
import assert from "node:assert/strict";

const inputs = [1, 2, 3];

test("Test động", (t) => {
  for (const num of inputs) {
    t.test(`Bình phương của ${num}`, () => {
      assert.equal(num * num, num ** 2);
    });
  }
});
```

### 4. Snapshot Testing (Thử nghiệm)

Node.js hỗ trợ snapshot testing (so khớp kết quả với một "bản chụp" đã lưu trước đó).

- Bật bằng cờ: `--experimental-test-snapshots`
- Cách dùng: `t.assert.snapshot(value)`

```javascript
test("Test chụp nhanh", (t) => {
  const result = { id: 1, name: "Node" };
  t.assert.snapshot(result);
});
```
