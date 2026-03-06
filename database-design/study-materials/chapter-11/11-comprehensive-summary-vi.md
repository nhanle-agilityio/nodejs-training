# Chương 11: Quy tắc nghiệp vụ — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 11 trình bày **định nghĩa và thiết lập quy tắc nghiệp vụ (business rules)**—thành phần cuối cùng của tính toàn vẹn dữ liệu tổng thể. Quy tắc nghiệp vụ áp đặt ràng buộc lên trường hoặc mối quan hệ dựa trên cách tổ chức nhận thức và sử dụng dữ liệu. Hai loại chính: **hướng cơ sở dữ liệu** (thiết lập trong thiết kế logic) và **hướng ứng dụng** (thiết lập trong thiết kế vật lý hoặc ứng dụng). Quy tắc hướng cơ sở dữ liệu chia thành **trường cụ thể** và **mối quan hệ cụ thể**. **Bảng xác thực (validation tables)** thi hành quy tắc giới hạn phạm vi giá trị của trường.

---

## 1. Quy tắc nghiệp vụ là gì?

**Quy tắc nghiệp vụ** là phát biểu áp đặt ràng buộc lên một khía cạnh cụ thể của cơ sở dữ liệu, chẳng hạn các thành tố đặc tả trường hoặc đặc điểm mối quan hệ. Quy tắc dựa trên cách tổ chức nhận thức, sử dụng và tiến hành kinh doanh với dữ liệu.

**Mục đích:**
- Hướng dẫn lựa chọn (dữ liệu nào lưu, cách định nghĩa mối quan hệ)
- Ảnh hưởng thu thập dữ liệu, thiết lập mối quan hệ, cung cấp thông tin, bảo mật/bảo mật
- Làm cho giá trị trường có ý nghĩa theo ngữ cảnh (vd: SHIP DATE không thể trước ORDER DATE)

**Điểm quan trọng:** Tạo bộ quy tắc chung cho nhiều tổ chức gần như không thể—mỗi tổ chức cần bộ riêng. Cùng một quy tắc có thể áp dụng cho các tổ chức khác nhau vì lý do khác nhau (vd: "tối đa 2 nhạc cụ mỗi sinh viên" ở hai trường: một cho tập trung, một cho giới hạn kho).

**Ràng buộc ngoài thiết kế logic:** Một số quy tắc (vd: "CHECK-IN DATE phải được kiểm tra trước khi cho mượn thêm") không thể thiết lập trong thiết kế logic; phải triển khai trong thiết kế vật lý hoặc ứng dụng.

---

## 2. Các loại Quy tắc nghiệp vụ

### Hướng cơ sở dữ liệu (Database-Oriented)

- Áp đặt ràng buộc **trong thiết kế logic**
- Triển khai bằng cách sửa **các thành tố đặc tả trường**, **đặc điểm mối quan hệ** hoặc cả hai
- Ví dụ: VENDSTATE giới hạn WA, OR, ID, MT cho nhà cung cấp Tây Bắc Thái Bình Dương

### Hướng ứng dụng (Application-Oriented)

- Không thể thiết lập trong thiết kế logic
- Phải thiết lập trong **thiết kế vật lý** hoặc **ứng dụng cơ sở dữ liệu**
- Ví dụ: Khách hàng "Preferred" nhận chiết khấu 15% (tính toán + tiêu chí)
- Triển khai: Công cụ RDBMS hoặc mã chương trình (ngoài phạm vi sách)

*Trọng tâm chương: quy tắc hướng cơ sở dữ liệu ("quy tắc nghiệp vụ" từ đây).*

---

## 3. Phân loại Quy tắc nghiệp vụ

### Trường cụ thể (Field-Specific)

Ràng buộc **các thành tố của đặc tả trường**. Có thể ảnh hưởng một hoặc nhiều thành tố.

**Ví dụ:**
- *Ngày đơn hàng không thể trước 16/5/2018* → Range of Values (ORDER DATE)
- *Phải lưu mã bưu điện Canada* → Data Type, Length, Character Support (CUSTZIPCODE)

### Mối quan hệ cụ thể (Relationship-Specific)

Ràng buộc **đặc điểm mối quan hệ** (quy tắc xóa, loại tham gia, mức độ tham gia).

**Ví dụ:** *Mỗi lớp phải có 5–20 sinh viên* → mức độ tham gia (5,20) cho CLASSES ↔ STUDENT CLASSES; có thể hàm ý Mandatory cho STUDENT CLASSES.

---

## 4. Định nghĩa và Thiết lập Quy tắc nghiệp vụ

**Thứ tự:** Trường cụ thể trước, sau đó mối quan hệ cụ thể (tránh nhầm lẫn).

**Làm việc với người dùng và quản lý:** Lên lịch họp; định nghĩa quy tắc theo nhóm để ràng buộc có ý nghĩa và rõ ràng.

---

## 5. Quy tắc Trường cụ thể — Sáu bước

1. **Chọn bảng** — Bất kỳ bảng nào; xem xét chủ đề, cách dùng, mối quan hệ.
2. **Rà soát mỗi trường** — Hỏi: *Có cần ràng buộc cho thành tố nào trong đặc tả này không?*
3. **Định nghĩa quy tắc** — Chuyển ràng buộc thành phát biểu rõ ràng.
4. **Thiết lập** — Sửa các thành tố đặc tả trường phù hợp (Required Value, Null Support, Edit Rule, Range of Values, v.v.).
5. **Xác định hành động kiểm tra quy tắc** — Insert? Delete? Update? Bản ghi hay giá trị trường?
6. **Ghi lại trên Tờ Đặc tả Quy tắc nghiệp vụ** — Lập tài liệu cho quy tắc.

**Hành động kiểm tra quy tắc:** Chèn xóa cập nhật bản ghi/giá trị trường.

---

## 6. Quy tắc Mối quan hệ cụ thể — Sáu bước

1. **Chọn mối quan hệ** — Xem sơ đồ; xem xét bảng cung cấp gì và tại sao liên quan.
2. **Rà soát mối quan hệ** — Hỏi: *Có cần áp đặt giới hạn dựa trên cách tổ chức tiến hành kinh doanh không?*
3. **Định nghĩa quy tắc** — Chuyển ràng buộc thành phát biểu.
4. **Thiết lập** — Sửa đặc điểm mối quan hệ (mức độ, loại tham gia, quy tắc xóa).
5. **Xác định hành động kiểm tra** — Nếu vi phạm khi xóa → có thể cần **Quy tắc xóa Restrict cho bảng con** (ngoại lệ Ch. 10).
6. **Ghi lại trên Tờ Đặc tả** — Lập tài liệu.

**Restrict cho bảng con:** Khi xóa bản ghi con sẽ vi phạm quy tắc bắt buộc (vd: "giảng viên phải dạy ít nhất một lớp"), thiết lập quy tắc xóa Restrict cho bảng con.

---

## 7. Tờ Đặc tả Quy tắc nghiệp vụ

**Các thành tố:**
- **Statement** — Văn bản rõ, súc tích của quy tắc
- **Constraint** — Giải thích ngắn gọn cách áp dụng
- **Type** — Hướng cơ sở dữ liệu hay Hướng ứng dụng
- **Category** — Trường cụ thể hay Mối quan hệ cụ thể
- **Test On** — Insert, Delete, Update
- **Structures Affected** — Trường hoặc Bảng
- **Field Elements Affected** — (trường cụ thể) Thành tố nào
- **Relationship Characteristics Affected** — (mối quan hệ cụ thể) Đặc điểm nào
- **Action Taken** — Ngày, người, sửa đổi (quan trọng khi xử lý sự cố)

---

## 8. Bảng xác thực (Validation Tables)

**Định nghĩa:** Bảng xác thực (lookup) lưu giá trị dùng thi hành tính toàn vẹn dữ liệu. Hiếm khi sửa sau khi điền dữ liệu.

**Cấu trúc điển hình:** Hai trường — (1) Khóa chính; (2) Trường không khóa lưu giá trị bắt buộc cho trường khác.

### Sử dụng Bảng xác thực hỗ trợ Quy tắc nghiệp vụ

Khi quy tắc giới hạn **phạm vi giá trị** của trường (và tập giá trị cố định, có thể lớn):

1. **Tạo bảng xác thực** với các giá trị hợp lệ.
2. **Thiết lập mối quan hệ 1:N** — bảng cha ↔ bảng xác thực.
3. **Thay thế** trường gốc bằng FK sang bảng xác thực.
4. **Sửa Range of Values** — *Bất kỳ giá trị nào trong [trường] của [bảng xác thực].*
5. **Đặt đặc điểm mối quan hệ:** Deletion Rule Restrict; Mandatory/Optional; mức độ tham gia phù hợp.

---

## 9. Rà soát Tờ Đặc tả Quy tắc nghiệp vụ

Rà soát từng tờ; đảm bảo quy tắc thiết lập đúng và mọi vùng được đánh dấu. Sửa lỗi; lặp cho đến khi rà soát xong. Thường xuyên xem lại quy tắc—thêm, sửa, xóa khi tổ chức thay đổi.

---

## 10. Ví dụ: Mike's Bikes

**Trường cụ thể:** CATEGORY trong PRODUCTS → bảng xác thực CATEGORIES; PRODUCTS.CATEGORY ID (FK).

**Mối quan hệ cụ thể:** VENDORS ↔ PRODUCTS → *Mỗi nhà cung cấp phải cung cấp ít nhất một sản phẩm* → Mandatory + (1,N) cho PRODUCTS; Quy tắc xóa Restrict theo PRODUCTS.

---

## Câu hỏi ôn tập

1. Quy tắc nghiệp vụ là gì?
2. Đặt tên hai loại quy tắc chính.
3. Bạn có thể thiết lập quy tắc hướng ứng dụng trong thiết kế logic không?
4. Hai phân loại quy tắc hướng cơ sở dữ liệu là gì?
5. Quy tắc trường cụ thể là gì?
6. Khi nào quy tắc được kiểm tra?
7. Bạn ghi tài liệu quy tắc như thế nào?
8. Nêu hai lợi ích của Tờ Đặc tả Quy tắc nghiệp vụ.
9. Mục đích của mục Action Taken?
10. Mục đích của bảng xác thực?
11. Cấu trúc điển hình của bảng xác thực?
12. Mối liên hệ giữa quy tắc và bảng xác thực?
13. Tại sao nên rà soát tất cả Tờ Đặc tả đã hoàn thành?

### Đáp án

1. Phát biểu áp đặt ràng buộc lên trường hoặc mối quan hệ.
2. Hướng cơ sở dữ liệu và hướng ứng dụng.
3. Không.
4. Trường cụ thể và mối quan hệ cụ thể.
5. Ràng buộc thành tố đặc tả trường.
6. Khi chèn/xóa/cập nhật.
7. Tờ Đặc tả Quy tắc nghiệp vụ.
8. Ghi mọi quy tắc; định dạng chuẩn; dễ xử lý sự cố.
9. Ghi sửa đổi; quan trọng cho xử lý sự cố.
10. Lưu giá trị hợp lệ; thi hành ràng buộc phạm vi.
11. Hai trường: PK và trường giá trị.
12. Dùng bảng xác thực khi quy tắc giới hạn phạm vi giá trị.
13. Đảm bảo thiết lập đúng và đánh dấu đủ.

---

*Tiếp tục Chương 12: Views*
