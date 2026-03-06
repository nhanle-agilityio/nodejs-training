# Chương 10: Mối quan hệ bảng

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Không có gì thay thế được sự thoải mái do mối quan hệ hoàn toàn được thừa nhận hiển nhiên mang lại."*  
—IRIS MURDOCH

---

## Các chủ đề trong chương này

- Tại sao Mối quan hệ quan trọng
- Các loại Mối quan hệ
- Xác định Mối quan hệ hiện có
- Thiết lập Mỗi mối quan hệ
- Tinh chỉnh Mọi Khóa ngoại
- Thiết lập Đặc điểm Mối quan hệ
- Tính toàn vẹn cấp Mối quan hệ
- Ví dụ: Xác định và Thiết lập Mối quan hệ
- Tóm tắt
- Câu hỏi ôn tập

---

## Tại sao Mối quan hệ quan trọng

Trong Chương 3, "Thuật ngữ," bạn đã học rằng một mối quan hệ tồn tại giữa hai bảng khi bạn có thể, theo một cách nào đó, liên kết các bản ghi của bảng đầu tiên với các bản ghi của bảng thứ hai. Bạn cũng đã học rằng mỗi mối quan hệ có ba đặc điểm riêng biệt: loại mối quan hệ tồn tại giữa các bảng, cách thức mỗi bảng tham gia, và mức độ mỗi bảng tham gia.

Trong chương này, tôi sẽ thảo luận các chủ đề này chi tiết hơn. Bạn sẽ học cách xác định và thiết lập các mối quan hệ giữa các bảng trong cơ sở dữ liệu, sau đó cách thiết lập đặc điểm của mỗi mối quan hệ. Bạn cũng sẽ học cách sơ đồ hóa các bảng và mối quan hệ, điều cho phép bạn tạo biểu diễn đồ họa của toàn bộ cấu trúc cơ sở dữ liệu.

**Mối quan hệ là thành phần quan trọng của cơ sở dữ liệu quan hệ.** Mối quan hệ thiết lập kết nối giữa một cặp bảng có liên quan logic với nhau. Một cặp bảng có liên quan logic thông qua dữ liệu mà mỗi bảng chứa. Ví dụ, hãy xem xét các bảng trong Hình 10.1.

*[Hình 10.1 Một cặp bảng có liên quan logic.]*

Mối quan hệ logic tồn tại giữa dữ liệu trong bảng STUDENTS và dữ liệu trong bảng STUDENT INSTRUMENTS. Một sinh viên có thể mượn một hoặc nhiều nhạc cụ trong năm học, nên một bản ghi trong bảng STUDENTS (đại diện sinh viên) có thể liên quan đến một hoặc nhiều bản ghi trong bảng STUDENT INSTRUMENTS (đại diện các nhạc cụ cụ thể mà sinh viên mượn).

**Mối quan hệ giúp tinh chỉnh thêm cấu trúc bảng và tối thiểu hóa dữ liệu dư thừa.** Khi bạn thiết lập mối quan hệ giữa một cặp bảng, bạn sẽ không thể tránh khỏi thực hiện các sửa đổi nhỏ cho cấu trúc bảng. Các tinh chỉnh này sẽ làm cho cấu trúc hiệu quả hơn và tối thiểu hóa bất kỳ dữ liệu dư thừa nào mà các bảng có thể chứa.

**Mối quan hệ là cơ chế cho phép bạn rút dữ liệu từ nhiều bảng đồng thời.** Trong Chương 12, "Views," bạn sẽ học cách mối quan hệ cho phép bạn xây dựng view bằng cách sử dụng các trường từ hai hoặc nhiều bảng liên quan.

**Mối quan hệ được định nghĩa đúng đảm bảo tính toàn vẹn cấp mối quan hệ,** đảm bảo rằng bản thân mối quan hệ đáng tin cậy và vững chắc. (Nhớ rằng tính toàn vẹn cấp mối quan hệ là thành phần của tính toàn vẹn dữ liệu tổng thể.) Bạn chỉ có thể tận dụng nhiều lợi ích mà cơ sở dữ liệu quan hệ cung cấp khi bạn thiết lập mỗi mối quan hệ một cách cẩn thận và đúng đắn. Không làm như vậy nghĩa là bạn sẽ gặp khó khăn và tẻ nhạt khi làm việc với dữ liệu từ nhiều bảng, và chắc chắn bạn sẽ gặp vấn đề khi cố gắng chèn, cập nhật hoặc xóa bản ghi trong các bảng liên quan. Bạn sẽ học thêm về các loại vấn đề này khi quy trình thiết kế triển khai.

---

## Các loại Mối quan hệ

Trước khi bắt đầu thiết lập mối quan hệ giữa các bảng trong cơ sở dữ liệu, bạn phải biết những loại mối quan hệ nào có thể tồn tại giữa một cặp bảng cho trước. Biết cách xác định chúng đúng đắn là kỹ năng vô giá để thiết kế cơ sở dữ liệu thành công.

Ba loại mối quan hệ cụ thể có thể tồn tại giữa một cặp bảng: **một-một (one-to-one)**, **một-nhiều (one-to-many)** và **nhiều-nhiều (many-to-many)**. Các bảng chỉ tham gia một loại mối quan hệ tại bất kỳ thời điểm nào. (Nếu bạn đã định nghĩa Tuyên bố Sứ mệnh và Mục tiêu Sứ mệnh càng chính xác càng tốt, bạn sẽ hiếm khi cần thay đổi loại mối quan hệ giữa một cặp bảng. Chỉ những thay đổi lớn trong cấu trúc của bất kỳ bảng nào mới có thể khiến bạn thay đổi mối quan hệ.)

*Lưu ý: Phần thảo luận cho mỗi loại mối quan hệ bắt đầu bằng ví dụ chung về mối quan hệ. Học cách hình dung mối quan hệ một cách chung chung cho phép bạn hiểu nguyên lý đằng sau bản thân mối quan hệ. Sau khi bạn hiểu mối quan hệ hoạt động như thế nào và tại sao, bạn sẽ có thể xác định khá dễ dàng liệu nó có tồn tại giữa một cặp bảng cho trước hay không. Mỗi phần thảo luận cũng bao gồm ví dụ về cách sơ đồ hóa mối quan hệ.*

Hình 10.2 cho thấy các ký hiệu đầu tiên bạn sẽ dùng để sơ đồ hóa mối quan hệ bảng.

*[Hình 10.2 Ký hiệu sơ đồ cho bảng dữ liệu và bảng tập con.]*

### Mối quan hệ Một-một (One-to-One)

Một cặp bảng có quan hệ một-một khi một bản ghi duy nhất trong bảng đầu tiên chỉ liên quan đến một bản ghi trong bảng thứ hai, và một bản ghi duy nhất trong bảng thứ hai chỉ liên quan đến một bản ghi trong bảng đầu tiên. Hình 10.3 cho thấy ví dụ chung về mối quan hệ một-một.

*[Hình 10.3 Ví dụ chung về mối quan hệ một-một.]*

Như bạn thấy, một bản ghi duy nhất trong TABLE A chỉ liên quan đến một bản ghi trong TABLE B, và một bản ghi duy nhất trong TABLE B chỉ liên quan đến một bản ghi trong TABLE A. Mối quan hệ một-một thường (nhưng không phải luôn) liên quan đến bảng tập con. Hình 10.4 cho thấy ví dụ về mối quan hệ một-một điển hình mà bạn có thể tìm thấy trong cơ sở dữ liệu cho phòng nhân sự của tổ chức. Ví dụ này cũng minh họa tình huống mà không có bảng nào là bảng tập con.

*[Hình 10.4 Ví dụ điển hình về mối quan hệ một-một.]*

Mặc dù các trường trong các bảng này có thể được kết hợp thành một bảng duy nhất, nhà thiết kế cơ sở dữ liệu đã chọn đặt các trường mà bất kỳ ai trong tổ chức có thể xem trong bảng EMPLOYEES và các trường mà chỉ nhân sự được ủy quyền mới xem trong bảng COMPENSATION. Chỉ cần một bản ghi để lưu dữ liệu bồi thường cho nhân viên cho trước, nên tồn tại mối quan hệ một-một rõ ràng giữa một bản ghi trong bảng EMPLOYEES và một bản ghi trong bảng COMPENSATION.

Hình 10.5 cho thấy ví dụ chung về cách bạn tạo sơ đồ mối quan hệ cho mối quan hệ một-một.

*[Hình 10.5 Sơ đồ hóa mối quan hệ một-một.]*

### Mối quan hệ Một-nhiều (One-to-Many)

Mối quan hệ một-nhiều tồn tại giữa một cặp bảng khi một bản ghi duy nhất trong bảng đầu tiên có thể liên quan đến một hoặc nhiều bản ghi trong bảng thứ hai, nhưng một bản ghi duy nhất trong bảng thứ hai chỉ có thể liên quan đến một bản ghi trong bảng đầu tiên.

Giả sử bạn làm việc với hai bảng TABLE A và TABLE B có mối quan hệ một-nhiều giữa chúng. Do mối quan hệ, một bản ghi duy nhất trong TABLE A có thể liên quan đến một hoặc nhiều bản ghi trong TABLE B. Hình 10.7 và 10.8 minh họa. Ngược lại, một bản ghi duy nhất trong TABLE B chỉ có thể liên quan đến một bản ghi trong TABLE A.

**Đây là loại mối quan hệ phổ biến nhất** tồn tại giữa một cặp bảng trong cơ sở dữ liệu, và dễ xác định nhất. Nó quan trọng từ quan điểm tính toàn vẹn dữ liệu vì giúp loại bỏ dữ liệu trùng lặp và giữ dữ liệu dư thừa ở mức tối thiểu tuyệt đối.

Hình 10.9 cho thấy ví dụ phổ biến về mối quan hệ một-nhiều trong cơ sở dữ liệu của cửa hàng cho thuê thiết bị. Khách hàng có thể thuê bất kỳ số lượng mặt hàng nào, nên một bản ghi trong bảng CUSTOMERS có thể liên quan đến một hoặc nhiều bản ghi trong bảng CUSTOMER RENTALS. Tuy nhiên, một mặt hàng duy nhất chỉ liên kết với một khách hàng tại bất kỳ thời điểm nào, nên một bản ghi trong bảng CUSTOMER RENTALS chỉ liên quan đến một bản ghi trong bảng CUSTOMERS.

Hình 10.10 cho thấy cách sơ đồ hóa mối quan hệ một-nhiều. Lưu ý rằng ký hiệu chân quạ luôn nằm cạnh bảng ở phía "nhiều" của mối quan hệ.

### Mối quan hệ Nhiều-nhiều (Many-to-Many)

Một cặp bảng có quan hệ nhiều-nhiều khi một bản ghi duy nhất trong bảng đầu tiên có thể liên quan đến một hoặc nhiều bản ghi trong bảng thứ hai và một bản ghi duy nhất trong bảng thứ hai có thể liên quan đến một hoặc nhiều bản ghi trong bảng đầu tiên.

Giả sử bạn làm việc với TABLE A và TABLE B có mối quan hệ nhiều-nhiều. Do mối quan hệ, một bản ghi trong TABLE A có thể liên quan đến một hoặc nhiều bản ghi (nhưng không nhất thiết tất cả) trong TABLE B. Ngược lại, một bản ghi trong TABLE B có thể liên quan đến một hoặc nhiều bản ghi trong TABLE A. Hình 10.12 minh họa mối quan hệ từ góc độ mỗi bảng.

*[Hình 10.12 Mối quan hệ nhiều-nhiều từ góc độ cả hai TABLE A và TABLE B.]*

**Đây là loại mối quan hệ phổ biến thứ hai** trong cơ sở dữ liệu. Nó có thể khó xác định hơn mối quan hệ một-nhiều một chút, nên bạn phải rà soát các bảng cẩn thận. Hình 10.13 cho thấy ví dụ điển hình về mối quan hệ nhiều-nhiều trong cơ sở dữ liệu trường học—một ví dụ kinh điển của loại mối quan hệ này.

*[Hình 10.13 Ví dụ điển hình về mối quan hệ nhiều-nhiều.]*

Một sinh viên có thể theo học một hoặc nhiều lớp trong năm học, nên một bản ghi trong bảng STUDENTS có thể liên quan đến một hoặc nhiều bản ghi trong bảng CLASSES. Ngược lại, một hoặc nhiều sinh viên sẽ theo học một lớp cho trước, nên một bản ghi trong bảng CLASSES có thể liên quan đến một hoặc nhiều bản ghi trong bảng STUDENTS. Hình 10.14 và 10.15 minh họa cách sơ đồ hóa mối quan hệ này.

*[Hình 10.14 Sơ đồ hóa mối quan hệ nhiều-nhiều.]*
*[Hình 10.15 Sơ đồ mối quan hệ cho STUDENTS và CLASSES.]*

#### Vấn đề với Mối quan hệ Nhiều-nhiều

Mối quan hệ nhiều-nhiều có đặc tính vốn có mà bạn phải xử lý trước khi có thể sử dụng hiệu quả dữ liệu từ các bảng tham gia. Vấn đề là: Làm sao bạn dễ dàng liên kết bản ghi từ bảng đầu với bản ghi trong bảng thứ hai để thiết lập mối quan hệ? Câu hỏi này quan trọng vì bạn sẽ gặp các vấn đề sau nếu không thiết lập đúng:

- Truy xuất thông tin từ một trong các bảng sẽ tẻ nhạt và khó khăn
- Một trong các bảng sẽ chứa lượng lớn dữ liệu dư thừa
- Dữ liệu trùng lặp sẽ tồn tại trong cả hai bảng
- Chèn, cập nhật và xóa dữ liệu sẽ khó khăn

Các nhà phát triển thiếu kinh nghiệm thường dùng hai phương pháp phổ biến trong nỗ lực vô ích xử lý tình huống này. Hình 10.16 cho thấy cấu trúc bảng STUDENTS và CLASSES dùng làm ví dụ.

*[Hình 10.16 Cấu trúc bảng STUDENTS và CLASSES.]*

*Lưu ý: Không có kết nối thực tế giữa hai bảng, nên bạn không có cách liên kết bản ghi trong bảng này với bản ghi trong bảng kia.*

**Phương pháp sai thứ nhất:** Lấy trường từ một bảng và đưa nó nhiều lần vào bảng kia. Ví dụ, bạn có thể lấy trường STUDENT ID từ bảng STUDENTS và đưa vào cấu trúc bảng CLASSES, tạo nhiều bản sao trường theo số sinh viên tối đa có thể theo học bất kỳ lớp nào. Hình 10.17 cho thấy phiên bản sửa của cấu trúc bảng CLASSES.

*[Hình 10.17 Đưa các trường STUDENT ID vào cấu trúc bảng CLASSES.]*

Cấu trúc này có thể gây vấn đề, nên bạn có thể thử làm ngược lại—lấy trường CLASS ID từ bảng CLASSES và đưa vào cấu trúc bảng STUDENTS. Hình 10.18 cho thấy phiên bản sửa của cấu trúc bảng STUDENTS.

*[Hình 10.18 Đưa các trường CLASS ID vào cấu trúc bảng STUDENTS.]*

Các cấu trúc này có quen không? Bằng phương pháp này, điều bạn làm chỉ là đưa trường đa trị "phẳng" vào cấu trúc bảng—và cùng với đó là các vấn đề liên quan đến trường đa trị. (Xem lại Chương 7 nếu cần.) Đây không phải cách đúng để thiết lập mối quan hệ.

**Phương pháp sai thứ hai:** Biến thể đơn giản của phương pháp thứ nhất. Bạn lấy một hoặc nhiều trường từ một bảng và đưa một phiên bản mỗi trường vào bảng kia. Ví dụ, bạn có thể lấy CLASS ID, CLASS NAME và INSTRUCTOR ID từ CLASSES và đưa vào STUDENTS để xác định các lớp sinh viên đang theo học. Điều này có vẻ cải thiện hơn phương pháp thứ nhất, nhưng sẽ nảy sinh vấn đề khi bạn tải bảng STUDENTS sửa đổi với dữ liệu mẫu. Hình 10.19 minh họa rõ các vấn đề.

*[Hình 10.19 Bảng STUDENTS đã sửa với dữ liệu mẫu.]*

Các vấn đề: (1) Bảng chứa các trường trùng không cần thiết—CLASS NAME và INSTRUCTOR ID không phù hợp trong STUDENTS vì CLASS ID đã xác định lớp đủ; (2) Lượng lớn dữ liệu dư thừa; (3) Chèn bản ghi mới khó—nếu nhập bản ghi cho lớp mới trong STUDENTS mà không có dữ liệu sinh viên, các trường liên quan sinh viên sẽ null, kể cả khóa chính—vi phạm Elements of a Primary Key; (4) Xóa bản ghi khó—ví dụ xóa bản ghi Diana Price sẽ mất dữ liệu lớp "Introduction to Database Design" nếu chưa ai nhập vào bảng CLASSES.

May mắn là bạn sẽ không phải lo các vấn đề này vì bạn sẽ học cách đúng để thiết lập mối quan hệ nhiều-nhiều.

**Giải pháp đúng:** Sử dụng **bảng liên kết (linking table)**.

### Mối quan hệ Tự tham chiếu (Self-Referencing)

Mối quan hệ tự tham chiếu **không tồn tại giữa một cặp bảng**—nó là mối quan hệ tồn tại giữa các bản ghi **trong cùng một bảng**. Có thể là một-một, một-nhiều hoặc nhiều-nhiều.

- **Một-một:** Một bản ghi có thể liên quan chỉ đến một bản ghi khác trong bảng (vd: MEMBERS với SPONSOR ID)
- **Một-nhiều:** Một bản ghi có thể liên quan đến một hoặc nhiều bản ghi khác (vd: CUSTOMERS với REFERRED BY)
- **Nhiều-nhiều:** Một bản ghi có thể liên quan đến nhiều bản ghi khác và ngược lại (vd: PARTS — part gồm các part và cũng là component của part khác)

---

## Xác định Mối quan hệ hiện có

Khi soạn mô tả bảng trước đó trong quy trình thiết kế (Chương 7), bạn đã tập hợp nhóm đại diện người dùng và quản lý để hỗ trợ nhiệm vụ đó. Giờ bạn sắp xếp các cuộc họp với nhóm này một lần nữa để họ giúp xác định các mối quan hệ bảng hiện có. Họ có thể cung cấp thông tin giá trị vì có khả năng có góc nhìn tốt về cách các chủ đề (hoặc bảng) khác nhau liên quan với nhau. Mặc dù nhận thức của họ có thể không luôn đầy đủ hoặc chính xác, đóng góp của họ vẫn hữu ích trong việc xác định hầu hết các mối quan hệ.

Bắt đầu quy trình xác định mối quan hệ bằng việc tạo **ma trận** gồm tất cả các bảng trong cơ sở dữ liệu. (Bạn có thể làm trên giấy, bảng trắng hoặc chương trình bảng tính.) Ví dụ, giả sử bạn làm việc với các bảng: BUILDINGS, FACULTY, CLASSES, ROOMS, COMPENSATION, STAFF, STUDENTS. Liệt kê các bảng dọc trên đỉnh ma trận, sau đó lại xuống phía bên trái ma trận; đảm bảo tên bảng theo cùng thứ tự. Hình 10.26 minh họa cách ma trận xuất hiện.

*[Hình 10.26 Thiết lập ma trận bảng để giúp xác định mối quan hệ hiện có.]*

Chọn một bảng bên trái làm điểm bắt đầu và xác định xem nó có mối quan hệ với bất kỳ bảng nào được liệt kê dọc trên không. Chỉ tìm **mối quan hệ trực tiếp**—phải có kết nối cụ thể giữa các bảng tham gia. Ví dụ, bảng CLASSES có mối quan hệ trực tiếp với bảng STUDENTS vì một hoặc nhiều sinh viên có thể theo học một lớp cho trước. Ngược lại, CLASSES có mối quan hệ gián tiếp với STAFF qua FACULTY—giảng viên dạy lớp chứ không phải nhân viên hành chính. (Bạn chưa cần lo mối quan hệ gián tiếp.)

Khi làm việc với một cặp bảng, hãy đặt câu hỏi cho người tham gia về các bản ghi trong mỗi bảng. Mục tiêu là xác định mối quan hệ giữa một bản ghi trong bảng này với một hoặc nhiều bản ghi trong bảng kia, và ngược lại. Khi bạn đến điểm xem xét cùng bảng ở cả hai phía ma trận, hãy cố xác định mối quan hệ giữa một bản ghi cho trước trong bảng với một hoặc nhiều bản ghi khác trong chính bảng đó.

**Hai loại câu hỏi bạn có thể hỏi:**

1. **Liên kết (Associative):** *Một bản ghi trong (tên bảng đầu) có thể liên kết với một hoặc nhiều bản ghi trong (tên bảng thứ hai) không?* Ví dụ với ma trận trên: *Một bản ghi trong CLASSES có thể liên kết với một hoặc nhiều bản ghi trong BUILDINGS không?*  
   Với tự tham chiếu, sửa đổi câu hỏi: *Một (dạng số ít của tên bảng) có thể liên kết với một hoặc nhiều (dạng số nhiều) khác không?* Ví dụ: *Một nhân viên có thể liên kết với một hoặc nhiều nhân viên khác không?*

2. **Ngữ cảnh (Contextual):** Đối chiếu một thể hiện chủ đề của bảng đầu với nhiều thể hiện chủ đề của bảng thứ hai. Hai thể loại:
   - **Sở hữu:** own, has, is part of, contain — *Một đơn hàng có thể chứa một hoặc nhiều sản phẩm không?* Tự tham chiếu: *Một chi tiết có thể chứa một hoặc nhiều chi tiết khác không?*
   - **Hành động:** make, visit, place, teach, attend — *Một giảng viên dạy một hoặc nhiều loại lớp không?* Tự tham chiếu: *Một nhân viên có quản lý một hoặc nhiều nhân viên khác không?*

**Ví dụ:** Giả sử bạn bắt đầu với bảng CLASSES và hỏi: *Một lớp có được tổ chức trong một hay nhiều tòa nhà?* Câu trả lời tiết lộ loại mối quan hệ từ góc độ CLASSES. Nếu trả lời "Một lớp chỉ được tổ chức trong một tòa nhà" → 1:1. Nếu "Một lớp có thể được tổ chức trong nhiều tòa nhà" → 1:N. Ghi ký hiệu vào ô tại giao điểm hàng CLASSES và cột BUILDINGS. Hình 10.27 cho thấy ma trận sau khi hoàn thành các mục cho CLASSES.

*[Hình 10.27 Các mục ma trận đã hoàn thành cho bảng CLASSES.]*

Lặp lại cho mỗi bảng bên trái. Khi xem xét BUILDINGS và CLASSES từ góc độ BUILDINGS, hỏi: *Một tòa nhà có cung cấp không gian cho nhiều hơn một lớp không?* Nếu "có" → 1:N. Hình 10.28 cho thấy ma trận với các mục cho BUILDINGS.

*[Hình 10.28 Các mục ma trận đã hoàn thành cho bảng BUILDINGS.]*

**Tự tham chiếu:** Với bảng STAFF tại giao điểm STAFF–STAFF, hỏi: *Một nhân viên có thể liên kết với một hoặc nhiều nhân viên khác không?* Trả lời "Một nhân viên có thể là vợ/chồng của nhân viên khác" → tự tham chiếu 1:1. Trả lời "Một nhân viên có thể quản lý nhiều nhân viên khác" → tự tham chiếu 1:N. Đối với M:N tự tham chiếu, hỏi: *Một nhân viên có thể liên kết với một hoặc nhiều nhân viên khác, và bất kỳ người trong số đó có thể liên kết với một hoặc nhiều nhân viên khác nữa không?* Trả lời như "Có, một nhân viên có thể quản lý nhiều người, và bất kỳ người nào trong số họ có thể giám sát một hoặc nhiều người khác" → tự tham chiếu M:N.

**Ký hiệu trong ma trận:** 1:1, 1:N, M:N

**Công thức xác định mối quan hệ chính thức giữa cặp bảng:**
- 1:1 + 1:1 = 1:1
- 1:N + 1:1 = 1:N
- 1:N + 1:N = M:N

**Quy trình năm bước:**
1. Chọn cặp bảng và ghi lại mục tại giao điểm giữa bảng đầu và bảng thứ hai
2. Tìm bảng thứ hai trên cùng phía ma trận và ghi mục tại giao điểm giữa nó và bảng đầu ở phía đối diện
3. Áp dụng công thức phù hợp để xác định mối quan hệ chính thức
4. Sơ đồ hóa mối quan hệ
5. Gạch bỏ cả hai mục trên ma trận

**Ví dụ:** BUILDINGS và CLASSES—mục BUILDINGS–CLASSES là 1:N, mục CLASSES–BUILDINGS là 1:1 → 1:N + 1:1 = 1:N. Sơ đồ từ góc độ BUILDINGS (phía "một"); đặt phía "một" bên trái, phía "nhiều" bên phải. Hình 10.29 và 10.30 minh họa. Đối với tự tham chiếu (vd: STAFF), chỉ cần sơ đồ và gạch mục. Hình 10.31 minh họa.

*[Hình 10.29 Xác định mối quan hệ chính thức giữa BUILDINGS và CLASSES.]*
*[Hình 10.30 Hiển thị cấu trúc mỗi bảng trong sơ đồ mối quan hệ.]*
*[Hình 10.31 Làm việc với mối quan hệ tự tham chiếu.]*

*Lưu ý: Đôi khi bạn thấy khó xác định chính xác mối quan hệ giữa một cặp bảng. Khi đó, hãy tải các bảng với dữ liệu mẫu—điều này thường giúp tiết lộ loại mối quan hệ tồn tại.*

Tiếp tục quy trình cho đến khi loại bỏ tất cả mục trên ma trận. Sau khi hoàn thành việc xác định mối quan hệ chính thức giữa các bảng, bạn có thể tiến hành thiết lập từng mối quan hệ theo cách phù hợp.

---

## Thiết lập Mỗi mối quan hệ

Quá trình này liên quan đến việc định nghĩa kết nối logic tường minh giữa một cặp bảng liên quan. Loại mối quan hệ tồn tại giữa các bảng quyết định cách bạn định nghĩa kết nối.

### Mối quan hệ Một-một và Một-nhiều

Bạn dùng **khóa chính (primary key)** và **khóa ngoại (foreign key)** để thiết lập kết nối. (Thuật ngữ "foreign key" xuất phát từ việc bảng con đã có khóa chính riêng, và khóa chính bạn đưa từ bảng cha là "ngoại" với bảng con.)

#### Mối quan hệ Một-một

Trong loại mối quan hệ này, một bảng đóng vai **bảng cha (parent table)** và bảng kia đóng vai **bảng con (child table)**. Bản ghi phải tồn tại trong bảng cha trước khi bạn có thể nhập bản ghi liên quan trong bảng con. Vai trò bạn gán thường phụ thuộc vào chủ đề các bảng đại diện. Trong Hình 10.32, bạn gán vai cha cho STAFF và vai con cho COMPENSATION—có bản ghi COMPENSATION không liên quan STAFF là hoàn toàn vô lý. Khi một bảng là **bảng tập con (subset table)** như FACULTY của STAFF, cả hai chia sẻ cùng khóa chính nên không cần thêm bước. Hình 10.33–10.35 minh họa các trường hợp.

*[Hình 10.32 Bạn chọn bảng nào làm bảng cha?]*
*[Hình 10.33 Thiết lập mối quan hệ một-một giữa STAFF và FACULTY.]*
*[Hình 10.34 Mối quan hệ một-một với bảng tập con ở vai cha.]*
*[Hình 10.35 Thiết lập mối quan hệ giữa MANAGERS và DEPARTMENTS.]*

**Cách thiết lập:** Lấy bản sao khóa chính của bảng cha và đưa vào cấu trúc bảng con, nơi nó trở thành khóa ngoại. Trong hầu hết mối quan hệ một-một, khóa ngoại cũng đóng vai trò khóa chính của bảng con.

*Lưu ý: Nhiều nhà thiết kế dùng MANAGER ID làm tên FK trong DEPARTMENTS. Tác giả chọn EMPLOYEE ID vì MANAGERS là subset của EMPLOYEES nên chia sẻ cùng PK, giữ trường tuân thủ Elements of a Foreign Key, và loại bỏ nhầm lẫn. Quan trọng là dùng nhất quán.*

#### Mối quan hệ Một-nhiều

Kỹ thuật tương tự: Lấy bản sao khóa chính từ bảng phía "một" và đưa vào cấu trúc bảng phía "nhiều," nơi nó trở thành khóa ngoại. Hình 10.36 và 10.37 minh họa BUILDINGS–ROOMS—một tòa nhà chứa một hoặc nhiều phòng, nhưng một phòng chỉ nằm trong một tòa nhà.

*[Hình 10.36 Mối quan hệ một-nhiều giữa BUILDINGS và ROOMS.]*
*[Hình 10.37 Thiết lập mối quan hệ một-nhiều giữa BUILDINGS và ROOMS.]*

#### Giải quyết Trường đa trị—Xem lại

Giữa tập giá trị trong trường đa trị và bản ghi chứa chúng tồn tại **mối quan hệ một-nhiều vốn có**. Khi giải quyết đúng trường đa trị (vd: CATEGORIES TAUGHT trong INSTRUCTORS), bảng mới INSTRUCTOR CATEGORIES kế thừa mối quan hệ—bạn thiết lập như bất kỳ mối quan hệ một-nhiều nào. INSTRUCTOR ID trong INSTRUCTOR CATEGORIES vừa là FK vừa là phần khóa chính tổ hợp. Hình 10.38 và 10.39 minh họa.

*[Hình 10.38 Giải quyết ban đầu trường đa trị CATEGORIES TAUGHT.]*
*[Hình 10.39 Thiết lập mối quan hệ giữa INSTRUCTORS và INSTRUCTOR CATEGORIES.]*

**Sơ đồ từ đây:** Dùng khóa chính làm điểm bắt đầu và khóa ngoại làm điểm kết thúc của đường kết nối. Chân quạ ở phía "nhiều." Đường giữa của ký hiệu chân quạ phải trỏ trực tiếp đến khóa ngoại.

### Mối quan hệ Nhiều-nhiều — Bảng liên kết

**Quy trình ba bước:**
1. **Định nghĩa** bảng liên kết bằng cách lấy bản sao khóa chính từ mỗi bảng trong mối quan hệ và dùng các khóa đó để tạo cấu trúc bảng. Các trường này phục vụ hai mục đích: cùng nhau tạo thành khóa chính composite của bảng, và mỗi trường là khóa ngoại duy nhất thiết lập mối quan hệ giữa bảng cha của nó và bảng liên kết.
2. **Đặt tên** bảng liên kết thể hiện bản chất mối quan hệ (vd: PILOT CERTIFICATIONS, STUDENT CLASSES).
3. **Thêm** vào danh sách bảng cuối cùng với mục nhập đúng cho "Table Type" và "Table Description."

**Kết quả:** Mối quan hệ nhiều-nhiều ban đầu được phân giải—không còn mối quan hệ trực tiếp giữa STUDENTS và CLASSES. Mối quan hệ ban đầu được thay bằng **hai mối quan hệ một-nhiều**: STUDENTS ↔ STUDENT CLASSES và CLASSES ↔ STUDENT CLASSES. Bảng liên kết chứa hai khóa ngoại (STUDENT ID và CLASS ID); chúng cùng tạo thành khóa chính tổ hợp. Trừ trường hợp hiếm, bảng liên kết luôn chứa khóa chính tổ hợp. Bạn đôi khi phải thêm trường để đảm bảo giá trị PK duy nhất—ví dụ, nếu trường ghi lịch theo từng kỳ (fall, winter, spring), thêm trường TERM vào khóa tổ hợp để cho phép sinh viên học lại lớp ở kỳ khác. Bảng liên kết giúp giữ dữ liệu dư thừa ở mức tối thiểu tuyệt đối. Hình 10.40 minh họa.

*[Hình 10.40 Thiết lập mối quan hệ nhiều-nhiều giữa STUDENTS và CLASSES.]*

*Lưu ý: Bạn có thể dùng STUDENT SCHEDULES hoặc CLASS SCHEDULES; STUDENT CLASSES là lựa chọn cá nhân. Tên nên có ý nghĩa với bạn hoặc tổ chức.*

**Thêm trường vào bảng liên kết:** Khi có trường như QUOTE PRICE, QUANTITY ORDERED liên quan đến tổ hợp (đơn hàng + sản phẩm) chứ không phải chỉ đơn hàng, chuyển chúng từ bảng cha sang bảng liên kết (vd: ORDER DETAILS). Xóa trường dư thừa khỏi bảng cha và bảng kia nếu cần.

### Mối quan hệ Tự tham chiếu

**Một-một và Một-nhiều:** Dùng PK và FK như với mối quan hệ song bảng. Khóa ngoại nằm **cùng bảng** với khóa chính mà nó tham chiếu. Tên khóa ngoại thường khác (vd: SPONSOR ID, MANAGER ID) để rõ ràng.

**Nhiều-nhiều:** Dùng **bảng liên kết** như với mối quan hệ song bảng. Các trường dùng để xây bảng liên kết đến từ **cùng bảng cha**. Ví dụ: PARTS → PART COMPONENTS với PART ID và COMPONENT ID.

*Lưu ý: Đôi khi việc truy xuất từ bảng tự tham chiếu có thể tẻ nhạt. Sự hiện diện của mối quan hệ có thể cho thấy cần cấu trúc bảng/trường mới (vd: STAFF ↔ MANAGER có thể trở thành DEPARTMENTS).*

---

## Rà soát cấu trúc mỗi bảng

Sau khi thiết lập mối quan hệ, rà soát tất cả cấu trúc bảng để đảm bảo mỗi bảng tuân thủ **Các yếu tố của Bảng lý tưởng (Elements of the Ideal Table)**.

---

## Tinh chỉnh Mọi Khóa ngoại

### Các yếu tố của Khóa ngoại (Elements of a Foreign Key)

1. **Cùng tên với khóa chính** mà nó được sao chép. (Ngoại lệ: mối quan hệ tự tham chiếu—cần tên khác vì PK và FK cùng bảng.)
2. **Dùng bản sao đặc tả trường** của khóa chính cha. Sửa đổi cho đặc tả FK:
   - **General:** Specification Type = Replica; Parent Table; Source Specification (tên PK cha); Description (mục đích FK)
   - **Logical:** Key Type = Foreign; Uniqueness = Non-unique (1:N) hoặc Unique (1:1); Values Entered By = User; Range of Values = giá trị PK hiện có; Edit Rule = Enter Now, Edits Allowed
3. **Lấy giá trị từ khóa chính** mà nó tham chiếu. Phạm vi giá trị của FK giới hạn ở các giá trị PK hiện có.

---

## Thiết lập Đặc điểm Mối quan hệ

### Quy tắc xóa (Deletion Rule)

Khi xóa bản ghi trong bảng cha, RDBMS nên làm gì với các bản ghi con liên quan?

| Quy tắc | Hành động |
|---------|-----------|
| **Deny** | Không xóa; giữ bản ghi và đánh dấu "không hoạt động" |
| **Restrict** | Không xóa nếu có bản ghi con liên quan; phải xóa con trước |
| **Cascade** | Xóa cha + tự động xóa tất cả bản ghi con liên quan |
| **Nullify** | Xóa cha; cập nhật giá trị FK trong con thành Null |
| **Set Default** | Xóa cha; cập nhật giá trị FK trong con thành giá trị mặc định |

*Mặc định: Restrict.* Ký hiệu: (D), (R), (C), (N), (S). Đặt dưới đường kết nối phía bảng cha.

### Loại tham gia (Type of Participation)

- **Mandatory:** Phải có ít nhất một bản ghi trước khi nhập vào bảng liên quan (ký hiệu: đường dọc |)
- **Optional:** Không yêu cầu (ký hiệu: hình tròn ○)

### Mức độ tham gia (Degree of Participation)

(min, max) — số tối thiểu và tối đa bản ghi liên quan. Dùng "N" cho không giới hạn. Ví dụ: (0,15), (1,1).

---

## Xác minh Mối quan hệ với Người dùng và Quản lý

Checklist:
1. Mỗi mối quan hệ đã được xác định đúng
2. Mỗi mối quan hệ đã được thiết lập đúng
3. Mỗi khóa ngoại tuân thủ Các yếu tố của Khóa ngoại
4. Quy tắc xóa phù hợp đã đặt cho mỗi mối quan hệ
5. Loại tham gia phù hợp đã xác định cho mỗi bảng / key field
6. Mức độ tham gia phù hợp đã xác định

---

## Tính toàn vẹn cấp Mối quan hệ

Một mối quan hệ đạt tính toàn vẹn cấp mối quan hệ sau khi bạn đã xác minh rằng nó được thiết lập đúng và các đặc điểm của nó được đặt phù hợp. Tính toàn vẹn cấp mối quan hệ đảm bảo:

- **Kết nối** giữa hai bảng (hoặc key fields) vững chắc — dùng PK/FK hoặc bảng liên kết
- **Chèn** bản ghi mới có ý nghĩa — loại tham gia
- **Xóa** không gây tác động xấu — quy tắc xóa
- **Giới hạn có ý nghĩa** cho số bản ghi liên quan — mức độ tham gia

---

## Ví dụ: Xác định và Thiết lập Mối quan hệ — Mike's Bikes

Các bảng: CUSTOMERS, EMPLOYEES, INVOICES, PRODUCTS, VENDORS.

**Mối quan hệ xác định:**
- CUSTOMERS ↔ INVOICES: 1:N
- EMPLOYEES ↔ INVOICES: 1:N
- VENDORS ↔ PRODUCTS: 1:N
- INVOICES ↔ PRODUCTS: M:N → bảng liên kết INVOICE PRODUCTS

**Thiết lập:** Sao chép PK cha vào con làm FK cho các 1:N. Tạo bảng liên kết INVOICE PRODUCTS với INVOICE NUMBER và PRODUCT NUMBER. Tinh chỉnh FK theo Elements. Thiết lập quy tắc xóa, loại tham gia, mức độ tham gia. Xác minh với Mike.

---

## Tóm tắt

Chương này trình bày ba loại mối quan hệ (một-một, một-nhiều, nhiều-nhiều), mối quan hệ tự tham chiếu và cách xác định chúng bằng ma trận bảng, câu hỏi associative/contextual và công thức. Bạn học cách thiết lập mỗi loại bằng PK/FK hoặc bảng liên kết, tinh chỉnh khóa ngoại theo Elements of a Foreign Key, và thiết lập đặc điểm mối quan hệ (quy tắc xóa, loại tham gia, mức độ tham gia). Tính toàn vẹn cấp mối quan hệ đạt được khi mối quan hệ được thiết lập đúng và các đặc điểm được đặt phù hợp.

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

1. (1) Thiết lập kết nối giữa các bảng có liên quan logic; (2) Tinh chỉnh cấu trúc và tối thiểu hóa dữ liệu dư thừa; (3) Cho phép rút dữ liệu từ nhiều bảng; (4) Đảm bảo tính toàn vẹn cấp mối quan hệ.
2. **Một-một**, **một-nhiều** và **nhiều-nhiều**.
3. **Nhiều-nhiều** (M:N).
4. Bất kỳ hai trong số: truy xuất tẻ nhạt; dữ liệu dư thừa lớn; dữ liệu trùng lặp; chèn/cập nhật/xóa khó khăn.
5. Mối quan hệ giữa các bản ghi **trong cùng một bảng**.
6. Tạo ma trận bảng; liệt kê bảng dọc trên và xuống trái; xác định mối quan hệ cho mỗi cặp từ mỗi góc độ.
7. **Liên kết (Associative)** và **Ngữ cảnh (Contextual)**—sở hữu và hành động.
8. **1:N**.
9. Áp dụng công thức: 1:1+1:1=1:1; 1:N+1:1=1:N; 1:N+1:N=M:N.
10. Sao chép khóa chính từ bảng phía "một" vào bảng phía "nhiều" làm khóa ngoại.
11. **Đúng.** Truy xuất từ bảng tự tham chiếu có thể tẻ nhạt.
12. Tạo bảng liên kết với các trường từ cùng bảng cha (vd: PART ID, COMPONENT ID).
13. Đảm bảo FK tuân thủ Elements of a Foreign Key: cùng tên (trừ tự tham chiếu), bản sao đặc tả, lấy giá trị từ PK cha; sửa Specification Type, Parent Table, Source Specification, Description; Key Type=Foreign; Uniqueness; Range of Values; Edit Rule.
14. **General** và **Logical**.
15. RDBMS nên làm gì với bản ghi con khi xóa bản ghi cha (Deny, Restrict, Cascade, Nullify, Set Default).
16. **Mandatory** và **Optional**.
17. Số tối thiểu và tối đa bản ghi liên quan (min, max).
18. Sau khi mối quan hệ được thiết lập đúng và các đặc điểm (quy tắc xóa, loại tham gia, mức độ) được đặt phù hợp.
