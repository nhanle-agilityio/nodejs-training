# Chương 11: Quy tắc nghiệp vụ

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Bạn được nhớ đến vì những quy tắc bạn phá vỡ."*  
—TƯỚNG DOUGLAS MACARTHUR

---

## Các chủ đề trong chương này

- Quy tắc nghiệp vụ là gì?
- Các loại Quy tắc nghiệp vụ
- Phân loại Quy tắc nghiệp vụ
- Định nghĩa và Thiết lập Quy tắc nghiệp vụ
- Bảng xác thực (Validation Tables)
- Rà soát Tờ Đặc tả Quy tắc nghiệp vụ
- Ví dụ: Định nghĩa và Thiết lập Quy tắc nghiệp vụ
- Tóm tắt
- Câu hỏi ôn tập

---

## Quy tắc nghiệp vụ là gì?

Trong suốt quy trình thiết kế cơ sở dữ liệu, bạn đã thực hiện các tác vụ giúp thiết lập các mức tính toàn vẹn dữ liệu khác nhau. Bạn đã thiết lập tính toàn vẹn cấp bảng, cấp trường và cấp mối quan hệ. Trong chương này bạn sẽ học cách thiết lập thành phần cuối cùng của tính toàn vẹn dữ liệu tổng thể: **quy tắc nghiệp vụ**.

**Quy tắc nghiệp vụ** là phát biểu áp đặt một dạng ràng buộc lên một khía cạnh cụ thể của cơ sở dữ liệu, chẳng hạn các thành tố trong đặc tả trường cho một trường cụ thể hoặc đặc điểm của một mối quan hệ cho trước. Bạn dựa quy tắc trên cách tổ chức nhận thức và sử dụng dữ liệu, điều bạn xác định từ cách tổ chức hoạt động hoặc tiến hành kinh doanh.

Một khía cạnh quan trọng của bất kỳ quy trình thiết kế nào là đưa ra lựa chọn. Trong thiết kế cơ sở dữ liệu, bạn phải chọn dữ liệu nào lưu; cách bạn quyết định lưu và lưu như thế nào sẽ do cách tổ chức sử dụng dữ liệu quyết định. Một bệnh viện có thể muốn lưu thời gian các sự kiện đến giây, trong khi kho chỉ cần ngày cho bất kỳ sự kiện nào.

Để hướng dẫn các lựa chọn này và các lựa chọn khác, bạn cần phát biểu chính thức về quy tắc nghiệp vụ của tổ chức. Các quy tắc ảnh hưởng nhiều vấn đề cơ sở dữ liệu: dữ liệu thu thập và lưu, cách định nghĩa và thiết lập mối quan hệ, loại thông tin cơ sở dữ liệu có thể cung cấp, bảo mật và bảo mật dữ liệu. Tạo bộ quy tắc chung áp dụng cho hai hay nhiều tổ chức gần như không thể—mỗi tổ chức cần bộ quy tắc riêng.

**Ví dụ:** *SHIP DATE không thể trước ORDER DATE cho bất kỳ đơn hàng nào.* Quy tắc này áp đặt ràng buộc lên thành tố Range of Values của đặc tả trường cho trường SHIP DATE. Nó giúp đảm bảo giá trị SHIP DATE có ý nghĩa trong ngữ cảnh đơn hàng bán hàng.

Vì quy tắc nghiệp vụ phụ thuộc vào cách tổ chức nhận thức và sử dụng dữ liệu, nhiều tổ chức có thể dùng cùng quy tắc nhưng vì lý do hoàn toàn khác nhau (vd: hai trường nhạc cùng giới hạn "tối đa 2 nhạc cụ mỗi sinh viên"—một do chương trình, một do giới hạn kho).

Một số ràng buộc do quy tắc nghiệp vụ áp đặt **không thể thiết lập trong thiết kế logic** (vd: phải kiểm tra CHECK-IN DATE trước khi cho mượn thêm). Các ràng buộc đó phải được xử lý bên ngoài thiết kế logic. Bạn xác định loại quy tắc đang định nghĩa để biết có thể biểu diễn ràng buộc trong quy trình này hay không.

---

## Các loại Quy tắc nghiệp vụ

Hai loại chính: **hướng cơ sở dữ liệu** và **hướng ứng dụng**. Cả hai áp đặt ràng buộc và giúp thi hành tính toàn vẹn dữ liệu, nhưng khác nhau về nơi và cách thiết lập.

### Hướng cơ sở dữ liệu (Database-Oriented)

Áp đặt ràng buộc có thể thiết lập **trong thiết kế logic** của cơ sở dữ liệu. Bạn triển khai bằng cách sửa các thành tố đặc tả trường, đặc điểm mối quan hệ hoặc kết hợp. Ví dụ: *Chúng ta kinh doanh chỉ với nhà cung cấp từ Tây Bắc Thái Bình Dương* → giới hạn VENDSTATE thành WA, OR, ID, MT.

### Hướng ứng dụng (Application-Oriented)

Áp đặt ràng buộc **không thể thiết lập trong thiết kế logic**. Phải thiết lập trong thiết kế vật lý hoặc thiết kế ứng dụng cơ sở dữ liệu. Ví dụ: *Khách hàng "Preferred" nhận chiết khấu 15%* — không có trường lưu số tiền chiết khấu (là kết quả tính toán), không có cách chỉ tiêu chí. Cách định nghĩa và thiết lập quy tắc hướng ứng dụng ngoài phạm vi sách.

*Từ đây, "quy tắc nghiệp vụ" đề cập đến quy tắc hướng cơ sở dữ liệu.*

---

## Phân loại Quy tắc nghiệp vụ

### Trường cụ thể (Field-Specific)

Ràng buộc **các thành tố của đặc tả trường** cho một trường cụ thể. Số thành tố bị ảnh hưởng tùy cách bạn định nghĩa quy tắc.

- *Ngày đơn hàng không thể trước 16/5/2018* → Range of Values (ORDER DATE)
- *Phải lưu mã bưu điện cho khách hàng Canada* → Data Type, Length, Character Support (CUSTZIPCODE)

### Mối quan hệ cụ thể (Relationship-Specific)

Ràng buộc ảnh hưởng **đặc điểm của mối quan hệ**. Ví dụ: *Mỗi lớp phải có tối thiểu 5 sinh viên, tối đa 20* → mức độ tham gia giữa CLASSES và STUDENT CLASSES; sửa sơ đồ thành (5,20). Có thể suy ra loại tham gia của STUDENT CLASSES là Mandatory.

---

## Định nghĩa và Thiết lập Quy tắc nghiệp vụ

Bạn định nghĩa và thiết lập quy tắc dựa trên cách tổ chức nhận thức và sử dụng dữ liệu. **Thứ tự:** Định nghĩa và thiết lập quy tắc **trường cụ thể trước**, sau đó **mối quan hệ cụ thể**. Cách này giúp tập trung và tránh nhảy qua lại gây nhầm lẫn.

**Làm việc với người dùng và quản lý:** Lên lịch họp với nhóm đại diện để cùng định nghĩa và thiết lập quy tắc phù hợp. Làm việc theo nhóm giúp đảm bảo ràng buộc có ý nghĩa và không có nhầm lẫn về sự cần thiết.

---

## Định nghĩa và Thiết lập Quy tắc Trường cụ thể

**Sáu bước:**

1. **Chọn bảng** — Bất kỳ bảng nào; nghĩ về chủ đề, cách dùng, mối quan hệ.
2. **Rà soát mỗi trường** — Xem đặc tả trường; hỏi: *Dựa trên cách bảng được dùng, có cần ràng buộc cho thành tố nào không?*
3. **Định nghĩa quy tắc cần thiết** — Xác định ràng buộc hàm ý; chuyển thành phát biểu quy tắc.
4. **Thiết lập** — Sửa các thành tố đặc tả trường phù hợp (Required Value, Null Support, Edit Rule, Range of Values, v.v.).
5. **Xác định hành động kiểm tra quy tắc** — Ràng buộc được kiểm tra khi insert/delete/update bản ghi hoặc giá trị trường. Hỏi: *Quy tắc sẽ vi phạm khi tôi [hành động]?*
6. **Ghi trên Tờ Đặc tả Quy tắc nghiệp vụ** — Điền sheet cho mỗi quy tắc.

**Tờ Đặc tả Quy tắc nghiệp vụ gồm:** Statement, Constraint, Type, Category, Test On, Structures Affected, Field Elements Affected / Relationship Characteristics Affected, Action Taken. Action Taken ghi rõ ngày, người, sửa đổi—quan trọng cho xử lý sự cố.

---

## Định nghĩa và Thiết lập Quy tắc Mối quan hệ cụ thể

**Sáu bước tương tự:**

1. Chọn mối quan hệ
2. Rà soát — có cần ràng buộc?
3. Định nghĩa quy tắc
4. Thiết lập — sửa đặc điểm mối quan hệ (mức độ, loại tham gia, quy tắc xóa)
5. Xác định hành động kiểm tra
6. Ghi trên Tờ Đặc tả

**Ngoại lệ quan trọng:** Khi xóa bản ghi con sẽ vi phạm quy tắc bắt buộc, bạn phải **thiết lập quy tắc xóa Restrict cho bảng con**. Ví dụ: *Giảng viên phải dạy ít nhất một lớp* — không thể xóa bản ghi INSTRUCTOR CLASSES cuối cùng của giảng viên. Restrict cho bảng con xử lý điều này.

---

## Bảng xác thực (Validation Tables)

Khi quy tắc trường cụ thể áp đặt ràng buộc định nghĩa **tập giá trị hợp lệ rõ ràng** cho phạm vi giá trị của trường, và tập này thường cố định, ít thay đổi—bạn có thể lưu các giá trị trong **bảng xác thực** để tránh liệt kê dài trên đặc tả và phức tạp khi triển khai RDBMS.

**Cấu trúc điển hình:** Hai trường—trường đầu làm khóa chính (dùng thi hành tính toàn vẹn); trường thứ hai là trường không khóa lưu tập giá trị bắt buộc cho trường khác.

### Sử dụng Bảng xác thực hỗ trợ Quy tắc nghiệp vụ

1. **Tạo bảng xác thực** với các giá trị hợp lệ.
2. **Thiết lập mối quan hệ 1:N** giữa bảng cha của trường bị ảnh hưởng và bảng xác thực. Thay trường gốc bằng bản sao khóa chính từ bảng xác thực (FK).
3. **Sửa Range of Values** — *Bất kỳ giá trị nào trong trường [tên] của bảng [xác thực].*
4. **Đặt đặc điểm mối quan hệ:** Deletion Rule = Restrict; Type: validation Mandatory, parent Optional; Degree phù hợp.

Ví dụ: SUPPLIERS.SUPPSTATE giới hạn 11 bang miền Tây + AK, HI → bảng STATES; SUPPLIERS.STATE (FK) từ STATES.STATE.

---

## Rà soát Tờ Đặc tả Quy tắc nghiệp vụ

Sau khi thiết lập quy tắc, rà soát từng tờ đặc tả—đảm bảo quy tắc được thiết lập đúng và mọi vùng được đánh dấu rõ. Sửa lỗi; lặp cho đến khi rà soát xong.

Quy tắc nghiệp vụ là thành phần quan trọng; góp phần vào tính toàn vẹn dữ liệu tổng thể. Bạn sẽ thường xuyên xem lại—thêm, sửa, có thể xóa (cẩn thận trước khi xóa). Cần sửa đổi trong tương lai là bình thường khi tổ chức phát triển.

---

## Ví dụ: Mike's Bikes

**Trường cụ thể:** CATEGORY trong PRODUCTS → quy tắc *Không cho phép danh mục sản phẩm không hợp lệ* → bảng xác thực CATEGORIES; quan hệ PRODUCTS ↔ CATEGORIES; PRODUCTS.CATEGORY ID (FK); Range of Values = giá trị trong CATEGORIES.

**Mối quan hệ cụ thể:** VENDORS ↔ PRODUCTS → *Mỗi nhà cung cấp phải cung cấp ít nhất một sản phẩm* → Mandatory + (1,N) cho PRODUCTS; Restrict deletion rule dựa trên PRODUCTS (tránh xóa sản phẩm cuối cùng của nhà cung cấp).

---

## Tóm tắt

Chương định nghĩa quy tắc nghiệp vụ—ràng buộc dựa trên cách tổ chức nhận thức và sử dụng dữ liệu. Hai loại: hướng cơ sở dữ liệu (trọng tâm) và hướng ứng dụng. Hai phân loại: trường cụ thể và mối quan hệ cụ thể. Sáu bước cho mỗi loại; Tờ Đặc tả Quy tắc nghiệp vụ để ghi tài liệu. Bảng xác thực thi hành quy tắc giới hạn phạm vi giá trị; thiết lập mối quan hệ với các đặc điểm phù hợp.

---

## Câu hỏi ôn tập

1. Quy tắc nghiệp vụ là gì?
2. Đặt tên hai loại quy tắc chính.
3. Bạn có thể thiết lập quy tắc hướng ứng dụng trong thiết kế logic không?
4. Hai phân loại quy tắc hướng cơ sở dữ liệu là gì?
5. Quy tắc trường cụ thể là gì?
6. Khi nào quy tắc được kiểm tra?
7. Bạn ghi tài liệu quy tắc như thế nào?
8. Nêu hai lợi ích của Tờ Đặc tả Quy tắc nghiệp vụ.
9. Mục đích của mục Action Taken?
10. Mục đích của bảng xác thực?
11. Cấu trúc điển hình của bảng xác thực?
12. Mối liên hệ giữa quy tắc và bảng xác thực?
13. Tại sao nên rà soát tất cả Tờ Đặc tả đã hoàn thành?
