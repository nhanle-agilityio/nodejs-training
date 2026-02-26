# Chương 6: Phân tích cơ sở dữ liệu hiện tại — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 6 trình bày **Giai đoạn 2** của quy trình thiết kế: **phân tích cơ sở dữ liệu hiện tại** (hoặc phương pháp thu thập dữ liệu) để hiểu cách tổ chức sử dụng, quản lý và duy trì dữ liệu. Nguyên tắc: *Để xác định đi đâu, bạn phải hiểu bạn đang ở đâu.*

---

## 1. Làm quen với cơ sở dữ liệu hiện tại

### Mục tiêu phân tích

1. **Xác định** liệu cơ sở dữ liệu có hỗ trợ yêu cầu thông tin hiện tại của tổ chức không
2. **Phát hiện** thiếu sót cấu trúc hiện có
3. **Xác định** cơ sở dữ liệu cần tiến hóa thế nào để hỗ trợ yêu cầu tương lai

### Ba câu hỏi chính

- Tổ chức sử dụng loại dữ liệu nào?
- Tổ chức sử dụng dữ liệu đó thế nào?
- Tổ chức quản lý và duy trì dữ liệu đó thế nào?

### Các loại "cơ sở dữ liệu" hiện tại

| Loại | Mô tả |
|------|-------|
| **Trên giấy** (hệ thống tệp) | Biểu mẫu, tài liệu viết tay/in trong thư mục hoặc sổ; xác định bằng mã; lưu trong tủ hồ sơ. Nhiều doanh nghiệp vẫn dùng hệ thống trên giấy. |
| **Kế thừa** | Tồn tại và sử dụng **năm năm trở lên**. Nằm trên máy chính, máy chủ, PC hoặc cloud. Cấu trúc phụ thuộc kỹ năng nhà phát triển, công cụ và RDBMS. Thường có cấu trúc không đúng/kém hiệu quả, trường trùng, dữ liệu thừa. |
| **Cơ sở tri thức con người** | Dựa trên trí nhớ của nhân viên chủ chốt (vd: thông tin khách hàng, chi tiết sản phẩm). Quan trọng cho hoạt động kinh doanh. |

### Quy tắc quan trọng

> **Không áp dụng cấu trúc cơ sở dữ liệu hiện tại làm cơ sở cho cấu trúc mới.**

Sao chép cấu trúc hiện có chuyển các vấn đề ẩn (bảng vụng về, mối quan hệ định nghĩa kém, đặc tả trường không nhất quán) vào cơ sở dữ liệu mới. Định nghĩa cấu trúc mới một cách rõ ràng. Nếu cơ sở dữ liệu cũ không có vấn đề, bạn đã không xây dựng cái mới.

---

## 2. Tiến hành phân tích — Ba bước

### Bước 1: Rà soát cách thu thập dữ liệu

**Trên giấy:** Thu thập một mẫu mỗi loại tài liệu (biểu mẫu, danh sách, sổ). Tìm mục hoàn chỉnh nhất; sao chép; lưu vào thư mục.

**Chương trình máy tính:** Xem xét trình xử lý văn bản, bảng tính, cơ sở dữ liệu, trang web. Thu thập ảnh chụp màn hình đại diện cách thu thập dữ liệu. Nhiều người dùng trình xử lý văn bản hoặc bảng tính thông minh cho dữ liệu. Tạo ảnh chụp; dán vào tài liệu; ghi tên chương trình và ngày; in và lưu.

**Trang web:** Xem xét trang dùng để thu thập dữ liệu qua Internet. Quy trình tương tự — ảnh chụp, tài liệu, URL, ngày, in, lưu.

**Sắp xếp thư mục rõ ràng** — thời gian đầu tư sẽ trả lãi sau.

### Bước 2: Rà soát cách trình bày thông tin

Rà soát:
- **Báo cáo** — Tài liệu đánh máy, in hoặc tạo bằng máy tính trình bày dữ liệu có ý nghĩa
- **Trình bày màn hình** (slide) — PowerPoint, Google Slides, Keynote; chỉ xem những bản lấy dữ liệu từ cơ sở dữ liệu
- **Trang web** — Giống báo cáo; xem những trang liên quan trực tiếp dữ liệu cơ sở dữ liệu

Với mỗi loại: thu thập mẫu, ghi chép, lưu. Với trình bày và trang web, chụp slide/trang sử dụng dữ liệu cơ sở dữ liệu. Đánh dấu thư mục với tên trình bày, tên tệp, ngày. Tránh vô tình gộp nhiều trình bày.

### Bước 3: Tiến hành phỏng vấn người dùng và quản lý

**Tại sao phỏng vấn sau khi thu thập mẫu:**
1. Cung cấp **chi tiết** về mẫu đã thu thập
2. Cung cấp **thông tin về cách tổ chức sử dụng dữ liệu**
3. **Cần thiết** để định nghĩa cấu trúc trường và bảng sơ bộ
4. Giúp xác định **yêu cầu thông tin tương lai**

---

## 3. Kỹ thuật phỏng vấn cơ bản

### Câu hỏi mở vs. đóng

- **Mở** — Chung; tập trung vào **chủ đề** cụ thể. Gợi phản hồi mô tả.
- **Đóng** — Cụ thể; tập trung vào **chi tiết** cụ thể của chủ đề.

**Quy trình:** Bắt đầu với câu mở → xác định chủ đề → chọn chủ đề → hỏi câu cụ thể hơn (đóng) về nó.

### Kỹ thuật xác định chủ đề (Subject-Identification)

**Quy trình:** Khi hỏi câu mở, xác định **chủ đề** trong phản hồi bằng cách nghe **danh từ** đại diện người, nơi chốn, đồ vật hoặc sự kiện. (Bỏ qua danh từ đại diện đặc điểm tạm thời.)

- Chủ đề = người, nơi chốn, đồ vật, sự kiện
- Liệt kê danh từ khi xác định (một lần xuất hiện mỗi chủ đề)
- Dùng danh sách để tạo câu hỏi tiếp và sau đó để định nghĩa bảng

**Ví dụ:** Từ "Tôi chịu trách nhiệm mười khách hàng... Tôi viết đơn bán hàng... đưa cho trợ lý" → chủ đề: Đại diện tài khoản, Cuộc hẹn, Trợ lý, Khách hàng, Mặt hàng, Hàng hóa, Đơn bán hàng, Mùa, Phòng trưng bày.

### Kỹ thuật xác định đặc điểm (Characteristic-Identification)

**Quy trình:** Sau khi xác định chủ đề, chọn một và hỏi câu hỏi tiếp để có **đặc điểm**. Nghe danh từ đại diện **đặc điểm** của chủ đề (thường dạng số ít: "số điện thoại," "địa chỉ"). Danh từ chủ đề thường ở dạng sở hữu ("số điện thoại của khách hàng").

- Liệt kê đặc điểm trên **tờ riêng** khác chủ đề (quan trọng — lý do rõ ở Chương 7)
- Đặc điểm cuối cùng trở thành **trường**
- Tiếp tục cho mỗi chủ đề đến khi danh sách hoàn chỉnh

**Ví dụ:** Với "đơn bán hàng" → đặc điểm: Tên, Địa chỉ, Số điện thoại, Email, Số fax, Địa chỉ giao hàng, Mặt hàng, Tổng cộng.

---

## 4. Phỏng vấn người dùng

**Nói chuyện với người dùng trước** — họ là "tuyến đầu" với bức tranh rõ nhất về hoạt động hàng ngày. Thông tin của họ giúp hiểu câu trả lời quản lý.

### Bốn vấn đề cần giải quyết

| Vấn đề | Mục tiêu |
|--------|----------|
| **1. Loại và sử dụng dữ liệu** | Xác định loại dữ liệu người dùng dùng và cách họ dùng. Bắt đầu với câu mở; dùng kỹ thuật Chủ đề/Đặc điểm. |
| **2. Rà soát mẫu** | Làm rõ cách mỗi mẫu được dùng; gán mô tả cho mỗi mẫu; đính kèm. Không bao giờ phỏng đoán — vd nếu "SRP" không rõ, nhờ người tham gia làm rõ. Mẫu phức tạp (nhiều chủ đề) cần làm việc nhiều hơn. |
| **3. Yêu cầu thông tin hiện tại** | Xác định người dùng có nhận thông tin từ dữ liệu họ không kiểm soát không. Với mỗi báo cáo: Người dùng có tạo/duy trì dữ liệu không? Nếu không, xác định nguồn. Câu hỏi tiếp rất quan trọng. |
| **4. Yêu cầu thông tin bổ sung** | Người dùng cần thông tin gì thêm? Nhờ họ ghi trên báo cáo (sticky note, v.v.) với lý do. Xác định chủ đề/đặc điểm mới; thêm vào danh sách. |
| **5. Yêu cầu thông tin tương lai** | Họ cần thông tin gì khi tổ chức phát triển? Dùng câu hỏi về ảnh hưởng của sự tiến hóa. Câu trả lời mang tính suy đoán nhưng giúp dự đoán. Phác thảo báo cáo mới; xác định chủ đề/đặc điểm. |

---

## 5. Phỏng vấn quản lý

### Bốn vấn đề cần giải quyết

| Vấn đề | Mục tiêu |
|--------|----------|
| **1. Yêu cầu thông tin hiện tại** | Xác định báo cáo quản lý nhận; xác định có báo cáo nào thiếu trong mẫu. Thu thập mẫu báo cáo mới; xác định chủ đề/đặc điểm; thêm vào danh sách. |
| **2. Yêu cầu thông tin bổ sung** | Quản lý cần thông tin bổ sung không? Kỹ thuật giống phỏng vấn người dùng — ghi trên báo cáo, xác định mục mới. |
| **3. Yêu cầu thông tin tương lai** | Quản lý cần thông tin gì khi tổ chức phát triển? Phác thảo báo cáo mới; xác định chủ đề/đặc điểm. |
| **4. Yêu cầu thông tin tổng thể** | Theo ý kiến quản lý, **lớp thông tin chung** nào tổ chức cần? Có dữ liệu tổ chức phải duy trì mà chưa được thảo luận không? Rà soát tất cả báo cáo; hỏi có thông tin hữu ích nhưng chưa ai nhận không. |

**Lặp** đến khi không xác định thêm thông tin. Bạn có thể cần quay lại quy trình này khi thiết kế triển khai.

---

## 6. Soạn danh sách trường hoàn chỉnh

### Danh sách trường sơ bộ (Preliminary Field List)

Đại diện **yêu cầu dữ liệu cơ bản** của tổ chức — tập trường cốt lõi bạn sẽ định nghĩa. Được tạo trong hai bước.

#### Bước 1: Rà soát và tinh chỉnh danh sách đặc điểm

**Tinh chỉnh mục cùng tên:** Nếu "Tên" xuất hiện nhiều lần, xác định mỗi lần có đại diện chủ đề khác (Tên khách hàng, Tên nhân viên, Tên liên hệ) không. Đổi tên dùng chủ đề làm tiền tố. Tương tự với mục chung: Địa chỉ, Thành phố, Bang, Mã bưu điện, Số điện thoại, Email.

**Tinh chỉnh mục đại diện cùng đặc điểm:** "Mã SP #," "Số SP," "Số sản phẩm" → giữ một (rõ nhất); xóa trùng.

**Đảm bảo mục là đặc điểm, không phải chủ đề:** Hỏi: Nó mô tả được gì không? Nó là thành phần/chi tiết? Nó đại diện tập hợp? Nó có thể phân tách? Nếu là chủ đề, chuyển sang danh sách chủ đề và xác định đặc điểm của nó.

Kết quả: **Phiên bản đầu** của Danh sách trường sơ bộ.

#### Bước 2: Kiểm tra mẫu để tìm đặc điểm mới

- Đánh dấu mọi đặc điểm trên mỗi mẫu
- Gạch bỏ những cái đã có trên danh sách
- Gạch bỏ những cái có cùng ý nghĩa với mục hiện có (đổi tên nếu cần — vd "Tên" → "Tên liên hệ")
- Thêm phần còn lại vào Danh sách trường sơ bộ

Kết quả: **Phiên bản thứ hai** của Danh sách trường sơ bộ.

### Danh sách giá trị (Value Lists)

Khi xem mẫu, ghi lại đặc điểm có **danh sách giá trị** (enumerated list) — khoảng giá trị chấp nhận được cho một đặc điểm; thường thực thi quy tắc nghiệp vụ. Ghi tên đặc điểm và các giá trị (hoặc mô tả nếu nhiều). Không ghi tập rõ ràng (có/không, đúng/sai). Dùng khi định nghĩa đặc tả trường và quy tắc nghiệp vụ (Chương 9, 11).

### Danh sách trường tính toán (Calculated Field List)

**Loại trường tính toán** khỏi Danh sách trường sơ bộ và đặt vào **Danh sách trường tính toán**. Trường tính toán lưu kết quả nối chuỗi hoặc biểu thức toán học.

**Dấu hiệu:** Tên chứa amount, total, sum, average, minimum, maximum, count. Ví dụ: Tổng phụ, Tuổi trung bình, Số tiền chiết khấu, Số khách hàng.

Kết quả: **Phiên bản thứ ba** của Danh sách trường sơ bộ + Danh sách trường tính toán.

### Rà soát cuối cùng

Tiến hành phỏng vấn ngắn với người dùng và quản lý để xác minh tính đầy đủ. Thêm mọi trường thiếu. Ghi ngày danh sách. Danh sách có thể không hoàn toàn cuối cùng — bạn sẽ thêm/bớt khi thiết kế tiến triển — nhưng cố gắng đầy đủ nhất có thể.

---

## Câu hỏi ôn tập (Tự kiểm tra)

1. Nêu hai mục tiêu phân tích cơ sở dữ liệu hiện tại.
2. Đúng hay Sai: Bạn có thể áp dụng cấu trúc cơ sở dữ liệu hiện tại làm cơ sở cho cấu trúc mới.
3. Cơ sở dữ liệu kế thừa là gì?
4. Nêu hai bước của quy trình phân tích.
5. Loại chương trình máy tính nào cần rà soát trong phân tích?
6. Tại sao phải phỏng vấn sau khi thu thập mẫu thu thập dữ liệu và trình bày thông tin?
7. Bạn dùng câu hỏi "mở" và "đóng" thế nào?
8. Kỹ thuật xác định chủ đề là gì?
9. Bạn xác định thuộc tính cụ thể cho một chủ đề thế nào?
10. Đúng hay Sai: Bạn nên phỏng vấn người dùng và quản lý cùng lúc.
11. Ba loại yêu cầu thông tin cơ bản cần xác định là gì?
12. Danh sách trường sơ bộ là gì?
13. Nêu lý do mỗi mục trên Danh sách trường sơ bộ phải có tên duy nhất.
14. Danh sách giá trị là gì?
15. Trường tính toán là gì? Bạn nên làm gì với chúng?

### Đáp án

1. Bất kỳ hai trong số: Xác định CSDL có hỗ trợ yêu cầu thông tin hiện tại; phát hiện thiếu sót cấu trúc; xác định CSDL cần tiến hóa thế nào cho yêu cầu tương lai; xác định loại dữ liệu sử dụng; xác định tổ chức sử dụng, quản lý và duy trì dữ liệu thế nào.
2. **Sai.** Không áp dụng cấu trúc hiện tại làm cơ sở cho cấu trúc mới.
3. Cơ sở dữ liệu đã tồn tại và được sử dụng **năm năm trở lên**.
4. Bất kỳ hai trong số: Rà soát cách thu thập dữ liệu; rà soát cách trình bày thông tin; tiến hành phỏng vấn người dùng và quản lý.
5. **Trình xử lý văn bản, bảng tính, cơ sở dữ liệu và trang web**.
6. Phỏng vấn cung cấp chi tiết về mẫu, thông tin về cách tổ chức dùng dữ liệu, giúp định nghĩa cấu trúc trường/bảng sơ bộ, và giúp xác định yêu cầu thông tin tương lai.
7. Câu hỏi **mở** tập trung vào chủ đề cụ thể; câu hỏi **đóng** tập trung vào chi tiết cụ thể của chủ đề.
8. Quy trình **xác định chủ đề** trong phản hồi của người tham gia bằng cách nghe danh từ đại diện người, nơi chốn, đồ vật hoặc sự kiện.
9. Bằng cách dùng **Kỹ thuật xác định đặc điểm** — hỏi câu hỏi tiếp và nghe danh từ đại diện đặc điểm của chủ đề.
10. **Sai.** Phỏng vấn người dùng và quản lý **riêng biệt**.
11. **Hiện tại**, **bổ sung** và **tương lai**.
12. Danh sách đại diện **yêu cầu dữ liệu cơ bản** của tổ chức và tạo thành tập trường cốt lõi bạn phải định nghĩa trong cơ sở dữ liệu.
13. Để đảm bảo mỗi đặc điểm xuất hiện **chỉ một lần** trên danh sách.
14. Danh sách chỉ rõ **khoảng giá trị chấp nhận được** cho một đặc điểm cụ thể và thường thực thi quy tắc nghiệp vụ.
15. Trường lưu kết quả **nối chuỗi hoặc biểu thức toán học**. **Loại** khỏi Danh sách trường sơ bộ và đặt vào **Danh sách trường tính toán** riêng.

---

## Liên kết với mục tiêu học tập

Sau khi học chương này, bạn cần có khả năng:
- **Phân tích** cơ sở dữ liệu trên giấy và kế thừa mà không áp dụng cấu trúc của chúng
- **Tiến hành** phân tích ba bước (thu thập, trình bày, phỏng vấn)
- **Áp dụng** kỹ thuật xác định Chủ đề và Đặc điểm
- **Soạn** Danh sách trường sơ bộ và Danh sách trường tính toán

*Tiếp tục sang Chương 7: Thiết lập cấu trúc bảng*
