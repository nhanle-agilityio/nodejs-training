# Chương 15: Uốn cong hoặc Phá vỡ Quy tắc — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 15 thảo luận **khi nào và như thế nào** có thể chấp nhận uốn cong hoặc phá vỡ quy tắc thiết kế cơ sở dữ liệu đúng. Tuân thủ quy tắc quan trọng hàng đầu cho tính toàn vẹn dữ liệu. Chỉ **hai hoàn cảnh** biện minh cho vi phạm—và chỉ khi không thể tránh. Nếu phải phá quy tắc, **ghi tài liệu tất cả**. Thử mọi cải thiện hiệu năng khác trước; rời bỏ thiết kế chỉ như **biện pháp cuối cùng**.

---

## 1. Tuân thủ Quy tắc là Quan trọng nhất

Dùng phương pháp thiết kế tốt để đảm bảo tính toàn vẹn cơ sở dữ liệu. Hậu quả của tính toàn vẹn không đúng nghiêm trọng. Trừ khi một trong hai hoàn cảnh cụ thể là bắt buộc không thể tránh, dùng kỹ thuật thiết kế đúng.

---

## 2. Khi nào Có thể Uốn cong hoặc Phá vỡ Quy tắc?

### Hoàn cảnh 1: Thiết kế Cơ sở Dữ liệu Phân tích

**Cơ sở dữ liệu phân tích** — Lưu và theo dõi dữ liệu lịch sử, phụ thuộc thời gian. Thường chứa trường tính toán và kết quả hàm tổng hợp.

**Vi phạm:** Bảng chứa trường tính toán (thường cấm). **Chấp nhận được** vì cách dữ liệu được sử dụng.

**Khuyến nghị:** Thiết kế đúng trước; phá quy tắc chỉ sau xem xét kỹ; quyết định có chủ ý. *Lưu ý:* Cơ sở dữ liệu phân tích cần phương pháp luận khác hẳn—tìm sách chuyên sâu.

### Hoàn cảnh 2: Cải thiện Hiệu năng Xử lý

**Lý do phổ biến nhất** người ta cảm thấy buộc phải phá quy tắc. Khi RDBMS chậm với truy vấn đa bảng hoặc báo cáo phức tạp, một số sửa cấu trúc bảng (vd: thêm mọi trường cần cho báo cáo).

**Vấn đề:** Tăng tốc nhưng đưa vào trường trùng, dữ liệu dư thừa, vấn đề chỉnh sửa—đổi vấn đề hiệu năng này lấy vấn đề khác.

---

## 3. Có Đáng không?

Câu hỏi thực sự là về **tính toàn vẹn dữ liệu**, không phải hiệu năng. Phá quy tắc vì hiệu năng gây vấn đề tính toàn vẹn. Hỏi: *Lợi ích hiệu năng nhận thấy có đáng đổi lấy tính toàn vẹn suy giảm không?*

**Vấn đề khi phá quy tắc:** Dữ liệu không nhất quán; dữ liệu dư thừa; tính toàn vẹn suy giảm; thông tin sai.

---

## 4. Cải thiện Hiệu năng bằng Cách khác Trước

**Làm mọi thứ có thể trước khi phá quy tắc.** Cân nhắc trước: Phần cứng; Hệ điều hành; Cấu trúc cơ sở dữ liệu; Triển khai; Ứng dụng. **Rời thiết kế chỉ là biện pháp cuối cùng.**

---

## 5. Ghi tài liệu Hành động của Bạn

**Nếu phải phá quy tắc—ghi tài liệu tất cả.** Ghi: Lý do; Nguyên lý vi phạm; Khía cạnh sửa đổi; Sửa đổi cụ thể; Ảnh hưởng dự kiến. Thêm vào tài liệu cơ sở dữ liệu.

---

## Tóm tắt

- Hai hoàn cảnh: Cơ sở dữ liệu phân tích; Hiệu năng (cuối cùng)
- Thử phần cứng, OS, cấu trúc, triển khai, app trước
- Nếu phá quy tắc: ghi tài liệu lý do, nguyên lý, khía cạnh, sửa đổi, ảnh hưởng

---

*Tiếp tục Chương 16: Kết thúc*
