# Chương 4: Tổng quan khái niệm — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Mục đích chương này

Chương này cung cấp **tổng quan mức cao** về toàn bộ quy trình thiết kế cơ sở dữ liệu — cách hoạt động và các bước liên quan. Phương pháp thiết kế được gộp thành **bảy giai đoạn** để cho bạn bức tranh rõ ràng trước khi đi sâu từng kỹ thuật trong các chương sau.

**Ứng dụng phương pháp này:**
- Thiết kế cơ sở dữ liệu mới từ đầu
- Tinh chỉnh cơ sở dữ liệu hiện có
- Phân tích cơ sở dữ liệu hiện có để thiết kế mới dựa trên phân tích

**Lưu ý:** Cơ sở dữ liệu có thể được thiết kế bởi một người hoặc nhóm. Sách dùng "database developer" hoặc "developer" để chỉ người/nhóm thiết kế.

---

## Tầm quan trọng của việc hoàn thành quy trình thiết kế

### Không thể thương lượng: Quy trình đầy đủ

**Thông điệp chính:** Luôn **cần thiết** đi qua **toàn bộ** quy trình thiết kế — không ngoại lệ.

| Câu hỏi | Trả lời |
|---------|---------|
| Có cần đi qua toàn bộ quy trình không? | **Có.** |
| Còn với cơ sở dữ liệu "đơn giản"? | **Vẫn có.** ("Đơn giản" là một trong những từ nguy hiểm nhất cho database developer — không gì thực sự đơn giản.) |
| Kích thước, loại hay mục đích có quan trọng không? | **Không.** Giá trị của thiết kế đầy đủ độc lập với các yếu tố này. |

### Hậu quả thiết kế không hoàn chỉnh

- **Thiết kế kém** = Thiết kế không hoàn chỉnh. Tuân thủ một phần gần như tệ như không dùng quy trình.
- **Nhiều vấn đề cơ sở dữ liệu** bắt nguồn từ thiết kế kém.
- **Cấu trúc chắc chắn và tính toàn vẹn dữ liệu** chỉ có từ quy trình toàn vẹn, không rút gọn.

### Mối quan hệ tỷ lệ

> Mức độ tính toàn vẹn cấu trúc và dữ liệu trong cơ sở dữ liệu **tỷ lệ thuận trực tiếp** với mức độ bạn tuân theo quy trình thiết kế.

- **Ít thời gian cho thiết kế** → **Rủi ro cao hơn** vấn đề cơ sở dữ liệu
- Điều này vẫn đúng sau 25+ năm
- Quy trình kỹ lưỡng **giảm thiểu** (dù có thể không loại bỏ) vấn đề
- Cơ sở dữ liệu thiết kế tốt **dễ triển khai** trong RDBMS hơn cơ sở dữ liệu thiết kế kém

### Kiên nhẫn và tư duy đúng

- Cơ sở dữ liệu không khó thiết kế — chỉ cần thời gian thiết kế đúng cách
- Đừng đi tắt khi quy trình cảm giác dài
- **Trích dẫn:** *"Không bao giờ có thời gian làm đúng, nhưng luôn có thời gian làm lại!"*

---

## Bảy giai đoạn của quy trình thiết kế

### Giai đoạn 1: Định nghĩa Tuyên bố sứ mệnh và Mục tiêu sứ mệnh

**Mục đích:** Thiết lập trọng tâm và hướng đi cho cơ sở dữ liệu.

#### Tuyên bố sứ mệnh (Mission Statement)
- **Là gì:** Khai báo **mục đích** của cơ sở dữ liệu
- **Tại sao:** Đảm bảo cấu trúc phù hợp và thu thập đúng dữ liệu
- **Ai định nghĩa:** Developer + chủ sở hữu cơ sở dữ liệu + quản lý (người chịu trách nhiệm cuối cùng)
- **Mục đích điển hình:** Giải quyết vấn đề kinh doanh, quản lý giao dịch hàng ngày, hỗ trợ hệ thống thông tin

#### Mục tiêu sứ mệnh (Mission Objectives)
- **Là gì:** Các phát biểu đại diện **công việc chung** người dùng có thể thực hiện với dữ liệu
- **Tại sao:** Hỗ trợ tuyên bố sứ mệnh; giúp xác định khía cạnh cấu trúc cơ sở dữ liệu
- **Ai định nghĩa:** Developer + quản lý + **người dùng cuối**
- **Ví dụ:** "Theo dõi đơn hàng khách hàng," "Tạo báo cáo bán hàng hàng tháng," "Quản lý mức tồn kho"

---

### Giai đoạn 2: Phân tích cơ sở dữ liệu hiện tại

**Mục đích:** Hiểu cách tổ chức hiện đang sử dụng và quản lý dữ liệu. (Đây là tình huống phổ biến nhất — cơ sở dữ liệu hoặc hệ thống hiện có.)

#### Các loại "cơ sở dữ liệu" hiện tại
| Loại | Mô tả |
|------|-------|
| **Cơ sở dữ liệu kế thừa** (inherited) | Cơ sở dữ liệu tồn tại và sử dụng vài năm |
| **Cơ sở dữ liệu trên giấy** | Tập hợp biểu mẫu, thư mục hồ sơ, v.v. Nhiều tổ chức vẫn dùng giấy để thu thập dữ liệu. |

#### Các hoạt động phân tích
1. **Xem xét phương pháp thu thập dữ liệu** — Tổ chức thu thập dữ liệu thế nào? (Biểu mẫu giấy, ứng dụng máy tính, v.v.)
2. **Xem xét phương pháp trình bày dữ liệu** — Dữ liệu được trình bày thế nào? (Báo cáo, màn hình)
3. **Xem xét ứng dụng web** — Ứng dụng web hay Internet nào làm việc với cơ sở dữ liệu?
4. **Tiến hành phỏng vấn** với người dùng và quản lý:
   - **Người dùng:** Cách họ làm việc với cơ sở dữ liệu; **hiện tại** yêu cầu thông tin của họ
   - **Quản lý:** Thông tin họ nhận; nhận thức của họ về yêu cầu thông tin **tổng thể** cho tổ chức

**Quan trọng:** Câu hỏi bạn hỏi (hoặc không hỏi) sẽ **ảnh hưởng lớn** đến cấu trúc cuối cùng. Tiến hành phỏng vấn đầy đủ, hoàn chỉnh, kịp thời, thực tế và hiệu quả.

#### Kết quả
- **Danh sách trường ban đầu** — Soạn từ phân tích và phỏng vấn
- **Tinh chỉnh:** Loại trường tính toán; đặt vào danh sách riêng (dùng sau)
- **Danh sách tinh chỉnh** = **Yêu cầu dữ liệu cơ bản** của tổ chức = Điểm khởi đầu cho thiết kế mới
- **Rà soát:** Gửi danh sách cho người dùng và quản lý phản hồi; kết hợp đề xuất hợp lý, có cơ sở
- **Lưu ý:** Không gì thực sự cuối cùng — bạn sẽ mở rộng và tinh chỉnh danh sách trường thêm khi thiết kế phát triển

---

### Giai đoạn 3: Tạo cấu trúc dữ liệu

**Mục đích:** Định nghĩa bảng, trường, khóa và đặc tả trường.

#### Bước 1: Định nghĩa bảng
- **Nguồn:** Mục tiêu sứ mệnh (Giai đoạn 1) + yêu cầu dữ liệu (Giai đoạn 2)
- **Quy trình:** Xác định chủ đề cơ sở dữ liệu sẽ theo dõi → thiết lập thành bảng
- **Liên kết trường** từ danh sách trường (Giai đoạn 2) với mỗi bảng
- **Rà soát:** Mỗi bảng đại diện chỉ **một** chủ đề; không trùng trường

#### Bước 2: Tinh chỉnh trường
- Tinh chỉnh trường **đa phần** và **đa giá trị** để mỗi trường chỉ lưu **một giá trị**
- Di chuyển hoặc xóa trường **không** đại diện đặc điểm phân biệt của chủ đề bảng

#### Bước 3: Rà soát và tinh chỉnh cấu trúc bảng
- Kiểm tra lại công việc trường để không bỏ sót
- Đảm bảo mỗi cấu trúc bảng được định nghĩa đúng

#### Bước 4: Thiết lập khóa
- **Nhiệm vụ chính:** Mỗi bảng có **khóa chính** được định nghĩa đúng, xác định duy nhất mỗi bản ghi

#### Bước 5: Đặc tả trường
- Tiến hành phỏng vấn người dùng và quản lý để xác định **đặc điểm trường cụ thể** quan trọng với họ
- Rà soát/thảo luận đặc điểm họ có thể chưa quen
- Định nghĩa và ghi chép **đặc tả trường cho mỗi trường** trong cơ sở dữ liệu
- Hoàn thành mọi tinh chỉnh xác định trong rà soát

**Đầu ra:** Cấu trúc bảng sẵn sàng cho Giai đoạn 4 (mối quan hệ)

---

### Giai đoạn 4: Xác định và Thiết lập mối quan hệ giữa bảng

**Mục đích:** Thiết lập kết nối logic giữa bảng; đặt đặc điểm mối quan hệ.

#### Quy trình
1. **Tiến hành phỏng vấn** với người dùng và quản lý lần nữa
2. **Xác định mối quan hệ** — Người dùng và quản lý có thể giúp; bạn không thể biết mọi khía cạnh dữ liệu tổ chức
3. **Thiết lập kết nối logic** cho mỗi mối quan hệ:
   - Qua **khóa chính và khóa ngoại** (cho 1:1, 1:N), hoặc
   - Qua **bảng liên kết** (cho M:N)
4. **Xác định tham gia:**
   - **Loại tham gia** (bắt buộc hoặc tùy chọn)
   - **Mức độ tham gia** (min/max bản ghi liên quan)
   - Đôi khi rõ từ bản chất dữ liệu; đôi khi từ **quy tắc nghiệp vụ**
5. **Thiết lập tính toàn vẹn cấp mối quan hệ**

---

### Giai đoạn 5: Xác định và Định nghĩa Quy tắc nghiệp vụ

**Mục đích:** Nắm bắt ràng buộc tổ chức và triển khai vào cơ sở dữ liệu.

#### Nguồn ràng buộc
Cách tổ chức **nhìn nhận và sử dụng** dữ liệu quyết định hạn chế và yêu cầu bạn phải xây dựng vào.

#### Quy trình
1. **Tiến hành phỏng vấn** với người dùng và quản lý
2. **Xác định hạn chế:**
   - **Từ người dùng (cụ thể):** vd, ngày giao phải sau ngày đặt; số điện thoại ban ngày bắt buộc; phương thức giao hàng phải chỉ định
   - **Từ quản lý (chung):** vd, đại lý tối đa 20 nghệ sĩ; thông tin quảng bá phải cập nhật hàng năm
3. **Ghi chép** thành **quy tắc nghiệp vụ**
4. **Triển khai bảng xác thực** khi cần — Cho trường có khoảng giá trị hữu hạn; đảm bảo tính nhất quán và hợp lệ

#### Đặc điểm quan trọng
- Quy tắc nghiệp vụ thiết lập tính toàn vẹn **liên quan trực tiếp** cách tổ chức nhìn nhận và sử dụng dữ liệu
- Quan điểm tổ chức **thay đổi khi phát triển** → quy tắc nghiệp vụ phải thay đổi theo
- **Quy trình liên tục, lặp** — Phải không ngừng cẩn thận để duy trì mức toàn vẹn này

---

### Giai đoạn 6: Xác định và Định nghĩa Khung nhìn

**Mục đích:** Hỗ trợ các cách người dùng cần làm việc với dữ liệu.

#### Quy trình
1. **Tiến hành phỏng vấn** với người dùng và quản lý
2. **Xác định cách làm việc với dữ liệu:**
   - Một số người dùng cần thông tin **chi tiết** cho công việc hàng ngày
   - Người khác cần thông tin **tổng hợp** cho quyết định chiến lược
   - Mỗi nhóm truy cập thông tin theo cách cụ thể
3. **Định nghĩa khung nhìn** bằng bảng và trường phù hợp
4. **Thiết lập tiêu chí** cho khung nhìn phải truy xuất thông tin cụ thể (vd: tất cả khách hàng ở Texas; tổng nhà cung cấp được ủy quyền theo thành phố ở Washington)

---

### Giai đoạn 7: Rà soát Tính toàn vẹn dữ liệu

**Mục đích:** Xác minh toàn bộ thiết kế trước triển khai.

#### Bốn bước rà soát

| Bước | Trọng tâm | Hành động |
|------|-----------|-----------|
| **1. Cấp bảng** | Mỗi bảng | Đảm bảo tiêu chí thiết kế đúng; kiểm tra cấu trúc trường; giải quyết không nhất quán; xác minh tính toàn vẹn cấp bảng |
| **2. Cấp trường** | Đặc tả trường | Rà soát và kiểm tra tất cả đặc tả; thực hiện tinh chỉnh; khẳng định lại tính toàn vẹn cấp trường |
| **3. Cấp mối quan hệ** | Mỗi mối quan hệ | Rà soát tính hợp lệ; xác nhận loại mối quan hệ; xác nhận tham gia; đảm bảo giá trị khớp; xác minh không vấn đề chèn/cập nhật/xóa |
| **4. Quy tắc nghiệp vụ** | Ràng buộc | Rà soát quy tắc đã xác định trước; xác nhận ràng buộc; thêm hạn chế mới phát hiện thành quy tắc nghiệp vụ |

#### Sau khi hoàn thành
- **Sẵn sàng triển khai** cấu trúc logic cơ sở dữ liệu trong chương trình RDBMS
- **Quy trình không bao giờ thực sự hoàn thành** — Cấu trúc sẽ cần tinh chỉnh khi tổ chức phát triển

---

## Tóm tắt: Bảy giai đoạn nhìn nhanh

| Giai đoạn | Hoạt động chính |
|-----------|-----------------|
| **1. Sứ mệnh** | Định nghĩa mục đích (tuyên bố sứ mệnh) và công việc người dùng (mục tiêu sứ mệnh) |
| **2. Phân tích** | Rà soát CSDL/giấy hiện tại; phỏng vấn người dùng & quản lý; soạn và tinh chỉnh danh sách trường |
| **3. Cấu trúc dữ liệu** | Định nghĩa bảng & trường; tinh chỉnh đa phần/đa giá trị; thiết lập khóa; định nghĩa đặc tả trường |
| **4. Mối quan hệ** | Xác định quan hệ; thiết lập PK/FK hoặc bảng liên kết; đặt tham gia; đảm bảo tính toàn vẹn mối quan hệ |
| **5. Quy tắc nghiệp vụ** | Xác định ràng buộc từ phỏng vấn; ghi chép thành quy tắc; triển khai bảng xác thực |
| **6. Khung nhìn** | Xác định cách người dùng làm việc với dữ liệu; định nghĩa khung nhìn với bảng, trường, tiêu chí |
| **7. Rà soát toàn vẹn** | Rà soát tính toàn vẹn bảng, trường, mối quan hệ và quy tắc nghiệp vụ |

---

## Câu hỏi ôn tập (Tự kiểm tra)

1. Tại sao quan trọng hoàn thành quy trình thiết kế kỹ lưỡng?
2. Đúng hay Sai: Mức độ tính toàn vẹn cấu trúc tỷ lệ thuận với mức độ bạn tuân theo quy trình thiết kế.
3. Mục đích của tuyên bố sứ mệnh là gì?
4. Mục tiêu sứ mệnh là gì?
5. Yêu cầu dữ liệu cơ bản của tổ chức bao gồm những gì?
6. Bạn xác định các chủ đề bảng đại diện thế nào?
7. Đúng hay Sai: Bạn thiết lập đặc tả trường cho mỗi trường trong giai đoạn thứ hai của quy trình thiết kế.
8. Bạn thiết lập kết nối logic giữa các bảng trong mối quan hệ thế nào?
9. Điều gì quyết định tập hạn chế và yêu cầu bạn phải xây dựng vào cơ sở dữ liệu?
10. Bạn có thể thiết kế và triển khai gì để hỗ trợ một số quy tắc nghiệp vụ?
11. Bạn xác định loại khung nhìn cần xây trong cơ sở dữ liệu thế nào?
12. Khi nào bạn có thể triển khai cấu trúc logic trong chương trình RDBMS?

### Đáp án

1. Giúp bạn **đảm bảo cấu trúc chắc chắn và tính toàn vẹn dữ liệu**.
2. **Đúng.** Mức độ tính toàn vẹn cấu trúc tỷ lệ thuận với mức độ bạn tuân theo quy trình thiết kế.
3. Tuyên bố sứ mệnh **xác định mục đích** của cơ sở dữ liệu bạn.
4. **Các phát biểu đại diện công việc chung** người dùng có thể thực hiện với dữ liệu trong cơ sở dữ liệu.
5. **Danh sách trường và phép tính** bạn soạn trong giai đoạn thứ hai của quy trình thiết kế.
6. Từ **mục tiêu sứ mệnh** (giai đoạn một) và **yêu cầu dữ liệu** (giai đoạn hai).
7. **Sai.** Đặc tả trường được thiết lập trong giai đoạn **thứ ba**.
8. Bằng **khóa chính và khóa ngoại**, hoặc bằng **bảng liên kết**.
9. Cách tổ chức của bạn **nhìn nhận và sử dụng dữ liệu**.
10. **Bảng xác thực**.
11. Bằng cách **phỏng vấn người dùng và quản lý** và xác định cách họ làm việc với dữ liệu tương ứng.
12. **Sau khi hoàn thành toàn bộ quy trình thiết kế cơ sở dữ liệu.**

---

## Liên kết với mục tiêu học tập

Sau khi học chương này, bạn cần có khả năng:
- **Hiểu hệ quản trị cơ sở dữ liệu:** Xem quy trình thiết kế như tổng thể tích hợp với các giai đoạn và phụ thuộc rõ ràng.
- **Thiết kế cơ sở dữ liệu quan hệ:** Áp dụng phương pháp bảy giai đoạn — từ định nghĩa sứ mệnh đến rà soát toàn vẹn — theo thứ tự đúng, không đi tắt.

*Tiếp tục sang Chương 5: Bắt đầu quy trình*
