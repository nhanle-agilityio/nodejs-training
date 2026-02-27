# Chương 12: Views — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 12 trình bày **views**—bảng ảo rút dữ liệu từ bảng gốc (base tables) thay vì lưu trữ dữ liệu. View được xây lại và điền lại mỗi lần truy cập. Ba loại định nghĩa trong thiết kế logic: **data view** (xem/thao tác dữ liệu), **aggregate view** (hiển thị dữ liệu tổng hợp), và **validation view** (thi hành phạm vi giá trị). View hỗ trợ truy cập đa bảng, phản ánh dữ liệu mới nhất, cho phép tùy chỉnh, giúp thi hành tính toàn vẹn và hỗ trợ bảo mật. **Tờ Đặc tả View (View Specifications sheet)** ghi tài liệu mỗi view.

---

## 1. Views là gì?

**View** là **bảng ảo** gồm các trường từ một hoặc nhiều bảng (hoặc view khác). Các bảng tạo nên view là **base tables**. View "ảo" vì:
- Rút dữ liệu từ base tables; không lưu trữ dữ liệu
- Chỉ cấu trúc được lưu; RDBMS xây lại và điền lại mỗi truy cập
- Nhiều RDBMS gọi view là "saved queries"

**Lý do view có giá trị:**
- Làm việc với dữ liệu từ nhiều bảng đồng thời
- Phản ánh thông tin mới nhất
- Tùy chỉnh theo nhu cầu cá nhân/nhóm
- Giúp thi hành tính toàn vẹn dữ liệu (validation views)
- Bảo mật—kiểm soát dữ liệu người dùng xem được

---

## 2. Giải phẫu View — Ba loại

### Data View

Xem và thao tác dữ liệu từ một hoặc nhiều base tables.

**Một bảng:** Dùng các trường chọn từ một bảng. Sửa đổi truyền qua base table.

**Đa bảng:** Các bảng phải có mối quan hệ. **Data view không có khóa chính** (không phải bảng).

### Aggregate View

Hiển thị thông tin **tổng hợp** (Sum, Average, Min, Max, Count). Dùng calculated fields với hàm tổng hợp + data fields để nhóm.

**Đặc điểm:** Tất cả data fields là **grouping fields**; view gồm grouping + calculated fields → **không thể sửa dữ liệu**.

### Validation View

Giống validation table—thi hành tính toàn vẹn khi quy tắc giới hạn phạm vi giá trị. Khác: validation table lưu dữ liệu riêng; validation view rút từ base tables.

---

## 3. Xác định và Định nghĩa Views

Làm việc với người dùng và quản lý. Các điểm xác định yêu cầu view:
1. Rà soát ghi chú với nhóm
2. Rà soát mẫu báo cáo, nhập liệu
3. Xem xét bảng và chủ đề
4. Phân tích mối quan hệ bảng
5. Nghiên cứu quy tắc nghiệp vụ

**Định nghĩa:** Chọn bảng và trường; tạo view diagram; thêm calculated fields và filters khi cần.

---

## 4. Sử dụng Calculated Fields

View **có thể** chứa calculated fields. Dùng khi cung cấp thông tin phù hợp hoặc nâng cao cách hiển thị.

---

## 5. Áp dụng Tiêu chí Lọc

**Filter (criterion):** Biểu thức kiểm tra giá trị trường. View chỉ hiển thị bản ghi thỏa tiêu chí. Trường được kiểm tra phải có trong cấu trúc view. Ghi trên View Specifications sheet.

---

## 6. Tờ Đặc tả View

Đi kèm mỗi view diagram. Gồm: Name, Type, Base tables, Calculated field expressions, Filters.

---

## 7. Rà soát Tài liệu View

View định nghĩa đúng? Calculated fields phù hợp? Filters lấy đúng bản ghi? Có view diagram + View Specifications cho mỗi view?

---

## 8. Ví dụ: Mike's Bikes

**PREFERRED CUSTOMERS:** Bảng CUSTOMERS; calculated field CUSTOMER NAME; filter Status = "Preferred".

**VENDOR PRODUCT COUNT:** VENDORS, PRODUCTS; calculated field PRODUCT COUNT (Count); aggregate view; không filter.

---

## Câu hỏi ôn tập

1. Tại sao view gọi là bảng ảo?
2. Nêu hai lý do view có giá trị.
3. Đặt tên các loại view định nghĩa trong thiết kế logic.
4. RDBMS làm gì mỗi lần truy cập view?
5. Điều gì xác định sửa đổi bạn có thể thực hiện trên view?
6. Yêu cầu duy nhất cho data view đa bảng?
7. Tại sao data view không có khóa chính riêng?
8. Mục đích của aggregate view?
9. Các hàm tổng hợp phổ biến nhất?
10. Grouping field là gì?
11. Đúng/Sai: Có thể sửa dữ liệu trong aggregate view?
12. Khác biệt giữa validation table và validation view?
13. Nêu hai điểm khi xác định yêu cầu view.
14. Khi nào dùng calculated fields?
15. Làm sao định nghĩa view chỉ sách khoa học viễn tưởng?
16. Tại sao phải hoàn thành View Specifications cho mỗi view?

---

*Tiếp tục Chương 13: Rà soát Tính toàn vẹn Dữ liệu*
