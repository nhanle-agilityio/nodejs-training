# Chương 14: Thiết kế Sai—Những điều Không nên làm — Ghi chú học tập

*Thiết kế cần tránh*

---

## Ba cách tiếp cận sai

### 1. Flat-File ("Một bảng lớn")

- Trường đa phần
- Trường tính toán
- Trường trùng không cần thiết
- Không có khóa chính thực
- Nhiều chủ đề trong một bảng
- **Tránh hoàn toàn**

### 2. Thiết kế Kiểu Bảng tính

- Bảng tính ≠ cơ sở dữ liệu quan hệ
- Trường trùng, đa phần, đa trị
- Tẻ nhạt cho tác vụ dữ liệu
- **Giải pháp:** Quy trình thiết kế đầy đủ → RDBMS

### 3. Thiết kế Dựa RDBMS

- Thiết kế quanh khả năng phần mềm, không phải yêu cầu
- RDBMS cung cấp công cụ triển khai—không phải nguyên lý thiết kế
- Giới hạn bởi kiến thức và kỹ năng
- **Giải pháp:** Thiết kế cấu trúc logic trước; bỏ qua RDBMS; chọn RDBMS sau

---

## Tư duy Bảng tính vs Cơ sở Dữ liệu

| Bảng tính | Cơ sở dữ liệu |
|-----------|---------------|
| Bản master + bản sao | Tài nguyên chia sẻ; cùng dữ liệu |
| Layout = lưu trữ | Lưu trữ chuẩn hóa; trình bày linh hoạt |
| Tính toàn vẹn hạn chế | Tính toàn vẹn tốt hơn |

---

## Nguyên lý chính

**Thiết kế cấu trúc logic không quan tâm RDBMS nào.** Tập trung vào yêu cầu thông tin. Triển khai và chọn RDBMS sau khi thiết kế xong.

---

## Suy nghĩ cuối

Biết thiết kế cơ sở dữ liệu → hiểu RDBMS và sử dụng công cụ tốt hơn. Nguyên lý thiết kế giải thích *tại sao* RDBMS cung cấp công cụ nhất định.
