# Chương 8: Khóa — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 8 trình bày **thiết lập khóa** cho mỗi bảng. Khóa đảm bảo xác định bản ghi duy nhất, thực thi tính toàn vẹn và thiết lập mối quan hệ bảng. Bốn loại chính: **candidate** (khóa ứng viên), **primary** (khóa chính), **foreign** (khóa ngoại) và **non-keys** (không phải khóa). Khóa ngoại được gán sau (Chương 10). Mỗi bảng phải có ít nhất một candidate key; một được chọn làm primary key.

---

## 1. Tại sao khóa quan trọng

Khóa quan trọng vì ba lý do:

1. **Đảm bảo mỗi bản ghi được xác định chính xác** — Bảng đại diện tập hợp đối tượng hoặc sự kiện tương tự; mỗi bản ghi là một thể hiện duy nhất. Khóa cho phép xác định mỗi thể hiện.
2. **Thiết lập và thực thi tính toàn vẹn** — Khóa là thành phần chính của tính toàn vẹn cấp bảng và cấp mối quan hệ (bản ghi duy nhất, giá trị khớp cho mối quan hệ).
3. **Thiết lập mối quan hệ bảng** — Khóa liên kết các bảng (trình bày ở Chương 10).

---

## 2. Thiết lập khóa cho mỗi bảng

### Candidate Keys (Khóa ứng viên)

**Candidate key** là trường hoặc tập trường **xác định duy nhất một bản ghi** của chủ đề bảng. Mỗi bảng phải có ít nhất một candidate key. Bạn cuối cùng chọn một candidate key làm primary key.

Trước khi chỉ định trường làm candidate key, nó phải tuân thủ tất cả **Các thành tố của Candidate Key**:

| # | Thành tố |
|---|----------|
| 1 | Không thể là **trường đa phần** (multipart field) |
| 2 | Phải chứa **giá trị duy nhất** |
| 3 | Không thể chứa **Null** |
| 4 | Giá trị không thể vi phạm **quy tắc bảo mật hoặc quyền riêng tư** (vd: SSN, mật khẩu) |
| 5 | Giá trị **không tùy chọn** toàn bộ hoặc một phần |
| 6 | Gồm **số trường tối thiểu** để định nghĩa tính duy nhất |
| 7 | Giá trị phải **xác định duy nhất và độc quyền** mỗi bản ghi |
| 8 | Giá trị phải **xác định độc quyền** giá trị mỗi trường trong bản ghi |
| 9 | Giá trị chỉ có thể sửa đổi **trong trường hợp hiếm hoặc cực đoan** |

**Đánh dấu:** Viết "CK" bên cạnh trường candidate key. Composite candidate key = "CCK" (hoặc CCK1, CCK2 nếu có nhiều).

**Ví dụ — bảng EMPLOYEES:**
- EMPLOYEE ID ✓ (đủ điều kiện)
- SOCIAL SECURITY NUMBER ✗ (có thể null; quyền riêng tư; **tránh dùng SSN làm khóa**)
- EMPLAST NAME ✗ (giá trị trùng)
- EMPFIRST NAME + EMPLAST NAME ✓ (composite candidate key—có lưu ý)
- EMPZIPCODE ✗ (giá trị trùng)
- EMPHOME PHONE ✗ (giá trị trùng, có thể thay đổi, có thể null)

### Artificial Candidate Keys (Khóa ứng viên nhân tạo)

Khi bảng **không có candidate key**, tạo **artificial (surrogate) candidate key**: trường mới tuân thủ mọi Thành tố, thêm vào bảng.

**Dùng khi:**
1. Không có trường hoặc tổ hợp đủ điều kiện candidate key (vd: bảng PARTS — thêm PART NUMBER).
2. Trường đơn mới mạnh hơn composite hiện có (vd: EMPLOYEE ID thay cho EMPFIRST NAME + EMPLAST NAME).

**Lưu ý:** Trường ID (EMPLOYEE ID, VENDOR ID, DEPARTMENT ID) thường dùng làm artificial candidate key. Chúng luôn tuân thủ, làm primary key tốt và đơn giản hóa thiết lập mối quan hệ.

### Primary Keys (Khóa chính)

**Primary key** là khóa quan trọng nhất. Phải tuân thủ các thành tố giống candidate key. Bạn **chọn** nó từ tập candidate key.

**Các thành tố của Primary Key** — Giống Các thành tố của Candidate Key (9 thành tố).

**Hướng dẫn chọn:**
1. Ưu tiên candidate key **đơn giản (một trường)** hơn composite.
2. Ưu tiên candidate key **chứa phần tên bảng** (vd: SALES INVOICE NUMBER cho SALES INVOICES).

**Kiểm tra quan trọng trước khi chốt:** Primary key phải **xác định độc quyền giá trị mỗi trường** trong mọi bản ghi. Nếu không xác định giá trị trường, **loại trường đó** khỏi bảng (thêm vào bảng khác hoặc bỏ).

**Quy trình kiểm tra:**
1. Nạp bảng dữ liệu mẫu.
2. Chọn bản ghi; ghi giá trị primary key.
3. Với mỗi trường, hỏi: *Giá trị primary key này có xác định độc quyền giá trị hiện tại của \<tên trường\> không?*
   - Có → chuyển trường tiếp theo.
   - Không → **loại trường**; chuyển trường tiếp theo.
4. Lặp đến khi đã kiểm tra mọi trường.

**Đánh dấu:** Thay "CK" bằng "PK". Composite primary key = "CPK".

**Quy tắc:**
1. Mỗi bảng có **một và chỉ một** primary key.
2. Mỗi primary key trong cơ sở dữ liệu phải **duy nhất** — không có hai bảng dùng chung primary key (ngoại lệ: mối quan hệ một-một hoặc bảng tập con).

### Alternate Keys (Khóa thay thế)

**Alternate keys** = các candidate key còn lại sau khi chọn primary key. Bao gồm "AK" hoặc "CAK" (composite alternate key). Cung cấp phương tiện thay thế để xác định duy nhất bản ghi trong RDBMS. Không dùng trong quy trình thiết kế; hữu ích khi triển khai.

### Non-keys (Trường không phải khóa)

**Non-key** là trường không phải candidate, primary, alternate hay foreign key. Nó đại diện đặc điểm của chủ đề; giá trị được xác định bởi primary key. Không có đánh dấu đặc biệt.

---

## 3. Tính toàn vẹn cấp bảng

Tính toàn vẹn cấp bảng đảm bảo:

- Không có **bản ghi trùng lặp**
- Primary key **xác định độc quyền** mỗi bản ghi
- Mọi giá trị primary key **duy nhất**
- Giá trị primary key **không null**

Thiết lập bằng cách định nghĩa primary key tuân thủ Các thành tố của Primary Key.

---

## 4. Rà soát cấu trúc bảng ban đầu

Tiến hành phỏng vấn người dùng và quản lý để rà soát:

1. **Chủ đề phù hợp** — Đảm bảo không thiếu chủ đề quan trọng.
2. **Tên và mô tả bảng** — Phù hợp và có ý nghĩa; làm rõ nếu gây nhầm lẫn.
3. **Tên trường** — Phù hợp và có ý nghĩa; giải thích đổi tên cho chuẩn cơ sở dữ liệu mới; nhắc RDBMS có thể hiển thị nhãn khác.
4. **Trường đã gán** — Xác minh mọi đặc điểm cần thiết đều có; thêm trường bỏ sót.

---

## 5. Ví dụ: Mike's Bikes

- **CUSTOMERS:** Không có candidate key (STATUS, CUSTHOME PHONE, CUSTFIRST + CUSTLAST đều không đủ điều kiện). Tạo artificial key **CUSTOMER ID**.
- **EMPLOYEES:** Hai candidate key — EMPLOYEE NUMBER, EMPFIRST NAME + EMPLAST NAME. Chọn **EMPLOYEE NUMBER** làm primary key (nhân viên dùng số). Kiểm tra xác định độc quyền giá trị mỗi trường.
- **PRODUCTS, VENDORS:** Thiết lập primary key.
- **SERVICES (bảng tập con):** Phải dùng **cùng primary key** với PRODUCTS — dùng **PRODUCT NUMBER**. Bảng tập con kế thừa primary key của bảng dữ liệu.
- **Phỏng vấn:** Thêm CALL PRIORITY vào VENDORS theo yêu cầu Mike.

---

## Câu hỏi ôn tập

1. Nêu ba lý do tại sao khóa quan trọng.
2. Bốn loại khóa chính là gì?
3. Mục đích của candidate key là gì?
4. Nêu bốn mục trong Các thành tố của Candidate Key.
5. Đúng hay Sai: Candidate key có thể gồm nhiều hơn một trường.
6. Một bảng có thể có nhiều hơn một candidate key không?
7. Artificial candidate key là gì?
8. Khóa quan trọng nhất bạn gán cho bảng là gì?
9. Tại sao khóa này quan trọng?
10. Bạn thiết lập primary key như thế nào?
11. Nêu bốn mục trong Các thành tố của Primary Key.
12. Bạn phải làm gì trước khi chốt lựa chọn primary key?
13. Alternate key là gì?
14. Bạn đảm bảo điều gì khi thiết lập tính toàn vẹn cấp bảng?
15. Tại sao nên rà soát cấu trúc bảng ban đầu?

### Đáp án

1. (1) Xác định mỗi bản ghi; (2) Thiết lập và thực thi tính toàn vẹn; (3) Thiết lập mối quan hệ bảng.
2. Candidate, primary, foreign, non-key.
3. Định danh duy nhất mỗi bản ghi.
4. Không đa phần; giá trị duy nhất; không Null; không vi phạm bảo mật.
5. Đúng.
6. Có.
7. Trường tạo khi không có candidate key tự nhiên.
8. Primary key.
9. Xác định duy nhất mỗi bản ghi.
10. Chọn từ candidates; đánh dấu PK.
11. Giống Elements of Candidate Key.
12. Kiểm tra PK xác định độc quyền mỗi trường.
13. Candidate key không được chọn làm PK.
14. Mỗi bản ghi duy nhất; không trùng.
15. Xác minh cấu trúc trước khi thiết lập mối quan hệ.

---

## Kết quả học tập

Sau khi học chương này, bạn có thể:

- **Xác định** candidate key bằng Các thành tố của Candidate Key
- **Tạo** artificial candidate key khi cần
- **Chọn** primary key từ candidate key
- **Kiểm tra** primary key xác định độc quyền giá trị mỗi trường
- **Thiết lập** tính toàn vẹn cấp bảng
- **Rà soát** cấu trúc bảng ban đầu với người dùng và quản lý

*Tiếp tục Chương 9: Đặc tả trường*
