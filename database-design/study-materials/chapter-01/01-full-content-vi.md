# Chương 1: Cơ sở dữ liệu quan hệ

**Nguồn:** *Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*  
**Tác giả:** Michael J. Hernandez

---

*"Con cá phải bơi ba lần—trong nước, trong bơ, và trong rượu."*  
—TỤC NGỮ BA LAN

---

## Các chủ đề trong chương này

- Cơ sở dữ liệu là gì?
- Cơ sở dữ liệu quan hệ
- Bước tiếp theo là gì?
- Tóm tắt
- Câu hỏi ôn tập

---

## Nội dung chương đầy đủ

Cơ sở dữ liệu quan hệ đã tồn tại được 50 năm vào thời điểm viết sách. Đúng vậy—50 năm! Nó tiếp tục là ngành công nghiệp hàng tỉ đô la, vẫn là loại cơ sở dữ liệu được sử dụng rộng rãi nhất, đã trụ vững qua nhiều thay đổi trong thế giới cơ sở dữ liệu, đã chứng minh giá trị qua thời gian, và là phần thiết yếu trong cuộc sống hàng ngày của chúng ta. Rất có thể bạn đang sử dụng cơ sở dữ liệu quan hệ mỗi khi mua hàng trực tuyến hoặc tại cửa hàng địa phương, lên kế hoạch du lịch trực tuyến hoặc với đại lý du lịch, mượn sách tại thư viện, hoặc gọi món qua ứng dụng trên thiết bị di động.

## Cơ sở dữ liệu là gì?

Cơ sở dữ liệu là gì? Như bạn có thể đã biết, cơ sở dữ liệu là tập hợp dữ liệu có tổ chức được sử dụng nhằm mô hình hóa một loại tổ chức hoặc quy trình tổ chức nào đó. Việc bạn dùng bảng tính hay chương trình ứng dụng cơ sở dữ liệu trên máy tính để thu thập và lưu trữ dữ liệu thực sự không quan trọng. Chỉ cần bạn thu thập dữ liệu theo cách có tổ chức vì mục đích cụ thể, bạn đã có cơ sở dữ liệu. Trong phần còn lại của cuộc thảo luận này, chúng ta giả định rằng bạn đang sử dụng chương trình ứng dụng để thu thập và duy trì dữ liệu của mình.

Hai loại cơ sở dữ liệu trong quản lý cơ sở dữ liệu là cơ sở dữ liệu nghiệp vụ và cơ sở dữ liệu phân tích.

**Cơ sở dữ liệu nghiệp vụ** là xương sống của nhiều công ty, tổ chức và cơ sở trên khắp thế giới. Loại cơ sở dữ liệu này chủ yếu được sử dụng trong các kịch bản xử lý giao dịch trực tuyến (OLTP); nghĩa là trong các tình huống cần thu thập, sửa đổi và duy trì dữ liệu hàng ngày. Loại dữ liệu lưu trong cơ sở dữ liệu nghiệp vụ là động, nghĩa là nó thay đổi liên tục và luôn phản ánh thông tin cập nhật đến từng phút. Các tổ chức như cửa hàng bán lẻ, công ty sản xuất, bệnh viện và phòng khám, và nhà xuất bản sử dụng cơ sở dữ liệu nghiệp vụ vì dữ liệu của họ luôn ở trạng thái biến đổi.

Ngược lại, **cơ sở dữ liệu phân tích** chủ yếu được sử dụng trong các kịch bản xử lý phân tích trực tuyến (OLAP), nơi cần lưu trữ và theo dõi dữ liệu lịch sử và phụ thuộc thời gian. Cơ sở dữ liệu phân tích là tài sản quý giá khi cần theo dõi xu hướng, xem dữ liệu thống kê trong thời gian dài, và đưa ra dự báo chiến thuật hoặc chiến lược kinh doanh. Loại cơ sở dữ liệu này lưu dữ liệu tĩnh, nghĩa là dữ liệu không bao giờ (hoặc rất hiếm khi) bị sửa đổi. Thông tin thu được từ cơ sở dữ liệu phân tích phản ánh bản chụp dữ liệu tại một thời điểm. Phòng thí nghiệm hóa học, công ty địa chất và hãng phân tích tiếp thị là ví dụ về các tổ chức sử dụng cơ sở dữ liệu phân tích.

Cơ sở dữ liệu phân tích thường sử dụng dữ liệu từ cơ sở dữ liệu nghiệp vụ làm nguồn dữ liệu chính, do đó có thể có một mức độ liên kết nào đó giữa chúng; tuy nhiên, cơ sở dữ liệu nghiệp vụ và phân tích đáp ứng các loại nhu cầu xử lý dữ liệu rất cụ thể và việc tạo cấu trúc của chúng đòi hỏi các phương pháp thiết kế hoàn toàn khác nhau. Cuốn sách này tập trung vào việc thiết kế cơ sở dữ liệu nghiệp vụ vì nó vẫn là loại cơ sở dữ liệu được sử dụng phổ biến nhất trên thế giới hiện nay.

## Cơ sở dữ liệu quan hệ

Cơ sở dữ liệu quan hệ được hình thành năm 1969 và vẫn là một trong các mô hình cơ sở dữ liệu được sử dụng rộng rãi nhất trong quản lý cơ sở dữ liệu ngày nay. Cha đẻ của mô hình quan hệ, Tiến sĩ Edgar F. Codd, là nhà khoa học nghiên cứu tại IBM vào cuối thập niên 1960 và đang tìm cách mới để xử lý lượng lớn dữ liệu. Sự không hài lòng của ông với các mô hình cơ sở dữ liệu và sản phẩm cơ sở dữ liệu thời đó đã khiến ông suy nghĩ cách áp dụng các nguyên tắc và cấu trúc toán học để giải quyết vô số vấn đề ông gặp phải. Là nhà toán học chuyên nghiệp, ông tin chắc rằng có thể áp dụng các nhánh toán học cụ thể để giải quyết các vấn đề như trùng lặp dữ liệu, tính toàn vẹn dữ liệu yếu, và sự phụ thuộc quá mức của cấu trúc cơ sở dữ liệu vào triển khai vật lý của nó.

Tiến sĩ Codd trình bày chính thức mô hình quan hệ mới của mình trong công trình nổi bật có tựa đề "A Relational Model of Data for Large Shared Databanks"[^1] vào tháng 6 năm 1970. Ông xây dựng mô hình mới dựa trên hai nhánh toán học—lý thuyết tập hợp và logic vị từ bậc một. Thực ra, tên của mô hình xuất phát từ thuật ngữ *relation* (quan hệ), là phần của lý thuyết tập hợp. (Một quan niệm sai phổ biến là mô hình quan hệ lấy tên từ việc các bảng trong cơ sở dữ liệu quan hệ có thể liên quan với nhau.)

[^1]: Edgar F. Codd, "A Relational Model of Data for Large Shared Databanks," Communications of the ACM, tháng 6 năm 1970, trang 377–87.

Cơ sở dữ liệu quan hệ lưu dữ liệu trong các *relations* (quan hệ), mà người dùng nhận biết như các bảng. Mỗi quan hệ gồm các *tuples* (bản ghi) và *attributes* (trường). (Tôi sẽ dùng thuật ngữ bảng, bản ghi và trường trong phần còn lại của cuốn sách.) Thứ tự vật lý của các bản ghi hoặc trường trong bảng hoàn toàn không quan trọng, và mỗi bản ghi trong bảng được xác định bởi một trường chứa giá trị duy nhất. Đây là hai đặc điểm của cơ sở dữ liệu quan hệ cho phép dữ liệu tồn tại độc lập với cách nó được lưu trữ vật lý trong máy tính. Do đó, người dùng không cần biết vị trí vật lý của bản ghi để truy xuất dữ liệu của nó.

Mô hình quan hệ phân loại các mối quan hệ là một-một, một-nhiều và nhiều-nhiều. (Các mối quan hệ này được trình bày chi tiết ở Chương 10, "Mối quan hệ bảng.") Mối quan hệ giữa một cặp bảng được thiết lập ngầm định qua các giá trị khớp nhau của trường dùng chung. Trong Hình 1.1 chẳng hạn, các bảng CLIENTS và AGENTS có mối quan hệ một-nhiều và liên quan qua trường AGENT ID; một đại lý cụ thể liên kết với một hoặc nhiều khách hàng qua AGENT ID khớp nhau. Tương tự, các bảng ENTERTAINERS và ENGAGEMENTS có mối quan hệ một-nhiều và liên quan qua ENTERTAINER ID; một nghệ sĩ trong bảng ENTERTAINERS có thể liên kết với một hoặc nhiều buổi biểu diễn trong bảng ENGAGEMENTS qua các ENTERTAINER ID khớp nhau.

Miễn là người dùng quen với các mối quan hệ giữa các bảng trong cơ sở dữ liệu, anh ta có thể truy cập dữ liệu theo vô số cách. Anh ta có thể truy cập dữ liệu từ các bảng liên quan trực tiếp và từ các bảng liên quan gián tiếp. Hãy xem tập hợp các bảng trong Hình 1.1. Mặc dù bảng CLIENTS liên quan gián tiếp với bảng ENGAGEMENTS, người dùng vẫn có thể tạo danh sách khách hàng và các nghệ sĩ đã biểu diễn cho họ. (Tất nhiên, thực tế phụ thuộc vào cách các bảng thực sự được cấu trúc, nhưng tôi đi lạc đề. Ví dụ này phục vụ mục đích của chúng ta lúc này.) Anh ta có thể làm điều này dễ dàng vì CLIENTS liên quan trực tiếp với ENGAGEMENTS và ENGAGEMENTS liên quan trực tiếp với ENTERTAINERS.

**Hình 1.1** Ví dụ về các bảng liên quan trong cơ sở dữ liệu quan hệ.

### Truy xuất dữ liệu

Bạn truy xuất dữ liệu trong cơ sở dữ liệu quan hệ bằng cách sử dụng Ngôn ngữ truy vấn có cấu trúc (SQL). SQL là ngôn ngữ chuẩn dùng để tạo, sửa đổi, duy trì và truy vấn cơ sở dữ liệu quan hệ. Hình 1.2 cho thấy câu lệnh truy vấn SQL mẫu bạn có thể dùng để tạo danh sách tất cả khách hàng ở thành phố El Paso.

**Hình 1.2** Một câu lệnh truy vấn SQL mẫu.

Ba thành phần của truy vấn SQL cơ bản là câu lệnh SELECT…FROM, mệnh đề WHERE và mệnh đề ORDER BY. Bạn dùng mệnh đề SELECT để chỉ ra các trường muốn thấy trong truy vấn và mệnh đề FROM để chỉ ra bảng (các bảng) mà các trường thuộc về. Bạn có thể lọc các bản ghi truy vấn trả về bằng cách đặt điều kiện với một hoặc nhiều trường bằng mệnh đề WHERE, rồi sắp xếp kết quả theo thứ tự tăng dần hoặc giảm dần với mệnh đề ORDER BY.

Hầu hết các chương trình phần mềm cơ sở dữ liệu quan hệ chính hiện nay tích hợp nhiều dạng triển khai SQL, từ các cửa sổ cho phép người dùng nhập thủ công câu lệnh SQL "thô" đến các công cụ cho phép người dùng xây dựng truy vấn bằng trình xây dựng truy vấn và biểu mẫu truy vấn. Ví dụ, người dùng làm việc với R:BASE của R:BASE Technologies có thể chọn xây dựng và thực thi trực tiếp câu lệnh truy vấn SQL từ dòng lệnh "R>", trong khi người dùng Microsoft SQL Server có thể thấy dễ hơn và nhanh hơn khi xây dựng truy vấn phức tạp bằng cửa sổ "Query Designer" của SQL Server. Bất kể truy vấn được xây dựng như thế nào, người dùng có thể lưu chúng để sử dụng sau này.

Bạn không phải lúc nào cũng cần biết SQL để làm việc với cơ sở dữ liệu. Nếu phần mềm cơ sở dữ liệu của bạn cung cấp trình xây dựng truy vấn, hoặc bạn đang dùng ứng dụng tùy chỉnh để làm việc với dữ liệu trong cơ sở dữ liệu, bạn sẽ không bao giờ cần viết một câu lệnh SQL nào. Tuy nhiên, có hiểu biết cơ bản về SQL là ý tưởng tốt. Nó sẽ giúp những người dùng trình xây dựng truy vấn hiểu và xử lý sự cố các truy vấn bạn tạo bằng các công cụ đó, và chắc chắn sẽ có lợi cho bạn nếu cần làm việc với các chương trình phần mềm cơ sở dữ liệu cao cấp như Oracle và Microsoft SQL Server.

**Lưu ý:** Mặc dù thảo luận chi tiết về SQL nằm ngoài phạm vi cuốn sách này, bạn nên hiểu rằng SQL là ngôn ngữ liên quan trực tiếp đến mô hình cơ sở dữ liệu quan hệ. Nếu bạn có mong muốn hoặc nhu cầu học SQL, bạn có thể bắt đầu bằng cách đọc *SQL Queries for Mere Mortals*, Phiên bản thứ 4, rồi chuyển sang bất kỳ cuốn sách SQL nào khác trong danh sách đọc đề xuất của tôi ở Phụ lục H.

### Ưu điểm của cơ sở dữ liệu quan hệ

Cơ sở dữ liệu quan hệ cung cấp nhiều ưu điểm, chẳng hạn như sau:

- **Tính toàn vẹn đa cấp tích hợp sẵn:** Tính toàn vẹn dữ liệu được tích hợp vào cơ sở dữ liệu ở cấp trường để đảm bảo độ chính xác của dữ liệu; ở cấp bảng để đảm bảo các bản ghi không trùng lặp và phát hiện giá trị khóa chính thiếu; ở cấp mối quan hệ để đảm bảo mối quan hệ giữa một cặp bảng hợp lệ; và ở cấp nghiệp vụ để đảm bảo dữ liệu chính xác về mặt kinh doanh. (Tính toàn vẹn được thảo luận chi tiết khi quy trình thiết kế triển khai.)

- **Độc lập logic và vật lý của dữ liệu khỏi các ứng dụng cơ sở dữ liệu:** Cả thay đổi người dùng đối với thiết kế logic của cơ sở dữ liệu và thay đổi nhà cung cấp phần mềm cơ sở dữ liệu đối với triển khai vật lý của cơ sở dữ liệu đều không cần ảnh hưởng xấu đến các ứng dụng xây dựng trên nó.

- **Đảm bảo tính nhất quán và độ chính xác dữ liệu:** Dữ liệu nhất quán và chính xác nhờ các mức tính toàn vẹn khác nhau bạn có thể áp đặt trong cơ sở dữ liệu. (Điều này sẽ trở nên khá rõ khi bạn làm việc qua quy trình thiết kế.)

- **Truy xuất dữ liệu dễ dàng:** Người dùng có thể truy xuất dữ liệu từ một bảng cụ thể hoặc từ bất kỳ số lượng bảng liên quan nào trong cơ sở dữ liệu. Điều này cho phép người dùng xem thông tin theo vô số cách.

Những ưu điểm này cùng các ưu điểm khác đã chứng minh có lợi cho cộng đồng kinh doanh và tất cả những ai cần thu thập và quản lý dữ liệu. Thực vậy, cơ sở dữ liệu quan hệ vẫn là sự lựa chọn cơ sở dữ liệu trong nhiều trường hợp.

Một nhược điểm thường được cho là của cơ sở dữ liệu quan hệ là các chương trình phần mềm dựa trên nó chạy rất chậm. Đây không phải lỗi của chính mô hình quan hệ, mà của công nghệ phụ trợ có sẵn lúc mô hình ra đời. Tốc độ xử lý, bộ nhớ và lưu trữ đơn giản là không đủ để cung cấp cho các nhà cung cấp phần mềm cơ sở dữ liệu nền tảng xây dựng triển khai đầy đủ cơ sở dữ liệu quan hệ, nên các chương trình phần mềm cơ sở dữ liệu quan hệ ban đầu thua xa tiềm năng đầy đủ của chúng. Những tiến bộ trong cả công nghệ phần cứng và kỹ thuật phần mềm trong 50 năm qua đã biến tốc độ xử lý và đọc/ghi thành vấn đề không đáng kể và cho phép các nhà cung cấp đạt được tiến bộ đáng kể trong nỗ lực hỗ trợ mô hình đầy đủ hơn.

Bạn sẽ học thêm về mô hình cơ sở dữ liệu quan hệ khi làm việc qua quy trình thiết kế được trình bày trong cuốn sách này. Một số chủ đề bạn sẽ gặp gồm tạo bảng, thiết lập tính toàn vẹn dữ liệu, làm việc với các mối quan hệ và thiết lập quy tắc nghiệp vụ.

### Hệ thống quản lý cơ sở dữ liệu quan hệ

Hệ thống quản lý cơ sở dữ liệu quan hệ (RDBMS) là chương trình ứng dụng phần mềm bạn dùng để tạo, duy trì, sửa đổi và thao tác cơ sở dữ liệu quan hệ. Nhiều chương trình RDBMS cũng cung cấp các công cụ bạn cần để tạo nhiều loại ứng dụng người dùng cuối tương tác với dữ liệu lưu trong cơ sở dữ liệu. Tất nhiên, chất lượng của RDBMS là hàm số trực tiếp của mức độ nó hỗ trợ mô hình cơ sở dữ liệu quan hệ. Ngay trong số các RDBMS "đúng nghĩa", sự hỗ trợ cho cơ sở dữ liệu quan hệ khác nhau giữa các nhà cung cấp, và vẫn chưa có triển khai đầy đủ tiềm năng của mô hình quan hệ. Dù vậy, các chương trình RDBMS vẫn tiếp tục tiến hóa và trở nên đầy tính năng và mạnh mẽ hơn bao giờ hết. Ví dụ RDBMS gồm IBM DB2, IBM Informix, Microsoft Access, Microsoft SQL Server, MySQL, Oracle RDBMS, PostgreSQL, SAP SQL Anywhere, SAP Sybase ASE và SQLite.

## Bước tiếp theo là gì?

Bước tiếp theo là gì? Đó là câu hỏi rất hay. Tôi tin rằng công nghệ, kỹ thuật phần mềm và ngành cơ sở dữ liệu nói chung đã tiến hóa nhanh hơn bất kỳ ai có thể tưởng tượng. Bạn có thể nói, "Nhưng Mike, đã 50 năm rồi!" Và tôi sẽ nói, đúng—nhưng đã là 50 năm như thế nào! Khi tôi còn rất nhỏ đọc truyện tranh siêu anh hùng và khoa học viễn tưởng, ô tô, thiết bị, không gian sống và công nghệ nói chung có vẻ thuộc tương lai xa xôi. Chắc chắn, tôi từng đọc truyện tranh khoa học viễn tưởng có câu chuyện về người bay bằng ô tô và dùng thiết bị chống trọng lực cá nhân nhỏ, tất cả đặt vào giữa thập niên 1990! (Tôi vẫn đang chờ dây đai bay cá nhân của mình, cảm ơn nhiều!) Khi mới teen tôi xem chương trình tương lai tuyệt vời tên "Star Trek" cho thấy người ta dùng thiết bị cầm tay nhỏ và huy hiệu làm thiết bị liên lạc; máy tính biết nói; màn hình phẳng; máy tái tạo thức ăn—danh sách còn dài. Tôi từng tự hỏi, "Liệu tôi có còn sống để thấy và dùng tất cả những thứ tuyệt vời đó không?"

Chuyển nhanh đến cuối thập niên 70, 80 và 90. Giờ chúng ta có máy tính đặt vừa bàn làm việc, điện thoại di động, điện thoại thông minh, màn hình phẳng và màn hình TV, và sự ra đời của Internet. Máy tính được cho là làm cuộc sống chúng ta dễ dàng hơn, cho phép chúng ta làm việc hiệu quả và năng suất hơn, và loại bỏ hầu như mọi loại biểu mẫu và báo cáo giấy.

Giờ chuyển sang thập niên 2000. Chúng ta có TV màn hình phẳng khổng lồ. Điện thoại thông minh đã, với nhiều người, thay thế máy ảnh và máy quay video. Điều tuyệt vời nhất, theo ý tôi, là lượng sức mạnh tính toán chúng ta giờ có ngay trong tầm tay. Trước đây, megabyte từng được đặt trong máy tính chiếm cả phòng điều hòa, và gigabyte là đơn vị dung lượng lưu trữ chúng ta nghĩ còn xa hàng thập kỷ. Giờ người tiêu dùng nói về terabyte mà không nghĩ ngợi; bạn có thể mua điện thoại thông minh với dung lượng lưu trữ một terabyte. Một terabyte. Đúng vậy, chúng ta đã đi được quãng đường dài. Kỳ diệu.

Tại sao tôi đề cập tiến bộ công nghệ? Vì chúng đã ảnh hưởng đến các hệ thống quản lý cơ sở dữ liệu quan hệ và cung cấp nền tảng cho việc phát triển và sử dụng các hệ thống phi quan hệ.

Ngày xưa, các công ty phần mềm cơ sở dữ liệu gặp khó khi triển khai cơ sở dữ liệu quan hệ vì một số khía cạnh của mô hình. Ví dụ, truy vấn đa bảng ban đầu khó triển khai. Xây dựng và hiển thị truy vấn có thể tốn rất nhiều thời gian xử lý nếu nó lấy dữ liệu từ nhiều bảng, đặc biệt nếu các bảng có số lượng bản ghi lớn. Thêm vào đó, báo cáo dựa trên truy vấn này cũng tốn thời gian in, vì những lý do tương tự. Nhưng tiến bộ công nghệ về tốc độ xử lý bộ nhớ và đọc/ghi đĩa đã làm giảm đáng kể vấn đề này. Những tiến bộ này cũng cho phép các hệ thống quản lý cơ sở dữ liệu quan hệ trở nên mạnh mẽ và mở rộng hơn và cho phép chúng hỗ trợ mức tính toàn vẹn dữ liệu cao hơn trước.

Trong vài năm qua, nhu cầu lưu trữ dữ liệu và đối tượng không vừa khớp với cấu trúc bảng/trường/bản ghi của mô hình cơ sở dữ liệu quan hệ đã phát triển. Các mục như ảnh, dữ liệu chỉ đọc cho ứng dụng web, dữ liệu đồ thị, dữ liệu địa không gian và dữ liệu phân tích là ví dụ về các loại dữ liệu không vừa khớp hoàn toàn với mô hình quan hệ. Tiến bộ công nghệ đã cung cấp cho mọi người các công cụ nền tảng cho phép họ tạo các loại cơ sở dữ liệu và hệ thống quản lý cơ sở dữ liệu mới có thể xử lý những loại dữ liệu này, trong khi trước đây gần như không thể làm điều đó. Ví dụ về các hệ thống cơ sở dữ liệu này gồm MongoDB, Couchbase, HBase, Cassandra và Redis.

Như tôi đã đề cập trước đó, mô hình cơ sở dữ liệu quan hệ đã 50 năm tuổi, và tôi kỳ vọng nó sẽ còn tồn tại nhiều năm nữa. Tại sao tôi lạc quan đến vậy? Vì cơ sở dữ liệu quan hệ được sử dụng ở khắp nơi—chúng là phần phổ biến trong cuộc sống của chúng ta. Chúng điều khiển mọi thứ từ hệ thống doanh nghiệp nhỏ đến hệ thống cộng tác phòng ban đến hệ thống công ty toàn công ty. Chúng được sử dụng trên máy để bàn, mạng công ty và thậm chí trên thiết bị cá nhân. Cơ sở dữ liệu quan hệ dễ sử dụng và duy trì, chúng rất giỏi triển khai và thực thi tính toàn vẹn dữ liệu, chúng có cấu trúc vững chắc (khi được xây đúng), chúng có thể mở rộng và chúng đáp ứng nhu cầu cơ sở dữ liệu trong đa số trường hợp. (Nhưng hãy nhận ra, theo nghĩa thực tiễn, rằng cơ sở dữ liệu quan hệ không phải cấu trúc "một cỡ vừa tất cả.")

Tôi cũng lạc quan vì câu trích sau từ bài viết ngày 14 tháng 8 năm 2019, tựa đề "Best Relational Database" từ trang web Database Trends and Applications. "Theo Craig S. Mullins, chủ tịch và chuyên gia tư vấn chính, Mullins Consulting, Inc, quan hệ tiếp tục thống trị: IDC dự báo cơ sở dữ liệu quan hệ sẽ vẫn chiếm hơn 80% tổng thị trường cơ sở dữ liệu nghiệp vụ qua năm 2022, và Gartner dự báo qua năm 2020, công nghệ quan hệ sẽ tiếp tục được sử dụng cho ít nhất 70% ứng dụng và dự án mới." Dù các dự báo này có còn tương đối ổn định trong 10 năm tới hay không, cơ sở dữ liệu quan hệ vẫn giữ phần khá lớn thị trường cơ sở dữ liệu.

Chúc mừng sinh nhật, cơ sở dữ liệu quan hệ!

---

## Tóm tắt

Chúng ta mở đầu chương này bằng cách định nghĩa thuật ngữ cơ sở dữ liệu và mô tả hai loại cơ sở dữ liệu hiện được sử dụng trong quản lý cơ sở dữ liệu: nghiệp vụ và phân tích.

Tiếp theo, có thảo luận chi tiết về mô hình cơ sở dữ liệu quan hệ, lịch sử và các tính năng của nó. Bạn đã học rằng nó dựa trên các nhánh toán học cụ thể và rằng nền tảng toán học này là thứ làm cho mô hình vững chắc về cấu trúc. Sau đó chúng ta khám phá cấu trúc dữ liệu và các mối quan hệ của mô hình cũng như vai trò SQL trong truy cập dữ liệu trong mô hình. Ở đây bạn đã học rằng SQL là ngôn ngữ chuẩn dùng để làm việc với cơ sở dữ liệu quan hệ. Chúng ta kết thúc phần này bằng cách xem lại các ưu điểm của mô hình cơ sở dữ liệu quan hệ và định nghĩa hệ thống quản lý cơ sở dữ liệu quan hệ là gì. Bạn đã học cách tiến bộ công nghệ đã ảnh hưởng cuộc sống hàng ngày của chúng ta và mức độ ảnh hưởng đó lan tỏa ra sao. Bạn cũng đã học điều gì đã cho phép cơ sở dữ liệu quan hệ tồn tại 50 năm và tác động RDBMS đã có trong mọi loại kịch bản kinh doanh.

Chương tiếp theo trình bày tại sao bạn nên quan tâm thiết kế cơ sở dữ liệu và tại sao lý thuyết quan trọng. Chúng ta cũng sẽ trình bày các mục tiêu và ưu điểm của thiết kế tốt.

---

## Câu hỏi ôn tập

1. Đặt tên hai loại cơ sở dữ liệu chính đang được sử dụng ngày nay.

2. Cơ sở dữ liệu phân tích lưu loại dữ liệu gì?

3. Đúng hay Sai: Cơ sở dữ liệu nghiệp vụ được sử dụng chủ yếu trong các kịch bản xử lý giao dịch trực tuyến (OLTP).

4. Đặt tên một trong các nhánh toán học mà mô hình quan hệ dựa trên.

5. Cơ sở dữ liệu quan hệ lưu dữ liệu như thế nào?

6. Đặt tên ba loại mối quan hệ trong cơ sở dữ liệu quan hệ.

7. Bạn truy xuất dữ liệu trong cơ sở dữ liệu quan hệ như thế nào?

8. Nêu hai ưu điểm của cơ sở dữ liệu quan hệ.

9. Hệ thống quản lý cơ sở dữ liệu quan hệ là gì?

10. Đúng hay Sai: Thiết bị di động bị giới hạn dung lượng lưu trữ tính bằng gigabyte.

11. Nêu lý do tại sao các công ty phần mềm cơ sở dữ liệu gặp khó khi triển khai cơ sở dữ liệu quan hệ.
