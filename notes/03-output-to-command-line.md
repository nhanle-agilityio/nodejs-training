# 🖥️ Output to the Command Line Using Node.js

## 🇬🇧 English Version

### 1. Basic Output (`console.log`)

The `console` module provides methods to write to standard output and error.

- **Print Text/Variables:**
  ```javascript
  console.log("Hello World");
  console.log(x, y); // Prints multiple variables
  ```
- **String Formatting:**
  - `%s`: String
  - `%d`: Number
  - `%i`: Integer
  - `%o`: Object
  ```javascript
  console.log("My %s has %d ears", "cat", 2);
  ```

### 2. Useful Console Methods

- **Clear Console:** `console.clear()` clears the terminal screen.
- **Count Occurrences:** `console.count(label)` prints the label and the number of times it has been called.
  ```javascript
  console.count("apple"); // apple: 1
  console.count("apple"); // apple: 2
  ```
- **Reset Counter:** `console.countReset(label)` resets the counter for a specific label.

### 3. Debugging & Performance

- **Stack Trace:** `console.trace()` prints the current call stack, showing you exactly how the code execution reached that point.
- **Measure Time:** `console.time(label)` starts a timer, and `console.timeEnd(label)` stops it and prints the duration.
  ```javascript
  console.time("process");
  // ... some code ...
  console.timeEnd("process"); // process: 100.234ms
  ```

### 4. Standard Streams

- **stdout (Standard Output):** `console.log` writes here. Used for regular application output.
- **stderr (Standard Error):** `console.error` writes here. Used for error messages. It appears in the console but can be redirected separately in shell.

### 5. Coloring Output

You can style text in the terminal using `styleText` from the `node:util` module (Node.js v22.11+).

- **Example:**
  ```javascript
  import { styleText } from "node:util";
  console.log(styleText("red", "Error message"));
  console.log(styleText(["blue", "bold"], "Highlighted Info"));
  ```

---

## 🇻🇳 Vietnamese Version

### 1. Xuất dữ liệu cơ bản (`console.log`)

Module `console` cung cấp các phương thức để ghi dữ liệu ra màn hình (standard output) và luồng lỗi (error).

- **In văn bản/biến:**
  ```javascript
  console.log("Xin chào");
  console.log(x, y); // In nhiều biến cùng lúc
  ```
- **Định dạng chuỗi (Formatting):**
  - `%s`: Chuỗi (String)
  - `%d`: Số (Number)
  - `%i`: Số nguyên (Integer)
  - `%o`: Đối tượng (Object)
  ```javascript
  console.log("Con %s của tôi có %d tai", "mèo", 2);
  ```

### 2. Các phương thức Console hữu ích

- **Xóa màn hình:** `console.clear()` xóa sạch nội dung hiện tại trên terminal.
- **Đếm số lần gọi:** `console.count(nhãn)` in ra nhãn kèm theo số lần phương thức này đã được gọi với nhãn đó.
  ```javascript
  console.count("tao"); // tao: 1
  console.count("tao"); // tao: 2
  ```
- **Đặt lại bộ đếm:** `console.countReset(nhãn)` đặt số đếm của nhãn đó về 0.

### 3. Gỡ lỗi & Hiệu năng

- **Truy vết (Stack Trace):** `console.trace()` in ra ngăn xếp cuộc gọi hiện tại, cho bạn biết chính xác luồng thực thi đã đi qua những hàm nào để đến dòng này.
- **Đo thời gian:** `console.time(nhãn)` bắt đầu tính giờ, và `console.timeEnd(nhãn)` dừng tính giờ và in ra khoảng thời gian đã trôi qua.
  ```javascript
  console.time("xuly");
  // ... đoạn code cần đo ...
  console.timeEnd("xuly"); // xuly: 100.234ms
  ```

### 4. Các luồng chuẩn (Standard Streams)

- **stdout (Đầu ra chuẩn):** `console.log` ghi vào đây. Dùng cho thông tin bình thường của ứng dụng.
- **stderr (Lỗi chuẩn):** `console.error` ghi vào đây. Dùng cho các thông báo lỗi. Nó vẫn hiện trên màn hình nhưng có thể được chuyển hướng (redirect) riêng biệt trong shell.

### 5. Màu sắc cho đầu ra

Bạn có thể định dạng màu sắc văn bản trong terminal bằng cách dùng `styleText` từ module `node:util` (từ Node.js v22.11+).

- **Ví dụ:**
  ```javascript
  import { styleText } from "node:util";
  console.log(styleText("red", "Thông báo lỗi"));
  console.log(styleText(["blue", "bold"], "Thông tin nổi bật"));
  ```
