# Chương 15: Uốn cong hoặc Phá vỡ Quy tắc

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Tự nhiên không bao giờ phá vỡ quy luật của chính nó."*  
—LEONARDO DA VINCI

---

## Các chủ đề trong chương này

- Khi nào Có thể Uốn cong hoặc Phá vỡ Quy tắc?
- Ghi tài liệu Hành động của Bạn
- Tóm tắt

---

## Tuân thủ Quy tắc là Quan trọng nhất

Luôn ủng hộ theo đúng kỹ thuật thiết kế cơ sở dữ liệu. Dùng phương pháp thiết kế tốt để đảm bảo tính toàn vẹn cơ sở dữ liệu—không thể nhấn mạnh quá mức tầm quan trọng. Bạn đã biết hậu quả của việc thiết lập tính toàn vẹn không đúng, nên tuân thủ quy tắc quan trọng hàng đầu.

---

## Khi nào Có thể Uốn cong hoặc Phá vỡ Quy tắc?

Chỉ **hai hoàn cảnh cụ thể** cho phép uốn cong hoặc phá vỡ quy tắc thiết kế đúng. Trừ khi một trong hai là bắt buộc không thể tránh, hãy dùng kỹ thuật thiết kế đúng.

### Thiết kế Cơ sở Dữ liệu Phân tích

Như đã học ở Chương 1, **cơ sở dữ liệu phân tích** lưu và theo dõi dữ liệu lịch sử, phụ thuộc thời gian. Loại này thường chứa trường tính toán trong cấu trúc bảng; nhiều biểu thức ghi trạng thái dữ liệu tại thời điểm cho trước; trường khác lưu kết quả hàm tổng hợp.

Loại cơ sở dữ liệu này **vi phạm** thiết kế đúng vì bảng chứa trường tính toán. Trong trường hợp cụ thể này, vi phạm **chấp nhận được** vì cách dữ liệu được sử dụng.

**Khuyến nghị:** Thiết kế cơ sở dữ liệu đúng trước; phá quy tắc chỉ sau xem xét kỹ—đưa ra quyết định có chủ ý và hiểu tại sao cần thiết trong trường hợp cụ thể.

*Lưu ý: Thiết kế cơ sở dữ liệu phân tích đòi hỏi phương pháp luận thiết kế hoàn toàn khác với sách này. Nếu tổ chức cần cơ sở dữ liệu phân tích, nên tìm sách chuyên sâu về chủ đề.*

### Cải thiện Hiệu năng Xử lý

Đây là **lý do phổ biến nhất** người ta cảm thấy buộc phải uốn cong hoặc phá quy tắc. Khi RDBMS mất quá nhiều thời gian xử lý truy vấn đa bảng hoặc báo cáo phức tạp, nhiều người tin giải pháp là sửa cấu trúc bảng—vd: thêm mọi trường cần cho truy vấn/báo cáo. Cách này tăng tốc nhưng đưa vào trường trùng không cần thiết, dữ liệu dư thừa, vấn đề khi chỉnh sửa; về cơ bản bạn đổi vấn đề hiệu năng này lấy vấn đề khác. Rõ ràng không mong muốn vì vi phạm thiết kế đúng.

Đôi khi bạn phải chọn giữa cải thiện hiệu năng và tuân thủ nguyên lý thiết kế.

**Có đáng không?** Câu hỏi thực sự không phải về hiệu năng—mà về **tính toàn vẹn dữ liệu**. Mỗi lần phá quy tắc vì hiệu năng, bạn chắc chắn đưa vào vấn đề tính toàn vẹn. Hỏi: *Lợi ích hiệu năng nhận thấy có đáng đổi lấy tính toàn vẹn suy giảm không?*

**Vấn đề:** Dữ liệu không nhất quán (đồng bộ trường trùng); dữ liệu dư thừa (sửa mỗi instance); tính toàn vẹn suy giảm (bù đắp thủ công); thông tin không chính xác.

**Cải thiện bằng cách khác trước:** Thử phần cứng (CPU, memory, SSD, mạng); tối ưu OS; rà soát cấu trúc (thiết kế kém góp phần hiệu năng kém); rà soát triển khai RDBMS; rà soát ứng dụng (thiết kế truy vấn/báo cáo). **Phá quy tắc chỉ là biện pháp cuối cùng.**

---

## Ghi tài liệu Hành động của Bạn

Nếu đã dùng hết mọi lựa chọn khác và vẫn kết luận cần uốn cong hoặc phá quy tắc—**bạn phải ghi tài liệu mỗi quy tắc bạn phá và mỗi hành động bạn thực hiện**. Ghi tài liệu buộc bạn nghĩ về hậu quả; cung cấp cách ghi lại thay đổi. Nếu sau đó quyết định thay đổi không mang lợi đáng kể, có thể dùng tài liệu hướng dẫn đảo ngược.

**Ghi lại:**
1. Lý do phá quy tắc
2. Nguyên lý thiết kế bạn vi phạm
3. Khía cạnh cơ sở dữ liệu bạn sửa (trường, bảng, mối quan hệ, view)
4. Sửa đổi cụ thể bạn thực hiện
5. Ảnh hưởng dự kiến lên cơ sở dữ liệu và ứng dụng

Thêm vào tài liệu cơ sở dữ liệu. Dù đảo ngược sau, bản ghi có thể ngăn lặp lại cùng loại thay đổi.

---

## Tóm tắt

Chương xem xét hai hoàn cảnh có thể khiến bạn cảm thấy buộc phải rời bỏ kỹ thuật thiết kế đúng. Phá quy tắc chấp nhận được nếu thiết kế cơ sở dữ liệu phân tích; ngược lại thiết kế đúng trước rồi quyết định có chủ ý phá quy tắc cụ thể. Lý do phổ biến nhất là cải thiện hiệu năng—không phải lý do thỏa đáng nhưng đôi khi hoàn cảnh buộc phải xem xét. Thử các biện pháp khác (phần cứng, triển khai, v.v.) trước; rời thiết kế chỉ cuối cùng. Ghi tài liệu nếu phải phá quy tắc.
