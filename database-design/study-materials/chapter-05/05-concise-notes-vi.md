# Chương 5: Bắt đầu quy trình — Ghi chú học tập (Mở rộng)

*Ghi chú chi tiết cho việc học, ôn tập và giải thích khái niệm Giai đoạn 1*

---

## Chương này trình bày gì

Chương 5 nói về **Giai đoạn 1** của quy trình thiết kế: định nghĩa **tuyên bố sứ mệnh** (tại sao cơ sở dữ liệu tồn tại) và **mục tiêu sứ mệnh** (công việc nào nó hỗ trợ). Bạn định nghĩa kết quả cuối cùng trước — điều này cho bạn trọng tâm và hướng đi cho toàn bộ thiết kế. Phỏng vấn là công cụ chính để thu thập thông tin này.

---

## Vai trò của phỏng vấn

### Tại sao phỏng vấn quan trọng

Phỏng vấn cung cấp ba điều bạn không thể có từ nơi khác:
1. **Liên kết giao tiếp** — Trao đổi trực tiếp với người sẽ sử dụng hoặc sở hữu cơ sở dữ liệu
2. **Thành công thiết kế** — Phản hồi của họ trực tiếp ảnh hưởng việc thiết kế có đáp ứng nhu cầu thực tế không
3. **Chi tiết quan trọng** — vd, tham gia mối quan hệ (bắt buộc/tùy chọn, min/max bản ghi) thường cần hỏi người dùng hoặc quản lý

**Quan trọng:** Không bao giờ bỏ qua phỏng vấn. Thiếu một = thiếu thông tin có thể gây hại cấu trúc cuối cùng. Với dự án cá nhân hoặc nhỏ, tiến hành "tự phỏng vấn" (bạn vừa là người hỏi vừa là người trả lời).

### Hướng dẫn cho người tham gia (Thiết lập kỳ vọng)

Trước khi phỏng vấn, thiết lập kỳ vọng cho người tham gia:
- **Làm rõ ý định** — Cho biết chủ đề, ai tham gia, thời gian bắt đầu, có phải phần của chuỗi không. Trấn an rằng không phải đánh giá hiệu suất. Điều này xây dựng tin cậy.
- **Bày tỏ đánh giá** — Đóng góp của họ thường bị bỏ qua ở dự án khác. Ghi nhận giá trị thúc đẩy họ. Trong phỏng vấn tiếp theo, cho thấy bạn đã dùng phản hồi trước đó — rất hiệu quả.
- **Bạn là trọng tài** — Tranh chấp sẽ nảy sinh. Là nhà phát triển, bạn quyết định cuối cùng về vấn đề cơ sở dữ liệu. Chuyển tranh chấp không liên quan cho cấp có thẩm quyền.

### Hướng dẫn cho người phỏng vấn (Trách nhiệm của bạn)

| Hướng dẫn | Ý nghĩa |
|-----------|---------|
| **Giới hạn người tham gia** | Nhóm lớn tăng mức độ e ngại (mọi người sợ trông ngớ ngẩn trước đồng nghiệp). Nhóm nhỏ = thoải mái hơn, tham gia tốt hơn. |
| **Phỏng vấn riêng người dùng và quản lý** | Mỗi nhóm có quan điểm khác về tổ chức và cách dùng dữ liệu. Tách riêng cho phép tận dụng cả hai. Cũng tránh xung đột khi họ bất đồng. |
| **Chuẩn bị câu hỏi** | Đừng ứng biến. Câu hỏi chuẩn bị cho trọng tâm, hướng đi và tính liên tục. |
| **Dùng câu hỏi mở** | "Bạn cảm thấy thế nào về dịch vụ của chúng ta?" (mở) vs. "Dịch vụ tệ, trung bình hay tốt?" (đóng). Câu mở gợi câu trả lời phong phú hơn. Dùng câu đóng ít. |
| **Xử lý ghi chép** | Phân công người ghi chép, ghi âm (có sự đồng ý), hoặc nhờ một người tham gia. Bạn cần hồ sơ chi tiết. |
| **Chú ý bình đẳng** | Buồn chán hoặc phân tâm giảm tham gia. Quan tâm chân thành khuyến khích. |
| **Duy trì kiểm soát** | **Hướng dẫn quan trọng nhất.** Mất kiểm soát → mọi thứ đi sai. Chuyển hướng thảo luận lạc đề. Nếu ai đó chiếm lĩnh, lịch sự giải thích bạn cần phản hồi từ mọi người. |

---

## Tuyên bố sứ mệnh

### Định nghĩa

Tuyên bố sứ mệnh **khai báo mục đích cụ thể** của cơ sở dữ liệu bằng ngôn ngữ chung. Nó trả lời: *Cơ sở dữ liệu này tồn tại để làm gì?*

### Đặc điểm Tuyên bố sứ mệnh tốt

- **Không mơ hồ** — Không chỗ cho hiểu sai
- **Ngắn gọn** — Tuyên bố dài che mờ mục đích
- **Không có công việc cụ thể** — Giữ mô tả công việc cho mục tiêu sứ mệnh

**Ẩn dụ:** Giống ngọn nến cuối đường hầm — dẫn bạn qua quy trình thiết kế.

### Soạn Tuyên bố sứ mệnh

1. **Phỏng vấn** chủ sở hữu hoặc quản lý (hoặc nhân viên được chỉ định)
2. **Tìm hiểu tổ chức** — Khuyến khích thảo luận rộng. Hiểu càng nhiều, thiết kế càng tốt.
3. **Chuyển nhu cầu thành một câu** — Dùng câu hỏi mở như: "Trọng tâm chính của tổ chức là gì?" hoặc "Bạn mô tả mục đích tổ chức với khách hàng mới thế nào?"

**Hoàn thành khi:** Câu mô tả mục đích cụ thể và **được mọi người liên quan hiểu và đồng ý**. Bạn phải tìm hiểu tổ chức — không thể soạn tuyên bố sứ mệnh tốt nếu thiếu hiểu biết đó.

### Ví dụ: Kém vs. Tốt

**Kém:** "Mục đích cơ sở dữ liệu là theo dõi đơn, người nộp, phiên điều trần, quyết định, kháng cáo, nhân viên và dữ liệu văn phòng." (Liệt kê công việc; mục đích không rõ)

**Tốt:** "Mục đích cơ sở dữ liệu là duy trì dữ liệu văn phòng dùng để ra quyết định về yêu cầu sử dụng đất." (Mục đích rõ; ngắn gọn)

---

## Mục tiêu sứ mệnh

### Định nghĩa

Mục tiêu sứ mệnh là **các phát biểu đại diện công việc chung** được dữ liệu trong cơ sở dữ liệu hỗ trợ. Mỗi mục tiêu = **một công việc**. Chúng trả lời: *Người dùng sẽ làm gì với dữ liệu này?*

### Đặc điểm Mục tiêu sứ mệnh tốt

- **Câu khẳng định** — Mô tả rõ công việc chung
- **Không chi tiết thừa** — Giữ ở mức cao
- **Ngôn ngữ chung** — Ngắn gọn, không mơ hồ
- **Một công việc mỗi mục tiêu** — Nếu thấy hai công việc, tách thành hai mục tiêu

### Soạn Mục tiêu sứ mệnh

1. **Phỏng vấn** người dùng và quản lý (riêng)
2. **Tập trung thảo luận chung** — Khái niệm, không phân tích. Bạn không phân tích CSDL hiện tại; bạn đang tìm hiểu công việc CSDL cần hỗ trợ.
3. **Hỏi câu mở** — vd, "Công việc hàng ngày của bạn là gì?" "Bạn theo dõi những gì?" "Bạn tạo loại báo cáo nào?"
4. **Ghi phản hồi dưới dạng câu khẳng định** — Dễ chuyển thành mục tiêu sứ mệnh
5. **Tìm thông tin ngầm** — "Đọc giữa các dòng." Không phải mọi thứ được nêu trực tiếp. Phản hồi về đặt dịch vụ cho khách có thể ngụ ý: cần thông tin nghệ sĩ, cần chi tiết buổi biểu diễn.

### Suy ra Mục tiêu

Mục tiêu có thể suy ra **rõ ràng** (chủ đề được nêu trong phản hồi) hoặc **ngầm** (suy ra). Chú ý cả hai.

**Hoàn thành khi:** Mỗi mục tiêu được định nghĩa đúng, định nghĩa tốt và có ý nghĩa với bạn và bên liên quan.

### Ví dụ: Kém vs. Tốt

**Kém:** "Chúng ta cần theo dõi nghệ sĩ, loại hình giải trí họ cung cấp và các buổi biểu diễn chúng ta đặt." (Hai công việc + chi tiết thừa)

**Tốt:** "Duy trì thông tin nghệ sĩ đầy đủ." / "Theo dõi tất cả các buổi biểu diễn chúng ta đặt." (Hai mục tiêu; mỗi cái một công việc; rõ ràng)

---

## Cách Tuyên bố sứ mệnh và Mục tiêu liên kết

- **Tuyên bố sứ mệnh** = "Tại sao" — mục đích cơ sở dữ liệu
- **Mục tiêu sứ mệnh** = "Cái gì" — công việc người dùng thực hiện với dữ liệu
- Công việc hàng ngày của nhân viên thường **trở thành** mục tiêu sứ mệnh
- Cả hai hướng dẫn cấu trúc bảng, trường, mối quan hệ, khung nhìn, tính toàn vẹn và quy tắc nghiệp vụ

---

## Gợi nhớ

| Khái niệm | Điểm chính |
|-----------|------------|
| **Phỏng vấn** | Không bỏ qua. Cung cấp thông tin quan trọng; duy trì kiểm soát. |
| **Mở vs. đóng** | Mở = phản hồi phong phú; đóng = giới hạn. Ưu tiên mở. |
| **Tách nhóm** | Người dùng và quản lý có quan điểm khác. |
| **Tuyên bố sứ mệnh** | Một câu: mục đích. Không công việc. Phải tìm hiểu tổ chức trước. |
| **Mục tiêu sứ mệnh** | Một công việc mỗi mục tiêu. Tìm ngầm + rõ ràng. |
| **Hoàn thành khi** | Tuyên bố: mọi người đồng ý. Mục tiêu: định nghĩa đúng + tốt. |

---

## Tham khảo nhanh: Câu hỏi mẫu

**Cho tuyên bố sứ mệnh:** "Chức năng quan trọng nhất của tổ chức là gì?" / "Bạn mô tả mục đích tổ chức với khách hàng mới thế nào?"

**Cho mục tiêu sứ mệnh:** "Công việc hàng ngày của bạn là gì?" / "Bạn theo dõi những gì?" / "Bạn tạo loại báo cáo nào?"
