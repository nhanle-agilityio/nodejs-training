# ⚙️ How to Publish a Node-API Package

## 🇬🇧 English Version

### 1. What is Node-API?

Node-API (formerly N-API) is an API for building native Addons. It ensures **Application Binary Interface (ABI) stability** across different Node.js versions.
This means an addon compiled for Node.js v12 should work on v14, v16, etc., without recompiling.

### 2. Publishing Strategy (Parallel Versions)

If you want to publish a Node-API version of your package alongside a regular (legacy/non-Node-API) version:

1.  **Publish Standard Version First:**
    - Update `package.json` version (e.g., `1.2.0`).
    - Run `npm publish`.
    - Users get this by default (`npm install my-pkg`).

2.  **Publish Node-API Version with a Tag:**
    - Update `package.json` version (e.g., `1.2.0-napi`).
    - Run `npm publish --tag n-api`.
    - Users get this **only** if they ask for it (`npm install my-pkg@n-api`).

### 3. Installing the Node-API Version

Users who want the Node-API specific version must specify the tag or exact version in their `package.json`.

```json
"dependencies": {
  "my-pkg": "n-api"
}
```

_Note: Tags (like `n-api`) point to a specific version at the time of install. They don't support ranges like `^1.0.0`._

---

## 🇻🇳 Vietnamese Version

### 1. Node-API là gì?

Node-API (trước đây là N-API) là một API để xây dựng các tiện ích bổ sung (Addons) bằng mã nguồn gốc (C/C++). Nó đảm bảo tính ổn định **ABI (Application Binary Interface)** qua các phiên bản Node.js khác nhau.
Điều này có nghĩa là một addon được biên dịch cho Node.js v12 sẽ vẫn chạy tốt trên v14, v16... mà không cần biên dịch lại.

### 2. Chiến lược xuất bản (Phiên bản song song)

Nếu bạn muốn xuất bản phiên bản Node-API của gói song song với phiên bản thường (cũ/không phải Node-API):

1.  **Xuất bản bản thường trước:**
    - Cập nhật version trong `package.json` (vd: `1.2.0`).
    - Chạy `npm publish`.
    - Người dùng sẽ nhận bản này mặc định (`npm install my-pkg`).

2.  **Xuất bản bản Node-API với Tag:**
    - Cập nhật version trong `package.json` (vd: `1.2.0-napi`).
    - Chạy `npm publish --tag n-api`.
    - Người dùng chỉ nhận bản này nếu họ yêu cầu cụ thể (`npm install my-pkg@n-api`).

### 3. Cài đặt phiên bản Node-API

Người dùng muốn sử dụng phiên bản Node-API phải chỉ định tag hoặc phiên bản chính xác trong `package.json`.

```json
"dependencies": {
  "my-pkg": "n-api"
}
```

_Lưu ý: Các tag (như `n-api`) trỏ đến một phiên bản cụ thể tại thời điểm cài đặt. Chúng không hỗ trợ các khoảng phiên bản như `^1.0.0`._
