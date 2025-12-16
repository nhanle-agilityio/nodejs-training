# 📊 Collecting Code Coverage in Node.js

## 🇬🇧 English Version

### 1. What is Code Coverage?

Code Coverage is a metric that measures how much of your source code is executed during tests.

- **High Coverage:** Means most of your code has been run (and hopefully verified).
- **Low Coverage:** Indicates potential bugs in untested parts of the code.

### 2. Enabling Coverage

Node.js (test runner) has built-in support for coverage. You don't need external tools like `c8` or `nyc` for basic usage.

- **Flag:** `--experimental-test-coverage`
- **Command:**
  ```bash
  node --experimental-test-coverage --test
  ```

### 3. Coverage Metrics

The report usually includes:

- **Line Coverage:** % of lines executed.
- **Branch Coverage:** % of `if/else`, `switch` cases taken.
- **Function Coverage:** % of functions called.

### 4. Excluding Code

Sometimes you want to ignore specific files or lines from the coverage report.

- **Via CLI:**
  - `--test-coverage-exclude=<glob>`: Exclude files (e.g., `test/*.js`).
  - `--test-coverage-include=<glob>`: Only include specific files.

- **Via Comments:**
  ```javascript
  /* node:coverage ignore next */
  function untestableCode() {
    // This function won't count towards coverage stats
  }
  ```

### 5. Setting Thresholds

You can force the test command to fail (exit code 1) if coverage drops below a certain percentage.

- `--test-coverage-lines=90` (Fail if line coverage < 90%)
- `--test-coverage-branches=80`
- `--test-coverage-functions=100`

---

## 🇻🇳 Vietnamese Version

### 1. Code Coverage là gì?

Code Coverage (Độ bao phủ mã) là chỉ số đo lường bao nhiêu phần trăm mã nguồn của bạn đã được thực thi khi chạy các bài test.

- **Coverage cao:** Nghĩa là phần lớn code đã được chạy qua.
- **Coverage thấp:** Cảnh báo có thể còn lỗi tiềm ẩn ở những phần code chưa được test.

### 2. Bật tính năng Coverage

Node.js hỗ trợ sẵn tính năng này. Bạn không cần cài thêm công cụ ngoài như `c8` hay `nyc`.

- **Cờ (Flag):** `--experimental-test-coverage`
- **Lệnh:**
  ```bash
  node --experimental-test-coverage --test
  ```

### 3. Các chỉ số Coverage

Báo cáo thường bao gồm:

- **Line Coverage:** % số dòng code được chạy.
- **Branch Coverage:** % các nhánh rẽ (`if/else`, `switch`) đã được đi qua.
- **Function Coverage:** % số hàm đã được gọi.

### 4. Loại trừ Code (Excluding)

Đôi khi bạn muốn bỏ qua một số file hoặc dòng code khỏi báo cáo.

- **Qua CLI:**
  - `--test-coverage-exclude=<glob>`: Loại bỏ file (vd: `test/*.js`).
  - `--test-coverage-include=<glob>`: Chỉ tính file cụ thể.

- **Qua Comment trong code:**
  ```javascript
  /* node:coverage ignore next */
  function hamKhongCanTest() {
    // Hàm này sẽ không bị tính vào chỉ số coverage
  }
  ```

### 5. Thiết lập Ngưỡng (Thresholds)

Bạn có thể bắt lệnh test báo lỗi (exit code 1) nếu độ bao phủ thấp hơn mức quy định.

- `--test-coverage-lines=90` (Lỗi nếu số dòng chạy < 90%)
- `--test-coverage-branches=80`
- `--test-coverage-functions=100`
