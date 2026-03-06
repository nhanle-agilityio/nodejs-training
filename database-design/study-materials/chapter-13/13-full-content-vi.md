# Chương 13: Rà soát Tính toàn vẹn Dữ liệu

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Khi bạn đã loại trừ điều không thể, bất kỳ điều gì còn lại, dù khó tin đến đâu, phải là sự thật."*  
—SHERLOCK HOLMES, *THE SIGN OF FOUR*

---

## Các chủ đề trong chương này

- Tại sao nên Rà soát Tính toàn vẹn Dữ liệu
- Rà soát và Tinh chỉnh Tính toàn vẹn Dữ liệu (Table-Level, Field-Level, Relationship-Level, Business Rules, Views)
- Tập hợp Tài liệu Cơ sở Dữ liệu
- Hoàn tất!
- Ví dụ: Kết thúc
- Tóm tắt

---

## Tại sao nên Rà soát Tính toàn vẹn Dữ liệu

Bạn đang ở giai đoạn cuối của quy trình thiết kế cơ sở dữ liệu. Bạn đã hoàn thành nhiều việc: nhận thức ưu điểm mô hình quan hệ, tạo tuyên bố sứ mệnh, định nghĩa mục tiêu, phân tích cơ sở dữ liệu cũ, xác định yêu cầu thông tin, định nghĩa cấu trúc bảng, gán khóa chính, thiết lập đặc tả trường, thiết lập mối quan hệ bảng, định nghĩa và thiết lập quy tắc nghiệp vụ, định nghĩa views, thiết lập tính toàn vẹn tổng thể. Cơ sở dữ liệu mới của bạn, về cơ bản, đã hoàn thành; tuy nhiên, bạn nên **rà soát tính toàn vẹn dữ liệu tổng thể lần cuối**.

Lý do: Bạn muốn đảm bảo tính toàn vẹn bạn đã cẩn thận thiết lập **vững chắc nhất có thể**. Vết nứt trong tính toàn vẹn có thể dẫn đến dữ liệu không nhất quán hoặc thông tin không chính xác. Dù khó xảy ra, vẫn có thể bạn đã bỏ sót điều gì đó. Sự an tâm khi biết bạn có cơ sở dữ liệu được thiết kế vững chắc đáng giá công sức rà soát cuối này.

*Nhớ: Rác vào, rác ra!*

---

## Rà soát và Tinh chỉnh Tính toàn vẹn Dữ liệu

Rà soát tính toàn vẹn dữ liệu đơn giản nếu bạn dùng **cách tiếp cận mô-đun**—rà soát tuần tự từng thành phần của tính toàn vẹn tổng thể: cấp bảng, cấp trường, cấp mối quan hệ và quy tắc nghiệp vụ. Bạn sẽ gặp rất ít vấn đề nếu đã theo đúng phương pháp thiết kế trong sách.

### Tính toàn vẹn cấp Bảng

Rà soát mỗi bảng và đảm bảo:
- Không trường trùng
- Không trường tính toán
- Không trường đa trị
- Không trường đa phần
- Không bản ghi trùng
- Mỗi bản ghi được xác định bởi giá trị khóa chính
- Mỗi khóa chính tuân thủ Các yếu tố của Khóa chính

Nếu có vấn đề, giải quyết bằng kỹ thuật ở Chương 6, 7, 8.

### Tính toàn vẹn cấp Trường

Đảm bảo mỗi trường tuân thủ Các yếu tố của Trường lý tưởng và đã định nghĩa đặc tả trường. Giải quyết với Chương 9.

### Tính toàn vẹn cấp Mối quan hệ

Xem xét mỗi mối quan hệ bảng. Đạt tính toàn vẹn khi: mối quan hệ thiết lập đúng; quy tắc xóa phù hợp; loại tham gia xác định đúng; mức độ tham gia thiết lập đúng. Giải quyết với Chương 10.

### Quy tắc nghiệp vụ

Đảm bảo: mỗi quy tắc áp đặt ràng buộc có ý nghĩa; phân loại đúng; định nghĩa và thiết lập đúng; đã sửa thành tố đặc tả trường hoặc đặc điểm mối quan hệ; đã thiết lập bảng xác thực phù hợp; hoàn thành Tờ Đặc tả Quy tắc nghiệp vụ cho mỗi quy tắc. Giải quyết với Chương 11.

### Views

Views không liên kết trực tiếp với thành phần tính toàn vẹn nào, nhưng vẫn rà soát: mỗi view xây trên base tables cần thiết; trường phù hợp; calculated fields cung cấp thông tin phù hợp; mỗi filter trả tập bản ghi phù hợp; mỗi view có view diagram; mỗi view diagram có View Specifications sheet. Giải quyết với Chương 12.

Sau khi hoàn thành toàn bộ rà soát, bạn có thể tin tưởng cấu trúc cơ sở dữ liệu vững chắc, dữ liệu nhất quán và hợp lệ, thông tin truy xuất chính xác.

---

## Tập hợp Tài liệu Cơ sở Dữ liệu

Trong suốt quy trình thiết kế, bạn đã tạo nhiều danh sách, tờ đặc tả và sơ đồ. Bây giờ tập hợp chúng vào **kho trung tâm**—tốt nhất là trong bìa kẹp hoặc thư mục/tệp có tổ chức trên máy tính. Kho thiết kế nên gồm:
- Danh sách bảng cuối cùng
- Tờ Đặc tả trường
- Danh sách trường tính toán
- Sơ đồ cấu trúc bảng
- Sơ đồ mối quan hệ
- Tờ Đặc tả Quy tắc nghiệp vụ
- Sơ đồ view
- Tờ Đặc tả View

Có thể thêm ghi chú từ quy trình thiết kế và mẫu từ giai đoạn phân tích làm phụ lục.

**Tầm quan trọng của tài liệu:**
1. Cung cấp bản ghi hoàn chỉnh của cấu trúc cơ sở dữ liệu; trả lời hầu hết câu hỏi bằng cách tham chiếu tài liệu.
2. Cung cấp đặc tả và hướng dẫn hoàn chỉnh cho quá trình triển khai—như bản vẽ kiến trúc; xác định tính toàn vẹn cần thiết lập; thiết kế không phụ thuộc RDBMS nên người triển khai có toàn quyền về cách triển khai vật lý.
3. Khi cần sửa đổi cấu trúc trong triển khai, tài liệu thiết kế giúp xác định ảnh hưởng; mọi sửa đổi nên dựa trên quyết định có cơ sở.

---

## Hoàn tất!

Sau khi hoàn thành rà soát tính toàn vẹn và tập hợp tài liệu, **quy trình thiết kế logic cơ sở dữ liệu hoàn thành**. Bạn có thể yên tâm có cơ sở dữ liệu được thiết kế đúng và triển khai sẽ suôn sẻ.

---

## Ví dụ: Kết thúc

Cuộc họp cuối với Mike và nhân viên. Mục tiêu: rà soát cơ sở dữ liệu và tính toàn vẹn lần cuối. Rà soát từng cấu trúc theo các yếu tố chi phối; rà soát từng thành phần tính toàn vẹn tổng thể; thu thập tài liệu; tập hợp vào bìa kẹp; bàn giao Mike. Cơ sở dữ liệu hoàn thành!

---

## Tóm tắt

Chương bắt đầu với danh sách những gì bạn đã hoàn thành. Tiếp theo là thảo luận tại sao nên rà soát tính toàn vẹn dữ liệu tổng thể lần cuối, rồi các điểm cần nhớ khi rà soát từng thành phần. Chương kết thúc bằng tầm quan trọng của tài liệu bạn đã tập hợp trong toàn bộ quy trình thiết kế.
