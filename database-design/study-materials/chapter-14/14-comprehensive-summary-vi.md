# Chương 14: Thiết kế Sai—Những điều Không nên làm — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 14 (Phần III: Các vấn đề Thiết kế Cơ sở Dữ liệu khác) trình bày **ba cách tiếp cận thiết kế phổ biến dẫn đến cơ sở dữ liệu cấu trúc kém**. Giờ bạn đã biết thiết kế đúng, có thể nhận ra nguy hiểm và xác định vấn đề cùng giải pháp. Chương ở cuối sách để bạn nhận ra thiết kế sai sau khi học thiết kế đúng. **Cách sửa:** Đưa cơ sở dữ liệu thiết kế sai qua quy trình thiết kế hoàn chỉnh.

---

## 1. Thiết kế "Flat-File"

*Còn gọi "ném-tất-cả-vào-một-bảng-lớn".* Phổ biến trong hệ thống không quan hệ.

**Vấn đề:**
- **Trường đa phần** — SALES REP NAME (tên + họ), CUSTOMER ADDRESS (đường, thành phố, bang, ZIP)
- **Trường tính toán** — ORDER AMOUNT, ITEM # EXTENSION
- **Trường trùng không cần thiết** — ITEM 1, 2, 3; QUANTITY 1/2/3; PRICE 1/2/3
- **Không có khóa chính thực** — ORDER NUMBER có thể lặp nếu khách đặt hơn ba mặt hàng
- **Bảng đại diện nhiều chủ đề** — Khách hàng, đơn hàng, mặt hàng

**Tránh hoàn toàn.**

---

## 2. Thiết kế Kiểu Bảng tính

Bảng tính tốt cho tính toán và phân tích thống kê—**không** cho cơ sở dữ liệu quan hệ.

**Vấn đề:**
- **Trường trùng**
- **Trường đa phần**
- **Trường đa trị**
- **Khó sử dụng** — Tác vụ dữ liệu dễ trong RDBMS lại tẻ nhạt trong bảng tính

**Giải pháp:** Tách dữ liệu khỏi bảng tính; đưa qua quy trình thiết kế cơ sở dữ liệu đầy đủ; triển khai trong RDBMS phù hợp.

### Đối phó Tư duy Bảng tính

Khi chuyển sang cơ sở dữ liệu thực: Phá bỏ tư duy bảng tính; một số layout báo cáo bảng tính không có trong cơ sở dữ liệu; cơ sở dữ liệu lưu dữ liệu chuẩn hóa; báo cáo hiển thị khác nhưng rõ như nhau. **Lợi thế cơ sở dữ liệu:** Tài nguyên chia sẻ; mọi người truy cập cùng dữ liệu; không cần "bản master" + bản sao; tính toàn vẹn tốt hơn; linh hoạt truy xuất.

---

## 3. Thiết kế Dựa trên Phần mềm Cơ sở Dữ liệu

**RDBMS cung cấp công cụ triển khai—không phải quy trình hay lý luận thiết kế.** Phương pháp thiết kế chính thức cung cấp nguyên lý và lý luận.

**Bẫy khi thiết kế quanh RDBMS:**
- Nhận thức sai giới hạn RDBMS
- RDBMS chi phối thiết kế thay vì yêu cầu thông tin
- Giới hạn bởi kiến thức
- Giới hạn bởi kỹ năng

**Kết quả:** Cấu trúc sai; tính toàn vẹn không đủ; dữ liệu không nhất quán. Cơ sở dữ liệu có thể "chạy" nhưng thiết kế kém.

**Thực hành tốt:** Thiết kế **cấu trúc logic không quan tâm RDBMS nào**. Tập trung vào yêu cầu thông tin. Sau khi thiết kế xong, quyết định triển khai và chọn RDBMS.

---

## 4. Suy nghĩ Cuối cùng

Người hiểu nguyên lý thiết kế cơ sở dữ liệu **hiểu RDBMS** và công cụ của nó tốt hơn người không biết. Học thiết kế cơ sở dữ liệu đúng vì lý do này—và nhiều lý do khác trong sách.

---

## Tóm tắt

| Cách sai | Vấn đề cốt lõi | Cách sửa |
|----------|----------------|----------|
| **Flat-file** | Tất cả một bảng; multipart, calculated, duplicate; không PK | Qua quy trình thiết kế đầy đủ |
| **Bảng tính** | Sai công cụ; trùng/đa phần/đa trị | Thiết kế đúng; triển khai RDBMS |
| **RDBMS-driven** | Phần mềm chi phối thiết kế | Thiết kế logic trước; chọn RDBMS sau |

---

*Tiếp tục Chương 15: Uốn cong hoặc Phá vỡ Quy tắc*
