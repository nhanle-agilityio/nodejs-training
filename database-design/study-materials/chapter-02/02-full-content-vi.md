# Chương 2: Mục tiêu thiết kế

**Nguồn:** *Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*  
**Tác giả:** Michael J. Hernandez

---

*"Mọi thứ thực tế, theo một nghĩa nào đó, đều là lý thuyết. Màu xanh của bầu trời thể hiện các định luật cơ bản của sắc học. Không có ý nghĩa gì khi tìm kiếm điều gì đằng sau các hiện tượng; chúng chính là lý thuyết."*  
—GOETHE

---

## Các chủ đề trong chương này

- Tại sao bạn nên quan tâm đến thiết kế cơ sở dữ liệu?
- Tầm quan trọng của lý thuyết
- Ưu điểm của việc học phương pháp thiết kế tốt
- Mục tiêu của thiết kế tốt
- Lợi ích của thiết kế tốt
- Phương pháp thiết kế cơ sở dữ liệu
- Chuẩn hóa
- Tóm tắt
- Câu hỏi ôn tập

---

## Nội dung chương đầy đủ

## Tại sao bạn nên quan tâm đến thiết kế cơ sở dữ liệu?

Một số người trong số các bạn làm việc với các chương trình ứng dụng hệ thống quản lý cơ sở dữ liệu quan hệ (RDBMS) có thể tự hỏi tại sao nên quan tâm đến thiết kế cơ sở dữ liệu. Rốt cuộc, hầu hết các chương trình đều kèm theo cơ sở dữ liệu mẫu mà bạn có thể sao chép và sửa đổi cho phù hợp nhu cầu riêng, và bạn thậm chí có thể mượn các bảng từ cơ sở dữ liệu mẫu và sử dụng chúng trong các cơ sở dữ liệu khác bạn đã tạo. Một số chương trình cũng cung cấp các công cụ hướng dẫn bạn qua quy trình định nghĩa và tạo bảng. Tuy nhiên, các công cụ này thực sự không giúp bạn thiết kế cơ sở dữ liệu—chúng chỉ giúp bạn tạo các bảng vật lý mà bạn sẽ đưa vào cơ sở dữ liệu.

Điều bạn phải hiểu là tốt hơn cho bạn nếu sử dụng các công cụ này sau khi đã tạo cấu trúc cơ sở dữ liệu logic. Các chương trình RDBMS cung cấp các công cụ thiết kế và cơ sở dữ liệu mẫu để giúp giảm thiểu thời gian triển khai vật lý cấu trúc cơ sở dữ liệu. Về mặt lý thuyết, giảm thời gian triển khai cho bạn thêm thời gian tập trung vào việc tạo và xây dựng các ứng dụng người dùng cuối.

Tuy nhiên lý do chính bạn nên quan tâm đến thiết kế cơ sở dữ liệu là nó quan trọng đối với tính nhất quán, toàn vẹn và chính xác của dữ liệu trong cơ sở dữ liệu. Nếu bạn thiết kế cơ sở dữ liệu không đúng cách, sẽ khó truy xuất một số loại thông tin, và bạn có nguy cơ tìm kiếm tạo ra thông tin không chính xác. Thông tin không chính xác có lẽ là kết quả có hại nhất của thiết kế cơ sở dữ liệu không đúng—nó có thể ảnh hưởng xấu đến lợi nhuận của tổ chức. Thực vậy, nếu cơ sở dữ liệu của bạn ảnh hưởng đến cách kinh doanh thực hiện hoạt động hàng ngày, hoặc nếu nó sẽ ảnh hưởng đến hướng tương lai của kinh doanh, bạn phải quan tâm đến thiết kế cơ sở dữ liệu.

Hãy nhìn điều này từ góc độ khác một chút: Hãy nghĩ bạn sẽ làm thế nào để xây nhà tùy chỉnh. Việc đầu tiên bạn sẽ làm là gì? Chắc chắn bạn sẽ không thuê thầu ngay và để anh ta xây nhà theo ý anh ta. Chắc chắn bạn sẽ trước tiên thuê kiến trúc sư thiết kế ngôi nhà mới rồi thuê thầu xây nó. Kiến trúc sư sẽ khám phá nhu cầu của bạn và thể hiện chúng dưới dạng bản vẽ kỹ thuật, ghi lại các quyết định về kích thước, hình dạng và yêu cầu cho các hệ thống khác nhau (cấu trúc, cơ khí, điện). Tiếp theo, thầu sẽ thuê lao động và nguyên vật liệu, gồm các hệ thống được liệt kê, rồi lắp ráp chúng theo bản vẽ và thông số kỹ thuật.

Giờ hãy quay lại quan điểm cơ sở dữ liệu của chúng ta và nghĩ thiết kế logic cơ sở dữ liệu như bản vẽ kiến trúc và triển khai vật lý cơ sở dữ liệu như ngôi nhà hoàn thành. Thiết kế logic cơ sở dữ liệu mô tả kích thước, hình dạng và các hệ thống cần thiết cho cơ sở dữ liệu của bạn, và nó giải quyết nhu cầu thông tin và nghiệp vụ của kinh doanh. Sau đó bạn xây triển khai vật lý của thiết kế logic cơ sở dữ liệu bằng chương trình RDBMS của mình. Sau khi đã tạo các bảng, thiết lập mối quan hệ bảng và thiết lập các mức tính toàn vẹn dữ liệu phù hợp, cơ sở dữ liệu của bạn đã hoàn thành. Giờ bạn sẵn sàng thiết kế và tạo các ứng dụng cho phép bạn và người dùng tương tác dễ dàng với dữ liệu lưu trong cơ sở dữ liệu, và bạn có thể tự tin rằng các ứng dụng này sẽ cung cấp thông tin kịp thời và quan trọng nhất là chính xác để bạn đưa ra quyết định kinh doanh vững chắc.

Mặc dù bạn có thể triển khai thiết kế kém trong RDBMS, triển khai thiết kế tốt mang lại lợi ích lớn hơn nhiều vì nó sẽ tạo ra thông tin chính xác, lưu trữ dữ liệu hiệu quả và hiệu năng hơn, và dễ cho bạn quản lý và duy trì.

## Tầm quan trọng của lý thuyết

**Lưu ý:** Trong chương này, tôi dùng thuật ngữ lý thuyết để đại diện "các phát biểu chung được dùng làm nguyên tắc" và không phải "phỏng đoán hoặc đề xuất."

Nhiều ngành chính (và phương pháp thiết kế liên quan của chúng) có một loại cơ sở lý thuyết nào đó. Kỹ sư kết cấu thiết kế vô số loại công trình bằng các lý thuyết vật lý. Nhà soạn nhạc tạo ra các bản giao hưởng và tác phẩm dàn nhạc tuyệt đẹp bằng các khái niệm trong lý thuyết âm nhạc. Ngành ô tô sử dụng các lý thuyết khí động học để thiết kế xe tiết kiệm nhiên liệu hơn. Ngành hàng không vũ trụ sử dụng các lý thuyết tương tự để thiết kế máy bay và tàu vũ trụ.

Các ví dụ này chứng minh lý thuyết có liên quan và rất quan trọng. Ưu điểm chính của lý thuyết là nó giúp bạn dự đoán kết quả; nó cho phép bạn dự đoán điều gì có thể xảy ra nếu bạn thực hiện một hành động hoặc chuỗi hành động nhất định. Bạn biết nếu thả viên đá, nó sẽ rơi xuống đất. Sir Isaac Newton đề xuất lý thuyết trọng lực vào cuối thế kỷ 17, mà chúng ta giờ coi là định luật. Nếu bạn nhanh nhẹn, bạn có thể tránh ngón chân khỏi Định luật Trọng lực của Newton trước khi chúng bị viên đá rơi đập vỡ. Vấn đề là khi lý thuyết trở thành định luật, nó hoạt động mọi lúc. Nếu bạn đẽo viên đá phẳng và đặt nó lên viên đá phẳng khác, bạn có thể dự đoán nó sẽ ở đâu bạn đặt. Lý thuyết này cho phép bạn thiết kế kim tự tháp, nhà thờ và tòa nhà dân cư có phong cách. Giờ hãy xem ví dụ cơ sở dữ liệu. Giả sử bạn có một cặp bảng liên quan với nhau. Bạn biết có thể rút dữ liệu từ cả hai bảng đồng thời đơn giản vì cách lý thuyết cơ sở dữ liệu quan hệ hoạt động. Dữ liệu bạn rút từ cả hai bảng dựa trên các giá trị khớp nhau của trường dùng chung giữa các bảng. Một lần nữa, hành động của bạn có kết quả có thể dự đoán.

Cơ sở dữ liệu quan hệ dựa trên hai nhánh toán học gọi là lý thuyết tập hợp và logic vị từ bậc một. Chính thực tế này cho phép cơ sở dữ liệu quan hệ đảm bảo thông tin chính xác. Các nhánh toán học này cũng cung cấp cơ sở để xây dựng các phương pháp thiết kế tốt và các khối xây dựng cần thiết để tạo các cấu trúc cơ sở dữ liệu quan hệ vững chắc.

Bạn có thể có sự miễn cưỡng dễ hiểu khi học các khái niệm toán học phức tạp đơn giản để thực hiện nhiệm vụ có vẻ khá hạn chế. Đến tận ngày nay, bạn vẫn chắc chắn nghe những tuyên bố rằng các lý thuyết toán học mà cơ sở dữ liệu quan hệ và các phương pháp thiết kế liên quan dựa trên không có liên quan gì đến thế giới thực, hoặc chúng bằng cách nào đó không thực tế. Điều này không đúng: Toán học là trung tâm của mô hình quan hệ và là thứ đảm bảo khả năng tồn tại của mô hình. Nhưng hãy vui lên—bạn thực sự không cần biết gì về lý thuyết tập hợp hay logic vị từ bậc một để sử dụng cơ sở dữ liệu quan hệ! Bạn chắc chắn không phải biết mọi chi tiết khí động học chỉ để lái ô tô hoặc bay máy bay. Các lý thuyết khí động học có thể giúp bạn hiểu và đánh giá cách ô tô tiết kiệm xăng hơn, nhưng chúng không giúp bạn học cách đỗ xe song song.

Lý thuyết toán học cung cấp nền tảng cho mô hình cơ sở dữ liệu quan hệ và do đó làm cho mô hình có thể dự đoán, đáng tin cậy và vững chắc. Lý thuyết mô tả các khối xây dựng cơ bản dùng để tạo cơ sở dữ liệu quan hệ và cung cấp hướng dẫn cách nó nên được sắp xếp. Sắp xếp các khối xây dựng để đạt kết quả mong muốn được định nghĩa là thiết kế.

## Ưu điểm của việc học phương pháp thiết kế tốt

Bạn có thể học cách thiết kế cơ sở dữ liệu đúng bằng phương pháp thử và sai, nhưng sẽ mất rất nhiều thời gian và bạn có lẽ sẽ phải sửa nhiều lỗi trên đường đi. Cách tiếp cận tốt nhất là học một phương pháp thiết kế cơ sở dữ liệu tốt, chẳng hạn như phương pháp trong cuốn sách này, rồi bắt tay thiết kế cơ sở dữ liệu của bạn.

Bạn sẽ đạt được nhiều ưu điểm từ việc học và sử dụng phương pháp thiết kế tốt:

- **Nó cung cấp kỹ năng bạn cần để thiết kế cấu trúc cơ sở dữ liệu vững chắc.** Rất nhiều vấn đề xử lý dữ liệu có thể do sự hiện diện của dữ liệu dư thừa, dữ liệu trùng lặp và dữ liệu không hợp lệ, hoặc thiếu dữ liệu bắt buộc. Tất cả các vấn đề này tạo ra thông tin sai lệch và làm một số truy vấn và báo cáo khó hiểu hoặc khiến chúng tương đối vô nghĩa. Bạn có thể tránh hầu như tất cả các vấn đề này bằng cách sử dụng phương pháp thiết kế tốt.

- **Nó cung cấp tập hợp kỹ thuật có tổ chức sẽ hướng dẫn bạn từng bước qua quy trình thiết kế.** Sự tổ chức của các kỹ thuật cho phép bạn đưa ra quyết định có cơ sở về mọi khía cạnh thiết kế của mình.

- **Nó giúp bạn giữ các bước sai và lặp lại thiết kế ở mức tối thiểu.** Tất nhiên, bạn sẽ tự nhiên mắc một số lỗi khi thiết kế cơ sở dữ liệu, nhưng phương pháp tốt giúp bạn nhận ra lỗi trong thiết kế và cung cấp công cụ để sửa chúng. Thêm vào đó, sự tổ chức của các kỹ thuật trong phương pháp giữ bạn không lặp lại không cần thiết một bước thiết kế nhất định.

- **Nó làm quy trình thiết kế dễ dàng hơn và giảm thời gian bạn dành cho việc thiết kế cơ sở dữ liệu.** Bạn sẽ không thể tránh khỏi lãng phí thời gian quý báu khi dùng phương pháp thử-sai tùy ý để thiết kế vì nó thiếu logic và tổ chức mà phương pháp tốt cung cấp.

- **Nó sẽ giúp bạn hiểu và sử dụng chương trình ứng dụng RDBMS đầy đủ và hiệu quả hơn.** Khi kiến thức về thiết kế đúng của bạn mở rộng và phát triển, bạn sẽ thực sự bắt đầu hiểu tại sao RDBMS nhất định cung cấp một số công cụ và cách bạn có thể dùng chúng để triển khai cấu trúc trong chương trình RDBMS.

Bất kể bạn dùng phương pháp thiết kế trình bày trong cuốn sách này hay phương pháp đã được thiết lập khác, bạn nên chọn phương pháp thiết kế, học nó tốt nhất có thể và sử dụng nó trung thành để thiết kế các cơ sở dữ liệu của mình.

## Mục tiêu của thiết kế tốt

Bạn phải đạt các mục tiêu rõ ràng để thiết kế cấu trúc cơ sở dữ liệu vững chắc, tốt. Bạn có thể tránh nhiều vấn đề được đề cập ở phần trước nếu giữ các mục tiêu này trong tâm trí và liên tục tập trung vào chúng khi thiết kế cơ sở dữ liệu.

- **Cơ sở dữ liệu hỗ trợ cả truy xuất thông tin bắt buộc và ad hoc.** Cơ sở dữ liệu phải lưu dữ liệu cần thiết để hỗ trợ các yêu cầu thông tin được định nghĩa trong quy trình thiết kế và bất kỳ truy vấn ad hoc nào người dùng có thể đặt ra.

- **Các bảng được xây dựng đúng và hiệu quả.** Mỗi bảng trong cơ sở dữ liệu đại diện một chủ đề duy nhất, gồm các trường tương đối khác biệt, giữ dữ liệu dư thừa ở mức tối thiểu tuyệt đối, và được xác định trong toàn bộ cơ sở dữ liệu bởi một trường có giá trị duy nhất.

- **Tính toàn vẹn dữ liệu được áp đặt ở cấp trường, bảng và mối quan hệ.** Các mức tính toàn vẹn này giúp đảm bảo các cấu trúc dữ liệu và giá trị của chúng sẽ hợp lệ và chính xác mọi lúc.

- **Cơ sở dữ liệu hỗ trợ quy tắc nghiệp vụ liên quan đến tổ chức.** Dữ liệu phải cung cấp thông tin hợp lệ và chính xác luôn có ý nghĩa đối với kinh doanh.

- **Cơ sở dữ liệu phù hợp với tăng trưởng tương lai.** Cấu trúc cơ sở dữ liệu phải dễ sửa đổi hoặc mở rộng khi yêu cầu thông tin của kinh doanh thay đổi và phát triển.

Bạn có thể thấy thực hiện các mục tiêu này khó vào lúc này lúc khác, nhưng bạn chắc chắn sẽ hài lòng với cấu trúc cơ sở dữ liệu cuối cùng sau khi đã đạt được chúng.

## Lợi ích của thiết kế tốt

Thời gian bạn đầu tư vào việc thiết kế cấu trúc cơ sở dữ liệu vững chắc là thời gian sử dụng hiệu quả. Thiết kế tốt tiết kiệm thời gian về lâu dài vì bạn không liên tục phải chỉnh sửa cấu trúc được thiết kế nhanh và kém. Bạn đạt được các lợi ích sau khi áp dụng các kỹ thuật thiết kế tốt:

- **Cấu trúc cơ sở dữ liệu dễ sửa đổi và duy trì.** Các sửa đổi bạn thực hiện đối với trường, bảng hoặc mối quan hệ không cần ảnh hưởng xấu đến các trường, bảng hoặc mối quan hệ khác trong cơ sở dữ liệu.

- **Dữ liệu dễ sửa đổi.** Các thay đổi bạn thực hiện đối với giá trị của một trường nhất định trong bảng sẽ không ảnh hưởng xấu đến giá trị của các trường khác trong bảng. Hơn nữa, cơ sở dữ liệu được thiết kế tốt giữ các trường trùng lặp ở mức tối thiểu tuyệt đối, nên bạn thường chỉ sửa một giá trị dữ liệu cụ thể trong một trường duy nhất.

- **Thông tin dễ truy xuất.** Bạn sẽ có thể tạo truy vấn dễ dàng vì các bảng được xây dựng tốt và các mối quan hệ giữa chúng được thiết lập đúng. Các mối quan hệ giữa các bảng khá rõ ràng trong cơ sở dữ liệu được thiết kế tốt, ngay cả khi chúng không được thực thi.

- **Ứng dụng người dùng cuối dễ phát triển và xây dựng.** Bạn có thể dành nhiều thời gian hơn cho lập trình và giải quyết các tác vụ thao tác dữ liệu đang có thay vì làm việc quanh các vấn đề không thể tránh khỏi phát sinh khi làm việc với cơ sở dữ liệu được thiết kế kém.

## Phương pháp thiết kế cơ sở dữ liệu

### Phương pháp truyền thống

Nói chung, các phương pháp thiết kế cơ sở dữ liệu truyền thống kết hợp ba giai đoạn: phân tích yêu cầu, mô hình hóa dữ liệu và chuẩn hóa.

Giai đoạn **phân tích yêu cầu** bao gồm việc kiểm tra kinh doanh đang được mô hình hóa, phỏng vấn người dùng và quản lý để đánh giá hệ thống hiện tại và phân tích nhu cầu tương lai, và đánh giá yêu cầu thông tin cho kinh doanh nói chung. Quy trình này tương đối đơn giản, và thực vậy, quy trình thiết kế trình bày trong cuốn sách này theo cùng hướng tư duy.

Giai đoạn **mô hình hóa dữ liệu** bao gồm việc mô hình hóa cấu trúc cơ sở dữ liệu bằng phương pháp mô hình hóa dữ liệu, chẳng hạn như biểu đồ thực thể-quan hệ (ER), mô hình hóa đối tượng ngữ nghĩa, mô hình hóa vai trò đối tượng hoặc mô hình hóa UML. Mỗi phương pháp mô hình hóa này cung cấp phương tiện biểu diễn trực quan nhiều khía cạnh của cấu trúc cơ sở dữ liệu, chẳng hạn như các bảng, mối quan hệ bảng và đặc điểm mối quan hệ. Thực vậy, phương pháp mô hình hóa dùng trong cuốn sách này là phiên bản cơ bản của biểu đồ ER. Hình 2.1 cho thấy ví dụ về biểu đồ ER cơ bản.

**Hình 2.1** Ví dụ về biểu đồ ER cơ bản.

**Lưu ý:** Tôi đã kết hợp phương pháp mô hình hóa dữ liệu tôi dùng trong cuốn sách này vào chính quy trình thiết kế thay vì xử lý riêng. Tôi sẽ giới thiệu và giải thích mỗi kỹ thuật mô hình hóa khi phù hợp trong suốt quy trình.

Mỗi phương pháp mô hình hóa dữ liệu kết hợp một tập ký hiệu biểu đồ dùng để biểu diễn cấu trúc và đặc điểm của cơ sở dữ liệu. Ví dụ, biểu đồ trong Hình 2.1 cung cấp thông tin về nhiều khía cạnh của cơ sở dữ liệu:

- Các hình chữ nhật đại diện hai bảng gọi là AGENTS và CLIENTS.
- Hình thoi đại diện mối quan hệ giữa hai bảng này, và "1:N" trong hình thoi cho biết đây là mối quan hệ một-nhiều.
- Đường dọc bên cạnh bảng AGENTS cho biết khách hàng phải liên kết với chỉ một đại lý, và hình tròn và "chân quạ" bên cạnh bảng CLIENTS cho biết đại lý không nhất thiết phải liên kết với khách hàng, nhưng có thể liên kết với một hoặc nhiều.

Các trường cũng được định nghĩa và liên kết với các bảng phù hợp trong giai đoạn mô hình hóa dữ liệu. Mỗi bảng được gán khóa chính, nhiều mức tính toàn vẹn dữ liệu được xác định và triển khai, và các mối quan hệ được thiết lập qua khóa ngoại. Sau khi cấu trúc bảng ban đầu hoàn thành và các mối quan hệ được thiết lập theo mô hình dữ liệu, cơ sở dữ liệu sẵn sàng trải qua giai đoạn chuẩn hóa.

**Chuẩn hóa** là quy trình phân rã các bảng lớn thành các bảng nhỏ hơn để loại bỏ dữ liệu dư thừa và trùng lặp và tránh các vấn đề khi chèn, cập nhật hoặc xóa dữ liệu. Trong quy trình chuẩn hóa, cấu trúc bảng được kiểm tra với các dạng chuẩn và sau đó sửa đổi nếu phát hiện bất kỳ vấn đề nào nói trên. Dạng chuẩn (normal form) là tập quy tắc cụ thể có thể dùng để kiểm tra cấu trúc bảng để đảm bảo nó vững chắc và không có vấn đề. Có nhiều dạng chuẩn, và mỗi dạng dùng để kiểm tra một tập vấn đề cụ thể. Các dạng chuẩn hiện đang sử dụng gồm Dạng chuẩn thứ nhất, Dạng chuẩn thứ hai, Dạng chuẩn thứ ba, Dạng chuẩn thứ tư, Dạng chuẩn thứ năm, Dạng chuẩn thứ sáu, Dạng chuẩn Boyce-Codd và Dạng chuẩn Miền/Khóa.

### Phương pháp thiết kế trình bày trong cuốn sách này

Phương pháp thiết kế tôi dùng trong cuốn sách này là phương pháp tôi đã phát triển qua nhiều năm. Nó kết hợp phân tích yêu cầu và phương pháp biểu đồ ER đơn giản để biểu diễn cấu trúc cơ sở dữ liệu. Tuy nhiên, nó không kết hợp quy trình chuẩn hóa truyền thống hay việc sử dụng các dạng chuẩn. Lý do đơn giản: Các dạng chuẩn có thể gây nhầm lẫn cho bất kỳ ai chưa dành thời gian học lý thuyết cơ sở dữ liệu quan hệ chính thức. Ví dụ, hãy xem định nghĩa sau về Dạng chuẩn thứ ba:

*Một quan hệ ở 3NF khi và chỉ khi nó ở 2NF và mọi thuộc tính không khóa phụ thuộc phi chuyển tiếp vào khóa chính.*[^1]

[^1]: C. J. Date, An Introduction to Database Systems, ấn bản 7 (Boston, MA: Addison-Wesley, 2000), trang 362.

Mô tả này tương đối vô nghĩa với người đọc không quen với các thuật ngữ relation, 3NF, 2NF, non-key attribute, non-transitively dependent và primary key.

Quy trình thiết kế cơ sở dữ liệu không và không nên khó hiểu. Chỉ cần quy trình được trình bày một cách thẳng thắn và mỗi khái niệm hoặc kỹ thuật được giải thích rõ ràng, bất kỳ ai cũng có thể thiết kế cơ sở dữ liệu đúng cách. Ví dụ, định nghĩa sau xuất phát từ kết quả sử dụng Dạng chuẩn thứ ba đối với cấu trúc bảng, và tôi tin hầu hết mọi người sẽ thấy nó rõ ràng và dễ hiểu:

*Một bảng phải có trường xác định duy nhất mỗi bản ghi của nó, và mỗi trường trong bảng phải mô tả chủ đề mà bảng đại diện.*

Quy trình tôi dùng để xây dựng định nghĩa này cũng là quy trình tôi dùng để phát triển toàn bộ phương pháp thiết kế của mình.

## Chuẩn hóa

Vào cuối thập niên 1980, tôi nhận ra mô hình quan hệ đã tồn tại gần 20 năm và mọi người đã thiết kế cơ sở dữ liệu bằng cùng phương pháp cơ bản khoảng 12 năm. (Và tôi vẫn ngạc nhiên chúng ta vẫn đang dùng nó hơn 20 năm sau.) Tôi đang dùng phương pháp thiết kế truyền thống lúc đó, nhưng thi thoảng thấy khó áp dụng. Hai điều khiến tôi phiền lòng nhất là quy trình chuẩn hóa (nói chung) và các vòng lặp có vẻ vô tận để đạt thiết kế đúng. Tất nhiên, đây dường như là điểm đau với hầu hết các nhà phát triển cơ sở dữ liệu khác tôi quen, nên tôi chắc chắn không đơn độc trong sự thất vọng của mình. Tôi suy nghĩ về các vấn đề này khá lâu, rồi đưa ra giải pháp.

Tôi đã biết mục đích của chuẩn hóa là lấy bảng được thiết kế không đúng hoặc kém và chuyển đổi thành bảng có cấu trúc vững chắc. Tôi cũng hiểu quy trình: Lấy bảng nhất định và kiểm tra nó với các dạng chuẩn để xác định liệu nó có được thiết kế đúng không. Nếu không thiết kế đúng, thực hiện các sửa đổi phù hợp, kiểm tra lại, và lặp lại toàn bộ quy trình cho đến khi cấu trúc bảng vững chắc. Hình 2.2 cho thấy cách tôi hình dung quy trình ở thời điểm này.

**Hình 2.2** Cách tôi xem quy trình chuẩn hóa chung.

Tôi giữ những sự thật này trong tâm trí và đặt các câu hỏi sau:

1. Nếu chúng ta giả định bảng được chuẩn hóa triệt để là được thiết kế đúng và hiệu quả, liệu chúng ta có thể xác định các đặc điểm cụ thể của bảng đó và phát biểu chúng là các thuộc tính của cấu trúc bảng lý tưởng không?
2. Liệu chúng ta sau đó có thể dùng bảng lý tưởng đó làm mô hình cho tất cả các bảng chúng ta tạo cho cơ sở dữ liệu trong suốt quy trình thiết kế không?

Câu trả lời cho cả hai câu hỏi, tất nhiên, là có, nên tôi bắt đầu nghiêm túc phát triển cơ sở cho phương pháp thiết kế "mới" của mình. Đầu tiên tôi biên soạn các tập hướng dẫn rõ ràng để tạo cấu trúc vững chắc bằng cách xác định các đặc điểm cuối cùng của cơ sở dữ liệu được định nghĩa tốt thành công vượt qua các bài kiểm tra của mỗi dạng chuẩn. Sau đó tôi tiến hành vài bài kiểm tra, sử dụng các hướng dẫn mới để tạo cấu trúc bảng cho cơ sở dữ liệu mới và sửa các khiếm khuyết trong cấu trúc bảng của cơ sở dữ liệu hiện có. Các bài kiểm tra này diễn ra rất tốt, nên tôi quyết định áp dụng kỹ thuật này vào toàn bộ phương pháp thiết kế truyền thống. Tôi xây dựng các hướng dẫn để giải quyết các vấn đề khác liên quan đến phương pháp thiết kế truyền thống, chẳng hạn như miền, kiểu con, mối quan hệ, tính toàn vẹn dữ liệu và tính toàn vẹn tham chiếu. Sau khi hoàn thành các hướng dẫn mới, tôi thực hiện thêm bài kiểm tra và phát hiện phương pháp của tôi hoạt động khá tốt.

Ưu điểm chính của phương pháp thiết kế của tôi là nó loại bỏ nhiều khía cạnh của phương pháp thiết kế truyền thống mà các nhà phát triển cơ sở dữ liệu mới thấy đáng sợ. Ví dụ, chuẩn hóa, theo nghĩa truyền thống, giờ trong suốt với người thiết kế vì nó được kết hợp (qua các hướng dẫn mới) trong suốt quy trình thiết kế. Ưu điểm lớn khác là phương pháp rõ ràng và dễ triển khai. Tôi tin phần lớn do thực tế tôi đã viết tất cả các hướng dẫn bằng tiếng Anh đơn giản, khiến chúng dễ hiểu với hầu hết mọi người.

Điều quan trọng bạn phải hiểu là phương pháp thiết kế này sẽ tạo ra cấu trúc cơ sở dữ liệu được chuẩn hóa đầy đủ chỉ khi bạn tuân theo nó trung thành như bất kỳ phương pháp thiết kế nào khác. Bạn không thể rút ngắn, bỏ qua, làm nhẹ hoặc bỏ qua bất kỳ phần nào của phương pháp này (hay bất kỳ phương pháp thiết kế nào) và kỳ vọng phát triển cấu trúc vững chắc. Bạn phải trải qua quy trình cần mẫn, có phương pháp và hoàn toàn để gặt hái phần thưởng mong đợi.

**Lưu ý:** Tôi đã cung cấp giải thích chi tiết hơn về cách tôi kết hợp chuẩn hóa vào phương pháp thiết kế của mình trong Phụ lục G, "On Normalization."

Bạn sẽ phải học vài thuật ngữ cơ bản trước khi đi sâu vào quy trình thiết kế, và chúng ta sẽ trình bày chúng ở chương tiếp theo.

---

## Tóm tắt

Ở đầu chương này, chúng ta đã xem tầm quan trọng của việc quan tâm đến thiết kế cơ sở dữ liệu. Bạn giờ hiểu rằng thiết kế cơ sở dữ liệu quan trọng đối với tính toàn vẹn và nhất quán của dữ liệu chứa trong cơ sở dữ liệu. Chúng ta đã thấy vấn đề chính do thiết kế không đúng hoặc kém gây ra là thông tin không chính xác. Thiết kế đúng là mối quan tâm tối quan trọng vì thiết kế kém có thể ảnh hưởng xấu đến thông tin tổ chức sử dụng.

Tiếp theo, chúng ta bước vào thảo luận về tầm quan trọng của lý thuyết cũng như sự liên quan của nó với mô hình cơ sở dữ liệu quan hệ. Bạn đã học rằng nền tảng của mô hình trong lý thuyết toán học làm cho nó thành cấu trúc rất vững chắc và đáng tin cậy.

Theo sau thảo luận này, chúng ta xem các ưu điểm đạt được từ việc học phương pháp thiết kế. Trong số những điều khác, sử dụng phương pháp tốt tạo ra cấu trúc cơ sở dữ liệu hiệu quả và đáng tin cậy, giảm thời gian cần thiết để thiết kế cơ sở dữ liệu và cho phép bạn tránh các vấn đề điển hình do thiết kế kém gây ra.

Tiếp theo, chúng ta liệt kê các mục tiêu của thiết kế tốt. Đạt các mục tiêu này quan trọng đối với thành công của quy trình thiết kế cơ sở dữ liệu vì chúng giúp bạn đảm bảo cấu trúc cơ sở dữ liệu vững chắc.

Sau đó chúng ta nêu các ưu điểm của thiết kế tốt, và bạn đã học rằng thời gian bạn đầu tư vào việc thiết kế cấu trúc cơ sở dữ liệu vững chắc là thời gian sử dụng hiệu quả.

Chúng ta kết thúc chương này bằng thảo luận ngắn về các phương pháp thiết kế cơ sở dữ liệu truyền thống, giải thích tiền đề đằng sau phương pháp thiết kế trình bày trong cuốn sách này và chuẩn hóa. Giờ bạn hiểu rằng các phương pháp thiết kế truyền thống phức tạp và có thể mất thời gian để học và nắm bắt. Mặt khác, phương pháp thiết kế dùng trong cuốn sách này được trình bày rõ ràng và thẳng thắn, dễ triển khai và sẽ tạo ra cùng kết quả như phương pháp thiết kế truyền thống.

---

## Câu hỏi ôn tập

1. Khi nào là thời điểm tốt nhất để sử dụng các công cụ thiết kế của chương trình RDBMS?

2. Đúng hay Sai: Thiết kế quan trọng đối với tính nhất quán, toàn vẹn và chính xác của dữ liệu.

3. Kết quả có hại nhất của thiết kế cơ sở dữ liệu không đúng là gì?

4. Sự thực nào làm cho cơ sở dữ liệu quan hệ vững chắc về cấu trúc và có thể đảm bảo thông tin chính xác?

5. Nêu hai ưu điểm của việc học phương pháp thiết kế.

6. Đúng hay Sai: Bạn sẽ sử dụng chương trình RDBMS hiệu quả hơn nếu hiểu thiết kế cơ sở dữ liệu.

7. Nêu hai mục tiêu của thiết kế tốt.

8. Điều gì giúp đảm bảo các cấu trúc dữ liệu và giá trị của chúng hợp lệ và chính xác mọi lúc?

9. Nêu hai lợi ích của việc áp dụng các kỹ thuật thiết kế tốt.

10. Đúng hay Sai: Bạn có thể rút ngắn qua một số quy trình thiết kế và vẫn đạt được thiết kế vững chắc, tốt.

### Đáp án

1. **Sau khi bạn thiết kế cấu trúc logic** của cơ sở dữ liệu.
2. **Đúng.** Thiết kế quan trọng đối với tính nhất quán, toàn vẹn và chính xác của dữ liệu.
3. **Thông tin không chính xác**.
4. Mô hình cơ sở dữ liệu quan hệ dựa trên **lý thuyết tập hợp và logic vị từ bậc nhất**.
5. Bất kỳ hai trong số: trang bị kỹ năng thiết kế cấu trúc vững chắc; cung cấp kỹ thuật từng bước có tổ chức; tối thiểu hóa sai sót và lặp lại; làm thiết kế dễ và nhanh hơn; giúp sử dụng RDBMS đầy đủ hơn.
6. **Đúng.** Hiểu thiết kế cơ sở dữ liệu giúp bạn sử dụng RDBMS hiệu quả hơn.
7. Bất kỳ hai trong số: hỗ trợ truy xuất thông tin theo yêu cầu và ad hoc; bảng được xây đúng và hiệu quả; tính toàn vẹn dữ liệu ở cấp trường, bảng và mối quan hệ; hỗ trợ quy tắc nghiệp vụ; tạo điều kiện phát triển tương lai.
8. **Tính toàn vẹn dữ liệu**.
9. Bất kỳ hai trong số: cấu trúc dễ sửa đổi và bảo trì; dữ liệu dễ sửa đổi; thông tin dễ truy xuất; ứng dụng người dùng cuối dễ phát triển.
10. **Sai.** Bạn không thể rút ngắn quy trình và vẫn đạt được thiết kế vững chắc, tốt.
