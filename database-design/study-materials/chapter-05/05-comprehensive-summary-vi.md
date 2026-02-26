# Chương 5: Bắt đầu quy trình — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 5 trình bày **Giai đoạn 1** của quy trình thiết kế cơ sở dữ liệu: định nghĩa **tuyên bố sứ mệnh** và **mục tiêu sứ mệnh**. Bạn "bắt đầu" bằng cách định nghĩa kết quả cuối cùng — mục đích của cơ sở dữ liệu và các công việc nó sẽ hỗ trợ. Cả hai cung cấp trọng tâm và hướng đi cho thiết kế.

**Lưu ý:** Sách bao gồm hướng dẫn phỏng vấn qua nền tảng họp (Skype, Zoom, Teams, Google Meet, v.v.), phản ánh làm việc từ xa và WFH. Chương tập trung vào vấn đề khái niệm; hướng dẫn cụ thể theo nền tảng do tài liệu nhà cung cấp cung cấp.

---

## 1. Tiến hành phỏng vấn

### Tại sao phỏng vấn quan trọng

Phỏng vấn là **phần không thể thiếu** của thiết kế cơ sở dữ liệu và đóng vai trò chính trong một số giai đoạn:

- **Liên kết giao tiếp** — Giữa bạn (người phát triển) và những người bạn thiết kế cho
- **Thành công thiết kế** — Giúp đảm bảo nỗ lực thiết kế thành công
- **Thông tin quan trọng** — Ảnh hưởng thiết kế cấu trúc cơ sở dữ liệu (vd: loại và mức độ tham gia của mối quan hệ)
- **Công cụ** — Thu thập thông tin mới, làm rõ sự kiện bạn chưa hiểu

**Quy tắc:** Luôn tiến hành **từng** cuộc phỏng vấn trong quy trình thiết kế — bất kể loại cơ sở dữ liệu hay số người. Bỏ qua hoặc bỏ sót phỏng vấn dẫn đến thiếu thông tin quan trọng và có thể ảnh hưởng tiêu cực đến cấu trúc cuối cùng.

**Tổ chức nhỏ / cá nhân:** Tiến hành "tự phỏng vấn" — bạn đóng cả vai trò người hỏi và người trả lời.

**Kỹ năng:** Phỏng vấn có thể học được với kiên nhẫn, siêng năng và thực hành.

---

### Hướng dẫn cho người tham gia (Người được phỏng vấn)

| Hướng dẫn | Mục đích |
|-----------|----------|
| **Làm rõ ý định** | Cho biết chủ đề, ai tham gia, thời gian bắt đầu, có phải phần của chuỗi không. Trấn an rằng không phải đánh giá hiệu suất. Xây dựng tin cậy. |
| **Đánh giá cao sự tham gia** | Cho họ biết phản hồi có giá trị. Nhiều người tin rằng đóng góp bị bỏ qua — ghi nhận tăng động lực và cam kết. Cho thấy bạn đã dùng đóng góp trước đó (trong phỏng vấn tiếp theo) rất hiệu quả. |
| **Thiết lập bạn là trọng tài** | Tranh chấp nhỏ sẽ nảy sinh. Là nhà phát triển, bạn có quan điểm khách quan. Quyết định của bạn phục vụ cấu trúc cơ sở dữ liệu. Chuyển tranh chấp không liên quan cơ sở dữ liệu cho cấp có thẩm quyền. |

---

### Hướng dẫn cho người phỏng vấn (Dành cho bạn)

| Hướng dẫn | Chi tiết |
|-----------|----------|
| **Chọn nền tảng họp** | Skype, Zoom, WebEx, Teams, Google Meet. Dùng chuẩn của tổ chức nếu có. Với tổ chức nhỏ, chọn dễ dùng nhất cho đối tượng. |
| **Giới hạn người tham gia** | Giới hạn hợp lý, thực tế mỗi buổi. Nhóm lớn → mức độ e ngại tăng (sợ trông ngớ ngẩn trước đồng nghiệp). Ít hơn = thoải mái hơn, dễ tham gia hơn. |
| **Phỏng vấn riêng người dùng và quản lý** | Mỗi nhóm có quan điểm khác về tổ chức và cách dùng dữ liệu. Tách riêng cho phép tận dụng quan điểm độc đáo. Tránh xung đột khi nhóm bất đồng. Thiếu giao tiếp giữa họ có thể làm phức tạp phỏng vấn — phán đoán dựa trên hiểu biết tổ chức. |
| **Chuẩn bị câu hỏi trước** | Cung cấp trọng tâm, hướng đi, tính liên tục. Phỏng vấn diễn ra trơn tru. Nghĩ câu hỏi ngay tại chỗ hiếm khi là ý hay. |
| **Dùng câu hỏi mở** | Câu mở cho phép câu trả lời đa dạng, chi tiết (vd: "Bạn cảm thấy thế nào về dịch vụ của chúng ta?"). Câu đóng cung cấp sẵn lựa chọn và giới hạn câu trả lời (vd: "Dịch vụ tệ, trung bình hay tốt?"). Dùng câu đóng ít, có chủ đích. |
| **Ghi chép** | Phân công người ghi chép hoặc ghi âm (thông báo trước — quyền riêng tư/bảo mật). Hoặc nhờ một người tham gia ghi chép. Hồ sơ chi tiết rất quan trọng. |
| **Chú ý bình đẳng** | Hoàn toàn chú ý người nói. Buồn chán hoặc phân tâm giảm tham gia; quan tâm khuyến khích. |
| **Xử lý câu trả lời mơ hồ** | Kiên nhẫn. Thử diễn đạt lại tốt nhất và hỏi xem có phải ý họ không. |
| **Duy trì nhịp độ** | Đặt giới hạn thời gian riêng cho câu hỏi/chủ đề. Không thông báo người tham gia; tạm gác điểm để tiếp tục. Theo dõi với chủ sở hữu sau để giải quyết. |
| **Duy trì kiểm soát** | **Hướng dẫn quan trọng nhất.** Mất kiểm soát → mọi thứ đi sai. Chuyển hướng thảo luận lạc đề. Nếu ai đó chiếm lĩnh, lịch sự giải thích bạn cần phản hồi từ tất cả. Loại trừ nếu cần. |

---

## 2. Định nghĩa Tuyên bố sứ mệnh

### Mục đích

- Khai báo **mục đích cụ thể** của cơ sở dữ liệu bằng ngôn ngữ chung
- Cung cấp **trọng tâm** cho nỗ lực thiết kế
- Ngăn đi lạc vào cấu trúc quá lớn hoặc phức tạp không cần thiết

### Đặc điểm Tuyên bố sứ mệnh viết tốt

1. **Không mơ hồ**
2. **Ngắn gọn, đúng trọng tâm** — Tuyên bố dài dòng gây nhầm lẫn, che mờ mục đích
3. **Không có cụm từ mô tả công việc cụ thể** — Giữ cho mục tiêu sứ mệnh

**Ẩn dụ:** Tuyên bố sứ mệnh giống ngọn nến cuối đường hầm tối — dẫn bạn đến cuối quy trình thiết kế.

### Ví dụ Kém vs. Tốt

**Kém (dài dòng, liệt kê công việc, mục đích không rõ):**
> "Mục đích cơ sở dữ liệu của Whatcom County Hearing Examiner là theo dõi đơn xin sử dụng đất, duy trì dữ liệu người nộp đơn, lưu hồ sơ các phiên điều trần, lưu hồ sơ quyết định, lưu hồ sơ kháng cáo, duy trì dữ liệu nhân viên phòng ban và dữ liệu dùng chung văn phòng."

**Tốt hơn (mục đích rõ, ngắn gọn):**
> "Mục đích cơ sở dữ liệu của Whatcom County Hearing Examiner là duy trì dữ liệu văn phòng examiner dùng để ra quyết định về yêu cầu sử dụng đất do công dân Whatcom County nộp."

### Soạn Tuyên bố sứ mệnh

**Quy trình:**
1. Tiến hành phỏng vấn với **chủ sở hữu hoặc quản lý** (hoặc nhân viên họ chỉ định)
2. **Tìm hiểu tổ chức** — Khuyến khích thảo luận nhiều khía cạnh, kể cả không liên quan trực tiếp CSDL. Hiểu nhiều hơn = thiết kế tốt hơn.
3. **Xác định mục đích** — Dùng câu hỏi mở. Chuyển nhu cầu thành tuyên bố sứ mệnh.

**Câu hỏi mẫu:**
- Bạn mô tả mục đích tổ chức với khách hàng mới thế nào?
- Chức năng chính của tổ chức là gì?
- Lý do quan trọng nhất cho sự tồn tại của tổ chức là gì?
- Trọng tâm chính của tổ chức là gì?

**Điểm mấu chốt:** Tuyên bố sứ mệnh hoàn thành khi bạn có câu **mô tả mục đích cụ thể** và **được mọi người liên quan hiểu và đồng ý**. Các nhóm diễn đạt khác nhau; thuật ngữ ngành có thể khác.

---

## 3. Định nghĩa Mục tiêu sứ mệnh

### Mục đích

Mục tiêu sứ mệnh là **các phát biểu đại diện công việc chung** được dữ liệu trong cơ sở dữ liệu hỗ trợ. Mỗi mục tiêu = **một công việc**.

**Sử dụng trong suốt thiết kế:** Cấu trúc bảng, đặc tả trường, đặc điểm mối quan hệ, khung nhìn, tính toàn vẹn dữ liệu, quy tắc nghiệp vụ. Chúng hướng dẫn phát triển và đảm bảo cấu trúc cuối cùng hỗ trợ tuyên bố sứ mệnh.

### Đặc điểm Mục tiêu sứ mệnh viết tốt

1. **Câu khẳng định** mô tả rõ công việc chung
2. **Không có chi tiết không cần thiết**
3. **Diễn đạt bằng ngôn ngữ chung**
4. **Ngắn gọn, đúng trọng tâm**
5. **Không mơ hồ**

**Quy tắc:** Nếu mục tiêu mô tả **hơn một công việc**, phân tách thành hai hoặc nhiều mục tiêu.

### Ví dụ Kém vs. Tốt

**Kém (hai công việc, chi tiết thừa):**
> "Chúng ta cần theo dõi nghệ sĩ chúng ta đại diện và loại hình giải trí họ cung cấp, cũng như các buổi biểu diễn chúng ta đặt cho họ."

**Tốt hơn (hai mục tiêu riêng):**
> "Duy trì thông tin nghệ sĩ đầy đủ."  
> "Theo dõi tất cả các buổi biểu diễn chúng ta đặt."

### Soạn Mục tiêu sứ mệnh

**Quy trình:**
1. Tiến hành phỏng vấn với **người dùng và quản lý**
2. **Thảo luận chung** — Khái niệm, không phân tích. Không phân tích CSDL hiện tại; nắm ý tưởng tổng thể về công việc CSDL cần hỗ trợ.
3. Hỏi câu mở về công việc hàng ngày, chức năng tổ chức, CSDL cần giải quyết gì
4. Ghi phản hồi dưới dạng **câu khẳng định** — Dễ chuyển thành mục tiêu sứ mệnh
5. **Tìm thông tin ngầm** — "Đọc giữa các dòng." Chủ đề rõ ràng được nêu; ngầm cần suy luận (vd: phản hồi về đặt dịch vụ cho khách ngụ ý cần thông tin nghệ sĩ và chi tiết buổi biểu diễn)

**Câu hỏi mẫu:**
- Công việc hàng ngày của bạn là gì?
- Bạn làm việc với loại dữ liệu nào?
- Bạn tạo loại báo cáo nào?
- Bạn theo dõi những gì?
- Bạn mô tả loại công việc bạn làm thế nào?

**Kết luận:** Mục tiêu sứ mệnh phải vừa **được định nghĩa đúng** vừa **được định nghĩa tốt**; có ý nghĩa với bạn và bên liên quan; nắm bắt thông tin **ngầm** cũng như rõ ràng từ phản hồi.

### Suy ra Mục tiêu sứ mệnh

Mục tiêu sứ mệnh có thể suy ra từ phản hồi **rõ ràng** (chủ đề được nêu trực tiếp) hoặc **ngầm** (suy từ ngữ cảnh).

**Hoàn thành khi:** Được định nghĩa đúng, được định nghĩa tốt, có ý nghĩa với bạn và người bạn thiết kế cho.

---

## Câu hỏi ôn tập (Tự kiểm tra)

1. Tại sao phỏng vấn quan trọng?
2. Vấn đề gì có thể nảy sinh khi phỏng vấn số lượng người lớn?
3. Lý do chính phỏng vấn riêng người dùng và quản lý là gì?
4. Đúng hay Sai: Bạn thường dùng câu hỏi đóng trong phỏng vấn.
5. Bạn nên cố gắng gợi loại phản hồi nào từ người tham gia?
6. Hướng dẫn quan trọng nhất cho mỗi cuộc phỏng vấn là gì?
7. Tuyên bố sứ mệnh là gì?
8. Nêu hai đặc điểm của tuyên bố sứ mệnh viết tốt.
9. Đúng hay Sai: Bạn không cần tìm hiểu tổ chức để soạn tuyên bố sứ mệnh.
10. Khi nào tuyên bố sứ mệnh của bạn hoàn thành?
11. Mục tiêu sứ mệnh là gì?
12. Nêu hai đặc điểm của mục tiêu sứ mệnh viết tốt.
13. Đúng hay Sai: Bạn nên phỏng vấn người dùng và quản lý để giúp định nghĩa mục tiêu sứ mệnh.
14. Công việc hàng ngày của nhân viên liên quan mục tiêu sứ mệnh thế nào?
15. Đúng hay Sai: Một mục tiêu sứ mệnh có thể mô tả hơn một công việc.
16. Nêu hai cách suy ra mục tiêu sứ mệnh từ phản hồi.
17. Khi nào mục tiêu sứ mệnh hoàn thành?

### Đáp án

1. Cung cấp liên kết giao tiếp giữa bạn và bên liên quan, giúp đảm bảo thành công thiết kế, và cung cấp thông tin quan trọng ảnh hưởng cấu trúc cơ sở dữ liệu.
2. Mức độ e ngại của một số người tham gia tăng tỷ lệ thuận với số người tham gia.
3. Mỗi nhóm có quan điểm khác về tổ chức và cách sử dụng dữ liệu hàng ngày.
4. **Sai.** Bạn thường dùng câu hỏi **mở**.
5. **Phản hồi đầy đủ, mô tả rõ.**
6. **Luôn duy trì kiểm soát** cuộc phỏng vấn.
7. Tuyên bố sứ mệnh **khai báo mục đích cụ thể** của cơ sở dữ liệu bằng ngôn ngữ chung.
8. Bất kỳ hai trong số: không mơ hồ; ngắn gọn, đúng trọng tâm; không có cụm từ mô tả rõ công việc cụ thể.
9. **Sai.** Bạn **phải** tìm hiểu tổ chức.
10. Khi bạn có câu mô tả mục đích cụ thể và **được mọi người liên quan hiểu và đồng ý**.
11. Phát biểu đại diện **một công việc chung** được dữ liệu duy trì trong cơ sở dữ liệu hỗ trợ.
12. Bất kỳ hai trong số: câu khẳng định, mô tả rõ công việc chung, không chi tiết thừa; diễn đạt bằng ngôn ngữ chung; ngắn gọn; không mơ hồ.
13. **Đúng.**
14. Nhiều công việc họ thực hiện **sẽ trở thành mục tiêu sứ mệnh**.
15. **Sai.** Mỗi mục tiêu đại diện **một** công việc.
16. **Rõ ràng** (được nêu trong phản hồi) hoặc **ngầm** (suy ra).
17. Khi nó vừa **được định nghĩa đúng** vừa **được định nghĩa tốt**, và có ý nghĩa với bạn và người bạn thiết kế cho.

---

## Liên kết với mục tiêu học tập

Sau khi học chương này, bạn cần có khả năng:
- **Tiến hành phỏng vấn hiệu quả** bằng hướng dẫn cho người tham gia và người phỏng vấn
- **Định nghĩa tuyên bố sứ mệnh** mô tả rõ mục đích cơ sở dữ liệu
- **Định nghĩa mục tiêu sứ mệnh** đại diện công việc người dùng và hướng dẫn quy trình thiết kế

*Tiếp tục sang Chương 6: Phân tích cơ sở dữ liệu hiện tại*
