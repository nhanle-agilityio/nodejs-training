# 📦 Publishing a Node.js Package

## 🇬🇧 English Version

### 1. Two Main Formats

There are two primary module formats in the Node.js ecosystem:

- **CommonJS (CJS):** Uses `require()` and `module.exports`. Traditional Node.js format.
- **ECMAScript Modules (ESM):** Uses `import` and `export`. The modern standard.

### 2. Choosing a Strategy

It's generally best to publish in **one format** (either CJS or ESM) to avoid complexity ("Dual-Package Hazard").

#### A. CJS Only (Simplest & Most Compatible)

Works in all Node.js versions. ESM projects can import it easily.

```json
{
  "name": "my-package",
  "main": "./index.js"
}
```

#### B. ESM Only (Modern)

Works in Node.js 12+. CJS projects can import it using dynamic `import()`.

```json
{
  "name": "my-package",
  "type": "module",
  "main": "./index.js"
}
```

### 3. Dual Package (Advanced)

If you must support both CJS (via `require`) and ESM (via `import`) natively:

- Use the `"exports"` field in `package.json`.
- **Warning:** Be careful of the **Dual-Package Hazard** (two instances of your package loaded at once).

```json
{
  "name": "my-dual-package",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

- Use `.mjs` for ESM files.
- Use `.cjs` for CommonJS files.

### 4. Important `package.json` Fields

- **`"name"`**: Unique package name.
- **`"version"`**: Semantic versioning (e.g., `1.0.0`).
- **`"main"`**: Entry point for legacy Node.js.
- **`"exports"`**: Modern entry point definition (allows subpath exports and conditional exports).
- **`"engines"`**: Specify compatible Node.js versions.

---

## 🇻🇳 Vietnamese Version

### 1. Hai định dạng chính

Có hai định dạng module chính trong hệ sinh thái Node.js:

- **CommonJS (CJS):** Dùng `require()` và `module.exports`. Định dạng truyền thống của Node.js.
- **ECMAScript Modules (ESM):** Dùng `import` và `export`. Chuẩn hiện đại.

### 2. Chọn chiến lược

Tốt nhất là chỉ nên xuất bản **một định dạng** (hoặc CJS hoặc ESM) để tránh phức tạp ("Hiểm họa gói kép").

#### A. Chỉ CJS (Đơn giản & Tương thích nhất)

Chạy tốt trên mọi phiên bản Node.js. Các dự án ESM cũng có thể import nó dễ dàng.

```json
{
  "name": "goi-cua-toi",
  "main": "./index.js"
}
```

#### B. Chỉ ESM (Hiện đại)

Chạy trên Node.js 12+. Các dự án CJS muốn dùng phải gọi qua `import()` động.

```json
{
  "name": "goi-cua-toi",
  "type": "module",
  "main": "./index.js"
}
```

### 3. Gói kép - Dual Package (Nâng cao)

Nếu bạn bắt buộc phải hỗ trợ cả CJS (qua `require`) và ESM (qua `import`) một cách tự nhiên:

- Sử dụng trường `"exports"` trong `package.json`.
- **Cảnh báo:** Cẩn thận với **Dual-Package Hazard** (hai bản copy của gói được tải cùng lúc).

```json
{
  "name": "goi-kep-cua-toi",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

- Dùng đuôi `.mjs` cho file ESM.
- Dùng đuôi `.cjs` cho file CommonJS.

### 4. Các trường quan trọng trong `package.json`

- **`"name"`**: Tên gói (duy nhất).
- **`"version"`**: Phiên bản theo Semantic Versioning (vd: `1.0.0`).
- **`"main"`**: Điểm đầu vào cho Node.js cũ.
- **`"exports"`**: Định nghĩa điểm đầu vào hiện đại (cho phép export đường dẫn con và export có điều kiện).
- **`"engines"`**: Chỉ định phiên bản Node.js tương thích.
