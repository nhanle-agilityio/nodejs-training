# Chương 2: Mục tiêu thiết kế — Ghi chú ngắn gọn

*Tham khảo nhanh cho việc học, ôn tập và giải thích khái niệm*

---

## Tại sao quan tâm thiết kế cơ sở dữ liệu?

- Công cụ/mẫu RDBMS **tạo bảng vật lý**, KHÔNG phải thiết kế logic
- Dùng công cụ **sau khi** có cấu trúc logic — không phải trước
- **Lý do chính:** Thiết kế = quan trọng với **tính nhất quán, toàn vẹn, độ chính xác** của dữ liệu
- Thiết kế kém → khó truy xuất, **thông tin không chính xác** (hậu quả tệ nhất, ảnh hưởng lợi nhuận)

### Ẩn dụ kiến trúc sư
Thiết kế logic = bản vẽ | Triển khai vật lý = nhà hoàn thành | Ứng dụng = nội thất

---

## Lý thuyết

- **Lý thuyết** = "Các mệnh đề chung làm nguyên tắc" (không phải phỏng đoán)
- **Lợi ích chính:** Dự đoán kết quả
- Cơ sở dữ liệu quan hệ dựa trên **lý thuyết tập hợp + logic vị từ bậc nhất** → đảm bảo độ chính xác
- Bạn **không cần biết toán** (như khí động học để lái xe)
- **Thiết kế** = sắp xếp khối xây dựng cho kết quả mong muốn

---

## Phương pháp thiết kế tốt — 5 lợi ích

1. **Cấu trúc chắc chắn** — tránh dữ liệu trùng/trùng bản/không hợp lệ/thiếu
2. **Kỹ thuật có tổ chức** — từng bước, quyết định sáng suốt
3. **Ít sai lầm** — nhận ra lỗi, sửa, tránh làm lại
4. **Thiết kế nhanh hơn** — thử và sai lãng phí thời gian
5. **Dùng RDBMS tốt hơn** — hiểu công cụ và cách triển khai

---

## Mục tiêu thiết kế tốt (5)

| # | Mục tiêu |
|---|----------|
| 1 | Hỗ trợ truy xuất theo yêu cầu + ad hoc |
| 2 | Bảng cấu trúc đúng (một chủ đề, trường phân biệt, trùng tối thiểu, ID duy nhất) |
| 3 | Tính toàn vẹn ở cấp trường, bảng, mối quan hệ |
| 4 | Hỗ trợ quy tắc nghiệp vụ |
| 5 | Dễ phát triển trong tương lai |

---

## Lợi ích thiết kế tốt (4)

- **Dễ sửa/bảo trì** — thay đổi không lan truyền xấu
- **Dễ thay đổi dữ liệu** — trùng tối thiểu = sửa một chỗ
- **Dễ truy xuất** — bảng xây dựng tốt, mối quan hệ rõ
- **Dễ phát triển ứng dụng** — ít xử lý tạm cho vấn đề thiết kế

---

## Thiết kế truyền thống: 3 giai đoạn

1. **Phân tích yêu cầu** — xem xét doanh nghiệp, phỏng vấn, đánh giá nhu cầu
2. **Mô hình hóa dữ liệu** — Sơ đồ ER (hoặc semantic-object, ORM, UML)
3. **Chuẩn hóa** — phân tách bảng, kiểm tra với dạng chuẩn (1NF→6NF, BCNF, DK/NF)

---

## Phương pháp trong sách này

- **Dùng:** Phân tích yêu cầu + sơ đồ ER đơn giản
- **Bỏ qua:** Quy trình chuẩn hóa rõ ràng, dạng chuẩn
- **Lý do:** Dạng chuẩn gây nhầm lẫn nếu không có lý thuyết chính quy
- **Cách làm:** Chuyển kết quả 3NF thành tiếng thường — "Bảng có trường ID duy nhất; mỗi trường mô tả chủ đề"
- **Bảng lý tưởng** — đặc điểm từ bảng chuẩn hóa làm hướng dẫn trong suốt
- **Quan trọng:** Tuân thủ trung thành — **không đường tắt** = kết quả chuẩn hóa đầy đủ

---

## Gợi nhớ

- **Logic trước, vật lý sau** — như kiến trúc sư trước thầu
- **Thông tin không chính xác** = hậu quả tệ nhất thiết kế kém
- **Lý thuyết** → dự đoán; **toán** → đảm bảo
- **Phương pháp** → có tổ chức, nhanh hơn, ít sai lầm
- **Không đường tắt** — phương pháp chỉ hiệu quả khi hoàn chỉnh
