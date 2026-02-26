# Chương 2: Mục tiêu thiết kế — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## 1. Tại sao cần quan tâm đến thiết kế cơ sở dữ liệu?

### Cám dỗ
Nhiều chương trình RDBMS cung cấp:
- Cơ sở dữ liệu mẫu để sao chép và sửa đổi
- Khả năng mượn bảng từ mẫu cho cơ sở dữ liệu khác
- Công cụ hướng dẫn định nghĩa và tạo bảng

### Hiểu biết quan trọng
- **Các công cụ này KHÔNG giúp bạn thiết kế** — chúng chỉ giúp tạo các bảng vật lý
- **Dùng công cụ SAU KHI đã tạo cấu trúc logic** — không phải trước
- Công cụ và mẫu RDBMS giảm thiểu **thời gian triển khai**, cho bạn thêm thời gian cho ứng dụng

### Lý do chính: Tính toàn vẹn dữ liệu
Thiết kế cơ sở dữ liệu **quan trọng** đối với:
- **Tính nhất quán** của dữ liệu
- **Tính toàn vẹn** của dữ liệu
- **Độ chính xác** của dữ liệu

**Hậu quả thiết kế sai:**
- Khó truy xuất một số loại thông tin
- Rủi ro tìm kiếm cho kết quả không chính xác
- **Thông tin không chính xác** là hậu quả tồi tệ nhất — ảnh hưởng đến lợi nhuận tổ chức

**Nguyên tắc:** Nếu cơ sở dữ liệu ảnh hưởng hoạt động kinh doanh hàng ngày hoặc định hướng tương lai, **bạn phải quan tâm thiết kế**.

### Ẩn dụ kiến trúc sư
- **Nhà thiết kế:** Trước thuê kiến trúc sư (thiết kế) → sau thuê thầu (xây dựng)
- **Kiến trúc sư** tạo bản vẽ cho kích thước, hình dạng, hệ thống kết cấu/cơ khí/điện
- **Thầu** chuẩn bị nhân công, vật liệu và xây theo thông số kỹ thuật

**Tương ứng cơ sở dữ liệu:**
- **Thiết kế logic** = Bản vẽ kiến trúc (mô tả kích thước, hình dạng, hệ thống; đáp ứng nhu cầu thông tin và vận hành)
- **Triển khai vật lý** = Ngôi nhà hoàn thành (bảng, mối quan hệ, tính toàn vẹn dữ liệu)
- **Ứng dụng** = Nội thất và trang thiết bị (tương tác với dữ liệu)

**Kết luận:** Triển khai thiết kế tốt cho thông tin chính xác, lưu trữ hiệu quả và dễ quản lý, bảo trì.

---

## 2. Tầm quan trọng của lý thuyết

### Định nghĩa lý thuyết (trong ngữ cảnh này)
"Các mệnh đề chung được dùng làm nguyên tắc" — **không phải** phỏng đoán hay đề xuất.

### Lý thuyết trong các ngành khác
- **Kỹ sư kết cấu** → Lý thuyết vật lý
- **Nhà soạn nhạc** → Lý thuyết âm nhạc
- **Ô tô/Hàng không** → Lý thuyết khí động học

### Lợi ích chính của lý thuyết
**Lý thuyết giúp dự đoán kết quả** — bạn có thể dự đoán điều gì sẽ xảy ra khi thực hiện hành động nhất định.

**Ví dụ:**
- Thả hòn đá → rơi xuống (Định luật Newton)
- Đặt đá phẳng lên đá phẳng → nằm nguyên (lý thuyết cho phép kim tự tháp, nhà thờ, tòa nhà)
- **Cơ sở dữ liệu:** Bảng liên quan → có thể lấy dữ liệu từ cả hai đồng thời dựa trên giá trị khớp của trường dùng chung (kết quả dự đoán được)

### Cơ sở dữ liệu quan hệ và toán học
- Dựa trên **lý thuyết tập hợp** và **logic vị từ bậc nhất**
- Nền tảng toán học này **đảm bảo thông tin chính xác**
- Cung cấp cơ sở cho phương pháp thiết kế tốt và khối xây dựng cho cấu trúc chắc chắn

### Bạn có cần biết toán không?
**Không.** Bạn không cần biết lý thuyết tập hợp hay logic vị từ để dùng cơ sở dữ liệu quan hệ — giống như không cần khí động học để lái xe. Lý thuyết cung cấp nền tảng; làm mô hình dự đoán được, đáng tin, chắc chắn. Lý thuyết mô tả khối xây dựng và hướng dẫn sắp xếp. **Sắp xếp khối xây dựng để đạt kết quả mong muốn = thiết kế.**

---

## 3. Lợi thế của việc học phương pháp thiết kế tốt

### Cách thay thế
Bạn có thể học bằng thử và sai — nhưng mất rất nhiều thời gian và phải sửa nhiều lỗi.

### Cách tốt nhất
Học một phương pháp thiết kế cơ sở dữ liệu tốt (như trong sách này) rồi thiết kế.

### Năm lợi ích của phương pháp tốt

| Lợi ích | Mô tả |
|---------|-------|
| **Kỹ năng cấu trúc chắc chắn** | Tránh dữ liệu trùng lặp, trùng bản, không hợp lệ, thiếu dữ liệu bắt buộc — tất cả tạo thông tin sai và làm truy vấn/báo cáo khó hiểu hoặc vô nghĩa |
| **Kỹ thuật có tổ chức** | Hướng dẫn từng bước; kỹ thuật có tổ chức cho phép quyết định sáng suốt mọi khía cạnh |
| **Giảm thiểu sai lầm** | Nhận ra lỗi và có công cụ sửa; tránh lặp lại các bước thiết kế không cần thiết |
| **Thiết kế dễ hơn, nhanh hơn** | Thử và sai thiếu logic và tổ chức — lãng phí thời gian quý báu |
| **Dùng RDBMS tốt hơn** | Hiểu tại sao RDBMS cung cấp công cụ nhất định và cách dùng để triển khai |

**Khuyến nghị:** Chọn phương pháp, học kỹ và dùng trung thành — dù là phương pháp trong sách hay phương pháp đã thiết lập khác.

---

## 4. Mục tiêu thiết kế tốt

Bạn phải đạt các mục tiêu này để thiết kế cấu trúc cơ sở dữ liệu chắc chắn. Luôn ghi nhớ trong suốt quá trình thiết kế.

| Mục tiêu | Mô tả |
|----------|-------|
| **Truy xuất thông tin** | Hỗ trợ cả truy xuất theo yêu cầu và ad hoc — lưu dữ liệu cho yêu cầu đã định nghĩa và truy vấn ad hoc có thể có |
| **Cấu trúc bảng đúng** | Mỗi bảng đại diện một chủ đề; gồm các trường tương đối phân biệt; dữ liệu trùng lặp tối thiểu; được xác định bởi trường có giá trị duy nhất |
| **Tính toàn vẹn dữ liệu** | Áp dụng ở cấp trường, bảng và mối quan hệ — đảm bảo cấu trúc và giá trị hợp lệ, chính xác mọi lúc |
| **Quy tắc nghiệp vụ** | Hỗ trợ quy tắc liên quan tổ chức; dữ liệu cung cấp thông tin kinh doanh hợp lệ, chính xác, có ý nghĩa |
| **Phát triển tương lai** | Cấu trúc dễ sửa đổi hoặc mở rộng khi nhu cầu thông tin thay đổi |

---

## 5. Lợi ích thiết kế tốt

Thời gian bỏ ra cho thiết kế là đầu tư đáng giá. Thiết kế tốt tiết kiệm thời gian dài hạn bằng cách tránh phải chỉnh sửa liên tục cấu trúc kém.

| Lợi ích | Mô tả |
|---------|-------|
| **Dễ sửa đổi và bảo trì** | Thay đổi trường, bảng hoặc mối quan hệ không cần ảnh hưởng tiêu cực đến phần khác |
| **Dễ sửa dữ liệu** | Thay đổi giá trị trường không ảnh hưởng trường khác; trường trùng tối thiểu nên thường chỉ sửa ở một chỗ |
| **Dễ truy xuất thông tin** | Truy vấn dễ vì bảng được xây dựng tốt và mối quan hệ thiết lập đúng; mối quan hệ giữa bảng rõ ràng |
| **Dễ phát triển ứng dụng** | Nhiều thời gian hơn cho lập trình và thao tác dữ liệu; ít cách xử lý tạm cho vấn đề thiết kế kém |

---

## 6. Các phương pháp thiết kế cơ sở dữ liệu

### Phương pháp truyền thống
Ba giai đoạn: **Phân tích yêu cầu** → **Mô hình hóa dữ liệu** → **Chuẩn hóa**

#### Giai đoạn 1: Phân tích yêu cầu
- Xem xét doanh nghiệp được mô hình hóa
- Phỏng vấn người dùng và quản lý
- Đánh giá hệ thống hiện tại và phân tích nhu cầu tương lai
- Đánh giá yêu cầu thông tin cho toàn bộ doanh nghiệp
- *(Quy trình thiết kế trong sách này theo hướng này)*

#### Giai đoạn 2: Mô hình hóa dữ liệu
- Mô hình hóa cấu trúc bằng phương pháp mô hình hóa dữ liệu
- **Các phương pháp:** Sơ đồ thực thể-quan hệ (ER), mô hình đối tượng ngữ nghĩa, mô hình vai trò đối tượng, mô hình UML
- Mỗi phương pháp cung cấp cách **biểu diễn trực quan** bảng, mối quan hệ, đặc điểm mối quan hệ
- **Sách này dùng:** Phiên bản cơ bản của sơ đồ ER (tích hợp vào quy trình thiết kế)
- Trong giai đoạn này: Định nghĩa trường, gán khóa chính, xác định/triển khai tính toàn vẹn, thiết lập mối quan hệ qua khóa ngoại

#### Giai đoạn 3: Chuẩn hóa
- **Định nghĩa:** Quá trình phân tách bảng lớn thành bảng nhỏ hơn để loại dữ liệu trùng lặp, trùng bản và tránh vấn đề chèn/cập nhật/xóa
- **Quy trình:** Kiểm tra cấu trúc bảng với các dạng chuẩn; sửa nếu có vấn đề
- **Dạng chuẩn:** Tập quy tắc cụ thể để kiểm tra cấu trúc bảng đảm bảo chắc chắn và không vấn đề
- **Các dạng chuẩn:** 1NF, 2NF, 3NF, 4NF, 5NF, 6NF, BCNF, DK/NF

### Phương pháp thiết kế trong sách này
- Tích hợp phân tích yêu cầu và sơ đồ ER đơn giản
- **KHÔNG tích hợp** quy trình chuẩn hóa truyền thống hay dạng chuẩn
- **Lý do:** Dạng chuẩn có thể gây nhầm lẫn cho người chưa học lý thuyết cơ sở dữ liệu quan hệ chính quy

**Ví dụ định nghĩa 3NF (kỹ thuật):** "Một quan hệ ở 3NF khi và chỉ khi ở 2NF và mọi thuộc tính không khóa không phụ thuộc bắc cầu vào khóa chính." — Khá vô nghĩa với người chưa quen thuộc thuật ngữ.

**Cùng ý tưởng, tiếng thường:** "Một bảng nên có trường xác định duy nhất mỗi bản ghi, và mỗi trường mô tả chủ đề mà bảng đại diện."

- Phương pháp được phát triển bằng cách chuyển kết quả dạng chuẩn thành hướng dẫn tiếng thường
- **Lợi ích chính:** Loại bỏ khía cạnh đáng sợ; chuẩn hóa minh bạch (tích hợp qua hướng dẫn trong suốt)
- **Lợi ích khác:** Rõ ràng, dễ triển khai — hướng dẫn viết bằng tiếng thường
- **Quan trọng:** Phương pháp tạo cấu trúc chuẩn hóa đầy đủ **chỉ khi tuân thủ trung thành** — không đường tắt, né tránh hay bỏ qua

---

## 7. Chuẩn hóa (Cách tiếp cận của tác giả)

### Vấn đề (Cuối thập niên 1980)
- Phương pháp truyền thống khó áp dụng
- Quy trình chuẩn hóa và lặp vô hạn là điểm đau

### Giải pháp
1. **Ý tưởng:** Bảng chuẩn hóa kỹ thì được thiết kế đúng và hiệu quả
2. **Câu hỏi 1:** Có thể xác định đặc điểm cụ thể của bảng đó và phát biểu thành thuộc tính của cấu trúc bảng lý tưởng?
3. **Câu hỏi 2:** Có thể dùng bảng lý tưởng làm mẫu cho mọi bảng tạo ra?
4. **Trả lời:** Có cho cả hai — do đó cách tiếp cận "bảng lý tưởng"

### Quy trình
- Soạn hướng dẫn từ đặc điểm cuối của cơ sở dữ liệu đã định nghĩa tốt, vượt qua từng dạng chuẩn
- Áp dụng hướng dẫn trong suốt quy trình thiết kế (tạo mới và sửa)
- Soạn hướng dẫn cho miền, kiểu con, mối quan hệ, tính toàn vẹn dữ liệu, tính toàn vẹn tham chiếu
- Kết quả: Chuẩn hóa minh bạch — tích hợp trong suốt qua hướng dẫn
- *(Xem Phụ lục G để giải thích chi tiết)*

---

## Câu hỏi ôn tập (Tự kiểm tra)

1. Khi nào là thời điểm tốt nhất để dùng công cụ thiết kế của RDBMS?
2. Đúng hay Sai: Thiết kế quan trọng đối với tính nhất quán, toàn vẹn và độ chính xác của dữ liệu.
3. Hậu quả tồi tệ nhất của thiết kế cơ sở dữ liệu không đúng là gì?
4. Yếu tố nào làm cơ sở dữ liệu quan hệ chắc chắn về cấu trúc và đảm bảo thông tin chính xác?
5. Nêu hai lợi ích của việc học phương pháp thiết kế.
6. Đúng hay Sai: Bạn sẽ dùng chương trình RDBMS hiệu quả hơn nếu hiểu thiết kế cơ sở dữ liệu.
7. Nêu hai mục tiêu của thiết kế tốt.
8. Điều gì giúp đảm bảo cấu trúc dữ liệu và giá trị hợp lệ, chính xác mọi lúc?
9. Nêu hai lợi ích của việc áp dụng kỹ thuật thiết kế tốt.
10. Đúng hay Sai: Bạn có thể đi tắt qua một số quy trình thiết kế và vẫn đạt thiết kế chắc chắn.

### Đáp án

1. **Sau khi thiết kế cấu trúc logic** của cơ sở dữ liệu.
2. **Đúng.** Thiết kế quan trọng đối với tính nhất quán, toàn vẹn và độ chính xác của dữ liệu.
3. **Thông tin không chính xác**.
4. Mô hình cơ sở dữ liệu quan hệ dựa trên **lý thuyết tập hợp và logic vị từ bậc nhất**.
5. Bất kỳ hai trong số: cho kỹ năng thiết kế cấu trúc chắc chắn; cung cấp kỹ thuật có tổ chức từng bước; giảm thiểu sai lầm và lặp lại; làm thiết kế dễ hơn và nhanh hơn; giúp dùng RDBMS đầy đủ và hiệu quả hơn.
6. **Đúng.** Hiểu thiết kế cơ sở dữ liệu giúp bạn dùng chương trình RDBMS hiệu quả hơn.
7. Bất kỳ hai trong số: hỗ trợ truy xuất theo yêu cầu và ad hoc; bảng cấu trúc đúng và hiệu quả; tính toàn vẹn ở cấp trường, bảng, mối quan hệ; hỗ trợ quy tắc nghiệp vụ; dễ phát triển tương lai.
8. **Tính toàn vẹn dữ liệu**.
9. Bất kỳ hai trong số: cấu trúc dễ sửa và bảo trì; dữ liệu dễ sửa; thông tin dễ truy xuất; ứng dụng dễ phát triển.
10. **Sai.** Bạn không thể đi tắt và vẫn đạt thiết kế chắc chắn.

---

## Liên kết với mục tiêu học tập

Sau khi học chương này, bạn cần có khả năng:
- **Hiểu hệ quản trị cơ sở dữ liệu:** Giải thích tại sao thiết kế quan trọng, vai trò của lý thuyết và giá trị của phương pháp
- **Thiết kế cơ sở dữ liệu quan hệ:** Diễn đạt mục tiêu và lợi ích thiết kế tốt, hiểu phương pháp truyền thống so với trong sách, đánh giá vai trò chuẩn hóa (không cần thuộc dạng chuẩn)

*Tiếp tục sang Chương 3: Thuật ngữ*
