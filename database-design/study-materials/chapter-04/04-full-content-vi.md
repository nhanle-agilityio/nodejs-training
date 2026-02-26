# Chương 4: Tổng quan khái niệm

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Một việc lớn lao còn lớn hơn cả tôi."*  
—THOMAS CARLYLE

---

## Các chủ đề trong chương này

- Tầm quan trọng của việc hoàn thành quy trình thiết kế
- Định nghĩa mission statement và mission objectives
- Phân tích cơ sở dữ liệu hiện tại
- Tạo các cấu trúc dữ liệu
- Xác định và thiết lập mối quan hệ bảng
- Xác định và định nghĩa quy tắc nghiệp vụ
- Xác định và định nghĩa Views
- Rà soát tính toàn vẹn dữ liệu
- Tóm tắt
- Câu hỏi ôn tập

---

## Nội dung chương đầy đủ

Hiểu cách thiết kế cơ sở dữ liệu quan hệ không khó bằng việc hiểu vũ trụ; trên thực tế, nó dễ hơn nhiều. Tuy nhiên, điều quan trọng là bạn phải có ý tưởng tổng quan về cách quy trình thiết kế cơ sở dữ liệu hoạt động và ý tưởng chung về các bước liên quan trong quy trình đó. Mục đích của chương này là cung cấp tổng quan về quy trình thiết kế cơ sở dữ liệu. Để phục vụ tổng quan này, tôi đã gộp tất cả các kỹ thuật trong quy trình thiết kế thành bảy giai đoạn, và tôi thảo luận mỗi giai đoạn theo thuật ngữ chung. Thảo luận này cung cấp bức tranh tổng quan tốt về quy trình thiết kế cơ sở dữ liệu, và tôi hy vọng nó sẽ giúp bạn hiểu rõ hơn nhiều về từng kỹ thuật thiết kế được trình bày trong phần này của cuốn sách.

Bạn có thể dùng phương pháp thiết kế trong cuốn sách này để thiết kế hoàn toàn cơ sở dữ liệu mới từ đầu, tinh chỉnh cơ sở dữ liệu hiện có, hoặc giúp bạn phân tích cơ sở dữ liệu hiện có để bạn có thể thiết kế cơ sở dữ liệu mới dựa trên kết quả phân tích của bạn.

**Lưu ý:** Cơ sở dữ liệu có thể được thiết kế bởi một cá nhân hoặc một nhóm thiết kế gồm hai hoặc nhiều cá nhân. Trong suốt phần còn lại của cuốn sách, tôi dùng cụm từ database developer và từ developer để chỉ người hoặc nhóm thiết kế cơ sở dữ liệu.

---

## Tầm quan trọng của việc hoàn thành quy trình thiết kế

Một điều tôi muốn làm rõ ngay từ đầu là tầm quan trọng của việc hoàn thành quy trình thiết kế. Tôi thường được hỏi liệu có thực sự cần thiết phải trải qua toàn bộ quy trình thiết kế hay không. Câu trả lời của tôi luôn là một tiếng "Có!" dứt khoát. Sau đó tôi được hỏi liệu có vẫn cần thiết không nếu ai đó chỉ định tạo cơ sở dữ liệu "đơn giản". (Đơn giản là một trong những từ nguy hiểm nhất mà database developer biết đến. Không có gì "đơn giản" cả.) Một lần nữa, câu trả lời của tôi là, "Có, vẫn cần thiết." Loại, quy mô hoặc mục đích của cơ sở dữ liệu hoàn toàn không liên quan đến giá trị của việc thực hiện thiết kế phát triển đầy đủ. Bạn nên triển khai và tuân theo quy trình thiết kế cơ sở dữ liệu từ đầu đến cuối, bất kể phương pháp thiết kế nào bạn sử dụng.

Một sự thật nổi tiếng và đã được chứng minh là cố gắng thiết kế cơ sở dữ liệu mà không sử dụng quy trình thiết kế cơ sở dữ liệu kỹ lưỡng là ý tưởng tồi. Nhiều vấn đề cơ sở dữ liệu do thiết kế cơ sở dữ liệu kém gây ra, và tuân theo quy trình thiết kế một phần gần như tệ như không dùng nó chút nào. Thiết kế chưa hoàn chỉnh là thiết kế kém. Chỉ khi bạn thực hiện theo quy trình thiết kế hoàn chỉnh, không rút gọn thì bạn mới đảm bảo có cấu trúc vững chắc và tính toàn vẹn dữ liệu.

Điểm quan trọng cần ghi nhớ là mức độ tính toàn vẹn cấu trúc và tính toàn vẹn dữ liệu trong cơ sở dữ liệu của bạn tỷ lệ thuận trực tiếp với mức độ kỹ lưỡng bạn tuân theo quy trình thiết kế. Bạn càng dành ít thời gian cho quy trình thiết kế thì rủi ro bạn gặp phải vấn đề với cơ sở dữ liệu càng lớn. Điều này đúng cả ngày nay lẫn 25 năm trước. Tuân theo quy trình thiết kế cơ sở dữ liệu một cách kỹ lưỡng có thể không loại bỏ tất cả các vấn đề bạn có thể gặp khi thiết kế cơ sở dữ liệu, nhưng nó sẽ giúp giảm thiểu chúng đáng kể. Khi bạn làm việc với phần mềm RDBMS, bạn sẽ thấy rằng cơ sở dữ liệu được thiết kế tốt dễ triển khai hơn cơ sở dữ liệu thiết kế kém. Cơ sở dữ liệu không khó thiết kế; chỉ cần một chút thời gian để thiết kế chúng đúng cách. Đừng cho phép bản thân đi đường tắt khi có vẻ như quy trình thiết kế mất quá nhiều thời gian—chỉ cần kiên nhẫn và nhớ lời một hiền nhân xưa đã nói:

*Không bao giờ có thời gian để làm đúng, nhưng luôn có thời gian để làm lại!*

---

## Định nghĩa mission statement và mission objectives

Giai đoạn đầu tiên trong quy trình thiết kế cơ sở dữ liệu liên quan đến việc định nghĩa mission statement và mission objectives cho cơ sở dữ liệu. Mission statement thiết lập mục đích của cơ sở dữ liệu và cung cấp cho bạn trọng tâm rõ ràng cho công việc thiết kế của bạn.

Mỗi cơ sở dữ liệu được tạo ra cho một mục đích cụ thể, dù là giải quyết vấn đề kinh doanh cụ thể, quản lý các giao dịch hàng ngày của doanh nghiệp hoặc tổ chức, hay được sử dụng như một phần của hệ thống thông tin. Bạn xác định mục đích của cơ sở dữ liệu và định nghĩa nó trong mission statement. Điều này sẽ giúp đảm bảo rằng bạn phát triển cấu trúc cơ sở dữ liệu phù hợp và thu thập dữ liệu cần thiết để hỗ trợ mục đích dự kiến của cơ sở dữ liệu.

Bạn cũng sẽ định nghĩa mission objectives trong giai đoạn này. Đây là các phát biểu đại diện các tác vụ chung mà người dùng của bạn có thể thực hiện trên dữ liệu trong cơ sở dữ liệu. Bạn dùng các mục tiêu này để hỗ trợ mission statement của bạn và giúp bạn xác định các khía cạnh khác nhau của cấu trúc cơ sở dữ liệu.

Hai nhóm người riêng biệt sẽ tham gia vào việc định nghĩa mission statement và mission objectives. Nhóm đầu tiên bao gồm database developer (bạn), người sở hữu cơ sở dữ liệu, và nhân sự quản lý hoặc người chịu trách nhiệm cuối cùng về cơ sở dữ liệu; nhóm này chịu trách nhiệm định nghĩa mission statement. Nhóm thứ hai bao gồm database developer (bạn lần nữa), nhân sự quản lý hoặc người chịu trách nhiệm cuối cùng về cơ sở dữ liệu, và người dùng cuối; nhóm này chịu trách nhiệm định nghĩa mission objectives.

**Lưu ý:** Từ điểm này trở đi, tôi dùng thuật ngữ management để thay cho "nhân sự quản lý hoặc người chịu trách nhiệm cuối cùng về cơ sở dữ liệu" để rõ ràng và súc tích.

---

## Phân tích cơ sở dữ liệu hiện tại

Giai đoạn thứ hai trong quy trình thiết kế cơ sở dữ liệu liên quan đến việc phân tích cơ sở dữ liệu hiện tại nếu có tồn tại. (Đây là kịch bản phổ biến nhất hiện nay.) Tùy theo tổ chức của bạn, cơ sở dữ liệu thường sẽ là legacy database hoặc paper-based database. Legacy database (còn gọi là inherited database) là cơ sở dữ liệu đã tồn tại và được sử dụng trong nhiều năm. Paper-based database, như bạn có thể đã biết, là tập hợp các biểu mẫu, thư mục Manila và tương tự. Thật kỳ lạ khi nghĩ rằng tại thời điểm viết (tháng 5, 2020), nhiều doanh nghiệp, tổ chức và cơ quan chính phủ vẫn sử dụng giấy như một phần của quy trình thu thập dữ liệu của họ.

Tuy nhiên, dù loại hoặc tình trạng cơ sở dữ liệu là gì, việc phân tích nó sẽ mang lại thông tin quý giá về cách tổ chức của bạn đang sử dụng và quản lý dữ liệu hiện tại. Việc phân tích cũng liên quan đến việc rà soát cách tổ chức của bạn hiện thu thập và trình bày dữ liệu. Bạn xem xét cách tổ chức sử dụng biểu mẫu giấy và báo cáo hoặc ứng dụng desktop để thu thập dữ liệu và trình bày dữ liệu. Cuối cùng, bạn tính đến cách tổ chức sử dụng dữ liệu trên Internet và rà soát bất kỳ ứng dụng dựa trên web nào làm việc với cơ sở dữ liệu.

Một phần khác của việc phân tích liên quan đến việc tiến hành phỏng vấn với người dùng và quản lý để xác định cách họ tương tác với cơ sở dữ liệu hàng ngày. Là database developer, bạn hỏi người dùng cách họ làm việc với cơ sở dữ liệu và yêu cầu thông tin của họ hiện tại là gì. Sau đó bạn phỏng vấn nhân sự quản lý và hỏi họ về thông tin họ hiện nhận được và nhận thức của họ về yêu cầu thông tin tổng thể cho tổ chức. Các cuộc phỏng vấn này là thành phần quan trọng trong phân tích của bạn vì các câu hỏi bạn đặt (hoặc không đặt) sẽ có tác động lớn đến cấu trúc cơ sở dữ liệu cuối cùng của bạn. Bạn phải tiến hành phỏng vấn đầy đủ và hoàn chỉnh một cách kịp thời, thực tế và hiệu quả nếu muốn thiết kế cơ sở dữ liệu thực sự đáp ứng nhu cầu thông tin của tổ chức.

Tiếp theo, bạn dùng thông tin đã thu thập từ phân tích và phỏng vấn để biên soạn Danh sách trường sơ bộ (Preliminary Field List). Sau đó bạn tinh chỉnh danh sách này bằng cách loại bỏ tất cả các trường tính toán và đặt chúng vào Danh sách trường tính toán (Calculated Field List) riêng. Bạn sẽ dùng các trường tính toán này sau trong quy trình thiết kế. Danh sách đã tinh chỉnh tạo thành yêu cầu dữ liệu cơ bản của tổ chức và cung cấp điểm khởi đầu cho việc thiết kế cơ sở dữ liệu mới. (Như bạn biết, không có gì thực sự cuối cùng. Hãy yên tâm rằng bạn sẽ mở rộng và tinh chỉnh danh sách trường này thêm khi phát triển thiết kế của bạn.)

Sau khi danh sách trường ban đầu hoàn tất, bạn gửi nó cho người dùng và quản lý để rà soát ngắn gọn và có thể tinh chỉnh. Bạn khuyến khích phản hồi (tốt nhất có thể) và xem xét các đề xuất chỉnh sửa của họ. Nếu bạn cho rằng các đề xuất hợp lý và có cơ sở vững chắc, bạn thực hiện các chỉnh sửa phù hợp, ghi lại danh sách ở trạng thái hiện tại và chuyển sang giai đoạn tiếp theo.

---

## Tạo các cấu trúc dữ liệu

Tạo các cấu trúc dữ liệu cho cơ sở dữ liệu là giai đoạn thứ ba trong quy trình thiết kế cơ sở dữ liệu. Bạn định nghĩa bảng và trường, thiết lập khóa, và định nghĩa đặc tả trường cho mọi trường.

Bảng là các cấu trúc đầu tiên bạn định nghĩa trong cơ sở dữ liệu. Bạn xác định các chủ đề khác nhau mà bảng sẽ đại diện từ mission objectives bạn biên soạn trong giai đoạn đầu của quy trình thiết kế và yêu cầu dữ liệu bạn thu thập trong giai đoạn thứ hai. Sau đó bạn thiết lập các chủ đề này thành bảng và liên kết chúng với các trường từ danh sách trường bạn biên soạn trong giai đoạn thứ hai của quy trình thiết kế. Sau khi hoàn thành tác vụ này, bạn rà soát mỗi bảng để đảm bảo rằng nó đại diện chỉ một chủ đề và không chứa trường trùng lặp.

Bây giờ bạn chuyển sang rà soát các trường trong mỗi bảng. Bạn tinh chỉnh tất cả các trường đa phần hoặc đa giá trị trong bảng để mỗi trường chỉ lưu một giá trị duy nhất, và bạn chuyển hoặc xóa các trường không đại diện đặc điểm phân biệt của chủ đề mà bảng đại diện. Khi hoàn thành rà soát này, bạn rà soát và tinh chỉnh cấu trúc bảng. Điều này liên quan đến việc kiểm tra công việc bạn đã thực hiện trên các trường để đảm bảo rằng bạn không vô tình bỏ sót gì và đảm bảo rằng mỗi cấu trúc bảng được định nghĩa đúng cách. Tiếp theo, bạn thiết lập các khóa phù hợp cho mỗi bảng. Nhiệm vụ chính của bạn là đảm bảo rằng mỗi bảng có khóa chính được định nghĩa đúng; khóa đặc biệt này xác định duy nhất mỗi bản ghi trong bảng.

Bước cuối trong giai đoạn này là thiết lập đặc tả trường cho mỗi trường trong cơ sở dữ liệu. Ở thời điểm này, bạn tiến hành phỏng vấn với người dùng và quản lý để giúp bạn xác định các đặc điểm trường cụ thể quan trọng đối với họ và rà soát, thảo luận bất kỳ đặc điểm nào mà họ có thể chưa quen. Sau khi hoàn thành các cuộc phỏng vấn này, bạn định nghĩa và ghi nhận đặc tả trường cho mỗi trường. Cấu trúc bảng giờ đã sẵn sàng cho giai đoạn tiếp theo, sau khi bạn hoàn thành mọi tinh chỉnh mà bạn đã xác định trong quá trình rà soát.

---

## Xác định và thiết lập mối quan hệ bảng

Giai đoạn thứ tư của quy trình thiết kế cơ sở dữ liệu liên quan đến việc thiết lập mối quan hệ bảng. Bạn tiến hành phỏng vấn với người dùng và quản lý một lần nữa, xác định mối quan hệ, xác định đặc điểm mối quan hệ và thiết lập tính toàn vẹn ở mức mối quan hệ.

Làm việc với người dùng và quản lý là bài tập thận trọng vì họ có thể hỗ trợ bạn xác định các mối quan hệ giữa dữ liệu. Bạn không thể quen thuộc với mọi khía cạnh của dữ liệu mà tổ chức sử dụng, nên tận dụng bất kỳ kiến thức nào họ có về dữ liệu họ sử dụng sẽ rất có lợi cho bạn.

Sau khi xác định các mối quan hệ, bạn thiết lập kết nối logic giữa các bảng trong mỗi mối quan hệ bằng khóa chính hoặc bằng bảng liên kết. Bạn thực sự dùng cái gì phụ thuộc vào loại mối quan hệ bạn đang thiết lập giữa các bảng. Tiếp theo, bạn xác định loại tham gia và mức độ tham gia cho các bảng trong mỗi mối quan hệ. Trong một số trường hợp, các đặc điểm tham gia này sẽ rõ ràng đối với bạn do bản chất của dữ liệu được lưu trong các bảng. Trong các trường hợp khác, bạn sẽ dựa đặc điểm tham gia trên các quy tắc nghiệp vụ cụ thể.

---

## Xác định và định nghĩa quy tắc nghiệp vụ

Xác định và định nghĩa quy tắc nghiệp vụ là giai đoạn thứ năm của quy trình thiết kế cơ sở dữ liệu. Trong giai đoạn này, bạn sẽ tiến hành phỏng vấn, xác định các hạn chế trên các khía cạnh khác nhau của cơ sở dữ liệu, thiết lập quy tắc nghiệp vụ và định nghĩa, triển khai bảng xác thực.

Cách tổ chức của bạn xem và sử dụng dữ liệu sẽ xác định một tập hợp hạn chế và yêu cầu mà bạn phải tích hợp vào cơ sở dữ liệu. Các cuộc phỏng vấn của bạn với người dùng và quản lý sẽ giúp bạn xác định các ràng buộc cụ thể mà bạn sẽ áp đặt lên dữ liệu, cấu trúc dữ liệu hoặc mối quan hệ. Sau đó bạn ghi nhận các đặc tả này dưới dạng quy tắc nghiệp vụ.

Các cuộc phỏng vấn của bạn với người dùng sẽ bộc lộ các hạn chế cụ thể trên các khía cạnh khác nhau của cơ sở dữ liệu. Ví dụ, người dùng làm việc với cơ sở dữ liệu xử lý đơn hàng rất nhận biết các chi tiết cụ thể, chẳng hạn như ngày giao hàng phải sau ngày đặt hàng; phải luôn có số điện thoại ban ngày; và phương thức giao hàng phải luôn được chỉ ra. Các cuộc phỏng vấn của bạn với quản lý, mặt khác, bộc lộ các hạn chế chung trên các khía cạnh khác nhau của cơ sở dữ liệu. Ví dụ, quản lý văn phòng của đại lý giải trí quen thuộc với các vấn đề chung như việc một đại lý không thể đại diện quá 20 nghệ sĩ và thông tin quảng bá cho mỗi nghệ sĩ phải được cập nhật mỗi năm.

Tiếp theo, bạn định nghĩa và triển khai bảng xác thực khi cần thiết để hỗ trợ một số quy tắc nghiệp vụ. Giả sử bạn phát hiện rằng một số trường có phạm vi giá trị hữu hạn do cách tổ chức của bạn sử dụng chúng. Bạn có thể dùng bảng xác thực để đảm bảo tính nhất quán và hợp lệ của các giá trị được lưu trong các trường đó.

Mức độ tính toàn vẹn mà quy tắc nghiệp vụ thiết lập ở thời điểm này là đáng kể vì nó liên quan trực tiếp đến cách tổ chức xem và sử dụng dữ liệu. Quan điểm của tổ chức về dữ liệu sẽ thay đổi khi tổ chức phát triển, có nghĩa là quy tắc nghiệp vụ cũng phải thay đổi. Xác định và thiết lập quy tắc nghiệp vụ là quy trình liên tục, lặp đi lặp lại, và bạn phải luôn cẩn trọng nếu muốn duy trì mức độ tính toàn vẹn này đúng cách.

---

## Xác định và định nghĩa Views

Giai đoạn thứ sáu của quy trình thiết kế liên quan đến việc xác định và định nghĩa views. Ở đây bạn sẽ tiến hành phỏng vấn (một lần nữa), xác định các cách khác nhau để làm việc với dữ liệu và thiết lập các views.

Bạn xác định các loại views cần xây dựng trong cơ sở dữ liệu bằng cách phỏng vấn người dùng và quản lý và xác định cách họ làm việc với dữ liệu tương ứng của họ. Bạn có thể phát hiện, ví dụ, rằng nhiều người dùng yêu cầu thông tin chi tiết để thực hiện công việc của họ, trong khi những người khác chỉ cần thông tin tóm tắt để giúp họ đưa ra quyết định chiến lược cho tổ chức. Mỗi nhóm người dùng phải truy cập thông tin theo các cách rất cụ thể, và bạn có thể dùng views để đáp ứng các tình huống này.

Tiếp theo, bạn định nghĩa các views bạn đã xác định trong quá trình phỏng vấn bằng các bảng và trường phù hợp và thiết lập tiêu chí cho những views cần thiết để truy xuất thông tin cụ thể. Ví dụ, bạn sẽ thiết lập tiêu chí cho view phải liệt kê tất cả khách hàng ở Texas hoặc view phải hiển thị tổng số nhà cung cấp được ủy quyền (theo thành phố) ở Washington.

---

## Rà soát tính toàn vẹn dữ liệu

Giai đoạn thứ bảy và cuối cùng trong quy trình thiết kế cơ sở dữ liệu liên quan đến việc rà soát cấu trúc cơ sở dữ liệu cuối cùng về tính toàn vẹn dữ liệu.

Đầu tiên, bạn rà soát mỗi bảng để đảm bảo rằng nó đáp ứng tiêu chí của bảng được thiết kế đúng cách và kiểm tra các trường trong mỗi bảng về cấu trúc phù hợp. Sau đó bạn giải quyết mọi mâu thuẫn hoặc vấn đề bạn gặp và rà soát các cấu trúc một lần nữa. Bây giờ bạn có thể xác minh rằng các bảng của bạn có tính toàn vẹn ở mức bảng.

Thứ hai, bạn rà soát và kiểm tra đặc tả trường cho mỗi trường. Bạn thực hiện các tinh chỉnh cần thiết cho các trường và sau đó kiểm tra tính toàn vẹn ở mức trường. Việc rà soát này xác nhận lại tính toàn vẹn ở mức trường mà bạn đã xác định và thiết lập trước đó trong quy trình thiết kế cơ sở dữ liệu.

Thứ ba, bạn rà soát tính hợp lệ của mỗi mối quan hệ, xác nhận loại mối quan hệ và xác nhận đặc điểm tham gia cho mỗi bảng trong mối quan hệ. Sau đó bạn rà soát tính toàn vẹn mối quan hệ để đảm bảo rằng có giá trị khớp giữa các trường dùng chung và không có vấn đề xảy ra khi chèn, cập nhật hoặc xóa dữ liệu ở bất kỳ bảng nào trong mối quan hệ.

Cuối cùng, bạn rà soát các quy tắc nghiệp vụ mà bạn đã xác định trước đó trong quy trình thiết kế cơ sở dữ liệu và xác nhận các ràng buộc bạn đã đặt lên các khía cạnh khác nhau của cơ sở dữ liệu. Nếu có bất kỳ hạn chế nào khác đã đến với sự chú ý của bạn kể từ lần phỏng vấn nhân sự gần nhất, bạn thiết lập chúng thành quy tắc nghiệp vụ mới và thêm vào tập quy tắc nghiệp vụ hiện có.

Bạn đã sẵn sàng triển khai cấu trúc cơ sở dữ liệu logic của mình trong chương trình RDBMS sau khi hoàn thành toàn bộ quy trình thiết kế cơ sở dữ liệu. Tuy nhiên, quy trình không bao giờ thực sự hoàn tất vì cấu trúc cơ sở dữ liệu sẽ luôn cần tinh chỉnh khi tổ chức của bạn phát triển.

---

## Tóm tắt

Chúng ta bắt đầu chương này với thảo luận về tầm quan trọng của việc hoàn thành quy trình thiết kế, và bạn học được rằng thiết kế cơ sở dữ liệu mà không có phương pháp thiết kế tốt dẫn đến thiết kế kém và không đúng. Chúng ta cũng thảo luận thực tế rằng mức độ tính toàn vẹn cấu trúc và dữ liệu tỷ lệ thuận trực tiếp với mức độ kỹ lưỡng bạn tuân theo quy trình thiết kế. Bạn sau đó học được rằng dữ liệu không nhất quán và thông tin không chính xác là hai vấn đề thường liên quan đến cơ sở dữ liệu thiết kế kém.

Tiếp theo chúng ta xem tổng quan về toàn bộ quy trình thiết kế cơ sở dữ liệu. Quy trình được gộp thành các giai đoạn sau để cung cấp cho bạn bức tranh rõ ràng về các bước chung liên quan đến việc thiết kế cơ sở dữ liệu.

1. **Định nghĩa mission statement và mission objectives** cho cơ sở dữ liệu. Mission statement xác định mục đích của cơ sở dữ liệu, và mission objectives xác định các tác vụ mà người dùng thực hiện trên dữ liệu trong cơ sở dữ liệu.

2. **Phân tích cơ sở dữ liệu hiện tại.** Bạn xác định yêu cầu dữ liệu của tổ chức bằng cách rà soát cách tổ chức hiện thu thập và trình bày dữ liệu và bằng cách tiến hành phỏng vấn với người dùng và quản lý để xác định cách họ sử dụng cơ sở dữ liệu hàng ngày.

3. **Tạo các cấu trúc dữ liệu.** Bạn thiết lập bảng bằng cách xác định các chủ đề mà cơ sở dữ liệu sẽ theo dõi. Tiếp theo, bạn liên kết mỗi bảng với các trường đại diện đặc điểm phân biệt của chủ đề bảng và chỉ định trường cụ thể (hoặc nhóm trường) làm khóa chính. Sau đó bạn thiết lập đặc tả trường cho mọi trường trong bảng.

4. **Xác định và thiết lập mối quan hệ bảng.** Bạn xác định các mối quan hệ tồn tại giữa các bảng trong cơ sở dữ liệu và thiết lập kết nối logic cho mỗi mối quan hệ bằng khóa chính và khóa ngoại hoặc bằng bảng liên kết. Sau đó bạn đặt các đặc điểm phù hợp cho mỗi mối quan hệ.

5. **Xác định và định nghĩa quy tắc nghiệp vụ.** Bạn tiến hành phỏng vấn với người dùng và quản lý để xác định các ràng buộc phải áp đặt lên dữ liệu trong cơ sở dữ liệu. Cách tổ chức xem và sử dụng dữ liệu thường xác định các loại ràng buộc bạn phải áp đặt lên cơ sở dữ liệu. Sau đó bạn khai báo các ràng buộc này thành quy tắc nghiệp vụ và chúng sẽ phục vụ thiết lập các mức tính toàn vẹn dữ liệu khác nhau.

6. **Xác định và thiết lập Views.** Bạn phỏng vấn người dùng và quản lý để xác định các cách khác nhau họ làm việc với dữ liệu trong cơ sở dữ liệu. Khi phỏng vấn hoàn tất, bạn thiết lập views khi phù hợp. Bạn định nghĩa mỗi view bằng các bảng và trường phù hợp và thiết lập tiêu chí cho những views phải hiển thị tập hợp bản ghi có giới hạn hoặc hữu hạn.

7. **Rà soát tính toàn vẹn dữ liệu.** Giai đoạn này gồm bốn bước. Đầu tiên, bạn rà soát mỗi bảng để đảm bảo nó đáp ứng tiêu chí thiết kế phù hợp. Thứ hai, bạn rà soát và kiểm tra tất cả đặc tả trường. Thứ ba, bạn kiểm tra tính hợp lệ của mỗi mối quan hệ. Thứ tư, bạn rà soát và xác nhận các quy tắc nghiệp vụ.

---

## Câu hỏi ôn tập

1. Tại sao việc hoàn thành quy trình thiết kế một cách kỹ lưỡng lại quan trọng?

2. Đúng hay Sai: Mức độ tính toàn vẹn cấu trúc tỷ lệ thuận trực tiếp với mức độ kỹ lưỡng bạn tuân theo quy trình thiết kế.

3. Mục đích của mission statement là gì?

4. Mission objectives là gì?

5. Yêu cầu dữ liệu cơ bản của tổ chức gồm những gì?

6. Bạn xác định các chủ đề khác nhau mà bảng sẽ đại diện như thế nào?

7. Đúng hay Sai: Bạn thiết lập đặc tả trường cho mỗi trường trong cơ sở dữ liệu trong giai đoạn thứ hai của quy trình thiết kế cơ sở dữ liệu.

8. Bạn thiết lập kết nối logic giữa các bảng trong mối quan hệ như thế nào?

9. Điều gì xác định một tập hợp hạn chế và yêu cầu mà bạn phải tích hợp vào cơ sở dữ liệu?

10. Bạn có thể thiết kế và triển khai gì để hỗ trợ một số quy tắc nghiệp vụ?

11. Bạn xác định các loại views cần xây dựng trong cơ sở dữ liệu như thế nào?

12. Khi nào bạn có thể triển khai cấu trúc logic của mình trong chương trình RDBMS?

---

*Kết thúc nội dung Chương 4*
