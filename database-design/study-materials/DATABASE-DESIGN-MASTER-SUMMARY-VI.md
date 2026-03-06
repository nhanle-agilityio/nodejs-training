# Thiết kế Cơ sở dữ liệu — Tổng hợp Tổng quan

*Database Design for Mere Mortals®, Ấn bản Kỷ niệm 25 năm — Kiến thức cốt lõi & Quy trình Thực hành*

---

## Phần 1: Tổng hợp Kiến thức Cốt lõi

### 1.1 Tại sao Thiết kế CSDL Quan trọng

| Khái niệm | Điểm cốt yếu |
|-----------|--------------|
| **Thiết kế vs Triển khai** | Công cụ RDBMS giúp bạn *tạo* bảng—chúng **không** giúp bạn *thiết kế*. Thiết kế cấu trúc logic trước, triển khai sau. |
| **Toàn vẹn Dữ liệu** | Thiết kế đúng đảm bảo dữ liệu **nhất quán**, **hợp lệ** và **chính xác**. Thiết kế kém → thông tin sai lệch → quyết định tồi. |
| **Phép loại suy Kiến trúc sư** | Thiết kế logic = bản vẽ. Triển khai vật lý = xây dựng. Ứng dụng = nội thất/thiết bị. |

### 1.2 Mục tiêu của Thiết kế Tốt

1. **Truy xuất thông tin** — Hỗ trợ truy vấn theo yêu cầu và ad hoc
2. **Cấu trúc bảng đúng** — Một chủ đề mỗi bảng; dư thừa tối thiểu; định danh duy nhất
3. **Toàn vẹn dữ liệu** — Ở mức trường, bảng và quan hệ
4. **Quy tắc nghiệp vụ** — Ràng buộc của tổ chức được xây dựng vào cấu trúc
5. **Phát triển tương lai** — Dễ sửa đổi và mở rộng

### 1.3 Bốn Cấp độ Toàn vẹn Dữ liệu

| Cấp độ | Mục đích | Cách đạt được |
|--------|----------|---------------|
| **Mức trường** | Giá trị hợp lệ, nhất quán trong mỗi trường | Đặc tả trường; Các yếu tố của Trường Lý tưởng |
| **Mức bảng** | Mỗi bảng biểu diễn một chủ đề; không có bản ghi trùng lặp | Khóa; Các yếu tố của Bảng Lý tưởng |
| **Mức quan hệ** | Kết nối đáng tin cậy; thêm/sửa/xóa đúng | Khóa ngoại; quy tắc xóa; sự tham gia |
| **Quy tắc nghiệp vụ** | Ràng buộc của tổ chức | Bảng xác thực; đặc tả đã sửa; đặc tính quan hệ |

### 1.4 Các Yếu tố của Trường Lý tưởng

1. Biểu diễn một *đặc trưng riêng biệt* của chủ đề bảng
2. Chỉ chứa *một giá trị* (không đa giá trị)
3. *Không thể tách nhỏ thêm* (không đa thành phần)
4. *Không* chứa giá trị tính toán hoặc nối chuỗi
5. *Duy nhất* trong toàn bộ cấu trúc CSDL
6. *Giữ lại* hầu hết đặc tính khi dùng làm khóa ngoại

### 1.5 Các Yếu tố của Bảng Lý tưởng

1. Biểu diễn *một chủ đề duy nhất* (đối tượng hoặc sự kiện)
2. Có *khóa chính*
3. Không có trường đa thành phần hoặc đa giá trị
4. Không có trường tính toán
5. Không có trường trùng lặp không cần thiết
6. Dữ liệu dư thừa *tối thiểu*

### 1.6 Các Loại Quan hệ & Cách Thiết lập

| Loại | Định nghĩa | Cách thiết lập |
|------|-------------|----------------|
| **1:1** | Một bản ghi trong A ↔ một trong B | Sao chép PK cha vào con làm FK (thường FK = PK con trong tập con) |
| **1:N** | Một trong A ↔ nhiều trong B; một trong B ↔ một trong A | Sao chép PK từ phía "một" vào phía "nhiều" làm FK |
| **M:N** | Một trong A ↔ nhiều trong B; một trong B ↔ nhiều trong A | Tạo **bảng liên kết** với cả hai PK làm PK ghép + FK |

**Quy tắc:** M:N được phân giải thành *hai quan hệ 1:N* qua bảng liên kết.

### 1.7 Các Yếu tố của Khóa ngoại

1. Cùng tên với khóa chính cha (ngoại lệ: tự tham chiếu)
2. Bản sao của đặc tả trường cha (có điều chỉnh)
3. Lấy giá trị chỉ từ khóa chính cha

### 1.8 Nguyên tắc Thiết kế Cốt lõi

- **Một chủ đề mỗi bảng** — Không bao giờ trộn nhiều chủ đề
- **Không có trường tính toán trong bảng** — Dùng view hoặc logic ứng dụng
- **Không có trường đa giá trị** — Giải quyết bằng cách tạo bảng mới
- **Luôn hoàn thành quy trình đầy đủ** — Không đi tắt
- **Phỏng vấn người dùng và quản lý** — Ở mọi giai đoạn chính
- **Thiết kế logic trước, RDBMS sau** — Đừng để phần mềm chi phối cấu trúc

### 1.9 Cần Tránh

| Phản mẫu | Vấn đề | Giải pháp |
|----------|--------|-----------|
| **Thiết kế dạng flat-file** | Mọi thứ trong một bảng; trường đa thành phần, tính toán, trùng lặp | Chạy qua quy trình thiết kế đầy đủ |
| **Spreadsheet thay CSDL** | Sai công cụ; trùng lặp/đa thành phần/đa giá trị | Thiết kế đúng; triển khai trong RDBMS |
| **Thiết kế chi phối bởi RDBMS** | Phần mềm chi phối cấu trúc; không nguyên tắc | Thiết kế cấu trúc logic trước; chọn RDBMS sau |

---

## Phần 2: Quy trình Thiết kế CSDL Chuẩn

Quy trình thực hành từng bước cho mọi tác vụ thiết kế CSDL.

### Giai đoạn 1: Xác định Tuyên bố Sứ mệnh & Mục tiêu — Câu hỏi & Trả lời

**Về Tuyên bố Sứ mệnh**

| # | Câu hỏi | Câu trả lời |
|---|---------|-------------|
| 1 | Ai tham gia xác định tuyên bố sứ mệnh? | Người phát triển, chủ sở hữu/người quản lý CSDL (hoặc người được chỉ định). |
| 2 | Làm sao xác định tuyên bố sứ mệnh? | Phỏng vấn chủ sở hữu/quản lý với câu hỏi mở; tìm hiểu tổ chức; chuyển nhu cầu thành một câu mô tả mục đích. |
| 3 | Câu hỏi mẫu khi phỏng vấn? | "Mục đích tổ chức với khách hàng mới?", "Chức năng chính?", "Lý do quan trọng nhất tổ chức tồn tại?", "Trọng tâm chính?". |
| 4 | Khi nào tuyên bố sứ mệnh hoàn thành? | Khi có một câu mô tả mục đích cụ thể và được mọi người liên quan hiểu và đồng ý. |
| 5 | Đặc điểm tuyên bố sứ mệnh tốt? | Không mơ hồ; ngắn gọn, đúng trọng tâm; không chứa cụm mô tả công việc cụ thể (để cho mục tiêu sứ mệnh). |

**Về Mục tiêu Sứ mệnh**

| # | Câu hỏi | Câu trả lời |
|---|---------|-------------|
| 6 | Ai tham gia xác định mục tiêu sứ mệnh? | Người phát triển, quản lý và người dùng cuối. Nên phỏng vấn riêng hai nhóm. |
| 7 | Mục tiêu sứ mệnh là gì? | Phát biểu đại diện một công việc chung được dữ liệu trong CSDL hỗ trợ. Mỗi mục tiêu = một công việc. |
| 8 | Làm sao thu thập mục tiêu sứ mệnh? | Phỏng vấn với câu hỏi mở về công việc hàng ngày; ghi phản hồi dưới dạng câu khẳng định; tìm thông tin ngầm "giữa các dòng". |
| 9 | Câu hỏi mẫu khi phỏng vấn? | "Công việc hàng ngày?", "Làm việc với dữ liệu gì?", "Tạo báo cáo gì?", "Theo dõi những gì?", "Mô tả loại công việc?". |
| 10 | Nếu phản hồi chứa nhiều công việc? | Tách thành từng mục tiêu riêng — mỗi mục tiêu chỉ mô tả một công việc. |
| 11 | Khi nào mục tiêu sứ mệnh hoàn thành? | Khi được định nghĩa đúng và tốt; có ý nghĩa với bạn và bên liên quan; nắm được thông tin rõ ràng và ngầm từ phản hồi. |

**Kết luận chung**

> Phỏng vấn chủ sở hữu/quản lý → tìm hiểu tổ chức & mục đích → **Tuyên bố sứ mệnh** (1 câu).  
> Phỏng vấn người dùng & quản lý → xác định công việc & báo cáo → **Mục tiêu sứ mệnh** (mỗi công việc = 1 mục tiêu).  
> Luôn tinh chỉnh với phản hồi trước khi chuyển sang giai đoạn tiếp theo.

---

```
┌─────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 1: ĐỊNH NGHĨA MỤC ĐÍCH & PHẠM VI                      │
├─────────────────────────────────────────────────────────────────┤
│  1.1 Tuyên bố Sứ mệnh  →  "Mục đích của CSDL này là…"             │
│  1.2 Mục tiêu Sứ mệnh  →  "Theo dõi X; Tạo Y; Quản lý Z…"        │
│  1.3 Phỏng vấn người dùng & quản lý; tinh chỉnh với phản hồi     │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 2: THU THẬP & TINH CHỈNH YÊU CẦU DỮ LIỆU              │
├─────────────────────────────────────────────────────────────────┤
│  2.1 Xem xét hệ thống hiện tại (DB, giấy tờ, bảng tính)          │
│  2.2 Tiến hành phỏng vấn → xác định trường & chủ đề               │
│  2.3 Biên soạn Danh sách Trường Sơ bộ                            │
│  2.4 Loại trường tính toán → đưa vào danh sách riêng              │
│  2.5 Gửi danh sách tinh chỉnh để rà soát; tích hợp phản hồi       │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 3: ĐỊNH NGHĨA BẢNG & TRƯỜNG                          │
├─────────────────────────────────────────────────────────────────┤
│  3.1 Xác định chủ đề → Danh sách Bảng Sơ bộ                       │
│      • Từ danh sách trường (trường "ám chỉ" chủ đề)               │
│      • Từ danh sách chủ đề (phỏng vấn)                            │
│      • Từ mục tiêu sứ mệnh                                        │
│  3.2 Gộp & giải quyết trùng lặp; tạo Danh sách Bảng Cuối cùng     │
│  3.3 Gán trường từ danh sách trường vào mỗi bảng                  │
│  3.4 Tinh chỉnh trường:                                           │
│      • Giải quyết đa thành phần → tách thành trường nguyên tố     │
│      • Giải quyết đa giá trị → bảng mới + quan hệ                 │
│      • Loại trường không biểu diễn chủ đề bảng                    │
│  3.5 Rà soát cấu trúc bảng (Các yếu tố của Bảng Lý tưởng)        │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 4: THIẾT LẬP KHÓA                                      │
├─────────────────────────────────────────────────────────────────┤
│  4.1 Xác định khóa ứng viên cho mỗi bảng                          │
│      • Phải định danh duy nhất mỗi bản ghi                        │
│      • Phải tuân theo Các yếu tố của Khóa Ứng viên                │
│  4.2 Tạo khóa nhân tạo nếu không có ứng viên tự nhiên              │
│  4.3 Chọn khóa chính từ ứng viên (ưu tiên đơn giản)               │
│  4.4 Kiểm tra: PK phải độc quyền định danh mọi giá trị trường     │
│      → Loại trường không định danh                                 │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 5: ĐỊNH NGHĨA ĐẶC TẢ TRƯỜNG                          │
├─────────────────────────────────────────────────────────────────┤
│  5.1 Với mỗi trường: định nghĩa kiểu dữ liệu, độ dài, hỗ trợ null │
│  5.2 Định nghĩa yếu tố logic: phạm vi, quy tắc chỉnh sửa, giá trị bắt buộc │
│  5.3 Phỏng vấn người dùng để xác thực và hoàn thiện đặc tả        │
│  5.4 Ghi chép trên bảng Đặc tả Trường                             │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 6: THIẾT LẬP QUAN HỆ                                  │
├─────────────────────────────────────────────────────────────────┤
│  6.1 Tạo ma trận bảng; xác định quan hệ (1:1, 1:N, M:N)          │
│  6.2 Với 1:1 & 1:N: sao chép PK cha vào con làm FK               │
│  6.3 Với M:N: tạo bảng liên kết với PK ghép                       │
│  6.4 Tinh chỉnh tất cả FK (tên, đặc tả, giá trị từ cha)          │
│  6.5 Thiết lập đặc tính quan hệ:                                  │
│      • Quy tắc xóa (Restrict, Cascade, Nullify, v.v.)              │
│      • Loại tham gia (Bắt buộc/Tùy chọn)                          │
│      • Mức độ tham gia (min, max)                                 │
│  6.6 Rà soát lại cấu trúc bảng                                     │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 7: ĐỊNH NGHĨA QUY TẮC NGHIỆP VỤ                       │
├─────────────────────────────────────────────────────────────────┤
│  7.1 Phỏng vấn người dùng & quản lý → xác định ràng buộc          │
│  7.2 Theo trường: sửa đặc tả trường (Phạm vi, Bắt buộc, v.v.)    │
│  7.3 Theo quan hệ: sửa tham gia, xóa                              │
│  7.4 Tạo bảng xác thực cho tập giá trị hữu hạn                    │
│  7.5 Ghi chép mỗi quy tắc trên bảng Đặc tả Quy tắc Nghiệp vụ     │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 8: ĐỊNH NGHĨA VIEW                                    │
├─────────────────────────────────────────────────────────────────┤
│  8.1 Xác định view cần thiết (báo cáo, truy cập đa bảng, bảo mật) │
│  8.2 Định nghĩa view dữ liệu, tổng hợp, xác thực                  │
│  8.3 Thêm trường tính toán và bộ lọc khi cần                      │
│  8.4 Ghi chép mỗi view trên bảng Đặc tả View                      │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 9: RÀ SOÁT & TỔNG HỢP                                 │
├─────────────────────────────────────────────────────────────────┤
│  9.1 Rà soát cuối: toàn vẹn bảng, trường, quan hệ, quy tắc nghiệp vụ │
│  9.2 Tổng hợp toàn bộ tài liệu                                    │
│  9.3 Sẵn sàng cho triển khai vật lý trong RDBMS                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phần 3: Ví dụ Thực hành — Đơn hàng Hiệu sách Nhỏ

**Tình huống:** Một hiệu sách nhỏ muốn theo dõi khách hàng, đơn hàng của họ và sản phẩm bán ra. Đi qua quy trình từng bước.

---

### Bước 1: Yêu cầu → Tuyên bố Sứ mệnh & Mục tiêu

**Phỏng vấn tiết lộ:**
- Cửa hàng bán sách và hàng hóa
- Khách hàng đặt hàng (trực tiếp hoặc trực tuyến)
- Mỗi đơn có thể có nhiều mặt hàng; mỗi sản phẩm có thể xuất hiện trong nhiều đơn
- Cần báo cáo: doanh số theo sản phẩm, đơn theo khách hàng, doanh thu theo tháng

**Tuyên bố Sứ mệnh:**
> *"Mục đích của CSDL này là quản lý thông tin khách hàng, theo dõi tồn kho sản phẩm và ghi nhận đơn hàng bán cho một hiệu sách nhỏ."*

**Mục tiêu Sứ mệnh:**
1. Theo dõi thông tin liên hệ và lịch sử đơn hàng của khách hàng
2. Duy trì danh mục sản phẩm với danh mục và giá
3. Ghi nhận đơn hàng với dòng chi tiết (sản phẩm, số lượng, giá tại thời điểm bán)
4. Hỗ trợ báo cáo doanh số theo khách hàng, sản phẩm và khoảng thời gian

---

### Bước 2: Yêu cầu Dữ liệu → Danh sách Trường Sơ bộ

**Từ biểu mẫu, bảng tính và phỏng vấn:**

| Dữ liệu Thô | Ghi chú |
|-------------|---------|
| Tên khách hàng, email, điện thoại, địa chỉ | Thông tin khách hàng |
| Số đơn, ngày đơn, khách hàng | Thông tin đơn |
| Tên sản phẩm, danh mục, giá hiện tại | Thông tin sản phẩm |
| Số lượng đặt, đơn giá | Theo dòng đơn |
| Tổng đơn hàng | **Tính toán** — loại; dùng trong view |
| Tên danh mục | Chủ đề riêng? |

**Danh sách Trường Sơ bộ (đã tinh chỉnh):**
- CUSTOMER ID, CUSTFIRST NAME, CUSTLAST NAME, CUSTEMAIL, CUSTPHONE, CUSTADDRESS, CUSTCITY, CUSTSTATE, CUSTZIP
- ORDER NUMBER, ORDER DATE, CUSTOMER (tham chiếu: ai đặt)
- PRODUCT NUMBER, PRODUCT NAME, CATEGORY, CURRENT PRICE
- QUANTITY ORDERED, UNIT PRICE (theo dòng)

**Chủ đề xác định:** Customers, Orders, Products, Categories

---

### Bước 3: Thực thể → Bảng & Trường

**Danh sách Bảng Sơ bộ (đã gộp & giải quyết):**
- CUSTOMERS
- ORDERS
- PRODUCTS
- CATEGORIES (xác thực—danh sách hữu hạn)

**Gán trường; tinh chỉnh:**

| Bảng | Trường | Tinh chỉnh |
|------|--------|------------|
| **CUSTOMERS** | CUSTOMER ID, CUSTFIRST NAME, CUSTLAST NAME, CUSTEMAIL, CUSTPHONE, CUSTADDRESS, CUSTCITY, CUSTSTATE, CUSTZIP | CUSTADDRESS đa thành phần? → CUSTSTREET, CUSTCITY, CUSTSTATE, CUSTZIP |
| **ORDERS** | ORDER NUMBER, ORDER DATE, CUSTOMER ID | CUSTOMER ID liên kết với CUSTOMERS |
| **PRODUCTS** | PRODUCT NUMBER, PRODUCT NAME, CATEGORY ID, CURRENT PRICE | CATEGORY ID liên kết với CATEGORIES |
| **CATEGORIES** | CATEGORY ID, CATEGORY NAME | Bảng xác thực |
| **ORDER DETAILS** | ORDER NUMBER, PRODUCT NUMBER, QUANTITY ORDERED, UNIT PRICE | Bảng liên kết cho Orders ↔ Products |

**Vì sao ORDER DETAILS?** Một đơn có nhiều sản phẩm; một sản phẩm xuất hiện trong nhiều đơn → **M:N**. Giải quyết bằng bảng liên kết.

**Danh sách Bảng Cuối cùng:**

| Bảng | Loại | Mô tả |
|------|------|-------|
| CUSTOMERS | Dữ liệu | Người mua hàng tại hiệu sách |
| ORDERS | Dữ liệu | Giao dịch bán lẻ |
| PRODUCTS | Dữ liệu | Mặt hàng có sẵn để bán |
| CATEGORIES | Xác thực | Danh mục sản phẩm (Hư cấu, Phi hư cấu, v.v.) |
| ORDER DETAILS | Liên kết | Dòng chi tiết liên kết đơn với sản phẩm |

---

### Bước 4: Khóa

| Bảng | Khóa Ứng viên | Khóa Chính |
|------|---------------|------------|
| CUSTOMERS | CUSTOMER ID | CUSTOMER ID |
| ORDERS | ORDER NUMBER | ORDER NUMBER |
| PRODUCTS | PRODUCT NUMBER | PRODUCT NUMBER |
| CATEGORIES | CATEGORY ID | CATEGORY ID |
| ORDER DETAILS | (ORDER NUMBER + PRODUCT NUMBER) | Ghép: ORDER NUMBER, PRODUCT NUMBER |

**Kiểm tra:** Với ORDER DETAILS, (ORDER NUMBER, PRODUCT NUMBER) có độc quyền định danh QUANTITY ORDERED và UNIT PRICE không? Có. ✓

---

### Bước 5: Quan hệ

**Ma trận quan hệ (đơn giản hóa):**

| Từ \ Đến | CUSTOMERS | ORDERS | PRODUCTS | CATEGORIES |
|----------|-----------|--------|----------|------------|
| CUSTOMERS | — | 1:N | — | — |
| ORDERS | 1:N | — | M:N | — |
| PRODUCTS | — | M:N | — | 1:N |
| CATEGORIES | — | — | 1:N | — |

**Thiết lập:**
1. **CUSTOMERS ↔ ORDERS (1:N):** Thêm CUSTOMER ID (FK) vào ORDERS
2. **ORDERS ↔ PRODUCTS (M:N):** ORDER DETAILS đã có ORDER NUMBER + PRODUCT NUMBER làm PK ghép; mỗi cái là FK
3. **CATEGORIES ↔ PRODUCTS (1:N):** Thêm CATEGORY ID (FK) vào PRODUCTS

**Đặc tính quan hệ (ví dụ):**
- ORDERS.CUSTOMER ID: Bắt buộc; Xóa = Restrict (không thể xóa khách có đơn)
- ORDER DETAILS: Cả hai FK bắt buộc; Xóa = Cascade từ ORDER (xóa đơn → xóa dòng của nó)

---

### Bước 6: Kiểm tra Chuẩn hóa (Các yếu tố của Bảng Lý tưởng)

| Kiểm tra | Kết quả |
|----------|---------|
| Một chủ đề mỗi bảng? | ✓ Mỗi bảng có một chủ đề duy nhất |
| Khóa chính? | ✓ Tất cả bảng có PK |
| Không đa thành phần/đa giá trị? | ✓ Đã giải quyết khi tinh chỉnh |
| Không có trường tính toán? | ✓ Tổng đơn trong view, không trong bảng |
| Không trùng lặp không cần thiết? | ✓ |
| Dư thừa tối thiểu? | ✓ UNIT PRICE trong ORDER DETAILS là có chủ đích (giá tại lúc bán)—không dư thừa với CURRENT PRICE |

---

### Bước 7: Quy tắc Nghiệp vụ (Ví dụ)

**Từ phỏng vấn:**
1. *"Chúng ta phải có email cho mọi khách hàng."* → CUSTEMAIL: Giá trị Bắt buộc = Có, Hỗ trợ Null = Không Null
2. *"Đơn giá trong đơn phải khớp giá sản phẩm tại thời điểm đặt."* → Mức ứng dụng; ghi chép để triển khai
3. *"Danh mục phải từ danh sách phê duyệt của chúng ta."* → Bảng xác thực CATEGORIES; PRODUCTS.CATEGORY ID FK

---

### Bước 8: Sơ đồ Cuối cùng (Logic)

```
CUSTOMERS
├── CUSTOMER ID (PK)
├── CUSTFIRST NAME
├── CUSTLAST NAME
├── CUSTEMAIL
├── CUSTPHONE
├── CUSTSTREET
├── CUSTCITY
├── CUSTSTATE
└── CUSTZIP

ORDERS
├── ORDER NUMBER (PK)
├── ORDER DATE
└── CUSTOMER ID (FK → CUSTOMERS)

PRODUCTS
├── PRODUCT NUMBER (PK)
├── PRODUCT NAME
├── CURRENT PRICE
└── CATEGORY ID (FK → CATEGORIES)

CATEGORIES
├── CATEGORY ID (PK)
└── CATEGORY NAME

ORDER DETAILS
├── ORDER NUMBER (PK, FK → ORDERS)
├── PRODUCT NUMBER (PK, FK → PRODUCTS)
├── QUANTITY ORDERED
└── UNIT PRICE
```

**View mẫu:** `ORDER SUMMARY` — Đơn hàng với tên khách hàng, tổng đơn (Tổng QUANTITY × UNIT PRICE theo đơn)

---

## Tổng kết: Từ Yêu cầu đến Sơ đồ

| Giai đoạn | Đầu vào | Đầu ra | Câu hỏi Cốt yếu |
|-----------|---------|--------|-----------------|
| **Yêu cầu** | Phỏng vấn, biểu mẫu, báo cáo | Tuyên bố sứ mệnh, mục tiêu | *Mục đích là gì? Công việc gì?* |
| **Dữ liệu** | Rà soát hệ thống hiện tại | Danh sách trường, danh sách chủ đề | *Dữ liệu gì tồn tại? Cần gì?* |
| **Thực thể** | Danh sách trường + chủ đề | Bảng với trường được gán | *Ta theo dõi chủ đề gì?* |
| **Tinh chỉnh** | Bảng + trường | Không đa thành phần/đa giá trị; một chủ đề | *Mỗi trường có thuộc về không?* |
| **Khóa** | Bảng | Khóa chính; khóa ứng viên | *Gì định danh duy nhất mỗi dòng?* |
| **Quan hệ** | Bảng + logic | Vị trí FK; bảng liên kết | *Bảng kết nối thế nào? 1:1, 1:N, M:N?* |
| **Quy tắc nghiệp vụ** | Phỏng vấn | Đặc tả đã sửa; bảng xác thực | *Tổ chức cần ràng buộc gì?* |
| **View** | Nhu cầu người dùng | Định nghĩa view | *Người dùng truy cập dữ liệu thế nào?* |
| **Cuối cùng** | Tất cả trên | Tài liệu hoàn chỉnh | *Sẵn sàng triển khai?* |

---

*Dùng tài liệu tổng hợp này làm tài liệu tham khảo nhanh và quy trình làm danh sách kiểm tra khi bắt đầu bất kỳ tác vụ thiết kế CSDL nào.*
