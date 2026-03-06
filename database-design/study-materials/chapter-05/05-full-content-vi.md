# Chương 5: Bắt đầu quy trình

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Tôi nên bắt đầu từ đâu, thưa Bệ hạ?"*  
*"Bắt đầu từ đầu," Vua nói trang nghiêm, "và tiếp tục cho đến khi đến cuối; rồi dừng lại."*  
—LEWIS CARROLL, ALICE Ở XỨ SỞ THẦN TIÊN

---

## Các chủ đề trong chương này

- Tiến hành phỏng vấn
- Định nghĩa mission statement
- Định nghĩa mission objectives
- Tóm tắt
- Câu hỏi ôn tập

---

## Nội dung chương đầy đủ

Mọi thứ đều có khởi đầu, và quy trình thiết kế cơ sở dữ liệu cũng không khác. Điều thú vị là bạn bắt đầu quy trình bằng việc định nghĩa kết quả cuối cùng. Ngay ở bước đầu tiên của quy trình thiết kế cơ sở dữ liệu, bạn xác định và tuyên bố mục đích của cơ sở dữ liệu. Bạn cũng định nghĩa và tuyên bố danh sách các nhiệm vụ mà người dùng có thể thực hiện trên dữ liệu trong cơ sở dữ liệu. Cả hai mục này cung cấp cho bạn trọng tâm và hướng đi để phát triển cơ sở dữ liệu, và chúng giúp đảm bảo cấu trúc cơ sở dữ liệu cuối cùng hỗ trợ mục đích và các nhiệm vụ đã nêu.

**Lưu ý đặc biệt**

Đại dịch COVID-19 năm 2020 đã thay đổi cách mọi người tiến hành kinh doanh và cách chúng ta tương tác với nhau. Số lượng người làm việc từ xa ngày càng tăng, đặc biệt là từ nhà. Rất nhiều công ty đã cho phép nhân viên làm việc từ xa từ trước đó, và nhiều công ty đã sử dụng các nền tảng họp phổ biến để tiến hành cuộc họp. Nhưng đại dịch đã thúc đẩy ý tưởng này trên quy mô lớn hơn nhiều. Vào thời điểm biên soạn sách này, các công ty lớn, tổ chức và cơ quan chính phủ đang cân nhắc lại mô hình làm việc, và nhiều nơi có khả năng giữ ý tưởng làm việc từ xa dưới hình thức nào đó như một phần cố định của cách kinh doanh mới.

Trước những thay đổi này, tôi đã điều chỉnh phần thảo luận về phỏng vấn cho phù hợp. Lời khuyên và hướng dẫn của tôi giờ tiếp cận phỏng vấn từ góc nhìn các cuộc họp bạn có khả năng tiến hành qua các nền tảng họp như Skype, Zoom, Microsoft Teams hoặc Google Meet. Như thường lệ, tôi sẽ chỉ đề cập các vấn đề khái niệm của phỏng vấn; bạn phải tham khảo nội dung trợ giúp hoặc video "Cách làm" của nền tảng bạn sử dụng để học cách tiến hành cuộc họp trên nền tảng đó.

---

## Tiến hành phỏng vấn

Phỏng vấn là phần không thể thiếu của thiết kế cơ sở dữ liệu, và chúng đóng vai trò then chốt trong một số giai đoạn của quy trình thiết kế. Giả định bạn làm việc trong một tổ chức và cần thiết kế cơ sở dữ liệu để hỗ trợ công việc mà bạn và đồng nghiệp thực hiện, bạn nên đảm bảo tiến hành phỏng vấn theo cách mô tả trong sách này. Điều này có nghĩa là bạn sẽ tương tác với một số đồng nghiệp, nhân sự quản lý và chủ sở hữu (tùy quy mô tổ chức) trong suốt quy trình thiết kế. Nếu bạn làm việc cho tổ chức nhỏ chỉ có vài người hoặc chỉ tạo cơ sở dữ liệu cho chính mình, bạn sẽ tiến hành "phỏng vấn tự mình"; bạn vẫn tiến hành các cuộc phỏng vấn mô tả trong sách này, nhưng bạn sẽ đóng vai người phỏng vấn và người được phỏng vấn. Bạn sẽ là người cung cấp câu trả lời cho các câu hỏi.

**Lưu ý**

Phỏng vấn là kỹ năng bạn có thể học được với một chút kiên nhẫn, siêng năng và thực hành. Bạn có thể dùng nhiều phương pháp và kỹ thuật khác nhau để tiến hành phỏng vấn, và có nhiều bài báo học thuật, bài viết và sách về chủ đề này. Thảo luận sâu về chủ đề này vượt phạm vi cuốn sách này, nhưng tôi đã đưa một số kỹ thuật và hướng dẫn trong chương này giúp bạn tiến hành phỏng vấn hiệu quả và thành công.

Phỏng vấn quan trọng vì cung cấp liên kết giao tiếp quý giá giữa bạn (nhà phát triển) và những người mà bạn thiết kế cơ sở dữ liệu cho họ, giúp đảm bảo thành công nỗ lực thiết kế của bạn, và cung cấp thông tin quan trọng có thể ảnh hưởng đến thiết kế cấu trúc cơ sở dữ liệu. Ví dụ, khi làm việc với mối quan hệ bảng, bạn có thể thấy khó xác định loại tham gia và mức độ tham gia cho một vài mối quan hệ. Cách duy nhất để bạn xác định giá trị phù hợp cho các đặc điểm mối quan hệ này là tiến hành phỏng vấn với những người phù hợp trong tổ chức. Sau đó bạn có thể dùng thông tin thu thập trong phỏng vấn để thiết lập các đặc điểm mối quan hệ. Bạn có thể dùng phỏng vấn như công cụ thu thập thông tin để có những hiểu biết mới từ người tham gia về một phần cơ sở dữ liệu hoặc để làm rõ các sự kiện bạn chưa hiểu. Lưu ý rằng bạn phải luôn tiến hành từng cuộc phỏng vấn được tích hợp trong quy trình thiết kế này, bất kể loại cơ sở dữ liệu bạn đang thiết kế hay số người tham gia. Bạn chắc chắn sẽ thiếu một mẩu thông tin quan trọng khi bỏ qua hoặc bỏ sót bất kỳ cuộc phỏng vấn nào, và điều này có thể ảnh hưởng tiêu cực đến cấu trúc cuối cùng của cơ sở dữ liệu.

**Lưu ý**

Trong các chương tiếp theo, tôi dùng câu hỏi mở (open-ended questions) cho tất cả các cuộc phỏng vấn là phần của khái niệm hoặc kỹ thuật đang thảo luận. Bạn có thể dùng các câu hỏi này làm hướng dẫn để xây dựng câu hỏi riêng cho cuộc phỏng vấn cụ thể.

Luôn thiết lập hướng dẫn cho các cuộc phỏng vấn trước khi tiến hành. Điều này giúp đảm bảo bạn tiến hành phỏng vấn theo cách nhất quán và chúng luôn (hoặc thường) thành công. Các phần sau đây đưa ra một số hướng dẫn bạn có thể thiết lập cho người tham gia và cho chính bạn.

### Hướng dẫn cho người tham gia (Participant Guidelines)

Cho mọi người biết ý định của bạn. Nhiều người e ngại phỏng vấn. Họ không thích bị "đặt vào thế khó," và họ không muốn bị hỏi những gì họ cảm thấy có thể là câu hỏi "đánh lừa." Hãy cho mỗi người biết chủ đề bạn muốn thảo luận, những ai khác có khả năng tham gia thảo luận, thời gian bạn muốn bắt đầu phiên, và liệu cuộc phỏng vấn này có phải phần của chuỗi phỏng vấn đang diễn ra hay không. Mọi người trong phiên phỏng vấn cụ thể có khả năng tham gia cuộc trò chuyện và phản hồi câu hỏi của bạn tốt hơn nếu họ biết bạn sẽ tiến hành phiên như thế nào và bạn mong đợi gì ở họ. Trên hết, trấn an họ rằng cuộc phỏng vấn không phải đánh giá năng suất ngụy trang; bạn muốn đảm bảo họ thoải mái nói chuyện với bạn một cách cởi mở và không e ngại. Điều này sẽ giúp xây dựng nền tảng tin tưởng giữa bạn và những người tham gia.

Cho người tham gia biết bạn trân trọng sự tham gia của họ trong cuộc phỏng vấn và phản hồi của họ đối với câu hỏi phỏng vấn có giá trị đối với toàn bộ dự án thiết kế. Kinh nghiệm trước đây có thể khiến một số người tin rằng bất kỳ đóng góp nào họ đưa ra tại nơi làm việc đều không được chú ý và ghi nhận. Ngay cả khi đóng góp của họ thực sự tạo tác động đáng kể lên dự án cụ thể, hiếm khi họ nhận được dù chỉ một lời "Cảm ơn." Với điều này, không có động lực thực sự để họ tham gia cuộc phỏng vấn của bạn. Nhiều, thậm chí tất cả, người tham gia có thể bắt đầu với thái độ này, nhưng bạn thực sự có thể tăng động lực của họ bằng cách cho họ biết bạn thực lòng và chân thành trân trọng sự tham gia của họ và rất quan tâm đến phản hồi của họ. Đảm bảo với họ rằng phản hồi của họ thực sự có giá trị đối với quy trình thiết kế và trong nhiều trường hợp phản hồi của họ có thể chứng minh và xác thực các quyết định đưa ra trong suốt quy trình thiết kế. Người tham gia sẽ sẵn sàng giúp bạn hơn nếu bạn khiến mình đáng tin bằng sự chân thành thực sự; công việc của bạn sẽ dễ dàng hơn nhiều và mọi người sẽ tham gia một cách tự nguyện và nhiệt tình. Việc cho thấy, trong cuộc phỏng vấn thứ hai, cách bạn đã sử dụng đóng góp trước đó của người tham gia cũng rất hiệu quả.

Đảm bảo mọi người hiểu rằng bạn là trọng tài chính thức nếu và khi tranh chấp xảy ra. Tranh chấp nhỏ không thể tránh khỏi sẽ xảy ra trong cuộc phỏng vấn và sẽ có một chút căng thẳng cho đến khi tranh chấp được giải quyết. Bạn có thể tránh tình huống này bằng cách tự mình làm trọng tài các tranh chấp này. Với tư cách nhà phát triển cơ sở dữ liệu, bạn ở vị trí tốt nhất để làm điều này vì bạn có quan điểm khách quan và có thể nhìn thấy cả hai phía của vấn đề. Ngoài ra, quyết định bạn đưa ra sẽ luôn vì lợi ích tốt nhất của cấu trúc cơ sở dữ liệu. Luôn nhớ rằng tranh chấp liên quan đến điều gì đó khác cấu trúc cơ sở dữ liệu có thể và nên chuyển sang thẩm quyền phù hợp hơn, nếu có.

### Hướng dẫn cho người phỏng vấn (Interviewer Guidelines)

**Chọn nền tảng họp phù hợp để tiến hành cuộc họp.** Một số nền tảng họp phổ biến bạn có thể dùng gồm Skype, Zoom, WebEx, Microsoft Teams và Google Meet. Nếu bạn ở tổ chức lớn, khả năng cao bạn cần dùng nền tảng là tiêu chuẩn được duyệt. Ưu điểm ở đây là hầu hết mọi người có thể đã từng dùng nó và quen cách hoạt động. Nếu bạn ở tổ chức nhỏ hơn hoặc doanh nghiệp nhỏ, chọn nền tảng có khả năng trực quan và dễ sử dụng nhất cho đối tượng mục tiêu. Đây là ý tưởng đặc biệt tốt nếu bạn có những người có thể hoàn toàn chưa quen hoặc không thoải mái sử dụng các loại nền tảng này.

**Đặt giới hạn hợp lý, thực tế cho số người tham gia mỗi cuộc phỏng vấn.** Giới hạn số người tham gia tạo môi trường thoải mái hơn và giúp bạn dễ khuyến khích mọi người tham gia. Một vấn đề bạn sẽ gặp khi tiến hành phỏng vấn với số đông người là mức độ e ngại của một số người tham gia tăng tỷ lệ thuận với số người tham gia cuộc phỏng vấn. Một số người đơn giản sợ trông ngu dốt hoặc kém năng lực trước đồng nghiệp, bất kể có thực sự có lý do cho cảm giác đó hay không. Vì vậy, bạn có lý do rất tốt để hạn chế số người tham gia cuộc phỏng vấn.

**Tiến hành phỏng vấn riêng cho người dùng và quản lý.** Tách hai nhóm là ý tưởng tốt vì nhiều lý do, bao gồm "yếu tố sợ hãi" tôi đã nêu trước. Chủ yếu, bạn muốn tách họ vì mỗi nhóm có quan điểm khác nhau về tổ chức nói chung và cách tổ chức sử dụng dữ liệu hàng ngày. Tiến hành phỏng vấn riêng cho mỗi nhóm cho phép bạn tận dụng quan điểm độc đáo của họ để có lợi khi bạn đi qua quy trình thiết kế cơ sở dữ liệu. Lý do khác để giữ phỏng vấn tách biệt là loại bỏ xung đột có thể phát sinh khi các nhóm này bất đồng về một số khía cạnh của tổ chức. Khá phổ biến là thiếu giao tiếp giữa họ, và khả năng 50/50 là cuộc phỏng vấn sẽ đưa vấn đề này lên bề mặt. Điều này có thể thúc đẩy họ thiết lập kênh giao tiếp tốt hơn, hoặc có thể làm vấn đề trầm trọng thêm. Trong mọi trường hợp, vấn đề giao tiếp này có thể phức tạp hóa và kéo dài cuộc phỏng vấn cũng như làm phân tán kết quả. Dùng hiểu biết của bạn về tổ chức để đánh giá có nên giữ phỏng vấn tách biệt hay không. Nếu cần tiến hành phỏng vấn với cả hai nhóm cùng lúc, hãy làm chủ ý, với mục đích cụ thể, và sẵn sàng cho sự sao nhãng.

**Chuẩn bị câu hỏi trước cuộc phỏng vấn.** Bạn có thể tiến hành phỏng vấn khá dễ dàng nếu có bộ câu hỏi chuẩn bị sẵn. (Nghĩ ra câu hỏi ngẫu hứng hiếm khi là ý tưởng tốt, ngay cả khi bạn là người phỏng vấn có kinh nghiệm và rất giỏi tạo câu hỏi ad hoc.) Có danh sách câu hỏi chuẩn bị sẵn cho phép bạn cung cấp trọng tâm và hướng đi cho cuộc phỏng vấn, và mang lại cho người tham gia sự liên tục tư duy. Cuộc phỏng vấn của bạn sẽ diễn ra trôi chảy hơn và hiệu quả hơn khi câu hỏi chuyển dễ dàng từ chủ đề này sang chủ đề khác.

Khi chuẩn bị danh sách câu hỏi phỏng vấn, đảm bảo dùng **open-ended questions** (câu hỏi mở). Ví dụ, "Bạn có cảm thấy dịch vụ của chúng tôi (a) kém, (b) trung bình hay (c) tốt?" là **closed question** (câu hỏi đóng). Câu hỏi đóng không đặc biệt hữu ích vì nó cung cấp sẵn tập phản hồi và không cho phép người được phỏng vấn đưa ra ý kiến khách quan hoặc câu trả lời chi tiết. Mặt khác, open-ended question như "Bạn cảm thấy thế nào về dịch vụ của chúng tôi?" hữu ích hơn nhiều vì cho phép người được phỏng vấn trả lời câu hỏi theo nhiều cách khác nhau. Có lúc bạn có thể cần dùng closed questions, nhưng tốt hơn là dùng chúng chủ ý, tiết chế và với mục đích cụ thể.

**Nếu bạn không giỏi ghi chép,** hãy giao nhiệm vụ đó cho người ghi chép đáng tin cho mỗi cuộc phỏng vấn hoặc thông báo trước cho nhóm rằng bạn sẽ ghi âm cuộc phỏng vấn để tham khảo. Bạn tiến hành phỏng vấn để thu thập thông tin cụ thể về tổ chức, nên quan trọng là bạn thiết lập bản ghi chi tiết hợp lý của mỗi cuộc phỏng vấn. Nếu bạn thấy khó vừa phỏng vấn vừa ghi chép cùng lúc, hãy nhờ một người tham gia làm trợ lý ghi chép cho bạn. (Đây là cách tốt để khuyến khích sự tham gia từ những người thường im lặng hoặc dè dặt.) Chọn trợ lý cẩn thận vì ghi chép có thể bị ảnh hưởng nếu người đó bị sao nhãng bởi quá trình diễn ra. Lựa chọn khác là ghi âm quá trình phỏng vấn. Điều này có thể là cách xử lý ghi chép tốt hơn vì máy ghi sẽ ghi lại cuộc phỏng vấn chính xác hơn, và bạn có thể xác định chính xác ai cung cấp thông tin cụ thể. Đảm bảo thông báo cho tất cả người tham gia trước cuộc phỏng vấn nếu bạn quyết định ghi âm để tham khảo. Vấn đề riêng tư hoặc bảo mật có thể liên quan, và bạn không muốn gây rắc rối cho bản thân hay bất kỳ ai khác.

**Dành sự chú ý đồng đều và toàn tâm cho mọi người.** Đây là điểm quan trọng bạn cần nhớ—bạn phải chú ý hoàn toàn đến người đang nói và làm điều đó một cách chân thành. Nếu bạn cho người tham gia ấn tượng rằng bạn buồn chán, không quan tâm hoặc bận tâm việc khác, họ sẽ ngay lập tức giảm mức độ tham gia trong cuộc phỏng vấn. Mặt khác, họ có thể tham gia khá nhiệt tình nếu thấy bạn quan tâm những gì họ nói và dành sự chú ý toàn tâm cho họ.

Tôi chắc chắn bạn biết sẽ có lúc người tham gia phản hồi câu hỏi của bạn bằng câu trả lời mơ hồ hoặc không đầy đủ. Họ có thể phản hồi như vậy vì nhiều lý do. Có thể họ không biết cách diễn đạt ý tưởng họ muốn truyền tải, hoặc họ không được phép tiết lộ thông tin nhất định. Cũng có thể họ đơn giản không thoải mái nói về bản thân và công việc họ làm, hoặc họ nghi ngờ bạn vì lý do nào đó. Bạn chỉ cần kiên nhẫn và khiến họ thoải mái để họ cung cấp thông tin bạn cần. Ví dụ, bạn có thể thử phát biểu sự gần đúng tốt nhất của bạn về những gì đã được nói và hỏi xem đó có phải ý họ muốn nói không.

**Giữ nhịp độ cuộc phỏng vấn di chuyển.** Bạn có thể đã tham dự các cuộc họp mà một điểm cụ thể bị kéo dài hoặc nhiều thời gian được dùng để cố gắng lấy thông tin từ người tham gia miễn cưỡng. Bạn có thể ngăn điều này xảy ra trong các cuộc phỏng vấn của mình bằng cách đặt giới hạn cá nhân cho thời gian bạn cho phép để trả lời một câu hỏi và thời gian bạn dành cho chủ đề cụ thể. Đừng thông báo cho người tham gia về giới hạn này; thay vào đó, chỉ ra rằng bạn sẽ tạm gác điểm này để cuộc họp có thể tiếp tục. Đảm bảo liên hệ chủ sở hữu cơ sở dữ liệu ngay sau cuộc họp để có thể đạt kết luận và giải pháp cuối cùng cho vấn đề.

**Luôn duy trì kiểm soát cuộc phỏng vấn.** Đây là hướng dẫn quan trọng nhất cho mỗi cuộc phỏng vấn bạn tiến hành. Không thể tránh khỏi là có gì đó sẽ sai ngay khi bạn mất kiểm soát cuộc phỏng vấn. Ví dụ, giả sử bạn có tình huống một người tham gia bắt đầu thay đổi trọng tâm cuộc phỏng vấn bằng cách thảo luận các vấn đề ít hoặc không liên quan đến chủ đề trong chương trình của bạn. Bạn chắc chắn sẽ mất kiểm soát cuộc phỏng vấn trừ khi bạn làm gì đó để chuyển hướng thảo luận. Việc lấy lại kiểm soát cuộc phỏng vấn sẽ dễ dàng cho bạn trong một số trường hợp, nhưng trong các trường hợp khác bạn chỉ cần tuyên bố phần phỏng vấn của bạn "hoàn thành" và để người tham gia tiếp tục thảo luận.

Bạn cũng đôi khi gặp người tham gia muốn chi phối cuộc phỏng vấn và trả lời mọi câu hỏi của bạn. Khi điều này xảy ra, hãy khéo léo và lịch sự thông báo rằng đó là công việc (và nhiệm vụ) của bạn để nhận phản hồi từ tất cả người tham gia để có thể đánh giá toàn diện yêu cầu thông tin tổng thể của tổ chức. Nếu điều này không sửa vấn đề, bạn luôn có lựa chọn không mời người tham gia đó trong các thảo luận sau. Bạn có thể tránh các tình huống như vậy miễn là bạn duy trì kiểm soát cuộc phỏng vấn. Phỏng vấn là phần không thể thiếu của quy trình thiết kế, và tôi cung cấp ví dụ về chúng trong các chương tiếp theo. Bạn sẽ tìm thấy đối thoại mẫu minh họa kịch bản phỏng vấn điển hình và ví dụ câu hỏi bạn có thể dùng trong cuộc phỏng vấn cụ thể. (Các câu hỏi mẫu luôn liên quan đến loại phỏng vấn bạn đang tiến hành.)

**Lưu ý**

Mục đích của ví dụ phỏng vấn là minh họa các kỹ thuật bạn dùng để tiến hành loại phỏng vấn cụ thể, và tôi đã giữ đối thoại tương đối đơn giản vì lý do này. Dùng đối thoại như phương tiện để nghĩ ra ý tưởng tốt cho các loại cuộc trò chuyện bạn tiến hành trong cuộc phỏng vấn.

Điểm cuối cùng: Hãy nhớ rằng các hướng dẫn tôi trình bày trong phần này chỉ là khuyến nghị. Tôi nghi ngờ bạn sẽ không thể áp dụng tất cả hướng dẫn này cho mỗi cuộc phỏng vấn bạn tiến hành hoặc thậm chí áp dụng chúng ở mức độ tôi đã mô tả. Tuy nhiên, tôi kỳ vọng bạn áp dụng chúng đầy đủ trong tình huống lý tưởng. Vâng, tôi biết—bạn không gặp tình huống lý tưởng mọi lúc. Tôi cũng vậy. Nhưng bạn vẫn có thể đặt mục tiêu đạt càng nhiều hướng dẫn này càng tốt. Cuối cùng, người được lợi nhiều nhất chính là bạn.

---

## Định nghĩa mission statement

Trong chương trước, bạn đã học rằng mission statement tuyên bố mục đích cụ thể của cơ sở dữ liệu một cách chung chung và bạn định nghĩa nó ở đầu quy trình thiết kế cơ sở dữ liệu. Hơn nữa, nó cung cấp cho bạn trọng tâm cho nỗ lực thiết kế và giữ bạn không bị chệch hướng và làm cấu trúc cơ sở dữ liệu quá lớn hoặc phức tạp không cần thiết.

### Mission statement được viết tốt

Mission statement tốt ngắn gọn và đi thẳng vấn đề. Phát biểu dài dòng có xu hướng gây nhầm lẫn, mơ hồ hoặc không rõ; chúng làm mờ mục đích của cơ sở dữ liệu hơn là làm rõ nó. Đây là ví dụ mission statement điển hình:

*Mục đích của cơ sở dữ liệu New Starz Talent Agency là duy trì dữ liệu chúng ta tạo ra và cung cấp thông tin hỗ trợ dịch vụ đặt chỗ chúng ta cung cấp cho khách hàng và dịch vụ quản lý chúng ta cung cấp cho nghệ sĩ.*

Mission statement này được định nghĩa tốt và không bị rối bởi phát biểu hoặc chi tiết không cần thiết. Đây là phát biểu rất chung chung, đúng như nó phải là. Hãy nghĩ mission statement như ngọn lửa nến ở cuối đường hầm tối. Ánh sáng do ngọn lửa tạo ra dẫn bạn đến cuối đường hầm, miễn là bạn tập trung vào nó. Theo cách tương tự, mission statement dẫn bạn đến cuối quy trình thiết kế cơ sở dữ liệu. Được hướng dẫn bởi mission statement, bạn có thể tập trung vào thiết kế cấu trúc cơ sở dữ liệu sẽ hỗ trợ mục đích đã tuyên bố của cơ sở dữ liệu.

Mission statement được viết tốt không có cụm từ hoặc câu mô tả rõ các nhiệm vụ cụ thể. Nếu mission statement của bạn chứa loại cụm từ hoặc câu này, hãy loại chúng và viết lại phát biểu. Nhớ giữ các cụm từ đã loại lại vì bạn có thể dùng chúng để xây dựng mission objectives. (Bạn sẽ học về mission objectives ở phần tiếp theo.) Đây là ví dụ mission statement diễn đạt kém:

*Mục đích của cơ sở dữ liệu Whatcom County Hearing Examiner là theo dõi đơn xin sử dụng đất, duy trì dữ liệu về người nộp đơn, lưu hồ sơ tất cả phiên điều trần, lưu hồ sơ tất cả quyết định, lưu hồ sơ tất cả kháng cáo, duy trì dữ liệu về nhân viên phòng ban và duy trì dữ liệu cho mục đích văn phòng chung.*

Rõ ràng ngay là có vài điều sai với mission statement này. Nó hơi dài dòng—nhớ mission statement lý tưởng nên ngắn gọn và đi thẳng vấn đề. Mục đích cụ thể của cơ sở dữ liệu không rõ—mission statement này được viết theo cách khiến việc xác định mục đích cụ thể của cơ sở dữ liệu khó khăn. Nó mô tả nhiều nhiệm vụ cụ thể—hai vấn đề phát sinh khi mission statement được viết theo cách này. Thứ nhất, mô tả các nhiệm vụ không giúp định nghĩa mục đích cụ thể của cơ sở dữ liệu. Thứ hai, phát biểu bằng cách nào đó có vẻ chưa đầy đủ. Nó đặt câu hỏi: "Có nhiệm vụ nào chúng ta quên đưa vào mission statement không?"

Bạn có thể sửa mission statement này bằng cách loại các tham chiếu đến nhiệm vụ cụ thể (nhớ lưu chúng cho bước tiếp theo) và viết lại phát biểu. Đây là ví dụ một trong các cách có thể viết lại mission statement này:

*Mục đích của cơ sở dữ liệu Whatcom County Hearing Examiner là duy trì dữ liệu văn phòng examiner sử dụng để đưa quyết định về yêu cầu sử dụng đất do công dân Whatcom County nộp.*

Chú ý mục đích của cơ sở dữ liệu đã trở nên rõ ràng hơn nhiều trong phiên bản này. Cũng lưu ý phát biểu ngắn gọn hơn và không tạo ấn tượng chưa đầy đủ. Bạn sẽ luôn có trọng tâm rõ ràng trong quy trình thiết kế cơ sở dữ liệu khi xây dựng mission statement theo cách này.

### Soạn mission statement

Quá trình tạo mission statement liên quan đến việc tiến hành phỏng vấn với chủ sở hữu hoặc quản lý tổ chức, tìm hiểu về tổ chức, và xác định mục đích của cơ sở dữ liệu mới.

Bạn tiến hành cuộc phỏng vấn cho bước này với chủ sở hữu tổ chức hoặc, nếu họ chỉ đạo, nhân viên phù hợp. Một trong hai sẽ có thể giúp bạn định nghĩa phát biểu vì mỗi người có hiểu biết tổng thể về tổ chức và nắm rõ chung lý do cần cơ sở dữ liệu ngay từ đầu. Bên cạnh việc giúp định nghĩa mission statement, cuộc phỏng vấn này cũng cung cấp nhiều thông tin về bản thân tổ chức. Thông tin này có giá trị vì bạn có thể dùng sau trong quy trình thiết kế.

Khuyến khích người tham gia phỏng vấn thảo luận càng nhiều khía cạnh của tổ chức càng tốt, ngay cả khi thảo luận liên quan đến vấn đề không trực tiếp liên quan đến cơ sở dữ liệu. Ý tưởng ở đây là bạn hiểu tổ chức làm gì và hoạt động thế nào; bạn càng hiểu tổ chức bao nhiêu, bạn càng chuẩn bị tốt để thiết kế cơ sở dữ liệu đáp ứng nhu cầu của nó. Nhu cầu chung của tổ chức về cơ sở dữ liệu sẽ trở nên rõ ràng sau khi bạn có hiểu biết tốt hơn về bản thân tổ chức. Bạn sau đó có thể chuyển nhu cầu này thành mission statement.

Đảm bảo đặt open-ended questions trong cuộc phỏng vấn. Trong một số trường hợp, câu hỏi tốt có thể khơi gợi người tham gia nêu mục đích của cơ sở dữ liệu mà không cần nhiều nỗ lực. Ví dụ, giả sử bạn đặt câu hỏi sau:

*"Bạn sẽ mô tả mục đích của tổ chức mình với khách hàng mới thế nào?"*

Đây là open-ended question tốt vì tập trung vào vấn đề và vẫn cho người tham gia tự do phản hồi với những gì họ cảm thấy là câu trả lời đầy đủ. Hơn nữa, loại câu hỏi này thường tạo phản hồi mà bạn có thể chuyển trực tiếp thành mission statement.

Bây giờ giả sử bạn nhận được phản hồi sau:

*"Chúng tôi cung cấp dịch vụ giải trí cho khách hàng cho mọi dịp. Chúng tôi lo mọi chi tiết cho buổi biểu diễn để khách hàng càng không lo lắng càng tốt."*

Bạn có thể dễ dàng viết lại loại phản hồi này và biến thành mission statement. Khi phản hồi như thế gồm hai hoặc nhiều câu hoặc cụm từ, một trong các câu hoặc cụm từ thường chỉ ra mục đích của cơ sở dữ liệu. Ví dụ, bạn có thể dùng câu đầu từ phản hồi trước để xây dựng mission statement. Đây là một trong nhiều cách bạn có thể viết lại phản hồi:

*Mục đích của cơ sở dữ liệu All-Star Talent là duy trì dữ liệu chúng ta sử dụng để hỗ trợ dịch vụ giải trí chúng ta cung cấp cho khách hàng.*

Điểm quan trọng nhất cần nhớ là mission statement phải có ý nghĩa với bạn (nhà phát triển cơ sở dữ liệu) và những người mà bạn thiết kế cơ sở dữ liệu cho họ. Các nhóm người khác nhau có cách diễn đạt phát biểu khác nhau, và cách diễn đạt cụ thể của phát biểu phụ thuộc nhiều vào thuật ngữ theo ngành. Mission statement của bạn hoàn thành khi bạn có câu mô tả mục đích cụ thể của cơ sở dữ liệu và được mọi người liên quan hiểu và đồng ý.

Đây là một số câu hỏi mẫu bạn có thể dùng để đạt mission statement:

- Bạn sẽ mô tả mục đích của tổ chức mình với khách hàng mới thế nào?
- Bạn sẽ nói mục đích của tổ chức mình là gì?
- Chức năng chính của tổ chức mình là gì?
- Bạn sẽ mô tả tổ chức mình làm gì thế nào?
- Bạn sẽ định nghĩa lý do duy nhất quan trọng nhất cho sự tồn tại của tổ chức mình thế nào?
- Trọng tâm chính của tổ chức mình là gì?

Bạn có thể đã nhận thấy một số câu hỏi có vẻ giống nhau chỉ viết lại khác. Hãy nhớ nhận xét về cách diễn đạt mission statement cũng áp dụng cho câu hỏi phỏng vấn bạn sẽ dùng trong suốt quy trình thiết kế cơ sở dữ liệu. Bạn có thể đặt cùng câu hỏi cho vài người và nhận phản hồi khác nhau vì mỗi người có thể hiểu ý nghĩa câu hỏi hơi khác. Trong một số trường hợp, bạn có thể chỉ nhận được ánh nhìn dài kiểu "Tôi chưa uống espresso đầu tiên." Hãy thử các cách diễn đạt khác nhau và xác định loại phù hợp nhất với bạn. Cách bạn xây dựng và đặt câu hỏi có thể khác người khác, nhưng không quan trọng miễn bạn có phương pháp phù hợp với mình.

### Ví dụ: Định nghĩa mission statement

Hãy xem cách bạn định nghĩa mission statement cho doanh nghiệp nhỏ tên "Mike's Bikes." Đó là cửa hàng xe đạp nhỏ nằm trong khu mua sắm ngoại ô giữa các doanh nghiệp nhỏ khác. Trước khi có thể định nghĩa mission statement, bạn phải tiến hành phỏng vấn với chủ sở hữu Mike để thu thập thông tin về doanh nghiệp của anh ấy. Cuộc phỏng vấn có thể diễn ra như sau:

**BẠN:**  
"Anh có thể cho tôi biết tại sao anh tin anh cần cơ sở dữ liệu không?"

**MIKE:**  
"Tôi nghĩ chúng tôi cần cơ sở dữ liệu chỉ để theo dõi tất cả hàng tồn kho. Tôi cũng muốn theo dõi tất cả giao dịch bán hàng của chúng tôi."

**BẠN:**  
"Tôi chắc chắn cơ sở dữ liệu sẽ giải quyết những vấn đề đó. Bây giờ, anh sẽ nói chức năng quan trọng nhất duy nhất của doanh nghiệp anh là gì?"

**MIKE:**  
"Cung cấp đa dạng sản phẩm xe đạp và dịch vụ liên quan xe đạp cho khách hàng. Chúng tôi có rất nhiều khách hàng tuyệt vời. Và cả khách quen nữa! Họ là tài sản lớn nhất của chúng tôi."

*(Cuộc phỏng vấn tiếp tục cho đến khi bạn hỏi xong tất cả câu hỏi trong danh sách.)*

Sau cuộc phỏng vấn, rà soát thông tin bạn đã thu thập và định nghĩa mission statement. Bạn có thể xác định vài điểm từ đối thoại trước với Mike, chẳng hạn anh ấy sẽ cần theo dõi sản phẩm, khách hàng và giao dịch bán hàng của khách hàng. Nhưng điểm có giá trị nhất là từ phản hồi của anh ấy cho câu hỏi thứ hai. Bạn có thể dùng câu đầu trong phản hồi đó để xây dựng mission statement. Cân nhắc một số điểm khác bạn đã xác định trong cuộc phỏng vấn, bạn có thể viết lại phản hồi của Mike để tạo mission statement sau:

*Mục đích của cơ sở dữ liệu Mike's Bikes là duy trì dữ liệu chúng ta cần để hỗ trợ kinh doanh bán lẻ và hoạt động dịch vụ khách hàng của chúng ta.*

Khi bạn tin đã có mission statement tốt, rà soát với Mike và đảm bảo anh ấy hiểu và đồng ý với mục đích đã tuyên bố của cơ sở dữ liệu. Khi bạn và Mike hài lòng với mission statement, bạn có thể chuyển sang bước tiếp theo là định nghĩa mission objectives.

---

## Định nghĩa mission objectives

Để mở rộng phần tổng quan ở chương trước, mission objectives là các phát biểu đại diện các nhiệm vụ chung được dữ liệu duy trì trong cơ sở dữ liệu hỗ trợ. Mỗi mission objective đại diện một nhiệm vụ duy nhất. Các mission objectives này cung cấp thông tin bạn sẽ sử dụng trong suốt quy trình thiết kế cơ sở dữ liệu. Ví dụ, mission objectives giúp bạn định nghĩa cấu trúc bảng, đặc tả trường, đặc điểm mối quan hệ và khung nhìn. Chúng cũng giúp bạn thiết lập tính toàn vẹn dữ liệu và định nghĩa quy tắc nghiệp vụ. Cuối cùng, mission objectives hướng dẫn nỗ lực phát triển của bạn và đảm bảo cấu trúc cơ sở dữ liệu cuối cùng hỗ trợ mission statement.

### Mission objectives được viết tốt

Mission objective được viết tốt là câu khẳng định định nghĩa rõ nhiệm vụ chung và không có chi tiết không cần thiết. Nó được diễn đạt bằng thuật ngữ chung, ngắn gọn và đi thẳng vấn đề, và không mơ hồ. Đây là một số ví dụ mission objectives điển hình:

- Duy trì thông tin địa chỉ bệnh nhân đầy đủ
- Theo dõi tất cả giao dịch bán hàng khách hàng
- Đảm bảo đại diện tài khoản phụ trách không quá 20 tài khoản tại bất kỳ thời điểm nào
- Theo dõi bảo trì xe
- Tạo danh bạ điện thoại nhân viên

Các mission objectives này được định nghĩa tốt và dễ hiểu. Mỗi mission objective đại diện một nhiệm vụ chung duy nhất và định nghĩa nhiệm vụ rõ ràng mà không có chi tiết không cần thiết. Ví dụ, mission objective cuối trong danh sách nêu rằng cần tạo danh bạ nhân viên, nhưng không chỉ ra chúng được tạo thế nào. Chỉ ra cách tạo danh bạ nhân viên không cần thiết vì vấn đề đó thuộc quy trình phát triển ứng dụng. Nhớ mục đích của mission objective là giúp định nghĩa các cấu trúc khác nhau trong cơ sở dữ liệu và hướng dẫn hướng phát triển tổng thể của cơ sở dữ liệu.

Nếu mission objective đại diện hơn một nhiệm vụ chung, bạn nên phân tách nó thành hai hoặc nhiều mission objectives. Đây là ví dụ mission objective viết kém:

*Chúng ta cần theo dõi nghệ sĩ chúng ta đại diện và loại hình giải trí họ cung cấp, cũng như các buổi đặt chỗ chúng ta đặt cho họ.*

Có hai vấn đề với mission objective này. Thứ nhất, nó định nghĩa hơn một nhiệm vụ chung. Rõ ràng có hai nhiệm vụ được đại diện trong phát biểu này—theo dõi nghệ sĩ và theo dõi buổi đặt chỗ. Thứ hai, nó chứa chi tiết không cần thiết. Việc đề cập "loại hình giải trí" của nghệ sĩ trong mission objective này không cần thiết. Cụm từ loại hình giải trí hoặc đề cập đặc điểm phân biệt của nghệ sĩ hoặc đại diện nhiệm vụ mới nên được tuyên bố là mission objective. Nếu nó đề cập đặc điểm phân biệt của nghệ sĩ, nó nên được loại khỏi phát biểu; nếu không, nó nên được dùng làm cơ sở cho mission objective mới.

Bạn có thể sửa mission objective này bằng cách loại chi tiết không cần thiết và viết lại thành hai mission objectives. (Giữ các chi tiết bạn loại trong danh sách riêng; chúng có thể hữu ích sau trong quy trình thiết kế.) Đây là ví dụ một cách sửa có thể:

- Duy trì thông tin nghệ sĩ đầy đủ
- Theo dõi tất cả buổi đặt chỗ chúng ta đặt

Chú ý mỗi mission objective giờ định nghĩa rõ một nhiệm vụ chung duy nhất và cũng dễ hiểu. Mission objectives như vậy dễ sử dụng khi bạn thiết kế cơ sở dữ liệu.

### Soạn mission objectives

Định nghĩa mission objectives là quy trình liên quan đến việc tiến hành phỏng vấn với người dùng và quản lý, rồi viết mission objectives phù hợp dựa trên thông tin thu thập từ các cuộc phỏng vấn.

Mục đích của cuộc phỏng vấn là xác định loại nhiệm vụ chung nào cần được dữ liệu trong cơ sở dữ liệu hỗ trợ. Bạn đạt điều này bằng cách đặt open-ended questions cho người tham gia và cho phép họ mở rộng phản hồi khi cần. Các cuộc phỏng vấn mission statement và mission objectives là những cuộc dễ nhất bạn sẽ tiến hành trong quy trình thiết kế vì mọi người thường nhiệt tình tham gia. (Ít nhất theo kinh nghiệm của tôi.) Khá dễ khiến mọi người thảo luận công việc hàng ngày của họ và đưa ra quan điểm về chức năng của tổ chức. Đây cũng là một trong số ít cuộc phỏng vấn bạn sẽ tiến hành với cả người dùng và quản lý; nên có nhiều điểm chung giữa hai nhóm do tính chất chung của cuộc phỏng vấn.

Một điểm rất quan trọng cần nhớ là các cuộc phỏng vấn bạn tiến hành ở đây liên quan đến thảo luận rất chung. Các thảo luận mang tính khái niệm hơn phân tích; ý định của bạn ở đây không phải phân tích cơ sở dữ liệu hoặc ứng dụng cơ sở dữ liệu hiện tại, mà là có ý tưởng tổng thể về các nhiệm vụ chung cơ sở dữ liệu nên hỗ trợ. Hãy nhớ một trong các mục đích của mission objectives là giúp hướng dẫn phát triển cấu trúc cơ sở dữ liệu.

Khi tiến hành cuộc phỏng vấn, đảm bảo một lần nữa đặt open-ended questions. Nhớ open-ended questions có xu hướng gợi phản hồi tốt hơn từ người tham gia. Đặt cho người tham gia câu hỏi về công việc hàng ngày, cách tổ chức hoạt động, và loại vấn đề họ tin cần được cơ sở dữ liệu giải quyết. Khuyến khích họ thảo luận càng nhiều khía cạnh công việc và tổ chức càng tốt. Khi họ phản hồi, cố gắng ghi mỗi phản hồi dưới dạng câu khẳng định. Bạn sẽ thấy dễ chuyển câu thành mission objective hơn nhiều nếu làm được điều này. Đây chỉ là một số ví dụ loại câu hỏi bạn có thể đặt trong cuộc phỏng vấn:

- Công việc hàng ngày anh/chị thực hiện là gì?
- Anh/chị sẽ định nghĩa mô tả công việc của mình thế nào?
- Loại dữ liệu anh/chị làm việc là gì?
- Loại báo cáo anh/chị tạo là gì?
- Loại sự việc anh/chị theo dõi là gì?
- Loại dịch vụ tổ chức anh/chị cung cấp là gì?
- Anh/chị sẽ mô tả loại công việc anh/chị làm thế nào?

Tất cả các câu hỏi này có khả năng gợi phản hồi tốt, dài từ người tham gia. Một ưu điểm của các câu hỏi như vậy là chúng cung cấp cơ hội để bạn đặt câu hỏi tiếp theo. Ví dụ, giả sử bạn nhận phản hồi sau cho câu hỏi cuối trong danh sách:

*"Đầu tiên tôi cố xác định vấn đề chung với xe. Sau đó tôi điền phiếu công việc và ghi đánh giá của tôi về vấn đề. Cuối cùng tôi gửi xe đến đội dịch vụ sẵn có tiếp theo."*

Bạn sẽ ngay lập tức nhận thấy đây là phản hồi dài, điều đó ổn. Bạn cũng nên lưu ý bạn có thể dễ dàng đặt câu hỏi tiếp theo, chẳng hạn:

*"Có loại thông tin khách hàng nào được tích hợp trong quy trình anh/chị vừa mô tả không?"*

Ngay cả khi phản hồi là "Không," câu hỏi vẫn đủ mở để người tham gia mở rộng thêm phản hồi gốc. Loại câu hỏi tiếp theo này cũng có thể kích thích trí nhớ và khiến anh ấy truyền đạt thông tin khác, có thể liên quan chủ đề phản hồi gốc.

Đây là tập mission objectives bạn có thể rút ra từ phản hồi gốc của người tham gia:

- Duy trì thông tin về xe khách hàng
- Theo dõi phiếu công việc
- Duy trì thông tin về đội dịch vụ của chúng ta
- Duy trì thông tin về thợ máy của chúng ta
- Duy trì thông tin về khách hàng của chúng ta

Ba mục tiêu đầu được rút ra trực tiếp từ phản hồi. Chúng dễ xác định vì chủ đề của chúng được nêu rõ trong bản thân phản hồi. Hai mission objectives cuối được rút ra từ các giả định dựa trên phản hồi. Đây là kỹ thuật (bạn có thể nghĩ là "đọc giữa các dòng") mà nhà thiết kế cơ sở dữ liệu có kinh nghiệm dùng khá thường xuyên, và là kỹ thuật bạn nên dùng khi định nghĩa mission objectives. Kỹ thuật dựa vào khả năng của bạn xác định thông tin phản hồi truyền đạt ngầm, cũng như những gì nó truyền đạt rõ. Vì vậy hãy chú ý. Lắng nghe những ý ngụ ý. Không có giả định tốt, tập mission objectives tổng thể của bạn có thể không đầy đủ.

Rà soát phản hồi sau và xác định có thông tin ngụ ý ẩn trong bản thân phản hồi không:

*"Tôi đặt giải trí cho khách hàng của chúng ta, gồm khách thương mại và phi thương mại. Khách phi thương mại thường là cá nhân hoặc nhóm nhỏ đặt tiệc cưới, sinh nhật, kỷ niệm và tương tự. Khách thương mại của chúng ta, mặt khác, gồm doanh nghiệp như câu lạc bộ đêm và tập đoàn. Các câu lạc bộ đêm đặt giải trí theo khung sáu tuần; các tập đoàn đặt các sự kiện như tiệc công ty, ra mắt sản phẩm và các loại sự kiện khuyến mãi khác nhau."*

Bên cạnh thông tin rõ mà phản hồi này truyền đạt, có ít nhất hai mẩu thông tin ngụ ý bạn có thể phát hiện trong phản hồi này. Mẩu thông tin ngụ ý đầu liên quan nhu cầu duy trì thông tin về nghệ sĩ được đặt cho các buổi biểu diễn. Đại lý cần biết các thông tin như tên nghệ sĩ, số điện thoại, địa chỉ gửi thư, tình trạng sẵn có và liệu anh ấy có đi biểu diễn ở địa phương khác không. Mẩu thông tin ngụ ý thứ hai liên quan nhu cầu duy trì thông tin về bản thân các buổi biểu diễn. Đại lý phải biết mọi chi tiết về buổi biểu diễn để đảm bảo buổi biểu diễn diễn ra trôi chảy.

Bây giờ bạn đã biết tầm quan trọng của việc tìm thông tin ngụ ý, hãy ghi nhớ khi định nghĩa mission objectives.

Điểm mấu chốt về mission objectives: Đảm bảo mission objectives của bạn được định nghĩa đúng và định nghĩa tốt, mỗi mục tiêu có ý nghĩa với bạn và những người mà bạn thiết kế cơ sở dữ liệu cho họ, và bạn tìm mọi thông tin ngụ ý ẩn trong phản hồi của mỗi người tham gia.

### Ví dụ: Định nghĩa mission objectives (Mike's Bikes)

Hãy làm việc với Mike lần nữa và phỏng vấn anh ấy để anh ấy có thể giúp bạn định nghĩa mission objectives cho cơ sở dữ liệu của anh ấy. Đây là bản ghi một phần cuộc phỏng vấn với Mike. Một lần nữa, bạn đang tiến hành cuộc phỏng vấn:

**BẠN:**  
"Anh có thể cho tôi ý tưởng về những thứ anh muốn theo dõi trong cơ sở dữ liệu không?"

**MIKE:**  
"Ồ chắc rồi, khá dễ. Tôi muốn theo dõi hàng tồn kho, khách hàng và giao dịch bán hàng của chúng tôi."

**BẠN:**  
"Anh có nghĩ ra thứ gì khác liên quan các chủ đề này không?"

**MIKE:**  
"Chà, tôi đoán nếu chúng ta sẽ theo dõi hàng tồn kho, chúng ta nên biết nhà cung cấp của chúng ta là ai."

**BẠN:**  
"Còn về nhân viên bán hàng tham gia mỗi giao dịch bán hàng thì sao?"

**MIKE:**  
"Ồ đúng rồi, chúng ta chắc chắn nên có thông tin về nhân viên. Dù sao từ góc nhìn nhân sự cũng là ý tưởng tốt để làm vậy. Ít nhất vợ tôi nói thế!"

*(Cuộc phỏng vấn tiếp tục cho đến khi bạn hỏi xong tất cả câu hỏi trong danh sách.)*

Khi các cuộc phỏng vấn hoàn thành, rà soát tất cả thông tin bạn đã thu thập và định nghĩa mission objectives phù hợp. Đảm bảo ghi nhớ điểm mấu chốt khi định nghĩa chúng. Đây là một số mission objectives có thể cho cơ sở dữ liệu Mike's Bikes:

- Duy trì thông tin hàng tồn kho đầy đủ
- Duy trì thông tin khách hàng đầy đủ
- Theo dõi tất cả giao dịch bán hàng khách hàng
- Duy trì thông tin nhà cung cấp đầy đủ
- Duy trì thông tin nhân viên đầy đủ

Sau khi bạn biên soạn danh sách mission objectives, rà soát với Mike và nhân viên của anh ấy. Khi họ hài lòng rằng họ hiểu mission objectives và danh sách tương đối đầy đủ, ghi lại danh sách vào tài liệu trong chương trình ứng dụng bạn ưa thích và lưu để dùng sau.

---

## Tóm tắt

Chương mở đầu với thảo luận về quy trình phỏng vấn. Bạn đã học tại sao phỏng vấn là phần quan trọng của quy trình thiết kế cơ sở dữ liệu và tại sao quan trọng là học cách tiến hành phỏng vấn đúng cách. Bạn giờ biết sự khác biệt giữa open-ended question và closed question, cũng như khi nào dùng từng loại câu hỏi. Chúng ta kết thúc thảo luận này bằng cách rà soát tập hướng dẫn phỏng vấn, và bạn đã học bạn nên dùng chúng để giúp đảm bảo các cuộc phỏng vấn hiệu quả và thành công.

Mission statement là chủ đề thảo luận tiếp theo của chúng ta. Chúng ta mở rộng thông tin ở Chương 4, "Tổng quan Khái niệm," bằng cách xem mission statement nêu mục đích cụ thể của cơ sở dữ liệu thế nào. Bạn giờ biết quy trình liên quan tiến hành phỏng vấn và tìm hiểu về tổ chức, rồi xây dựng mission statement từ thông tin thu thập trong các bước này. Chúng ta đã định nghĩa đặc điểm mission statement tốt, và bạn đã học mission statement được định nghĩa tốt thiết lập trọng tâm rõ ràng cho nỗ lực thiết kế của bạn.

Tiếp theo chúng ta thảo luận mission objectives, và mở rộng tổng quan Chương 4 một lần nữa. Như bạn giờ biết, mission objectives đại diện các nhiệm vụ thực hiện trên dữ liệu trong cơ sở dữ liệu, và bạn định nghĩa chúng sau mission statement. Chúng ta sau đó khám phá cách định nghĩa mission objective. Ở đây bạn đã học rằng bạn tiến hành phỏng vấn với người dùng và quản lý và thông tin thu thập từ các cuộc phỏng vấn này cung cấp cơ sở cho mỗi mission objective. Chúng ta cũng thảo luận đặc điểm mission objective được viết tốt, và bạn đã học mission objective được định nghĩa rõ sẽ giúp bạn định nghĩa các cấu trúc khác nhau trong cơ sở dữ liệu.

---

## Câu hỏi ôn tập

1. Tại sao phỏng vấn quan trọng?
2. Vấn đề gì có thể phát sinh khi bạn tiến hành phỏng vấn với số đông người?
3. Lý do chính để tiến hành phỏng vấn riêng với người dùng và quản lý là gì?
4. Đúng hay Sai: Bạn thường dùng closed questions trong các cuộc phỏng vấn.
5. Loại phản hồi nào bạn nên cố gợi từ người tham gia phỏng vấn?
6. Hướng dẫn quan trọng nhất duy nhất cho mỗi cuộc phỏng vấn bạn tiến hành là gì?
7. Mission statement là gì?
8. Nêu hai đặc điểm của mission statement được viết tốt.
9. Đúng hay Sai: Bạn không cần tìm hiểu về tổ chức để soạn mission statement.
10. Khi nào mission statement của bạn hoàn thành?
11. Mission objective là gì?
12. Nêu hai đặc điểm của mission objective được viết tốt.
13. Đúng hay Sai: Bạn nên phỏng vấn người dùng và quản lý để giúp định nghĩa mission objectives.
14. Công việc hàng ngày của nhân viên liên quan mission objectives thế nào?
15. Đúng hay Sai: Mission objective có thể mô tả hơn một nhiệm vụ.
16. Nêu hai cách mission objective có thể được rút ra từ phản hồi.
17. Khi nào mission objective hoàn thành?

### Đáp án

1. Cung cấp kênh giao tiếp giữa bạn và các bên liên quan, giúp đảm bảo thành công thiết kế, và cung cấp thông tin quan trọng ảnh hưởng cấu trúc cơ sở dữ liệu.
2. Mức độ e ngại của một số người tham gia tăng tỷ lệ thuận với số người tham gia.
3. Mỗi nhóm có góc nhìn khác về tổ chức và cách sử dụng dữ liệu hàng ngày.
4. **Sai.** Bạn thường dùng câu hỏi **mở**.
5. **Phản hồi đầy đủ, mô tả**.
6. **Luôn duy trì kiểm soát** cuộc phỏng vấn.
7. Mission statement **tuyên bố mục đích cụ thể** của cơ sở dữ liệu một cách chung chung.
8. Bất kỳ hai trong số: không mơ hồ; súc tích và đi vào trọng tâm; không chứa cụm từ mô tả rõ nhiệm vụ cụ thể.
9. **Sai.** Bạn **phải** tìm hiểu về tổ chức.
10. Khi bạn có câu mô tả mục đích cụ thể và **được mọi người liên quan hiểu và đồng ý**.
11. Phát biểu đại diện **một nhiệm vụ chung duy nhất** được dữ liệu duy trì trong cơ sở dữ liệu hỗ trợ.
12. Bất kỳ hai trong số: câu tuyên bố; định nghĩa rõ nhiệm vụ chung; không chi tiết không cần thiết; diễn đạt chung chung; súc tích; không mơ hồ.
13. **Đúng.**
14. Nhiều nhiệm vụ họ thực hiện **sẽ trở thành mission objectives**.
15. **Sai.** Mỗi objective đại diện **một** nhiệm vụ.
16. **Tường minh** (được nêu trong phản hồi) hoặc **hàm ý** (suy ra).
17. Khi nó vừa **định nghĩa đúng** vừa **định nghĩa tốt**, và có ý nghĩa với bạn và những người bạn thiết kế cho.

---

*Kết thúc nội dung Chương 5*
