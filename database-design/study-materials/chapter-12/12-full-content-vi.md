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

**Single-Table:** Thường dùng các trường chọn từ base table. Ví dụ, để cung cấp danh sách tên và số điện thoại nhân viên cho toàn tổ chức, bạn xây view EMPLOYEE PHONE LIST từ bảng EMPLOYEES với các trường EMPLOYEE ID, EMPFIRST NAME, EMPLAST NAME, EMPPHONE NUMBER. Hình 12.1 và 12.2 minh họa. RDBMS xây lại và điền lại view mỗi truy cập; hiển thị thay đổi mới nhất. Sửa đổi truyền qua view vào base table; đặc tả trường và quy tắc nghiệp vụ xác định loại sửa đổi cho phép.

*[Hình 12.1 View EMPLOYEE PHONE LIST.]*
*[Hình 12.2 Thông tin từ view EMPLOYEE PHONE LIST.]*

**Multitable:** Yêu cầu duy nhất—các bảng phải có mối quan hệ với nhau. Ví dụ: view CLASS ROSTER hiển thị tên mỗi lớp và tên sinh viên đăng ký; dùng CLASSES, STUDENTS qua STUDENT CLASSES. Hình 12.3–12.5 minh họa. Tên sinh viên phù hợp xuất hiện cho mỗi lớp vì CLASSES và STUDENTS liên quan qua STUDENT CLASSES. "Dư thừa" hiển thị (tên lớp lặp theo sinh viên) chấp nhận được—dữ liệu rút từ base tables, không lưu vật lý. **Data view không chứa khóa chính riêng** vì không phải bảng; có thể đưa PK từ base table nếu đóng góp thông tin.

*[Hình 12.3 Base tables cho view CLASS ROSTER.]*
*[Hình 12.4 Sơ đồ view CLASS ROSTER.]*
*[Hình 12.5 Mẫu dữ liệu từ view CLASS ROSTER.]*

### Aggregate View

Dùng để hiển thị thông tin do **tổng hợp** một tập dữ liệu theo cách cụ thể. Có thể dùng một hoặc nhiều base tables; bao gồm calculated fields với hàm tổng hợp (Sum, Average, Min, Max, Count) và data fields để nhóm dữ liệu. Sum, Average, Min, Max, Count là các hàm tổng hợp phổ biến nhất; mọi RDBMS chính hỗ trợ.

**Ví dụ:** Muốn biết số sinh viên đăng ký mỗi lớp. Thay vì dùng data view rồi đếm thủ công từng lớp (tẻ nhạt), dùng aggregate view: loại trường STUDENT ID, thêm calculated field TOTAL STUDENTS REGISTERED với hàm Count—đếm số STUDENT ID trong STUDENT CLASSES liên kết với mỗi CLASS ID. Hình 12.6–12.9 minh họa.

*[Hình 12.6 Sơ đồ view CLASS REGISTRATION.]*
*[Hình 12.7 Mẫu dữ liệu từ view ban đầu.]*
*[Hình 12.8 Sơ đồ đã sửa cho CLASS REGISTRATION.]*
*[Hình 12.9 Mẫu dữ liệu từ view đã sửa.]*

**Đặc điểm:**
1. Trường calculated hiển thị một số cho mỗi nhóm
2. Dư thừa trong trường nhóm (vd: CLASS NAME) được loại bỏ—mọi thể hiện cùng tên gộp thành một; tất cả data fields là **grouping fields** (giá trị không thể sửa)
3. View gồm hoàn toàn grouping + calculated fields → **không thể sửa bất kỳ dữ liệu nào**

Aggregate view hữu ích làm cơ sở báo cáo hoặc cung cấp thông tin thống kê.

### Validation View

Tương tự validation table—giúp thi hành tính toàn vẹn dữ liệu. Khi quy tắc giới hạn phạm vi giá trị của trường, có thể thi hành ràng buộc bằng validation view hoặc validation table. Khác biệt: validation table lưu dữ liệu riêng; validation view rút từ base tables. Thường định nghĩa với một base table, hai hoặc ba trường (cấu trúc tương tự validation table).

**Ví dụ:** Thiết kế cơ sở dữ liệu cho nhà thầu nhỏ. SUBCONTRACTOR ID trong PROJECT SUBCONTRACTORS lấy phạm vi giá trị từ SUBCONTRACTORS. Bạn muốn giới hạn truy cập—người dùng chỉ xem SUBCONTRACTOR ID, SCNAME, SCPHONE NUMBER, SCEMAIL. Định nghĩa validation view APPROVED SUBCONTRACTORS với các trường đó; view vẫn cung cấp phạm vi hợp lệ cho SUBCONTRACTOR ID trong PROJECT SUBCONTRACTORS và thi hành đặc điểm mối quan hệ của SUBCONTRACTORS. Hình 12.10 và 12.11 minh họa.

*[Hình 12.10 Các bảng từ cơ sở dữ liệu nhà thầu nhỏ.]*
*[Hình 12.11 Sơ đồ đã sửa; lưu ý view APPROVED SUBCONTRACTORS.]*

---

## Xác định và Định nghĩa Views

Views là tài sản quan trọng. Trong giai đoạn này bạn định nghĩa tập view cơ bản; sẽ định nghĩa thêm khi triển khai RDBMS và tạo ứng dụng. View trong thiết kế tập trung vào truy cập dữ liệu và rút thông tin.

**Làm việc với người dùng và quản lý:** Làm việc lại với nhóm đại diện để xác định loại view tổ chức cần. Sau khi xác định, thiết lập và ghi tài liệu, rồi cùng nhóm rà soát để đảm bảo view định nghĩa đúng. Trước cuộc họp đầu tiên, rà soát ghi chú từ toàn bộ quy trình thiết kế—mục tiêu là có ý tưởng loại view tổ chức có thể cần. Hầu hết tổ chức dành nhiều thời gian tạo và đọc báo cáo—tập trung vào khía cạnh đó. Rà soát mẫu báo cáo thu thập trong giai đoạn phân tích.

**Điểm xác định yêu cầu view:**
1. Rà soát ghi chú với nhóm (vd: mục tiêu sứ mệnh gợi ý view)
2. Rà soát mẫu nhập liệu, báo cáo, trình bày (đặc biệt báo cáo tóm tắt)
3. Xem bảng và chủ đề (vd: view hạn chế dữ liệu nhân viên vì bảo mật)
4. Phân tích mối quan hệ bảng (nhiều multitable views)
5. Nghiên cứu quy tắc nghiệp vụ (validation view)

**Định nghĩa view:** Xem sơ đồ mối quan hệ; chọn bảng và trường; định nghĩa và ghi vào view diagram.

**Ví dụ CUSTOMER CALL LIST:** Báo cáo cần view hiển thị thông tin khách hàng và đơn hàng, đặc biệt ngày mua cuối. Rà soát sơ đồ CUSTOMERS và ORDERS; chọn CUSTFIRST NAME, CUSTLAST NAME, CUSTPHONE NUMBER, CUSTCITY từ CUSTOMERS và ORDER DATE từ ORDERS. Thêm calculated field LAST PURCHASE DATE với biểu thức `Max(Order Date)` để lấy ngày mua cuối mỗi khách; có thể thêm CUSTOMER NAME nối `CustLast Name & ", " & CustFirst Name`. Hình 12.12–12.15 minh họa.

*[Hình 12.12 Mẫu báo cáo yêu cầu view.]*
*[Hình 12.13 Sơ đồ mối quan hệ CUSTOMERS và ORDERS.]*
*[Hình 12.14 Sơ đồ view CUSTOMER CALL LIST.]*
*[Hình 12.15 Sơ đồ đã sửa cho CUSTOMER CALL LIST.]*

---

## Sử dụng Calculated Fields phù hợp

Bảng không chứa calculated fields nhưng view có thể—đây là đặc điểm làm view hữu ích. Calculated fields hiển thị kết quả nối chuỗi, biểu thức hoặc hàm tổng hợp.

**Ví dụ:** CUSTOMER CALL LIST cần ngày mua cuối—thêm calculated field LAST PURCHASE DATE với `Max(Order Date)`. Hoặc CUSTOMER NAME nối `CustLast Name & ", " & CustFirst Name`.

**Quy tắc chung:** Dùng calculated fields nếu cung cấp thông tin phù hợp, có ý nghĩa hoặc nâng cao cách view sử dụng dữ liệu. Dùng calculated field list từ Chương 6 làm nguồn.

---

## Áp dụng Tiêu chí Lọc Dữ liệu

View có thể áp dụng **criterion** (tiêu chí) lên một hoặc nhiều trường để lọc bản ghi hiển thị. *Criterion* = biểu thức kiểm tra giá trị trường. View chỉ bao gồm bản ghi nếu giá trị thỏa tiêu chí.

Ví dụ: `CustState = "WA"` — chỉ khách Washington. Để lọc thêm theo thành phố: `CustCity In ("Bellevue", "Olympia", "Redmond", "Seattle", "Spokane", "Tacoma")`. Cả hai tiêu chí có thể cần—nhiều thành phố trùng tên ở các bang khác nhau (vd: Portland, Oregon và Portland, Maine). Dùng số tiêu chí tối thiểu để lấy đúng bản ghi. **Trường được kiểm tra phải có trong cấu trúc view.** Không thể chỉ tiêu chí trên view diagram—ghi trên View Specifications sheet.

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

### Đáp án

1. View không lưu trữ dữ liệu—nó rút từ base tables; chỉ cấu trúc được lưu.
2. Bất kỳ hai trong số: làm việc với dữ liệu từ nhiều bảng; phản ánh thông tin mới nhất; tùy chỉnh; thi hành tính toàn vẹn; bảo mật.
3. **Data**, **aggregate** và **validation**.
4. RDBMS **xây lại và điền lại** view mỗi lần truy cập.
5. **Đặc tả trường** và **quy tắc nghiệp vụ** của các trường/base tables.
6. Các bảng phải có **mối quan hệ** với nhau.
7. View không phải bảng—không lưu dữ liệu nên không cần PK riêng.
8. Hiển thị thông tin **tổng hợp** (Sum, Average, Count, Min, Max); cơ sở cho báo cáo.
9. **Sum**, **Average**, **Min**, **Max**, **Count**.
10. Trường dùng để nhóm dữ liệu trong aggregate view—giá trị không thể sửa.
11. **Sai.** Không thể sửa dữ liệu trong aggregate view.
12. Validation table lưu dữ liệu riêng; validation view rút từ base tables.
13. Bất kỳ hai trong số: rà soát ghi chú với nhóm; rà soát mẫu báo cáo; xem bảng và chủ đề; phân tích mối quan hệ; nghiên cứu quy tắc nghiệp vụ.
14. Khi cung cấp thông tin phù hợp, có ý nghĩa hoặc nâng cao cách view sử dụng dữ liệu.
15. Thêm filter/criterion trên trường danh mục (vd: Category = "Science Fiction")—trường phải có trong cấu trúc view.
16. Ghi đặc điểm view (tên, loại, base tables, biểu thức calculated fields, filters) để triển khai đúng trong RDBMS.
