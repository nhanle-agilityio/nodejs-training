# 🛡️ ABI Stability (Application Binary Interface)

## 🇬🇧 English Version

### 1. What is ABI?

**ABI (Application Binary Interface)** is the compiled version of an API. It defines how a program accesses functions and data structures in a compiled binary (like a `.node` native addon).

- **API:** Defined in source code (header files like `.h`).
- **ABI:** Defined in the compiled machine code (memory layout, function addresses).

### 2. The Problem with Node.js Native Addons

Traditionally, native addons in Node.js were tightly coupled to the V8 engine version.

- **Before N-API:** If you compiled an addon for Node.js v10, it wouldn't work on Node.js v12 because the underlying V8 ABI changed. You had to recompile it for every major Node.js version.

### 3. N-API (Node-API) Solution

**Node-API (formerly N-API)** was introduced to solve this. It provides a stable API layer that is independent of the underlying JavaScript engine (V8).

- **Forward Compatibility:** An addon compiled with N-API version X will run on **any future version** of Node.js that supports version X.
- **No Recompilation:** You compile your native addon **once**, and it works across multiple Node.js major versions (v12, v14, v16, etc.).

### 4. Benefits

- **Easier Maintenance:** Addon authors don't need to release new binaries for every Node.js update.
- **Portability:** Works even if Node.js switches to a different JS engine in the future (e.g., ChakraCore).

---

## 🇻🇳 Vietnamese Version

### 1. ABI là gì?

**ABI (Giao diện Nhị phân Ứng dụng)** là phiên bản đã biên dịch của API. Nó quy định cách một chương trình gọi hàm và sử dụng cấu trúc dữ liệu từ một chương trình đã biên dịch khác (như native addon `.node`).

- **API:** Định nghĩa trong mã nguồn (file header `.h`).
- **ABI:** Định nghĩa trong mã máy đã biên dịch (bố cục bộ nhớ, địa chỉ hàm).

### 2. Vấn đề của Native Addons trong Node.js

Trước đây, các addon C++ trong Node.js phụ thuộc chặt chẽ vào phiên bản của V8 engine.

- **Trước N-API:** Nếu bạn biên dịch addon cho Node.js v10, nó sẽ không chạy được trên Node.js v12 vì ABI của V8 đã thay đổi. Bạn phải biên dịch lại cho mỗi phiên bản Node.js chính (major version).

### 3. Giải pháp N-API (Node-API)

**Node-API (trước đây gọi là N-API)** được giới thiệu để giải quyết vấn đề này. Nó cung cấp một lớp API ổn định, độc lập với engine JavaScript bên dưới (V8).

- **Tương thích về sau (Forward Compatibility):** Một addon được biên dịch với N-API phiên bản X sẽ chạy được trên **mọi phiên bản Node.js tương lai** có hỗ trợ phiên bản X đó.
- **Không cần biên dịch lại:** Bạn chỉ cần biên dịch addon **một lần**, và nó sẽ hoạt động trên nhiều phiên bản Node.js khác nhau (v12, v14, v16...).

### 4. Lợi ích

- **Dễ bảo trì:** Tác giả addon không cần phát hành bản binary mới mỗi khi Node.js cập nhật.
- **Tính di động:** Vẫn hoạt động tốt ngay cả khi Node.js chuyển sang dùng engine JS khác trong tương lai (ví dụ ChakraCore).
