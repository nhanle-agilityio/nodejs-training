# 🔄 How to Use the Node.js REPL

## 🇬🇧 English Version

### 1. What is the REPL?

**REPL** stands for **Read-Eval-Print-Loop**. It is an interactive shell that processes Node.js expressions.

- **Read**: Reads user input (JavaScript code).
- **Eval**: Evaluates the code.
- **Print**: Prints the result.
- **Loop**: Loops back and waits for new input.

It is useful for quick testing, debugging, or experimenting with JavaScript features.

### 2. Starting the REPL

To start the REPL, simply run the `node` command in your terminal without any arguments.

- **Command:**
  ```bash
  node
  ```
  You will see the `>` prompt, indicating it's ready for input.

### 3. Basic Usage

You can type any valid JavaScript code.

- **Simple Math:**
  ```javascript
  > 1 + 1
  2
  ```
- **Variables & Functions:**
  ```javascript
  > const name = "Node.js"
  undefined
  > console.log(`Hello ${name}`)
  Hello Node.js
  undefined
  ```
  _Note: `undefined` is printed because `console.log` returns `undefined`._

### 4. Special Variable `_`

The underscore `_` variable holds the result of the **last evaluated expression**.

- **Example:**
  ```javascript
  > 5 * 2
  10
  > _ + 5
  15
  ```

### 5. Dot Commands

The REPL has several special commands starting with a dot `.`:

- **.help**: Shows the list of all available dot commands.
- **.editor**: Enters editor mode. This is great for writing multi-line code easily. Press `Ctrl+D` to finish and execute.
- **.break**: Aborts the current multi-line entry (useful if you get stuck in a loop or open bracket).
- **.clear**: Resets the REPL context (clears variables) and clears multi-line input.
- **.load [filename]**: Loads and executes a JavaScript file into the current REPL session.
- **.save [filename]**: Saves the current REPL session history to a file.
- **.exit**: Exits the REPL.

### 6. Exiting the REPL

There are three ways to exit the REPL:

1.  Type `.exit` and press Enter.
2.  Press `Ctrl + C` twice.
3.  Press `Ctrl + D`.

---

## 🇻🇳 Vietnamese Version

### 1. REPL là gì?

**REPL** là viết tắt của **Read-Eval-Print-Loop** (Đọc-Đánh giá-In-Lặp). Đây là một môi trường tương tác để chạy các biểu thức Node.js.

- **Read**: Đọc dữ liệu nhập vào (mã JavaScript).
- **Eval**: Đánh giá (chạy) đoạn mã đó.
- **Print**: In kết quả ra màn hình.
- **Loop**: Lặp lại và chờ đầu vào mới.

REPL rất hữu ích để kiểm tra nhanh mã, gỡ lỗi, hoặc thử nghiệm các tính năng của JavaScript.

### 2. Khởi động REPL

Để bắt đầu REPL, bạn chỉ cần chạy lệnh `node` trong terminal mà không kèm theo tham số nào.

- **Lệnh:**
  ```bash
  node
  ```
  Bạn sẽ thấy dấu nhắc `>`, cho biết nó đã sẵn sàng nhận lệnh.

### 3. Cách dùng cơ bản

Bạn có thể gõ bất kỳ mã JavaScript hợp lệ nào.

- **Toán đơn giản:**
  ```javascript
  > 1 + 1
  2
  ```
- **Biến & Hàm:**
  ```javascript
  > const ten = "Node.js"
  undefined
  > console.log(`Xin chào ${ten}`)
  Xin chào Node.js
  undefined
  ```
  _Lưu ý: `undefined` được in ra vì hàm `console.log` trả về giá trị `undefined`._

### 4. Biến đặc biệt `_`

Biến gạch dưới `_` lưu giữ kết quả của **biểu thức được đánh giá gần nhất**.

- **Ví dụ:**
  ```javascript
  > 5 * 2
  10
  > _ + 5
  15
  ```

### 5. Các lệnh bắt đầu bằng dấu chấm (Dot Commands)

REPL có các lệnh đặc biệt bắt đầu bằng dấu chấm `.`:

- **.help**: Hiển thị danh sách các lệnh có sẵn.
- **.editor**: Vào chế độ soạn thảo (editor mode). Rất tiện lợi để viết mã nhiều dòng. Nhấn `Ctrl+D` để kết thúc và chạy mã.
- **.break**: Hủy bỏ việc nhập mã nhiều dòng hiện tại (hữu ích nếu bạn bị kẹt trong vòng lặp hoặc chưa đóng ngoặc).
- **.clear**: Đặt lại ngữ cảnh REPL (xóa các biến đã khai báo) và xóa mã đang nhập dở.
- **.load [filename]**: Tải và chạy một file JavaScript vào phiên REPL hiện tại.
- **.save [filename]**: Lưu lịch sử phiên REPL hiện tại vào một file.
- **.exit**: Thoát khỏi REPL.

### 6. Thoát khỏi REPL

Có 3 cách để thoát REPL:

1.  Gõ `.exit` rồi nhấn Enter.
2.  Nhấn `Ctrl + C` hai lần.
3.  Nhấn `Ctrl + D`.
