# Chương 10: Mối quan hệ bảng — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 10 trình bày **xác định và thiết lập mối quan hệ bảng**. Mối quan hệ liên kết các bảng liên quan, giảm thiểu dữ liệu dư thừa, cho phép view đa bảng và đảm bảo **tính toàn vẹn cấp mối quan hệ**. Ba loại: **một-một (1:1)**, **một-nhiều (1:N)** và **nhiều-nhiều (M:N)**. Mối quan hệ tự tham chiếu tồn tại trong cùng một bảng. Nhiều-nhiều được giải quyết bằng **bảng liên kết**.

---

## 1. Tại sao mối quan hệ quan trọng

- **Thiết lập liên kết** giữa các bảng liên quan logic
- **Tinh chỉnh cấu trúc** và giảm thiểu dữ liệu dư thừa
- **Cho phép rút dữ liệu** từ nhiều bảng (views)
- **Đảm bảo tính toàn vẹn cấp mối quan hệ** (liên kết đáng tin; insert/update/delete đúng)

---

## 2. Các loại mối quan hệ

### Một-một (1:1)

Một bản ghi trong Bảng A liên quan **chỉ một** bản ghi trong Bảng B và ngược lại. Thường liên quan bảng tập con (vd: EMPLOYEES ↔ COMPENSATION).

**Thiết lập:** Sao chép khóa chính của bảng cha vào bảng con làm khóa ngoại. Trong bảng tập con, cả hai bảng dùng chung khóa chính.

### Một-nhiều (1:N)

Một bản ghi trong Bảng A có thể liên quan **một hoặc nhiều** bản ghi trong Bảng B; một bản ghi trong Bảng B liên quan **chỉ một** bản ghi trong Bảng A. Loại phổ biến nhất.

**Thiết lập:** Sao chép khóa chính từ phía "một" vào phía "nhiều" làm khóa ngoại.

### Nhiều-nhiều (M:N)

Một bản ghi trong Bảng A có thể liên quan **một hoặc nhiều** trong Bảng B và ngược lại. Cần giải quyết.

**Vấn đề nếu không giải quyết:** Dữ liệu dư thừa, dữ liệu trùng, khó truy xuất, khó insert/update/delete.

**Cách sai:** Trường multivalued phẳng (STUDENT ID 1, 2, 3 trong CLASSES); thêm nhiều FK + trường mô tả vào một bảng.

**Cách đúng:** Tạo **bảng liên kết**.

---

## 3. Bảng liên kết (cho M:N)

**Quy trình ba bước:**

1. **Định nghĩa** bảng liên kết bằng bản sao khóa chính từ cả hai bảng → chúng tạo thành khóa chính composite; mỗi cái là khóa ngoại.
2. **Đặt tên** bảng thể hiện mối quan hệ (vd: STUDENT CLASSES, PILOT CERTIFICATIONS).
3. **Thêm** vào danh sách bảng cuối cùng (Table Type = Linking).

**Kết quả:** M:N được phân rã thành hai mối quan hệ 1:N (vd: STUDENTS ↔ STUDENT CLASSES ↔ CLASSES).

**Thêm trường vào bảng liên kết:** Khi trường như QUOTE PRICE, QUANTITY ORDERED liên quan tổ hợp (đơn hàng + sản phẩm), chuyển chúng từ ORDERS sang ORDER DETAILS (bảng liên kết). Loại trường dư thừa khỏi bảng cha.

---

## 4. Mối quan hệ tự tham chiếu

Mối quan hệ giữa các bản ghi **trong cùng một bảng**. Có thể là 1:1, 1:N hoặc M:N.

- **1:1** — vd: MEMBER bảo trợ một MEMBER khác (SPONSOR ID)
- **1:N** — vd: thành viên STAFF quản lý nhiều STAFF (MANAGER ID)
- **M:N** — vd: PART gồm các PART; part là thành phần của part khác → dùng bảng liên kết (vd: PART COMPONENTS)

**Thiết lập 1:1 và 1:N:** Thêm khóa ngoại trong cùng bảng tham chiếu khóa chính của chính nó. Tên thường khác (vd: MANAGER ID vs STAFF ID) để rõ ràng.

**Cân nhắc:** Tự tham chiếu có thể cho thấy cần bảng mới (vd: STAFF ↔ MANAGER có thể trở thành bảng DEPARTMENTS).

---

## 5. Xác định mối quan hệ hiện có

### Ma trận bảng

Tạo ma trận: bảng dọc trên và dọc bên trái (cùng thứ tự). Với mỗi cặp, xác định mối quan hệ từ mỗi góc độ.

### Loại câu hỏi

1. **Liên kết:** *Một bản ghi trong (Bảng A) có thể liên kết với một hoặc nhiều bản ghi trong (Bảng B) không?*
2. **Ngữ cảnh:**
   - Sở hữu: *Một đơn hàng có thể chứa một hoặc nhiều sản phẩm không?*
   - Hành động: *Một giảng viên có dạy một hoặc nhiều lớp không?*

Cho tự tham chiếu: *Một nhân viên có thể liên kết với một hoặc nhiều nhân viên khác không?*

### Công thức (góc độ A + góc độ B)

| A | B | Chính thức |
|---|---|------------|
| 1:1 | 1:1 | 1:1 |
| 1:N | 1:1 | 1:N |
| 1:N | 1:N | M:N |

---

## 6. Thiết lập mỗi mối quan hệ

| Loại | Phương pháp |
|------|-------------|
| **1:1** | Sao chép PK cha vào con làm FK (thường FK = PK con trong bảng tập con) |
| **1:N** | Sao chép PK cha vào con làm FK |
| **M:N** | Tạo bảng liên kết với cả hai PK làm PK composite + FK |

**Sơ đồ:** PK ở đầu đường; FK ở cuối. Chân quạ ở phía "nhiều".

---

## 7. Các thành tố của Khóa ngoại

1. **Cùng tên** với khóa chính cha (ngoại lệ: tự tham chiếu để rõ)
2. **Replica** đặc tả trường của cha (có điều chỉnh)
3. **Lấy giá trị** độc quyền từ khóa chính cha

### Điều chỉnh đặc tả trường cho FK

**General:** Specification Type = Replica; Parent Table = bảng của FK; Source Specification = tên PK cha; Description = mục đích FK.

**Logical:** Key Type = Foreign; Uniqueness = Non-unique (1:N) hoặc Unique (1:1); Values Entered By = User; Range of Values = giá trị PK hiện có; Edit Rule = Enter Now, Edits Allowed.

---

## 8. Đặc điểm mối quan hệ

### Quy tắc xóa

Điều gì xảy ra với bản ghi con khi bản ghi cha bị xóa?

| Quy tắc | Hành động |
|---------|-----------|
| **Deny** | Không xóa; đánh dấu không hoạt động |
| **Restrict** | Không xóa nếu có bản ghi con liên quan |
| **Cascade** | Xóa cha + tất cả bản ghi con liên quan |
| **Nullify** | Xóa cha; đặt FK = Null trong con |
| **Set Default** | Xóa cha; đặt FK = mặc định trong con |

*Mặc định: Restrict.*

### Loại tham gia

- **Mandatory** — Phải có ít nhất một bản ghi trước khi nhập vào bảng liên quan (đường dọc)
- **Optional** — Không yêu cầu (hình tròn)

### Mức độ tham gia

(min, max) — vd: (0,15) = 0 đến 15 bản ghi liên quan. Dùng "N" cho không giới hạn.

---

## 9. Tính toàn vẹn cấp mối quan hệ

Mối quan hệ đạt được khi:

- Liên kết vững chắc (PK/FK hoặc bảng liên kết)
- Insert có ý nghĩa (loại tham gia)
- Xóa không gây tác động xấu (quy tắc xóa)
- Giới hạn có ý nghĩa cho bản ghi liên quan (mức độ tham gia)

---

## 10. Ví dụ: Mike's Bikes

- CUSTOMERS ↔ INVOICES: 1:N
- EMPLOYEES ↔ INVOICES: 1:N
- VENDORS ↔ PRODUCTS: 1:N
- INVOICES ↔ PRODUCTS: M:N → INVOICE PRODUCTS (bảng liên kết)

Tinh chỉnh khóa ngoại; thiết lập quy tắc xóa, loại tham gia, mức độ. Xác minh với Mike.

---

## Câu hỏi ôn tập

1. Nêu hai lý do chính tại sao mối quan hệ quan trọng.
2. Đặt tên ba loại mối quan hệ.
3. Mối quan hệ nào gây nhiều vấn đề nhất?
4. Nêu hai vấn đề với mối quan hệ nhiều-nhiều.
5. Mối quan hệ tự tham chiếu là gì?
6. Bạn bắt đầu xác định mối quan hệ như thế nào?
7. Hai loại câu hỏi để xác định mối quan hệ là gì?
8. Ký hiệu nào chỉ 1:N trong ma trận?
9. Bạn xác định mối quan hệ chính thức giữa một cặp như thế nào?
10. Bạn thiết lập mối quan hệ 1:N như thế nào?
11. Đúng hay Sai: Truy xuất từ bảng tự tham chiếu có thể tẻ nhạt.
12. Bạn thiết lập tự tham chiếu M:N như thế nào?
13. Bạn tinh chỉnh khóa ngoại như thế nào?
14. Bạn sửa thể loại thành tố nào cho đặc tả FK?
15. Quy tắc xóa xác định điều gì?
16. Đặt tên hai loại tham gia.
17. Mức độ tham gia cho biết gì?
18. Khi nào mối quan hệ đạt tính toàn vẹn cấp mối quan hệ?

### Đáp án

1. Kết nối bảng; tối thiểu dư thừa; rút dữ liệu đa bảng; tính toàn vẹn cấp mối quan hệ.
2. Một-một, một-nhiều, nhiều-nhiều.
3. Nhiều-nhiều.
4. Dữ liệu dư thừa/trùng; chèn/cập nhật/xóa khó.
5. Mối quan hệ giữa bản ghi trong cùng bảng.
6. Ma trận bảng.
7. Liên kết và ngữ cảnh.
8. 1:N.
9. Công thức: 1:1+1:1=1:1; 1:N+1:1=1:N; 1:N+1:N=M:N.
10. Sao chép PK từ "một" vào "nhiều" làm FK.
11. Đúng.
12. Bảng liên kết với trường từ cùng bảng.
13. Tuân thủ Elements of a Foreign Key.
14. General và Logical.
15. Hành động RDBMS khi xóa bản ghi cha.
16. Mandatory và Optional.
17. Số min/max bản ghi liên quan.
18. Khi thiết lập đúng và đặc điểm phù hợp.

---

*Tiếp tục Chương 11: Quy tắc nghiệp vụ*
