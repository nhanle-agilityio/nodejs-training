# Chương 8: Khóa

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Một sự thật tự nó là không có gì. Nó chỉ có giá trị vì ý tưởng gắn với nó, hoặc vì chứng cứ mà nó cung cấp."*  
—CLAUDE BERNARD

---

## Các chủ đề trong chương này

- Tại sao Khóa quan trọng
- Thiết lập Khóa cho mỗi Bảng
- Tính toàn vẹn mức bảng
- Rà soát Cấu trúc Bảng ban đầu
- Ví dụ: Thiết lập Khóa
- Tóm tắt
- Câu hỏi ôn tập

---

## Nội dung chương đầy đủ

Đến giờ bạn đã xác định tất cả chủ đề cơ sở dữ liệu sẽ theo dõi và định nghĩa cấu trúc bảng đại diện các chủ đề đó. Hơn nữa, bạn đã đưa các cấu trúc qua quy trình sàng lọc để kiểm soát cấu trúc và chất lượng của chúng. Trong giai đoạn tiếp theo của quy trình thiết kế cơ sở dữ liệu, bạn sẽ bắt đầu nhiệm vụ gán khóa cho mỗi bảng. Bạn sẽ sớm học có nhiều loại khóa khác nhau, và mỗi loại đóng vai trò cụ thể trong cấu trúc cơ sở dữ liệu. Tất cả trừ một khóa được gán trong giai đoạn này; bạn sẽ gán khóa còn lại sau (ở Chương 10, "Mối quan hệ bảng") khi thiết lập mối quan hệ giữa các bảng.

---

## Tại sao Khóa quan trọng

Khóa quan trọng với cấu trúc bảng vì các lý do sau:

**Chúng đảm bảo mỗi bản ghi trong bảng được xác định chính xác.** Như bạn đã biết, bảng đại diện tập hợp đơn lẻ các đối tượng hoặc sự kiện tương tự. (Ví dụ, bảng CLASSES đại diện tập hợp các lớp học, không chỉ một lớp duy nhất.) Tập hợp đầy đủ các bản ghi trong bảng tạo thành tập hợp đó, và mỗi bản ghi đại diện một thể hiện duy nhất của chủ đề bảng trong tập hợp đó. Bạn phải có phương tiện xác định chính xác mỗi thể hiện, và khóa là công cụ cho phép bạn làm điều đó.

**Chúng giúp thiết lập và thực thi nhiều loại tính toàn vẹn.** Khóa là thành phần chính của tính toàn vẹn mức bảng và tính toàn vẹn mức mối quan hệ. Chẳng hạn, chúng cho phép bạn đảm bảo bảng có bản ghi duy nhất và các trường bạn dùng thiết lập mối quan hệ giữa cặp bảng luôn chứa giá trị khớp nhau.

**Chúng phục vụ thiết lập mối quan hệ bảng.** Như bạn sẽ học ở Chương 10, bạn sẽ dùng khóa để thiết lập mối quan hệ giữa cặp bảng.

Luôn đảm bảo bạn định nghĩa khóa phù hợp cho mỗi bảng. Làm vậy sẽ giúp bạn đảm bảo cấu trúc bảng vững chắc, dữ liệu thừa trong mỗi bảng ở mức tối thiểu, và mối quan hệ giữa các bảng chắc chắn.

---

## Thiết lập Khóa cho mỗi Bảng

Nhiệm vụ tiếp theo của bạn là thiết lập khóa cho mỗi bảng trong cơ sở dữ liệu. Bốn loại khóa chính là candidate key, primary key, foreign key và non-key. Loại khóa xác định chức năng của nó trong bảng.

### Candidate Keys

Loại khóa đầu tiên bạn thiết lập cho bảng là **candidate key**, là trường hoặc tập trường xác định duy nhất một thể hiện (một bản ghi trong bảng) của chủ đề bảng. Mỗi bảng phải có ít nhất một candidate key. Sau này bạn sẽ xem xét tập candidate key khả dụng của bảng và chỉ định một trong số đó làm primary key chính thức cho bảng.

Trước khi có thể chỉ định trường là candidate key, bạn phải đảm bảo nó tuân thủ tất cả **Elements of a Candidate Key** (Các yếu tố của Candidate Key). Các yếu tố này tạo thành bộ hướng dẫn bạn có thể dùng để xác định liệu trường có phù hợp làm candidate key hay không. Bạn không thể chỉ định trường là candidate key nếu nó không tuân thủ bất kỳ yếu tố nào trong số này.

#### Elements of a Candidate Key

- **Không thể là trường đa phần (multipart field).** Bạn đã thấy vấn đề với multipart field, nên bạn biết dùng một trường như vậy làm định danh là ý tưởng tồi.
- **Phải chứa giá trị duy nhất.** Yếu tố này giúp bạn phòng tránh trùng lặp bản ghi trong bảng. Bản ghi trùng lặp cũng tồi như trường trùng lặp, và bạn phải tránh chúng bằng mọi giá.
- **Không thể chứa Null.** Giá trị Null đại diện sự vắng mặt của giá trị, và hoàn toàn không có cách nào một trường candidate key có thể xác định bản ghi cho trước nếu nó là Null.
- **Giá trị của nó không thể gây vi phạm quy tắc bảo mật hoặc quyền riêng tư của tổ chức.** Các giá trị như mật khẩu và số An sinh Xã hội không phù hợp dùng làm candidate key.
- **Giá trị của nó không được tùy chọn toàn bộ hay từng phần.** Giá trị tùy chọn ngụ ý nó có thể null tại một thời điểm nào đó. Bạn có thể suy ra rằng giá trị tùy chọn tự động vi phạm yếu tố trước và do đó không chấp nhận được. (Lưu ý này đặc biệt áp dụng khi bạn muốn dùng hai hoặc nhiều trường làm candidate key.)
- **Bao gồm số lượng trường tối thiểu cần thiết để định nghĩa tính duy nhất.** Bạn có thể dùng tổ hợp trường (được coi như một đơn vị) làm candidate key, miễn mỗi trường đóng góp vào việc định nghĩa giá trị duy nhất. Tuy nhiên cố gắng dùng càng ít trường càng tốt, vì candidate key quá phức tạp cuối cùng có thể khó làm việc và khó hiểu.
- **Giá trị của nó phải xác định duy nhất và độc quyền mỗi bản ghi trong bảng.** Yếu tố này giúp bạn phòng tránh bản ghi trùng lặp và đảm bảo bạn có thể tham chiếu chính xác bất kỳ bản ghi nào của bảng từ các bảng khác trong cơ sở dữ liệu.
- **Giá trị của nó phải xác định độc quyền giá trị của mỗi trường trong bản ghi cho trước.** Yếu tố này đảm bảo candidate key của bảng cung cấp phương tiện duy nhất xác định mỗi giá trị trường trong bản ghi. (Bạn sẽ học thêm về yếu tố cụ thể này trong phần về primary key.)
- **Giá trị của nó chỉ có thể sửa đổi trong trường hợp hiếm hoặc cực đoan.** Bạn không nên bao giờ thay đổi giá trị candidate key trừ khi có lý do tuyệt đối và bắt buộc. Trường có thể khó tuân thủ các yếu tố trước nếu bạn có thể thay đổi giá trị của nó một cách tùy ý.

Thiết lập candidate key cho bảng khá đơn giản: Tìm trường hoặc tập trường tuân thủ tất cả Elements of a Candidate Key. Bạn có lẽ sẽ có thể định nghĩa hơn một candidate key cho bảng cho trước. Tải bảng với dữ liệu mẫu sẽ cho bạn phương tiện xác định chính xác các candidate key tiềm năng. (Bạn đã dùng kỹ thuật tương tự ở chương trước.)

Xem bạn có thể xác định candidate key nào cho bảng trong Hình 8.1 không.

**Hình 8.1** Có candidate key nào trong bảng này không?

Bạn có lẽ đã xác định EMPLOYEE ID, SOCIAL SECURITY NUMBER, EMPLAST NAME, EMPFIRST NAME và EMPLAST NAME, EMPZIPCODE, và EMPHOME PHONE là các candidate key tiềm năng. Nhưng bạn sẽ cần xem xét các trường này kỹ hơn để xác định trường nào thực sự đủ điều kiện trở thành candidate key. Nhớ rằng bạn phải tự động loại bỏ bất kỳ trường nào không tuân thủ dù chỉ một trong Elements of a Candidate Key.

Sau khi xem xét kỹ, bạn có thể rút ra các kết luận sau:

- **EMPLOYEE ID đủ điều kiện.** Trường này tuân thủ mọi yếu tố của candidate key.
- **SOCIAL SECURITY NUMBER không đủ điều kiện** vì nó có thể chứa giá trị null và rất có thể vi phạm quy tắc riêng tư của tổ chức. Trái với điều dữ liệu mẫu cho thấy, trường này có thể chứa giá trị null. Ví dụ, nhiều người làm việc tại Hoa Kỳ không có số An sinh Xã hội vì họ là công dân nước khác hoặc chỉ ở đây với thị thực lao động.

**Lưu ý:** Dù sử dụng rộng rãi trong nhiều loại cơ sở dữ liệu, tôi mạnh mẽ khuyến nghị bạn tránh dùng SOCIAL SECURITY NUMBER làm candidate key (hoặc primary key) trong bất kỳ cấu trúc cơ sở dữ liệu nào của bạn. Trang web Cơ quan An sinh Xã hội chi tiết lịch sử của số An sinh Xã hội và cung cấp một số sự thật rất thú vị về số An sinh Xã hội và trộm cắp danh tính, vấn đề đã trở nên nghiêm trọng hơn nhiều trong những năm gần đây. Bạn có thể truy cập thông tin thú vị này tại <https://www.ssa.gov/policy/docs/ssb/v69n2/v69n2p55.xhtml>. Bạn có thể tìm thông tin liên quan đến trộm cắp danh tính trong phần có tiêu đề "Expanding Uses of SSN."

- **EMPLAST NAME không đủ điều kiện** vì nó có thể chứa giá trị trùng lặp. Như bạn đã học, giá trị của candidate key phải duy nhất. Trong trường hợp này có thể có nhiều hơn một lần xuất hiện của một họ cụ thể.
- **EMPFIRST NAME và EMPLAST NAME đủ điều kiện.** Giá trị kết hợp của cả hai trường sẽ cung cấp định danh duy nhất cho bản ghi cho trước. Dù sẽ có nhiều lần xuất hiện của tên hoặc họ cụ thể, tổ hợp tên và họ cho trước luôn duy nhất. (Một số bạn có lẽ đang nói, "Điều này không nhất thiết luôn đúng." Bạn hoàn toàn đúng. Đừng lo; chúng ta sẽ giải quyết vấn đề này ngay.)
- **EMPZIPCODE không đủ điều kiện** vì nó có thể chứa giá trị trùng lặp. Nhiều người sống trong cùng khu vực mã bưu điện, nên giá trị trong EMPZIPCODE không thể duy nhất.
- **EMPHOME PHONE không đủ điều kiện** vì nó có thể chứa giá trị trùng lặp và dễ thay đổi. Trường này sẽ chứa giá trị trùng lặp vì bất kỳ lý do nào sau:
  1. Một hoặc nhiều thành viên gia đình làm việc cho tổ chức.
  2. Một hoặc nhiều người chia sẻ nơi ở có một đường dây điện thoại.
  3. Nó có thể là Null.

Bạn có thể tự tin khẳng định bảng EMPLOYEES có hai candidate key: EMPLOYEE ID và tổ hợp EMPFIRST NAME và EMPLAST NAME.

Đánh dấu candidate key trong cấu trúc bảng bằng cách viết chữ "CK" bên cạnh tên mỗi trường bạn chỉ định là candidate key. Candidate key gồm hai hoặc nhiều trường được gọi là composite candidate key (CCK), và bạn sẽ viết "CCK" bên cạnh tên các trường tạo nên khóa. Khi có hai hoặc nhiều composite candidate key, dùng số trong dấu để phân biệt chúng. Ví dụ, nếu có hai composite candidate key, bạn sẽ đánh dấu một cái là "CCK1" và cái kia là "CCK2."

Áp dụng kỹ thuật này cho các candidate key của bảng EMPLOYEES trong Hình 8.1. Hình 8.2 cho thấy cấu trúc của bạn trông thế nào khi hoàn thành nhiệm vụ này.

**Hình 8.2** Đánh dấu candidate key trong cấu trúc bảng EMPLOYEES.

Bây giờ thử xác định càng nhiều candidate key càng tốt cho bảng PARTS trong Hình 8.3.

**Hình 8.3** Bạn có thể xác định candidate key nào trong bảng PARTS không?

Thoạt nhìn, bạn có thể tin PART NAME, MODEL NUMBER, tổ hợp PART NAME và MODEL NUMBER, và tổ hợp MANUFACTURER NAME và PART NAME là các candidate key tiềm năng. Tuy nhiên sau khi điều tra lý thuyết này, bạn rút ra các kết quả sau:

- **PART NAME không đủ điều kiện** vì nó có thể chứa giá trị trùng lặp. Tên phụ tùng cho trước sẽ bị trùng khi phụ tùng được sản xuất ở nhiều model. Ví dụ, đây là trường hợp với Faust Brake Levers.
- **MODEL NUMBER không đủ điều kiện** vì nó có thể chứa giá trị null. Giá trị candidate key phải tồn tại cho mỗi bản ghi trong bảng. Như bạn thấy, một số phụ tùng không có số model.
- **PART NAME và MODEL NUMBER không đủ điều kiện** vì bất kỳ trường nào cũng có thể chứa giá trị null. Thực tế đơn giản là MODEL NUMBER có thể chứa giá trị null ngay lập tức loại tổ hợp trường này.
- **MANUFACTURER NAME và PART NAME không đủ điều kiện** vì giá trị cho các trường này có vẻ tùy chọn. Nhắc lại rằng giá trị candidate key không thể tùy chọn toàn bộ hay từng phần. Trong trường hợp này, bạn có thể suy ra việc nhập tên nhà sản xuất là tùy chọn khi nó xuất hiện như thành phần của tên phụ tùng; do đó bạn không thể chỉ định tổ hợp trường này làm candidate key.

Rõ ràng bạn không có một trường duy nhất hoặc tập trường đủ điều kiện làm candidate key cho bảng PARTS. Đây là vấn đề vì mỗi bảng phải có ít nhất một candidate key. May mắn là có giải pháp.

### Artificial Candidate Keys

Khi bạn xác định bảng không chứa candidate key, bạn có thể tạo và dùng **artificial candidate key** (khóa ứng viên nhân tạo). (Nó được gọi là nhân tạo vì nó không xuất hiện "tự nhiên" trong bảng; bạn phải tạo ra nó.) Bạn thiết lập artificial candidate key bằng cách tạo trường mới tuân thủ tất cả Elements of a Candidate Key rồi thêm vào bảng; trường này trở thành candidate key chính thức.

Bây giờ bạn có thể giải quyết vấn đề trong bảng PARTS. Tạo artificial candidate key tên PART NUMBER và gán cho bảng. (Trường mới sẽ tự động tuân thủ Elements of a Candidate Key vì bạn đang tạo nó từ đầu.) Hình 8.4 cho thấy cấu trúc đã sửa của bảng PARTS.

**Hình 8.4** Bảng PARTS với artificial candidate key PART NUMBER.

Khi đã thiết lập artificial candidate key cho bảng, đánh dấu tên trường bằng "CK" trong cấu trúc bảng, giống như bạn đã làm với bảng EMPLOYEES trong ví dụ trước.

Bạn cũng có thể chọn tạo artificial candidate key khi nó sẽ là candidate key mạnh hơn (và do đó phù hợp hơn) bất kỳ candidate key hiện có nào. Giả sử bạn đang làm việc với bảng EMPLOYEES và bạn xác định candidate key khả dụng duy nhất là tổ hợp các trường EMPFIRST NAME và EMPLAST NAME. Dù điều này có thể là candidate key hợp lệ, dùng candidate key đơn trường có thể hiệu quả hơn và xác định chủ đề bảng dễ hơn. Giả sử mọi người trong tổ chức đã quen dùng số định danh duy nhất thay vì tên để xác định nhân viên. Trong trường hợp này, bạn có thể chọn tạo trường mới tên EMPLOYEE ID và dùng nó làm artificial candidate key. Đây là thực hành hoàn toàn chấp nhận được—làm điều này không do dự hay dè dặt nếu bạn tin nó phù hợp.

**Lưu ý:** Tôi thường tạo trường ID (như EMPLOYEE ID, VENDOR ID, DEPARTMENT ID, CATEGORY ID, v.v.) và dùng nó làm artificial candidate key. Nó luôn tuân thủ Elements of a Candidate Key, tạo primary key xuất sắc (sau này), và như bạn sẽ thấy ở Chương 10, làm quy trình thiết lập mối quan hệ bảng dễ dàng hơn nhiều.

Rà soát các candidate key bạn đã chọn và đảm bảo tuyệt đối chúng tuân thủ hoàn toàn Elements of a Candidate Key. Đừng ngạc nhiên nếu bạn phát hiện một trong số đó không phải candidate key sau tất cả—xác định sai trường là candidate key thỉnh thoảng vẫn xảy ra. Khi điều đó xảy ra, chỉ cần loại bỏ chỉ định "CK" khỏi tên trường trong cấu trúc bảng. Xóa candidate key sẽ không gây vấn đề miễn bảng có hơn một candidate key. Tuy nhiên nếu bạn phát hiện candidate key duy nhất bạn xác định cho bảng không phải candidate key, bạn phải thiết lập artificial candidate key cho bảng. Sau khi đã định nghĩa candidate key mới, nhớ đánh dấu tên của nó bằng "CK" trong cấu trúc bảng.

### Primary Keys

Đến giờ bạn đã thiết lập tất cả candidate key có vẻ phù hợp cho mỗi bảng. Nhiệm vụ tiếp theo là thiết lập **primary key** cho mỗi bảng, đây là khóa quan trọng nhất trong tất cả.

- Trường primary key xác định độc quyền bảng trong toàn bộ cấu trúc cơ sở dữ liệu và giúp thiết lập mối quan hệ với các bảng khác. (Bạn sẽ học thêm về điều này ở Chương 10.)
- Giá trị primary key xác định duy nhất bản ghi cho trước trong bảng và đại diện độc quyền bản ghi đó trong toàn bộ cơ sở dữ liệu. Nó cũng giúp phòng tránh bản ghi trùng lặp.

Primary key phải tuân thủ chính xác các yếu tố giống candidate key. Yêu cầu này dễ đáp ứng vì bạn chọn primary key từ tập candidate key khả dụng của bảng.

Quy trình chọn primary key hơi giống cuộc bầu cử tổng thống. Cứ bốn năm, nhiều người tranh cử chức Tổng thống Hoa Kỳ. Những cá nhân này được gọi là "ứng viên" và họ có tất cả phẩm chất cần thiết để trở thành tổng thống. Cuộc bầu cử quốc gia diễn ra, và một cá nhân duy nhất từ tập ứng viên tổng thống khả dụng được bầu phục vụ làm tổng thống chính thức của quốc gia. Tương tự, bạn xác định mỗi candidate key đủ điều kiện trong bảng, tổ chức cuộc bầu cử của riêng mình và chọn một trong số đó trở thành primary key chính thức của bảng. Bạn đã xác định các ứng viên, nên giờ là lúc bầu cử!

Giả sử không có ưu tiên biên nào khác, đây là vài hướng dẫn bạn có thể dùng để chọn primary key phù hợp:

1. Nếu có candidate key đơn (đơn trường) và composite candidate key, chọn candidate key đơn. Luôn tốt nhất dùng candidate key chứa ít trường nhất.
2. Chọn candidate key có tên bao gồm một phần tên bảng. Ví dụ, candidate key có tên như SALES INVOICE NUMBER là lựa chọn tốt cho bảng SALES INVOICES.

Xem xét các candidate key và chọn một cái làm primary key cho bảng. Lựa chọn phần lớn tùy ý—bạn có thể chọn cái bạn tin xác định chính xác nhất chủ đề bảng hoặc ý nghĩa nhất với mọi người trong tổ chức. Ví dụ, hãy xem lại bảng EMPLOYEES trong Hình 8.5.

**Hình 8.5** Candidate key nào nên trở thành primary key của bảng EMPLOYEES?

Bất kỳ candidate key nào bạn đã xác định trong bảng đều có thể phục vụ làm primary key. Bạn có thể quyết định chọn EMPLOYEE ID nếu mọi người trong tổ chức đã quen dùng số này để xác định nhân viên trong các mục như biểu mẫu thuế và chương trình phúc lợi nhân viên. Candidate key bạn cuối cùng chọn trở thành primary key của bảng và được chi phối bởi **Elements of a Primary Key** (Các yếu tố của Primary Key). Các yếu tố này chính xác giống những yếu tố của candidate key, và bạn nên thực thi chúng đúng từng chữ. Để rõ ràng, đây là Elements of a Primary Key:

#### Elements of a Primary Key

- Không thể là multipart field.
- Phải chứa giá trị duy nhất.
- Không thể chứa Null.
- Giá trị của nó không thể gây vi phạm quy tắc bảo mật hoặc quyền riêng tư của tổ chức.
- Giá trị của nó không tùy chọn toàn bộ hay từng phần.
- Bao gồm số lượng trường tối thiểu cần thiết để định nghĩa tính duy nhất.
- Giá trị của nó phải xác định duy nhất và độc quyền mỗi bản ghi trong bảng.
- Giá trị của nó phải xác định độc quyền giá trị của mỗi trường trong bản ghi cho trước.
- Giá trị của nó chỉ có thể sửa đổi trong trường hợp hiếm hoặc cực đoan.

Trước khi hoàn tất lựa chọn primary key, điều quan trọng là bạn phải đảm bảo tuyệt đối primary key tuân thủ hoàn toàn yếu tố cụ thể này:

**Giá trị của nó phải xác định độc quyền giá trị của mỗi trường trong bản ghi cho trước.**

Mỗi giá trị trường trong bản ghi cho trước nên duy nhất trong toàn bộ cơ sở dữ liệu (trừ khi nó tham gia thiết lập mối quan hệ giữa cặp bảng) và chỉ nên có một phương tiện xác định độc quyền duy nhất—giá trị primary key cụ thể cho bản ghi đó.

Bạn có thể xác định primary key có tuân thủ hoàn toàn yếu tố này hay không bằng cách làm theo các bước sau:

1. Tải bảng với dữ liệu mẫu.
2. Chọn một bản ghi cho mục đích kiểm tra và ghi chú giá trị primary key hiện tại.
3. Xem xét giá trị của trường đầu tiên (trường ngay sau primary key) và tự hỏi:
   *Giá trị primary key này có xác định độc quyền giá trị hiện tại của \<tên trường\> không?*
   - Nếu câu trả lời là "có," chuyển sang trường tiếp theo và lặp lại câu hỏi.
   - Nếu câu trả lời là "không," loại trường khỏi bảng, chuyển sang trường tiếp theo và lặp lại câu hỏi.
4. Tiếp tục quy trình này cho đến khi bạn đã xem xét mọi giá trị trường trong bản ghi.

Giá trị trường mà primary key không xác định độc quyền cho thấy chính trường đó không cần thiết cho cấu trúc bảng; do đó bạn nên loại trường và xác nhận lại bảng tuân thủ Elements of the Ideal Table. Sau đó bạn có thể thêm trường vừa loại vào cấu trúc bảng khác nếu phù hợp, hoặc loại bỏ hoàn toàn vì nó thực sự không cần thiết.

Đây là ví dụ cách bạn có thể áp dụng kỹ thuật này cho cấu trúc bảng một phần trong Hình 8.6. (Lưu ý rằng INVOICE NUMBER là primary key của bảng.)

**Hình 8.6** Primary key có xác định độc quyền giá trị của mỗi trường trong bảng này không?

Đầu tiên, bạn tải bảng với dữ liệu mẫu. Bạn sau đó chọn một bản ghi cho mục đích kiểm tra—chúng ta sẽ dùng bản ghi thứ ba cho ví dụ này—và ghi chú giá trị của primary key (13002). Bây giờ, đặt câu hỏi sau cho mỗi giá trị trường trong bản ghi.

*Giá trị primary key này có xác định độc quyền giá trị hiện tại của...*

- **INVOICE DATE?** Có, nó có. Số hóa đơn này sẽ luôn xác định ngày cụ thể hóa đơn được tạo.
- **CUSTFIRST NAME?** Có, nó có. Số hóa đơn này sẽ luôn xác định tên riêng cụ thể của khách hàng cụ thể đã mua hàng này.
- **CUSTLAST NAME?** Có, nó có. Số hóa đơn này sẽ luôn xác định họ cụ thể của khách hàng cụ thể đã mua hàng này.
- **EMPFIRST NAME?** Có, nó có. Số hóa đơn này sẽ luôn xác định tên riêng cụ thể của nhân viên cụ thể đã phục vụ khách hàng cho giao dịch bán hàng này.
- **EMPLAST NAME?** Có, nó có. Số hóa đơn này sẽ luôn xác định họ cụ thể của nhân viên cụ thể đã phục vụ khách hàng cho giao dịch bán hàng này.
- **EMPHOME PHONE?** Không, không có! Số hóa đơn xác định gián tiếp số điện thoại nhà của nhân viên qua tên nhân viên. Trên thực tế, chính giá trị hiện tại của cả EMPFIRST NAME và EMPLAST NAME mới xác định độc quyền giá trị của EMPHOME PHONE—thay đổi tên nhân viên, và bạn phải thay đổi số điện thoại. Bạn nên loại EMPHOME PHONE khỏi bảng vì hai lý do: Primary key không xác định độc quyền giá trị hiện tại của nó và (như bạn có lẽ đã nhận ra) nó là trường không cần thiết. Hóa ra bạn có thể loại bỏ hoàn toàn trường này vì nó đã là phần cấu trúc bảng EMPLOYEES.

Sau khi đã loại các trường không cần thiết bạn xác định trong quá trình kiểm tra này, xem xét cấu trúc bảng đã sửa và đảm bảo nó tuân thủ Elements of the Ideal Table.

Primary key giờ sẽ xác định độc quyền giá trị của các trường còn lại trong bảng. Điều này có nghĩa primary key thực sự vững chắc, và bạn có thể chỉ định nó làm primary key chính thức cho bảng. Loại bỏ "CK" bên cạnh tên trường trong cấu trúc bảng và thay bằng "PK." (Primary key gồm hai hoặc nhiều trường được gọi là composite primary key (CPK), và bạn đánh dấu nó bằng chữ "CPK.") Hình 8.7 cho thấy cấu trúc đã sửa của bảng SALES INVOICES với INVOICE NUMBER làm primary key.

**Hình 8.7** Bảng SALES INVOICES đã sửa với primary key mới.

#### Quy tắc Thiết lập Primary Key

Khi tạo primary key cho mỗi bảng trong cơ sở dữ liệu, ghi nhớ hai quy tắc sau:

1. **Mỗi bảng phải có một—và chỉ một—primary key.** Vì primary key phải tuân thủ từng yếu tố chi phối nó, chỉ cần một primary key cho bảng cụ thể.
2. **Mỗi primary key trong cơ sở dữ liệu phải duy nhất—không có hai bảng nào có cùng primary key** trừ khi chúng có mối quan hệ một-một hoặc một trong số đó là bảng tập con.

Bạn học ở đầu phần này rằng primary key xác định độc quyền bảng trong toàn bộ cấu trúc cơ sở dữ liệu; do đó mỗi bảng phải có primary key duy nhất riêng để tránh nhầm lẫn hoặc mơ hồ về danh tính bảng. Bảng tập con được loại trừ khỏi quy tắc này vì nó đại diện phiên bản cụ thể hơn của chủ đề bảng dữ liệu cụ thể—cả hai bảng phải chia sẻ cùng primary key.

Sau này trong quy trình thiết kế cơ sở dữ liệu, bạn sẽ học cách dùng primary key để giúp thiết lập mối quan hệ giữa cặp bảng.

### Alternate Keys

Giờ bạn đã chọn candidate key làm primary key cho bảng cụ thể, bạn sẽ chỉ định các candidate key còn lại là **alternate keys**. Các khóa này có thể hữu ích cho bạn trong chương trình RDBMS vì chúng cung cấp phương tiện thay thế để xác định duy nhất bản ghi cụ thể trong bảng. Nếu bạn chọn dùng alternate key theo cách này, đánh dấu tên của nó bằng "AK" hoặc "CAK" (composite alternate key) trong cấu trúc bảng; nếu không, loại bỏ chỉ định của nó là alternate key và đơn giản trả nó về trạng thái trường bình thường. Bạn sẽ không quan tâm đến alternate keys trong phần còn lại của quy trình thiết kế cơ sở dữ liệu, nhưng bạn sẽ làm việc với chúng một lần nữa khi triển khai cơ sở dữ liệu trong chương trình RDBMS. (Triển khai và sử dụng alternate keys trong chương trình RDBMS nằm ngoài phạm vi tác phẩm này; mục tiêu duy nhất của chúng ta ở đây là chỉ định chúng khi phù hợp. Điều này phù hợp với trọng tâm của sách—thiết kế logic của cơ sở dữ liệu.)

Hình 8.8 cho thấy cấu trúc cuối cùng cho bảng EMPLOYEES với chỉ định phù hợp cho cả primary key và alternate keys.

**Hình 8.8** Bảng EMPLOYEES với primary key và alternate keys được chỉ định.

### Non-keys

**Non-key** là trường không phục vụ làm candidate, primary, alternate hay foreign key. Mục đích duy nhất của nó là đại diện đặc điểm của chủ đề bảng, và giá trị của nó được xác định bởi primary key. Không có chỉ định cụ thể cho non-key, nên bạn không cần đánh dấu nó trong cấu trúc bảng.

---

## Tính toàn vẹn mức bảng (Table-Level Integrity)

**Table-level integrity** là thành phần chính của tính toàn vẹn dữ liệu tổng thể, và nó đảm bảo:

- Không có bản ghi trùng lặp trong bảng.
- Primary key xác định độc quyền mỗi bản ghi trong bảng.
- Mọi giá trị primary key đều duy nhất.
- Giá trị primary key không null.

Bạn đã bắt đầu thiết lập table-level integrity khi định nghĩa primary key cho mỗi bảng và đảm bảo thực thi nó bằng cách đảm bảo tuyệt đối mỗi primary key tuân thủ hoàn toàn Elements of a Primary Key. Ở chương tiếp theo, bạn sẽ tăng cường tính toàn vẹn bảng hơn nữa khi thiết lập đặc tả trường cho mỗi trường trong bảng.

---

## Rà soát Cấu trúc Bảng ban đầu

Giờ định nghĩa bảng cơ bản đã hoàn thành, bạn cần tiến hành phỏng vấn với người dùng và quản lý để rà soát công việc bạn đã làm đến nay. Bộ phỏng vấn này khá thẳng thắn và nên tương đối dễ tiến hành.

Trong các cuộc phỏng vấn này, bạn sẽ hoàn thành các nhiệm vụ sau:

- **Đảm bảo các chủ đề phù hợp được đại diện trong cơ sở dữ liệu.** Dù rất khó có chủ đề quan trọng bị thiếu ở giai đoạn này của quy trình thiết kế cơ sở dữ liệu, vẫn có thể xảy ra. Khi xảy ra, xác định chủ đề, dùng kỹ thuật phù hợp để chuyển nó thành bảng, và phát triển nó đến cùng mức độ như các bảng khác trong cơ sở dữ liệu.
- **Đảm bảo tên bảng và mô tả bảng phù hợp và có ý nghĩa với mọi người.** Khi tên hoặc mô tả có vẻ gây nhầm lẫn hoặc mơ hồ với nhiều người trong tổ chức, làm việc với họ để làm rõ mục đó càng nhiều càng tốt. Phổ biến là một số tên bảng và mô tả được cải thiện trong quá trình phỏng vấn.
- **Đảm bảo tên trường phù hợp và có ý nghĩa với mọi người.** Chọn tên trường thường tạo ra nhiều thảo luận, đặc biệt khi có cơ sở dữ liệu hiện tại. Bạn thường gặp người thường xuyên gọi trường cụ thể bằng tên nhất định vì "đó là tên trên màn hình của tôi." Khi bạn thay đổi tên trường—bạn có lý do tốt để làm vậy—bạn phải giải thích một cách khéo léo cho những người này rằng bạn đã đổi tên trường để nó tuân thủ các tiêu chuẩn áp đặt bởi cơ sở dữ liệu mới. Bạn cũng có thể nói với họ trường có thể hiển thị với tên quen thuộc hơn sau khi cơ sở dữ liệu được triển khai trong chương trình RDBMS. Điều bạn nói là đúng; nhiều RDBMS cho phép bạn dùng một tên cho định nghĩa vật lý của trường và tên khác cho mục đích hiển thị. Tuy nhiên tính năng này không thay đổi, giảm thiểu hay phủ nhận nhu cầu bạn tuân theo hướng dẫn tạo tên trường đã học ở Chương 7, "Thiết lập cấu trúc bảng."
- **Xác minh tất cả trường phù hợp được gán cho mỗi bảng.** Đây là cơ hội tốt nhất để đảm bảo tất cả đặc điểm cần thiết liên quan chủ đề bảng đã có. Bạn thường phát hiện đã vô tình bỏ sót một hoặc hai đặc điểm sớm hơn trong quy trình thiết kế. Khi điều đó xảy ra, xác định các đặc điểm, dùng kỹ thuật phù hợp để chuyển chúng thành trường, và làm theo tất cả bước cần thiết để thêm chúng vào bảng.

Khi đã hoàn thành phỏng vấn, bạn sẽ chuyển sang giai đoạn tiếp theo của quy trình thiết kế cơ sở dữ liệu và thiết lập đặc tả trường cho mỗi trường trong cơ sở dữ liệu.

---

## Ví dụ: Thiết lập Khóa (Mike's Bikes)

Giờ đến lúc thiết lập khóa cho mỗi bảng trong cơ sở dữ liệu Mike's Bikes. Như bạn biết, công việc đầu tiên của bạn là thiết lập candidate keys cho mỗi bảng. Giả sử bạn quyết định bắt đầu với bảng CUSTOMERS trong Hình 8.9.

**Hình 8.9** Cấu trúc bảng CUSTOMERS trong cơ sở dữ liệu Mike's Bikes.

Khi rà soát mỗi trường, bạn thử xác định liệu nó có tuân thủ Elements of a Candidate Key không. Bạn xác định STATUS, CUSTHOME PHONE và tổ hợp CUSTFIRST NAME và CUSTLAST NAME là các candidate key tiềm năng, nhưng bạn không chắc chắn liệu bất kỳ cái nào có tuân thủ hoàn toàn tất cả các yếu tố hay không. Vì vậy bạn quyết định kiểm tra các khóa bằng cách tải bảng với dữ liệu mẫu như trong Hình 8.10.

**Hình 8.10** Kiểm tra candidate keys trong bảng CUSTOMERS.

Luôn nhớ trường phải tuân thủ tất cả Elements of a Candidate Key để đủ điều kiện làm candidate key. Bạn phải ngay lập tức loại trường nếu nó không đáp ứng yêu cầu này.

Khi xem xét bảng, bạn rút ra các kết luận sau:

- **STATUS không đủ điều kiện** vì nó rất có thể chứa giá trị trùng lặp. Khi doanh nghiệp phát triển, Mike sẽ có nhiều khách hàng "Valued."
- **CUSTHOME PHONE không đủ điều kiện** vì nó rất có thể chứa giá trị trùng lặp và dễ thay đổi khi mọi người chuyển khỏi điện thoại cố định sang smartphone. Dữ liệu mẫu cho thấy hai khách hàng có thể sống cùng nơi ở và có cùng số điện thoại.
- **CUSTFIRST NAME và CUSTLAST NAME không đủ điều kiện** vì chúng rất có thể chứa giá trị trùng lặp. Dữ liệu mẫu cho thấy tổ hợp tên và họ có thể đại diện nhiều hơn một khách hàng riêng biệt.

Các phát hiện này thuyết phục bạn thiết lập artificial candidate key cho bảng này. Bạn sau đó tạo trường tên CUSTOMER ID, xác nhận nó tuân thủ yêu cầu cho candidate key, và thêm trường mới vào cấu trúc bảng với chỉ định phù hợp.

Hình 8.11 cho thấy cấu trúc đã sửa của bảng CUSTOMERS.

**Hình 8.11** Bảng CUSTOMERS với artificial candidate key mới, CUSTOMER ID.

Bây giờ bạn lặp lại quy trình này cho mỗi bảng trong cơ sở dữ liệu. Nhớ đảm bảo mỗi bảng có ít nhất một candidate key.

Công việc tiếp theo là thiết lập primary key cho mỗi bảng. Như bạn biết, bạn chọn primary key cho bảng cụ thể từ tập candidate key khả dụng của bảng. Đây là vài điểm cần ghi nhớ khi chọn primary key cho bảng có hơn một candidate key:

- Chọn candidate key đơn (đơn trường) thay vì composite candidate key.
- Nếu có thể, chọn candidate key có tên bảng được đưa vào tên của nó.
- Chọn candidate key xác định tốt nhất chủ đề bảng hoặc ý nghĩa nhất với mọi người trong tổ chức.

Bạn bắt đầu làm việc với bảng EMPLOYEES trong Hình 8.12. Khi rà soát các candidate keys, bạn quyết định EMPLOYEE NUMBER là lựa chọn tốt hơn nhiều cho primary key so với tổ hợp EMPFIRST NAME và EMPLAST NAME vì nhân viên của Mike đã quen xác định bản thân bằng số được gán. Dùng EMPLOYEE NUMBER hoàn toàn hợp lý, nên bạn chọn nó làm primary key cho bảng.

**Hình 8.12** Cấu trúc bảng EMPLOYEES trong cơ sở dữ liệu Mike's Bikes.

Bây giờ bạn thực hiện nhiệm vụ cuối cùng trước khi chỉ định EMPLOYEE NUMBER là primary key chính thức của bảng: Bạn đảm bảo tuyệt đối nó xác định độc quyền giá trị của mỗi trường trong bản ghi cho trước. Vì vậy bạn kiểm tra EMPLOYEE NUMBER bằng cách làm theo các bước sau:

1. Tải bảng EMPLOYEES với dữ liệu mẫu.
2. Chọn một bản ghi cho mục đích kiểm tra và ghi chú giá trị hiện tại của EMPLOYEE NUMBER.
3. Xem xét giá trị của trường đầu tiên (trường ngay sau EMPLOYEE NUMBER) và tự hỏi:
   *Giá trị primary key này có xác định độc quyền giá trị hiện tại của \<tên trường\> không?*
   - Nếu câu trả lời là "có," chuyển sang trường tiếp theo và lặp lại câu hỏi.
   - Nếu câu trả lời là "không," loại trường khỏi bảng, chuyển sang trường tiếp theo và lặp lại câu hỏi. (Đảm bảo xác định liệu bạn có thể thêm trường vừa loại vào cấu trúc bảng khác không, nếu phù hợp, hoặc loại bỏ hoàn toàn vì nó thực sự không cần thiết.)
4. Tiếp tục quy trình này cho đến khi bạn đã xem xét mọi giá trị trường trong bản ghi.

Bạn biết sẽ phải loại bất kỳ trường nào chứa giá trị mà EMPLOYEE NUMBER không xác định độc quyền. Tuy nhiên EMPLOYEE NUMBER xác định độc quyền giá trị của mỗi trường trong bản ghi kiểm tra, nên bạn dùng nó làm primary key chính thức cho bảng EMPLOYEES và đánh dấu tên của nó bằng chữ "PK" trong cấu trúc bảng. Bạn sau đó lặp lại quy trình này với các bảng còn lại trong cơ sở dữ liệu mới của Mike cho đến khi mỗi bảng có primary key.

Nhớ ghi nhớ các quy tắc này khi thiết lập primary keys cho mỗi bảng:

- Mỗi bảng phải có một—và chỉ một—primary key.
- Mỗi primary key trong cơ sở dữ liệu nên duy nhất; không có hai bảng nào nên có cùng trường primary key (trừ khi chúng có mối quan hệ một-một hoặc một trong số đó là bảng tập con).

Khi làm việc với các bảng trong cơ sở dữ liệu của Mike, bạn nhớ bảng SERVICES là bảng tập con. Bạn đã tạo nó trong giai đoạn trước của quy trình thiết kế (ở Chương 7), và nó đại diện phiên bản cụ thể hơn của chủ đề được đại diện bởi bảng PRODUCTS. Trường PRODUCT NAME là thứ hiện liên kết bảng PRODUCTS với bảng tập con SERVICES. Tuy nhiên giờ bạn biết bảng tập con phải có cùng primary key với bảng mà nó liên quan, nên bạn sẽ dùng PRODUCT NUMBER (primary key của bảng PRODUCTS) làm primary key của bảng SERVICES. Hình 8.13 cho thấy các bảng PRODUCTS và SERVICES với primary keys của chúng.

**Hình 8.13** Thiết lập primary key cho bảng tập con SERVICES.

Công việc cuối cùng là tiến hành phỏng vấn với Mike và nhân viên của ông và rà soát tất cả công việc bạn đã thực hiện trên các bảng trong cơ sở dữ liệu. Khi tiến hành các cuộc phỏng vấn này, đảm bảo kiểm tra các mục sau:

- Các chủ đề phù hợp được đại diện trong cơ sở dữ liệu.
- Tên bảng và mô tả phù hợp và có ý nghĩa với mọi người.
- Tên trường phù hợp và có ý nghĩa với mọi người.
- Tất cả trường phù hợp được gán cho mỗi bảng.

Đến cuối buổi phỏng vấn, mọi người đồng ý các bảng có cấu trúc tốt và tất cả chủ đề họ quan tâm được đại diện trong cơ sở dữ liệu. Chỉ có một điểm nhỏ nảy sinh trong các thảo luận: Mike muốn thêm trường CALL PRIORITY vào bảng VENDORS. Có trường hợp nhiều hơn một nhà cung cấp cung cấp sản phẩm cụ thể, và Mike muốn tạo cách chỉ ra nhà cung cấp nào ông nên gọi trước nếu sản phẩm đó bất ngờ hết hàng. Vì vậy bạn thêm trường mới vào bảng VENDORS và kết thúc phỏng vấn.

---

## Tóm tắt

Chương mở đầu với thảo luận về tầm quan trọng của khóa. Bạn học có nhiều loại khóa khác nhau, và mỗi loại đóng vai trò khác nhau trong cơ sở dữ liệu. Mỗi khóa thực hiện chức năng cụ thể, như xác định duy nhất bản ghi, thiết lập nhiều loại tính toàn vẹn, và thiết lập mối quan hệ giữa các bảng. Giờ bạn biết có thể đảm bảo cấu trúc bảng vững chắc bằng cách đảm bảo khóa phù hợp được thiết lập cho mỗi bảng.

Chúng ta sau đó thảo luận quy trình thiết lập khóa cho mỗi bảng. Chúng ta bắt đầu bằng cách xác định bốn loại khóa chính: candidate, primary, foreign và non-keys. Đầu tiên, chúng ta xem quy trình thiết lập candidate keys cho mỗi bảng. Bạn học về Elements of a Candidate Key và cách đảm bảo trường (hoặc tập trường) tuân thủ các yếu tố này. Bạn sau đó học có thể tạo và dùng artificial candidate key khi không trường nào trong bảng có thể phục vụ làm candidate key hoặc khi trường mới sẽ tạo candidate key mạnh hơn bất kỳ trường candidate key hiện có nào.

Chương tiếp tục với thảo luận về primary keys. Bạn học chọn primary key từ tập candidate keys của bảng và primary key được chi phối bởi bộ yếu tố cụ thể. Chúng ta sau đó trình bày bộ hướng dẫn giúp xác định candidate key nào dùng làm primary key. Tiếp theo, bạn học cách đảm bảo primary key đã chọn xác định độc quyền bản ghi cho trước và tập giá trị trường của nó. Khi primary key không xác định độc quyền giá trị trường cụ thể, bạn biết phải loại trường khỏi bảng để đảm bảo tính toàn vẹn cấu trúc bảng. Bạn cũng biết mỗi bảng phải có primary key duy nhất, đơn lẻ.

Bạn sau đó học chỉ định các candidate key còn lại là alternate keys. Các khóa này sẽ hữu ích nhất khi bạn triển khai cơ sở dữ liệu trong chương trình RDBMS vì chúng cung cấp phương tiện thay thế để xác định bản ghi cho trước. Chúng ta sau đó thảo luận trường non-key, là bất kỳ trường nào không được chỉ định là candidate, primary, alternate hay foreign key. Giờ bạn biết trường non-key đại diện đặc điểm của chủ đề bảng và primary key xác định độc quyền giá trị của nó.

Table-level integrity là chủ đề thảo luận tiếp theo, và bạn học nó được thiết lập qua việc sử dụng primary keys và được thực thi bởi Elements of a Primary Key.

Chương kết thúc với hướng dẫn về tiến hành phỏng vấn thêm với người dùng và quản lý. Giờ bạn biết các cuộc phỏng vấn này cung cấp phương tiện rà soát công việc bạn đã thực hiện trên các bảng và giúp xác minh cùng xác thực cấu trúc cơ sở dữ liệu hiện tại.

---

## Câu hỏi ôn tập

1. Nêu ba lý do tại sao khóa quan trọng.
2. Bốn loại khóa chính là gì?
3. Mục đích của candidate key là gì?
4. Nêu bốn mục trong Elements of a Candidate Key.
5. Đúng hay Sai: Candidate key có thể gồm nhiều hơn một trường.
6. Bảng có thể có nhiều hơn một candidate key không?
7. Artificial candidate key là gì?
8. Khóa quan trọng nhất bạn gán cho bảng là gì?
9. Tại sao khóa này quan trọng?
10. Bạn thiết lập primary key thế nào?
11. Nêu bốn mục trong Elements of a Primary Key.
12. Bạn phải làm gì trước khi hoàn tất lựa chọn primary key?
13. Alternate key là gì?
14. Bạn đảm bảo gì khi thiết lập table-level integrity?
15. Tại sao bạn nên rà soát cấu trúc bảng ban đầu?

### Đáp án

1. (1) Đảm bảo mỗi bản ghi được xác định chính xác; (2) Thiết lập và thực thi tính toàn vẹn; (3) Thiết lập mối quan hệ bảng.
2. **Candidate key**, **primary key**, **foreign key** và **non-key**.
3. Định danh duy nhất mỗi bản ghi trong bảng.
4. Bất kỳ bốn trong số: không phải trường đa phần; chứa giá trị duy nhất; không chứa Null; không vi phạm bảo mật/quyền riêng tư; giá trị không tùy chọn; gồm số trường tối thiểu; xác định duy nhất và độc quyền mỗi bản ghi; xác định độc quyền giá trị mỗi trường; chỉ sửa trong trường hợp hiếm hoặc cực đoan.
5. **Đúng.** Candidate key có thể gồm nhiều trường (khóa tổ hợp).
6. **Có.** Một bảng có thể có nhiều candidate key.
7. Trường (hoặc tập trường) bạn tạo khi bảng không có candidate key tự nhiên—tuân thủ tất cả Elements of Candidate Key.
8. **Primary key**.
9. Nó xác định duy nhất mỗi bản ghi và là thành phần chính của table-level integrity.
10. Chọn từ candidate keys; chỉnh sửa đặc tả trường nếu cần; đánh dấu trong sơ đồ.
11. Giống Elements of Candidate Key—không đa phần, giá trị duy nhất, không Null, v.v.
12. Kiểm tra rằng primary key **xác định độc quyền giá trị mỗi trường**; loại bỏ trường nó không xác định.
13. Candidate key không được chọn làm primary key.
14. Mỗi bản ghi được xác định duy nhất; không có bản ghi trùng; mỗi khóa chính tuân thủ Elements.
15. Để xác minh cấu trúc đúng và phát hiện vấn đề trước khi thiết lập mối quan hệ.

---

Kết thúc nội dung Chương 8
