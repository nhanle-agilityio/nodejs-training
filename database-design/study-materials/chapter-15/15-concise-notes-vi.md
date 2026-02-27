# Chương 15: Uốn cong hoặc Phá vỡ Quy tắc — Ghi chú học tập

*Khi vi phạm có thể chấp nhận*

---

## Quy tắc: Tuân thủ Thiết kế Đúng Trước

Chỉ **hai hoàn cảnh** biện minh uốn cong/phá vỡ quy tắc. Ngược lại: dùng kỹ thuật đúng.

---

## Hai Hoàn cảnh Chấp nhận được

### 1. Cơ sở Dữ liệu Phân tích

- Dữ liệu lịch sử, phụ thuộc thời gian
- Thường chứa trường tính toán, tổng hợp
- Vi phạm **chấp nhận được** do use case
- **Hành động:** Thiết kế đúng trước; phá chỉ sau xem xét kỹ
- **Lưu ý:** Cần phương pháp luận khác—tìm sách chuyên sâu

### 2. Hiệu năng Xử lý

- **Chỉ biện pháp cuối cùng**
- Cám dỗ phổ biến: thêm trường cho tốc độ báo cáo
- **Vấn đề:** Trường trùng, dư thừa, vấn đề chỉnh sửa
- **Câu hỏi:** Lợi ích hiệu năng có đáng đổi tính toàn vẹn không?

---

## Thử Trước khi Phá

| Thử trước | Trước khi sửa thiết kế |
|-----------|------------------------|
| Phần cứng | CPU, memory, SSD, mạng |
| OS | Tối ưu cấu hình |
| Cấu trúc | Đảm bảo thiết kế đúng |
| Triển khai | Khả năng RDBMS, hiệu quả |
| Ứng dụng | Viết tốt? Truy vấn/báo cáo hiệu quả? |

---

## Vấn đề từ Phá Quy tắc

- Dữ liệu không nhất quán (đồng bộ trường trùng)
- Dữ liệu dư thừa (sửa mỗi instance)
- Tính toàn vẹn suy giảm (bù đắp thủ công)
- Thông tin sai

---

## Ghi tài liệu nếu Phá

1. Lý do
2. Nguyên lý thiết kế vi phạm
3. Khía cạnh sửa (trường, bảng, mối quan hệ, view)
4. Sửa đổi cụ thể
5. Ảnh hưởng dự kiến

Thêm vào tài liệu. Ngăn lặp lại sai lầm dù đảo ngược.
