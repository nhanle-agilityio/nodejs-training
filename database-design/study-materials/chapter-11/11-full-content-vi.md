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

**Ví dụ ảnh hưởng một thành tố:** *Ngày đơn hàng không thể trước 16/5/2018—ngày doanh nghiệp được thành lập.* Quy tắc này ảnh hưởng phạm vi ngày có thể nhập vào trường ORDER DATE trong bảng ORDERS. Bạn thiết lập bằng cách sửa thành tố Range of Values của đặc tả trường cho ORDER DATE.

**Ví dụ ảnh hưởng nhiều thành tố:** *Chúng ta phải lưu được mã bưu điện cho khách hàng Canada.* Quy tắc này ảnh hưởng Data Type, Length và Character Support của đặc tả trường cho CUSTZIPCODE trong bảng CUSTOMERS. Mã bưu điện mở rộng chứa dấu gạch ngang, mã Canada chứa chữ cái—nên sửa: (1) Data Type = "Alphanumeric"; (2) Length = 9; (3) Character Support = Letters + Keyboard. Hình 11.3 minh họa.

*[Hình 11.3 Thiết lập quy tắc trường cụ thể cho CUSTZIPCODE.]*

### Mối quan hệ cụ thể (Relationship-Specific)

Ràng buộc ảnh hưởng **đặc điểm của mối quan hệ**. Giả sử bạn làm việc với các bảng và mối quan hệ trong Hình 11.4. Hình 11.5 minh họa.

*[Hình 11.4 Các bảng và mối quan hệ từ cơ sở dữ liệu trường học.]*

**Ví dụ:** *Mỗi lớp phải có tối thiểu 5 sinh viên, không được quá 20.* Quy tắc ảnh hưởng mức độ tham gia giữa CLASSES và STUDENT CLASSES. Bạn thi hành ràng buộc bằng cách sửa sơ đồ mối quan hệ để thể hiện một bản ghi trong CLASSES phải liên quan đến ít nhất 5 nhưng không quá 20 bản ghi trong STUDENT CLASSES. Tùy quan điểm, bạn có thể suy ra loại tham gia của STUDENT CLASSES là Mandatory—chỉ có thể nhập hoặc giữ lớp nếu có ít nhất 5 sinh viên đăng ký.

*[Hình 11.5 Thiết lập quy tắc mối quan hệ cụ thể.]*

---

## Định nghĩa và Thiết lập Quy tắc nghiệp vụ

Bạn định nghĩa và thiết lập quy tắc dựa trên cách tổ chức nhận thức và sử dụng dữ liệu. **Thứ tự:** Định nghĩa và thiết lập quy tắc **trường cụ thể trước**, sau đó **mối quan hệ cụ thể**. Cách này giúp tập trung và tránh nhảy qua lại gây nhầm lẫn.

**Làm việc với người dùng và quản lý:** Lên lịch họp mới với nhóm đại diện người dùng và quản lý để cùng định nghĩa và thiết lập quy tắc phù hợp. Làm việc theo nhóm giúp đảm bảo ràng buộc có ý nghĩa và không có nhầm lẫn hoặc mơ hồ về sự cần thiết của từng ràng buộc. Nếu có ai nghi ngờ về ràng buộc, thảo luận tác động lên trường hoặc mối quan hệ, ưu và nhược điểm—sau đó quyết định giữ hay bỏ quy tắc dựa trên kết quả thảo luận.

---

## Định nghĩa và Thiết lập Quy tắc Trường cụ thể

Bạn định nghĩa và thiết lập mỗi quy tắc bằng sáu bước sau. Ví dụ minh họa dùng trường CUSTCOUNTY trong bảng CUSTOMERS.

**Bước 1: Chọn bảng.** Bảng nào trước không quan trọng vì bạn sẽ áp dụng cho tất cả. Nếu chọn bảng quen thuộc, bạn có thể tập trung học quy trình. Hỏi: *Tổ chức sử dụng thông tin dựa trên hoặc liên quan chủ đề này như thế nào? Bảng này có mối quan hệ nào với chính nó hoặc bảng khác?* Tham khảo danh sách bảng cuối cùng và sơ đồ mối quan hệ khi cần.

**Bước 2: Rà soát mỗi trường.** Xem Field Specifications sheet cho mỗi trường và xác định có cần áp ràng buộc lên thành tố nào không. Hỏi: *Dựa trên cách bảng được dùng, có cần ràng buộc cho bất kỳ thành tố nào trong đặc tả này không?* Nếu "không," chuyển sang trường tiếp theo. Ví dụ với CUSTCOUNTY, nếu người tham gia nói: *"Sếp muốn theo dõi khách hàng theo quận, nên phải ghi quận cho mỗi khách. Chúng ta vừa thêm Pierce và Snohomish vào khu vực bán hàng—ghi tên quận là bắt buộc."* → Trả lời rõ ràng là "có," tiếp tục Bước 3. Hình 11.6 minh họa Logical Elements hiện tại.

*[Hình 11.6 Thiết lập hiện tại cho Logical Elements của CUSTCOUNTY.]*

**Bước 3: Định nghĩa quy tắc cần thiết.** Xác định ràng buộc hàm ý từ phản hồi, chuyển mỗi ràng buộc thành phát biểu quy tắc. Phản hồi trên gợi ý hai ràng buộc: (1) Mỗi khách hàng phải có quận; (2) Phạm vi giá trị giới hạn ở King, Kitsap, Pierce, Snohomish. Ví dụ phát biểu: *Mỗi khách hàng phải được liên kết với một quận.* và *Chỉ các quận King, Kitsap, Pierce và Snohomish có thể nhập vào trường này.*

**Bước 4: Thiết lập quy tắc.** Sửa các thành tố đặc tả trường phù hợp. Quy tắc thứ nhất ảnh hưởng Required Value, Null Support, Edit Rule—đặt lần lượt "Yes," "No Nulls," "Enter Now, Edits Allowed." Quy tắc thứ hai ảnh hưởng Range of Values—sửa thành "King, Kitsap, Pierce, Snohomish." Hình 11.7 minh họa. Kiểm tra cẩn thận mỗi quy tắc để xác định thành tố bị ảnh hưởng; giữ Field Specifications sheet bên cạnh khi mới bắt đầu.

*[Hình 11.7 Thiết lập đã sửa cho Logical Elements của CUSTCOUNTY.]*

**Bước 5: Xác định hành động kiểm tra quy tắc.** Ràng buộc được kiểm tra khi chèn, xóa hoặc cập nhật bản ghi hoặc giá trị trường. Hỏi: *Quy tắc sẽ vi phạm khi tôi nhập bản ghi mới? Khi không nhập? Khi xóa bản ghi? Khi nhập giá trị vào trường? Khi không nhập? Khi cập nhật giá trị? Khi xóa giá trị?* Ghi lại các hành động sẽ kích hoạt vi phạm—dùng trong Bước 6 và khi triển khai RDBMS. Với CUSTCOUNTY: kiểm tra khi nhập giá trị (phải trong phạm vi) và khi xóa giá trị (không được Null).

**Bước 6: Ghi trên Tờ Đặc tả Quy tắc nghiệp vụ.** Điền Business Rule Specifications sheet cho mỗi quy tắc. Hình 11.8 minh họa sheet hoàn thành cho CUSTCOUNTY.

*[Hình 11.8 Ví dụ Tờ Đặc tả Quy tắc nghiệp vụ.]*

### Các mục trên Tờ Đặc tả Quy tắc nghiệp vụ

- **Statement:** Văn bản quy tắc—rõ ràng, súc tích, không gây nhầm lẫn.
- **Constraint:** Giải thích ngắn về cách ràng buộc áp dụng cho bảng và trường.
- **Type:** Database oriented hoặc Application oriented.
- **Category:** Field specific hoặc Relationship specific.
- **Test On:** Hành động (insert, delete, update) sẽ kiểm tra ràng buộc.
- **Structures Affected:** Tên trường hoặc bảng bị ảnh hưởng.
- **Field Elements Affected:** (trường cụ thể) Thành tố đặc tả trường bị ảnh hưởng.
- **Relationship Characteristics Affected:** (mối quan hệ cụ thể) Đặc điểm mối quan hệ bị ảnh hưởng.
- **Action Taken:** Sửa đổi đã thực hiện; bắt đầu bằng ngày và tên/initials người thực hiện. Quan trọng cho xử lý sự cố—ghi chính xác các bước đã làm.

**Ba lợi ích của sheet:** (1) Ghi mọi quy tắc hướng cơ sở dữ liệu; (2) Ghi quy tắc hướng ứng dụng (dù không thiết lập trong thiết kế logic, thông tin hữu ích khi triển khai); (3) Định dạng chuẩn—dễ theo dõi, bảo trì và xử lý sự cố.

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

**Bảng xác thực (validation table)**—còn gọi là lookup table—là bảng lưu các giá trị dùng để thi hành tính toàn vẹn dữ liệu. Bảng này hiếm khi sửa đổi sau khi đã điền dữ liệu.

Khi quy tắc trường cụ thể áp đặt ràng buộc định nghĩa **tập giá trị hợp lệ rõ ràng** cho phạm vi giá trị của trường, và tập này thường cố định hoặc có thể khá lớn—bạn có thể lưu các giá trị trong **bảng xác thực** thay vì liệt kê dài trên đặc tả. Cách này giúp triển khai trong RDBMS đơn giản và nhất quán hơn.

**Cấu trúc điển hình:** Hai trường—(1) trường làm khóa chính, dùng thi hành tính toàn vẹn; (2) trường không khóa lưu tập giá trị mà trường khác yêu cầu.

### Sử dụng Bảng xác thực hỗ trợ Quy tắc nghiệp vụ

1. **Tạo bảng xác thực** với các giá trị hợp lệ.
2. **Thiết lập mối quan hệ 1:N** giữa bảng cha của trường bị ảnh hưởng và bảng xác thực. Bảng con nhận FK từ khóa chính bảng xác thực.
3. **Thay trường gốc** bằng FK trỏ đến bảng xác thực (hoặc dùng khóa chính bảng xác thực).
4. **Sửa Range of Values** — *Bất kỳ giá trị nào trong trường [tên] của bảng [xác thực].*
5. **Đặt đặc điểm mối quan hệ:** Deletion Rule = Restrict; Type of participation: bảng xác thực Mandatory, bảng cha Optional; Degree phù hợp (vd: (1,1) cho STATES, (0,N) cho SUPPLIERS).

**Ví dụ:** SUPPSTATE giới hạn 11 bang miền Tây + AK, HI → bảng STATES; trường SUPPLIERS.STATE (FK) lấy giá trị từ STATES.STATE.

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

### Đáp án

1. Phát biểu áp đặt ràng buộc lên khía cạnh cụ thể của cơ sở dữ liệu (thành tố đặc tả trường hoặc đặc điểm mối quan hệ), dựa trên cách tổ chức nhận thức và sử dụng dữ liệu.
2. **Hướng cơ sở dữ liệu** và **hướng ứng dụng**.
3. **Không.** Quy tắc hướng ứng dụng thiết lập trong thiết kế vật lý hoặc ứng dụng.
4. **Trường cụ thể** và **mối quan hệ cụ thể**.
5. Ràng buộc các thành tố của đặc tả trường cho một trường cụ thể.
6. Khi chèn, xóa hoặc cập nhật bản ghi hoặc giá trị trường.
7. Điền Tờ Đặc tả Quy tắc nghiệp vụ cho mỗi quy tắc.
8. Bất kỳ hai trong số: ghi mọi quy tắc; định dạng chuẩn; dễ theo dõi và xử lý sự cố.
9. Ghi các sửa đổi đã thực hiện—ngày, người; quan trọng cho xử lý sự cố.
10. Lưu tập giá trị hợp lệ để thi hành ràng buộc phạm vi giá trị.
11. Hai trường—khóa chính và trường không khóa lưu giá trị.
12. Khi quy tắc giới hạn phạm vi giá trị của trường với tập cố định, dùng bảng xác thực để thi hành.
13. Đảm bảo quy tắc được thiết lập đúng và mọi vùng được đánh dấu; sửa lỗi.
