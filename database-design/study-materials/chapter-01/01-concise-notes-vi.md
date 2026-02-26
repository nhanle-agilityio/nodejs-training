# Chương 1: Cơ sở dữ liệu quan hệ — Ghi chú ngắn gọn

*Tham khảo nhanh cho việc học, ôn tập và giải thích khái niệm*

---

## Cơ sở dữ liệu = Tập hợp dữ liệu có tổ chức
Mô hình hóa tổ chức hoặc quy trình. Bảng tính hay ứng dụng—nếu có tổ chức cho mục đích thì đó là cơ sở dữ liệu.

## Hai loại cơ sở dữ liệu

| Loại | Dùng cho | Dữ liệu | Ví dụ |
|------|----------|---------|-------|
| **Vận hành** | OLTP, thu thập/sửa/duy trì hàng ngày | Động, cập nhật theo thời gian thực | Bán lẻ, bệnh viện, sản xuất |
| **Phân tích** | OLAP, xu hướng, dự báo | Tĩnh, ảnh chụp tại thời điểm | Phòng lab, địa chất, phân tích tiếp thị |

→ **Sách tập trung vào vận hành** (phổ biến nhất)

---

## Cơ sở dữ liệu quan hệ (1969, Dr. Edgar F. Codd)

### Toán: Lý thuyết tập hợp + Logic vị từ bậc nhất
- "Quan hệ" = từ **relation** (lý thuyết tập hợp), KHÔNG phải "bảng liên quan"

### Cấu trúc
- **Relation** = Bảng
- **Tuple** = Bản ghi (hàng)
- **Attribute** = Trường (cột)

### Hai đặc điểm quan trọng
1. Thứ tự vật lý của hàng/cột **không quan trọng**
2. Mỗi bản ghi có **định danh duy nhất** (trường có giá trị duy nhất)
→ Dữ liệu độc lập với lưu trữ vật lý; không cần biết vị trí để truy xuất.

### Mối quan hệ
- Loại: **1:1**, **1:nhiều**, **nhiều:nhiều**
- Thiết lập qua **giá trị khớp trong trường dùng chung**
- Truy cập từ mối quan hệ trực tiếp + gián tiếp (chuỗi)

---

## SQL (Ngôn ngữ truy vấn có cấu trúc)
Chuẩn để tạo, sửa, duy trì, truy vấn.

### Truy vấn cơ bản = 3 phần
1. **SELECT...FROM** — trường nào, bảng nào
2. **WHERE** — tiêu chí lọc
3. **ORDER BY** — thứ tự sắp xếp

---

## Ưu điểm cơ sở dữ liệu quan hệ
- **Tính toàn vẹn đa cấp** (trường, bảng, mối quan hệ, nghiệp vụ)
- **Độc lập logic/vật lý** với ứng dụng
- **Dữ liệu nhất quán, chính xác**
- **Truy xuất linh hoạt** — gần như vô số cách xem

---

## RDBMS = Hệ quản trị cơ sở dữ liệu quan hệ
Phần mềm để tạo, duy trì, sửa đổi, thao tác cơ sở dữ liệu quan hệ.
Ví dụ: Oracle, SQL Server, MySQL, PostgreSQL, Access, SQLite, DB2, v.v.

---

## Nhanh gọn
- ~50 tuổi, vẫn thống trị
- Nhận thức "chậm" trước đây → do giới hạn công nghệ, không phải mô hình
- Phi quan hệ (MongoDB, Cassandra, v.v.) cho dữ liệu không vừa cấu trúc bảng
- Dự báo: >80% thị trường vận hành, ≥70% ứng dụng mới

---

## Gợi nhớ
- **OLTP** = Vận hành, **động**, sử dụng hàng ngày
- **OLAP** = Phân tích, **tĩnh**, lịch sử/xu hướng
- **Relation** = thuật ngữ toán học, không phải "bảng liên quan"
- **SQL** = SELECT (cái gì), FROM (ở đâu), WHERE (lọc), ORDER BY (sắp xếp)
