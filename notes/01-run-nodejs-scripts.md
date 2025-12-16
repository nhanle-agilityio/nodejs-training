# 🚀 Running Node.js Scripts from the Command Line

## 🇬🇧 English Version

### 1. Basic Execution

The standard way to execute a Node.js program is by invoking the global `node` command followed by the path to your file.

- **Command:**
  ```bash
  node app.js
  ```

### 2. Shebang (Executable Scripts)

You can run a Node.js file directly (like a shell script) without typing `node` every time.

- **Step 1:** Add a "Shebang" line at the very top of your `.js` file. This tells the Operating System to use the `node` interpreter found in the environment.

  ```javascript
  #!/usr/bin/env node

  console.log("Hello from an executable script!");
  ```

- **Step 2:** Grant executable permissions to the file (Linux/macOS).
  ```bash
  chmod u+x app.js
  ```
- **Step 3:** Run the file directly.
  ```bash
  ./app.js
  ```

### 3. Inline Execution (String as Argument)

You can execute JavaScript code directly from the terminal without creating a file using the `-e` or `--eval` flag.

- **Command:**
  ```bash
  node -e "console.log(1 + 1)"
  ```
- **Note for Windows Users:**
  - **PowerShell/Git Bash:** Both single `'` and double `"` quotes work.
  - **CMD (Command Prompt):** Single quotes do not work. You must use double quotes (e.g., `node -e "console.log(123)"`).

### 4. Watch Mode (Auto-Restart)

_Available since Node.js v16._
Useful for development, this mode automatically restarts your application whenever you save changes to the file.

- **Command:**
  ```bash
  node --watch app.js
  ```

### 5. Native Task Runner (`node --run`)

Node.js has a built-in task runner to execute scripts defined in your `package.json`. It is a faster, lighter alternative to `npm run`.

- **Example `package.json`:**
  ```json
  {
    "scripts": {
      "test": "node test.js",
      "dev": "node app.js"
    }
  }
  ```
- **Command:**
  ```bash
  node --run test
  ```
- **Passing Arguments:**
  Use the `--` separator to pass flags to the underlying command.
  ```bash
  # This runs the 'dev' script and passes '--watch' to it
  node --run dev -- --watch
  ```

---

## 🇻🇳 Vietnamese Version

### 1. Cách chạy cơ bản

Cách thông thường nhất để chạy một chương trình Node.js là gọi lệnh `node` kèm theo đường dẫn đến file của bạn.

- **Lệnh:**
  ```bash
  node app.js
  ```

### 2. Shebang (Biến file thành file thực thi)

Bạn có thể chạy file Node.js trực tiếp (giống như một shell script) mà không cần gõ `node` mỗi lần.

- **Bước 1:** Thêm dòng "Shebang" vào ngay dòng đầu tiên của file `.js`. Dòng này báo cho Hệ điều hành biết cần tìm và sử dụng trình thông dịch `node`.

  ```javascript
  #!/usr/bin/env node

  console.log("Xin chào từ file thực thi!");
  ```

- **Bước 2:** Cấp quyền thực thi cho file (trên Linux/macOS).
  ```bash
  chmod u+x app.js
  ```
- **Bước 3:** Chạy file trực tiếp.
  ```bash
  ./app.js
  ```

### 3. Chạy mã trực tiếp (Inline Execution)

Bạn có thể thực thi mã JavaScript ngay trên dòng lệnh mà không cần tạo file bằng cách dùng cờ `-e` hoặc `--eval`.

- **Lệnh:**
  ```bash
  node -e "console.log(1 + 1)"
  ```
- **Lưu ý cho người dùng Windows:**
  - **PowerShell/Git Bash:** Dùng dấu nháy đơn `'` hoặc kép `"` đều được.
  - **CMD (Command Prompt):** Dấu nháy đơn sẽ bị lỗi. Bạn bắt buộc phải dùng dấu nháy kép (ví dụ: `node -e "console.log(123)"`).

### 4. Chế độ theo dõi (Watch Mode)

_Có sẵn từ Node.js v16._
Rất hữu ích khi lập trình, chế độ này tự động khởi động lại ứng dụng bất cứ khi nào bạn lưu thay đổi trong file.

- **Lệnh:**
  ```bash
  node --watch app.js
  ```

### 5. Trình chạy tác vụ gốc (`node --run`)

Node.js có sẵn một trình chạy tác vụ (task runner) để thực thi các lệnh được định nghĩa trong `package.json`. Nó là một giải pháp thay thế nhẹ và nhanh hơn so với `npm run`.

- **Ví dụ `package.json`:**
  ```json
  {
    "scripts": {
      "test": "node test.js",
      "dev": "node app.js"
    }
  }
  ```
- **Lệnh:**
  ```bash
  node --run test
  ```
- **Truyền tham số (Arguments):**
  Sử dụng dấu phân cách `--` để truyền cờ (flags) vào lệnh bên trong.
  ```bash
  # Lệnh này chạy script 'dev' và truyền thêm cờ '--watch' vào nó
  node --run dev -- --watch
  ```
