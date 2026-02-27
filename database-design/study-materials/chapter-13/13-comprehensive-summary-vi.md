# Chương 13: Rà soát Tính toàn vẹn Dữ liệu — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 13 trình bày **giai đoạn cuối** của quy trình thiết kế cơ sở dữ liệu: **rà soát tính toàn vẹn dữ liệu tổng thể** lần cuối và **tập hợp tài liệu cơ sở dữ liệu**. Bạn đã hoàn thành cấu trúc bảng, khóa, đặc tả trường, mối quan hệ, quy tắc nghiệp vụ và views. Chương này đảm bảo không bỏ sót gì và cung cấp checklist cho từng thành phần tính toàn vẹn cùng hướng dẫn tổ chức tài liệu.

---

## 1. Tại sao nên Rà soát Tính toàn vẹn Dữ liệu

Dù đã chú ý mọi chi tiết, vẫn thực hiện **rà soát cuối** tính toàn vẹn tổng thể:
- Đảm bảo tính toàn vẹn thiết lập **vững chắc nhất có thể**
- Vết nứt trong tính toàn vẹn → dữ liệu không nhất quán hoặc thông tin sai
- Có thể bạn đã bỏ sót điều gì đó
- **An tâm** đáng giá công sức
- *Rác vào, rác ra!*

---

## 2. Rà soát và Tinh chỉnh Tính toàn vẹn Dữ liệu

Dùng **cách tiếp cận mô-đun**—rà soát từng thành phần theo thứ tự. Tham chiếu các chương trước nếu gặp vấn đề.

### Tính toàn vẹn cấp Bảng

Rà soát mỗi bảng; đảm bảo:
- Không trường trùng
- Không trường tính toán
- Không trường đa trị
- Không trường đa phần
- Không bản ghi trùng
- Mỗi bản ghi được xác định bởi giá trị khóa chính
- Mỗi khóa chính tuân thủ Elements of a Primary Key

*Giải quyết với:* Ch. 6, 7, 8

### Tính toàn vẹn cấp Trường

Đảm bảo mỗi trường tuân thủ Elements of the Ideal Field; đặc tả trường đã định nghĩa cho mỗi trường.

*Giải quyết với:* Ch. 9

### Tính toàn vẹn cấp Mối quan hệ

Mỗi mối quan hệ đúng thiết lập; quy tắc xóa phù hợp; loại và mức độ tham gia đúng.

*Giải quyết với:* Ch. 10

### Quy tắc nghiệp vụ

Mỗi quy tắc áp đặt ràng buộc có ý nghĩa; phân loại đúng; đã định nghĩa và thiết lập; đã sửa đặc tả/đặc điểm; bảng xác thực phù hợp; Tờ Đặc tả hoàn thành.

*Giải quyết với:* Ch. 11

### Views

Mỗi view xây trên base tables cần thiết; trường phù hợp; calculated fields có ý nghĩa; filter trả đúng; view diagram + View Specifications cho mỗi view.

*Giải quyết với:* Ch. 12

---

## 3. Tập hợp Tài liệu Cơ sở Dữ liệu

Tập hợp tất cả vào **kho trung tâm** (bìa kẹp hoặc thư mục/tệp có tổ chức):

| Tài liệu | Mục đích |
|----------|----------|
| Danh sách bảng cuối | Các bảng và mô tả |
| Tờ Đặc tả trường | Đặc tả mỗi trường |
| Danh sách trường tính toán | Các biểu thức |
| Sơ đồ cấu trúc bảng | Cấu trúc trực quan |
| Sơ đồ mối quan hệ | Quan hệ giữa bảng |
| Tờ Đặc tả Quy tắc nghiệp vụ | Mỗi quy tắc |
| Sơ đồ view | Cấu trúc view |
| Tờ Đặc tả View | Đặc điểm view |

**Phụ lục (tùy chọn):** Ghi chú thiết kế; mẫu từ giai đoạn phân tích.

---

## 4. Tầm quan trọng của Tài liệu

**Ba lý do tài liệu quan trọng:**

1. **Bản ghi hoàn chỉnh** — Mọi khía cạnh cấu trúc logic; trả lời hầu hết câu hỏi
2. **Đặc tả và hướng dẫn** — Như bản vẽ kiến trúc; cách tạo cơ sở dữ liệu khi triển khai; tính toàn vẹn cần thiết lập; không phụ thuộc RDBMS
3. **Tác động sửa đổi** — Xác định ảnh hưởng thay đổi cấu trúc; quyết định có cơ sở

---

## 5. Hoàn tất!

Sau rà soát tính toàn vẹn và tập hợp tài liệu, **quy trình thiết kế logic cơ sở dữ liệu hoàn thành**. Cơ sở dữ liệu được thiết kế đúng; triển khai có thể tiến hành suôn sẻ.

---

## 6. Ví dụ: Kết thúc

Mike's Bikes—cuộc họp cuối: Rà soát từng cấu trúc theo các yếu tố chi phối; rà soát từng thành phần tính toàn vẹn; thu thập tài liệu; tập hợp vào bìa kẹp; bàn giao Mike. Cơ sở dữ liệu hoàn thành!

---

*Tiếp tục Chương 14: Thiết kế Sai—Những điều Không nên làm (Phần III)*
