# Chương 7: Thiết lập cấu trúc bảng

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Thật là một sai lầm nghiêm trọng khi lý thuyết hóa trước khi có dữ liệu."*  
—SHERLOCK HOLMES, THE ADVENTURES OF SHERLOCK HOLMES

---

## Các chủ đề trong chương này

- Định nghĩa Danh sách bảng sơ bộ
- Định nghĩa Danh sách bảng cuối cùng
- Gán trường cho mỗi bảng
- Tinh chỉnh các trường
- Tinh chỉnh cấu trúc bảng
- Ví dụ: Thiết lập cấu trúc bảng
- Tóm tắt
- Câu hỏi ôn tập

---

## Nội dung chương đầy đủ

Tổ chức sử dụng cơ sở dữ liệu để theo dõi các chủ đề khác nhau quan trọng đối với họ. Ví dụ, phòng khám y tế theo dõi, trong số những thứ khác, bệnh nhân, bác sĩ và các cuộc hẹn; doanh nghiệp cho thuê thiết bị phải duy trì dữ liệu về khách hàng, thiết bị và hợp đồng thuê; văn phòng đăng ký quan tâm (ít nhất) đến sinh viên, giảng viên và khóa học. Trong mọi trường hợp—và trong bất kỳ kịch bản nào khác bạn có thể tưởng tượng—một bảng trong cơ sở dữ liệu đại diện mỗi chủ đề. Hơn nữa, mỗi bảng gồm các trường, đại diện các đặc điểm định nghĩa hoặc mô tả chủ đề của bảng. Bảng tạo nền tảng của cơ sở dữ liệu, và chúng đảm bảo nền tảng chắc chắn và vững vàng khi được thiết kế đúng cách.

---

## Định nghĩa Danh sách bảng sơ bộ

Trong phần này của quy trình thiết kế cơ sở dữ liệu, bạn sẽ định nghĩa Danh sách bảng sơ bộ mà bạn dùng để xác định và thiết lập các bảng cho cơ sở dữ liệu mới. Bạn sẽ dùng ba quy trình để phát triển danh sách này. Quy trình đầu liên quan đến việc sử dụng Danh sách trường sơ bộ, quy trình thứ hai liên quan đến việc sử dụng danh sách chủ đề bạn thu thập trong quá trình phỏng vấn, và quy trình thứ ba liên quan đến việc sử dụng mục tiêu sứ mệnh bạn định nghĩa ở đầu quy trình thiết kế cơ sở dữ liệu. Sau đó bạn chuyển sang xây dựng cấu trúc mỗi bảng bằng các trường từ Danh sách trường sơ bộ.

### Xác định chủ đề ngụ ý

Quá trình định nghĩa các bảng cho cơ sở dữ liệu bắt đầu với việc rà soát Danh sách trường sơ bộ. Mục tiêu của bạn là xác định các chủ đề được ngụ ý bởi các trường trên danh sách.

Bạn có thể thắc mắc tại sao bạn rà soát Danh sách trường sơ bộ thay vì bắt đầu với danh sách chủ đề. Danh sách chủ đề có vẻ là điểm khởi đầu trực quan hơn. Rốt cuộc, bạn đã cẩn thận xây dựng danh sách này trong quá trình phỏng vấn, và bạn đã bị ảnh hưởng bởi các cuộc trò chuyện với người dùng và quản lý. Chắc chắn, tất cả điều này đã giúp bạn xác định mọi chủ đề cần được đại diện trong cơ sở dữ liệu. Bạn có thể đúng, nhưng bạn có thể gặp vấn đề nhỏ nếu bạn sai: thiếu bảng.

Nghiên cứu các trường trên danh sách trường chính giúp bạn xác định chủ đề từ góc nhìn không thiên lệch—bạn đang để các trường "nói" với bạn. Điều quan trọng là bây giờ bạn nhìn danh sách này càng khách quan càng tốt, như thể bạn chưa từng thấy nó trước đây, không có bất kỳ thành kiến nào bạn đã tiếp thu trong quá trình phỏng vấn. Điều này cho phép bạn thấy cách một số nhóm trường gợi ý các chủ đề cụ thể, một số có thể chưa được xác định trong quá trình phỏng vấn. Bạn cũng có thể dùng Danh sách trường sơ bộ để xác minh nhiều chủ đề trên danh sách chủ đề. Sử dụng Danh sách trường sơ bộ theo những cách này cho phép bạn kiểm chéo công việc trước đó và giúp đảm bảo cấu trúc cơ sở dữ liệu mới bao gồm tất cả chủ đề cần thiết.

Khi rà soát Danh sách trường sơ bộ, hãy tự hỏi liệu một tập trường nào đó có định nghĩa hoặc mô tả một chủ đề cụ thể hay không. Chuyển sang tập trường khác nếu không có gì nảy ra ngay. Khi bạn có thể suy ra một chủ đề từ trường trong danh sách, nhập chủ đề đó vào Danh sách bảng sơ bộ mới. Hình 7.1 cho thấy mẫu một phần của Danh sách trường sơ bộ và minh họa cách một tập trường có thể gợi ý một chủ đề.

Tiếp tục rà soát cho đến khi bạn đã quét tất cả trường và xác định càng nhiều chủ đề càng tốt. Nhớ thêm mỗi chủ đề bạn xác định vào Danh sách bảng sơ bộ. Danh sách này sẽ phát triển khi bạn làm việc với danh sách chủ đề và mục tiêu sứ mệnh. Hình 7.2 cho thấy ví dụ phiên bản đầu của Danh sách bảng sơ bộ.

### Sử dụng danh sách chủ đề

Bây giờ, tạo phiên bản thứ hai của Danh sách bảng sơ bộ bằng cách gộp danh sách chủ đề (tạo trong các cuộc phỏng vấn với người dùng và quản lý) với phiên bản đầu của Danh sách bảng sơ bộ (biên soạn bằng cách nghiên cứu Danh sách trường sơ bộ). Phiên bản mới này chứa danh sách bảng hoàn chỉnh hơn. Gộp hai danh sách là quy trình ba bước: giải quyết mục trùng, giải quyết mục đại diện cùng chủ đề, và kết hợp các mục còn lại vào một danh sách.

#### Bước 1: Giải quyết mục trùng

Bắt đầu bước này bằng cách rà soát và kiểm chéo mỗi mục trên danh sách chủ đề với các mục trên Danh sách bảng sơ bộ. Mục tiêu của bạn ở đây là xác định các mục trùng—các mục trên danh sách chủ đề đã xuất hiện trên Danh sách bảng sơ bộ. Bạn phải rất cẩn thận cách giải quyết các mục trùng tìm được. Bắt đầu bằng cách xác định liệu các mục có đại diện chủ đề khác nhau không, bất chấp việc chúng có cùng tên. (Dùng ghi chép phỏng vấn nếu cần để giúp quyết định.) Nếu chúng đại diện chủ đề khác nhau, đổi tên mỗi mục để nó xác định chính xác chủ đề nó đại diện rồi thêm cả hai mục vào Danh sách bảng sơ bộ; nếu không, xác định liệu chúng có thực sự đại diện cùng chủ đề không. Khi bạn kết luận cả hai mục đều đại diện cùng chủ đề, gạch bỏ mục trên danh sách chủ đề và giữ mục xuất hiện trên Danh sách bảng sơ bộ. Tiếp tục rà soát cho đến khi bạn đã kiểm tra tất cả mục trên cả danh sách chủ đề và Danh sách bảng sơ bộ. Hãy xem ví dụ quy trình này.

Giả sử bạn đang phát triển cơ sở dữ liệu cho doanh nghiệp cho thuê thiết bị, và bạn đang làm việc với danh sách chủ đề và Danh sách bảng sơ bộ như trong Hình 7.3.

Khi rà soát các danh sách này, bạn phát hiện hai mục trùng: "Equipment" và "Rental Agreements." Các mục này cần xem xét thêm, nên bạn bắt đầu với "Equipment" và thử xác định liệu mỗi thể hiện có đại diện chủ đề khác không. Khi rà soát ghi chép phỏng vấn, bạn thấy "Equipment" trên danh sách chủ đề đại diện các mục như công cụ, thiết bị gia dụng và thiết bị nghe nhìn. Bạn nhớ rằng "Equipment" trên Danh sách bảng sơ bộ cũng bao gồm xe tải, xe van và rơ-moóc. Bạn rà soát ghi chép phỏng vấn thêm và phát hiện thuê xe được xử lý khác thuê "thiết bị thông thường." Do đó, mỗi thể hiện của "Equipment" thực sự đại diện chủ đề khác. Bạn giải quyết trùng lặp bằng cách giữ một thể hiện "Equipment" và đổi tên thể hiện kia thành "Vehicles." Sau đó bạn liệt kê cả hai mục trên Danh sách bảng sơ bộ.

Bây giờ bạn làm tương tự với "Rental Agreements." May mắn là bạn phát hiện cả hai thể hiện có ý nghĩa hoàn toàn giống nhau. Việc duy nhất bạn phải làm trong trường hợp này là gạch bỏ "Rental Agreements" trên danh sách chủ đề. Bây giờ bạn có thể tiếp tục rà soát cho đến khi đã kiểm tra từng mục trên danh sách chủ đề. Hình 7.4 cho thấy danh sách chủ đề đã sửa và Danh sách bảng sơ bộ.

#### Bước 2: Giải quyết mục đại diện cùng chủ đề

Mục tiêu của bạn trong bước này của quy trình gộp là xác định liệu một mục trên danh sách chủ đề và một mục trên Danh sách bảng sơ bộ có đại diện cùng chủ đề dù chúng có tên khác nhau hay không. Khi bạn xác định được cặp mục như vậy, chọn tên mô tả tốt nhất chủ đề và dùng làm định danh duy nhất cho chủ đề đó, rồi xử lý tên theo cách sau:

- Nếu tên bạn chọn đã xuất hiện trên Danh sách bảng sơ bộ, gạch bỏ mục tương ứng trên danh sách chủ đề.
- Nếu tên xuất hiện trên danh sách chủ đề, loại mục tương ứng trên Danh sách bảng sơ bộ và thay bằng tên từ danh sách chủ đề.

Lặp lại quy trình này cho đến khi bạn đã xử lý tất cả mục trên danh sách chủ đề.

Tiếp tục với ví dụ doanh nghiệp cho thuê thiết bị, giả sử bạn phát hiện "Clients" và "Employees" trên danh sách chủ đề và "Customers" và "Sales Reps" trên Danh sách bảng sơ bộ đại diện (tương ứng) cùng chủ đề (xem Hình 7.4). Quyết định xử lý "Clients" và "Customers" trước, bạn rà soát ghi chép phỏng vấn và xác định "Customers" là tên mô tả tốt nhất cả người và tổ chức thuê thiết bị từ doanh nghiệp. Bạn giải quyết trùng lặp bằng cách giữ "Customers" và gạch bỏ "Clients." Chuyển sang cặp mục trùng tiếp theo, bạn quyết định giữ "Employees" và loại "Sales Reps" vì bạn tin "Employees" mô tả tốt nhất những người được doanh nghiệp tuyển dụng, bất kể vị trí. Hình 7.5 cho thấy phiên bản đã sửa của cả hai danh sách và cách giải quyết các mục trùng.

#### Bước 3: Kết hợp mục trên danh sách chủ đề và Danh sách trường sơ bộ

Bước cuối của quy trình này là dễ nhất trong ba bước. Tất cả bạn làm là thêm các mục còn lại từ danh sách chủ đề vào Danh sách bảng sơ bộ. Loại bỏ danh sách chủ đề—bạn không cần nó nữa. Danh sách còn lại trở thành phiên bản thứ hai của Danh sách bảng sơ bộ. Chỉ vậy thôi! Hình 7.6 cho thấy phiên bản thứ hai của Danh sách bảng sơ bộ, kết quả của việc gộp hai danh sách trong Hình 7.5.

### Sử dụng mục tiêu sứ mệnh

Trong quy trình thứ ba và cuối cùng này, bạn dùng mục tiêu sứ mệnh để xác định liệu bạn có bỏ sót chủ đề nào trong hai quy trình trước không. Đây là cơ hội cuối cùng để thêm bảng vào Danh sách bảng sơ bộ.

Bắt đầu với mục tiêu sứ mệnh đầu tiên và dùng Kỹ thuật xác định chủ đề để xác định các chủ đề được đại diện trong phát biểu đó. Ghi từng chủ đề bạn xác định trên tờ giấy riêng rồi kiểm chéo với các mục trên Danh sách bảng sơ bộ. Dùng cùng kỹ thuật ở đây mà bạn dùng trong quy trình trước.

1. Khi mục bạn ghi từ phát biểu mục tiêu sứ mệnh khớp với mục trên Danh sách bảng sơ bộ, xác định liệu các mục có đại diện chủ đề khác không. Nếu có, gán tên phù hợp cho mỗi thể hiện rồi thêm từng mục vào Danh sách bảng sơ bộ; nếu không, gạch bỏ mục trùng bạn đã ghi.
2. Khi mục bạn ghi từ phát biểu mục tiêu sứ mệnh có tên đồng nghĩa với tên mục trên Danh sách bảng sơ bộ và cả hai mục đại diện cùng chủ đề, chọn tên xác định tốt nhất chủ đề đó và dùng trong Danh sách bảng sơ bộ.
3. Khi mục bạn ghi từ phát biểu mục tiêu sứ mệnh đại diện chủ đề mới, thêm vào Danh sách bảng sơ bộ.

Lặp lại các bước này cho đến khi bạn đã xử lý tất cả mục tiêu sứ mệnh. Đây là ví dụ cách bạn dùng các kỹ thuật này để rà soát mục tiêu sứ mệnh.

Giả sử bạn đang thiết kế cơ sở dữ liệu cho trường đào tạo bay. Bạn vừa bắt đầu quy trình này, và bạn vừa dùng Kỹ thuật xác định chủ đề trên phát biểu sau:

*Chúng ta cần duy trì dữ liệu về phi công và chứng chỉ của họ.*

Bây giờ bạn kiểm chéo các chủ đề bạn xác định trong mục tiêu sứ mệnh này với các mục trong Danh sách bảng sơ bộ như trong Hình 7.7.

Trong trường hợp này, bạn gạch bỏ "pilots" trong phát biểu mục tiêu sứ mệnh vì nó đã tồn tại trên Danh sách bảng sơ bộ và đại diện cùng chủ đề. Sau đó bạn quyết định xem xét "certifications" kỹ hơn, và sau khi suy nghĩ cẩn thận, bạn có các nhận xét sau:

- Nó không xuất hiện trên Danh sách bảng sơ bộ.
- Nó không trùng bất kỳ mục nào trên Danh sách bảng sơ bộ.
- Tên của nó không đồng nghĩa với bất kỳ mục nào trên Danh sách bảng sơ bộ.
- Nó không đại diện cùng chủ đề với bất kỳ mục nào khác trên Danh sách bảng sơ bộ.

Các phát hiện này cho thấy "certifications" là mục mới và nên được thêm vào Danh sách bảng sơ bộ. Vì vậy bạn thêm nó vào Danh sách bảng sơ bộ và gạch bỏ trên phát biểu mục tiêu sứ mệnh; điều này cho thấy bạn đã xử lý mục này. Hình 7.8 cho thấy phiên bản đã sửa của Danh sách bảng sơ bộ.

---

## Định nghĩa Danh sách bảng cuối cùng

Danh sách bảng sơ bộ của bạn đã hoàn chỉnh nhất có thể vào lúc này, nên bạn sẽ chuyển nó thành Danh sách bảng cuối cùng. Danh sách mới này kết hợp hai thành phần chưa có trên Danh sách bảng sơ bộ: loại bảng và mô tả bảng. Hình 7.9 cho thấy ví dụ Danh sách bảng cuối cùng.

Loại bảng cho phép bạn phân loại bảng theo vai trò nó đóng trong cơ sở dữ liệu và cung cấp phương tiện xác định các bảng hoạt động tương tự. Vai trò của bảng xác định loại của nó, và bạn có thể gán bốn loại bảng cho một bảng:

1. **Bảng dữ liệu** đại diện chủ đề quan trọng với tổ chức và là nền tảng chính của thông tin cơ sở dữ liệu cung cấp. (Bạn sẽ học thêm về bảng dữ liệu sau trong chương này.)
2. **Bảng liên kết** thiết lập liên kết giữa hai bảng trong mối quan hệ nhiều-nhiều. (Chương 10, "Mối quan hệ bảng," trình bày chi tiết hơn về bảng liên kết.)
3. **Bảng tập con** chứa các trường liên quan đến bảng dữ liệu cụ thể và mô tả thêm chủ đề của bảng dữ liệu theo cách rất cụ thể. (Bạn sẽ học thêm về bảng tập con sau trong chương này.)
4. **Bảng xác thực** chứa dữ liệu tương đối tĩnh và là thành phần quan trọng của tính toàn vẹn dữ liệu. (Chương 11, "Quy tắc nghiệp vụ," cung cấp chi tiết thêm về loại bảng này.)

Mô tả bảng cung cấp định nghĩa rõ ràng về chủ đề được bảng đại diện và nêu tại sao chủ đề quan trọng với tổ chức. Một số hướng dẫn chi phối cách tạo mô tả bảng, và bạn sẽ học về chúng sau trong chương này. Bạn còn một nhiệm vụ cuối cùng trước khi chuyển Danh sách bảng sơ bộ thành Danh sách bảng cuối cùng: tinh chỉnh tên bảng.

### Tinh chỉnh tên bảng

Đặt tên cho bảng phức tạp hơn bạn có thể nhận ra lúc này. Như bạn đã học ở Chương 3, "Thuật ngữ," một bảng đại diện một chủ đề duy nhất; do đó tên của nó phải xác định rõ chủ đề nó đại diện.

#### Hướng dẫn tạo tên bảng

Các hướng dẫn sau sẽ giúp bạn tạo tên bảng rõ ràng, không mơ hồ, mô tả rõ và có ý nghĩa. Chúng cũng giúp đảm bảo bạn đặt tên bảng nhất quán.

- **Tạo tên duy nhất, mô tả rõ và có ý nghĩa với toàn bộ tổ chức.** Dùng tên duy nhất giúp đảm bảo mỗi bảng đại diện rõ chủ đề khác nhau và mọi người trong tổ chức hiểu bảng đại diện gì. (Nếu bạn gặp tên bảng trùng lúc này, giải quyết bằng kỹ thuật bạn đã học trước trong chương này.) Chọn tên mô tả đủ để tự giải thích. "Vehicle Maintenance" là ví dụ tên mô tả rõ tốt. Định nghĩa tên duy nhất và mô tả rõ đòi hỏi công sức của bạn, nhưng rất đáng trong dài hạn.

- **Tạo tên chính xác, rõ ràng và không mơ hồ xác định chủ đề của bảng.** Tên mơ hồ hoặc không rõ thường cho thấy bảng đại diện nhiều hơn một chủ đề. Khi gặp tên như vậy, xác định các chủ đề bảng thực sự đại diện rồi coi mỗi chủ đề là bảng riêng. "Dates" là ví dụ tốt về tên bảng mơ hồ. Bạn thực sự không biết bảng đại diện gì nếu không tham chiếu mô tả của nó. Ví dụ, giả sử bạn đang thiết kế cơ sở dữ liệu cho đại lý giải trí và bảng này xuất hiện trong Danh sách bảng sơ bộ. Khi thấy tên bảng này, bạn quyết định rà soát ghi chép phỏng vấn. Bạn phát hiện một người nói "Dates" đại diện cuộc hẹn gặp khách hàng, và người khác nói nó đại diện ngày đặt chỗ cho đội ngũ nghệ sĩ của đại lý. Bảng này rõ ràng đại diện hai chủ đề, nên bạn loại "Dates" khỏi Danh sách bảng sơ bộ và thay bằng hai bảng mới tên "Client Meetings" và "Entertainer Schedules."
  Có lẽ tên mơ hồ và không rõ nhất bạn có thể gán cho bảng là "Miscellaneous." Nó không xác định một chủ đề duy nhất nào. Bạn đôi khi có thể cảm thấy buộc phải tạo bảng "Miscellaneous" vì bạn không thể nghĩ ra phải làm gì với một số trường trên Danh sách trường sơ bộ. Khi đó xảy ra, dừng lại, nghỉ ngơi, rồi quay lại và xem xét kỹ những trường đó. Áp dụng cẩn thận và có phương pháp các kỹ thuật thiết kế bạn đã học, và chắc chắn bạn sẽ xác định được phải làm gì với các trường.

- **Dùng số từ tối thiểu cần thiết để truyền tải chủ đề của bảng.** Mọi người trong tổ chức phải có thể xác định bảng đại diện gì mà không cần đọc mô tả. Dù mục tiêu của bạn là tạo tên bảng ngắn gọn, tránh cách tiếp cận tối giản. "TD_1" là ví dụ tốt về tên cực kỳ ngắn. Bạn sẽ không có ý niệm bảng đại diện gì trừ khi bạn biết ý nghĩa từng ký tự trong tên. Bạn cũng nên tránh đi theo hướng ngược lại. "Multiuse Vehicle Maintenance Equipment" quá dài và có thể dễ dàng rút gọn thành "Equipment."

- **Không dùng từ biểu đạt đặc điểm vật lý.** Tránh dùng từ như file, record và table trong tên bảng vì chúng thêm mức độ nhầm lẫn không cần thiết. Tên bảng chứa loại từ này rất có thể đại diện nhiều hơn một chủ đề. Hãy xem xét tên "Patient Record." Trên bề mặt, đây có vẻ là tên chấp nhận được. Tuy nhiên bạn sẽ nhận ra có vấn đề tiềm ẩn với tên này khi dành thời gian nghĩ "patient record" phải đại diện gì. Tên chứa từ bạn đang cố tránh (record), và có thể đại diện ba chủ đề: "patients," "doctors" và "examinations." Với suy nghĩ này, loại "patients" khỏi Danh sách bảng sơ bộ và thay bằng ba bảng mới, mỗi chủ đề một bảng.

- **Không dùng chữ viết tắt và viết tắt.** Chữ viết tắt khó giải mã, viết tắt hiếm khi truyền tải chủ đề của bảng, và cả hai vi phạm hướng dẫn đầu trong danh sách này. Lấy chữ viết tắt làm ví dụ. Giả sử bạn đang giúp tổ chức sửa cấu trúc cơ sở dữ liệu và bạn gặp bảng tên "SC." Làm sao bạn biết bảng đại diện gì nếu không biết ý nghĩa các chữ cái? Sự thật là bạn không thể dễ dàng xác định chủ đề của bảng. Hơn nữa, bạn có thể thấy bảng có ý nghĩa khác với từng phòng ban trong tổ chức. Vì vậy bạn quyết định tiến hành phỏng vấn ngắn với một số nhân viên để xác định các chữ cái đại diện gì. (Đây là phần đáng sợ.) Đến kinh ngạc, bạn phát hiện nhân sự nghĩ nó là "Steering Committees"; nhân viên hệ thống thông tin tin là "System Configurations"; và nhân viên an ninh khẳng định nó đại diện "Security Codes." Ví dụ này minh họa rõ tại sao bạn nên cố gắng hết sức tránh dùng viết tắt và chữ viết tắt trong tên bảng.

- **Không dùng tên riêng hoặc từ khác hạn chế không đáng kể dữ liệu có thể nhập vào bảng.** Hướng dẫn này giữ bạn không rơi vào bẫy tạo cấu trúc bảng trùng. Tên như "Southwest Region Employees" chẳng hạn hạn chế nghiêm trọng dữ liệu bạn có thể nhập vào bảng này. Khi tổ chức phát triển, bạn xử lý nhân viên từ vùng khác thế nào? Khi tổ chức bắt đầu tuyển nhân viên ở Washington, Oregon và Idaho, bạn phải tạo bảng "Pacific Northwest Region Employees," và phải tạo bảng "Western Region Employees" khi tổ chức bắt đầu tuyển ở Arizona, Utah, Nevada và California. Nguyên tắc thiết kế cơ sở dữ liệu đúng đắn quy định bạn không nên tạo cấu trúc trùng như vậy vì chúng có thể khá có vấn đề:
  1. Người dùng có thể gặp khó khi truy xuất dữ liệu từ cả ba bảng cùng lúc.
  2. Người duy trì cơ sở dữ liệu sẽ có trách nhiệm bổ sung đảm bảo các bảng luôn đồng bộ về cấu trúc. Nếu anh ta thêm, sửa hoặc xóa trường trong một bảng, anh ta phải thực hiện hành động tương tự trên tất cả bảng khác.
  3. Người duy trì cơ sở dữ liệu cũng có trách nhiệm bổ sung đảm bảo tính toàn vẹn dữ liệu đồng bộ giữa các bảng. Anh ta phải đảm bảo dữ liệu được chuyển hoàn toàn và chính xác từ bảng này sang bảng kia khi nhân viên chuyển từ vùng này sang vùng khác.

- **Không dùng tên ngầm hoặc tường minh xác định nhiều hơn một chủ đề.** Đây là một trong những sai lầm phổ biến nhất bạn có thể mắc với tên bảng, và tương đối dễ xác định. Loại tên này thường chứa từ *and* hoặc *or* và ký tự như gạch chéo (\) hoặc ký tự &; ví dụ gồm "Department or Branch" và "Facility\Building." Bảng với tên mơ hồ gợi ý bạn có thể chưa xác định chủ đề rõ ràng hoặc chính xác trong quá trình phân tích và phỏng vấn. Bạn có thể sửa vấn đề này bằng cách rà soát ghi chép và tiến hành phân tích và phỏng vấn thêm nếu cần. Chỉ nhớ bạn phải luôn đảm bảo mỗi bảng đại diện chỉ một chủ đề.
  Một tên khác thuộc loại này là "Miscellaneous." (Vâng, lại tên đó!) Lúc nãy tôi nói tên này không xác định một chủ đề duy nhất nào; đây là phát biểu đúng và hợp lệ. Tuy nhiên cũng đúng là tên ngầm xác định nhiều hơn một chủ đề; bạn không thể xác định cụ thể các chủ đề vì tên mơ hồ và không rõ. Từ điển trực tuyến Merriam-Webster định nghĩa chính từ đó như sau:
  *Miscellaneous adj. 1. gồm các thứ hoặc thành viên đa dạng; không đồng nhất. 2. có nhiều đặc điểm.*
  Bạn có thể thấy rõ vấn đề tên này tạo ra, nên bạn không nên dùng nó làm tên bảng. Có lý do chính đáng để không làm vậy.

- **Dùng dạng số nhiều của tên.** Như bạn biết, bảng đại diện một chủ đề duy nhất, có thể là đối tượng hoặc sự kiện. Bạn có thể mở rộng định nghĩa này và nói bảng đại diện tập hợp các đối tượng hoặc sự kiện tương tự. Ví dụ, đại diện bán hàng muốn duy trì dữ liệu về tất cả khách hàng của anh ta, không chỉ một; và doanh nghiệp cho thuê xe muốn theo dõi tất cả xe, không chỉ chiếc BMW xanh. Dùng dạng số nhiều của tên bảng là ý tưởng hợp lý vì nó làm rõ ý định bạn đề cập tập hợp. Tập hợp, tất nhiên, luôn dùng số nhiều ("Boats," không phải "Boat"). Ngược lại, từ xác định trường luôn ở số ít ("Home Phone," không phải "Home Phones"). Tuân theo quy tắc này sẽ giúp bạn dễ dàng phân biệt tên bảng và tên trường trong mọi tài liệu bạn tạo cho cơ sở dữ liệu. (Khi đổi tên bảng, nhớ dạng số nhiều của một số từ không kết thúc bằng -s hoặc -es. Ví dụ, dạng số ít và số nhiều của "equipment" hoàn toàn giống nhau.)

Dùng các hướng dẫn này để tinh chỉnh mỗi tên bảng trên Danh sách bảng sơ bộ. Khi hoàn thành, danh sách này trở thành Danh sách bảng cuối cùng của bạn và duy trì như vậy trong suốt quy trình thiết kế cơ sở dữ liệu. Lưu ý danh sách "cuối cùng" chỉ theo nghĩa bạn đã tính đến tất cả bảng bạn xác định trong toàn bộ quá trình phân tích. Rất có thể bạn sẽ thêm bảng mới vào danh sách dựa trên yêu cầu do mối quan hệ, tính toàn vẹn dữ liệu hoặc thông tin khác bạn phát triển.

**Lưu ý:** Hướng dẫn dùng dạng số nhiều cho tên bảng đặc biệt hữu ích khi bạn làm việc với thiết kế logic của cơ sở dữ liệu. Nó giúp rất dễ phân biệt tên bảng với tên trường, đặc biệt khi hiển thị trên màn hình chiếu hoặc khi viết lên bảng trắng trong phòng họp. Tuy nhiên nhớ rằng tên bảng có thể thay đổi sau khi bạn (hoặc nhà phát triển phụ trách triển khai cơ sở dữ liệu) bắt đầu triển khai cơ sở dữ liệu vào ứng dụng RDBMS cụ thể. Tên sau đó cần tuân theo quy ước đặt tên chuẩn của tổ chức bạn hoặc nhà phát triển thường dùng cho RDBMS.

### Chỉ định loại bảng

Như bạn đã học trước trong chương này, bạn chỉ định loại mỗi bảng trên Danh sách bảng cuối cùng. Nhắc lại bốn phân loại bạn có thể dùng để xác định loại bảng: data, linking, subset và validation.

Khi lần đầu tạo Danh sách bảng cuối cùng, mọi mục trên danh sách là bảng dữ liệu vì đại diện chủ đề quan trọng với tổ chức và phục vụ nền tảng chính của thông tin cơ sở dữ liệu cung cấp. Sẽ không có bảng liên kết hay bảng xác thực trên danh sách vì bạn chưa định nghĩa mối quan hệ hay áp đặt tính toàn vẹn dữ liệu. (Bạn sẽ giải quyết các vấn đề này sau trong quy trình thiết kế.) Danh sách sẽ không chứa bảng tập con vì bạn định nghĩa chúng sau khi gán trường cho bảng dữ liệu.

Tạm thời, chỉ định mỗi bảng trên Danh sách bảng cuối cùng là bảng dữ liệu. Bạn sẽ gán loại bảng khác sau khi quy trình thiết kế cơ sở dữ liệu tiếp tục triển khai.

### Soạn mô tả bảng

Mô tả bảng là khía cạnh khác của bảng bạn ghi trên Danh sách bảng cuối cùng. Mô tả bảng quan trọng vì giúp mọi người hiểu tại sao bảng nhất định tồn tại và tại sao tổ chức quan tâm thu thập dữ liệu cho bảng đó. Trên thực tế, mô tả phải định nghĩa tường minh bảng và nêu tầm quan trọng của nó với tổ chức. Không quan trọng định nghĩa đến trước hay bạn dùng nhiều câu để truyền tải thông tin này. Cả định nghĩa và giải thích tầm quan trọng của bảng đều phải có trong mô tả. Mô tả bảng cũng cung cấp phương tiện xác thực nhu cầu bảng. Nếu bạn không thể giải thích tại sao bảng quan trọng với tổ chức, thì bạn cần xác định khi nào và bằng cách nào bảng được xác định và liệu nó có cần thiết hay không.

#### Hướng dẫn soạn mô tả bảng

Giống như bạn có hướng dẫn giúp định nghĩa tên bảng, bạn cũng có bộ hướng dẫn giúp soạn mô tả bảng tập trung, ngắn gọn, không mơ hồ và rõ ràng:

- **Bao gồm phát biểu định nghĩa chính xác bảng.** Bất kỳ ai cũng phải dễ dàng xác định định danh của bảng từ mô tả mà không nhầm lẫn hay không chắc chắn. Đây là ví dụ định nghĩa kém cho bảng tên "Suppliers" trong cơ sở dữ liệu tiệm bánh. Như bạn thấy, nó không chính xác lắm:
  *Suppliers—Các công ty cung cấp nguyên liệu và thiết bị cho chúng ta*
  
  Nếu tiệm bánh nhận một số nguyên liệu từ nông dân nhỏ địa phương thì sao? Nông dân nhỏ chắc chắn không đủ tư cách "công ty." Loại thiết bị nào những nhà cung cấp này cung cấp? Dụng cụ nấu ăn? Xe đẩy tay? Kệ giao hàng? Đây là định nghĩa tốt hơn nhiều về suppliers:
  *Suppliers—Người và tổ chức mà chúng ta mua nguyên liệu và thiết bị*
  
  Phát biểu này có thể dùng trong mô tả bảng làm định nghĩa bảng.

- **Bao gồm phát biểu giải thích tại sao bảng này quan trọng với tổ chức.** Bảng chứa dữ liệu tổ chức thu thập, duy trì, thao tác và truy xuất vì lý do cụ thể. Phát biểu của bạn nên giải thích tại sao dữ liệu quan trọng với tổ chức. Nhớ phát biểu này trở thành phần mô tả bảng của bạn, bạn có thể bị cám dỗ xây dựng phát biểu như sau:
  *Chúng ta cần bảng Suppliers để theo dõi tên, địa chỉ, số điện thoại và tên liên hệ của tất cả nhà cung cấp.*
  
  Phát biểu này không đầy đủ vì chỉ nhấn mạnh cần lưu gì trong bảng Suppliers thay vì làm rõ tại sao dữ liệu quan trọng với kinh doanh. Ví dụ tiếp theo truyền tải tốt hơn lý do thông tin quan trọng:
  *Thông tin nhà cung cấp quan trọng với tiệm bánh vì cho phép chúng ta duy trì nguồn cung nguyên liệu thường xuyên và đảm bảo thiết bị luôn hoạt động tốt.*
  
  Đây là phát biểu hiệu quả hơn vì truyền tải tầm quan trọng của dữ liệu bằng cách xác định dịch vụ nhà cung cấp cung cấp cho tiệm bánh. Nó cũng ngụ ý tiệm bánh có thể hết nguyên liệu hoặc gặp khó giữ thiết bị ở trạng thái tốt nhất nếu không có dịch vụ nhà cung cấp. Phát biểu này giờ phản ánh tại sao bảng quan trọng với tổ chức.

- **Soạn mô tả rõ ràng và ngắn gọn.** Tránh sai lầm phổ biến là lặp lại hoặc diễn đạt lại tên bảng trong mô tả bảng, như trong ví dụ này:
  *Student Schedule—Lịch lớp của sinh viên*
  
  Đừng quá ngắn hoặc quá dài dòng. Bạn muốn đảm bảo mọi người xác định được bảng và hiểu tầm quan trọng với tổ chức, nhưng cũng tránh cung cấp quá nhiều thông tin. Đây là ví dụ mô tả khá dài và cung cấp nhiều thông tin hơn cần thiết:
  *Student Schedule—Tất cả lớp sinh viên sẽ tham gia (gồm ngày, giờ và giảng viên phụ trách lớp) trong năm học. Dữ liệu trong bảng này quan trọng vì sẽ cho sinh viên biết tên lớp và khi nào ở đâu. Sinh viên cũng biết thời lượng lớp và tên giáo viên dạy lớp.*
  
  Có thể diễn đạt rõ ràng và ngắn gọn hơn như sau:
  *Student Schedule—Các lớp sinh viên được lên lịch tham gia trong năm học này. Thông tin bảng này cung cấp giúp sinh viên quản lý thời gian hiệu quả và cho phép trường tính tải lớp và tải sinh viên.*
  
  Câu đầu trong ví dụ này cung cấp định nghĩa bảng, và câu thứ hai nêu tại sao bảng quan trọng với tổ chức học thuật.

- **Không bao gồm thông tin triển khai cụ thể trong mô tả bảng**, như cách hoặc nơi bảng được sử dụng. Tránh phát biểu cho biết cách bạn sẽ cụ thể sử dụng bảng này, hoặc cách truy cập vật lý. Loại thông tin này liên quan quá trình triển khai cơ sở dữ liệu, tách biệt hoàn toàn với quy trình thiết kế cơ sở dữ liệu bạn đang học trong sách này. Đây là ví dụ mô tả chứa loại thông tin không phù hợp này:
  *Student Schedule—Các lớp sinh viên được lên lịch tham gia trong năm học này. Thông tin này được văn phòng đăng ký sử dụng và được truy cập từ menu Student Admissions trong Chương trình Đăng ký.*

- **Không làm mô tả bảng của một bảng phụ thuộc vào mô tả bảng của bảng khác.** Mỗi mô tả bảng phải tự giải thích và độc lập với mọi mô tả bảng khác; tuyệt đối không cần thiết phải tham chiếu chéo mô tả bảng này với mô tả bảng kia. Đây là loại phát biểu bạn đang cố tránh:
  *Dependents—Vợ/chồng, con hoặc người được giám hộ của nhân viên cho trước. (Xem mô tả bảng Employee để biết thêm.)*
  
  Đây là mô tả tốt hơn nhiều:
  *Dependents—Vợ/chồng, con hoặc người được giám hộ của nhân viên cho trước. Thông tin này cho phép chúng ta thực hiện khấu trừ thuế phù hợp cho nhân viên và cần thiết cho chương trình phúc lợi nhân viên tham gia.*

- **Không dùng ví dụ trong mô tả bảng.** Ví dụ là công cụ giao tiếp có giá trị giúp truyền tải ý nghĩa hoặc khái niệm cụ thể và rất hiệu quả khi dùng đúng cách. Tuy nhiên, ví dụ phụ thuộc thông tin bổ sung (và trong một số trường hợp, ví dụ thêm) để hoàn thiện ý tưởng nó phải truyền tải. Chẳng hạn, hãy nghĩ số ví dụ bạn phải dùng để định nghĩa đầy đủ bảng đại diện gì. Mô tả định nghĩa tốt rõ ràng, ngắn gọn và tự giải thích; do đó không cần ví dụ để truyền tải ý nghĩa.

### Phỏng vấn người dùng và quản lý

Bây giờ bạn sẽ định nghĩa mô tả bảng cho các bảng trên Danh sách bảng cuối cùng. Bạn sẽ tiến hành phỏng vấn với cả người dùng và quản lý và nhờ họ hỗ trợ thiết lập định nghĩa và tầm quan trọng mỗi bảng với tổ chức. (Đây là một trong số ít lần bạn thực sự phỏng vấn cả hai nhóm cùng lúc.) Mục tiêu chính của bạn là đạt đồng thuận về mô tả chung cho các bảng. Khi phỏng vấn hoàn thành, lấy ghi chép và soạn mô tả bảng cuối cùng, đảm bảo tuân theo hướng dẫn nêu trước trong chương này. Sau đó hội ý với cả hai bên lần nữa để chắc chắn mô tả chấp nhận được và mọi người dễ hiểu. Danh sách bảng cuối cùng hoàn thành khi mọi người đã đồng ý với các mô tả.

*Ví dụ đối thoại phỏng vấn được bỏ qua cho ngắn gọn—xem sách đầy đủ để có bản ghi hoàn chỉnh.*

---

## Gán trường cho mỗi bảng

Ở Chương 3 bạn học rằng bảng gồm các trường. Trong giai đoạn này của quy trình thiết kế cơ sở dữ liệu, bạn sẽ gán trường cho mỗi bảng trên Danh sách bảng cuối cùng bằng các trường từ Danh sách trường sơ bộ.

Gán trường cho bảng là quy trình tương đối dễ: Xác định trường nào mô tả tốt nhất đặc điểm chủ đề của bảng và gán chúng cho bảng đó. Lặp lại quy trình này cho mỗi bảng trên Danh sách bảng cuối cùng. Nếu bạn nghĩ có thể dùng trường hoặc tập trường để mô tả đặc điểm nhiều hơn một bảng, hãy gán cho phù hợp. Bạn sẽ phát hiện liệu đã gán trường phù hợp cho mỗi bảng hay chưa sau khi trải qua quy trình tinh chỉnh cấu trúc bảng.

**Lưu ý:** Trong các ví dụ sau, bạn sẽ thấy tôi yêu cầu dùng tờ giấy cho các quy trình cụ thể. Dùng giấy giúp bạn tránh cám dỗ dùng chương trình RDBMS để thiết kế cơ sở dữ liệu. Tôi không thể nhấn mạnh quá mức việc bạn không nên dùng máy tính cho đến khi quy trình thiết kế cơ sở dữ liệu hoàn thành trừ khi bạn dùng phần mềm thiết kế cơ sở dữ liệu chuyên biệt. Tuân theo lời khuyên này, bạn sẽ tránh các bẫy tôi thảo luận sau trong Chương 14, "Thiết kế tồi—Những gì không nên làm."

Bắt đầu quy trình này bằng cách lấy tờ giấy đặt trước mặt theo chiều ngang từ trái sang phải. Viết tên mỗi bảng (từ Danh sách bảng cuối cùng) ngang phía trên tờ giấy, bắt đầu từ bên trái; để đủ khoảng trống giữa các tên bảng để có chỗ liệt kê tên trường dài bên dưới. Lặp lại quy trình, dùng nhiều tờ cần để bao gồm mọi bảng trên danh sách. Tiếp tục với ví dụ cơ sở dữ liệu trường học, Hình 7.10 cho thấy tập cấu trúc bảng đang phát triển.

Tiếp theo, gán trường từ Danh sách trường sơ bộ cho mỗi bảng. Xác định trường nào mô tả hoặc định nghĩa tốt nhất chủ đề của bảng rồi liệt kê các trường này bên dưới tên bảng. Sau khi gán tất cả trường bạn cho là phù hợp với bảng, chuyển sang bảng tiếp theo và lặp lại quy trình. Tiếp tục như vậy cho đến khi đã gán trường cho tất cả bảng. Hình 7.11 cho thấy tập cấu trúc bảng một phần.

---

## Tinh chỉnh các trường

Bây giờ bạn đã gán trường cho mỗi bảng, bạn sẽ tinh chỉnh các trường bằng cách cải thiện tên trường và giải quyết mọi vấn đề cấu trúc có thể tồn tại. Sau đó bạn tinh chỉnh bảng thêm bằng cách xác lập đã gán trường phù hợp cho mỗi bảng và cấu trúc bảng vững chắc.

### Cải thiện tên trường

Như bạn biết, trường đại diện đặc điểm chủ đề của bảng mà nó thuộc về. Bạn có thể dễ dàng xác định đặc điểm trường phải đại diện khi trường có tên phù hợp. Tên trường mơ hồ, không rõ hoặc không rõ ràng là dấu hiệu chắc chắn của rắc rối và gợi ý bạn chưa xác định kỹ mục đích của trường.

#### Hướng dẫn tạo tên trường

Trước trong chương này bạn đã học bộ hướng dẫn đặt tên bảng. Bây giờ bạn sẽ học bộ hướng dẫn khác áp dụng cho tên trường. May mắn là nhiều hướng dẫn tương tự hướng dẫn cho tên bảng, nên bạn đã quen hầu hết khái niệm:

- **Tạo tên duy nhất, mô tả rõ và có ý nghĩa với toàn bộ tổ chức.** Tên trường cho trước chỉ nên xuất hiện một lần trong toàn bộ cơ sở dữ liệu; ngoại lệ duy nhất xảy ra khi trường phục vụ thiết lập mối quan hệ giữa hai bảng. Đảm bảo tên mô tả đủ để truyền tải ý nghĩa chính xác cho mọi người thấy nó. (Chương 10 trình bày vấn đề này chi tiết hơn.)

- **Tạo tên chính xác, rõ ràng và không mơ hồ xác định đặc điểm trường đại diện.** "Phone Number" là ví dụ tốt về tên trường không chính xác, mơ hồ. Nó đại diện loại số điện thoại nào? Điện thoại nhà? Điện thoại văn phòng? Di động? Học cách cụ thể. Nếu cần ghi mỗi loại số điện thoại này, tạo trường "Home Phone," "Work Phone" và "Cell Phone." Ở Chương 6, "Phân tích cơ sở dữ liệu hiện tại," bạn học cách giải quyết tên trường chung như "Address," "City" và "State" bằng cách dùng tên bảng làm tiền tố cho tên trường. Điều này tạo tên như "Employee Address," "Customer Address" và "Supplier Address." Khi có tên trường như vậy, bạn có thể viết tắt tiền tố (cho ngắn gọn) bằng cách dùng ba hoặc bốn chữ cái đầu của tên bảng làm tiền tố đã sửa. Điều này cho phép bạn chuyển tên trường trước thành "EmpAddress," "CustAddress" và "SuppAddress." Kỹ thuật này giúp bạn thỏa mãn không chỉ hướng dẫn này mà hướng dẫn trước nữa.

- **Dùng số từ tối thiểu cần thiết để truyền tải ý nghĩa đặc điểm trường đại diện.** Bạn muốn tránh tên trường dài, nhưng đồng thời cũng tránh dùng một từ làm tên trường nếu từ đó không phù hợp. Ví dụ, nếu bạn cố ghi ngày nhân viên cụ thể gia nhập tổ chức, "Hired" quá ngắn (và hơi mơ hồ) và "Date That the Employee Was Hired" quá dài! "Date Hired" tuy nhiên là tên phù hợp hơn và đại diện chính xác đặc điểm trường đại diện.

- **Không dùng chữ viết tắt và dùng viết tắt thận trọng.** Chữ viết tắt khó giải mã và thường dẫn đến hiểu sai. Hãy tưởng tượng trường tên "CAD_SW." Làm sao bạn xác định trường đại diện gì? Mặt khác, bạn có thể dùng viết tắt miễn dùng chừng mực và xử lý cẩn thận. Chỉ dùng viết tắt nếu nó bổ sung hoặc tăng cường tên trường theo cách tích cực. Viết tắt không nên làm tên trường mơ hồ hoặc giảm ý nghĩa.

- **Không dùng từ có thể gây nhầm lẫn ý nghĩa tên trường.** Tên trường chứa từ thừa hoặc đồng nghĩa có thể làm ý nghĩa tên không rõ và dễ hiểu sai. Chẳng hạn, xem tên "Digital Identification Code Number." "Digital" và "number" thừa, nên bạn có thể loại một trong hai mà không làm giảm ý nghĩa tên trường. Giả sử bạn quyết định loại "digital." Bạn có thể tách tên còn lại thành hai tên nhỏ hơn: "Identification Code" và "Identification Number." Các tên này thường đồng nghĩa, và bạn có thể dễ dàng dùng một trong hai làm tên trường cuối. Trong tình huống này, chỉ dùng tên có ý nghĩa nhất trong tổ chức.

- **Không dùng tên ngầm hoặc tường minh xác định nhiều hơn một đặc điểm.** Các loại tên này dễ nhận vì thường dùng từ *and* hoặc *or*. Tên trường chứa gạch chéo (\) hoặc ký tự & cũng là dấu hiệu rõ ràng. Khi gặp trường có tên như "Area or Location" hoặc "Phone\Fax," xác định từng đặc điểm tên ngụ ý và tạo trường mới cho đặc điểm đó. Sau đó kiểm tra tên trường mới với các hướng dẫn này để đảm bảo tên vững chắc.

- **Dùng dạng số ít của tên.** Trường có tên số nhiều như "Skills" ngụ ý có thể chứa hai hoặc nhiều giá trị cho bản ghi cho trước, điều không nên. (Bạn sẽ học thêm về điều này sau trong chương.) Tên trường ở số ít vì đại diện đặc điểm duy nhất của chủ đề bảng mà nó thuộc về. Tên bảng, ngược lại, ở số nhiều vì đại diện tập hợp đối tượng hoặc sự kiện tương tự. Bạn có thể phân biệt tên bảng với tên trường khá dễ khi dùng quy ước đặt tên này.

Với các hướng dẫn này, rà soát mỗi bảng và xác định có thể cải thiện tên trường nào không. Khi hoàn thành, bạn sẵn sàng xác định và giải quyết mọi vấn đề với các trường. Hình 7.12 cho thấy các sửa đổi tên trường của cấu trúc bảng trong Hình 7.11.

### Dùng Trường lý tưởng để giải quyết bất thường

Dù bạn đã cẩn thận xác định các trường trên Danh sách trường sơ bộ, có thể bạn đã tạo vài trường có thể gây vấn đề cho cấu trúc bảng. Trường định nghĩa kém có thể gây dữ liệu trùng và dữ liệu thừa, và khó sử dụng. Bạn có thể thấy khó xác định liệu bất kỳ trường nào trong bảng sẽ gây vấn đề trừ khi biết dấu hiệu cảnh báo. Cách tốt nhất để xác định trường có thể gây rắc rối là xác định liệu chúng có tuân thủ Các yếu tố của Trường lý tưởng, như thảo luận tiếp theo.

#### Các yếu tố của Trường lý tưởng

Các yếu tố của Trường lý tưởng tạo thành bộ hướng dẫn bạn có thể dùng để tạo cấu trúc trường vững chắc và dễ phát hiện trường thiết kế kém. Trường lý tưởng có các đặc điểm sau:

1. **Đại diện đặc điểm phân biệt của chủ đề bảng.** Như bạn biết, bảng đại diện chủ đề cụ thể, có thể là đối tượng hoặc sự kiện. Trường lý tưởng đại diện đặc điểm phân biệt của đối tượng hoặc sự kiện đó.

2. **Chỉ chứa một giá trị duy nhất.** Trường có thể lưu hai hoặc nhiều thể hiện cùng giá trị gọi là trường đa giá trị. Trường đa giá trị gây vấn đề dữ liệu thừa (rõ ràng) và khó sử dụng khi sửa, xóa hoặc sắp xếp dữ liệu trong nó. Trường lý tưởng không có các vấn đề này vì chỉ chứa một giá trị duy nhất.

3. **Không thể phân tách thành thành phần nhỏ hơn.** Trường có thể lưu hai hoặc nhiều mục riêng biệt trong một giá trị gọi là trường đa phần (hoặc tổ hợp). Giống trường đa giá trị, loại trường này gây vấn đề khi sửa, xóa hoặc sắp xếp dữ liệu trong nó. Các vấn đề này không xảy ra với trường lý tưởng vì đại diện đặc điểm duy nhất, phân biệt của chủ đề bảng mà nó thuộc về. (Bạn sẽ học thêm về trường đa giá trị và đa phần trong giây lát.)

4. **Không chứa giá trị tính toán hoặc nối chuỗi.** Giá trị các trường trong bảng nên độc lập lẫn nhau; trường cụ thể không nên phụ thuộc giá trị trường khác cho giá trị của chính nó. Trường tính toán tuy nhiên phụ thuộc giá trị trường khác cho giá trị của chính nó, và vấn đề nằm ở đó. Giá trị trường tính toán không được cập nhật khi giá trị bất kỳ trường tham gia tính toán thay đổi. Khi đó trách nhiệm (và gánh nặng không mong muốn) của người dùng hoặc chương trình ứng dụng cơ sở dữ liệu là cập nhật trường tính toán khi loại thay đổi này xảy ra. Đây chính là lý do bạn xử lý trường tính toán riêng.

5. **Duy nhất trong toàn bộ cấu trúc cơ sở dữ liệu.** Các trường trùng duy nhất xuất hiện trong cơ sở dữ liệu thiết kế đúng là những trường thiết lập mối quan hệ giữa các bảng. Nếu tồn tại trường trùng khác trong bảng, rất có thể bảng sẽ tích lũy dữ liệu thừa không cần thiết và dữ liệu trong trường trùng sẽ inevitably trở nên không nhất quán.

6. **Giữ phần lớn thuộc tính khi xuất hiện trong nhiều hơn một bảng.** Trường thiết lập mối quan hệ giữa hai bảng là thành phần cấu trúc của mỗi bảng. Phần lớn thuộc tính của trường duy trì không đổi trong mỗi thể hiện của trường. (Chương 9, "Đặc tả trường," và Chương 10 trình bày vấn đề này chi tiết hơn.)

Dù bạn giờ biết các yếu tố cụ thể của trường lý tưởng, bạn vẫn thấy khó trong nhiều trường hợp xác định trường có vấn đề chỉ bằng cách nhìn tên. Hình 7.13 cho thấy cấu trúc bảng minh họa điểm này. Hãy dành chút thời gian và thử xác định liệu mỗi trường có tuân thủ Các yếu tố của Trường lý tưởng hay cần sửa đổi.

Mỗi trường trên danh sách có vẻ tuân thủ Các yếu tố của Trường lý tưởng. Tuy nhiên khi xem xét danh sách cẩn thận, bạn sẽ thấy một số trường không thực sự tuân thủ yếu tố thứ hai và thứ ba. Ba trường có bất thường sẽ gây vấn đề trừ khi giải quyết: INSTNAME, INSTADDRESS và CATEGORIES TAUGHT. Nếu nghi ngờ khẳng định này, bạn có thể kiểm tra bằng cách "tải" bảng với dữ liệu mẫu. Điều này sẽ nhanh chóng phát hiện bất thường nếu có và là cách tốt nhất xác nhận liệu trường có tuân thủ tất cả Các yếu tố của Trường lý tưởng hay không.

Bạn không cần tạo bảng vật lý để thực hiện kiểm tra này. Lấy tờ giấy đặt trước mặt theo chiều ngang từ trái sang phải. Viết tên mỗi trường ngang phía trên tờ giấy, bắt đầu từ bên trái; để đủ khoảng trống giữa tên trường cho chỗ đặt giá trị bên dưới. Nhập bản ghi vào bảng bằng cách điền mỗi trường với dữ liệu mẫu; đảm bảo dữ liệu mẫu đại diện dữ liệu bạn thực sự sẽ nhập vào cơ sở dữ liệu. Bạn chỉ cần vài bản ghi để kiểm tra hoạt động đúng. Tờ giấy của bạn sẽ tương tự Hình 7.14.

Bây giờ bạn có thể dễ dàng xác định trường nào sẽ gây rắc rối trừ khi được giải quyết. Như bạn thấy, INSTNAME và INSTADDRESS đều là trường đa phần, và CATEGORIES TAUGHT là trường đa giá trị. Bạn phải giải quyết các trường này trước khi có thể tinh chỉnh cấu trúc bảng.

#### Giải quyết trường đa phần

Làm việc với trường đa phần khó vì giá trị của nó chứa hai hoặc nhiều mục riêng biệt. Khó truy xuất thông tin từ trường đa phần, và khó sắp xếp hoặc nhóm bản ghi trong bảng theo giá trị trường. Trường INSTADDRESS trong Hình 7.14 minh họa những khó khăn này; bạn chắc chắn gặp vấn đề khi truy xuất thông tin cho thành phố Seattle hoặc sắp xếp thông tin theo mã bưu điện.

Bạn giải quyết trường đa phần bằng cách xác định các mục riêng biệt trong giá trị trường và coi mỗi mục là trường riêng. Thực hiện bằng cách tự hỏi: "Giá trị trường này đại diện mục cụ thể nào?" Sau khi trả lời câu hỏi và xác định các mục (tốt nhất có thể), chuyển mỗi mục thành trường mới.

Trong Hình 7.14, giá trị trường INSTNAME đại diện hai mục: tên và họ của giảng viên. Bạn giải quyết trường này bằng cách tạo trường INSTFIRST NAME mới và trường INSTLAST NAME mới. Giá trị INSTADDRESS đại diện bốn mục: địa chỉ đường, thành phố, bang và mã bưu điện của giảng viên. Bạn chuyển các mục này thành trường; chúng sẽ xuất hiện trong bảng là INSTSTREET ADDRESS, INSTCITY, INSTSTATE và INSTZIPCODE. Hình 7.15 cho thấy bảng INSTRUCTORS đã sửa mới.

Một số trường đa phần khó nhận ra. Hãy xem bảng INSTRUMENTS trong Hình 7.16. Thoạt nhìn bảng có vẻ không chứa trường đa phần. Tuy nhiên khi xem xét dữ liệu trong bảng kỹ hơn, bạn sẽ thấy INSTRUMENT ID thực ra là trường đa phần. Giá trị trường này đại diện hai mục riêng biệt: danh mục nhạc cụ thuộc về—AMP (amplifier), GUIT (guitar), MFX (multi-effects unit), SFX (single-effect unit)—và số định danh nhạc cụ. Rõ ràng bạn nên phân tách INSTRUMENT ID thành hai trường nhỏ hơn theo yếu tố thứ ba của trường lý tưởng. Hãy tưởng tượng khó thế nào khi cập nhật giá trị trường nếu danh mục MFX đổi thành MFU nếu bạn không làm vậy. Bạn sẽ phải viết mã lập trình để phân tích giá trị, kiểm tra tồn tại MFX, rồi thay thế bằng MFU nếu tồn tại trong giá trị đã phân tích. Không phải bạn không thể làm vậy, nhưng bạn chắc chắn sẽ làm việc vất vả hơn cần thiết, và bạn không nên phải trải qua điều này nếu có cơ sở dữ liệu thiết kế đúng.

#### Giải quyết trường đa giá trị

Như bạn biết, trường đa giá trị có thể lưu hai hoặc nhiều thể hiện cùng giá trị. May mắn là bạn sẽ nhận ra trường đa giá trị khi thấy. Tên trường thường ở số nhiều, và giá trị hầu như luôn chứa nhiều dấu phẩy, dùng để tách các thể hiện khác nhau trong chính giá trị.

Giải quyết trường đa phần không khó lắm, nhưng giải quyết trường đa giá trị có thể khó hơn chút và cần công sức. Trường đa giá trị có cùng bộ vấn đề cơ bản như trường đa phần, như trường CATEGORIES TAUGHT trong Hình 7.17 minh họa rõ. Ví dụ, bạn sẽ gặp khó khi truy xuất thông tin cho mọi người dạy danh mục cụ thể (như WP), bạn không thể sắp xếp dữ liệu theo cách có ý nghĩa, và quan trọng nhất, bạn không có chỗ nhập hơn bốn danh mục. Điều gì xảy ra khi một hoặc nhiều giảng viên dạy năm danh mục? Lựa chọn duy nhất là làm trường lớn hơn mỗi khi cần nhập nhiều giá trị hơn hiện cho phép.

Vậy bạn giải quyết trường đa giá trị này thế nào? Ý nghĩ đầu tiên có thể là tạo trường mới cho mỗi giá trị, do đó "làm phẳng" trường đa giá trị thành vài trường đơn giá trị. Hình 7.18 cho thấy điều gì xảy ra nếu làm theo ý tưởng này. Thật không may đây không cải thiện mấy. Ba vấn đề cụ thể nảy sinh từ cấu trúc này:

1. Truy xuất thông tin danh mục sẽ tẻ nhạt nhất. Người dùng cố tìm tất cả giảng viên dạy danh mục WP phải đảm bảo tìm giá trị này trong mỗi trường danh mục; không có đảm bảo WP được lưu nhất quán trong cùng trường. Không làm vậy nghĩa là người dùng có nguy cơ bỏ sót giảng viên đủ điều kiện.
2. Không có cách nào để chương trình RDBMS sắp xếp dữ liệu danh mục theo cách có ý nghĩa.
3. Cấu trúc này vốn dễ biến động. Ở trạng thái hiện tại, bảng hạn chế không cần thiết số danh mục giảng viên có thể dạy; bạn phải tạo trường danh mục bổ sung khi có giảng viên dạy hơn ba danh mục. Thêm trường danh mục chỉ làm trầm trọng hai vấn đề đầu.

Nhận ra làm phẳng trường CATEGORIES TAUGHT sẽ không giải quyết vấn đề, ý nghĩ tiếp theo là đưa trường vào tuân thủ yếu tố thứ hai của trường lý tưởng và tuyên bố nó sẽ chỉ chứa một giá trị duy nhất. Dù đây là xung lực tốt và bước đúng hướng, nó sẽ không giải quyết vấn đề hoàn toàn vì sẽ giới thiệu vấn đề khác: dữ liệu thừa. Hình 7.19 minh họa điều xảy ra khi làm theo ý tưởng cụ thể này. Lưu ý giờ có một giá trị duy nhất trong trường CATEGORIES TAUGHT cho mỗi bản ghi trong bảng.

Giá trị trong CATEGORIES TAUGHT gây dữ liệu thừa vì bạn phải nhân đôi bản ghi giảng viên cho trước cho mỗi danh mục giảng viên dạy. Sự thừa này rõ ràng không chấp nhận được, nên bạn phải giải quyết vấn đề theo cách khác.

**Bạn có thể tránh tình huống này hoàn toàn bằng cách dùng các bước sau để giải quyết trường đa giá trị:**

1. Loại trường khỏi bảng và dùng làm cơ sở cho bảng mới. Nếu cần, đổi tên trường theo hướng dẫn tên trường bạn đã học trước trong chương này.
2. Dùng trường (hoặc tập trường) từ bảng gốc để liên kết bảng gốc với bảng mới; cố gắng chọn trường đại diện chủ đề bảng càng sát càng tốt. Trường bạn chọn sẽ xuất hiện ở cả hai bảng. (Bạn sẽ học thêm về liên kết bảng trong Chương 10.)
3. Gán tên, loại và mô tả phù hợp cho bảng mới và thêm vào Danh sách bảng cuối cùng.

Các bước này tạo thành quy trình chung bạn có thể dùng để giải quyết bất kỳ trường đa giá trị nào gặp trong bảng. Bây giờ áp dụng các bước này cho trường CATEGORIES TAUGHT.

1. Loại trường khỏi bảng INSTRUCTORS và dùng làm cơ sở cho bảng mới. Vì đây giờ là trường đơn giá trị, đổi tên trường thành CATEGORY TAUGHT.
2. Dùng INSTFIRST NAME và INSTLAST NAME làm trường kết nối liên kết bảng INSTRUCTORS với bảng mới và thêm chúng vào cấu trúc bảng mới.
3. Đặt tên phù hợp cho bảng mới, soạn mô tả phù hợp và thêm bảng vào Danh sách bảng cuối cùng. (Chỉ định loại bảng là "Data.") Đây là một tên và mô tả có thể dùng cho bảng mới:
   *Instructor Categories—Các danh mục chương trình phần mềm giảng viên đủ điều kiện dạy. Thông tin bảng này cung cấp cho phép chúng ta đảm bảo số lượng giảng viên đủ cho mỗi danh mục phần mềm.*

Hình 7.20 cho thấy bảng INSTRUCTORS đã sửa và bảng INSTRUCTOR CATEGORIES mới.

Lưu ý bảng INSTRUCTOR CATEGORIES mới không còn các vấn đề thường liên quan trường đa giá trị vì CATEGORY TAUGHT là trường đơn giá trị. Bạn có thể dễ dàng truy xuất thông tin cho giảng viên hoặc danh mục cụ thể và sắp xếp bản ghi theo cách có ý nghĩa. Cũng lưu ý trường INSTFIRST NAME và INSTLAST NAME giữ tên trong bảng mới, làm chúng tuân thủ yếu tố thứ năm của trường lý tưởng. Dù bảng mới chứa dữ liệu thừa, sự thừa chấp nhận được vì tối thiểu. Thực tế cơ sở dữ liệu quan hệ luôn chứa một lượng dữ liệu thừa nhất định. Mục tiêu của bạn với tư cách kiến trúc sư cơ sở dữ liệu là đảm bảo nó chỉ có lượng dữ liệu thừa tối thiểu tuyệt đối.

Hình 7.21 cho thấy phiên bản bảng INSTRUCTORS chứa ba trường đa giá trị:

- **CATEGORIES TAUGHT**—Chỉ các danh mục lớp giảng viên có thể dạy.
- **MAXIMUM LEVEL TAUGHT**—Chỉ mức kỹ năng tối đa giảng viên có thể dạy cho danh mục cho trước.
- **LANGUAGES SPOKEN**—Chỉ ngoại ngữ giảng viên có thể nói.

Nhiệm vụ của bạn ở đây có vẻ tương đối rõ—bạn sẽ dùng quy trình vừa học để giải quyết các trường đa giá trị này. Bạn sau đó nhận thấy vấn đề nhỏ, tương đối khó thấy: Có mối liên kết một-một rõ ràng giữa giá trị trong CATEGORIES TAUGHT và giá trị trong MAXIMUM LEVEL TAUGHT cho bất kỳ bản ghi cho trước. Bạn có thể không nhận ra bất thường này nếu không xem xét cẩn thận dữ liệu mẫu trong các trường này. Đừng lo; bạn vẫn dùng cùng quy trình nhưng với sửa đổi nhỏ.

Bạn đôi khi gặp tình huống như vậy, khi trường nào đó (dù đơn hay đa giá trị) phụ thuộc trường đa giá trị cụ thể. Bạn có thể dễ dàng sửa vấn đề này bằng cách đưa trường phụ thuộc vào cấu trúc bảng mới bạn xây để giải quyết trường đa giá trị. Hình 7.22 cho thấy kết quả kết hợp kỹ thuật này với kỹ thuật trước để giải quyết CATEGORIES TAUGHT. (Nó cũng cho thấy cách giải quyết LANGUAGES SPOKEN.)

Sự thừa trong các bảng mới chấp nhận được vì một lần nữa nó tối thiểu. Trong Chương 10, bạn sẽ học cách giảm loại thừa này thêm nữa bằng cách liên kết các bảng với khóa chính và khóa ngoại.

---

## Tinh chỉnh cấu trúc bảng

Bây giờ bạn đã tinh chỉnh các trường và đảm bảo mỗi trường vững chắc, bạn có thể bắt đầu quy trình tinh chỉnh cấu trúc bảng. Mục tiêu của bạn trong giai đoạn này của quy trình thiết kế là đảm bảo đã gán trường phù hợp cho mỗi bảng và đã định nghĩa đúng cấu trúc mỗi bảng. Quy trình này cũng sẽ phát hiện liệu các bảng có bất thường cần giải quyết hay không.

### Về dữ liệu thừa và trường trùng

Bạn đã thấy thuật ngữ dữ liệu thừa được dùng khá thường trong chương này. Dữ liệu thừa được mô tả là không chấp nhận được trong nhiều trường hợp nhưng phù hợp trong các trường hợp khác. Để hiểu rõ hơn cách xác định khi nào dữ liệu thừa chấp nhận được, cần định nghĩa thuật ngữ.

**Dữ liệu thừa** là giá trị lặp lại trong trường do sự tham gia của trường trong việc liên kết hai bảng hoặc do bất thường trường hoặc bảng. Trong trường hợp đầu, dữ liệu thừa phù hợp; theo định nghĩa, trường dùng để liên kết bảng này với bảng kia sẽ chứa dữ liệu thừa. (Bạn sẽ học thêm về điều này trong Chương 10.) Dữ liệu thừa hoàn toàn không chấp nhận được trong trường hợp thứ hai vì gây vấn đề với tính nhất quán dữ liệu và tính toàn vẹn dữ liệu; do đó bạn nên luôn cố gắng giữ dữ liệu thừa ở mức tối thiểu tuyệt đối.

**Trường trùng** là trường xuất hiện trong hai hoặc nhiều bảng vì bất kỳ lý do nào sau:

- Nó được dùng để liên kết tập bảng với nhau.
- Nó chỉ nhiều thể hiện của cùng loại giá trị cụ thể.
- Có nhu cầu thông tin bổ sung được nhận thức.

Trường hợp duy nhất trường trùng cần thiết là khi nó phục vụ thiết lập mối quan hệ giữa hai bảng; nó cung cấp phương tiện duy nhất kết hợp bản ghi trong bảng đầu với bản ghi trong bảng thứ hai. Trường trùng không cần thiết trong mọi trường hợp khác và bạn nên tránh vì chúng đưa dữ liệu thừa không cần thiết.

Khi tinh chỉnh mỗi cấu trúc bảng, bạn sẽ đánh giá có giữ trường trùng cho trước trong bảng hay không. Nếu lý do tồn tại trong bảng hợp lệ thì giữ; nếu không thì loại. Bạn sẽ học cách xử lý hiệu quả cả dữ liệu thừa và trường trùng không cần thiết trong các phần sau.

### Dùng Bảng lý tưởng để tinh chỉnh cấu trúc bảng

Dù đã nỗ lực tinh chỉnh các trường trong bảng, chính cấu trúc bảng có thể chứa bất thường tạo ra dữ liệu thừa không cần thiết và làm khó làm việc với dữ liệu trong bảng. Bạn có thể xác định cấu trúc bảng có thể có vấn đề bằng cách xác định liệu nó có tuân thủ Các yếu tố của Bảng lý tưởng hay không.

#### Các yếu tố của Bảng lý tưởng

Các yếu tố của Bảng lý tưởng tạo thành bộ hướng dẫn bạn có thể dùng để tạo cấu trúc bảng vững chắc và dễ phát hiện bảng thiết kế kém. Cấu trúc bảng lý tưởng có các đặc điểm sau:

1. **Đại diện một chủ đề duy nhất, có thể là đối tượng hoặc sự kiện.** Vâng, tôi biết tôi đã nói điều này nhiều lần. Sự thật là tôi không thể nhấn mạnh quá mức điểm này. Miễn bạn đảm bảo mỗi bảng đại diện một chủ đề duy nhất, bạn giảm đáng kể rủi ro vấn đề tính toàn vẹn dữ liệu tiềm ẩn. Yếu tố này xác thực công việc bạn đã làm trong các giai đoạn phân tích và phỏng vấn của quy trình thiết kế cơ sở dữ liệu cũng như công việc bạn vừa thực hiện.

2. **Có khóa chính.** Điều quan trọng vì hai lý do: Khóa chính xác định duy nhất mỗi bản ghi trong bảng và đóng vai trò chủ chốt trong việc thiết lập mối quan hệ bảng. Ngoài ra nó có đặc điểm cụ thể giúp triển khai và thực thi các mức tính toàn vẹn dữ liệu khác nhau. Nếu không gán khóa chính cho mỗi bảng, cuối cùng bạn sẽ gặp vấn đề tính toàn vẹn dữ liệu. Chương 8, "Khóa," trình bày khóa chính chi tiết hơn.

3. **Không chứa trường đa phần hoặc đa giá trị.** Về lý thuyết bạn đã giải quyết các vấn đề này khi tinh chỉnh cấu trúc trường. Tuy nhiên vẫn là ý hay rà soát các trường lần cuối để đảm bảo đã loại hoàn toàn từng trường.

4. **Không chứa trường tính toán.** Dù có thể tin cấu trúc bảng hiện tại không có trường tính toán, có thể bạn đã vô tình bỏ qua một hoặc hai trường tính toán trong quá trình tinh chỉnh trường. Đây là lúc tốt để rà soát cấu trúc bảng lần nữa và đảm bảo loại các trường tính toán có thể đã bỏ qua.

5. **Không chứa trường trùng không cần thiết.** (Lưu ý hướng dẫn này không áp dụng cho trường dùng để liên kết tập bảng với nhau, như những trường trong ví dụ Hình 7.22.) Một trong những dấu hiệu của bảng thiết kế kém là việc bao gồm trường trùng từ bảng khác. Bạn có thể cảm thấy buộc phải thêm trường trùng vào bảng vì một trong hai lý do: cung cấp thông tin tham chiếu hoặc chỉ nhiều thể hiện của cùng loại giá trị cụ thể. Trường trùng như vậy gây nhiều khó khăn khi làm việc với dữ liệu hoặc cố truy xuất thông tin từ bảng.

6. **Chỉ chứa lượng dữ liệu thừa tối thiểu tuyệt đối.** Nhớ cơ sở dữ liệu quan hệ sẽ không bao giờ hoàn toàn không có dữ liệu thừa. Tuy nhiên bạn có thể—và nên—đảm bảo mỗi bảng chứa ít dữ liệu thừa nhất có thể.

#### Giải quyết trường trùng không cần thiết

Trước khi sửa đổi cuối cùng cấu trúc bảng, trước tiên bạn phải loại tất cả trường trùng không cần thiết khỏi cơ sở dữ liệu. Sau đó tinh chỉnh các bảng để chúng tuân thủ Các yếu tố của Bảng lý tưởng.

Trường trùng phục vụ cung cấp thông tin tham chiếu (còn gọi là trường tham chiếu) không cần thiết và dễ giải quyết—bạn chỉ cần loại khỏi bảng. Thật không may nhiều người tin bảng phải chứa mọi trường sẽ xuất hiện trong báo cáo họ tạo từ nó, nên họ đưa vào bảng các trường trùng khác nhau mà họ cho là cần thiết. Họ giả định bảng khi đó sẽ có thể cung cấp tất cả thông tin cần thiết cho báo cáo. Tuy nhiên họ sai và hành động của họ vừa không khôn ngoan vừa không mong muốn. Bảng chứa trường tham chiếu thể hiện thiết kế kém và sẽ có nhiều vấn đề, nhiều vấn đề sẽ ngày càng rõ khi quy trình thiết kế cơ sở dữ liệu triển khai. Trường tham chiếu buộc người dùng hoặc chương trình ứng dụng cơ sở dữ liệu đảm bảo giá trị trong tất cả thể hiện của trường nhất quán lẫn nhau, quá trình mang rủi ro lỗi cao. Hình 7.23 cho thấy ví dụ bảng chứa trường tham chiếu.

Trường MANPHONE và WEB SITE trong bảng INSTRUMENTS là trường tham chiếu và theo định nghĩa thực ra là trường trùng không cần thiết. Bạn chắc chắn không cần bao gồm chúng trong bảng này vì chúng đã là phần cấu trúc bảng MANUFACTURERS; do đó bạn có thể loại chúng khỏi bảng INSTRUMENTS để giải quyết vấn đề trùng không cần thiết. (MANUFACTURER không phải trường tham chiếu vì hiện liên kết bảng INSTRUMENTS với bảng MANUFACTURERS.) Bạn sẽ học trong Chương 12, "Khung nhìn," rằng có thể làm việc với trường từ bảng INSTRUMENTS và MANUFACTURERS cùng lúc bằng cách kết hợp chúng trong khung nhìn (bảng ảo). Bạn khi đó có thể dùng khung nhìn này làm cơ sở biên soạn bất kỳ báo cáo nào bạn cần.

Trường trùng phục vụ chỉ nhiều thể hiện của cùng loại giá trị cũng không cần thiết. Ví dụ, xem phiên bản bảng STUDENTS trong Hình 7.24. INSTRUMENT 1, INSTRUMENT 2 và INSTRUMENT 3 là trường trùng đại diện nhiều thể hiện của cùng loại giá trị. Mục đích của chúng trong bảng là cho phép khoa âm nhạc theo dõi nhạc cụ sinh viên cho trước mượn. Ngoài khó khăn các trường này gây khi truy xuất thông tin về nhạc cụ cụ thể, các trường cũng giới hạn số nhạc cụ sinh viên có thể mượn. Điều gì xảy ra nếu vài sinh viên muốn mượn hơn ba nhạc cụ?

Loại cấu trúc trường này có quen thuộc lạ không? Có! Nó tương tự cấu trúc trong Hình 7.18. Như bạn có thể đã đoán, nó không gì khác ngoài trường đa giá trị đã làm phẳng. Lưu ý người tạo bảng này có thể không có ý trường đa giá trị (và hầu hết người tạo trường như vậy cũng không), nhưng đó chính xác là nó. Bạn đã biết cách xử lý các trường trùng không cần thiết này vì biết cách giải quyết trường đa giá trị. Bạn có thể dễ dàng sửa bảng STUDENTS bằng cách trước tiên hình dung các trường INSTRUMENT 1, INSTRUMENT 2 và INSTRUMENT 3 như trường đa giá trị đơn, rồi giải quyết như mọi trường đa giá trị. Hình 7.25 minh họa quy trình này. Phiên bản có bóng của bảng STUDENTS cho thấy cách bạn hình dung các trường nhạc cụ như trường đa giá trị đơn. Bạn sau đó giải quyết trường đa giá trị bằng cách áp dụng quy trình ba bước đã học trước, tạo ra bảng STUDENTS đã sửa và bảng STUDENT INSTRUMENTS mới. Khi hoàn thành, bạn có thể nhập bất kỳ số nhạc cụ nào cho sinh viên cụ thể. Bạn khi đó có thể dễ dàng truy xuất thông tin như tên sinh viên mượn guitar, danh sách nhạc cụ sinh viên cụ thể hiện mượn và số sinh viên mượn đàn piano điện.

Trong một số trường hợp, bảng có thể chứa hai hoặc nhiều tập trường trùng đại diện nhiều thể hiện của cùng loại giá trị. Hình 7.26 cho thấy phiên bản hơi khác của bảng STUDENTS trong Hình 7.24; phiên bản này chứa hai tập trường trùng. Bạn có thể đang nghĩ lúc này "Tại sao anh ấy nói có hai tập trường trùng khi tôi thấy rõ ba?" Trái với điều bạn có thể nghĩ, INSTRUMENT 1/CHECKOUT DATE 1 chẳng hạn không tạo thành tập trường trùng. Ngược lại—INSTRUMENT 1/INSTRUMENT 2/INSTRUMENT 3 tạo thành tập trường trùng đầu, và CHECKOUT DATE 1/CHECKOUT DATE 2/CHECKOUT DATE 3 tạo thành tập trường trùng thứ hai.

Bạn có thể đã nhận ra hai tập trường trùng này thực ra là hai trường đa giá trị đã làm phẳng và có thể giải quyết theo cùng cách như ví dụ trước. Vấn đề khác duy nhất bạn phải quan tâm là mối liên kết một-một rõ ràng giữa nhạc cụ và ngày mượn. Tuy nhiên đây không phải vấn đề vì bạn đã xử lý loại kịch bản này trước. Nếu hình dung một trường đa giá trị tên INSTRUMENTS và trường khác tên CHECKOUT DATE, bạn sẽ thấy cấu trúc bảng tổng thể khá tương tự Hình 7.21. (Trong hình đó có mối liên kết một-một giữa trường CATEGORIES TAUGHT và MAXIMUM LEVEL TAUGHT.) Hình 7.27 minh họa cách sửa bảng này.

Bây giờ bạn đã quen với Các yếu tố của Bảng lý tưởng, rà soát cấu trúc bảng và tinh chỉnh khi cần. Khi nghi ngờ về bảng cụ thể, phác thảo cấu trúc trên tờ giấy và tải với dữ liệu mẫu. Bạn khi đó có thể giải quyết bất thường dữ liệu phát hiện.

### Thiết lập bảng tập con

Khi tinh chỉnh cấu trúc bảng, có thể bạn thấy một số trường trong bảng cụ thể không phải lúc nào cũng chứa giá trị. Tình huống này không ảnh hưởng khả năng truy xuất thông tin từ bảng, nhưng có thể cho thấy bảng cần tinh chỉnh thêm. Hãy xem xét cấu trúc bảng INVENTORY trong Hình 7.28.

Trong kịch bản này, bảng chứa dữ liệu về các mục khác nhau trong văn phòng người, như đồ đạc văn phòng, thiết bị văn phòng (máy tính, máy in, v.v.) và sách. Không thể tránh giá trị của nhiều trường trong nhiều bản ghi sẽ trống. Ví dụ sách sẽ không có MANUFACTURER, MODEL hoặc WARRANTY EXPIRATION DATE, và máy in sẽ không có AUTHOR, PUBLISHER, ISBN hoặc CATEGORY. Điều này không gây vấn đề từ góc nhìn vật lý (không gian đĩa cứng hạn chế chắc chắn không còn vấn đề quan trọng như trước đây), nhưng có thể gây vấn đề nhận thức. Người dùng (và quản lý) khá lo lắng khi thấy nhiều giá trị trống trong bảng. Dữ liệu thiếu? Ai đó quên nhập vào các trường? Ai đó xóa nhầm dữ liệu? Máy tính vô tình phá hủy giá trị gốc? (Vâng, huyền thoại đô thị "Máy tính làm đấy!" vẫn tồn tại.) Câu hỏi quan trọng hơn là: Nếu bạn tuân thủ Các yếu tố của Bảng lý tưởng khi tạo bảng này, làm sao bạn đạt được cấu trúc cụ thể này?

May mắn đây chỉ là loại bất thường cấu trúc khác thỉnh thoảng xảy ra khi thiết kế các bảng khác nhau. Nhiệm vụ của bạn giờ là học cách xử lý nó phù hợp.

Bước đầu là xác định liệu bảng INVENTORY có thực sự tuân thủ yếu tố đầu của bảng lý tưởng (tức "Đại diện một chủ đề duy nhất"). Bảng chứa số lượng lớn giá trị trống trong các trường thường—nhưng không luôn—đại diện nhiều hơn một chủ đề. Hãy nghĩ về hai tập trường đang xem xét trong chốc lát, và bạn sẽ sớm nhận ra chúng đại diện đặc điểm của hai khía cạnh phân biệt của chủ đề bảng. Tập trường đầu mô tả tồn kho thiết bị và tập trường thứ hai mô tả tồn kho sách; hơn nữa cả hai loại tồn kho có đặc điểm chung như ITEM NAME, ITEM DESCRIPTION và CURRENT VALUE. Về bản chất, "Equipment" và "Books" là chủ đề phụ thuộc vào bảng INVENTORY để tồn tại; không cái nào mô tả đối tượng hoặc sự kiện hoàn toàn phân biệt. Kết quả chúng là chủ đề phụ thuộc và bạn sẽ tạo bảng tập con cho mỗi cái.

Giống bảng dữ liệu đại diện chủ đề phân biệt, **bảng tập con** đại diện chủ đề phụ thuộc của bảng dữ liệu cụ thể. Bảng tập con chứa các trường liên quan chủ đề phụ thuộc nó đại diện và cũng bao gồm trường (hoặc các trường) từ bảng dữ liệu phục vụ liên kết bảng dữ liệu với bảng tập con. Điều quan trọng cần lưu ý bảng tập con không chứa trường đại diện đặc điểm chung cho cả nó và bảng dữ liệu; các trường này phải ở lại trong bảng dữ liệu.

Bây giờ bạn đã xác định bảng INVENTORY mô tả ba chủ đề (không quan trọng hai trong số là chủ đề phụ thuộc), bạn phải đưa nó vào tuân thủ yếu tố đầu của bảng lý tưởng bằng cách loại các trường đang xem xét. Bạn sau đó dùng các trường làm cơ sở cho hai bảng tập con mới, mỗi chủ đề phụ thuộc một bảng. Đây là các bước bạn làm để hoàn thành nhiệm vụ:

1. Dùng các trường MANUFACTURER, MODEL và WARRANTY EXPIRATION DATE để tạo bảng tập con mới tên EQUIPMENT.
2. Dùng các trường PUBLISHER, AUTHOR, ISBN và CATEGORY để tạo bảng tập con mới tên BOOKS.
3. Thêm ITEM NAME vào cả hai bảng; trường này sẽ liên kết mỗi bảng tập con với bảng dữ liệu.
4. Soạn mô tả phù hợp cho cả hai bảng tập con và thêm vào Danh sách bảng cuối cùng. Chỉ định loại mỗi bảng là "Subset."

Hình 7.29 cho thấy cấu trúc bảng tập con mới.

Hãy dành chút thời gian rà soát cấu trúc bảng lần nữa. Bạn có thể phát hiện đã tạo bảng tập con mà không biết. Bảng có cấu trúc gần như giống nhau thường là bảng tập con; thường chỉ có vài trường duy nhất phân biệt bảng này với bảng kia. Ví dụ, xem hai cấu trúc bảng một phần trong Hình 7.30. Mỗi bảng đại diện khía cạnh phân biệt của cùng chủ đề.

Cả hai bảng này đại diện nhân viên nhưng mỗi bảng đại diện loại nhân viên cụ thể. Tuy nhiên lưu ý có trường chung chung chung cho cả hai bảng: first name, last name, date hired, street address, city và state. Các trường này bị trùng không cần thiết nên bạn cần tinh chỉnh cấu trúc bảng để giải quyết vấn đề này.

#### Tinh chỉnh bảng tập con chưa xác định trước đó

Khi xác định bảng tập con như vậy, bạn có thể tinh chỉnh bằng các bước sau:

1. Loại tất cả trường bảng tập con có chung và dùng làm cơ sở cho bảng dữ liệu mới.
2. Xác định chủ đề bảng dữ liệu mới đại diện rồi đặt tên phù hợp cho bảng đó.
3. Đảm bảo bảng tập con đại diện chủ đề phụ thuộc của bảng dữ liệu và sửa tên bảng tập con khi cần.
4. Soạn mô tả phù hợp cho bảng dữ liệu rồi thêm vào Danh sách bảng cuối cùng. Chỉ định loại bảng là "Data."

Hình 7.31 cho thấy kết quả dùng các bước này trên bảng FULL-TIME EMPLOYEES và PART-TIME EMPLOYEES.

Vào lúc này tất cả cấu trúc bảng của bạn đã khá ổn. Tuy nhiên bạn sẽ cần tinh chỉnh thêm khi học về khóa chính, khóa ngoại, mối quan hệ và quy tắc nghiệp vụ.

---

## Ví dụ: Thiết lập cấu trúc bảng

Bạn giờ sẽ định nghĩa Danh sách bảng sơ bộ cho Mike's Bikes. Như bạn biết, việc đầu tiên cần làm là rà soát Danh sách trường sơ bộ để xác định chủ đề nào có thể suy ra từ các trường trên danh sách. Hình 7.32 cho thấy mẫu một phần danh sách đó.

Sau khi rà soát cẩn thận toàn bộ Danh sách trường sơ bộ, bạn xác định các trường trên danh sách gợi ý các chủ đề: customers, employees, invoices, products và vendors. Bạn sau đó biên soạn các mục này thành phiên bản đầu của Danh sách bảng sơ bộ.

Bây giờ bạn tạo phiên bản thứ hai của danh sách bằng cách gộp Danh sách bảng sơ bộ hiện tại với danh sách chủ đề bạn tạo trong quá trình phân tích. Nhớ các bước sau khi gộp hai danh sách:

1. Giải quyết mục trùng trên cả hai danh sách. Nhớ một mục có thể xuất hiện trên cả hai danh sách nhưng đại diện chủ đề khác. Khi xác định mục như vậy, dùng kỹ thuật phù hợp để giải quyết.
2. Giải quyết mục đại diện cùng chủ đề nhưng có tên khác. Bạn muốn đảm bảo chỉ một bảng đại diện chủ đề cụ thể.
3. Kết hợp các mục còn lại vào một danh sách. Danh sách kết hợp trở thành phiên bản thứ hai của Danh sách bảng sơ bộ.

Sau khi làm theo các bước này, Danh sách bảng sơ bộ của bạn sẽ tương tự Hình 7.33.

Bạn gạch bỏ "Customers," "Employees" và "Products" trên danh sách chủ đề vì đại diện cùng chủ đề với mục tương ứng trên Danh sách bảng sơ bộ. Bảng SALES không có mục tương ứng trên Danh sách bảng sơ bộ nhưng đại diện cùng chủ đề "Invoices." "Invoices" có ý nghĩa nhất với Mike và nhân viên, tuy nhiên nên bạn dùng nó trên Danh sách bảng sơ bộ thay vì "Sales." Tình huống tương tự tồn tại giữa "Suppliers" và "Vendors"; Mike chọn "Vendors" làm tên xuất hiện trên Danh sách bảng sơ bộ nên bạn gạch bỏ "Suppliers."

**Lưu ý:** Chọn tên mô tả tốt nhất chủ đề bảng là nhiệm vụ tùy ý. Quy tắc hay để làm theo là dùng tên có ý nghĩa nhất với mọi người trong tổ chức.

*[Phần còn lại của ví dụ Mike's Bikes và các bước chi tiết được rút gọn; nội dung đầy đủ tương ứng với sách gốc.]*

---

## Tóm tắt

Chương mở đầu với thảo luận về Danh sách bảng sơ bộ. Danh sách này tạo thành cấu trúc bảng ban đầu cho cơ sở dữ liệu mới. Bạn học cách phát triển danh sách này bằng Danh sách trường sơ bộ, danh sách chủ đề và mục tiêu sứ mệnh, tất cả bạn biên soạn trong giai đoạn phân tích của quy trình thiết kế cơ sở dữ liệu.

Tiếp theo chúng ta thảo luận quy trình chuyển Danh sách bảng sơ bộ thành Danh sách bảng cuối cùng, chứa tên, loại và mô tả mỗi bảng trong cơ sở dữ liệu. Bạn học bộ hướng dẫn tạo tên bảng và bộ hướng dẫn khác để soạn mô tả bảng. Chúng ta làm việc tạo tên bảng không mơ hồ, mô tả rõ và có ý nghĩa và mô tả định nghĩa tường minh bảng cũng như nêu tầm quan trọng với tổ chức. Bạn cũng học rằng nhờ sự hỗ trợ của người dùng và quản lý rất quan trọng cho quy trình phát triển mô tả bảng định nghĩa tốt. Mô tả bảng phải phù hợp và mọi người trong tổ chức dễ hiểu.

Sau đó chúng ta thảo luận quy trình gán trường cho mỗi bảng trên Danh sách bảng cuối cùng. Ở đây bạn học cách xây dựng cấu trúc cho bảng cho trước bằng các trường từ Danh sách trường sơ bộ mô tả tốt nhất đặc điểm chủ đề của bảng.

Tinh chỉnh trường là chủ đề thảo luận tiếp theo, và bạn học bộ hướng dẫn tạo tên trường giúp đảm bảo chúng rõ ràng, mô tả rõ và có ý nghĩa. Bạn cũng học về Các yếu tố của Trường lý tưởng. Bây giờ bạn biết có thể giải quyết bất thường trong trường bằng cách xác định liệu nó có tuân thủ các yếu tố này. Sau đó chúng ta thảo luận cách giải quyết trường đa phần và đa giá trị. Bạn học phân tách trường đa phần tạo ra trường mới, trong khi phân tách trường đa giá trị tạo ra bảng mới.

Chương kết thúc với thảo luận về tinh chỉnh cấu trúc bảng. Bạn học xác định Các yếu tố của Bảng lý tưởng, và bây giờ bạn biết có thể tìm ra vấn đề trong cấu trúc bảng bằng cách xác định liệu bảng có tuân thủ các yếu tố này. Chúng ta thảo luận trường trùng không cần thiết, và bây giờ bạn biết chúng xuất hiện trong bảng vì một trong hai lý do: cung cấp thông tin tham chiếu hoặc đại diện các thể hiện khác nhau của cùng loại giá trị. Bạn học cách giải quyết trường trùng để loại bỏ vấn đề chúng gây ra.

Thảo luận cuối tập trung vào chủ đề bảng tập con. Như bạn đã biết, bảng tập con đại diện chủ đề phụ thuộc của bảng dữ liệu cụ thể, và có mối quan hệ phân biệt giữa bảng tập con và bảng dữ liệu. Bạn cũng biết có thể tạo rõ ràng bảng tập con. Bạn học có thể đã tạo bảng tập con không ý thức trước đó trong quy trình thiết kế cơ sở dữ liệu và cần tìm bảng tập con chưa xác định. Khi xác định bảng tập con, tinh chỉnh nó và thêm vào Danh sách bảng cuối cùng.

---

## Câu hỏi ôn tập

1. Bạn xác định và thiết lập bảng cho cơ sở dữ liệu mới thế nào?
2. Tại sao bạn dùng Danh sách trường sơ bộ để giúp định nghĩa bảng?
3. Bạn làm gì khi mục trên danh sách chủ đề và mục tên khác trên Danh sách bảng sơ bộ đều đại diện cùng chủ đề?
4. Danh sách bảng cuối cùng cung cấp thông tin gì?
5. Nêu ba hướng dẫn tạo tên bảng.
6. Nêu hai hướng dẫn soạn mô tả bảng.
7. Bạn gán trường cho bảng trên Danh sách bảng cuối cùng thế nào?
8. Nêu ba hướng dẫn tạo tên trường.
9. Hai vấn đề gì trường thiết kế kém có thể gây ra?
10. Bạn dùng gì để giải quyết bất thường trường?
11. Nêu ba yếu tố của Trường lý tưởng.
12. Dưới điều kiện nào dữ liệu thừa chấp nhận được?
13. Nói chung, ba bước nào bạn làm để giải quyết trường đa giá trị?
14. Khi nào cần dùng trường trùng trong bảng?
15. Bạn có thể tinh chỉnh cấu trúc bảng thế nào?
16. Nêu ba yếu tố của Bảng lý tưởng.
17. Bảng tập con là gì?

---

# Phụ lục A: Đáp án Câu hỏi ôn tập – Chương 7

**Chương 7**

1. Bạn xác định và thiết lập bảng cho cơ sở dữ liệu mới bằng Danh sách bảng sơ bộ.

2. Bạn dùng Danh sách trường sơ bộ để giúp định nghĩa bảng vì các trường trên danh sách có thể ngụ ý chủ đề cơ sở dữ liệu cần theo dõi.

3. Khi mục trên danh sách chủ đề và mục tên khác trên Danh sách bảng sơ bộ đều đại diện cùng chủ đề, bạn chọn tên mô tả tốt nhất chủ đề và dùng làm định danh duy nhất cho chủ đề đó.

4. Danh sách bảng cuối cùng cung cấp tên, loại và mô tả mỗi bảng trong cơ sở dữ liệu.

5. Đây là hướng dẫn tạo tên bảng: Tạo tên duy nhất, mô tả rõ, có ý nghĩa với toàn bộ tổ chức; tạo tên chính xác, rõ ràng, không mơ hồ xác định chủ đề bảng; dùng số từ tối thiểu cần thiết; không dùng từ biểu đạt đặc điểm vật lý; không dùng chữ viết tắt và viết tắt; không dùng tên riêng hoặc từ hạn chế dữ liệu nhập; không dùng tên xác định nhiều chủ đề; dùng dạng số nhiều.

6. Đây là hướng dẫn soạn mô tả bảng: Bao gồm phát biểu định nghĩa chính xác bảng; bao gồm phát biểu giải thích tại sao bảng quan trọng với tổ chức; soạn mô tả rõ ràng và ngắn gọn; không bao gồm thông tin triển khai cụ thể; không làm mô tả bảng này phụ thuộc mô tả bảng kia; không dùng ví dụ.

7. Bạn gán trường cho bảng trên Danh sách bảng cuối cùng bằng cách xác định trường nào mô tả tốt nhất đặc điểm chủ đề của bảng.

8. Đây là hướng dẫn tạo tên trường: Tạo tên duy nhất, mô tả rõ, có ý nghĩa; tạo tên chính xác, rõ ràng, không mơ hồ xác định đặc điểm; dùng số từ tối thiểu; không dùng chữ viết tắt, dùng viết tắt thận trọng; không dùng từ gây nhầm lẫn; không dùng tên xác định nhiều đặc điểm; dùng dạng số ít.

9. Trường thiết kế kém có thể gây vấn đề với dữ liệu trùng và dữ liệu thừa.

10. Bạn có thể giải quyết bất thường trường bằng cách đảm bảo trường tuân thủ Các yếu tố của Trường lý tưởng.

11. Đây là Các yếu tố của Trường lý tưởng: Đại diện đặc điểm phân biệt của chủ đề bảng; chỉ chứa một giá trị duy nhất; không thể phân tách thành thành phần nhỏ hơn; không chứa giá trị tính toán hoặc nối chuỗi; duy nhất trong toàn bộ cấu trúc cơ sở dữ liệu; giữ phần lớn thuộc tính khi xuất hiện trong nhiều bảng.

12. Dữ liệu thừa chấp nhận được khi là kết quả giải quyết trường đa giá trị hoặc trường trùng không cần thiết, nhưng chỉ khi ở giai đoạn đầu thiết kế bảng.

13. Nói chung, ba bước bạn làm để giải quyết trường đa giá trị: Loại trường khỏi bảng và dùng làm cơ sở cho bảng mới; dùng trường (hoặc tập trường) từ bảng gốc để liên kết bảng gốc với bảng mới; gán tên, loại và mô tả phù hợp cho bảng mới và thêm vào Danh sách bảng cuối cùng.

14. Trường hợp duy nhất cần dùng trường trùng trong bảng là khi trường phục vụ thiết lập mối quan hệ giữa hai bảng.

15. Bạn có thể tinh chỉnh cấu trúc bảng bằng cách đảm bảo mỗi bảng tuân thủ Các yếu tố của Bảng lý tưởng.

16. Đây là Các yếu tố của Bảng lý tưởng: Đại diện một chủ đề duy nhất (đối tượng hoặc sự kiện); có khóa chính; không chứa trường đa phần hoặc đa giá trị; không chứa trường tính toán; không chứa trường trùng không cần thiết; chỉ chứa lượng dữ liệu thừa tối thiểu tuyệt đối.

17. Bảng tập con là bảng đại diện chủ đề phụ thuộc của bảng dữ liệu cụ thể.

---

*Kết thúc nội dung Chương 7*
