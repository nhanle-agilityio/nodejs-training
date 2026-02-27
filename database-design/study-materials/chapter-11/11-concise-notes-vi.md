# Chương 11: Quy tắc nghiệp vụ — Ghi chú học tập

*Tham chiếu nhanh cho định nghĩa và thiết lập quy tắc nghiệp vụ*

---

## Định nghĩa

**Quy tắc nghiệp vụ:** Phát biểu áp đặt ràng buộc lên thành tố đặc tả trường hoặc đặc điểm mối quan hệ. Dựa trên cách tổ chức nhận thức, sử dụng, tiến hành kinh doanh với dữ liệu.

---

## Hai loại

| Loại | Thiết lập ở đâu | Ví dụ |
|------|-----------------|-------|
| **Hướng cơ sở dữ liệu** | Thiết kế logic (đặc tả trường, đặc điểm mối quan hệ) | VENDSTATE = WA, OR, ID, MT |
| **Hướng ứng dụng** | Thiết kế vật lý / ứng dụng | Khách Preferred chiết khấu 15% |

*Trọng tâm: hướng cơ sở dữ liệu.*

---

## Hai phân loại (Hướng cơ sở dữ liệu)

| Phân loại | Ảnh hưởng | Ví dụ |
|-----------|-----------|-------|
| **Trường cụ thể** | Thành tố đặc tả trường | Range of Values, Required Value, Data Type |
| **Mối quan hệ cụ thể** | Đặc điểm mối quan hệ | Mức độ, Loại tham gia, Quy tắc xóa |

---

## Sáu bước — Trường cụ thể

1. Chọn bảng
2. Rà soát mỗi trường → cần ràng buộc?
3. Định nghĩa quy tắc
4. Sửa thành tố đặc tả trường
5. Xác định hành động kiểm tra (insert/delete/update)
6. Ghi trên Tờ Đặc tả Quy tắc nghiệp vụ

---

## Sáu bước — Mối quan hệ cụ thể

1. Chọn mối quan hệ
2. Rà soát → cần ràng buộc?
3. Định nghĩa quy tắc
4. Sửa đặc điểm mối quan hệ
5. Xác định hành động; nếu xóa vi phạm → **Restrict cho bảng con**
6. Ghi trên Tờ Đặc tả

---

## Tờ Đặc tả Quy tắc nghiệp vụ

Statement | Constraint | Type | Category | Test On | Structures Affected | Action Taken

---

## Bảng xác thực

- **Mục đích:** Thi hành quy tắc giới hạn phạm vi giá trị (tập cố định)
- **Cấu trúc:** Thường 2 trường — PK + trường giá trị không khóa
- **Quy trình:** Tạo bảng → mối quan hệ 1:N → Thay trường bằng FK → Range of Values = giá trị trong bảng xác thực
- **Mối quan hệ:** Restrict xóa; Mandatory cho xác thực; Optional cho cha (thường)

---

## Checklist

1. Quy tắc trường cụ thể đã định nghĩa và thiết lập
2. Quy tắc mối quan hệ cụ thể đã định nghĩa và thiết lập
3. Bảng xác thực đã tạo khi phù hợp
4. Tờ Đặc tả Quy tắc hoàn thành
5. Tất cả tờ đã rà soát

---

## Mẹo ghi nhớ

| Khái niệm | Điểm chính |
|-----------|------------|
| **Database vs Application** | Database = thiết kế logic; Application = vật lý/app |
| **Trường vs Mối quan hệ** | Trường = thành tố spec; Mối quan hệ = đặc điểm |
| **Bảng xác thực** | Tập giá trị cố định → bảng xác thực + FK |
| **Restrict con** | Khi xóa con vi phạm quy tắc bắt buộc |
