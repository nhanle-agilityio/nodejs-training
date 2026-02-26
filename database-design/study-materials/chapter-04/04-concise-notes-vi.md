# Chương 4: Tổng quan khái niệm — Ghi chú ngắn gọn

*Tham khảo nhanh cho việc học, ôn tập và giải thích khái niệm*

---

## Quy tắc vàng
**Hoàn thành toàn bộ quy trình thiết kế** — không đi tắt. CSDL "đơn giản"? Vẫn có. Loại/kích thước/mục đích không liên quan.

- Mức toàn vẹn ∝ mức độ tuân theo quy trình  
- Một phần = gần như tệ như không có  
- *"Không bao giờ có thời gian làm đúng, nhưng luôn có thời gian làm lại!"*

---

## 7 giai đoạn (Thứ tự quan trọng!)

| # | Giai đoạn | Ai | Kết quả chính |
|---|-----------|-----|---------------|
| 1 | **Sứ mệnh** | Dev + Chủ + Quản lý (tuyên bố); Dev + Quản lý + Người dùng (mục tiêu) | Mục đích + công việc người dùng |
| 2 | **Phân tích** | Dev + Người dùng + Quản lý | Danh sách trường (yêu cầu dữ liệu cơ bản) |
| 3 | **Cấu trúc dữ liệu** | Dev | Bảng, trường, khóa, đặc tả trường |
| 4 | **Mối quan hệ** | Dev + Người dùng + Quản lý | PK/FK hoặc bảng liên kết; tham gia |
| 5 | **Quy tắc nghiệp vụ** | Dev + Người dùng + Quản lý | Ràng buộc; bảng xác thực |
| 6 | **Khung nhìn** | Dev + Người dùng + Quản lý | Khung nhìn với bảng, trường, tiêu chí |
| 7 | **Rà soát toàn vẹn** | Dev | Kiểm tra bảng, trường, mối quan hệ, quy tắc nghiệp vụ |

---

## Giai đoạn 1: Sứ mệnh
- **Tuyên bố sứ mệnh** = Mục đích CSDL (Dev, Chủ, Quản lý)
- **Mục tiêu sứ mệnh** = Công việc người dùng thực hiện (Dev, Quản lý, Người dùng)

## Giai đoạn 2: Phân tích
- CSDL hiện tại: kế thừa hoặc trên giấy
- Rà soát: thu thập, trình bày, ứng dụng web
- **Phỏng vấn** → Người dùng (sử dụng hàng ngày, nhu cầu thông tin); Quản lý (yêu cầu tổng thể)
- Đầu ra: Danh sách trường ban đầu → loại trường tính toán → tinh chỉnh → rà soát với bên liên quan

## Giai đoạn 3: Cấu trúc dữ liệu
- Bảng từ mục tiêu sứ mệnh + danh sách trường
- Tinh chỉnh đa phần/đa giá trị → một giá trị
- Khóa chính cho mỗi bảng
- Đặc tả trường (phỏng vấn về đặc điểm)

## Giai đoạn 4: Mối quan hệ
- Xác định quan hệ (người dùng giúp!)
- PK/FK (1:1, 1:N) hoặc bảng liên kết (M:N)
- Loại tham gia + mức độ

## Giai đoạn 5: Quy tắc nghiệp vụ
- Ràng buộc từ cách tổ chức xem/dùng dữ liệu
- Người dùng: cụ thể (vd: ngày giao > ngày đặt)
- Quản lý: chung (vd: tối đa 20 mỗi đại lý)
- Bảng xác thực cho trường có giá trị hữu hạn

## Giai đoạn 6: Khung nhìn
- Người dùng cần chi tiết vs. tổng hợp
- Định nghĩa với bảng, trường, tiêu chí

## Giai đoạn 7: Rà soát toàn vẹn
1. Cấp bảng
2. Cấp trường
3. Cấp mối quan hệ
4. Quy tắc nghiệp vụ

→ **Sẵn sàng triển khai RDBMS** (không bao giờ thực sự "xong")

---

## Gợi nhớ
- **7 giai đoạn, 1→7** — Đừng bỏ qua
- **Phỏng vấn** ở giai đoạn 1, 2, 4, 5, 6
- **Sứ mệnh** = tại sao; **Mục tiêu** = người dùng làm gì
- **Danh sách trường** = nền tảng cho bảng
