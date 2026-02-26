# Chương 6: Phân tích cơ sở dữ liệu hiện tại — Ghi chú học tập (Mở rộng)

*Ghi chú chi tiết cho việc học, ôn tập và giải thích khái niệm Giai đoạn 2*

---

## Chương này trình bày gì

Chương 6 nói về **Giai đoạn 2**: **phân tích cơ sở dữ liệu hiện tại** (hoặc phương pháp thu thập dữ liệu) để hiểu cách tổ chức sử dụng, quản lý và duy trì dữ liệu. Nguyên tắc chính: *Để xác định đi đâu, bạn phải hiểu bạn đang ở đâu.*

---

## Quy tắc vàng

**KHÔNG áp dụng cấu trúc cơ sở dữ liệu hiện tại làm cơ sở cho cấu trúc mới.** Sao chép chuyển các vấn đề ẩn (bảng vụng về, mối quan hệ kém, trường không nhất quán) vào cơ sở dữ liệu mới. Định nghĩa cấu trúc mới một cách rõ ràng.

---

## Các loại "cơ sở dữ liệu" hiện tại

| Loại | Điểm chính |
|------|------------|
| **Trên giấy** | Biểu mẫu, sổ, tủ hồ sơ. Nhiều tổ chức vẫn dùng giấy. Chú ý: dữ liệu không nhất quán, sai, trùng, thừa, thiếu. |
| **Kế thừa** | Sử dụng **5+ năm**. Trên máy chính, máy chủ, PC, cloud. Thường thiết kế kém (trường trùng, dữ liệu thừa). Dễ phân tích hơn giấy — có cấu trúc hơn, có chương trình ứng dụng. |
| **Tri thức con người** | Nhân viên chủ chốt nắm thông tin quan trọng trong trí nhớ. |

---

## Quy trình phân tích ba bước

### Bước 1: Rà soát cách thu thập dữ liệu

**Cần thu thập:** Một mẫu mỗi tài liệu/biểu mẫu/màn hình dùng để ghi dữ liệu.

- **Giấy:** Biểu mẫu, danh sách, sổ. Tìm mục hoàn chỉnh nhất; sao chép; lưu vào thư mục.
- **Phần mềm:** Trình xử lý văn bản, bảng tính, cơ sở dữ liệu, trang web. Nhiều người dùng Word/Excel thông minh cho dữ liệu — kiểm tra với người quen. Chụp màn hình nhập dữ liệu; ghi chương trình + ngày; in; lưu.
- **Web:** Trang thu thập dữ liệu. Quy trình tương tự — ảnh chụp, URL, ngày, lưu.

**Tại sao sắp xếp:** Thời gian đầu tư vào thư mục rõ ràng trả lãi trong các giai đoạn thiết kế phức tạp.

### Bước 2: Rà soát cách trình bày thông tin

**Cần thu thập:** Mẫu cách dữ liệu được trình bày thành thông tin.

- **Báo cáo** — Đánh máy, in hoặc tạo bằng máy tính. Dễ hơn thu thập — mọi người biết báo cáo; bản sao thường có sẵn.
- **Trình bày màn hình** — PowerPoint, Slides, Keynote. Chỉ xem những bản **lấy dữ liệu từ cơ sở dữ liệu**. Chụp slide; không vô tình gộp nhiều trình bày.
- **Trang web** — Logic tương tự; xem trang trình bày thông tin từ cơ sở dữ liệu.

### Bước 3: Tiến hành phỏng vấn

**Tại sao sau mẫu:** Phỏng vấn cung cấp (1) chi tiết về mẫu, (2) cách tổ chức dùng dữ liệu, (3) cơ sở cho cấu trúc trường/bảng, (4) yêu cầu thông tin tương lai.

---

## Hai kỹ thuật phỏng vấn cốt lõi

### Kỹ thuật xác định chủ đề (Subject-Identification)

**Mục đích:** Xác định **chủ đề** (người, nơi chốn, đồ vật, sự kiện) trong phản hồi người tham gia.

**Cách làm:** Nghe **danh từ** đại diện người, nơi chốn, đồ vật hoặc sự kiện. Tạm bỏ qua danh từ là đặc điểm. Liệt kê mỗi chủ đề một lần.

**Mẫu:** Người ("đại diện tài khoản"), Nơi ("phòng trưng bày"), Đồ vật ("hàng hóa"), Sự kiện ("cuộc hẹn").

**Sử dụng:** Tạo câu hỏi tiếp; sau đó định nghĩa **bảng** (Chương 7).

**Ví dụ:** "Tôi chịu trách nhiệm mười khách hàng... Tôi viết đơn bán hàng... đưa cho trợ lý" → chủ đề: Khách hàng, Đơn bán hàng, Trợ lý, Hàng hóa, v.v.

### Kỹ thuật xác định đặc điểm (Characteristic-Identification)

**Mục đích:** Xác định **đặc điểm** (thuộc tính) của chủ đề — những cái này trở thành **trường**.

**Cách làm:** Chọn chủ đề; hỏi câu hỏi tiếp. Nghe danh từ mô tả khía cạnh của chủ đề đó. Đặc điểm thường ở dạng số ít ("số điện thoại"); danh từ chủ đề thường sở hữu ("số điện thoại của khách hàng").

**Quan trọng:** Giữ đặc điểm trên **danh sách riêng** khác chủ đề. Không trộn. (Lý do rõ ở Chương 7.)

**Mẫu:** Với "khách hàng" → Tên, Địa chỉ, Số điện thoại, Email, v.v.

---

## Luồng phỏng vấn: Người dùng trước, sau đó quản lý

**Người dùng trước** — Họ có bức tranh rõ nhất về hoạt động hàng ngày. Câu trả lời của họ giúp hiểu phản hồi quản lý.

### Phỏng vấn người dùng — Bốn nhóm vấn đề

| Nhóm | Trọng tâm |
|------|-----------|
| **Loại & sử dụng dữ liệu** | Họ dùng dữ liệu gì? Thế nào? Câu mở → Xác định chủ đề → Xác định đặc điểm. |
| **Rà soát mẫu** | Mỗi mẫu được dùng thế nào? Viết mô tả; đính vào mẫu. Không bao giờ phỏng đoán (vd làm rõ "SRP"). Mẫu phức tạp = nhiều chủ đề. |
| **Yêu cầu thông tin hiện tại** | Người dùng có kiểm soát dữ liệu đằng sau báo cáo họ nhận không? Nếu không, truy nguồn. Câu hỏi tiếp rất quan trọng. |
| **Bổ sung & tương lai** | Cần thông tin thêm gì hiện tại? Tương lai? Ghi trên báo cáo (sticky note). Phác thảo báo cáo mới; xác định chủ đề/đặc điểm. |

### Phỏng vấn quản lý — Bốn nhóm vấn đề

| Nhóm | Trọng tâm |
|------|-----------|
| **Hiện tại** | Họ nhận báo cáo gì? Có thiếu trong mẫu không? Lấy mẫu mới. |
| **Bổ sung** | Cần thông tin bổ sung? Ghi trên báo cáo. |
| **Tương lai** | Cần thông tin gì khi tổ chức phát triển? Phác thảo báo cáo mới. |
| **Tổng thể** | Lớp thông tin chung tổ chức cần? Có dữ liệu tổ chức phải duy trì mà chưa thảo luận không? |

---

## Soạn danh sách trường

### Danh sách trường sơ bộ — Tinh chỉnh hai bước

**Bước 1 — Tinh chỉnh danh sách đặc điểm:**
- **Cùng tên, chủ đề khác:** "Tên" cho Khách hàng vs. Nhân viên → đổi tên: "Tên khách hàng," "Tên nhân viên"
- **Cùng đặc điểm, tên khác:** "Mã SP #," "Số SP" → giữ rõ nhất; xóa trùng
- **Chủ đề vs. đặc điểm:** Nếu mục là chủ đề (tập hợp, có thể phân tách), chuyển sang danh sách chủ đề; xác định đặc điểm của nó

**Bước 2 — Kiểm tra mẫu:**
- Đánh dấu mọi đặc điểm trên mỗi mẫu
- Gạch bỏ những cái đã có trên danh sách
- Đổi tên mục chung (Tên → Tên liên hệ) nếu cần
- Thêm phần còn lại vào danh sách

### Danh sách giá trị

Ghi lại đặc điểm có **danh sách giá trị** (tập giá trị chấp nhận được) — vd Ship Via: FedEx, UPS, DHL. Thường thực thi quy tắc nghiệp vụ. Dùng khi định nghĩa đặc tả trường (Ch 9) và quy tắc nghiệp vụ (Ch 11).

### Danh sách trường tính toán

**Loại** trường tính toán (kết quả nối chuỗi hoặc biểu thức toán học) khỏi Danh sách trường sơ bộ. Đặt vào **Danh sách trường tính toán**.

**Dấu hiệu:** Tên chứa amount, total, sum, average, minimum, maximum, count. Ví dụ: Tổng phụ, Tuổi trung bình, Số khách hàng.

### Rà soát cuối cùng

Phỏng vấn ngắn với người dùng và quản lý để xác minh tính đầy đủ. Thêm thiếu sót. Ghi ngày danh sách. Cố gắng đầy đủ nhất — một số thêm/bớt không thể tránh khi thiết kế tiến triển.

---

## Gợi nhớ

| Khái niệm | Điểm chính |
|-----------|------------|
| **Không áp dụng** | Không bao giờ dùng cấu trúc hiện tại làm cơ sở cho mới |
| **3 bước** | Thu thập → Trình bày → Phỏng vấn |
| **Chủ đề** | Danh từ = người, nơi chốn, đồ vật, sự kiện. Danh sách riêng. |
| **Đặc điểm** | Danh từ = thuộc tính của chủ đề. Danh sách riêng. Trường. |
| **Người dùng trước** | Sau đó quản lý |
| **Hai danh sách** | Danh sách trường sơ bộ (cốt lõi) + Danh sách trường tính toán |
| **Tên duy nhất** | "Tên" → "Tên khách hàng," "Tên nhân viên" (tiền tố chủ đề) |

---

## Tham khảo nhanh: Loại yêu cầu thông tin

- **Hiện tại** — Họ nhận gì bây giờ; truy nguồn dữ liệu
- **Bổ sung** — Họ cần gì đang thiếu
- **Tương lai** — Họ sẽ cần gì khi tổ chức phát triển
- **Tổng thể** (quản lý) — Lớp thông tin chung tổ chức cần
