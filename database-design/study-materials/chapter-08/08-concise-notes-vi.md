# Chương 8: Khóa — Ghi chú học tập

*Tham chiếu nhanh cho việc thiết lập khóa Giai đoạn 3*

---

## Bốn loại khóa

| Loại | Mục đích | Gán khi nào |
|------|----------|-------------|
| **Candidate** | Xác định duy nhất bản ghi | Chương này |
| **Primary** | Chọn từ candidate; định danh chính | Chương này |
| **Alternate** | Candidate còn lại; định danh thay thế | Chương này |
| **Foreign** | Liên kết bảng trong mối quan hệ | Chương 10 |
| **Non-key** | Trường đặc điểm; không vai trò khóa | — |

---

## Các thành tố của Candidate Key (9)

1. Không multipart
2. Giá trị duy nhất
3. Không Null
4. Không vi phạm bảo mật/quyền riêng tư (SSN, mật khẩu)
5. Không tùy chọn (toàn bộ hoặc một phần)
6. Số trường tối thiểu cho tính duy nhất
7. Xác định duy nhất mỗi bản ghi
8. Xác định độc quyền mỗi giá trị trường trong bản ghi
9. Chỉ sửa đổi hiếm khi

**Đánh dấu:** CK (đơn) | CCK / CCK1, CCK2 (composite)

---

## Artificial Candidate Key

**Khi nào:** Không có trường đủ điều kiện candidate key, hoặc trường đơn mới mạnh hơn composite.

**Cách:** Tạo trường mới tuân thủ mọi Thành tố; thêm vào bảng. Thường dùng: EMPLOYEE ID, VENDOR ID, PART NUMBER, v.v.

---

## Chọn Primary Key

- Chọn từ **candidate keys**.
- Ưu tiên **đơn giản** hơn composite.
- Ưu tiên khóa có **tên bảng** trong đó (vd: SALES INVOICE NUMBER cho SALES INVOICES).

**Kiểm tra quan trọng:** Primary key phải **xác định độc quyền** mỗi giá trị trường trong mọi bản ghi. Nếu không → loại trường đó.

**Các bước kiểm tra:**
1. Nạp dữ liệu mẫu
2. Chọn bản ghi; ghi giá trị PK
3. Với mỗi trường: *PK có xác định độc quyền \<trường\> không?* Có → tiếp. Không → loại trường.
4. Lặp đến khi xong

**Đánh dấu:** PK (đơn) | CPK (composite)

**Quy tắc:**
- Một và chỉ một PK mỗi bảng
- PK duy nhất mỗi bảng (trừ 1:1 hoặc bảng tập con)

---

## Alternate Keys

Candidate keys còn lại → "AK" hoặc "CAK". Hữu ích trong RDBMS để tra cứu bản ghi thay thế. Không dùng trong quy trình thiết kế.

---

## Tính toàn vẹn cấp bảng

- Không bản ghi trùng
- PK xác định độc quyền mỗi bản ghi
- Mọi giá trị PK duy nhất
- Giá trị PK không null

---

## Bảng tập con

Bảng tập con dùng **cùng primary key** với bảng dữ liệu cha (vd: SERVICES dùng PRODUCT NUMBER như PRODUCTS).

---

## Checklist rà soát (Phỏng vấn)

1. Chủ đề được đại diện
2. Tên/mô tả bảng phù hợp
3. Tên trường phù hợp
4. Mọi trường phù hợp đã gán

---

## Mẹo ghi nhớ

| Khái niệm | Điểm chính |
|-----------|------------|
| **Candidate key** | Xác định duy nhất bản ghi; phải đạt 9 Thành tố |
| **Artificial key** | Khi không có candidate tự nhiên |
| **Primary key** | Candidate được chọn; phải xác định độc quyền mọi trường |
| **SSN làm khóa** | Tránh—có thể null; quyền riêng tư |
| **Bảng tập con** | Cùng PK với bảng dữ liệu cha |
