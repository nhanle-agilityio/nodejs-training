# Chương 3: Thuật ngữ — Ghi chú ngắn gọn

*Tham khảo nhanh cho việc học, ôn tập và giải thích khái niệm*

---

## Liên quan giá trị

| Thuật ngữ | Định nghĩa |
|-----------|------------|
| **Dữ liệu** | Giá trị bạn lưu. Tĩnh. Vô nghĩa khi đơn lẻ. |
| **Thông tin** | Dữ liệu xử lý thành có ý nghĩa. Động. Vô số dạng trình bày. |
| **Tiên đề** | **Dữ liệu = lưu; Thông tin = truy xuất** |

### Null
- **Đại diện:** Giá trị thiếu hoặc không biết
- **KHÔNG PHẢI:** Số không, khoảng trắng, hoặc (luôn) chuỗi rỗng
- **Dùng khi:** Thiếu, chưa định nghĩa, không biết, không áp dụng
- **Vấn đề:** Phép toán → Null; tổng hợp bị ảnh hưởng → kết quả không chính xác
- **Tránh Null** trong trường tính toán và đầu vào tổng hợp

---

## Liên quan cấu trúc

| Thuật ngữ | Định nghĩa |
|-----------|------------|
| **Bảng** | Lưu dữ liệu. Một chủ đề. Cần khóa chính. Thứ tự không quan trọng. |
| **Trường** | Cấu trúc nhỏ nhất. Một giá trị. Mô tả chủ đề. Lưu dữ liệu. |
| **Bản ghi** | Thể hiện duy nhất của chủ đề. Tất cả trường như đơn vị. Xác định bằng PK. |
| **Khung nhìn** | Bảng ảo từ bảng cơ sở. Chỉ lưu cấu trúc. |

### Loại bảng
- **Dữ liệu** — Động, phổ biến, cho thông tin
- **Xác thực** — Tĩnh, cho tính toàn vẹn, tra cứu
- **Liên kết** — Giải quyết M:N, có PK tổ hợp (cả hai FK)

### Trường xấu
- Đa phần (2+ mục riêng biệt)
- Đa giá trị (nhiều cùng loại)
- Tính toán (phái sinh; tính khi truy xuất)

### Khóa
| Khóa | Vai trò |
|------|---------|
| **Chính** | Xác định duy nhất bản ghi; thực thi tính toàn vẹn bảng; thiết lập mối quan hệ |
| **Ngoại** | Bản sao PK cha trong con; liên kết bảng; đảm bảo tính toàn vẹn mối quan hệ |

### Khóa vs. Chỉ mục
- **Khóa** = Logic (định danh, liên kết)
- **Chỉ mục** = Vật lý (tối ưu xử lý)

---

## Liên quan mối quan hệ

### Các loại
| Loại | Cấu trúc | Ví dụ |
|------|----------|-------|
| **1:1** | Sao PK sang con; cả hai có thể dùng chung PK | EMPLOYEES ↔ COMPENSATION |
| **1:N** | Sao PK sang con (phía nhiều) | AGENTS ↔ ENTERTAINERS |
| **M:N** | Bảng liên kết với cả hai PK làm PK tổ hợp + FK | STUDENTS ↔ CLASSES qua STUDENT_CLASSES |

### Tham gia
- **Bắt buộc** — Phải có bản ghi cha trước con
- **Tùy chọn** — Không yêu cầu

### Mức độ
- **(min, max)** — vd: 1,8 = 1–8 bản ghi liên quan

---

## Liên quan tính toàn vẹn

### Đặc tả trường
Ba loại phần tử: **Chung** (tên, mô tả), **Vật lý** (kiểu, độ dài), **Logic** (bắt buộc, khoảng, hỗ trợ Null)

### Tính toàn vẹn dữ liệu (4 loại)
1. **Cấp bảng** — Không trùng, PK duy nhất, không bao giờ Null
2. **Cấp trường** — Cấu trúc chắc chắn, giá trị hợp lệ, định nghĩa nhất quán
3. **Cấp mối quan hệ** — Liên kết hợp lệ, đồng bộ, không mồ côi
4. **Quy tắc nghiệp vụ** — Ràng buộc đặc thù tổ chức

---

## Gợi nhớ
- Dữ liệu **lưu** → Thông tin **truy xuất**
- Null = thiếu/không biết; zero ≠ Null
- Khóa = logic | Chỉ mục = vật lý
- 1:1, 1:N (phổ biến nhất), M:N (cần bảng liên kết)
- Tham gia: bắt buộc vs. tùy chọn
- Mức độ: (min, max)
