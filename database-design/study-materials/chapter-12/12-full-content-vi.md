# Chương 12: Views

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Không có đối tượng nào trên trái đất không thể nhìn từ góc độ vũ trụ."*  
—FYODOR MIKHAYLOVICH DOSTOYEVSKY

---

## Các chủ đề trong chương này

- Views là gì?
- Giải phẫu View
- Xác định và Định nghĩa Views
- Ví dụ: Xác định và Định nghĩa Views
- Tóm tắt
- Câu hỏi ôn tập

---

## Views là gì?

Như đã học trong Chương 3, **view** là bảng ảo gồm các trường từ một hoặc nhiều bảng trong cơ sở dữ liệu; cũng có thể bao gồm trường từ view khác. Các bảng tạo nên view được gọi là **base tables** của view. View "ảo" vì rút dữ liệu từ base tables chứ không lưu trữ dữ liệu. Thông tin duy nhất về view được lưu trong cơ sở dữ liệu là cấu trúc; RDBMS xây lại và "điền lại" view mỗi lần bạn truy cập. Nhiều RDBMS gọi chúng là saved queries.

*Lưu ý: Indexed (materialized) view lưu dữ liệu và có thể được đánh chỉ mục—vấn đề triển khai theo nhà cung cấp, ngoài phạm vi sách.*

**Lý do nên định nghĩa và sử dụng view:**
- Làm việc với dữ liệu từ nhiều bảng đồng thời
- Phản ánh thông tin mới nhất (xây lại mỗi truy cập)
- Tùy chỉnh theo nhu cầu cá nhân hoặc nhóm
- Giúp thi hành tính toàn vẹn dữ liệu (validation view)
- Bảo mật và bảo mật—xác định dữ liệu có sẵn cho người dùng

---

## Giải phẫu View

Ba loại view có thể định nghĩa khi thiết kế cấu trúc logic: **data**, **aggregate**, và **validation**. (Materialized và partitioned view định nghĩa khi triển khai RDBMS—ngoài phạm vi.)

### Data View

Dùng để xem và thao tác dữ liệu từ một base table hoặc nhiều base tables.

**Single-Table:** Thường dùng các trường chọn từ base table. Sửa đổi truyền qua view vào base table. Đặc tả trường và quy tắc nghiệp vụ xác định loại sửa đổi cho phép.

**Multitable:** Yêu cầu duy nhất—các bảng phải có mối quan hệ với nhau. Ví dụ: CLASS ROSTER từ CLASSES + STUDENTS qua STUDENT CLASSES. "Dư thừa" hiển thị (tên lớp lặp theo sinh viên) chấp nhận được vì dữ liệu rút từ base tables, không lưu vật lý. **Data view không chứa khóa chính riêng** vì không phải bảng; có thể đưa PK từ base table nếu đóng góp thông tin.

### Aggregate View

Dùng để hiển thị thông tin do **tổng hợp** một tập dữ liệu theo cách cụ thể. Có thể dùng một hoặc nhiều base tables; bao gồm calculated fields với hàm tổng hợp (Sum, Average, Min, Max, Count) và data fields để nhóm dữ liệu tổng hợp.

**Đặc điểm:**
1. Trường calculated hiển thị một số cho mỗi nhóm
2. Tất cả data fields là **grouping fields**—giá trị không thể sửa
3. View gồm hoàn toàn grouping + calculated fields → **không thể sửa bất kỳ dữ liệu nào**

Aggregate view hữu ích làm cơ sở báo cáo hoặc cung cấp thông tin thống kê.

### Validation View

Tương tự validation table—giúp thi hành tính toàn vẹn dữ liệu. Khi quy tắc giới hạn phạm vi giá trị của trường, có thể thi hành ràng buộc bằng validation view hoặc validation table. Khác biệt: validation table lưu dữ liệu riêng; validation view rút từ base tables. Thường định nghĩa với một base table, hai hoặc ba trường. Có thể hạn chế trường người dùng truy cập trong khi vẫn cung cấp phạm vi hợp lệ cho FK.

---

## Xác định và Định nghĩa Views

Views là tài sản quan trọng. Trong giai đoạn này bạn định nghĩa tập view cơ bản; sẽ định nghĩa thêm khi triển khai RDBMS và tạo ứng dụng. View trong thiết kế tập trung vào truy cập dữ liệu và rút thông tin.

**Làm việc với người dùng và quản lý:** Xác định loại view tổ chức cần; thiết lập và ghi tài liệu; rà soát.

**Điểm xác định yêu cầu view:**
1. Rà soát ghi chú với nhóm (vd: mục tiêu sứ mệnh gợi ý view)
2. Rà soát mẫu nhập liệu, báo cáo, trình bày (đặc biệt báo cáo tóm tắt)
3. Xem bảng và chủ đề (vd: view hạn chế dữ liệu nhân viên vì bảo mật)
4. Phân tích mối quan hệ bảng (nhiều multitable views)
5. Nghiên cứu quy tắc nghiệp vụ (validation view)

**Định nghĩa view:** Xem sơ đồ mối quan hệ; chọn bảng và trường; định nghĩa và ghi vào view diagram.

---

## Sử dụng Calculated Fields phù hợp

Bảng không chứa calculated fields nhưng view có thể—đây là đặc điểm làm view hữu ích. Calculated fields hiển thị kết quả nối chuỗi, biểu thức hoặc hàm tổng hợp.

**Ví dụ:** CUSTOMER CALL LIST cần ngày mua cuối—thêm calculated field LAST PURCHASE DATE với `Max(Order Date)`. Hoặc CUSTOMER NAME nối `CustLast Name & ", " & CustFirst Name`.

**Quy tắc chung:** Dùng calculated fields nếu cung cấp thông tin phù hợp, có ý nghĩa hoặc nâng cao cách view sử dụng dữ liệu. Dùng calculated field list từ Chương 6 làm nguồn.

---

## Áp dụng Tiêu chí Lọc Dữ liệu

View có thể áp dụng **criterion** (tiêu chí) lên một hoặc nhiều trường để lọc bản ghi hiển thị. *Criterion* = biểu thức kiểm tra giá trị trường. View chỉ bao gồm bản ghi nếu giá trị thỏa tiêu chí.

Ví dụ: `CustState = "WA"` — chỉ khách Washington. `CustCity In ("Bellevue", "Olympia", ...)` — thành phố cụ thể. Dùng số tiêu chí tối thiểu cần thiết. **Trường được kiểm tra phải có trong cấu trúc view.** Không thể chỉ tiêu chí trên view diagram—ghi trên View Specifications sheet.

---

## Sử dụng View Specifications Sheet

Tờ Đặc tả View phải đi kèm mỗi view diagram. Các mục:

- **Name:** Tên view (theo hướng dẫn đặt tên bảng Chương 7; view có thể xác định hơn một chủ đề)
- **Type:** Data, Aggregate, hoặc Validation
- **Base tables:** Tên base tables
- **Calculated field expressions:** Biểu thức cho calculated fields
- **Filters:** Trường được kiểm tra + biểu thức dùng

Dùng biểu thức quen thuộc; sửa khi triển khai trong RDBMS.

---

## Rà soát Tài liệu cho Mỗi View

- View định nghĩa đúng? Loại đúng? Base tables phù hợp? Đủ và chỉ trường cần thiết?
- Calculated fields phù hợp? Có ý nghĩa? Nâng cao hiển thị?
- Filters lấy đúng bản ghi? Cần filter? Sẽ hoạt động đúng?
- **View diagram + View Specifications sheet cho mỗi view**

---

## Ví dụ: Mike's Bikes

**PREFERRED CUSTOMERS:** Base table CUSTOMERS; trường CUSTOMER ID, CUSTFIRST NAME, CUSTLAST NAME, CUSTHOME PHONE, STATUS. Calculated field CUSTOMER NAME nối tên. Filter: `Status = "Preferred"`.

**VENDOR PRODUCT COUNT:** Base tables VENDORS, PRODUCTS. VENDOR NAME từ VENDORS; calculated field PRODUCT COUNT với `Count(ProdName)`. Aggregate view. Không filter.

---

## Tóm tắt

View là bảng ảo không chứa hay lưu dữ liệu. Hữu ích vì: làm việc đa bảng, thi hành tính toàn vẹn, bảo mật. Ba loại: data, aggregate, validation. RDBMS xây lại view mỗi truy cập. Multitable view yêu cầu mối quan hệ giữa bảng. Data view không có PK. Có thể sửa dữ liệu qua nhiều view; validation view hoạt động như validation table. Xác định view với người dùng; định nghĩa với view diagram; calculated fields và filters; View Specifications sheet cho mỗi view.

---

## Câu hỏi ôn tập

1. Tại sao view gọi là bảng ảo?
2. Nêu hai lý do view có giá trị.
3. Đặt tên các loại view định nghĩa trong thiết kế logic.
4. RDBMS làm gì mỗi truy cập view?
5. Điều gì xác định sửa đổi trên view?
6. Yêu cầu duy nhất cho data view đa bảng?
7. Tại sao data view không có khóa chính riêng?
8. Mục đích của aggregate view?
9. Các hàm tổng hợp phổ biến nhất?
10. Grouping field là gì?
11. Đúng hay Sai: Có thể sửa dữ liệu trong aggregate view?
12. Khác biệt giữa validation table và validation view?
13. Nêu hai điểm khi xác định yêu cầu view.
14. Khi nào dùng calculated fields?
15. Làm sao định nghĩa view chỉ sách khoa học viễn tưởng?
16. Tại sao phải hoàn thành View Specifications cho mỗi view?
