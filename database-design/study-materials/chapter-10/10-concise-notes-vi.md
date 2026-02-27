# Chương 10: Mối quan hệ bảng — Ghi chú học tập

*Tham chiếu nhanh cho thiết lập mối quan hệ*

---

## Ba loại mối quan hệ

| Loại | Định nghĩa | Thiết lập |
|------|------------|-----------|
| **1:1** | Một A ↔ một B | Sao chép PK cha vào con làm FK |
| **1:N** | Một A ↔ nhiều B; một B ↔ một A | Sao chép PK cha vào con làm FK |
| **M:N** | Một A ↔ nhiều B; một B ↔ nhiều A | **Bảng liên kết** |

---

## Bảng liên kết (M:N)

1. Tạo bảng với bản sao cả hai PK → PK composite + hai FK
2. Đặt tên (vd: STUDENT CLASSES)
3. Thêm vào Danh sách bảng cuối cùng (type = Linking)

**Kết quả:** M:N → hai 1:N (A ↔ Linking ↔ B)

**Trường trong bảng liên kết:** Khi QUOTE PRICE, QTY liên quan order+sản phẩm, chuyển từ ORDERS sang ORDER DETAILS.

---

## Tự tham chiếu

| Loại | Ví dụ | Phương pháp |
|------|-------|-------------|
| 1:1 | Member bảo trợ một member | SPONSOR ID (FK) |
| 1:N | Staff quản lý staff | MANAGER ID (FK) |
| M:N | Part gồm parts | PART COMPONENTS (bảng liên kết) |

---

## Xác định mối quan hệ

**Ma trận bảng** — bảng dọc trên và trái. Hỏi:

- Liên kết: *Một (A) có thể liên kết với một hoặc nhiều (B) không?*
- Ngữ cảnh: *Một đơn hàng có thể chứa một hoặc nhiều sản phẩm không?*

**Công thức:** 1:1+1:1=1:1 | 1:N+1:1=1:N | 1:N+1:N=M:N

---

## Các thành tố của Khóa ngoại

1. **Cùng tên** với PK cha (trừ tự tham chiếu)
2. **Replica** spec (sửa: Type=Replica, Source=PK cha, Description)
3. **Giá trị từ** PK cha duy nhất

**Logical cho FK:** Key Type=Foreign; Uniqueness=Non-unique (1:N) hoặc Unique (1:1); Values Entered By=User; Range=PK hiện có; Edit Rule=Enter Now, Edits Allowed

---

## Đặc điểm mối quan hệ

### Quy tắc xóa

Deny | Restrict (mặc định) | Cascade | Nullify | Set Default

### Loại tham gia

Mandatory (|) | Optional (○)

### Mức độ tham gia

(min, max) hoặc (min, N) cho không giới hạn

---

## Checklist

1. Mối quan hệ đã xác định
2. Mối quan hệ đã thiết lập
3. FK tuân thủ Elements
4. Quy tắc xóa đã đặt
5. Loại tham gia đã đặt
6. Mức độ tham gia đã đặt

---

## Mẹo ghi nhớ

| Khái niệm | Điểm chính |
|-----------|------------|
| **M:N** | Giải quyết bằng bảng liên kết |
| **Tên FK** | Giống PK cha (trừ tự tham chiếu) |
| **Xóa** | Restrict mặc định |
| **Bảng liên kết** | PK composite từ cả hai bảng |
