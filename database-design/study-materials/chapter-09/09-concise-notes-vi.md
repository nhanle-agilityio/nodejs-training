# Chương 9: Đặc tả trường — Ghi chú học tập

*Tham chiếu nhanh cho tính toàn vẹn cấp trường*

---

## Ba thể loại thành tố

| Thể loại | Trọng tâm |
|----------|-----------|
| **General** | Mục đích, bảng cha, loại, mô tả |
| **Physical** | Kiểu dữ liệu, độ dài, số thập phân, hỗ trợ ký tự |
| **Logical** | Loại khóa, tính duy nhất, null, bắt buộc, phạm vi, quy tắc sửa |

---

## Các loại đặc tả

| Loại | Dùng khi |
|------|----------|
| **Unique** | Trường xuất hiện một lần hoặc là primary key |
| **Generic** | Mẫu cho trường tương tự (vd: STATE) |
| **Replica** | Dựa trên Generic hoặc là foreign key |

---

## General Elements

- Field Name, Parent Table, Specification Type
- Source Specification (chỉ Replica)
- Shared By (các bảng dùng chung trường)
- Alias(es) — cho hai thể hiện trong cùng bảng
- Description

**Hướng dẫn mô tả:** Chính xác, rõ ràng, ngắn gọn; không thuật ngữ kỹ thuật, không ví dụ, độc lập.

---

## Physical Elements

**Kiểu dữ liệu:** Alphanumeric | Numeric | DateTime

**Character Support:** Letters, Numbers, Keyboard chars, Special chars

---

## Logical Elements

| Thành tố | Thiết lập thường dùng |
|----------|----------------------|
| Key Type | Non-key, Primary, Alternate |
| Uniqueness | Unique (cho PK/AK) hoặc Non-unique |
| Null Support | No Nulls (thường) hoặc Nulls Allowed |
| Required Value | Yes (PK) hoặc No |
| Range of Values | General / Integrity-specific / Business-specific |
| Edit Rule | Enter Now/Later + Edits Allowed/Not Allowed |

**Tránh:** "Other" và "Miscellaneous" trong Range of Values.

**Null ≠ khoảng trống.** Dùng giá trị thật ("N/A") khi hợp lệ.

---

## Tính toàn vẹn cấp trường

- Định danh/mục đích rõ
- Định nghĩa nhất quán
- Giá trị nhất quán và hợp lệ
- Loại sửa đổi được xác định

**Thành tố Trường lý tưởng:** Một giá trị, không multipart/tính toán, duy nhất (trừ FK), giữ đặc điểm khi là FK.

---

## Quy trình

1. Định nghĩa càng nhiều đặc tả có thể
2. Giải thích thành tố cho người tham gia
3. Rà soát và tinh chỉnh với người dùng/quản lý
4. Làm việc trên các trường còn lại cùng nhau

---

## Mẹo ghi nhớ

| Khái niệm | Điểm chính |
|-----------|------------|
| **Field specs** | Từ điển dữ liệu; tính toàn vẹn cấp trường |
| **Generic** | Mẫu; tên không cụ thể; thiết lập rộng |
| **Replica** | Dựa trên Generic hoặc FK; có thể tùy chỉnh |
| **Alias** | Khi cùng trường xuất hiện hai lần trong một bảng |
| **Range of Values** | Tránh "Other"/"Miscellaneous" |
