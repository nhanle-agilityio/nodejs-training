# 💾 Working with Different Filesystems in Node.js

## 🇬🇧 English Version

### 1. The Challenge

Filesystems (like NTFS on Windows, APFS/HFS+ on macOS, EXT4 on Linux) behave differently.

- **Case Sensitivity:** Linux is usually case-sensitive (`File.txt` != `file.txt`). Windows/macOS are usually case-insensitive.
- **Unicode Normalization:** `café` can be stored in different byte sequences (NFC vs NFD). macOS (HFS+) forces NFD.
- **Timestamps:** Some filesystems track time in nanoseconds, others only in seconds or 2-second intervals (FAT).

### 2. Best Practice: The "Superset" Approach

Do **not** try to force all filesystems to behave like the "lowest common denominator" (e.g., forcing all filenames to lowercase). Instead:

1.  **Preserve Data:** Always keep filenames and timestamps exactly as the filesystem gives them to you. Do not change case or Unicode form when storing data.
2.  **Normalize for Comparison Only:** If you need to check if two filenames are "the same", normalize them _only for the comparison_, but don't save the normalized version.

### 3. Handling Unicode (NFC vs NFD)

Unicode characters like `é` can be represented in two ways:

- **NFC (Composed):** One character code.
- **NFD (Decomposed):** Letter `e` + Accent `´` mark (2 codes).

**Comparing strings safely:**

```javascript
const str1 = "café"; // NFC
const str2 = "cafe\u0301"; // NFD

// Use normalize() for comparison
if (str1.normalize("NFC") === str2.normalize("NFC")) {
  console.log("They look the same!");
}
```

### 4. Timestamp Resolution

Don't assume precise timestamps.

- If you set a file's time to `1444291759414` (ms), a filesystem might store it as `1444291759000` (rounding down to seconds).
- Always read back the timestamp from the filesystem if you need to know exactly what was stored.

---

## 🇻🇳 Vietnamese Version

### 1. Thách thức

Các hệ thống tập tin (như NTFS trên Windows, APFS/HFS+ trên macOS, EXT4 trên Linux) hoạt động khác nhau.

- **Phân biệt chữ hoa/thường:** Linux thường phân biệt (`File.txt` khác `file.txt`). Windows/macOS thường không phân biệt.
- **Chuẩn hóa Unicode:** Từ `café` có thể được lưu dưới các chuỗi byte khác nhau (NFC hoặc NFD). macOS (HFS+) bắt buộc dùng NFD.
- **Dấu thời gian (Timestamp):** Một số hệ thống tính bằng nano giây, số khác chỉ tính bằng giây hoặc mỗi 2 giây (FAT).

### 2. Thực hành tốt nhất: Cách tiếp cận "Superset"

**Đừng** cố gắng ép tất cả các hệ thống phải giống nhau theo kiểu "mẫu số chung thấp nhất" (ví dụ: ép tất cả tên file thành chữ thường). Thay vào đó:

1.  **Bảo toàn dữ liệu:** Luôn giữ nguyên tên file và dấu thời gian y hệt như những gì hệ thống tập tin đưa cho bạn. Đừng tự ý đổi chữ hoa/thường hay định dạng Unicode khi lưu.
2.  **Chỉ chuẩn hóa khi so sánh:** Nếu cần kiểm tra xem 2 tên file có "giống nhau" không, hãy chuẩn hóa chúng _chỉ để so sánh_, nhưng đừng lưu lại phiên bản đã chuẩn hóa đó.

### 3. Xử lý Unicode (NFC vs NFD)

Ký tự Unicode như `é` có 2 cách biểu diễn:

- **NFC (Dựng sẵn):** Là một mã ký tự duy nhất.
- **NFD (Tổ hợp):** Gồm chữ `e` + dấu sắc `´` (2 mã ký tự).

**So sánh chuỗi an toàn:**

```javascript
const str1 = "café"; // NFC
const str2 = "cafe\u0301"; // NFD

// Dùng normalize() để so sánh
if (str1.normalize("NFC") === str2.normalize("NFC")) {
  console.log("Chúng nhìn giống hệt nhau!");
}
```

### 4. Độ phân giải thời gian

Đừng mặc định là thời gian sẽ chính xác tuyệt đối.

- Nếu bạn đặt thời gian cho file là `1444291759414` (ms), hệ thống tập tin có thể chỉ lưu là `1444291759000` (làm tròn xuống giây).
- Luôn đọc lại thời gian từ file nếu bạn cần biết chính xác con số đã được lưu là bao nhiêu.
