# Chương 1: Cơ sở dữ liệu quan hệ — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## 1. Cơ sở dữ liệu là gì?

### Định nghĩa
**Cơ sở dữ liệu** là một tập hợp dữ liệu có tổ chức, được sử dụng nhằm mô hình hóa một loại tổ chức hoặc quy trình tổ chức nào đó. Không quan trọng bạn dùng bảng tính hay chương trình ứng dụng cơ sở dữ liệu—chỉ cần bạn thu thập dữ liệu theo cách có tổ chức cho một mục đích cụ thể, bạn đã có một cơ sở dữ liệu.

### Hai loại cơ sở dữ liệu trong quản trị cơ sở dữ liệu

#### Cơ sở dữ liệu vận hành (Operational Databases)
- **Mục đích:** Trụ cột của nhiều công ty, tổ chức và cơ sở trên toàn thế giới
- **Sử dụng chính:** Các tình huống Xử lý giao dịch trực tuyến (OLTP)
- **Bối cảnh:** Các tình huống cần thu thập, sửa đổi và duy trì dữ liệu hàng ngày
- **Loại dữ liệu:** **Dữ liệu động** — thay đổi liên tục và luôn phản ánh thông tin cập nhật theo thời gian thực
- **Ví dụ người dùng:** Cửa hàng bán lẻ, công ty sản xuất, bệnh viện và phòng khám, nhà xuất bản
- **Lý do:** Dữ liệu của họ luôn trong trạng thái thay đổi liên tục

#### Cơ sở dữ liệu phân tích (Analytical Databases)
- **Mục đích:** Lưu trữ và theo dõi dữ liệu lịch sử và phụ thuộc thời gian
- **Sử dụng chính:** Các tình huống Xử lý phân tích trực tuyến (OLAP)
- **Bối cảnh:** Cần theo dõi xu hướng, xem dữ liệu thống kê trong thời gian dài, đưa ra dự báo chiến thuật hoặc chiến lược kinh doanh
- **Loại dữ liệu:** **Dữ liệu tĩnh** — không bao giờ (hoặc rất hiếm khi) được sửa đổi
- **Thông tin:** Phản ánh ảnh chụp dữ liệu tại một thời điểm
- **Ví dụ người dùng:** Phòng thí nghiệm hóa học, công ty địa chất, công ty phân tích tiếp thị
- **Lưu ý:** Thường dùng dữ liệu từ cơ sở dữ liệu vận hành làm nguồn dữ liệu chính

**Phân biệt quan trọng:** Cơ sở dữ liệu vận hành và phân tích phục vụ nhu cầu xử lý dữ liệu rất khác nhau. Việc tạo cấu trúc của chúng đòi hỏi phương pháp thiết kế hoàn toàn khác biệt. **Sách này tập trung vào thiết kế cơ sở dữ liệu vận hành** vì đây vẫn là loại phổ biến nhất trên thế giới hiện nay.

---

## 2. Cơ sở dữ liệu quan hệ

### Lịch sử và nguồn gốc
- **Ra đời:** 1969
- **Người sáng lập:** Tiến sĩ Edgar F. Codd (nhà khoa học nghiên cứu IBM, cuối thập niên 1960)
- **Bối cảnh:** Dr. Codd không hài lòng với các mô hình và sản phẩm cơ sở dữ liệu đương thời
- **Cách tiếp cận:** Áp dụng các nguyên tắc và cấu trúc toán học để giải quyết vấn đề
- **Các vấn đề giải quyết:** Trùng lặp dữ liệu, tính toàn vẹn dữ liệu yếu, phụ thuộc quá mức vào triển khai vật lý
- **Công bố quan trọng:** "A Relational Model of Data for Large Shared Databanks" (Tháng 6 năm 1970)

### Nền tảng toán học
Mô hình quan hệ dựa trên hai nhánh toán học:
1. **Lý thuyết tập hợp**
2. **Logic vị từ bậc nhất**

**Lưu ý về thuật ngữ:** Tên "relational" (quan hệ) xuất phát từ thuật ngữ toán học **relation** (quan hệ trong lý thuyết tập hợp), **không phải** từ việc các bảng có thể liên quan với nhau—đây là quan niệm sai phổ biến.

### Cấu trúc cốt lõi
- **Relations** → Người dùng nhận thức là **bảng (tables)**
- **Tuples** → **Bản ghi (records)** (hàng)
- **Attributes** → **Trường (fields)** (cột)

### Hai đặc điểm quan trọng
1. **Thứ tự vật lý không quan trọng:** Thứ tự vật lý của bản ghi hoặc trường trong bảng hoàn toàn không liên quan
2. **Định danh duy nhất:** Mỗi bản ghi được xác định bằng một trường chứa giá trị duy nhất

Các đặc điểm này cho phép dữ liệu tồn tại **độc lập với cách lưu trữ vật lý**. Người dùng không cần biết vị trí vật lý của bản ghi để truy xuất dữ liệu.

### Các mối quan hệ
Mô hình quan hệ phân loại các mối quan hệ thành:
- **Một-một**
- **Một-nhiều**
- **Nhiều-nhiều**

Thiết lập mối quan hệ: Mối quan hệ giữa một cặp bảng được thiết lập **ngầm định** thông qua **các giá trị khớp nhau của một trường dùng chung**.

**Ví dụ:** Bảng CLIENTS và AGENTS có mối quan hệ một-nhiều qua trường AGENT ID. Một đại lý cụ thể được liên kết với một hoặc nhiều khách hàng thông qua các giá trị AGENT ID khớp nhau.

**Truy cập dữ liệu:** Người dùng quen thuộc với mối quan hệ giữa các bảng có thể truy cập dữ liệu theo gần như vô số cách—từ các bảng liên quan trực tiếp và các bảng liên quan gián tiếp (qua chuỗi mối quan hệ).

---

## 3. Truy xuất dữ liệu

### SQL (Ngôn ngữ truy vấn có cấu trúc)
- **Vai trò:** Ngôn ngữ chuẩn dùng để tạo, sửa đổi, duy trì và truy vấn cơ sở dữ liệu quan hệ
- **Phạm vi:** Trực tiếp liên quan đến mô hình cơ sở dữ liệu quan hệ

### Ba thành phần của truy vấn SQL cơ bản
1. **Lệnh SELECT…FROM**
   - SELECT: Chỉ định các trường cần hiển thị
   - FROM: Chỉ định bảng (các bảng) chứa các trường đó
2. **Mệnh đề WHERE** — Lọc bản ghi bằng cách áp dụng tiêu chí lên một hoặc nhiều trường
3. **Mệnh đề ORDER BY** — Sắp xếp kết quả theo thứ tự tăng dần hoặc giảm dần

### Triển khai trong phần mềm RDBMS
- Các chương trình RDBMS lớn tích hợp nhiều phiên bản SQL khác nhau
- Các tùy chọn từ: nhập SQL "thô" thủ công → trình xây dựng truy vấn → biểu mẫu truy vấn
- **Ví dụ:** Microsoft SQL Server cung cấp cửa sổ "Query Designer" để xây dựng truy vấn phức tạp
- Truy vấn có thể được lưu để sử dụng sau

**Lưu ý thực tế:** Bạn có thể không cần viết SQL nếu phần mềm cung cấp trình xây dựng truy vấn hoặc bạn dùng ứng dụng tùy chỉnh. Tuy nhiên, hiểu cơ bản về SQL giúp bạn:
- Hiểu và xử lý sự cố các truy vấn xây dựng bằng công cụ
- Làm việc hiệu quả với phần mềm cơ sở dữ liệu cấp cao (vd: Oracle, Microsoft SQL Server)

---

## 4. Ưu điểm của cơ sở dữ liệu quan hệ

| Ưu điểm | Mô tả |
|---------|-------|
| **Tính toàn vẹn đa cấp tích hợp sẵn** | Tính toàn vẹn dữ liệu ở cấp trường (độ chính xác), cấp bảng (không trùng lặp bản ghi, phát hiện khóa chính thiếu), cấp mối quan hệ (mối quan hệ hợp lệ), cấp nghiệp vụ (độ chính xác trong ngữ cảnh kinh doanh) |
| **Độc lập logic và vật lý với ứng dụng** | Thay đổi thiết kế logic hoặc triển khai vật lý của nhà cung cấp không cần ảnh hưởng tiêu cực đến ứng dụng xây dựng trên cơ sở dữ liệu |
| **Đảm bảo tính nhất quán và chính xác** | Các cấp độ toàn vẹn khác nhau đảm bảo dữ liệu nhất quán, chính xác |
| **Truy xuất dữ liệu dễ dàng** | Người dùng có thể truy xuất dữ liệu từ một bảng đơn hoặc từ bất kỳ số lượng bảng liên quan nào, cho phép gần như vô số cách xem thông tin |

### Ghi chú lịch sử về hiệu suất
- **Lo ngại trước đây:** Cơ sở dữ liệu quan hệ được cho là chạy chậm
- **Thực tế:** Lỗi không phải ở mô hình quan hệ mà ở công nghệ phụ trợ (tốc độ xử lý, bộ nhớ, lưu trữ không đủ)
- **Ngày nay:** Tiến bộ về phần cứng và phần mềm trong 50 năm đã làm hiệu suất phần lớn không còn đáng kể

---

## 5. Hệ quản trị cơ sở dữ liệu quan hệ (RDBMS)

### Định nghĩa
**RDBMS** là chương trình ứng dụng phần mềm dùng để:
- Tạo cơ sở dữ liệu quan hệ
- Duy trì cơ sở dữ liệu quan hệ
- Sửa đổi cơ sở dữ liệu quan hệ
- Thao tác cơ sở dữ liệu quan hệ

Nhiều chương trình RDBMS còn cung cấp công cụ để tạo ứng dụng cho người dùng cuối tương tác với dữ liệu lưu trữ.

### Yếu tố chất lượng
Chất lượng của RDBMS là hàm trực tiếp của **mức độ hỗ trợ mô hình cơ sở dữ liệu quan hệ**. Ngay cả trong số các RDBMS "thực sự", sự hỗ trợ cũng khác nhau giữa các nhà cung cấp. Chưa có triển khai đầy đủ tiềm năng của mô hình quan hệ.

### Ví dụ RDBMS
IBM DB2, IBM Informix, Microsoft Access, Microsoft SQL Server, MySQL, Oracle RDBMS, PostgreSQL, SAP SQL Anywhere, SAP Sybase ASE, SQLite

---

## 6. Tiếp theo là gì? (Tương lai của cơ sở dữ liệu quan hệ)

### Sự tiến hóa công nghệ
- Cơ sở dữ liệu quan hệ đã ~50 tuổi và vẫn là loại được sử dụng rộng rãi nhất
- Tiến bộ công nghệ (tốc độ xử lý, bộ nhớ, lưu trữ) đã:
  - Giảm vấn đề với truy vấn đa bảng và tạo báo cáo
  - Làm RDBMS mạnh mẽ và mở rộng hơn
  - Cho phép hỗ trợ tính toàn vẹn dữ liệu cao hơn

### Sự xuất hiện của hệ thống phi quan hệ
- **Động lực:** Nhu cầu lưu trữ dữ liệu không vừa khít với cấu trúc bảng/trường/bản ghi
- **Ví dụ loại dữ liệu đó:** Ảnh, dữ liệu chỉ đọc cho ứng dụng web, dữ liệu đồ thị, dữ liệu không gian địa lý, dữ liệu phân tích
- **Ví dụ phi quan hệ:** MongoDB, Couchbase, HBase, Cassandra, Redis

### Tại sao cơ sở dữ liệu quan hệ tồn tại lâu dài
1. **Phổ biến:** Được dùng khắp nơi—từ doanh nghiệp nhỏ đến hệ thống tập đoàn, máy để bàn đến thiết bị cá nhân
2. **Điểm mạnh:** Dễ sử dụng và bảo trì, tuyệt vời về tính toàn vẹn dữ liệu, cấu trúc chắc chắn (khi xây dựng đúng), có thể mở rộng
3. **Thị phần:** IDC dự báo >80% thị trường cơ sở dữ liệu vận hành đến năm 2022; Gartner dự báo ≥70% ứng dụng và dự án mới đến năm 2020
4. **Lưu ý thực tế:** Cơ sở dữ liệu quan hệ không "một kích thước vừa tất cả"—các mô hình khác phục vụ nhu cầu cụ thể

---

## Câu hỏi ôn tập (Tự kiểm tra)

1. Nêu hai loại cơ sở dữ liệu chính được sử dụng ngày nay.
2. Cơ sở dữ liệu phân tích lưu trữ loại dữ liệu gì?
3. Đúng hay Sai: Cơ sở dữ liệu vận hành được sử dụng chủ yếu trong các tình huống OLTP.
4. Nêu một trong các nhánh toán học mà mô hình quan hệ dựa trên.
5. Cơ sở dữ liệu quan hệ lưu trữ dữ liệu như thế nào?
6. Nêu ba loại mối quan hệ trong cơ sở dữ liệu quan hệ.
7. Bạn truy xuất dữ liệu trong cơ sở dữ liệu quan hệ như thế nào?
8. Nêu hai ưu điểm của cơ sở dữ liệu quan hệ.
9. Hệ quản trị cơ sở dữ liệu quan hệ là gì?
10. Đúng hay Sai: Thiết bị di động bị giới hạn bởi dung lượng gigabyte.
11. Nêu lý do tại sao các công ty phần mềm cơ sở dữ liệu gặp khó khăn khi triển khai cơ sở dữ liệu quan hệ.

### Đáp án

1. **Vận hành** và **phân tích**.
2. **Dữ liệu tĩnh**.
3. **Đúng.** Cơ sở dữ liệu vận hành được sử dụng chủ yếu trong các tình huống OLTP.
4. **Lý thuyết tập hợp** và **logic vị từ bậc nhất**.
5. Cơ sở dữ liệu quan hệ lưu trữ dữ liệu trong **quan hệ**, mà người dùng nhận thức là **bảng**.
6. **Một-một**, **một-nhiều** và **nhiều-nhiều**.
7. Bằng cách sử dụng **SQL** (Ngôn ngữ truy vấn có cấu trúc).
8. Bất kỳ hai trong số: tính toàn vẹn đa cấp tích hợp; độc lập logic và vật lý với ứng dụng; đảm bảo tính nhất quán và chính xác; truy xuất dễ dàng.
9. **RDBMS** là chương trình phần mềm dùng để tạo, duy trì, sửa đổi và thao tác cơ sở dữ liệu quan hệ.
10. **Sai.** Thiết bị di động có thể có dung lượng gigabyte hoặc terabyte.
11. Tốc độ xử lý, bộ nhớ và lưu trữ **không đủ** để cung cấp nền tảng cho các nhà cung cấp phần mềm xây dựng triển khai đầy đủ cơ sở dữ liệu quan hệ.

---

## Liên kết với mục tiêu học tập

Sau khi học chương này, bạn cần có khả năng:
- **Hiểu hệ quản trị cơ sở dữ liệu:** Định nghĩa cơ sở dữ liệu, phân biệt cơ sở dữ liệu vận hành và phân tích, giải thích RDBMS là gì
- **Thiết kế cơ sở dữ liệu quan hệ:** Hiểu nền tảng mô hình quan hệ (bảng, bản ghi, trường), cách mối quan hệ hoạt động, cách truy xuất dữ liệu qua SQL

*Tiếp tục sang Chương 2: Mục tiêu thiết kế*
