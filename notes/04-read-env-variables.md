# 🔐 How to Read Environment Variables from Node.js

## 🇬🇧 English Version

### 1. What are Environment Variables?

Environment variables are dynamic values (like API keys, database URLs, or configuration settings) that can affect the way running processes will behave on a computer. They are stored in the environment in which your process runs.

### 2. Accessing Environment Variables

In Node.js, the global `process` object provides an `env` property which holds all environment variables.

- **Syntax:** `process.env.VARIABLE_NAME`
- `process` is global, so you don't need to import it.

**Example Usage:**

1.  **Run with variables:**
    ```bash
    USER_ID=123 USER_KEY=abc node app.js
    ```
2.  **Access in code (`app.js`):**
    ```javascript
    console.log(process.env.USER_ID); // "123"
    console.log(process.env.USER_KEY); // "abc"
    ```

### 3. Native `.env` Support (Node.js v20+)

Node.js (since v20.6.0) has built-in support for loading environment variables from a `.env` file, removing the need for third-party packages like `dotenv`.

- **Create a `.env` file:**
  ```bash
  PORT=3000
  API_KEY=secret123
  ```
- **Run with the flag:**
  ```bash
  node --env-file=.env app.js
  ```
- **Optional Loading:** Use `--env-file-if-exists` to avoid errors if the file is missing.
  ```bash
  node --env-file-if-exists=.env app.js
  ```

### 4. Loading `.env` Programmatically

You can also load environment files directly within your code using `process.loadEnvFile(path)`.

- **Example:**

  ```javascript
  const { loadEnvFile } = require("node:process");

  // Load from default .env
  loadEnvFile();

  // Or load from a specific path
  loadEnvFile("./config/.env");

  console.log(process.env.PORT);
  ```

### 5. Precedence Rules

- Variables set in the actual shell environment take precedence over variables defined in `.env` files.
- If you use multiple `--env-file` flags, subsequent files override variables from previous ones.

---

## 🇻🇳 Vietnamese Version

### 1. Biến môi trường là gì?

Biến môi trường là các giá trị động (như khóa API, đường dẫn cơ sở dữ liệu, hoặc cấu hình) có thể ảnh hưởng đến cách chạy của các quy trình trên máy tính. Chúng được lưu trữ trong môi trường mà ứng dụng của bạn đang chạy.

### 2. Truy cập biến môi trường

Trong Node.js, đối tượng toàn cục `process` cung cấp thuộc tính `env` chứa tất cả các biến môi trường.

- **Cú pháp:** `process.env.TEN_BIEN`
- `process` là biến toàn cục nên bạn không cần import.

**Ví dụ sử dụng:**

1.  **Chạy lệnh kèm biến:**
    ```bash
    USER_ID=123 USER_KEY=abc node app.js
    ```
2.  **Truy cập trong code (`app.js`):**
    ```javascript
    console.log(process.env.USER_ID); // "123"
    console.log(process.env.USER_KEY); // "abc"
    ```

### 3. Hỗ trợ file `.env` mặc định (Node.js v20+)

Từ Node.js v20.6.0 trở đi, Node.js hỗ trợ tải biến môi trường trực tiếp từ file `.env` mà không cần cài thêm thư viện ngoài như `dotenv`.

- **Tạo file `.env`:**
  ```bash
  PORT=3000
  API_KEY=secret123
  ```
- **Chạy với cờ (flag):**
  ```bash
  node --env-file=.env app.js
  ```
- **Tải không bắt buộc:** Dùng `--env-file-if-exists` để tránh báo lỗi nếu file không tồn tại.
  ```bash
  node --env-file-if-exists=.env app.js
  ```

### 4. Tải `.env` bằng code (Programmatically)

Bạn cũng có thể tải file môi trường ngay trong code bằng hàm `process.loadEnvFile(path)`.

- **Ví dụ:**

  ```javascript
  const { loadEnvFile } = require("node:process");

  // Tải từ file .env mặc định
  loadEnvFile();

  // Hoặc tải từ đường dẫn cụ thể
  loadEnvFile("./config/.env");

  console.log(process.env.PORT);
  ```

### 5. Quy tắc ưu tiên

- Biến được thiết lập trong môi trường shell thực tế sẽ được ưu tiên hơn biến trong file `.env`.
- Nếu bạn dùng nhiều cờ `--env-file`, file phía sau sẽ ghi đè biến của file phía trước.
