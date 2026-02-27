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

**Đây là loại mối quan hệ phổ biến thứ hai.** Mối quan hệ nhiều-nhiều có đặc tính vốn có mà bạn phải xử lý trước khi có thể sử dụng hiệu quả dữ liệu từ các bảng tham gia. Vấn đề là: Làm sao bạn dễ dàng liên kết bản ghi từ bảng đầu với bản ghi trong bảng thứ hai để thiết lập mối quan hệ?

**Nếu không thiết lập đúng, bạn sẽ gặp các vấn đề:**
- Truy xuất thông tin từ một trong các bảng sẽ tẻ nhạt và khó khăn
- Một trong các bảng sẽ chứa lượng lớn dữ liệu dư thừa
- Dữ liệu trùng lặp sẽ tồn tại trong cả hai bảng
- Chèn, cập nhật và xóa dữ liệu sẽ khó khăn

**Hai phương pháp sai lầm phổ biến:**
1. Lấy trường từ một bảng và đưa nó nhiều lần vào bảng kia (vd: nhiều STUDENT ID trong CLASSES) — điều này tạo trường đa trị "phẳng."
2. Lấy một hoặc nhiều trường từ một bảng và đưa một phiên bản mỗi trường vào bảng kia — gây duplicate fields, redundant data, khó insert/delete.

**Giải pháp đúng:** Sử dụng **bảng liên kết (linking table)**.

### Mối quan hệ Tự tham chiếu (Self-Referencing)

Mối quan hệ tự tham chiếu **không tồn tại giữa một cặp bảng**—nó là mối quan hệ tồn tại giữa các bản ghi **trong cùng một bảng**. Có thể là một-một, một-nhiều hoặc nhiều-nhiều.

- **Một-một:** Một bản ghi có thể liên quan chỉ đến một bản ghi khác trong bảng (vd: MEMBERS với SPONSOR ID)
- **Một-nhiều:** Một bản ghi có thể liên quan đến một hoặc nhiều bản ghi khác (vd: CUSTOMERS với REFERRED BY)
- **Nhiều-nhiều:** Một bản ghi có thể liên quan đến nhiều bản ghi khác và ngược lại (vd: PARTS — part gồm các part và cũng là component của part khác)

---

## Xác định Mối quan hệ hiện có

Bắt đầu bằng việc tạo **ma trận** gồm tất cả các bảng trong cơ sở dữ liệu. Liệt kê các bảng dọc trên đỉnh ma trận, sau đó lại xuống phía bên trái ma trận; đảm bảo tên bảng theo cùng thứ tự.

Chọn một bảng bên trái làm điểm bắt đầu và xác định xem nó có mối quan hệ với bất kỳ bảng nào được liệt kê dọc trên không. Chỉ tìm **mối quan hệ trực tiếp**—phải có kết nối cụ thể giữa các bảng tham gia.

**Hai loại câu hỏi bạn có thể hỏi:**

1. **Liên kết (Associative):** *Một bản ghi trong (tên bảng đầu) có thể liên kết với một hoặc nhiều bản ghi trong (tên bảng thứ hai) không?*  
   Với tự tham chiếu: *Một (dạng số ít của tên bảng) có thể liên kết với một hoặc nhiều (dạng số nhiều) khác không?*

2. **Ngữ cảnh (Contextual):**
   - **Sở hữu:** own, has, is part of, contain — *Một đơn hàng có thể chứa một hoặc nhiều sản phẩm không?*
   - **Hành động:** make, visit, place, teach, attend — *Một giảng viên dạy một hoặc nhiều loại lớp không?*

**Ký hiệu trong ma trận:** 1:1, 1:N, M:N

**Công thức xác định mối quan hệ chính thức giữa cặp bảng:**
- 1:1 + 1:1 = 1:1
- 1:N + 1:1 = 1:N
- 1:N + 1:N = M:N

**Quy trình:**
1. Chọn cặp bảng và ghi lại mục tại điểm nối
2. Đối chiếu mục từ góc độ bảng kia
3. Áp dụng công thức phù hợp
4. Sơ đồ hóa mối quan hệ
5. Gạch bỏ cả hai mục trên ma trận

---

## Thiết lập Mỗi mối quan hệ

### Mối quan hệ Một-một và Một-nhiều

Bạn dùng **khóa chính (primary key)** và **khóa ngoại (foreign key)** để thiết lập kết nối.

**Một-một:** Lấy bản sao khóa chính của bảng cha và đưa vào cấu trúc bảng con, nơi nó trở thành khóa ngoại. Trong hầu hết mối quan hệ một-một, khóa ngoại cũng đóng vai trò khóa chính của bảng con. (Ngoại lệ: bảng tập con đã có PK chung với bảng cha.)

**Một-nhiều:** Lấy bản sao khóa chính từ bảng phía "một" và đưa vào cấu trúc bảng phía "nhiều," nơi nó trở thành khóa ngoại.

**Sơ đồ:** Điểm bắt đầu là khóa chính; điểm kết thúc là khóa ngoại. Chân quạ ở phía "nhiều."

### Mối quan hệ Nhiều-nhiều — Bảng liên kết

**Quy trình ba bước:**
1. **Định nghĩa** bảng liên kết bằng cách lấy bản sao khóa chính từ mỗi bảng trong mối quan hệ và dùng các khóa đó để tạo cấu trúc bảng. Các trường này phục vụ hai mục đích: cùng nhau tạo thành khóa chính composite của bảng, và mỗi trường là khóa ngoại duy nhất thiết lập mối quan hệ giữa bảng cha của nó và bảng liên kết.
2. **Đặt tên** bảng liên kết thể hiện bản chất mối quan hệ (vd: PILOT CERTIFICATIONS, STUDENT CLASSES).
3. **Thêm** vào danh sách bảng cuối cùng với mục nhập đúng cho "Table Type" và "Table Description."

**Kết quả:** Mối quan hệ nhiều-nhiều ban đầu được phân giải thành **hai mối quan hệ một-nhiều**.

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
