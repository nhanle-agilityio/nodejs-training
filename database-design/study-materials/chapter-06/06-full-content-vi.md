# Chương 6: Phân tích cơ sở dữ liệu hiện tại

**Nguồn:** *Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)*  
**Tác giả:** Michael J. Hernandez

---

*"Để thấy được điều ngay trước mắt cần một cuộc đấu tranh không ngừng."*  
—GEORGE ORWELL, IN FRONT OF YOUR NOSE

---

## Các chủ đề trong chương này

- Làm quen với cơ sở dữ liệu hiện tại
- Tiến hành phân tích
- Xem xét cách thu thập dữ liệu
- Xem xét cách trình bày thông tin
- Tiến hành phỏng vấn
- Phỏng vấn người dùng
- Phỏng vấn quản lý
- Biên soạn danh sách trường hoàn chỉnh
- Ví dụ: Phân tích cơ sở dữ liệu hiện tại
- Tóm tắt
- Câu hỏi ôn tập

---

## Làm quen với cơ sở dữ liệu hiện tại

Để xác định nơi bạn nên đến, trước tiên bạn phải hiểu bạn đang ở đâu.

Châm ngôn này định nghĩa toàn bộ triết lý đằng sau giai đoạn này của quy trình thiết kế cơ sở dữ liệu. Bạn phải dành thời gian để có được sự hiểu biết rõ ràng về cơ sở dữ liệu của tổ chức mình nhằm có thể:

- Xác định liệu cơ sở dữ liệu có hỗ trợ các yêu cầu thông tin hiện tại của tổ chức hay không
- Phát hiện các thiếu sót cấu trúc hiện có
- Xác định cơ sở dữ liệu cần phát triển như thế nào để hỗ trợ các yêu cầu thông tin tương lai của tổ chức

Bạn có thể sử dụng cơ sở dữ liệu hiện có làm tài nguyên để phát triển cơ sở dữ liệu mới. Tuy nhiên, bạn phải phán đoán cẩn thận những khía cạnh nào của cơ sở dữ liệu hiện tại vẫn hữu ích và những khía cạnh nào nên loại bỏ. Bạn có thể đưa ra những phán đoán này bằng cách trả lời các câu hỏi sau:

- Tổ chức sử dụng những loại dữ liệu nào?
- Tổ chức sử dụng dữ liệu đó như thế nào?
- Tổ chức quản lý và duy trì dữ liệu đó như thế nào?

Câu trả lời cho những câu hỏi này cung cấp cho bạn thông tin quan trọng mà bạn có thể sử dụng để thiết kế cơ sở dữ liệu phù hợp nhất với nhu cầu của tổ chức.

Bạn có thể trả lời những câu hỏi này tốt nhất bằng cách phân tích cơ sở dữ liệu hiện có của tổ chức. Rất có thể tổ chức đang sử dụng một số loại cơ sở dữ liệu, và nó có thể được liên kết với một trong các danh mục sau:

**Paper-based database.** Còn được gọi là hệ thống tệp, thường gồm nhiều biểu mẫu và tài liệu viết tay hoặc in ấn được lưu trữ trong thư mục tệp hoặc đóng gáy trong sổ tay. Các thư mục và sổ tay được nhận dạng bằng sơ đồ mã hóa (ví dụ: số duy nhất hoặc nhãn màu) và được lưu trong tủ hồ sơ. Các tủ này cũng có thể được nhận dạng bằng sơ đồ mã hóa, tùy thuộc vào quy mô của cơ sở dữ liệu. (Bạn sẽ ngạc nhiên khi biết bao nhiêu doanh nghiệp vẫn có một dạng hệ thống paper-based nào đó.)

**Legacy database** đã tồn tại và được sử dụng trong nhiều năm và gồm nhiều loại cấu trúc dữ liệu và giao diện người dùng khác nhau, tất cả đều nằm trên máy chủ lớn, máy chủ mạng, máy tính cá nhân, hoặc gần đây hơn là trên đám mây. Khả năng, chức năng và hiệu quả của các cấu trúc và màn hình khá phụ thuộc vào kỹ năng và kiến thức của các nhà phát triển, công cụ phát triển ứng dụng và phần mềm quản lý cơ sở dữ liệu được dùng để tạo ra chúng.

**Cơ sở tri thức con người** (định nghĩa không chặt chẽ) dựa trên trí nhớ của một hoặc nhiều nhân viên trong tổ chức. Những cá nhân này có lượng kiến thức cụ thể về một khía cạnh nhất định của tổ chức (ví dụ: thông tin khách hàng hoặc chi tiết sản phẩm), và họ rất quan trọng đối với hoạt động kinh doanh của tổ chức.

Mục tiêu phân tích của bạn là xác định các loại dữ liệu tổ chức sử dụng, cách tổ chức quản lý và duy trì dữ liệu đó, và cách tổ chức xem và sử dụng dữ liệu. Bạn có thể giảm thời gian cần thiết để xác định các cấu trúc trường và bảng sơ bộ cho cơ sở dữ liệu mới nếu bạn tiến hành cuộc điều tra này đúng cách.

Trong quá trình phân tích, bạn rà soát các cách khác nhau mà tổ chức thu thập và trình bày dữ liệu của mình, và bạn tiến hành một loạt cuộc phỏng vấn với người dùng và quản lý. Sau đó bạn sử dụng thông tin đã thu thập để xác định Preliminary Field List và giúp xác định các bảng cần được đưa vào cấu trúc cơ sở dữ liệu ban đầu. Nếu phân tích của bạn cho thấy cơ sở dữ liệu hiện tại được thiết kế kém, bạn có thể đề phòng để đảm bảo không mắc phải những sai lầm tương tự trong cơ sở dữ liệu mới. Dù có thể có những thiếu sót nào trong cơ sở dữ liệu hiện tại, nó vẫn có thể giúp bạn xác định một số trường và bảng cần đưa vào cơ sở dữ liệu mới.

Có một quy tắc bạn nên ghi nhớ trước tiên khi phân tích cơ sở dữ liệu hiện tại:

**Không nên chấp nhận cấu trúc cơ sở dữ liệu hiện tại làm cơ sở cho cấu trúc cơ sở dữ liệu mới.**

Tuân theo quy tắc này sẽ giúp bạn tránh những lỗi không cần thiết và hỗ trợ tối đa hóa nỗ lực thiết kế của bạn.

Thỉnh thoảng, trong quá trình phân tích sẽ có lúc một nhà phát triển cơ sở dữ liệu mới (và đôi khi là người có kinh nghiệm) dừng lại và nghĩ: "Cơ sở dữ liệu này không tệ lắm. Hãy kết thúc phân tích ở đây và dùng cơ sở dữ liệu này làm cơ sở cho cái mới." Đây là ý tưởng đặc biệt tệ vì mọi vấn đề ẩn trong cấu trúc cơ sở dữ liệu hiện tại sẽ được chuyển sang cơ sở dữ liệu mới. Các loại vấn đề này bao gồm cấu trúc bảng vụng về, mối quan hệ được định nghĩa kém và đặc tả trường không nhất quán; chúng sẽ không tránh khỏi xuất hiện sau này và vào những thời điểm ít thuận lợi nhất. Do đó, bạn nên làm hết sức để tránh tình huống nguy hiểm này bằng cách tuân theo quy tắc nói trên. Chỉ cần nhớ rằng luôn tốt hơn khi xác định rõ cấu trúc cơ sở dữ liệu mới thay vì sao chép cấu trúc hiện có. Suy cho cùng, nếu cơ sở dữ liệu cũ không có vấn đề thì bạn đã không phải xây dựng cơ sở dữ liệu mới.

Bạn thường phân tích paper-based database và legacy database trong phần này của quy trình thiết kế. Nhiều tổ chức sử dụng cả hai loại cơ sở dữ liệu ở mức độ nào đó, và bạn thực hiện quy trình phân tích cơ bản tương tự đối với từng loại. Có sự khác biệt nhỏ trong cách bạn phân tích paper-based database và legacy database, chắc chắn là vậy, nhưng sự khác biệt liên quan nhiều hơn đến chính các cơ sở dữ liệu chứ không phải quy trình phân tích tổng thể. Tuy nhiên, bạn không cần quan tâm đến những khác biệt này vì tôi đã tích hợp chúng liền mạch vào quy trình phân tích được trình bày trong cuốn sách này.

### Paper-Based Databases

Paper-based database bao gồm dữ liệu được thu thập, lưu trữ và duy trì theo nghĩa đen trên giấy, và bạn sẽ tìm thấy những mục này ở nhiều hình dạng, kích thước và cấu hình khác nhau. Một số định dạng phổ biến hơn bao gồm báo cáo viết tay hoặc in ấn và các loại biểu mẫu in sẵn khác nhau. Bất kỳ ai từng làm việc trong văn phòng doanh nghiệp, tổ chức hoặc cơ quan chính phủ đều rất quen thuộc với loại cơ sở dữ liệu này.

Bạn sẽ thấy việc phân tích paper-based database có thể là một nhiệm vụ khó khăn. Một trong những vấn đề cấp bách nhất của bạn là tìm ai đó hiểu hoàn toàn cách cơ sở dữ liệu hoạt động để bạn có thể học cách sử dụng và mục đích của nó. Có nhiều vấn đề với chính cơ sở dữ liệu, đặc biệt về cách dữ liệu được thu thập và quản lý. Loại cơ sở dữ liệu này thường chứa dữ liệu không nhất quán, dữ liệu sai, dữ liệu trùng lặp, dữ liệu thừa, mục nhập không đầy đủ và dữ liệu cũ lẽ ra đã phải được loại bỏ khỏi cơ sở dữ liệu từ lâu. Rõ ràng, lý do duy nhất bạn phân tích loại cơ sở dữ liệu này là để xác định các mục có thể đưa vào cơ sở dữ liệu mới. Ví dụ, bạn có thể trích xuất từng mẩu dữ liệu riêng lẻ từ các phần khác nhau của biểu mẫu trong cơ sở dữ liệu cũ và chuyển chúng thành các trường trong cơ sở dữ liệu mới.

### Legacy Databases

Legacy database là cơ sở dữ liệu đã tồn tại và được sử dụng từ năm năm trở lên. Có nhiều lý do "legacy" được dùng như một phần tên của loại cơ sở dữ liệu này. Thứ nhất, nó gợi ý rằng cơ sở dữ liệu đã tồn tại từ lâu, có thể lâu hơn bất kỳ ai có thể nhớ rõ. Thứ hai, từ legacy có thể có nghĩa là cá nhân ban đầu tạo ra cơ sở dữ liệu đã chuyển trách nhiệm trong tổ chức hoặc đang làm việc cho người khác và do đó, cơ sở dữ liệu đã trở thành di sản của người đó cho tổ chức. Thứ ba, thuật ngữ này ngụ ý khả năng phiền toái rằng không có cá nhân nào hiểu hoàn toàn cấu trúc cơ sở dữ liệu hoặc cách nó được triển khai trong chương trình ứng dụng RDBMS.

Dù legacy database dựa trên mô hình quan hệ, không có bảo đảm cụ thể nào rằng cấu trúc là vững chắc. Thật không may, có nhiều trường hợp những người tạo ra các cơ sở dữ liệu này không hiểu hoàn toàn khái niệm cơ sở dữ liệu quan hệ. (Sau khi đọc cuốn sách này, bạn sẽ không rơi vào nhóm đó.) Kết quả là nhiều cơ sở dữ liệu cũ có cấu trúc không đúng hoặc không hiệu quả.

Nhiều legacy database dựa trên PC cũng được thiết kế không đúng hoặc không hiệu quả. Một số trong số chúng ban đầu được phát triển và triển khai bởi những người không có nhiều kinh nghiệm thiết kế cơ sở dữ liệu, hoặc là những người không may được giao nhiệm vụ tạo cơ sở dữ liệu cho tổ chức và có rất ít thời gian để làm điều đó. (Họ cũng có công việc thông thường của riêng mình.) Điều này có nghĩa là họ cũng có khả năng không biết cách tận dụng lợi ích do mô hình quan hệ mang lại. Hai đặc điểm thường liên quan đến các loại cơ sở dữ liệu này là các trường trùng lặp và dữ liệu thừa. Bạn sẽ học sau rằng điều này có thể gây ra các vấn đề nghiêm trọng với tính toàn vẹn dữ liệu.

Phân tích legacy database phần nào dễ hơn phân tích paper-based database vì legacy database thường có tổ chức và cấu trúc hơn paper-based database, các cấu trúc trong cơ sở dữ liệu được định nghĩa rõ ràng, và thường có chương trình ứng dụng mà mọi người dùng để tương tác với dữ liệu trong cơ sở dữ liệu. (Chương trình ứng dụng có giá trị với bạn trong quá trình phân tích vì nó có thể tiết lộ rất nhiều thông tin về cấu trúc dữ liệu và các nhiệm vụ được thực hiện đối với dữ liệu trong legacy database.) Thời gian bạn thực hiện phân tích đúng cách sẽ phụ thuộc một mức độ nào đó vào loại cơ sở dữ liệu, RDBMS dùng để triển khai legacy database và chương trình ứng dụng.

Điểm quan trọng cần nhớ khi phân tích paper-based database hoặc legacy database là bạn nên tiến hành quy trình một cách kiên nhẫn và có phương pháp để đảm bảo phân tích toàn diện và chính xác.

---

## Tiến hành phân tích

Có ba bước trong quy trình phân tích: rà soát cách thu thập dữ liệu, rà soát cách trình bày thông tin và tiến hành phỏng vấn với người dùng và quản lý.

Bạn sẽ cần nói chuyện với nhiều người trong tổ chức khi thực hiện hai bước đầu tiên trong quy trình này. Đảm bảo cuộc trò chuyện của bạn chỉ liên quan đến các cuộc rà soát đang tiến hành. Bạn sẽ có cơ hội hỏi họ những câu hỏi chi tiết khác sau. Hãy nhớ rằng các cuộc rà soát này là một phần không thể thiếu trong sự chuẩn bị của bạn cho các cuộc phỏng vấn sẽ diễn ra sau. Thực vậy, các cuộc rà soát này giúp bạn xác định các loại câu hỏi cần hỏi trong các cuộc phỏng vấn tiếp theo.

---

## Xem xét cách thu thập dữ liệu

Bước đầu tiên trong quy trình phân tích liên quan đến việc rà soát các cách thu thập dữ liệu. Điều này bao gồm mọi thứ từ thẻ chỉ mục và danh sách viết tay hoặc in ấn đến biểu mẫu in sẵn và màn hình nhập liệu (như những màn hình dùng trong chương trình cơ sở dữ liệu hoặc trình duyệt web).

Bắt đầu bước này bằng cách rà soát tất cả các mục paper-based. Tìm hiểu loại tài liệu tổ chức đang sử dụng để ghi lại dữ liệu và sau đó thu thập một mẫu đơn của từng loại. Lắp ráp các mẫu này và lưu trữ chúng trong một thư mục để sử dụng sau trong quy trình thiết kế. Ví dụ, giả sử tổ chức đang thu thập dữ liệu nhà cung cấp trên các tờ giấy trong bìa đóng gáy. Đi qua vài trang đầu của bìa cho đến khi bạn tìm thấy trang có mục nhập đầy đủ nhất có thể. Khi đã tìm được mẫu phù hợp, sao chép nó và lưu vào thư mục. Tiếp tục quy trình này cho mỗi loại mục đang được sử dụng. Hình 6.1 cho thấy hai ví dụ về cách tổ chức có thể sử dụng các mục paper-based để thu thập dữ liệu.

*Hình 6.1 Ví dụ các mục paper-based dùng để thu thập dữ liệu.*

Tiếp theo, rà soát tất cả các chương trình máy tính mà tổ chức sử dụng để thu thập dữ liệu. Mục tiêu ở đây là thu thập một bộ ảnh chụp màn hình mẫu đại diện cách tổ chức sử dụng các chương trình này để làm việc với dữ liệu. Một lời cảnh báo: Nhiều người đã tìm ra những cách sử dụng độc đáo và sáng tạo đối với các chương trình phổ biến, chẳng hạn như trình xử lý văn bản và bảng tính, như một cách để thu thập và quản lý dữ liệu. Đảm bảo bạn nói chuyện với ai đó quen thuộc với cách máy tính được sử dụng trong tổ chức và xác định chương trình nào tổ chức đang sử dụng để quản lý dữ liệu của mình.

Khi rà soát từng chương trình, tìm màn hình đại diện tốt nhất cách chương trình thu thập dữ liệu. Bạn đang tìm các màn hình tương tự như trong Hình 6.2.

*Hình 6.2 Màn hình cơ sở dữ liệu điển hình và màn hình bảng tính điển hình.*

Màn hình đầu tiên là điển hình của những màn hình bạn sẽ tìm thấy trong chương trình cơ sở dữ liệu, và màn hình thứ hai là điển hình của những màn hình bạn sẽ tìm thấy trong chương trình bảng tính. Khi đã tìm được mẫu phù hợp, tạo ảnh chụp màn hình bằng ứng dụng chụp màn hình yêu thích của bạn, dán vào tài liệu trong chương trình xử lý văn bản, ghi tên chương trình nguồn và ngày bạn tạo ảnh chụp màn hình, sau đó in tài liệu. Tiếp tục rà soát chương trình và lặp lại thủ tục này khi phù hợp. Sau đó lặp lại toàn bộ quy trình cho từng chương trình. Sau khi in bản sao của tất cả ảnh chụp màn hình phù hợp, lắp ráp chúng lại với nhau và lưu trữ trong thư mục để sử dụng sau trong quy trình thiết kế.

Bây giờ xem xét các trang web mà tổ chức sử dụng để thu thập dữ liệu qua Internet. Các trang bạn quan tâm sẽ trông rất giống các biểu mẫu nhập liệu bạn tìm thấy trong chương trình ứng dụng cơ sở dữ liệu. Hình 6.3 cho thấy ví dụ về trang như vậy.

*Hình 6.3 Ví dụ màn hình nhập liệu trực tuyến điển hình.*

Bạn có thể làm theo cùng thủ tục kiểm tra ở đây mà bạn đã sử dụng với các chương trình ứng dụng. Chụp ảnh màn hình trang web đã cho, dán vào tài liệu xử lý văn bản, ghi URL, tên chương trình và ngày chụp màn hình, rồi in ra. Tiếp tục rà soát các trang web và lặp lại thủ tục khi phù hợp. Sau khi in bản sao của tất cả ảnh chụp màn hình phù hợp, lắp ráp chúng và lưu trữ trong thư mục để sử dụng sau trong quy trình thiết kế.

Đảm bảo bạn đánh dấu rõ ràng các thư mục chứa các mẫu bạn đã thu thập trong quá trình phân tích. Lượng thời gian nhỏ bạn đầu tư để tổ chức tài liệu sẽ mang lại lợi ích lớn khi bạn sử dụng tài liệu đó trong giai đoạn phức tạp của quy trình thiết kế.

---

## Xem xét cách trình bày thông tin

Bước thứ hai trong quy trình phân tích liên quan đến việc rà soát các cách khác nhau mà tổ chức trình bày dữ liệu dưới dạng thông tin. Trong quá trình này, bạn sẽ rà soát các mục như tài liệu viết tay, bản in máy tính, trình bày màn hình và trang web.

Đây là ba trong số các phương pháp trình bày phổ biến nhất bạn sẽ gặp trong quá trình này:

1. **Báo cáo:** Báo cáo là bất kỳ tài liệu nào (đánh máy, in ấn hoặc do máy tính tạo) dùng để sắp xếp và trình bày dữ liệu theo cách có ý nghĩa với người hoặc những người xem nó. Mặc dù sử dụng trình xử lý văn bản, bảng tính hoặc chương trình phần mềm khác là phương pháp chuẩn để tạo báo cáo, bạn vẫn sẽ tìm thấy một số báo cáo viết tay.

2. **Trình bày màn hình** (còn gọi là slide show): Loại trình bày này kết hợp một chuỗi slide thảo luận các chủ đề khác nhau theo cách có tổ chức. Nó thường được tạo bằng chương trình như Microsoft PowerPoint, Google Slides hoặc Apple Keynote và thực thi trên máy tính.

3. **Trang web:** Nhiều tổ chức có lượng thông tin khổng lồ có sẵn qua các trang trên trang web của họ. Trang web được sử dụng tương tự như báo cáo và thực vậy nó không khác gì một loại báo cáo khác.

Bắt đầu bước này bằng cách xác định và rà soát mỗi báo cáo tổ chức tạo từ cơ sở dữ liệu, bất kể tổ chức tạo báo cáo thủ công hay bằng chương trình ứng dụng. Thu thập mẫu của các báo cáo và lắp ráp chúng trong thư mục như bạn đã làm với các mục ở bước trước. Nhìn chung, nhiệm vụ này dễ thực hiện hơn ở bước này so với bước trước vì mọi người trong tổ chức thường quen thuộc với các báo cáo họ sử dụng. Bản sao của các báo cáo thường có sẵn dễ dàng, và hầu hết báo cáo có thể in lại nếu cần. Hình 6.4 cho thấy ví dụ báo cáo viết tay và báo cáo được tạo từ chương trình xử lý văn bản.

*Hình 6.4 Báo cáo viết tay và báo cáo do máy tính tạo.*

Tiếp theo, rà soát các trình bày màn hình sử dụng hoặc kết hợp dữ liệu trong cơ sở dữ liệu. Rà soát mọi trình bày là không cần thiết, nhưng bạn cần rà soát những trình bày có ảnh hưởng trực tiếp đến dữ liệu trong cơ sở dữ liệu. Ví dụ, bạn không cần rà soát trình bày về sản phẩm mới của tổ chức nếu nó không lấy bất kỳ dữ liệu nào từ cơ sở dữ liệu. Mặt khác, trình bày về thống kê bán hàng có kết hợp dữ liệu từ cơ sở dữ liệu là trình bày bạn cần rà soát.

Sau khi xác định trình bày nào cần rà soát, đi qua từng trình bày cẩn thận và chụp ảnh màn hình các slide sử dụng hoặc kết hợp dữ liệu từ cơ sở dữ liệu. Sao chép ảnh chụp màn hình vào tài liệu xử lý văn bản, in tài liệu và sau đó lưu trữ tài liệu trong thư mục để sử dụng sau. (Ghi tên trình bày, tên tệp vật lý của nó và ngày bạn chụp ảnh màn hình trên thư mục; bạn có thể cần tham chiếu lại sau.) Làm theo thủ tục này riêng cho từng trình bày. Bạn muốn đảm bảo không vô tình kết hợp hai hoặc nhiều trình bày lại với nhau vì sai lầm này sẽ không tránh khỏi dẫn đến sự nhầm lẫn hàng loạt và tạo ra một đống lộn xộn lớn!

*Hình 6.5 cho thấy ví dụ loại slide bạn sẽ kiểm tra trong cuộc rà soát này.*

*Hình 6.5 Ví dụ slide trình bày màn hình.*

Rà soát trình bày đôi khi khó và quyết định liệu có nên đưa slide nhất định vào làm mẫu hay không hoàn toàn là quyết định tùy ý. Do đó, làm việc chặt chẽ với người quen thuộc nhất với trình bày để đảm bảo bạn đưa tất cả slide phù hợp vào các mẫu.

Cuối cùng, rà soát các trang web lấy thông tin trực tiếp từ cơ sở dữ liệu. Thực hiện cuộc rà soát này theo cùng cách như rà soát cho các trình bày màn hình. Giống như cuộc rà soát trước, bạn cần rà soát những trang web có ảnh hưởng trực tiếp đến dữ liệu trong cơ sở dữ liệu. Ví dụ, bạn không cần rà soát trang web cung cấp lịch sử tổ chức của bạn, nhưng bạn cần rà soát trang web hiển thị thông tin nhân viên khu vực.

Sau khi xác định trang web nào cần rà soát, chụp ảnh màn hình từng trang. Sao chép ảnh chụp màn hình vào tài liệu xử lý văn bản, in tài liệu và sau đó lưu trữ tài liệu trong thư mục để sử dụng sau. (Ghi địa chỉ URL và ngày hiện tại dưới mỗi ảnh chụp màn hình trong tài liệu; bạn có thể cần tham chiếu trang web cụ thể lại vào thời điểm sau.)

*Hình 6.6 cho thấy ví dụ trang web bạn sẽ kiểm tra trong cuộc rà soát này.*

*Hình 6.6 Ví dụ trang web trình bày thông tin từ cơ sở dữ liệu.*

Cố gắng làm việc với người (hoặc những người) tạo và phát triển trang web của tổ chức. Họ có thể tiết kiệm cho bạn rất nhiều thời gian bằng cách hướng dẫn bạn đến đúng các trang cần kiểm tra cho cuộc rà soát này.

---

## Tiến hành phỏng vấn

Bây giờ bạn đã có ý tưởng chung về cách tổ chức thu thập và trình bày dữ liệu, đã đến lúc phỏng vấn người dùng và quản lý để xác định cách tổ chức sử dụng dữ liệu của mình. Phỏng vấn hữu ích trong giai đoạn phân tích vì những lý do sau:

- Chúng cung cấp chi tiết về các mẫu bạn đã lắp ráp trong các cuộc rà soát trước. Các cuộc thảo luận bạn đã có với người dùng và quản lý trong các cuộc rà soát trước chỉ nhằm xác định (theo cách chung) cách tổ chức thu thập và trình bày dữ liệu nó sử dụng. Tuy nhiên trong giai đoạn này, bạn sẽ hỏi các câu hỏi cụ thể về các mẫu bạn đã lắp ráp trong các cuộc rà soát đó. Điều này cho phép bạn làm rõ các khía cạnh của mẫu cụ thể mà bạn cho là mơ hồ hoặc không rõ ràng.

- Chúng cung cấp thông tin về cách tổ chức sử dụng dữ liệu. Các cuộc phỏng vấn này cung cấp thông tin về cách người dùng làm việc với dữ liệu của tổ chức hàng ngày và cách quản lý sử dụng thông tin dựa trên dữ liệu đó để quản lý công việc của tổ chức.

- Chúng quan trọng trong việc xác định cấu trúc trường và bảng sơ bộ. Các phản hồi bạn nhận được từ người dùng và quản lý trong đợt phỏng vấn này sẽ giúp bạn xác định cấu trúc trường và bảng ban đầu cho cơ sở dữ liệu.

- Chúng giúp xác định các yêu cầu thông tin tương lai. Các cuộc thảo luận bạn sẽ có với người dùng và quản lý về sự phát triển tương lai của tổ chức thường tiết lộ các yêu cầu thông tin mới mà cơ sở dữ liệu phải hỗ trợ.

Tôi không thể nhấn mạnh quá mức, và bạn không được đánh giá thấp tác động của phỏng vấn đối với cấu trúc cơ sở dữ liệu cuối cùng và tầm quan trọng của chúng đối với việc hoàn thành thành công quy trình thiết kế cơ sở dữ liệu của bạn. Chỉ có các cuộc phỏng vấn đầy đủ và hoàn chỉnh mới giúp bạn đảm bảo cơ sở dữ liệu bạn thiết kế đáp ứng yêu cầu thông tin của tổ chức.

### Kỹ thuật phỏng vấn cơ bản

Bạn phải học một vài kỹ thuật phỏng vấn cơ bản để tiến hành phỏng vấn thành công. Tôi giải quyết vấn đề này ở đây bằng cách cung cấp cho bạn một bộ kỹ thuật cơ bản mà bạn có thể sử dụng để tiến hành mọi cuộc phỏng vấn trong quy trình thiết kế cơ sở dữ liệu. Các kỹ thuật này tương đối dễ học và áp dụng, và chúng cho phép bạn thu được thông tin cần thiết cho nhiệm vụ.

Bạn có thể thực hiện các kỹ thuật này theo cách nghiêm ngặt, máy móc khi mới bắt đầu học chúng, nhưng bạn sẽ áp dụng chúng một cách bản năng và trực giác hơn khi tiến hành thêm phỏng vấn và đạt thêm kinh nghiệm. Tiến hành phỏng vấn là một kỹ năng và như với bất kỳ kỹ năng nào khác, bạn sẽ đạt được các mức độ chuyên môn khác nhau với sự kiên nhẫn và luyện tập.

**Tầm quan trọng của câu hỏi**

Học cách đặt câu hỏi là kỹ năng quý giá mà bạn phải học và phát triển nếu muốn thành công khi thiết kế cơ sở dữ liệu. Đó là điều bạn sẽ sử dụng để hiểu cách kinh doanh của bạn (hoặc khách hàng của bạn) hoạt động và cho phép bạn thu thập thông tin cần thiết để phát triển các cấu trúc khác nhau cho cơ sở dữ liệu. Và như bạn có thể đã đoán, đây chính xác là kỹ năng cần thiết để tiến hành các cuộc phỏng vấn trong suốt quy trình thiết kế này. Tôi biết điều này có vẻ như tôi đang nói điều hiển nhiên, nhưng tôi không thể nhấn mạnh quá mức kỹ năng này quan trọng đến mức nào.

**Quy trình phỏng vấn**

Bạn sử dụng cả câu hỏi mở và câu hỏi đóng trong suốt cuộc phỏng vấn, xen kẽ giữa từng loại khi cuộc phỏng vấn tiến triển. Câu hỏi mở mang tính chung chung hơn và cho phép bạn tập trung vào các chủ đề cụ thể, trong khi câu hỏi đóng cụ thể hơn và cho phép bạn tập trung vào các chi tiết cụ thể của chủ đề nhất định. Ví dụ, bắt đầu cuộc phỏng vấn với vài câu hỏi mở để thiết lập một số chủ đề chung để thảo luận, sau đó chọn một chủ đề và hỏi các câu hỏi cụ thể hơn (đóng) liên quan đến chủ đề đó. Bạn có thể bắt đầu bằng cách hỏi một trong những người tham gia phỏng vấn một câu hỏi mở như sau:

"Bạn định nghĩa công việc bạn làm hàng ngày như thế nào?"

Hầu hết người tham gia sẽ dùng ba câu trở lên để trả lời loại câu hỏi này. Hoàn toàn chấp nhận được khi người tham gia cung cấp phản hồi dài, mô tả vì bạn có thể làm việc với loại phản hồi này dễ dàng hơn phản hồi ngắn gọn. Để minh họa điểm này, giả sử người tham gia phản hồi câu hỏi của bạn theo cách sau:

"Là đại diện tài khoản, tôi chịu trách nhiệm mười khách hàng. Mỗi khách hàng của tôi đặt lịch hẹn đến phòng trưng bày để xem hàng hóa chúng ta có cho mùa hiện tại. Một phần công việc của tôi là trả lời bất kỳ câu hỏi nào họ có về hàng hóa của chúng ta và đưa ra khuyến nghị về các mặt hàng phổ biến nhất. Khi họ quyết định về hàng hóa họ muốn mua, tôi viết đơn hàng cho khách hàng. Sau đó tôi giao đơn hàng cho trợ lý của tôi, người lập tức thực hiện đơn hàng và gửi cho khách hàng."

Đây là phản hồi rất tốt. Người tham gia không chỉ trả lời câu hỏi của bạn mà còn cung cấp cho bạn cơ hội bắt đầu hỏi câu hỏi tiếp theo. Phản hồi của anh ấy cũng gợi ý nhiều chủ đề mà bạn có thể thảo luận sau trong cuộc phỏng vấn.

*Lưu ý:* Phản hồi ngắn gọn như "Tôi điền đơn hàng khách hàng" cung cấp cho bạn rất ít thông tin, nên bạn phải làm việc nhiều hơn một chút với người tham gia để hiểu quy trình này liên quan những gì. Phản hồi ngắn thường cho thấy người tham gia chỉ đang lo lắng hoặc không thoải mái. Trong trường hợp này, bạn có thể giúp anh ấy thoải mái bằng cách thảo luận chủ đề không liên quan trong vài phút hoặc cho phép anh ấy chọn chủ đề quen thuộc hoặc thoải mái hơn làm điểm bắt đầu.

**Xác định chủ đề**

Khi hỏi mỗi câu hỏi mở, hãy xác định các chủ đề được gợi ý trong phản hồi cho câu hỏi. Bạn có thể xác định chủ đề bằng cách lắng nghe danh từ trong các câu trong phản hồi. Chủ đề luôn được đại diện bởi danh từ và xác định người, địa điểm, sự vật hoặc sự kiện (điều xảy ra tại thời điểm nhất định). Tuy nhiên có một số danh từ đại diện đặc điểm của người, địa điểm, sự vật hoặc sự kiện; bạn chưa cần quan tâm đến những danh từ này. Do đó, đảm bảo bạn chỉ lắng nghe và ghi chú những danh từ cụ thể đại diện người, địa điểm, sự vật hoặc sự kiện. (Lưu ý không cần ghi chú nhiều hơn một lần xuất hiện của danh từ cho trước.) Bạn có thể đảm bảo tính đến mọi chủ đề cần thảo luận bằng cách liệt kê các danh từ khi xác định chúng. Trong ví dụ sau, tôi đã gạch chân các danh từ bạn có thể nhận ra khi lắng nghe phản hồi:

"Là đại diện tài khoản, tôi chịu trách nhiệm mười khách hàng. Mỗi khách hàng của tôi đặt lịch hẹn đến phòng trưng bày để xem hàng hóa chúng ta có cho mùa hiện tại. Một phần công việc của tôi là trả lời bất kỳ câu hỏi nào họ có về hàng hóa của chúng ta và đưa ra khuyến nghị về các mặt hàng phổ biến nhất. Khi họ quyết định về hàng hóa họ muốn mua, tôi viết đơn hàng cho khách hàng. Sau đó tôi giao đơn hàng cho trợ lý của tôi, người lập tức thực hiện đơn hàng và gửi cho khách hàng."

Các danh từ bạn đã xác định và liệt kê trên tờ giấy trở thành danh sách chủ đề của bạn. Bạn sẽ thêm nhiều chủ đề vào danh sách khi tiếp tục làm việc qua quy trình thiết kế. Biên soạn danh sách này cẩn thận và có phương pháp vì bạn sẽ sử dụng nó để tạo các cuộc thảo luận tiếp theo khi cuộc phỏng vấn tiến triển và giúp bạn xác định các bảng sau trong quy trình thiết kế.

Đây là các chủ đề (theo thứ tự chữ cái) được đại diện trong phản hồi trước:

- Account Representative
- Appointment
- Assistant
- Clients
- Items
- Job
- Merchandise
- Sales Order
- Season
- Showroom

Bạn có thể sử dụng danh sách này làm cơ sở cho các câu hỏi tiếp theo trong cuộc phỏng vấn.

*Lưu ý:* Tôi gọi toàn bộ thủ tục này là **Subject-Identification Technique** trong phần còn lại của cuốn sách.

Xác minh rằng các danh từ bạn đã liệt kê là chủ đề thực sự bằng cách rà soát từng danh từ và xác nhận rằng nó cụ thể đại diện người, địa điểm, sự vật hoặc sự kiện. Ví dụ, "Account Representative" thực sự đại diện người và "Appointment" là danh từ đại diện sự kiện; trong trường hợp này, điều xảy ra tại thời điểm nhất định.

**Xác định đặc điểm**

Sau khi xác định các chủ đề được gợi ý trong phản hồi, chọn chủ đề cụ thể và bắt đầu hỏi các câu hỏi tiếp theo liên quan đến chủ đề đó. Bạn sử dụng chuỗi câu hỏi này để thu được càng nhiều thông tin chi tiết về chủ đề bạn đã chọn càng tốt. Đảm bảo các câu hỏi tiếp theo của bạn cụ thể hơn khi tiến qua phần thảo luận này. Bản chất câu hỏi tiếp theo của bạn sẽ phụ thuộc vào các phản hồi bạn nhận được từ người tham gia. Dựa trên phản hồi mẫu của chúng ta, ví dụ, bạn có thể tiếp tục thảo luận bằng cách hỏi các câu hỏi cụ thể hơn về đơn hàng, hoặc bạn có thể bắt đầu chuỗi câu hỏi hoàn toàn mới về khách hàng. Giả sử, hiện tại, bạn hỏi câu hỏi sau để tìm hiểu thêm về đơn hàng:

"Hãy thảo luận về đơn hàng một chút. Cần gì để hoàn thành đơn hàng cho khách hàng?"

Lưu ý câu hỏi này bắt đầu bằng phát biểu hướng người tham gia phỏng vấn tập trung vào chủ đề cụ thể. Đây là kỹ thuật bạn nên sử dụng để hướng dẫn cuộc trò chuyện sau khi đã chọn chủ đề cụ thể để thảo luận. Cũng lưu ý câu hỏi là mở; nó nhắc người tham gia về các chi tiết liên quan đến chủ đề bạn đã chọn (đơn hàng) và cho phép bạn thiết lập trọng tâm của các phản hồi tiếp theo của người tham gia.

Bây giờ giả sử người tham gia đưa ra phản hồi sau:

"Chà, tôi nhập tất cả thông tin khách hàng trước, như tên, địa chỉ, số điện thoại và địa chỉ email của khách hàng. Sau đó tôi nhập các mặt hàng khách hàng muốn mua. Sau khi tôi đã nhập tất cả mặt hàng, tôi tổng cộng và xong. Ồ, tôi quên đề cập tôi nhập số fax và địa chỉ giao hàng của khách hàng—nếu họ có."

Giữ Subject-Identification Technique trong đầu khi lắng nghe phản hồi này và ghi chú bất kỳ danh từ nào có thể đại diện người, địa điểm, sự vật hoặc sự kiện vào danh sách chủ đề của bạn.

Với chuỗi câu hỏi này, tuy nhiên, bạn sẽ quan tâm hơn đến việc lắng nghe bất kỳ chi tiết nào về chủ đề đang thảo luận. Mục tiêu của bạn ở đây là thu được càng nhiều sự kiện về chủ đề càng tốt. Bây giờ bạn quan tâm đến các danh từ đại diện đặc điểm của chủ đề. Chúng mô tả các khía cạnh cụ thể của chủ đề đó. Bạn có thể xác định các danh từ này khá dễ dàng vì chúng thường ở dạng số ít ("số điện thoại," "địa chỉ"). Ngược lại, danh từ xác định chủ đề thường ở dạng sở hữu ("số điện thoại của khách hàng," "địa chỉ công ty").

Cố gắng lắng nghe càng nhiều đặc điểm của chủ đề càng tốt. Trong ví dụ sau, tôi đã gạch chân các danh từ bạn có thể nhận ra khi lắng nghe phản hồi:

"Chà, tôi nhập tất cả thông tin khách hàng trước, như tên, địa chỉ, số điện thoại và địa chỉ email của khách hàng. Sau đó tôi nhập các mặt hàng khách hàng muốn mua. Sau khi tôi đã nhập tất cả mặt hàng, tôi tổng cộng và xong. Ồ, tôi quên đề cập tôi nhập số fax và địa chỉ giao hàng của khách hàng—nếu họ có."

Khi xác định các danh từ phù hợp trong phản hồi, liệt kê chúng trên tờ giấy; đây trở thành danh sách đặc điểm của bạn. Bạn sẽ thêm nhiều đặc điểm vào danh sách khi làm việc qua quy trình thiết kế và bạn sẽ sử dụng danh sách này sau khi xác định các trường cho cơ sở dữ liệu. Dùng tờ giấy riêng cho danh sách đặc điểm. Không liệt kê chủ đề và đặc điểm trên cùng tờ! (Lý do giữ chúng trên danh sách khác nhau sẽ rõ ràng khi bạn bắt đầu xác định các bảng cho cơ sở dữ liệu trong Chương 7, "Thiết lập cấu trúc bảng.")

Đây là các đặc điểm (theo thứ tự chữ cái) được đại diện trong phản hồi trước:

- Address
- Email Address
- Fax Number
- Name
- Phone Number
- Shipping Address
- Totals

Đây cấu thành danh sách đặc điểm cho chủ đề đang thảo luận. Các đặc điểm này cuối cùng sẽ trở thành các trường trong cơ sở dữ liệu.

*Lưu ý:* Tôi gọi toàn bộ thủ tục này là **Characteristic-Identification Technique** trong phần còn lại của cuốn sách.

Xác minh rằng các danh từ bạn đã liệt kê là đặc điểm thực sự bằng cách xác nhận rằng chúng đại diện các khía cạnh cụ thể của chủ đề đó. Ví dụ, "name" thực sự mô tả đặc điểm của chủ đề "client" và "Shipping address" đại diện đặc điểm khác của chủ đề "client."

Sau khi hoàn thành thảo luận về chủ đề cụ thể, chuyển sang chủ đề tiếp theo trong danh sách chủ đề của bạn và bắt đầu cùng mẫu câu hỏi. Bắt đầu với câu hỏi mở, xác định bất kỳ chủ đề nào được gợi ý trong phản hồi, hỏi câu hỏi cụ thể hơn khi thảo luận tiến triển và xác định càng nhiều đặc điểm của chủ đề càng tốt. Tiếp tục quy trình này một cách có phương pháp cho đến khi đã thảo luận mọi chủ đề trong danh sách.

Bạn nên học Subject-Identification Technique và Characteristic-Identification Technique càng kỹ càng có thể vì bạn sẽ sử dụng chúng trong các cuộc phỏng vấn với người dùng và quản lý và khi xác định các trường và bảng cho cấu trúc cơ sở dữ liệu ban đầu. Lưu ý sẽ dễ dàng hơn phân biệt chủ đề và đặc điểm trong đầu khi bạn đạt kinh nghiệm sử dụng các kỹ thuật này. Chúng cuối cùng sẽ trở nên bản năng và trực giác hơn.

**Trước khi bắt đầu quy trình phỏng vấn...**

Bạn có thể sử dụng các kỹ thuật vừa học trong phần này cho cả phỏng vấn người dùng và phỏng vấn quản lý. Sự khác biệt duy nhất giữa hai bộ phỏng vấn nằm ở chủ đề và nội dung câu hỏi.

Quy trình phỏng vấn liên quan đến hai bộ thảo luận: một với người dùng và một với quản lý. Bạn sẽ nói chuyện với người dùng trước vì họ đại diện "tuyến đầu" của tổ chức. Họ có hình ảnh rõ ràng nhất về các chi tiết liên quan đến hoạt động hàng ngày của tổ chức. Ngoài ra, thông tin bạn thu thập từ người dùng sẽ giúp bạn hiểu các câu trả lời bạn nhận được từ quản lý.

---

## Phỏng vấn người dùng

Phần đầu của quy trình phỏng vấn liên quan đến việc tiến hành phỏng vấn người dùng. Các cuộc phỏng vấn tập trung vào bốn vấn đề sau:

1. Các loại dữ liệu người dùng hiện đang sử dụng
2. Cách người dùng hiện đang sử dụng dữ liệu của họ
3. Bộ sưu tập mẫu bạn đã lắp ráp trong hai bước đầu của phân tích
4. Các loại thông tin người dùng cần cho công việc hàng ngày của họ

Vì các vấn đề này vừa tập trung vào dữ liệu vừa tập trung vào thông tin, bạn phải chắc chắn hiểu và luôn ghi nhớ sự khác biệt giữa dữ liệu và thông tin. Nhắc lại từ Chương 3, "Thuật ngữ," dữ liệu là các giá trị bạn lưu trong cơ sở dữ liệu và thông tin là dữ liệu bạn xử lý theo cách làm cho nó có ý nghĩa và hữu ích khi bạn làm việc với nó hoặc xem nó. Ghi nhớ các định nghĩa này sẽ giúp đảm bảo bạn tập trung đúng vào từng vấn đề và tiến hành thành công từng phần phỏng vấn.

**Rà soát loại dữ liệu và cách sử dụng**

Bạn thường có thể thảo luận hai vấn đề đầu cùng lúc nếu cẩn thận diễn đạt câu hỏi của mình vào đầu cuộc phỏng vấn. Mục tiêu của bạn trong phần phỏng vấn này là xác định các loại dữ liệu người dùng hiện đang sử dụng và cách họ sử dụng dữ liệu đó để hỗ trợ công việc họ làm. Bạn sẽ sử dụng thông tin này sau trong quy trình thiết kế để giúp xác định cấu trúc trường và bảng. Sử dụng các mẫu thu thập dữ liệu và biểu diễn dữ liệu để giúp bạn xây dựng câu hỏi về dữ liệu của người dùng. (Tuy nhiên đừng thực sự thảo luận các mẫu ngay; bạn nên xử lý chúng riêng.) Trong cuộc thảo luận này, bạn bắt đầu với câu hỏi mở, xác định chủ đề trong phản hồi và sau đó sử dụng câu hỏi tiếp theo cụ thể để xác định đặc điểm của mỗi chủ đề.

Khi bắt đầu phỏng vấn, hỏi mỗi người tham gia về công việc họ thực hiện hàng ngày. Sau khi người tham gia mô tả tổng quan công việc họ làm, yêu cầu họ giải thích chi tiết hơn về công việc. Có lẽ họ có thể dẫn bạn qua công việc họ thực hiện hàng ngày. Đây là ví dụ cuộc trò chuyện điển hình diễn ra trong phần phỏng vấn này. Tôi đã gạch chân các danh từ cần chú ý:

NGƯỜI PHỎNG VẤN: "Công việc loại gì bạn làm hàng ngày?"

NGƯỜI THAM GIA: "Tôi tiếp nhận đơn sử dụng đất do nhiều người nộp, đăng nhập chúng và đặt ngày điều trần với giám khảo điều trần. Tôi cũng hỗ trợ người nộp đơn nếu họ có câu hỏi về đơn cụ thể."

NGƯỜI PHỎNG VẤN: "Hãy nói về đơn nộp một chút. Các loại sự kiện nào liên quan đến đơn nộp?"

NGƯỜI THAM GIA: "Khá nhiều thực sự. Có sự kiện về loại và tên đơn, chỉ định và địa chỉ của nó, và vị trí của nó."

NGƯỜI PHỎNG VẤN: "Cho tôi biết về các sự kiện liên quan đến loại và tên đơn."

NGƯỜI THAM GIA: "Có bốn điều chúng tôi ghi: loại đơn, tên khu vực phân chia, mục đích dự án và mô tả dự án."

Lưu ý người phỏng vấn bắt đầu thảo luận với câu hỏi mở. Khi người tham gia phản hồi, người phỏng vấn sử dụng Subject-Identification Technique để xác định chủ đề trong phản hồi. Người phỏng vấn sau đó chọn chủ đề cụ thể và sử dụng câu hỏi mở khác để tập trung sự chú ý của người tham gia vào chủ đề đó. Vì phản hồi tiếp theo của người tham gia mang tính chung chung, người phỏng vấn tập trung vào khía cạnh cụ thể của chủ đề và sử dụng câu hỏi tiếp theo cụ thể hơn để thu được phản hồi chi tiết từ người tham gia. Người phỏng vấn có thể tiếp tục thu hẹp trọng tâm câu hỏi khi thảo luận tiến triển. Khi người tham gia phản hồi mỗi câu hỏi, người phỏng vấn tiếp tục sử dụng Characteristic-Identification Technique để xác định đặc điểm của chủ đề xuất hiện trong phản hồi. Sau khi xác định tất cả đặc điểm của chủ đề, người phỏng vấn chuyển sang chủ đề tiếp theo và bắt đầu toàn bộ quy trình lại. Người phỏng vấn sẽ tiếp tục như vậy cho đến khi bao phủ toàn bộ danh sách chủ đề. Bạn sẽ trải qua quy trình chính xác tương tự khi đóng vai người phỏng vấn.

**Rà soát các mẫu**

Vòng thảo luận tiếp theo tập trung vào tất cả các mẫu bạn đã lắp ráp trước đó trong quy trình phân tích. Mục tiêu của bạn trong các cuộc thảo luận này là xác định cách các đối tượng được đại diện bởi các mẫu được sử dụng, làm rõ các khía cạnh của mẫu bạn chưa hiểu và gán mô tả cho mỗi mẫu.

Tương đối dễ cho bạn nói chuyện với người tham gia về các mẫu vì bạn đã có ý tưởng về dữ liệu người tham gia sử dụng hàng ngày. Bắt đầu cuộc trò chuyện bằng cách hỏi câu hỏi về mẫu cụ thể. Hình 6.7 cho thấy ví dụ mẫu thu thập dữ liệu bạn có thể dùng làm điểm bắt đầu.

*Hình 6.7 Mẫu thu thập dữ liệu.*

Rà soát ghi chép từ các cuộc thảo luận bạn đã có vào đầu cuộc phỏng vấn trước khi hỏi câu hỏi đầu tiên. Bạn muốn xác định xem có điều gì bạn đã thảo luận có liên quan đến mẫu sắp thảo luận không. Trong một trong các cuộc thảo luận trước, ví dụ, người tham gia cho biết một phần công việc của anh ấy là theo dõi tất cả khách hàng của tổ chức. Sử dụng phát biểu đó làm điểm bắt đầu, bạn có thể hỏi anh ấy cách anh ấy sử dụng mẫu thu thập dữ liệu cụ thể này để thực hiện nhiệm vụ đó.

"Bạn đã đề cập trong cuộc thảo luận trước rằng bạn theo dõi tất cả khách hàng. Màn hình này giúp bạn thực hiện nhiệm vụ đó như thế nào?"

Đây là câu hỏi diễn đạt tốt. Nó bắt đầu bằng phát biểu tập trung vào chủ đề cụ thể và sau đó tiếp tục bằng cách đưa sự chú ý của người tham gia vào mẫu. Câu hỏi đủ mở để thu được phản hồi rõ ràng và hoàn chỉnh.

Bây giờ giả sử người tham gia cung cấp phản hồi này:

"Màn hình này cho phép tôi nhập khách hàng mới, cũng như sửa đổi và duy trì tất cả thông tin chúng tôi có về khách hàng hiện có."

Nếu phản hồi này trả lời câu hỏi đến mức bạn hoàn toàn hài lòng, sử dụng nó làm cơ sở cho mô tả mẫu. Nếu không, tiếp tục với chuỗi câu hỏi phù hợp cho đến khi người tham gia xác định rõ mục đích và cách sử dụng mẫu. Bạn phải cung cấp mô tả cho tất cả mẫu vì bạn sẽ sử dụng chúng lại sau trong quy trình thiết kế.

Mô tả mẫu nên ngắn gọn nhưng đủ rõ để chỉ mục đích mẫu và cách nó được sử dụng. Viết mô tả trên mảnh giấy và đính kèm vào mẫu. Đây là ví dụ mô tả bạn có thể dùng cho mẫu trong Hình 6.7:

*Màn hình này được dùng để thu thập và duy trì tất cả dữ liệu khách hàng.*

Bạn cần hiểu mẫu càng hoàn toàn càng tốt để có thể viết mô tả rõ ràng và súc tích. Nếu bạn chưa hiểu các khía cạnh của mẫu cho trước, yêu cầu người tham gia làm rõ cho bạn. Ví dụ, giả sử bạn đang làm việc với mẫu báo cáo trong Hình 6.8.

*Hình 6.8 Mẫu báo cáo.*

Nếu bạn không biết viết tắt "SRP" đại diện gì, đảm bảo có người tham gia làm rõ cho bạn—không bao giờ đưa ra giả định hay phỏng đoán. Làm vậy có thể lãng phí thời gian và công sức quý giá sau trong quy trình nếu giả định hay phỏng đoán của bạn hóa ra không đúng.

Khi soạn mô tả cho mỗi mẫu, bạn có thể thấy khó viết mô tả cho mẫu phức tạp. Mẫu phức tạp nếu đại diện nhiều hơn một chủ đề. Mẫu trong Hình 6.8, ví dụ, chỉ bao phủ một chủ đề: sản phẩm. Mẫu trong Hình 6.9, tuy nhiên, bao phủ ít nhất ba chủ đề: dịch vụ bác sĩ, dịch vụ điều dưỡng và bệnh nhân. Bạn thường phải làm việc nhiều hơn một chút để xác định mục đích và cách sử dụng mẫu phức tạp. Trong một số trường hợp, bạn phải sử dụng Subject-Identification Technique để xác định các chủ đề được đại diện. Giả sử bạn đang làm việc với mẫu báo cáo trong Hình 6.9 và bạn có câu hỏi về dịch vụ điều dưỡng. Bạn tự hỏi liệu tổ chức có sử dụng báo cáo này như phương tiện gián tiếp để duy trì danh sách dịch vụ điều dưỡng hiện tại không. Câu hỏi thu được phản hồi có hoặc không từ người tham gia sẽ không giúp bạn nhiều, nên bạn cần sử dụng câu hỏi mở thu được phản hồi mang thông tin hơn. Bạn có thể bắt đầu thảo luận mẫu này với câu hỏi:

"Dịch vụ điều dưỡng nào bạn cung cấp ngoài những dịch vụ liệt kê trong mẫu này?"

*Hình 6.9 Ví dụ mẫu báo cáo phức tạp.*

Loại câu hỏi này cho người tham gia cơ hội cung cấp phản hồi chi tiết; hơn nữa bạn đã cho mình cơ hội hỏi câu hỏi tiếp theo tùy theo phản hồi của người tham gia. Để tiếp tục ví dụ, giả sử bạn nhận được câu trả lời sau:

"Chúng tôi cung cấp nhiều dịch vụ chuyên biệt cho bệnh nhân phức tạp hơn. Bạn chỉ thấy dịch vụ chung trên báo cáo này. Tuy nhiên tôi có thể cho bạn xem danh sách đầy đủ dịch vụ của chúng tôi mà Katherine duy trì trên máy tính của cô ấy."

Bạn có thể tiếp tục quy trình viết mô tả mẫu nếu phản hồi này làm rõ điểm còn thắc mắc và bạn giờ hiểu mục đích mẫu báo cáo này; nếu không tiếp tục hỏi câu hỏi tiếp theo cho đến khi mọi thứ được giải thích đến mức bạn hài lòng.

**Rà soát yêu cầu thông tin**

Vấn đề cuối cùng bạn thảo luận với người dùng liên quan đến yêu cầu thông tin của họ. Mục tiêu của cuộc thảo luận này là xác định liệu người dùng cá nhân có nhận thông tin dựa trên dữ liệu họ không trực tiếp kiểm soát hoặc duy trì không, xác định loại thông tin bổ sung họ cần và xác định loại thông tin họ có thể dự đoán sẽ cần trong tương lai. Bạn sẽ sử dụng thông tin thu thập trong cuộc thảo luận này sau trong quy trình thiết kế để giúp xác định và xác minh cấu trúc trường và bảng. Bạn cũng có thể sử dụng thông tin này như một cách khác để xác định liệu có vô tình bỏ sót điều gì trong các cuộc thảo luận trước không.

*Yêu cầu thông tin hiện tại:* Người dùng thường nhận thông tin họ sử dụng qua nhiều loại báo cáo. Do đó cách tốt nhất để bắt đầu cuộc thảo luận này là rà soát các mẫu báo cáo. Lần này, tuy nhiên, bạn không quan tâm nhiều đến việc báo cáo được sử dụng như thế nào mà quan tâm đến dữ liệu mà chúng dựa trên. Khá phổ biến khi thông tin trên một số báo cáo người dùng nhận được dựa trên dữ liệu anh ấy không tự tạo và duy trì. Trong tình huống này, bạn phải xác định nguồn gốc dữ liệu đó để có thể xác định tất cả dữ liệu được người dùng sử dụng, dù anh ấy sử dụng trực tiếp hay gián tiếp.

Chọn báo cáo từ các mẫu báo cáo và làm việc với một trong những người tham gia để xác định dữ liệu nào được dùng để tạo báo cáo. Hỏi anh ấy liệu anh ấy có tạo và duy trì dữ liệu mà báo cáo dựa trên không. Bạn có thể chuyển sang mẫu tiếp theo nếu anh ấy trả lời "có," nhưng bạn sẽ cần xác định nguồn gốc dữ liệu nếu anh ấy trả lời "không." Đây là ví dụ minh họa quy trình này. Giả sử bạn có trợ lý tên Kira đang bắt đầu thảo luận với người tham gia tên Joan về mẫu báo cáo trong Hình 6.10.

*Hình 6.10 Mẫu báo cáo.*

Khi Kira bắt đầu cuộc trò chuyện, Joan đề cập cô ấy làm ở phòng tiếp thị. Khi Kira lần đầu hỏi về mẫu báo cáo, Joan cho biết cô ấy nhận nó mỗi sáng thứ Hai. Vì vậy Kira hỏi cô ấy câu hỏi sau: "Bạn có cung cấp dữ liệu dùng để tạo báo cáo này không?"

Hành động tiếp theo của Kira phụ thuộc vào phản hồi của Joan. Kira có thể chuyển sang mẫu tiếp theo nếu Joan trả lời có; tuy nhiên sẽ là ý hay hỏi câu hỏi tiếp theo để chắc chắn câu trả lời của Joan đúng: "Bạn có tự nhập và duy trì dữ liệu này hàng ngày không?"

Nếu Joan vẫn trả lời có, Kira chắc chắn có thể chuyển sang mẫu tiếp theo. Mặt khác, nếu Joan trả lời câu hỏi ban đầu là không, Kira sẽ cần hỏi vài câu hỏi tiếp theo. Đầu tiên cô ấy sẽ hỏi Joan liệu cô ấy có đóng góp bất kỳ dữ liệu nào cho báo cáo không. Nếu có, Kira sẽ xác định dữ liệu cụ thể Joan gửi. Sau đó Kira sẽ hỏi Joan có biết nguồn của dữ liệu còn lại không. Để tiếp tục ví dụ, giả sử Joan trả lời câu hỏi ban đầu là "không" và cuộc đối thoại sau diễn ra sau phản hồi của cô ấy:

KIRA: "Bạn có thể cho biết, vậy có bất kỳ dữ liệu nào bạn đóng góp cho báo cáo không?"

JOAN: "Tôi cung cấp tên và số điện thoại khách hàng."

KIRA: "Bạn có thể cho biết ai cung cấp loại khách hàng và ngày mua cuối không?"

JOAN: "Tôi không thực sự chắc, nhưng..."

KIRA: "Bạn có ý tưởng các mục này đến từ đâu không?"

JOAN: "Thực ra tôi có. Chúng đến từ phòng bán hàng."

KIRA: "Nghe ổn với tôi. Tôi sẽ ghi chú điều đó trên mẫu này và sau đó chúng ta có thể chuyển sang mẫu tiếp theo."

*Yêu cầu thông tin bổ sung:* Chủ đề thảo luận tiếp theo là yêu cầu thông tin bổ sung. Mục tiêu ở đây là xác định liệu người dùng có cần thông tin bổ sung hiện không được chuyển đến cho họ không. Nếu vậy, bạn phải xác định thông tin bổ sung họ cần và sau đó xác định cấu trúc dữ liệu mới để hỗ trợ thông tin bổ sung này sau trong quy trình thiết kế.

Bắt đầu cuộc trò chuyện này bằng cách hướng người tham gia rà soát các báo cáo họ hiện nhận. Hỏi họ liệu có thông tin khác họ muốn thấy trong báo cáo của họ không. Tiếp theo hướng họ thảo luận thông tin bổ sung, báo cáo nào thông tin sẽ ảnh hưởng và lý do họ tin thông tin cần thiết. Yêu cầu họ ghi chú thông tin bổ sung lên báo cáo phù hợp (Hình 6.12 cho thấy mẫu báo cáo với nhận xét của người tham gia). Sau đó xác định liệu thông tin bổ sung đại diện chủ đề mới hay đặc điểm mới. Ví dụ nhận xét "Can we include the vendor name? It would make it easier to identify a specific product" xác định cả chủ đề (vendor) và đặc điểm (vendor name). Kiểm tra danh sách chủ đề và đặc điểm; nếu đã có thì chuyển sang nhận xét tiếp theo. Nếu phát hiện chủ đề mới thêm vào danh sách chủ đề và xác định đặc điểm của nó. Cuối cùng rà soát nhận xét và thảo luận mọi thắc mắc với người tham gia.

*Yêu cầu thông tin tương lai:* Chủ đề thảo luận cuối cùng liên quan đến yêu cầu thông tin tương lai. Mục tiêu của bạn ở đây là xác định thông tin mà người tham gia tin sẽ cần nhận khi tổ chức phát triển. Sau khi xác định các yêu cầu này, bạn có thể đảm bảo cấu trúc dữ liệu được đặt để hỗ trợ thông tin này khi nhu cầu phát sinh.

Trước tiên bạn cần đảm bảo mọi người tham gia đều có ý tưởng về cách tổ chức đang phát triển. Bản chất sự phát triển của tổ chức sẽ xác định thông tin mới người tham gia sẽ cần. Nếu nhiều người không quen với các vấn đề này, bạn sẽ cần thu thập thông tin này từ quản lý và sau đó chuyển cho người tham gia trước cuộc thảo luận. Bạn có thể bắt đầu cuộc trò chuyện sau khi mọi người đã quen với các vấn đề này.

Bắt đầu cuộc thảo luận bằng cách hướng người tham gia suy nghĩ về sự phát triển tương lai của tổ chức và cách nó có thể ảnh hưởng công việc họ làm hàng ngày. Bạn thường sẽ thấy một số người tham gia khó hình dung kịch bản này. Khi đó xảy ra, sử dụng các câu hỏi như sau để giúp họ tập trung suy nghĩ: Sự phát triển của tổ chức sẽ ảnh hưởng lượng thông tin bạn cần để làm công việc như thế nào? Bạn có nghĩ bạn sẽ cần loại thông tin bổ sung để thực hiện nhiệm vụ hiệu quả khi tổ chức phát triển không? Sự phát triển của tổ chức sẽ tăng thời gian bạn dành cho nhiệm vụ hàng ngày như thế nào? Bạn có thể dự đoán loại (danh mục, không phải mục cụ thể) thông tin mới bạn sẽ cần để thực hiện nhiệm vụ khi tổ chức phát triển không? Bạn có dự đoán nhu cầu thông tin mới nếu nhiệm vụ của bạn tăng do sự phát triển của tổ chức không?

Ghi nhớ hầu hết câu trả lời của người tham gia sẽ dựa trên phỏng đoán. Không có cách chính xác để họ dự đoán loại thông tin họ thực sự sẽ cần cho đến khi sự phát triển của tổ chức xảy ra. Tuy nhiên nếu bạn có thể dự đoán yêu cầu thông tin giả định của họ, bạn có thể chuẩn bị bằng cách xác định các cấu trúc dữ liệu cần thiết trước. Khi người tham gia phản hồi, giữ Subject-Identification Technique trong đầu để xác định bất kỳ chủ đề mới nào và sau đó thêm vào danh sách chủ đề. Giữ Characteristic-Identification Technique trong đầu để lắng nghe bất kỳ chi tiết mới nào về chủ đề hiện có hoặc mới và thêm vào danh sách đặc điểm.

Bạn có thể phác thảo ý tưởng cho báo cáo mới hoặc biểu mẫu nhập liệu để giúp người tham gia hình dung loại thông tin họ có thể cần trong tương lai. Các phác thảo này sau đó có thể giúp bạn xác định chủ đề hoặc đặc điểm mới mà cấu trúc cơ sở dữ liệu cần giải quyết. Nếu tạo nhiều bản vẽ phác thảo báo cáo mẫu, đảm bảo lắp ráp chúng trong thư mục riêng được đánh dấu rõ. Sau đó mã hóa mỗi phiên bản để so sánh với các phiên bản trước. Hình 6.13 cho thấy ví dụ thiết kế sơ bộ cho báo cáo tương lai.

*Hình 6.13 Ví dụ thiết kế báo cáo mới.*

Tiếp tục cuộc trò chuyện với người dùng cho đến khi bạn hài lòng đã tính đến càng nhiều yêu cầu thông tin tương lai của người tham gia càng tốt. Khi hoàn thành thảo luận, bạn sẵn sàng tiến hành phỏng vấn quản lý.

*Lưu ý:* Bạn có thể sử dụng tất cả kỹ thuật đã học trong phần này cho các cuộc phỏng vấn quản lý. Do đó phần tiếp theo ngắn hơn và súc tích hơn.

---

## Phỏng vấn quản lý

Phần thứ hai của quy trình phỏng vấn liên quan đến phỏng vấn nhân sự quản lý. Đợt phỏng vấn này tập trung vào các vấn đề sau:

1. Các loại thông tin quản lý hiện nhận được
2. Các loại thông tin bổ sung họ cần nhận
3. Các loại thông tin họ dự đoán sẽ cần
4. Nhận thức của họ về yêu cầu thông tin tổng thể của tổ chức

*Lưu ý:* Trong phần còn lại của cuốn sách, tôi dùng thuật ngữ quản lý để chỉ người hoặc những người điều khiển hoặc chỉ đạo tổ chức.

**Rà soát yêu cầu thông tin hiện tại**

Mục tiêu của bạn trong phần đầu cuộc phỏng vấn này là xác định thông tin quản lý thường nhận được và xác định liệu họ có nhận báo cáo không được đại diện trong nhóm mẫu báo cáo của bạn không.

Khi bắt đầu phỏng vấn, hỏi người tham gia về công việc họ thực hiện và trách nhiệm liên quan đến vị trí. Quản lý thường có nhiều vấn đề trong đầu nên các câu hỏi này sẽ giúp tập trung sự chú ý vào các vấn đề đang thảo luận. Câu trả lời sẽ cho bạn ý tưởng về cách quản lý có thể sử dụng thông tin trên các báo cáo họ nhận và cung cấp góc nhìn về nhu cầu thông tin đó.

Tiếp theo hỏi người tham gia liệu họ có sử dụng bất kỳ báo cáo nào trong bộ sưu tập mẫu báo cáo của bạn không. Tiến hành bước tiếp theo nếu họ nói không sử dụng bất kỳ báo cáo nào; nếu không kiểm tra từng báo cáo và yêu cầu họ giúp xác định các chủ đề khác bạn có thể đã bỏ qua trước đó. Giữ Subject-Identification Technique trong đầu để hỗ trợ quy trình này. Nếu quản lý xác định chủ đề mới, thêm vào danh sách chủ đề và áp dụng Characteristic-Identification Technique để xác định đặc điểm của chủ đề. Thêm các đặc điểm mới vào danh sách đặc điểm. Lặp lại toàn bộ thủ tục cho mỗi mẫu báo cáo.

Tiếp tục thảo luận bằng cách hỏi người tham gia liệu họ có nhận báo cáo không được đại diện trong mẫu báo cáo của bạn không. Nếu câu trả lời là "có," thu mẫu mỗi báo cáo mới và rà soát với người tham gia. Một lần nữa giữ Subject-Identification Technique và Characteristic-Identification Technique trong đầu để xác định các chủ đề (và đặc điểm liên quan) được đại diện trong báo cáo, sau đó thêm chủ đề và đặc điểm vào danh sách tương ứng. Cuối cùng đính kèm mô tả vào báo cáo và thêm vào bộ sưu tập mẫu báo cáo. Lặp lại thủ tục cho đến khi đã tính đến mọi báo cáo mới.

**Rà soát yêu cầu thông tin bổ sung**

Chủ đề thảo luận tiếp theo liên quan đến nhu cầu thông tin bổ sung của quản lý. Mục tiêu của bạn là xác định liệu họ có yêu cầu thông tin bổ sung hiện thiếu trong các báo cáo họ nhận không. Nếu kết luận vậy, bạn phải xác định thông tin bổ sung đó. Sau đó bạn sẽ xác định cấu trúc dữ liệu mới (khi phù hợp) để hỗ trợ thông tin này sau trong quy trình thiết kế. Tuy nhiên bạn có thể chuyển sang phần tiếp theo của phỏng vấn nếu quản lý không yêu cầu thông tin bổ sung.

Bạn sử dụng cùng kỹ thuật cho cuộc thảo luận này như những gì bạn đã sử dụng cho phần phỏng vấn người dùng. Đây là các bước bạn sẽ làm: (1) Rà soát mẫu báo cáo với người tham gia một lần nữa và hỏi liệu có thông tin bổ sung họ muốn đưa vào bất kỳ báo cáo nào không. (2) Yêu cầu người tham gia ghi chú thông tin bổ sung, bao gồm lý do họ tin cần thiết, trên báo cáo phù hợp. Nhớ không quan trọng người tham gia ghi chú thế nào miễn rõ ràng, dễ thấy và đính kèm báo cáo phù hợp. (3) Xác định chủ đề hoặc đặc điểm mới trong thông tin và thêm vào danh sách phù hợp. (4) Rà soát báo cáo và thảo luận mọi thắc mắc với người tham gia. Sau khi mọi thắc mắc được giải quyết, quy trình hoàn tất.

**Rà soát yêu cầu thông tin tương lai**

Yêu cầu thông tin tương lai là chủ đề thảo luận tiếp theo. Mục tiêu của bạn ở đây là xác định thông tin quản lý dự đoán sẽ cần trong tương lai. Sau khi xác định các yêu cầu này, bạn có thể đảm bảo cấu trúc dữ liệu được đặt để hỗ trợ thông tin này khi nhu cầu phát sinh.

Khi bắt đầu thảo luận, yêu cầu người tham gia xem xét cách tổ chức hiện đang phát triển. Sau đó hỏi họ sự phát triển này sẽ ảnh hưởng thông tin họ cần để đưa ra quyết định đúng đắn như thế nào và cách nó ảnh hưởng việc họ hướng dẫn hoặc chỉ đạo tổ chức. Nhớ câu trả lời của họ sẽ dựa trên phỏng đoán, như trường hợp câu hỏi tương tự bạn đã hỏi người dùng; không có cách quản lý nào dự đoán chính xác nhu cầu tương lai cho đến khi tổ chức thực sự bắt đầu phát triển. (Tuy nhiên luôn là ý hay lên kế hoạch cho tương lai càng nhiều càng tốt.) Giữ Subject-Identification Technique và Characteristic-Identification Technique trong đầu để xác định chủ đề và đặc điểm mới trong phản hồi của người tham gia và sau đó thêm các mục mới (nếu có) vào danh sách phù hợp.

Tiếp theo phác thảo các báo cáo mới mà người tham gia có thể có trong đầu. Xác định chủ đề và đặc điểm mới trong mỗi báo cáo và thêm vào danh sách phù hợp. Lắp ráp các báo cáo mới này trong thư mục được đánh dấu rõ và thêm vào bộ sưu tập mẫu.

Bạn sẵn sàng chuyển sang chủ đề cuối cùng khi đã tính đến càng nhiều yêu cầu thông tin tương lai của quản lý càng tốt.

**Rà soát yêu cầu thông tin tổng thể**

Chủ đề thảo luận cuối cùng liên quan đến yêu cầu thông tin tổng thể của tổ chức. Theo ý kiến quản lý, lớp thông tin chung nào tổ chức cần? Mục tiêu của bạn ở đây là phát hiện liệu có dữ liệu tổ chức cần duy trì chưa được thảo luận trong phỏng vấn người dùng hoặc phỏng vấn quản lý không. Nếu xác định có dữ liệu như vậy, bạn phải tính đến trong cấu trúc cơ sở dữ liệu.

Lấy tất cả báo cáo bạn đã thu thập trong suốt quy trình phân tích và phỏng vấn và rà soát với người tham gia một lần nữa. Yêu cầu người tham gia xem xét thông tin báo cáo cung cấp và cách họ có thể sử dụng thông tin đó. (Lưu ý họ sẽ phải đưa ra giả định về cách họ có thể sử dụng thông tin từ báo cáo mới.) Tiếp theo yêu cầu người tham gia xác định liệu có thông tin hữu ích hoặc có giá trị cho tổ chức nhưng hiện không được bất kỳ ai trong tổ chức nhận hay không. Nếu họ xác định có thông tin mới tổ chức có thể sử dụng, làm theo quy trình bình thường xác định thông tin đó và các chủ đề cùng đặc điểm được đại diện trong đó. Phác thảo mẫu báo cáo mới cho thông tin khi phù hợp và thêm mẫu vào bộ sưu tập báo cáo mới hiện có.

Ví dụ giả sử một trong những người tham gia xác định nhu cầu thông tin nhân khẩu học; cô ấy tin điều này sẽ giúp tổ chức xác định thị trường mục tiêu cụ thể hơn cho sản phẩm. Không báo cáo hiện có nào cung cấp thông tin này nên bạn xác định chính xác cô ấy cần gì bằng cách làm việc với cô ấy để tạo phác thảo báo cáo trình bày thông tin này. Sau đó sử dụng kỹ thuật phù hợp để xác định và ghi chú các chủ đề và đặc điểm được đại diện trong báo cáo và thêm vào bộ sưu tập báo cáo mới hiện có. Sau trong quy trình thiết kế bạn sẽ xác định các cấu trúc dữ liệu cần thiết để hỗ trợ thông tin mới.

Lặp lại thủ tục cho đến khi người tham gia không thể xác định thêm thông tin nào tổ chức có thể thấy hữu ích hoặc có giá trị. Sau khi khá tự tin đã tính đến tất cả yêu cầu thông tin của tổ chức, tạm dừng quy trình phỏng vấn và bắt đầu quy trình biên soạn Preliminary Field List.

Điều quan trọng bạn hiểu rằng có thể phải quay lại quy trình này dù bạn và người tham gia có thể tin đã tính đến tất cả thông tin tổ chức có thể sử dụng. Bạn thường sẽ xác định thông tin mới khi quy trình thiết kế cơ sở dữ liệu triển khai.

---

## Biên soạn danh sách trường hoàn chỉnh

### Preliminary Field List

Bây giờ bạn đã hoàn thành phân tích cơ sở dữ liệu hiện tại và các cuộc phỏng vấn với người dùng và quản lý, bạn có thể tạo Preliminary Field List. Danh sách này đại diện yêu cầu dữ liệu cơ bản của tổ chức và cấu thành tập trường cốt lõi mà bạn sẽ xác định trong cơ sở dữ liệu. Bạn tạo Preliminary Field List bằng quy trình hai bước.

**Bước 1: Rà soát và tinh chỉnh danh sách đặc điểm**

Bước đầu liên quan đến việc rà soát và tinh chỉnh danh sách đặc điểm bạn đã biên soạn trong suốt quy trình phân tích và phỏng vấn. Như bạn đã học trong Chương 3, trường đại diện đặc điểm của chủ đề cụ thể; do đó mỗi mục trong danh sách đặc điểm sẽ trở thành trường. Tuy nhiên trước khi chuyển các đặc điểm đó thành trường, trước tiên bạn cần rà soát danh sách để xác định và loại bỏ đặc điểm trùng lặp.

Trong các cuộc phỏng vấn bạn đã xác định nhiều đặc điểm trong phản hồi của mỗi người tham gia và biên soạn chúng vào danh sách khi phỏng vấn tiến triển. Có thể có lúc bạn vô tình thêm cùng đặc điểm vào danh sách nhiều lần hoặc vô tình gọi cùng đặc điểm bằng hai hoặc nhiều tên khác nhau. Kết quả là danh sách đặc điểm của bạn cần tinh chỉnh.

*Tinh chỉnh mục cùng tên:* Bắt đầu tinh chỉnh danh sách đặc điểm bằng cách tìm mục cùng tên. Khi tìm thấy một hoặc nhiều lần xuất hiện của tên cụ thể, xác định liệu tất cả có đại diện cùng đặc điểm không. Gạch bỏ tất cả trừ một lần xuất hiện của tên khỏi danh sách nếu chúng đại diện cùng đặc điểm; nếu không xác định mỗi thể hiện của tên đại diện gì. Bạn thường thấy tên trùng đại diện cùng loại đặc điểm như đối tác gốc nhưng nên liên kết với chủ đề khác. Trong trường hợp này đổi tên bản trùng để phản ánh quan hệ với chủ đề phù hợp.

Ví dụ giả sử mục "Name" xuất hiện ba lần trên danh sách đặc điểm. Phản ứng đầu tiên có thể là gạch bỏ hai lần xuất hiện vì mục tiêu hiện tại là loại đặc điểm trùng. Tuy nhiên bạn nên xác định liệu mỗi thể hiện của "Name" đại diện đặc điểm riêng biệt trước khi loại. Bạn có thể dễ dàng xác định bằng cách xem ghi chép phỏng vấn. Sau khi kiểm tra cẩn thận bạn phát hiện thể hiện đầu của "Name" đại diện đặc điểm của chủ đề "Clients," thể hiện thứ hai của chủ đề "Employees" và thể hiện thứ ba của chủ đề "Contacts." Bạn giải quyết trùng bằng cách đổi tên mỗi thể hiện (dùng chủ đề làm tiền tố) để phản ánh ý nghĩa thực: giờ bạn có ba đặc điểm mới gọi "Client Name," "Employee Name" và "Contact Name." Mục tương tự "Name" thường xuất hiện trên danh sách đặc điểm; bạn phải xử lý theo cùng cách. Bạn thường thấy một hoặc nhiều lần xuất hiện mục như "Address," "City," "State," "ZIP Code," "Phone Number" và "Email Address"—gọi chung là mục chung. Điểm ở đây là phải đổi tên mỗi thể hiện mục chung để phản ánh quan hệ thực với chủ đề cụ thể, đảm bảo có danh sách trường chính xác nhất có thể.

*Tinh chỉnh mục đại diện cùng đặc điểm:* Bây giờ tìm mục đại diện cùng đặc điểm và gạch bỏ tất cả trừ một. Ý tưởng ở đây là đặc điểm cho trước chỉ xuất hiện một lần trong danh sách đặc điểm. Ví dụ giả sử "Product #," "Product No." và "Product Number" xuất hiện trên danh sách đặc điểm. Rõ ràng các mục này đều đại diện cùng đặc điểm và bạn chỉ cần một trên danh sách. Chọn mục truyền tải ý nghĩa dự định rõ ràng, hoàn chỉnh và không mơ hồ rồi gạch bỏ các mục còn lại. (Trong trường hợp này lựa chọn tốt nhất là "Product Number.")

*Đảm bảo mục đại diện đặc điểm:* Cuối cùng đảm bảo mỗi mục trên danh sách đại diện đặc điểm. Dễ vô tình đặt mục đại diện chủ đề lên danh sách. Bạn có thể kiểm tra mỗi mục bằng cách tự hỏi các câu như: Từ này có thể dùng để mô tả điều gì không? Từ này đại diện thành phần, chi tiết hay mẩu của điều cụ thể không? Từ này đại diện tập hợp sự vật không? Từ này đại diện điều có thể chia nhỏ không? Khi tìm thấy mục đại diện chủ đề thay vì đặc điểm, loại khỏi danh sách đặc điểm và thêm vào danh sách chủ đề. Đảm bảo xác định đặc điểm của chủ đề mới và thêm vào danh sách đặc điểm hiện có.

Ví dụ giả sử "Item" xuất hiện trên danh sách đặc điểm và bạn không chắc liệu nó đại diện đặc điểm hay chủ đề. Dùng các câu hỏi trước để xác định. "Item" có thể dùng để mô tả điều gì không? "Item" đại diện thành phần, chi tiết hay mẩu của điều cụ thể không? Bạn có thể lập luận "Item" giúp mô tả đơn bán vì xác định khách hàng đã mua gì. Mặt khác "Item" có thể không phải đặc điểm vì không đại diện khía cạnh duy nhất của đơn bán. "Date Sold" ví dụ đại diện đặc điểm duy nhất của đơn bán. Chuyển sang câu hỏi tiếp theo: "Item" đại diện tập hợp sự vật không? Bạn có thể trả lời dễ dàng bằng cách xem dạng số nhiều—"Items." Nếu "Items" có thể gọi là tập hợp thì là chủ đề. Rõ ràng "Item" đại diện loại tập hợp nào đó; bạn có thể xác định cuối cùng bằng câu hỏi cuối: "Items" đại diện điều có thể chia nhỏ không? Trả lời bằng cách xác định liệu có thể xác định đặc điểm cho "Items" không. Nếu có thì "Items" chắc chắn đại diện chủ đề và nên chuyển sang danh sách chủ đề. Bạn cũng cần xác định đặc điểm của nó và thêm vào danh sách đặc điểm.

Tiếp tục thủ tục này cho đến khi đã rà soát và tinh chỉnh toàn bộ danh sách đặc điểm đến mức hài lòng. Khi hoàn thành bạn có phiên bản đầu tiên của Preliminary Field List. Bây giờ bạn sẽ thêm mục mới và tinh chỉnh thêm trong bước tiếp theo.

**Bước 2: Xác định liệu có đặc điểm mới trong bất kỳ mẫu nào của bạn không**

Bước này liên quan đến việc kiểm tra tất cả mẫu bạn đã thu thập trong suốt quy trình phân tích. Mục tiêu là xác định liệu có đặc điểm trên mẫu cần thêm vào Preliminary Field List không.

Bắt đầu bước này bằng cách tô đậm mọi đặc điểm bạn tìm trên mỗi mẫu (Hình 6.15 minh họa mẫu với đặc điểm được tô đậm). Sau đó kiểm tra mỗi đặc điểm và xác định liệu đã có trong Preliminary Field List chưa; gạch bỏ trên mẫu nếu đã có trong danh sách. Tiếp theo nghiên cứu các đặc điểm còn lại và xác định liệu bất kỳ cái nào có cùng ý nghĩa với trường hiện có; nếu có gạch bỏ trên mẫu. Cuối cùng thêm mọi đặc điểm còn lại trên mẫu vào Preliminary Field List. Ví dụ có thể "Name" và "Phone No." xuất hiện nhiều lần trên mẫu—gạch bỏ bản trùng vì chúng có cùng ý nghĩa với thể hiện gốc. Trước khi thêm đặc điểm còn lại đảm bảo tên mô tả đúng quan hệ với chủ đề trong mẫu; ví dụ đổi thành "Contact Name" và "Contact Phone Number" nếu đại diện đặc điểm của nhóm "Contacts."

### Ghi chú bên lề: value list

Khi kiểm tra các đặc điểm trên mẫu cơ sở dữ liệu, bảng tính hoặc trang web, ghi trên tờ giấy riêng tên mỗi đặc điểm có kết hợp value list (còn gọi là danh sách liệt kê). Danh sách này xác định phạm vi giá trị chấp nhận được cho đặc điểm cụ thể và thường áp đặt quy tắc nghiệp vụ nhất định. (Bạn sẽ học về quy tắc nghiệp vụ trong Chương 11.) Ví dụ giả sử bạn làm cho công ty sản xuất sử dụng bốn nhà cung cấp cụ thể để giao hàng cho khách hàng trên toàn quốc. Bạn có thể sử dụng value list để đảm bảo người dùng chọn một trong bốn nhà cung cấp đó để vận chuyển đơn hàng cụ thể. Hình 6.16 minh họa ví dụ này và cũng cho thấy hai loại value list phổ biến.

*Hình 6.16 Màn hình cơ sở dữ liệu với hai value list.*

Khi ghi tên đặc điểm có kết hợp value list, cũng ghi các giá trị trong danh sách. Nếu danh sách chứa nhiều giá trị, viết mô tả ngắn về loại giá trị trong danh sách và (nếu có thể) giá trị tối thiểu và tối đa; nếu không ghi từng giá trị. Hình 6.17 cho thấy ví dụ bản ghi bạn đang tạo.

*Hình 6.17 Ghi các đặc điểm có kết hợp value list.*

Bạn có thể kỹ lưỡng về các đặc điểm chọn ghi. Ví dụ không cần ghi đặc điểm chấp nhận tập giá trị đơn giản hoặc rõ ràng như "có/không," "đúng/sai" hay "hoạt động/không hoạt động." Thay vào đó nên ghi đặc điểm chấp nhận tập giá trị riêng biệt, cụ thể.

Để tờ giấy này (hoặc các tờ) sang một bên sau khi hoàn thành ghi các đặc điểm phù hợp. Bạn sẽ tham chiếu tờ này khi xác định đặc tả trường cho các trường trong cơ sở dữ liệu và lại khi xác định quy tắc nghiệp vụ.

### Calculated Field List

Có tinh chỉnh cuối cùng bạn phải thực hiện đối với Preliminary Field List trước khi có thể coi nó hoàn chỉnh: Bạn phải loại mọi trường tính toán và đặt lên danh sách riêng. Danh sách mới này trở thành Calculated Field List của bạn. Nhắc lại từ Chương 3 trường tính toán là trường lưu kết quả nối chuỗi hoặc biểu thức toán học làm giá trị của nó. Bạn liệt kê trường tính toán riêng vì sẽ sử dụng chúng theo cách cụ thể sau trong quy trình thiết kế.

Bạn xây dựng Calculated Field List bằng các trường hiện có từ Preliminary Field List. Kiểm tra danh sách và xác định liệu có trường phù hợp mô tả trường tính toán không. Các trường có tên chứa từ như amount, total, sum, average, minimum, maximum và count có khả năng là ứng viên cho Calculated Field List. Tên phổ biến cho trường tính toán bao gồm "Subtotal," "Average Age," "Discount Amount" và "Customer Count." Khi xác định mỗi trường tính toán, loại khỏi Preliminary Field List và đặt vào Calculated Field List. Khi hoàn thành kiểm tra tất cả trường trong Preliminary Field List, bạn sẽ có hai danh sách hoàn toàn mới: phiên bản thứ ba của Preliminary Field List và Calculated Field List.

**Rà soát cả hai danh sách với người dùng và quản lý**

Tiến hành phỏng vấn ngắn với người dùng và quản lý để rà soát các mục xuất hiện trên Preliminary Field List và Calculated Field List. Mục tiêu của bạn ở đây là xác định liệu có trường bị bỏ sót khỏi bất kỳ danh sách nào không. Bạn có thể tiếp tục bước tiếp theo trong quy trình thiết kế khi mọi người hài lòng danh sách hoàn chỉnh; nếu không xác định trường thiếu và thêm vào danh sách phù hợp. Sau khi phỏng vấn hoàn tất bạn sẽ có phiên bản "cuối cùng" của mỗi danh sách.

Đảm bảo tiến hành các cuộc phỏng vấn này vì phản hồi của người tham gia cung cấp phương tiện xác minh các trường trên cả hai danh sách. Để tôi nhắc bạn một lần nữa tránh quá đầu tư vào ý tưởng các danh sách này hoàn toàn hoàn chỉnh và cuối cùng. Vào thời điểm này bạn vẫn có thể chưa xác định mọi trường cần đưa vào cơ sở dữ liệu (vô tình; bạn gần như chắc chắn bỏ sót vài trường), nhưng nếu cố gắng làm danh sách càng hoàn chỉnh có thể, việc thêm hoặc xóa không tránh khỏi sẽ nhanh và dễ thực hiện.

---

## Ví dụ: Phân tích cơ sở dữ liệu hiện tại

Hãy làm việc với Mike và cơ sở dữ liệu mới của anh ấy một lần nữa. Bạn đã xác định phát biểu sứ mệnh và mục tiêu sứ mệnh cho cơ sở dữ liệu mới của Mike. Bây giờ đến lúc thực hiện phân tích, tiến hành phỏng vấn và biên soạn Preliminary Field List.

Đầu tiên phân tích cơ sở dữ liệu hiện tại của Mike. Bạn thấy anh ấy lưu hầu hết dữ liệu trên giấy; ngoại lệ duy nhất là tồn kho sản phẩm anh ấy duy trì trong chương trình bảng tính. Thu thập mẫu các loại giấy Mike sử dụng để thu thập dữ liệu và ảnh chụp màn hình hoặc bản in bảng tính anh ấy dùng để duy trì tồn kho sản phẩm. Lắp ráp các mẫu này vào thư mục để sử dụng sau. Ví dụ Hình 6.18 cho thấy mẫu danh sách Mike sử dụng để thu thập thông tin khách hàng cùng ảnh chụp màn hình chương trình bảng tính của anh ấy.

*Hình 6.18 Mẫu paper-based và mẫu do máy tính tạo từ Mike's Bikes.*

Tiếp theo xác định các phương pháp Mike sử dụng để trình bày thông tin. Anh ấy và nhân viên hiện tạo nhiều loại báo cáo trình bày thông tin họ cần để tiến hành công việc hàng ngày. Họ tạo hầu hết báo cáo bằng chương trình xử lý văn bản. Thu thập mẫu tất cả báo cáo và đặt trong thư mục để sử dụng sau. Hình 6.19 cho thấy mẫu báo cáo Mike tạo trên máy tính.

*Hình 6.19 Mẫu báo cáo từ Mike's Bikes.*

Bây giờ bạn sẵn sàng phỏng vấn nhân viên của Mike. Đây là các điểm cần nhớ khi tiến hành phỏng vấn: Xác định loại dữ liệu nhân viên sử dụng và cách họ sử dụng dữ liệu đó. Đảm bảo sử dụng Subject-Identification Technique và Characteristic-Identification Technique để giúp phân tích phản hồi và xây dựng câu hỏi tiếp theo. Rà soát tất cả mẫu bạn đã thu thập trong đầu quy trình phân tích. Xác định cách mỗi mẫu được sử dụng, viết mô tả phù hợp và đính kèm mô tả vào mẫu. Xác định yêu cầu thông tin của nhân viên. Xác định thông tin họ hiện sử dụng, thông tin bổ sung họ cần (nhớ sử dụng các mẫu) và loại thông tin họ tin sẽ cần khi doanh nghiệp phát triển.

Trong cuộc phỏng vấn một nhân viên tự hỏi liệu cô ấy có thể thêm trường mới vào báo cáo danh sách điện thoại nhà cung cấp không. Bạn phản hồi thế nào? Bạn đưa cho cô ấy báo cáo và yêu cầu cô ấy đính kèm ghi chú chỉ tên trường mới và giải thích ngắn tại sao cô ấy tin cần thiết. Khi cô ấy hoàn thành, trả mẫu vào thư mục mẫu báo cáo. Hình 6.20 cho thấy mẫu báo cáo với ghi chú đính kèm đề xuất trường mới.

*Hình 6.20 Mẫu báo cáo với ghi chú đính kèm đề xuất trường mới.*

Bạn sẽ tiến hành cuộc phỏng vấn cuối cùng với Mike. Ghi nhớ các điểm sau khi nói chuyện với anh ấy: Xác định các báo cáo anh ấy hiện nhận; bạn cần biết loại thông tin anh ấy sử dụng để đưa ra quyết định kinh doanh. Nếu anh ấy nhận báo cáo không được đại diện trong nhóm mẫu báo cáo của bạn, thu mẫu mỗi báo cáo và thêm vào nhóm, cập nhật danh sách chủ đề và đặc điểm khi cần. Rà soát nhóm mẫu báo cáo với anh ấy và xác định liệu anh ấy có thể xác định chủ đề hoặc đặc điểm nhân viên của anh ấy bỏ qua không. Sử dụng kỹ thuật phù hợp để xác định các mục này và sau đó thêm vào danh sách phù hợp. Xác định liệu có thông tin bổ sung Mike cần để bổ sung thông tin anh ấy hiện nhận không. Xác định loại thông tin Mike sẽ cần khi doanh nghiệp phát triển.

Khi bạn và Mike thảo luận nhu cầu thông tin tương lai của anh ấy, anh ấy cho biết có thông tin mới anh ấy muốn nhận sau khi doanh nghiệp thực sự đi vào hoạt động: Anh ấy muốn xem tổng doanh số xe theo nhà sản xuất. Anh ấy tin thông tin này sẽ giúp anh ấy xác định xe nào nên duy trì trong kho thường xuyên. Báo cáo như vậy hiện không tồn tại nên hãy để Mike phác thảo trên tờ giấy. Tiếp theo xác định các chủ đề và đặc điểm được đại diện trong báo cáo và thêm vào danh sách phù hợp. Thêm báo cáo mới vào nhóm mẫu báo cáo. Hình 6.21 cho thấy phác thảo báo cáo mới của Mike.

*Hình 6.21 Phác thảo báo cáo mới của Mike.*

Phân tích của bạn giờ hoàn tất. Bạn đã phỏng vấn Mike và nhân viên, thu thập tất cả mẫu liên quan và tạo danh sách chủ đề cùng danh sách đặc điểm. Danh sách chủ đề và đặc điểm một phần được cho thấy trong Hình 6.22. Tất cả bạn cần làm giờ là tạo Preliminary Field List.

*Hình 6.22 Danh sách chủ đề và đặc điểm một phần cho Mike's Bikes.*

Như bạn đã biết, bạn cần tinh chỉnh danh sách đặc điểm trước khi nó có thể trở thành phiên bản đầu của Preliminary Field List. Gạch bỏ đặc điểm trùng, mục đại diện cùng đặc điểm và tinh chỉnh mục có tên chung. (Nhớ vấn đề với đặc điểm "Name"? Nếu tìm thấy đặc điểm như vậy, đây là lúc giải quyết.) Tiếp theo rà soát tất cả mẫu và xác định liệu chúng có chứa đặc điểm không hiện có trong Preliminary Field List không. Thêm vào danh sách bất kỳ đặc điểm mới nào tìm thấy. Khi hoàn thành các nhiệm vụ này bạn có phiên bản đầu của Preliminary Field List.

Bây giờ gạch bỏ tất cả trường tính toán khỏi Preliminary Field List và đặt lên danh sách riêng; đây trở thành Calculated Field List mới của bạn. Hình 6.23 cho thấy phần nhỏ của Preliminary Field List cuối cùng và Calculated Field List.

*Hình 6.23 Preliminary Field List một phần và Calculated Field List.*

*Lưu ý:* Bạn có thể đã nhận thấy mỗi danh sách bao gồm ngày trong tiêu đề. Ghi ngày danh sách là ý hay để duy trì lịch sử phát triển rõ ràng.

---

## Tóm tắt

Chương mở đầu bằng thảo luận tại sao nên phân tích cơ sở dữ liệu hiện tại của tổ chức. Bạn học rằng phân tích giúp xác định các khía cạnh của cơ sở dữ liệu hiện tại hữu ích khi thiết kế cơ sở dữ liệu mới. Được trang bị thông tin này bạn có thể thiết kế cơ sở dữ liệu phù hợp nhất với nhu cầu tổ chức. Tiếp theo chúng ta xem qua hai loại cơ sở dữ liệu tổ chức thường sử dụng: paper-based database và legacy database. Chúng ta kết thúc thảo luận này bằng cách xác định ba bước sử dụng trong quy trình phân tích: rà soát cách thu thập dữ liệu, rà soát cách trình bày thông tin và tiến hành phỏng vấn với nhân viên tổ chức.

Chương tiếp tục với thảo luận về quy trình rà soát. Bạn học cách rà soát các cách tổ chức thu thập dữ liệu và cách lắp ráp bộ mẫu thu thập dữ liệu. Sau đó bạn học cách rà soát các cách tổ chức trình bày thông tin và cách lắp ráp bộ mẫu báo cáo.

Tiếp theo chúng ta thảo luận quy trình bạn sử dụng để tiến hành phỏng vấn và bạn học tại sao phỏng vấn hữu ích ở giai đoạn này của quy trình thiết kế. Trong thảo luận này bạn học hai kỹ thuật quan trọng đối với thành công của phỏng vấn: Subject-Identification Technique và Characteristic-Identification Technique.

Phỏng vấn người dùng là chủ đề thảo luận tiếp theo. Chúng ta xem xét bốn vấn đề bạn phải giải quyết trong các cuộc phỏng vấn này cùng các kỹ thuật bạn sử dụng để giải quyết. Tiếp theo chúng ta thảo luận tiến hành phỏng vấn quản lý. Ở đây bạn học về các vấn đề và kỹ thuật các cuộc phỏng vấn này kết hợp.

Cuối cùng chúng ta thảo luận quy trình biên soạn danh sách trường dựa trên danh sách đặc điểm và các đặc điểm xuất hiện trong mẫu. Bạn học rằng bạn phân tách danh sách trường thành hai danh sách riêng: Preliminary Field List và Calculated Field List. Preliminary Field List liệt kê yêu cầu dữ liệu cơ bản của tổ chức và thiết lập tập trường cốt lõi bạn phải xác định trong cơ sở dữ liệu. Calculated Field List gồm các trường chứa giá trị do nối chuỗi hoặc biểu thức toán học tạo ra. Bạn cũng học cách biên soạn value list, danh sách xác định phạm vi giá trị chấp nhận được cho trường cụ thể trong Preliminary Field List và thường giúp áp đặt quy tắc nghiệp vụ nhất định.

---

## Câu hỏi ôn tập

1. Nêu hai mục tiêu của việc phân tích cơ sở dữ liệu hiện tại.
2. Đúng hay Sai: Bạn có thể chấp nhận cấu trúc cơ sở dữ liệu hiện tại làm cơ sở cho cấu trúc mới.
3. Legacy database là gì?
4. Nêu hai bước của quy trình phân tích.
5. Loại chương trình phần mềm máy tính nào bạn nên rà soát trong quá trình phân tích?
6. Tại sao bạn nên tiến hành phỏng vấn sau khi thu thập mẫu thu thập dữ liệu và trình bày thông tin?
7. Bạn sử dụng câu hỏi "mở" và "đóng" như thế nào?
8. Subject-Identification Technique là gì?
9. Làm thế nào bạn xác định đặc điểm cụ thể cho chủ đề cụ thể?
10. Đúng hay Sai: Bạn nên phỏng vấn người dùng và quản lý cùng lúc.
11. Ba loại cơ bản yêu cầu thông tin nào bạn phải xác định?
12. Preliminary Field List là gì?
13. Nêu lý do tại sao mỗi mục trên Preliminary Field List nên có tên duy nhất.
14. value list là gì?
15. Trường tính toán là gì? Bạn nên làm gì (nếu có) với chúng?

---

# Phụ lục: Đáp án Câu hỏi ôn tập – Chương 6

1. **Hai mục tiêu phân tích cơ sở dữ liệu hiện tại:** (1) Xác định liệu cơ sở dữ liệu có hỗ trợ yêu cầu thông tin hiện tại của tổ chức và phát hiện thiếu sót cấu trúc hiện có; (2) Xác định cách cơ sở dữ liệu cần phát triển để hỗ trợ yêu cầu thông tin tương lai của tổ chức.

2. **Sai.** Không nên chấp nhận cấu trúc cơ sở dữ liệu hiện tại làm cơ sở cho cấu trúc mới vì mọi vấn đề ẩn sẽ được chuyển sang cơ sở dữ liệu mới.

3. **Legacy database** là cơ sở dữ liệu đã tồn tại và được sử dụng từ năm năm trở lên, gồm nhiều loại cấu trúc dữ liệu và giao diện người dùng trên mainframe, máy chủ mạng, máy tính cá nhân hoặc đám mây.

4. **Hai bước của quy trình phân tích:** (1) Rà soát cách thu thập dữ liệu; (2) Rà soát cách trình bày thông tin. (Quy trình đầy đủ gồm ba bước, bước thứ ba là tiến hành phỏng vấn.)

5. **Chương trình cần rà soát:** Chương trình cơ sở dữ liệu, bảng tính, trình xử lý văn bản, trang web và bất kỳ chương trình tổ chức dùng để thu thập hoặc quản lý dữ liệu.

6. **Lý do phỏng vấn sau khi thu thập mẫu:** Phỏng vấn cung cấp chi tiết về mẫu đã lắp ráp, thông tin cách tổ chức sử dụng dữ liệu, hỗ trợ xác định cấu trúc trường và bảng sơ bộ, và giúp xác định yêu cầu thông tin tương lai.

7. **Cách dùng câu hỏi mở và đóng:** Xen kẽ giữa hai loại. Bắt đầu với câu hỏi mở để thiết lập chủ đề chung; sau đó dùng câu hỏi đóng (cụ thể hơn) để tập trung vào chi tiết của chủ đề đã chọn.

8. **Subject-Identification Technique:** Thủ tục xác định chủ đề bằng cách lắng nghe danh từ trong phản hồi đại diện người, địa điểm, sự vật hoặc sự kiện và liệt kê chúng.

9. **Xác định đặc điểm chủ đề:** Sử dụng Characteristic-Identification Technique—lắng nghe danh từ đại diện đặc điểm (khía cạnh cụ thể) của chủ đề, thường ở dạng số ít hoặc sở hữu.

10. **Sai.** Nên phỏng vấn người dùng trước vì họ đại diện tuyến đầu và có hình ảnh rõ nhất về hoạt động hàng ngày; sau đó mới phỏng vấn quản lý.

11. **Ba loại yêu cầu thông tin:** Yêu cầu thông tin hiện tại; yêu cầu thông tin bổ sung; yêu cầu thông tin tương lai.

12. **Preliminary Field List** đại diện yêu cầu dữ liệu cơ bản của tổ chức và cấu thành tập trường cốt lõi cần xác định trong cơ sở dữ liệu.

13. **Mỗi mục nên có tên duy nhất** để phản ánh chính xác quan hệ với chủ đề cụ thể; tránh nhầm lẫn khi nhiều chủ đề có đặc điểm tên chung (ví dụ "Name" cho Client, Employee, Contact).

14. **value list** là danh sách xác định phạm vi giá trị chấp nhận được cho đặc điểm/trường cụ thể; thường áp đặt quy tắc nghiệp vụ.

15. **Trường tính toán** lưu kết quả nối chuỗi hoặc biểu thức toán học. Bạn nên loại khỏi Preliminary Field List và đặt vào Calculated Field List riêng vì chúng được xử lý khác trong quy trình thiết kế.

---

*Kết thúc nội dung Chương 6*
