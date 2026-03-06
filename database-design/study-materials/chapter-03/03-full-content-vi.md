# Chương 3: Thuật ngữ

**Nguồn:** *Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*  
**Tác giả:** Michael J. Hernandez

---

*"Khi tôi dùng một từ," Humpty Dumpty nói với giọng khá khinh thường, "nó có nghĩa chính xác những gì tôi muốn nó có—không hơn không kém."*  
—LEWIS CARROLL, THROUGH THE LOOKING GLASS

---

## Các chủ đề trong chương này

- Tại sao thuật ngữ này quan trọng
- Thuật ngữ liên quan đến giá trị
- Thuật ngữ liên quan đến cấu trúc
- Thuật ngữ liên quan đến mối quan hệ
- Thuật ngữ liên quan đến tính toàn vẹn
- Tóm tắt
- Câu hỏi ôn tập

---

## Nội dung chương đầy đủ

Các thuật ngữ trong chương này quan trọng để bạn hiểu trước khi bắt đầu học quy trình thiết kế. Thực vậy, còn các thuật ngữ khác bạn sẽ cần học, và tôi sẽ trình bày chúng khi bạn làm việc qua quy trình. Sách cũng có bảng thuật ngữ ở cuối sách để bạn xem lại bất kỳ thuật ngữ nào bạn học ở đây hoặc trong các chương tiếp theo.

---

## Tại sao thuật ngữ này quan trọng

Thiết kế cơ sở dữ liệu quan hệ có bộ thuật ngữ riêng độc đáo, giống như bất kỳ ngành nghề, nghề nghiệp hay lĩnh vực nào khác. Đây là ba lý do tốt tại sao việc học các thuật ngữ này quan trọng đối với bạn.

1. Chúng được dùng để biểu đạt và định nghĩa các ý tưởng và khái niệm đặc biệt của mô hình cơ sở dữ liệu quan hệ. Phần lớn thuật ngữ xuất phát từ các nhánh toán học của lý thuyết tập hợp và logic vị từ bậc nhất, là nền tảng của mô hình cơ sở dữ liệu quan hệ.

2. Chúng được dùng để biểu đạt và định nghĩa chính quy trình thiết kế cơ sở dữ liệu. Quy trình thiết kế trở nên rõ ràng và dễ hiểu hơn nhiều sau khi bạn biết các thuật ngữ này.

3. Chúng được dùng bất cứ nơi nào thảo luận về cơ sở dữ liệu quan hệ hoặc RDBMS. Bạn sẽ thấy các thuật ngữ này trong tài liệu như sách hướng dẫn phần mềm trực tuyến, tài liệu khóa học giáo dục, sách phần mềm cơ sở dữ liệu thương mại và các website liên quan đến cơ sở dữ liệu.

Chương này trình bày phần lớn các thuật ngữ định nghĩa ý tưởng và khái niệm của quy trình thiết kế, bao gồm định nghĩa và thảo luận khá chi tiết cho mỗi thuật ngữ. (Tôi cung cấp chi tiết liên quan hoặc thảo luận bổ sung cần thiết cho một thuật ngữ tại điểm thuật ngữ đó được dùng rõ ràng trong kỹ thuật cụ thể của quy trình thiết kế.) Có một số thuật ngữ khác mà tôi giới thiệu và thảo luận sau trong sách vì tôi nghĩ bạn sẽ dễ hiểu chúng hơn trong ngữ cảnh ý tưởng hoặc khái niệm cụ thể mà chúng liên quan.

**Lưu ý**

Bảng thuật ngữ chứa định nghĩa ngắn gọn cho tất cả các thuật ngữ trong chương này và xuyên suốt sách.

Bốn thể loại thuật ngữ được định nghĩa trong chương này: liên quan đến giá trị, liên quan đến cấu trúc, liên quan đến mối quan hệ và liên quan đến tính toàn vẹn.

---

## Thuật ngữ liên quan đến giá trị

### Data (Dữ liệu)

Các giá trị bạn lưu trong cơ sở dữ liệu là dữ liệu. Dữ liệu mang tính tĩnh theo nghĩa nó giữ nguyên trạng thái cho đến khi bạn sửa đổi nó bằng quy trình thủ công hoặc tự động. Hình 3.1 minh họa một số dữ liệu mẫu.

**Hình 3.1** Ví dụ về dữ liệu cơ bản.

Dữ liệu này hiện không có ý nghĩa. Ví dụ, không có cách dễ dàng để bạn xác định "92883" đại diện gì. Đó là mã ZIP? Là số linh kiện? Ngay cả khi bạn biết nó đại diện số định danh khách hàng, nó có liên quan đến George Edleman không? Chỉ đơn giản là không có cách nào biết cho đến khi bạn xử lý dữ liệu.

### Information (Thông tin)

Thông tin là dữ liệu bạn xử lý theo cách làm cho nó có ý nghĩa và hữu ích với bạn khi bạn làm việc với nó hoặc xem nó. Nó mang tính động theo nghĩa nó liên tục thay đổi so với dữ liệu được lưu trong cơ sở dữ liệu, và cũng theo nghĩa bạn có thể xử lý và trình bày nó theo vô số cách. Bạn có thể hiển thị thông tin dưới dạng kết quả của câu lệnh SQL SELECT, hiển thị nó trong form trên màn hình máy tính, hoặc in ra báo cáo. Điểm cần nhớ là bạn phải xử lý dữ liệu theo cách nào đó để biến nó thành thông tin có ý nghĩa.

Hình 3.2 minh họa cách bạn có thể xử lý và chuyển đổi dữ liệu từ ví dụ trước thành thông tin có ý nghĩa. Nó đã được thao tác theo cách—trong trường hợp này như một phần của báo cáo hóa đơn bệnh nhân—để giờ đây nó có ý nghĩa với bất kỳ ai xem nó.

**Hình 3.2** Ví dụ về dữ liệu được chuyển đổi thành thông tin.

Điều rất quan trọng là bạn hiểu sự khác biệt giữa dữ liệu và thông tin. Bạn thiết kế cơ sở dữ liệu để cung cấp thông tin có ý nghĩa cho ai đó trong doanh nghiệp hoặc tổ chức. Thông tin này chỉ có sẵn nếu dữ liệu phù hợp tồn tại trong cơ sở dữ liệu và cơ sở dữ liệu được cấu trúc theo cách hỗ trợ thông tin đó. Nếu bạn từng quên sự khác biệt giữa dữ liệu và thông tin, chỉ cần nhớ tiên đề nhỏ này:

*Dữ liệu là những gì bạn lưu; thông tin là những gì bạn truy xuất.*

Khi bạn hiểu đầy đủ khái niệm đơn giản duy nhất này, logic đằng sau quy trình thiết kế cơ sở dữ liệu sẽ trở nên rõ ràng như pha lê.

**Lưu ý**

Đáng tiếc là dữ liệu và thông tin vẫn là hai thuật ngữ thường được dùng thay thế cho nhau (và do đó sai) khắp ngành cơ sở dữ liệu. Bạn sẽ gặp lỗi này trong nhiều tạp chí nghề nghiệp, sách cơ sở dữ liệu thương mại và website, và thậm chí bạn sẽ thấy các thuật ngữ bị dùng sai bởi những tác giả đáng lẽ phải biết rõ hơn.

### Null

Null là điều kiện đại diện giá trị thiếu hoặc không biết. Bạn phải hiểu ngay từ đầu rằng Null không đại diện số không hoặc chuỗi văn bản gồm một hoặc nhiều khoảng trắng. Lý do khá đơn giản.

Số không có thể có ý nghĩa rất đa dạng. Nó có thể đại diện trạng thái số dư tài khoản, số nâng hạng vé hạng nhất hiện có, hoặc mức tồn kho hiện tại của sản phẩm cụ thể.

Mặc dù chuỗi văn bản gồm một hoặc nhiều khoảng trắng đảm bảo không có ý nghĩa với hầu hết chúng ta, nó chắc chắn có ý nghĩa với ngôn ngữ truy vấn như SQL. Khoảng trắng là ký tự hợp lệ theo quan điểm của SQL, và chuỗi ký tự gồm ba khoảng trắng (' ') cũng hợp lệ như chuỗi ký tự gồm ba chữ cái ('abc'). Trong Hình 3.3, khoảng trắng đại diện thực tế là Washington, D.C. không nằm trong quận nào cả.

Chuỗi độ dài không—hai dấu nháy đơn liên tiếp không có khoảng trắng ở giữa ('')—cũng là giá trị chấp nhận được với các ngôn ngữ như SQL và có thể có ý nghĩa trong một số hoàn cảnh. Trong bảng EMPLOYEES, ví dụ, giá trị chuỗi độ dài không trong trường tên MIDDLEINITIAL có thể đại diện thực tế là nhân viên cụ thể không có chữ cái đệm trong tên.

**Lưu ý**

Do giới hạn không gian, tôi không thể luôn hiển thị tất cả các trường cho bảng mẫu cho trước. Tuy nhiên tôi sẽ hiển thị các trường liên quan nhất đến thảo luận và dùng <<other fields>> để đại diện các trường không thiết yếu cho ví dụ. Bạn sẽ thấy quy ước này trong nhiều ví dụ xuyên suốt phần còn lại của sách.

### Giá trị của Null

Null khá hữu ích khi bạn dùng nó cho mục đích nêu trên, và bảng CLIENTS trong Hình 3.3 minh họa rõ điều này. Mỗi Null trong trường CLIENT COUNTY đại diện tên quận thiếu hoặc không biết cho bản ghi mà nó xuất hiện. Để dùng Null đúng cách, bạn phải hiểu trước tại sao chúng xuất hiện.

**Hình 3.3** Ví dụ về bảng chứa các thể hiện của Null.

Giá trị thiếu thường là kết quả của lỗi con người. Ví dụ, hãy xem bản ghi của Susan Black. Nếu bạn đang nhập dữ liệu cho bà Black và bạn không hỏi bà tên quận bà sống, dữ liệu đó được coi là thiếu và được biểu diễn trong bản ghi dưới dạng Null. Sau khi bạn nhận ra lỗi, tuy nhiên, bạn có thể sửa bằng cách gọi cho bà Black và hỏi tên quận.

Giá trị không biết xuất hiện trong bảng vì nhiều lý do. Một lý do có thể là giá trị cụ thể bạn cần cho trường chưa được định nghĩa. Chẳng hạn, bạn có thể có bảng CATEGORIES trong cơ sở dữ liệu Lịch học không hiện chứa danh mục cho bộ lớp mới mà bạn muốn mở từ học kỳ mùa thu. Lý do khác bảng có thể chứa giá trị không biết là chúng thực sự không biết. Tham chiếu lại bảng CLIENTS trong Hình 3.3 và xem bản ghi của Marvin Russo. Giả sử bạn đang nhập dữ liệu cho ông Russo và bạn hỏi ông tên quận ông sống. Nếu ông không biết tên quận và bạn tình cờ không biết quận bao gồm thành phố ông sống, thì giá trị cho trường quận trong bản ghi của ông thực sự không biết và được biểu diễn trong bản ghi dưới dạng Null. Rõ ràng bạn có thể sửa vấn đề sau khi một trong hai người xác định được tên quận đúng.

Giá trị trường cũng có thể là Null nếu không có giá trị nào trong các giá trị của nó áp dụng cho bản ghi cụ thể. Giả sử trong chốc lát bạn đang làm việc với bảng EMPLOYEES chứa trường SALARY và trường HOURLYRATE. Giá trị cho một trong hai cột này sẽ luôn là Null vì nhân viên không thể được trả cả lương cố định lẫn lương theo giờ.

Điều quan trọng cần lưu ý là có sự khác biệt rất mong manh giữa "không áp dụng" và "không thích hợp." Trong ví dụ trước, giá trị của một trong hai trường theo nghĩa đen là không áp dụng. Giờ giả sử bạn đang làm việc với bảng PATIENTS chứa trường tên HAIRCOLOR và bạn đang cập nhật bản ghi cho bệnh nhân nam hiện có. Nếu bệnh nhân đó gần đây bị hói, thì giá trị cho trường đó chắc chắn "không thích hợp." Mặc dù bạn có thể chỉ dùng Null để đại diện giá trị không thích hợp, tôi luôn khuyến nghị bạn dùng giá trị thực như "N/A" hoặc "Not Applicable." Điều này sẽ làm thông tin rõ ràng hơn về lâu dài.

Như bạn thấy, việc bạn có cho phép Null trong bảng hay không phụ thuộc vào cách bạn đang sử dụng dữ liệu. Bây giờ bạn đã thấy mặt tích cực của việc dùng Null, hãy xem mặt tiêu cực của việc dùng nó.

### Vấn đề với Null

Nhược điểm chính của Null là nó có tác động bất lợi đến các phép toán. Phép toán liên quan Null có kết quả là Null. Điều này hợp lý về mặt logic—nếu một số không biết thì kết quả của phép toán tất yếu không biết. Lưu ý cách Null thay đổi kết quả của phép toán trong ví dụ sau:

(25 × 3) + 4 = 79  
(Null × 3) + 4 = Null  
(25 × Null) + 4 = Null  
(25 × 3) + Null = Null  

Bảng PRODUCTS trong Hình 3.4 giúp minh họa tác động Null có trên biểu thức toán học kết hợp các trường từ bảng. Trong trường hợp này, giá trị cho trường TOTAL VALUE được suy ra từ biểu thức toán học "[SRP] * [QTY ON HAND]." Khi bạn kiểm tra các bản ghi trong bảng này, lưu ý rằng giá trị cho trường TOTAL VALUE thiếu ở chỗ giá trị QTY ON HAND là Null, dẫn đến Null cho trường TOTAL VALUE. Điều này dẫn đến lỗi không phát hiện nghiêm trọng xảy ra khi tất cả giá trị trong trường TOTAL VALUE được cộng lại: tổng không chính xác. Lỗi này "không phát hiện" vì chương trình RDBMS không cố hữu cảnh báo bạn về lỗi. Cách duy nhất tránh vấn đề này là đảm bảo giá trị cho trường QTY ON HAND không thể là Null.

**Hình 3.4** Null trong bảng này sẽ có tác động lên các phép toán liên quan đến các trường của bảng.

Hình 3.5 giúp minh họa tác động Null có lên các hàm tổng hợp kết hợp giá trị của trường cho trước trong bảng. Kết quả của hàm tổng hợp, như COUNT(<fieldname>), sẽ là Null nếu nó dựa trên trường chứa Null. Bảng trong Hình 3.5 cho thấy kết quả của truy vấn tóm tắt đếm tổng số lần xuất hiện của mỗi danh mục trong bảng PRODUCTS trong Hình 3.4. Giá trị của trường TOTAL OCCURRENCES là kết quả của biểu thức hàm COUNT([CATEGORY]). Lưu ý rằng truy vấn tóm tắt hiển thị "0" lần xuất hiện của danh mục không xác định, ngụ ý rằng mỗi sản phẩm đã được gán danh mục. Thông tin này rõ ràng không chính xác vì hai sản phẩm trong bảng PRODUCTS chưa được gán danh mục.

**Hình 3.5** Null ảnh hưởng kết quả của hàm tổng hợp trong truy vấn tóm tắt.

Các vấn đề về giá trị thiếu, giá trị không biết và liệu giá trị có được dùng trong biểu thức toán học hay hàm tổng hợp đều được tính đến trong quy trình thiết kế cơ sở dữ liệu, và chúng ta sẽ xem xét và thảo luận các vấn đề này thêm trong Chương 8, "Keys," Chương 9, "Field Specifications," và Chương 12, "Views."

---

## Thuật ngữ liên quan đến cấu trúc

### Table (Bảng)

Theo mô hình quan hệ, dữ liệu trong cơ sở dữ liệu quan hệ được lưu trong các relation, mà người dùng nhận thức là các bảng. Mỗi relation gồm các tuple (bản ghi) và các attribute (trường). Hình 3.6 cho thấy cấu trúc bảng điển hình.

**Hình 3.6** Cấu trúc bảng điển hình.

Bảng là các cấu trúc chính trong cơ sở dữ liệu và mỗi bảng luôn đại diện một chủ đề đơn, cụ thể. Thứ tự logic của bản ghi và trường trong bảng hoàn toàn không quan trọng, và mỗi bảng chứa ít nhất một trường—được gọi là primary key—định danh duy nhất mỗi bản ghi của nó. (Trong Hình 3.6, ví dụ, CLIENT ID là primary key của bảng CLIENTS.) Thực tế, dữ liệu trong cơ sở dữ liệu quan hệ có thể tồn tại độc lập với cách nó được lưu vật lý trong máy tính nhờ hai đặc điểm cuối cùng này của bảng. Đây là tin tốt cho người dùng vì họ không bị yêu cầu biết vị trí vật lý của bản ghi để truy xuất dữ liệu của nó.

Chủ đề mà bảng cho trước đại diện có thể là đối tượng hoặc sự kiện. Khi chủ đề là đối tượng, nghĩa là bảng đại diện thứ gì đó hữu hình, như người, nơi chốn hoặc vật. Bất kể loại của nó, mỗi đối tượng có đặc điểm bạn có thể lưu dưới dạng dữ liệu rồi xử lý thành thông tin theo vô số cách gần như vô hạn. Phi công, sản phẩm, máy móc, sinh viên, tòa nhà và thiết bị đều là ví dụ về đối tượng mà bảng có thể đại diện, và Hình 3.6 minh họa một trong các ví dụ phổ biến nhất của loại bảng này.

Khi chủ đề của bảng là sự kiện, nghĩa là bảng đại diện thứ gì đó xảy ra tại thời điểm cho trước có đặc điểm bạn muốn ghi lại. Bạn có thể lưu các đặc điểm này dưới dạng dữ liệu rồi xử lý thành thông tin theo đúng cùng cách như bảng đại diện đối tượng cụ thể. Ví dụ về sự kiện bạn có thể cần ghi lại gồm phiên tòa, quay phim, bầu cử và khảo sát địa chất. Hình 3.7 cho thấy ví dụ về bảng đại diện sự kiện mà tất cả chúng ta đều đã từng trải qua—cuộc hẹn bác sĩ.

Bảng lưu dữ liệu dùng để cung cấp thông tin được gọi là data table, và là loại bảng phổ biến nhất trong cơ sở dữ liệu quan hệ. Dữ liệu trong loại bảng này mang tính động vì bạn có thể thao tác nó (sửa đổi, xóa, v.v.) và xử lý thành thông tin theo hình thức hoặc cách nào đó. Bạn sẽ liên tục tương tác với các loại bảng này khi làm việc với cơ sở dữ liệu.

**Hình 3.7** Bảng đại diện sự kiện.

validation table (còn gọi là lookup table), ngược lại, lưu dữ liệu bạn dùng cụ thể để triển khai tính toàn vẹn dữ liệu. validation table thường đại diện các chủ đề như tên thành phố, danh mục kỹ năng, mã sản phẩm và số định danh dự án. Dữ liệu trong loại bảng này mang tính tĩnh vì nó rất hiếm khi thay đổi. Mặc dù bạn có rất ít tương tác trực tiếp với các bảng này, bạn sẽ thường xuyên dùng chúng gián tiếp để xác thực giá trị bạn nhập vào data table. Hình 3.8 cho thấy ví dụ về validation table.

**Hình 3.8** Ví dụ về validation table.

Tôi thảo luận validation table chi tiết hơn trong Chương 11, "Business Rules."

### Field (Trường)

Trường (được gọi là attribute trong lý thuyết cơ sở dữ liệu quan hệ) là cấu trúc nhỏ nhất trong cơ sở dữ liệu, và nó đại diện đặc điểm của chủ đề bảng mà nó thuộc về. Trường là các cấu trúc thực sự lưu dữ liệu. Dữ liệu trong các trường này sau đó có thể được truy xuất và trình bày dưới dạng thông tin theo cấu hình gần như bất kỳ mà bạn có thể tưởng tượng. Chất lượng thông tin bạn có từ dữ liệu tỷ lệ thuận trực tiếp với thời gian bạn dành để đảm bảo tính toàn vẹn cấu trúc và tính toàn vẹn dữ liệu của chính các trường. Không có cách nào đánh giá thấp tầm quan trọng của trường.

Mỗi trường trong cơ sở dữ liệu được thiết kế đúng chứa một và chỉ một giá trị, và tên của nó sẽ định danh loại giá trị nó giữ. Điều này làm việc nhập dữ liệu vào trường rất trực quan. Nếu bạn thấy các trường có tên như FIRSTNAME, LASTNAME, CITY, STATE và ZIPCODE, bạn biết chính xác loại giá trị nào đi vào mỗi trường. Bạn cũng sẽ thấy rất dễ sắp xếp dữ liệu theo bang hoặc tìm mọi người có họ là "Hernandez."

Bạn thường gặp ba loại trường khác trong cơ sở dữ liệu được thiết kế không đúng hoặc kém.

1. **multipart field** (còn gọi là composite field), chứa hai hoặc nhiều mục riêng biệt trong giá trị của nó.
2. **multivalued field**, chứa nhiều thể hiện cùng loại giá trị.
3. **calculated field**, chứa giá trị văn bản nối chuỗi hoặc kết quả của biểu thức toán học.

Hình 3.9 cho thấy bảng với ví dụ về mỗi loại trường này.

**Hình 3.9** Bảng chứa trường thường, calculated, multipart và multivalued field.

Tôi trình bày calculated, multipart và multivalued field chi tiết hơn trong Chương 7, "Establishing Table Structures."

### Record (Bản ghi)

Record (được gọi là tuple trong lý thuyết cơ sở dữ liệu quan hệ) đại diện thể hiện duy nhất của chủ đề bảng. Nó gồm toàn bộ tập trường trong bảng, bất kể các trường có chứa giá trị hay không. Do cách bảng được định nghĩa, mỗi record được định danh xuyên suốt cơ sở dữ liệu bằng giá trị duy nhất trong trường primary key của bản ghi đó.

Trong Hình 3.9, mỗi record đại diện một khách hàng duy nhất trong bảng, và trường CLIENT ID sẽ định danh khách hàng cho trước xuyên suốt cơ sở dữ liệu. Lần lượt, mỗi record bao gồm tất cả các trường trong bảng, và mỗi trường mô tả khía cạnh nào đó của khách hàng mà record đại diện. Hãy xem record của Sara Castilleja, ví dụ. Bản ghi của cô đại diện thể hiện duy nhất của chủ đề bảng ("Clients") và bao gồm toàn bộ tập trường trong bảng, được xử lý như một đơn vị. Giá trị của các trường đó đại diện các sự thật liên quan về bà Castilleja quan trọng với ai đó trong tổ chức.

Record là yếu tố chính trong việc hiểu mối quan hệ bảng vì bạn sẽ cần biết record trong một bảng liên quan thế nào với các record khác trong bảng khác.

### View (Khung nhìn)

View là bảng "ảo" gồm các trường từ một hoặc nhiều bảng trong cơ sở dữ liệu; các bảng tạo thành view được gọi là base tables. Mô hình quan hệ gọi view là "ảo" vì nó lấy dữ liệu từ base tables thay vì lưu dữ liệu riêng. Thực tế, thông tin duy nhất về view được lưu trong cơ sở dữ liệu là cấu trúc của nó. Nhiều chương trình RDBMS chính hỗ trợ views và thường gọi chúng là saved queries. Chương trình RDBMS cụ thể của bạn sẽ xác định liệu views có được hỗ trợ và liệu bạn gọi đối tượng này là query hay view.

Views cho phép bạn xem thông tin trong cơ sở dữ liệu từ nhiều góc độ khác nhau, cung cấp cho bạn lượng linh hoạt lớn khi làm việc với dữ liệu. Bạn có thể tạo views theo nhiều cách, và chúng đặc biệt hữu ích khi bạn dựa chúng trên nhiều bảng liên quan. Trong cơ sở dữ liệu lịch học trường, ví dụ, bạn có thể tạo view hợp nhất dữ liệu từ các bảng STUDENTS, CLASSES và CLASS SCHEDULES.

Hình 3.10 cho thấy view tên INSTRUMENT ASSIGNMENTS gồm các trường lấy từ các bảng STUDENTS, INSTRUMENTS và STUDENT INSTRUMENTS. View hiển thị dữ liệu nó lấy từ tất cả các bảng này đồng thời, dựa trên giá trị khớp giữa các trường STUDENT ID trong các bảng STUDENTS và STUDENT INSTRUMENTS, và các trường INSTRUMENT ID trong các bảng INSTRUMENTS và STUDENT INSTRUMENTS.

**Hình 3.10** Ví dụ về view điển hình.

Có ba lý do chính views quan trọng.

1. Chúng cho phép bạn làm việc với dữ liệu từ nhiều bảng đồng thời. (Để view làm được điều này, các bảng phải có kết nối hoặc mối quan hệ với nhau.)

2. Chúng cho phép bạn ngăn một số người dùng xem hoặc thao tác các trường cụ thể trong bảng hoặc nhóm bảng. Khả năng này có thể rất có lợi về mặt bảo mật.

3. Bạn có thể dùng chúng để triển khai tính toàn vẹn dữ liệu. View bạn dùng cho mục đích này được gọi là validation view.

Bạn sẽ học thêm về thiết kế và sử dụng views trong Chương 12, "Views."

**Lưu ý**

Mặc dù mọi nhà cung cấp cơ sở dữ liệu chính hỗ trợ loại view tôi mô tả trong phần này, một số nhà cung cấp hỗ trợ cái được gọi là indexed view (hoặc materialized view). indexed view khác với view "thường" ở chỗ nó có lưu dữ liệu, và bạn có thể lập chỉ mục các trường của nó để cải thiện tốc độ RDBMS xử lý dữ liệu của view. Thảo luận đầy đủ về indexed views nằm ngoài phạm vi sách này vì đây là vấn đề triển khai đặc thù nhà cung cấp. Tuy nhiên, bạn nên nghiên cứu chủ đề này thêm nếu đang làm việc với phần mềm RDBMS như Oracle, Microsoft SQL Server, IBM DB2 hoặc Sybase SQL, hoặc nếu đang làm việc với kho dữ liệu hoặc cơ sở dữ liệu xử lý phân tích trực tuyến (OLAP).

### Keys (Khóa)

Keys là các trường đặc biệt đóng vai trò rất cụ thể trong bảng, và loại khóa xác định mục đích của nó trong bảng. Có nhiều loại keys một bảng có thể chứa, nhưng hai loại quan trọng nhất là primary key và foreign key.

**primary key** là trường hoặc nhóm trường định danh duy nhất mỗi record trong bảng; primary key gồm hai hoặc nhiều trường được gọi là composite primary key. primary key tuyệt đối là khóa quan trọng nhất trong toàn bộ bảng.

- Giá trị primary key định danh record cụ thể xuyên suốt toàn bộ cơ sở dữ liệu.
- Trường primary key định danh bảng cho trước xuyên suốt toàn bộ cơ sở dữ liệu.
- primary key thi hành tính toàn vẹn cấp bảng và giúp thiết lập mối quan hệ với các bảng khác trong cơ sở dữ liệu. (Bạn sẽ học thêm về mối quan hệ trong phần tiếp theo.)
- Mỗi bảng trong cơ sở dữ liệu của bạn nên có primary key!

Trường AGENT ID trong Hình 3.11 là ví dụ tốt về primary key. Nó định danh duy nhất mỗi đại lý trong bảng AGENTS và giúp đảm bảo tính toàn vẹn cấp bảng bằng cách đảm bảo không có record trùng. Nó cũng thiết lập mối quan hệ giữa bảng AGENTS và các bảng khác trong cơ sở dữ liệu, như trường hợp với bảng ENTERTAINERS trong ví dụ.

**Hình 3.11** Ví dụ về các trường primary key và foreign key.

Khi bạn xác định rằng hai bảng có mối quan hệ với nhau, bạn thường thiết lập mối quan hệ bằng cách lấy bản sao primary key từ bảng đầu và đưa vào cấu trúc của bảng thứ hai, nơi nó trở thành foreign key. Tên "foreign key" xuất phát từ thực tế là bảng thứ hai đã có primary key riêng, và primary key bạn đang đưa từ bảng đầu là "ngoại lai" với bảng thứ hai.

Hình 3.11 cũng cho thấy ví dụ tốt về foreign key. Lưu ý rằng AGENT ID là primary key của bảng AGENTS và foreign key trong bảng ENTERTAINERS. AGENT ID đảm nhận vai trò này vì bảng ENTERTAINERS đã có primary key—ENTERTAINER ID. Như vậy, AGENT ID thiết lập mối quan hệ giữa cả hai bảng.

Ngoài việc giúp thiết lập mối quan hệ giữa các cặp bảng, foreign keys cũng giúp triển khai và đảm bảo tính toàn vẹn cấp mối quan hệ. Điều này có nghĩa là các record trong cả hai bảng sẽ luôn được liên kết đúng vì giá trị của foreign key phải khớp với giá trị hiện có của primary key mà nó tham chiếu. Tính toàn vẹn cấp mối quan hệ cũng giúp bạn tránh record "mồ côi" đáng sợ, ví dụ kinh điển là bản ghi đơn hàng không có khách hàng liên quan. Nếu bạn không biết ai đặt hàng, bạn không thể xử lý, và rõ ràng không thể lập hóa đơn. Điều đó sẽ làm sai lệch doanh số quý của bạn!

Trường khóa đóng vai trò quan trọng trong cơ sở dữ liệu quan hệ, và bạn phải học cách tạo và sử dụng chúng. Bạn sẽ học thêm về primary keys trong Chương 8, "Keys," và Chương 10, "Table Relationships."

### Index (Chỉ mục)

Index là cấu trúc RDBMS cung cấp để cải thiện xử lý dữ liệu. Chương trình RDBMS cụ thể của bạn sẽ xác định index hoạt động thế nào và bạn sử dụng nó ra sao. Tuy nhiên, index hoàn toàn không liên quan đến cấu trúc cơ sở dữ liệu logic! Lý do duy nhất tôi đưa thuật ngữ index vào chương này là người ta thường nhầm lẫn nó với thuật ngữ key.

Index và key chỉ là hai thuật ngữ khác bị dùng sai rộng rãi và thường xuyên khắp ngành cơ sở dữ liệu và trong nhiều ấn phẩm và website liên quan đến cơ sở dữ liệu. (Nhớ nhận xét của tôi về data và information?) Bạn sẽ luôn biết sự khác biệt giữa hai thuật ngữ nếu bạn nhớ rằng keys là cấu trúc logic bạn dùng để định danh các record trong bảng, và indexes là cấu trúc vật lý bạn dùng để tối ưu xử lý dữ liệu.

---

## Thuật ngữ liên quan đến mối quan hệ

### Relationships (Mối quan hệ)

Mối quan hệ tồn tại giữa hai bảng khi bạn có thể theo cách nào đó liên kết các record của bảng đầu với bảng thứ hai. Bạn có thể thiết lập mối quan hệ qua tập primary và foreign keys (như bạn đã học ở phần trước) hoặc qua bảng thứ ba được gọi là linking table (còn gọi là associative table). Cách bạn thiết lập mối quan hệ thực sự phụ thuộc vào loại mối quan hệ tồn tại giữa các bảng. (Bạn sẽ học thêm về điều đó trong chốc lát.) Hình 3.11 minh họa mối quan hệ được thiết lập qua primary/foreign keys, và Hình 3.12 minh họa mối quan hệ được thiết lập với linking table.

**Hình 3.12** Mối quan hệ được thiết lập giữa hai bảng với sự hỗ trợ của linking table.

Mối quan hệ là thành phần quan trọng của cơ sở dữ liệu quan hệ.

- Nó cho phép bạn tạo khung nhìn đa bảng.
- Nó quan trọng đối với tính toàn vẹn dữ liệu vì giúp giảm dữ liệu thừa và loại bỏ dữ liệu trùng.
- Bạn có thể đặc trưng mọi mối quan hệ theo ba cách: theo loại mối quan hệ tồn tại giữa các bảng, theo cách mỗi bảng tham gia, và theo mức độ mỗi bảng tham gia.

### Các loại mối quan hệ

Ba loại mối quan hệ cụ thể (truyền thống gọi là cardinality) có thể tồn tại giữa một cặp bảng: một-một, một-nhiều và nhiều-nhiều.

#### Mối quan hệ một-một (One-to-One)

Cặp bảng có mối quan hệ một-một khi một record duy nhất trong bảng đầu liên quan đến không hoặc một và chỉ một record trong bảng thứ hai, và một record duy nhất trong bảng thứ hai liên quan đến một và chỉ một record trong bảng đầu. Trong loại mối quan hệ này, một bảng đóng vai "bảng cha" và bảng kia đóng vai "bảng con." Bạn thiết lập mối quan hệ bằng cách lấy bản sao primary key của bảng cha và đưa vào cấu trúc của bảng con, nơi nó trở thành foreign key. Đây là loại mối quan hệ đặc biệt vì đây là loại duy nhất trong đó cả hai bảng thực sự có thể dùng chung cùng primary key.

Hình 3.13 cho thấy ví dụ về mối quan hệ một-một điển hình. Trong trường hợp này, EMPLOYEES là bảng cha và COMPENSATION là bảng con. Mối quan hệ giữa các bảng này là một record duy nhất trong bảng EMPLOYEES có thể liên quan đến không hoặc chỉ một record trong bảng COMPENSATION, và một record duy nhất trong bảng COMPENSATION có thể liên quan đến chỉ một record trong bảng EMPLOYEES. Lưu ý rằng EMPLOYEE ID thực sự là primary key trong cả hai bảng. Tuy nhiên, nó cũng sẽ đóng vai foreign key trong bảng con.

**Hình 3.13** Ví dụ về mối quan hệ một-một.

#### Mối quan hệ một-nhiều (One-to-Many)

Mối quan hệ một-nhiều tồn tại giữa cặp bảng khi một record duy nhất trong bảng đầu có thể liên quan đến không, một hoặc nhiều record trong bảng thứ hai, nhưng một record duy nhất trong bảng thứ hai chỉ có thể liên quan đến một record trong bảng đầu. Mô hình cha/con tôi dùng để mô tả mối quan hệ một-một cũng áp dụng ở đây. Trong trường hợp này, bảng ở phía "một" của mối quan hệ là bảng cha và bảng ở phía "nhiều" là bảng con. Bạn thiết lập mối quan hệ một-nhiều bằng cách lấy bản sao primary key của bảng cha và đưa vào cấu trúc của bảng con, nơi nó trở thành foreign key.

Ví dụ trong Hình 3.14 minh họa mối quan hệ một-nhiều điển hình. Một record duy nhất trong bảng AGENTS có thể liên quan đến một hoặc nhiều record trong bảng ENTERTAINERS, nhưng một record duy nhất trong bảng ENTERTAINERS liên quan đến chỉ một record trong bảng AGENTS. Như bạn có thể đã đoán, AGENT ID là foreign key trong bảng ENTERTAINERS.

**Hình 3.14** Ví dụ về mối quan hệ một-nhiều.

Đây là mối quan hệ phổ biến nhất tồn tại giữa cặp bảng trong cơ sở dữ liệu. Nó quan trọng từ góc nhìn tính toàn vẹn dữ liệu vì giúp loại bỏ dữ liệu trùng và giữ dữ liệu thừa ở mức tối thiểu tuyệt đối. Bạn sẽ học thêm về điều này khi chúng ta đi sâu hơn vào quy trình thiết kế.

#### Mối quan hệ nhiều-nhiều (Many-to-Many)

Cặp bảng có mối quan hệ nhiều-nhiều khi một record duy nhất trong bảng đầu có thể liên quan đến không, một hoặc nhiều record trong bảng thứ hai và tương tự một record duy nhất trong bảng thứ hai có thể liên quan đến không, một hoặc nhiều record trong bảng đầu. Bạn thiết lập mối quan hệ này với linking table. (Bạn đã học chút ít về loại bảng này ở đầu phần này.) linking table giúp bạn dễ dàng liên kết record từ bảng này với bảng kia và sẽ giúp đảm bảo bạn không gặp vấn đề khi thêm, xóa hoặc sửa dữ liệu liên quan. Bạn định nghĩa linking table bằng cách lấy bản sao primary key của mỗi bảng trong mối quan hệ và dùng chúng để tạo cấu trúc của bảng mới. Các trường này thực sự đóng hai vai trò riêng biệt: Cùng nhau, chúng tạo thành composite primary key của linking table; riêng rẽ, mỗi trường đóng vai foreign key.

Mối quan hệ nhiều-nhiều không được thiết lập đúng là "chưa giải quyết." Hình 3.15 cho thấy ví dụ kinh điển và rõ ràng về mối quan hệ nhiều-nhiều chưa giải quyết. Trong trường hợp này, một record duy nhất trong bảng STUDENTS có thể liên quan đến nhiều record trong bảng CLASSES, và một record duy nhất trong bảng CLASSES có thể liên quan đến nhiều record trong bảng STUDENTS.

**Hình 3.15** Ví dụ về mối quan hệ nhiều-nhiều chưa giải quyết.

Mối quan hệ này chưa giải quyết do đặc điểm cố hữu của mối quan hệ nhiều-nhiều. Vấn đề chính là: Làm sao bạn dễ dàng liên kết record từ bảng đầu với record trong bảng thứ hai? Để diễn đạt lại câu hỏi theo các bảng trong Hình 3.15, làm sao bạn liên kết một sinh viên với nhiều lớp hoặc lớp cụ thể với nhiều sinh viên? Bạn có chèn vài trường STUDENT vào bảng CLASSES không? Hay bạn thêm vài trường CLASS vào bảng STUDENTS? Một trong hai cách tiếp cận này sẽ khiến bạn khó làm việc với dữ liệu trong các bảng đó và sẽ ảnh hưởng bất lợi đến tính toàn vẹn dữ liệu. Cách tiếp cận tốt nhất cho bạn là tạo và sử dụng linking table, điều sẽ giải quyết mối quan hệ nhiều-nhiều theo cách phù hợp và hiệu quả nhất. Hình 3.16 cho thấy giải pháp này trong thực tế.

**Hình 3.16** Giải quyết mối quan hệ nhiều-nhiều với linking table.

Điều quan trọng là bạn biết loại mối quan hệ tồn tại giữa cặp bảng vì nó xác định cách các bảng liên quan với nhau, liệu record giữa các bảng có phụ thuộc lẫn nhau hay không, và số lượng record liên quan tối thiểu và tối đa có thể tồn tại trong mối quan hệ. Bạn sẽ học thêm nhiều về mối quan hệ trong Chương 10.

### Các loại tham gia (Types of Participation)

Sự tham gia của bảng trong mối quan hệ có thể là bắt buộc hoặc tùy chọn. Giả sử mối quan hệ tồn tại giữa hai bảng tên TABLE_A và TABLE_B.

- Sự tham gia của TABLE_A là **bắt buộc** nếu bạn phải nhập ít nhất một record vào TABLE_A trước khi có thể nhập record vào TABLE_B.
- Sự tham gia của TABLE_A là **tùy chọn** nếu bạn không bắt buộc nhập record nào vào TABLE_A trước khi có thể nhập record vào TABLE_B.

Hãy xem ví dụ với các bảng AGENTS và CLIENTS trong Hình 3.17. Bảng AGENTS có sự tham gia bắt buộc trong mối quan hệ nếu đại lý phải tồn tại trước khi bạn có thể nhập khách hàng mới vào bảng CLIENTS. Tuy nhiên, sự tham gia của bảng AGENTS là tùy chọn nếu không có yêu cầu đại lý phải tồn tại trong bảng trước khi bạn nhập khách hàng mới vào bảng CLIENTS. Bạn có thể xác định loại tham gia phù hợp cho bảng AGENTS bằng cách xác định cách bạn sẽ sử dụng dữ liệu của nó liên quan đến dữ liệu trong bảng CLIENTS. Ví dụ, khi bạn muốn đảm bảo mỗi khách hàng được gán cho đại lý có sẵn, bạn làm sự tham gia của bảng AGENTS trong mối quan hệ là bắt buộc.

**Hình 3.17** Các bảng AGENTS và CLIENTS.

### Mức độ tham gia (Degree of Participation)

Mức độ tham gia xác định số record tối thiểu mà bảng cho trước phải có liên quan với một record trong bảng liên quan, và số record tối đa mà bảng cho trước được phép có liên quan với một record trong bảng liên quan.

Hãy xem lại mối quan hệ giữa hai bảng tên TABLE_A và TABLE_B. Bạn thiết lập mức độ tham gia cho TABLE_B bằng cách chỉ ra số record tối thiểu và tối đa trong TABLE_B có thể liên quan với một record trong TABLE_A. Nếu một record trong TABLE_A có thể liên quan đến không ít hơn 1 nhưng không quá 10 record trong TABLE_B, thì mức độ tham gia cho TABLE_B là 1,10. (Ký hiệu cho mức độ tham gia hiển thị số tối thiểu bên trái và số tối đa bên phải, được phân tách bằng dấu phẩy.) Bạn có thể thiết lập mức độ tham gia cho TABLE_A theo cùng cách. Bạn có thể xác định mức độ tham gia cho mỗi bảng trong mối quan hệ bằng cách xác định cách dữ liệu trong mỗi bảng liên quan và cách bạn đang sử dụng dữ liệu.

Hãy xem lại các bảng AGENTS và CLIENTS trong Hình 3.17. Nếu bạn yêu cầu đại lý phải xử lý ít nhất một khách hàng, nhưng chắc chắn không quá tám, thì mức độ tham gia cho bảng CLIENTS là 1,8. Khi bạn muốn đảm bảo khách hàng chỉ có thể được gán cho một đại lý, thì bạn chỉ ra mức độ tham gia cho bảng AGENTS là 1,1. Bạn sẽ học cách chỉ ra mức độ tham gia cho mối quan hệ cho trước trong Chương 10.

---

## Thuật ngữ liên quan đến tính toàn vẹn

### Field Specification (Đặc tả trường)

field specification (truyền thống gọi là domain) đại diện tất cả các phần tử của trường. Mỗi field specification kết hợp ba loại phần tử: chung, vật lý và logic.

- **Phần tử chung** tạo thành thông tin cơ bản nhất về trường và bao gồm các mục như Field Name, Description và Parent Table.
- **Phần tử vật lý** xác định cách trường được xây dựng và cách nó được biểu diễn cho người sử dụng. Thể loại này bao gồm các mục như Data Type, Length và Character Support.
- **Phần tử logic** mô tả các giá trị được lưu trong trường và bao gồm các mục như Required Value, Range of Values và Null Support.

Bạn sẽ học tất cả các phần tử liên quan đến field specification, bao gồm những mục được đề cập ở đây, trong Chương 9, "Field Specifications."

### Data Integrity (Tính toàn vẹn dữ liệu)

Data integrity đề cập đến tính hợp lệ, nhất quán và chính xác của dữ liệu trong cơ sở dữ liệu. Tôi không thể nhấn mạnh quá mức thực tế rằng mức độ chính xác của thông tin bạn truy xuất từ cơ sở dữ liệu tỷ lệ thuận trực tiếp với mức độ data integrity bạn áp đặt lên cơ sở dữ liệu. Data integrity là một trong những khía cạnh quan trọng nhất của quy trình thiết kế cơ sở dữ liệu, và bạn không thể đánh giá thấp, bỏ qua hoặc thậm chí bỏ bê một phần. Làm vậy sẽ đặt bạn vào nguy cơ bị quấy rầy bởi các lỗi rất khó phát hiện hoặc xác định. Kết quả là bạn sẽ đưa ra quyết định quan trọng dựa trên thông tin không chính xác ở mức tốt nhất, hoặc hoàn toàn không hợp lệ ở mức tệ nhất.

Có bốn loại data integrity mà bạn sẽ triển khai trong quy trình thiết kế cơ sở dữ liệu. Ba loại data integrity dựa trên các khía cạnh khác nhau của cấu trúc cơ sở dữ liệu và được gắn nhãn theo khu vực (mức) chúng hoạt động. Loại data integrity thứ tư dựa trên cách tổ chức nhận thức và sử dụng dữ liệu của nó. Sau đây là mô tả ngắn gọn của từng loại:

1. **Table-level integrity** (truyền thống gọi là entity integrity) đảm bảo không có record trùng tồn tại trong bảng và trường định danh mỗi record trong bảng là duy nhất và không bao giờ Null.

2. **Field-level integrity** (truyền thống gọi là domain integrity) đảm bảo cấu trúc của mỗi trường vững chắc; giá trị trong mỗi trường hợp lệ, nhất quán và chính xác; và các trường cùng loại (như trường CITY) được định nghĩa nhất quán xuyên suốt cơ sở dữ liệu.

3. **Relationship-level integrity** (truyền thống gọi là referential integrity) đảm bảo mối quan hệ giữa cặp bảng vững chắc và các record trong các bảng được đồng bộ bất cứ khi nào dữ liệu được nhập vào, cập nhật trong hoặc xóa khỏi bất kỳ bảng nào.

4. **Business rules** áp đặt ràng buộc hoặc giới hạn lên một số khía cạnh của cơ sở dữ liệu dựa trên cách tổ chức nhận thức và sử dụng dữ liệu. Các ràng buộc này có thể ảnh hưởng các khía cạnh của thiết kế cơ sở dữ liệu, như phạm vi và các loại giá trị được lưu trong trường, loại tham gia và mức độ tham gia của mỗi bảng trong mối quan hệ, và loại đồng bộ được dùng cho relationship-level integrity trong một số mối quan hệ. Tất cả các ràng buộc này được thảo luận chi tiết hơn trong Chương 11. Vì business rules ảnh hưởng tính toàn vẹn, chúng phải được xem xét cùng với ba loại data integrity kia trong quy trình thiết kế.

---

## Tóm tắt

Chương này bắt đầu với giải thích tại sao thuật ngữ quan trọng cho việc định nghĩa, thảo luận hoặc đọc về mô hình cơ sở dữ liệu quan hệ và quy trình thiết kế cơ sở dữ liệu.

Phần về thuật ngữ liên quan đến giá trị cho thấy có sự khác biệt rõ ràng giữa data và information và việc hiểu sự khác biệt này quan trọng để hiểu quy trình thiết kế cơ sở dữ liệu. Bạn giờ đã biết khá nhiều về Null và cách nó ảnh hưởng thông tin bạn truy xuất từ cơ sở dữ liệu.

Tiếp theo là thuật ngữ liên quan đến cấu trúc, và bạn học rằng cấu trúc cốt lõi của mọi cơ sở dữ liệu quan hệ là trường, bản ghi và bảng. Bạn giờ biết rằng views là bảng ảo được dùng, một phần, để làm việc với dữ liệu từ hai hoặc nhiều bảng đồng thời. Sau đó chúng ta xem xét key fields, được dùng để định danh record duy nhất trong bảng và thiết lập mối quan hệ giữa cặp bảng. Cuối cùng, bạn học sự khác biệt giữa key field và index. Giờ bạn biết rằng index nghiêm ngặt là thiết bị phần mềm (biểu hiện dưới dạng tệp lưu trên đĩa) dùng để tối ưu xử lý dữ liệu.

Trong phần thuật ngữ liên quan đến mối quan hệ, bạn học rằng kết nối giữa cặp bảng được gọi là relationship. Relationship được dùng để giúp đảm bảo các khía cạnh khác nhau của data integrity, và nó là cơ chế view dùng để lấy dữ liệu từ nhiều bảng. Bạn sau đó học về ba đặc trưng của mối quan hệ bảng: loại mối quan hệ (một-một, một-nhiều, nhiều-nhiều), loại tham gia (tùy chọn hoặc bắt buộc) và mức độ tham gia (số record liên quan tối thiểu/tối đa).

Chương kết thúc với thảo luận về thuật ngữ liên quan đến tính toàn vẹn. Ở đây bạn học rằng field specification thiết lập đặc điểm chung, vật lý và logic của trường—các đặc điểm là phần không thể tách rời của mỗi trường trong cơ sở dữ liệu. Bạn sau đó học rằng data integrity là một trong những khía cạnh quan trọng nhất của quy trình thiết kế cơ sở dữ liệu do tác động tích cực của nó lên dữ liệu trong cơ sở dữ liệu. Ngoài ra, bạn giờ biết có bốn loại data integrity—ba dựa trên cấu trúc cơ sở dữ liệu và một dựa trên cách tổ chức diễn giải và sử dụng dữ liệu. Các mức tính toàn vẹn này đảm bảo chất lượng thiết kế cơ sở dữ liệu của bạn và độ chính xác của thông tin bạn truy xuất từ nó.

---

## Câu hỏi ôn tập

1. Tại sao thuật ngữ quan trọng?
2. Kể tên bốn thể loại thuật ngữ.
3. Sự khác biệt giữa data và information là gì?
4. Null đại diện gì?
5. Nhược điểm chính của Null là gì?
6. Các cấu trúc chính trong cơ sở dữ liệu là gì?
7. Kể tên ba loại bảng.
8. View là gì?
9. Nêu sự khác biệt giữa key và index.
10. Ba loại mối quan hệ nào có thể tồn tại giữa cặp bảng?
11. Ba cách nào bạn có thể đặc trưng mối quan hệ?
12. field specification là gì?
13. field specification kết hợp ba loại phần tử nào?
14. data integrity là gì?
15. Kể tên bốn loại data integrity.

### Đáp án

1. Thuật ngữ quan trọng vì (a) diễn đạt và định nghĩa ý tưởng, khái niệm của mô hình cơ sở dữ liệu quan hệ; (b) diễn đạt và định nghĩa bản thân quy trình thiết kế cơ sở dữ liệu; (c) được dùng bất kỳ nơi nào thảo luận về cơ sở dữ liệu quan hệ hay RDBMS.
2. **Liên quan giá trị**, **liên quan cấu trúc**, **liên quan mối quan hệ** và **liên quan tính toàn vẹn**.
3. **Data** là các giá trị bạn lưu trong cơ sở dữ liệu. **Information** là data được xử lý theo cách làm nó có ý nghĩa và hữu ích khi làm việc hoặc xem.
4. **Giá trị thiếu hoặc không xác định**.
5. Null có **tác động bất lợi lên phép toán** (mọi phép toán liên quan Null cho kết quả Null).
6. **Bảng**.
7. **Bảng dữ liệu**, **bảng liên kết** và **bảng xác thực**.
8. **Bảng ảo** gồm các trường từ một hoặc nhiều base tables trong cơ sở dữ liệu.
9. **Key** là cấu trúc logic dùng xác định bản ghi trong bảng; **index** là cấu trúc vật lý dùng tối ưu xử lý dữ liệu.
10. **Một-một**, **một-nhiều** và **nhiều-nhiều**.
11. **Loại mối quan hệ**, **cách mỗi bảng tham gia** và **mức độ mỗi bảng tham gia**.
12. Field specification đại diện **tất cả các phần tử của một trường**.
13. **General** (chung), **physical** (vật lý) và **logical** (logic).
14. Tính **hợp lệ, nhất quán và chính xác** của dữ liệu trong cơ sở dữ liệu.
15. **Field-level**, **table-level**, **relationship-level** và **business rules**.
