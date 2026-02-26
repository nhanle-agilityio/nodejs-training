# Chương 3: Thuật ngữ — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tại sao thuật ngữ này quan trọng

Trước khi học quy trình thiết kế, bạn phải hiểu từ vựng chuyên ngành của thiết kế cơ sở dữ liệu quan hệ. Thuật ngữ này phục vụ ba mục đích quan trọng:

1. **Diễn đạt ý tưởng và khái niệm của mô hình cơ sở dữ liệu quan hệ** — Nhiều từ xuất phát từ lý thuyết tập hợp và logic vị từ bậc nhất (nền tảng toán học của mô hình).
2. **Làm rõ quy trình thiết kế** — Khi biết các thuật ngữ này, quy trình thiết kế trở nên rõ ràng và dễ theo dõi hơn.
3. **Sử dụng phổ biến** — Bạn sẽ gặp các thuật ngữ này trong sổ tay phần mềm, tài liệu khóa học, sách thương mại và trang web cơ sở dữ liệu.

**Lưu ý:** Bảng thuật ngữ ở cuối sách cung cấp định nghĩa ngắn gọn cho tất cả thuật ngữ. Thuật ngữ bổ sung được giới thiệu sau trong ngữ cảnh cụ thể. Chương này bao gồm bốn nhóm: **liên quan giá trị**, **liên quan cấu trúc**, **liên quan mối quan hệ** và **liên quan tính toàn vẹn**.

---

## 1. Thuật ngữ liên quan giá trị

### Dữ liệu (Data)

**Định nghĩa:** Dữ liệu là các giá trị bạn lưu trữ trong cơ sở dữ liệu.

**Đặc điểm chính:**
- **Tĩnh** — Dữ liệu giữ nguyên trạng thái cho đến khi bạn sửa đổi bằng quy trình thủ công hoặc tự động.
- **Vô nghĩa khi đơn lẻ** — Dữ liệu thô (vd: "92883") không có ngữ cảnh. Đó là mã bưu điện? Mã sản phẩm? Mã khách hàng? Bạn không thể biết cho đến khi xử lý.
- **Ví dụ:** Danh sách số và tên không có ngữ cảnh chỉ là dữ liệu.

**Ảnh hưởng thiết kế:** Bạn lưu dữ liệu; mục tiêu thiết kế là cấu trúc để có thể chuyển thành thông tin có ý nghĩa.

---

### Thông tin (Information)

**Định nghĩa:** Thông tin là dữ liệu bạn xử lý theo cách làm cho nó có ý nghĩa và hữu ích khi làm việc hoặc xem.

**Đặc điểm chính:**
- **Động** — Thay đổi liên tục so với dữ liệu lưu trữ; bạn có thể xử lý và trình bày theo vô số cách.
- **Các dạng trình bày:** Kết quả SQL SELECT, biểu mẫu trên màn hình, báo cáo in, bảng điều khiển, v.v.
- **Ví dụ:** Cùng dữ liệu thô, khi định dạng thành báo cáo hóa đơn bệnh nhân, trở thành thông tin — có ý nghĩa với ai xem.

**Tiên đề quan trọng (ghi nhớ):**
> **Dữ liệu là cái bạn lưu; thông tin là cái bạn truy xuất.**

**Tại sao quan trọng cho thiết kế:** Bạn thiết kế cơ sở dữ liệu để cung cấp thông tin có ý nghĩa. Thông tin đó chỉ có khi (1) dữ liệu phù hợp tồn tại trong cơ sở dữ liệu, và (2) cơ sở dữ liệu được cấu trúc để hỗ trợ thông tin đó. Hiểu sự phân biệt này làm logic đằng sau quy trình thiết kế rất rõ ràng.

**Lưu ý ngành:** Thật không may, "dữ liệu" và "thông tin" thường được dùng thay thế nhau (và sai) trong tạp chí, sách và trang web — thậm chí bởi tác giả giàu kinh nghiệm. Hãy chính xác trong công việc của bạn.

---

### Null

**Định nghĩa:** Null là trạng thái đại diện cho giá trị **thiếu hoặc không biết**.

**Làm rõ quan trọng:** Null **không phải** bất kỳ điều nào sau:
- **Không phải số không** — Số không có thể là số dư tài khoản, số vé, mức tồn kho, v.v. Null nghĩa là "chúng ta không biết."
- **Không phải khoảng trắng** — Chuỗi một hoặc nhiều khoảng trắng là ký tự hợp lệ đối với SQL (vd: `'   '` hợp lệ như `'abc'`). Khoảng trắng có thể có ý nghĩa (vd: Washington D.C. không thuộc quận nào — khoảng trắng có thể đại diện "không thuộc quận nào").
- **Không phải luôn là chuỗi rỗng** — `''` (hai dấu nháy đơn liên tiếp) có thể có ý nghĩa trong một số ngữ cảnh (vd: nhân viên không có chữ lót). Null và chuỗi rỗng khác nhau.

#### Giá trị của Null (Khi nào dùng)

Null hữu ích khi dùng đúng mục đích. Các lý do phổ biến giá trị trường có thể là Null:

| Lý do | Giải thích | Ví dụ |
|-------|------------|-------|
| **Giá trị thiếu (sai sót con người)** | Dữ liệu không được thu thập | Bạn quên hỏi Susan Black về quận; sau khi gọi, bạn có thể sửa. |
| **Giá trị không biết (chưa định nghĩa)** | Giá trị chưa tồn tại | Bảng CATEGORIES thiếu danh mục cho lớp mới mùa thu bạn dự định mở. |
| **Thực sự không biết** | Không ai biết giá trị | Ông Russo không biết quận; bạn cũng không — thực sự không biết cho đến khi có người tìm ra. |
| **Không áp dụng** | Một trong hai trường loại trừ lẫn nhau phải là Null | Bảng EMPLOYEES có SALARY và HOURLYRATE; nhân viên trả lương có Null trong HOURLYRATE và ngược lại. |
| **Không phù hợp** | Giá trị không liên quan với bản ghi này | Bệnh nhân nam bị hói — HAIRCOLOR "không phù hợp." **Khuyến nghị:** Dùng giá trị thực như "N/A" hoặc "Không áp dụng" thay vì Null cho rõ ràng. |

**Nguyên tắc thiết kế:** Có cho phép Null hay không phụ thuộc cách bạn dùng dữ liệu. Xem xét mục đích từng trường.

#### Vấn đề với Null (Tại sao có thể gây rắc rối)

**Nhược điểm chính:** Null ảnh hưởng bất lợi đến **các phép toán**.

**Quy tắc:** Mọi phép toán liên quan Null cho kết quả Null.

| Biểu thức | Kết quả |
|-----------|---------|
| (25 × 3) + 4 | 79 |
| (Null × 3) + 4 | Null |
| (25 × Null) + 4 | Null |
| (25 × 3) + Null | Null |

**Lý do:** Nếu một số không biết, kết quả tất nhiên không biết — logic đúng, nhưng thực tế rủi ro.

**Ví dụ cụ thể — Trường tính toán:** Nếu TOTAL VALUE = [SRP] × [QTY ON HAND], và QTY ON HAND là Null cho vài sản phẩm, thì TOTAL VALUE là Null cho các bản ghi đó. Nếu bạn tổng tất cả trường TOTAL VALUE, bạn có **tổng không chính xác** — và RDBMS **không** cảnh báo. Lỗi không được phát hiện.

**Ví dụ cụ thể — Hàm tổng hợp:** `COUNT(tên_trường)` trả về Null nếu trường chứa Null. Truy vấn tổng hợp có thể hiển thị "0" lần xuất hiện của danh mục không chỉ định, ngụ ý mọi sản phẩm có danh mục — trong khi thực tế hai sản phẩm có Null (không có danh mục). Thông tin **không chính xác**.

**Kết luận thiết kế:** Với trường dùng trong tính toán hoặc tổng hợp, đảm bảo giá trị không thể Null (hoặc xử lý Null rõ ràng trong logic). Các vấn đề này được trình bày ở Chương 8 (Khóa), 9 (Đặc tả trường) và 12 (Khung nhìn).

---

## 2. Thuật ngữ liên quan cấu trúc

### Bảng (Table)

**Định nghĩa:** Trong mô hình quan hệ, dữ liệu được lưu trong **quan hệ (relations)**, mà người dùng nhận thức là **bảng**. Mỗi quan hệ gồm tuple (bản ghi) và thuộc tính (trường).

**Đặc điểm:**
- **Cấu trúc chính** trong cơ sở dữ liệu.
- **Một chủ đề** — Mỗi bảng đại diện một chủ đề cụ thể (không bao giờ nhiều).
- **Thứ tự logic không quan trọng** — Thứ tự bản ghi và trường không quan trọng.
- **Khóa chính** — Mỗi bảng có ít nhất một trường xác định duy nhất mỗi bản ghi.
- **Độc lập vật lý** — Nhờ hai điểm cuối, dữ liệu có thể tồn tại độc lập với lưu trữ vật lý; người dùng không cần biết vị trí bản ghi để truy xuất.

**Các loại chủ đề bảng có thể đại diện:**
- **Đối tượng** — Hữu hình: người, nơi chốn, đồ vật (vd: phi công, sản phẩm, sinh viên, tòa nhà, thiết bị). Mỗi đối tượng có đặc điểm bạn lưu và xử lý.
- **Sự kiện** — Điều gì đó xảy ra tại thời điểm (vd: phiên tòa, quay phim, bầu cử, cuộc hẹn bác sĩ). Sự kiện cũng có đặc điểm bạn ghi lại.

#### Các loại bảng

| Loại | Mục đích | Bản chất dữ liệu | Sử dụng |
|------|----------|------------------|---------|
| **Bảng dữ liệu** | Cung cấp thông tin | Động — có thể sửa, xóa, xử lý | Phổ biến nhất; bạn tương tác liên tục. |
| **Bảng xác thực** (bảng tra cứu) | Triển khai tính toàn vẹn dữ liệu | Tĩnh — hiếm thay đổi | Đại diện tên thành phố, danh mục kỹ năng, mã sản phẩm, mã dự án. Dùng để xác thực giá trị nhập vào bảng dữ liệu. |
| **Bảng liên kết** (bảng liên hợp) | Giải quyết mối quan hệ nhiều-nhiều | Khác nhau | Kết nối hai bảng; bản sao cả hai khóa chính tạo cấu trúc. Xem "Nhiều-Nhiều" bên dưới. |

---

### Trường (Field)

**Định nghĩa:** Trường (thuộc tính trong lý thuyết) là **cấu trúc nhỏ nhất** trong cơ sở dữ liệu. Nó đại diện **đặc điểm của chủ đề** của bảng mà nó thuộc về. Trường **lưu dữ liệu**.

**Nguyên tắc chất lượng:** Chất lượng thông tin bạn nhận tỷ lệ thuận với tính toàn vẹn cấu trúc và dữ liệu của các trường. Tầm quan trọng của trường không thể đánh giá quá cao.

**Quy tắc thiết kế đúng:** Mỗi trường trong cơ sở dữ liệu thiết kế tốt chứa **một và chỉ một giá trị**, và tên của nó xác định loại giá trị (vd: FIRSTNAME, LASTNAME, CITY, STATE, ZIPCODE). Điều này làm nhập dữ liệu trực quan và sắp xếp/lọc dễ dàng.

**Các trường cần tránh (trong cơ sở dữ liệu thiết kế kém):**
1. **Trường đa phần** (trường tổ hợp) — Chứa hai hoặc nhiều mục riêng biệt (vd: "Địa chỉ" với đường, thành phố, bang, ZIP trong một trường).
2. **Trường đa giá trị** — Chứa nhiều thể hiện cùng loại giá trị (vd: nhiều số điện thoại trong một trường).
3. **Trường tính toán** — Chứa văn bản nối chuỗi hoặc kết quả biểu thức toán học (vd: FullName = FirstName + LastName, hoặc Total = Price × Quantity). Các trường này được tính; thường nên tính khi truy xuất, không lưu.

*(Chi tiết ở Chương 7.)*

---

### Bản ghi (Record)

**Định nghĩa:** Bản ghi (tuple trong lý thuyết) đại diện **một thể hiện duy nhất** của chủ đề của bảng.

**Thành phần:** Toàn bộ tập trường trong bảng, dù có chứa giá trị hay không — được xem như một đơn vị.

**Định danh:** Mỗi bản ghi được xác định trong toàn cơ sở dữ liệu bằng **giá trị duy nhất trong trường khóa chính**. Ví dụ: CLIENT ID xác định duy nhất mỗi khách hàng trong bảng CLIENTS.

**Ví dụ:** Bản ghi của Sara Castilleja = thể hiện duy nhất của "Khách hàng"; gồm tất cả trường; giá trị đại diện sự kiện liên quan về cô ấy.

**Vai trò thiết kế:** Bản ghi là chìa khóa hiểu mối quan hệ giữa các bảng — bạn cần biết bản ghi trong một bảng liên quan thế nào với bản ghi trong bảng khác.

---

### Khung nhìn (View)

**Định nghĩa:** Khung nhìn là bảng **"ảo"** gồm trường từ một hoặc nhiều bảng (gọi là **bảng cơ sở**). Khung nhìn lấy dữ liệu từ bảng cơ sở thay vì lưu dữ liệu. Chỉ **cấu trúc** của khung nhìn được lưu trong cơ sở dữ liệu.

**Lưu ý RDBMS:** Nhiều chương trình RDBMS gọi khung nhìn là "truy vấn đã lưu".

**Ví dụ:** Khung nhìn INSTRUMENT ASSIGNMENTS lấy từ STUDENTS, INSTRUMENTS và STUDENT INSTRUMENTS — hiển thị dữ liệu từ cả ba đồng thời dựa trên STUDENT ID và INSTRUMENT ID khớp nhau.

**Ba lý do chính khung nhìn quan trọng:**
1. **Làm việc với nhiều bảng** — Kết hợp dữ liệu từ các bảng liên quan trong một chỗ (các bảng phải có mối quan hệ).
2. **Bảo mật** — Hạn chế người dùng xem hoặc thao tác trường cụ thể trong bảng hoặc nhóm bảng.
3. **Tính toàn vẹn dữ liệu** — Khung nhìn **xác thực** có thể triển khai quy tắc toàn vẹn.

**Khung nhìn được lập chỉ mục (vật chất hóa):** Một số RDBMS (Oracle, SQL Server, DB2, Sybase) hỗ trợ khung nhìn *thực sự* lưu dữ liệu và có thể lập chỉ mục để xử lý nhanh hơn. Dùng trong kho dữ liệu và OLAP. Phụ thuộc nhà cung cấp; ngoài phạm vi sách này.

*(Thiết kế và sử dụng ở Chương 12.)*

---

### Khóa (Keys)

Khóa là **trường đặc biệt** với vai trò cụ thể. Hai loại quan trọng nhất là khóa chính và khóa ngoại.

#### Khóa chính (Primary Key)
- **Định nghĩa:** Trường (hoặc nhóm trường) **xác định duy nhất** mỗi bản ghi trong bảng. Nhiều trường = **khóa chính tổ hợp**.
- **Tầm quan trọng:** Khóa quan trọng nhất trong bảng.
- **Vai trò:**
  1. **Giá trị** khóa chính xác định bản ghi cụ thể trong toàn cơ sở dữ liệu.
  2. **Trường** khóa chính xác định bảng trong toàn cơ sở dữ liệu.
  3. Thực thi **tính toàn vẹn cấp bảng** (không trùng lặp).
  4. Thiết lập **mối quan hệ** với bảng khác.
- **Quy tắc:** Mỗi bảng phải có khóa chính.

**Ví dụ:** AGENT ID trong bảng AGENTS — xác định duy nhất mỗi đại lý, đảm bảo không trùng lặp bản ghi, thiết lập mối quan hệ với ENTERTAINERS.

#### Khóa ngoại (Foreign Key)
- **Định nghĩa:** Bản sao khóa chính từ bảng khác (cha), đặt trong bảng thứ hai (con) để thiết lập mối quan hệ. Gọi là "ngoại" vì bảng con đã có khóa chính riêng; khóa từ cha "ngoại" với nó.
- **Thiết lập:** Lấy bản sao khóa chính của cha → đặt vào bảng con → trở thành khóa ngoại.
- **Vai trò:** Thiết lập mối quan hệ; triển khai **tính toàn vẹn cấp mối quan hệ** — giá trị khóa ngoại phải khớp giá trị khóa chính hiện có (tránh bản ghi "mồ côi", vd: đơn hàng không có khách hàng).

**Ví dụ:** AGENT ID là khóa chính trong AGENTS, khóa ngoại trong ENTERTAINERS (có khóa chính riêng ENTERTAINER ID). AGENT ID liên kết hai bảng.

*(Chi tiết ở Chương 8 và 10.)*

---

### Chỉ mục (Index)

**Định nghĩa:** Chỉ mục là **cấu trúc vật lý** RDBMS cung cấp để **cải thiện xử lý dữ liệu** (vd: tăng tốc tìm kiếm). Cách hoạt động phụ thuộc RDBMS.

**Phân biệt quan trọng:**
- **Khóa** = Cấu trúc **logic** — xác định bản ghi, thiết lập mối quan hệ.
- **Chỉ mục** = Cấu trúc **vật lý** — tối ưu xử lý; lưu trên đĩa; không liên quan thiết kế logic.

**Nhầm lẫn phổ biến:** Các thuật ngữ này thường bị dùng sai trong ngành. Nhớ: khóa = logic; chỉ mục = tối ưu vật lý.

---

## 3. Thuật ngữ liên quan mối quan hệ

### Mối quan hệ (Relationships)

**Định nghĩa:** Mối quan hệ tồn tại giữa hai bảng khi bạn có thể **liên kết bản ghi** của bảng đầu với bảng thứ hai.

**Cách thiết lập:**
- Qua **khóa chính và khóa ngoại** (một-một, một-nhiều), hoặc
- Qua **bảng liên kết** (nhiều-nhiều).

**Tại sao mối quan hệ quan trọng:**
- Cho phép **khung nhìn đa bảng**.
- Quan trọng cho **tính toàn vẹn dữ liệu** — giảm dữ liệu trùng lặp.
- Mỗi mối quan hệ có thể đặc trưng ba cách: **loại**, **loại tham gia**, **mức độ tham gia**.

---

### Các loại mối quan hệ (Số lượng)

#### Một-Một (1:1)
- **Định nghĩa:** Một bản ghi trong Bảng A liên quan **không hoặc một** bản ghi trong Bảng B; một bản ghi trong Bảng B liên quan **đúng một** bản ghi trong Bảng A.
- **Cấu trúc:** Cha/con. Sao chép khóa chính của cha vào con làm khóa ngoại.
- **Đặc biệt:** Loại mối quan hệ duy nhất mà cả hai bảng có thể **dùng chung khóa chính** (con dùng khóa chính của cha làm khóa chính của mình).
- **Ví dụ:** EMPLOYEES (cha) ↔ COMPENSATION (con). Một nhân viên có không hoặc một bản ghi lương; một bản ghi lương thuộc đúng một nhân viên. EMPLOYEE ID là khóa chính ở cả hai; cũng là khóa ngoại trong COMPENSATION.

#### Một-Nhiều (1:N)
- **Định nghĩa:** Một bản ghi trong Bảng A có thể liên quan **không, một hoặc nhiều** bản ghi trong Bảng B; một bản ghi trong Bảng B liên quan **đúng một** bản ghi trong Bảng A.
- **Cấu trúc:** Cha (phía một) / Con (phía nhiều). Sao chép khóa chính của cha vào con làm khóa ngoại.
- **Tần suất:** Loại mối quan hệ **phổ biến nhất**.
- **Vai trò tính toàn vẹn:** Loại dữ liệu trùng lặp, tối thiểu dữ liệu thừa.
- **Ví dụ:** AGENTS (một) ↔ ENTERTAINERS (nhiều). Một đại lý có nhiều nghệ sĩ; mỗi nghệ sĩ có một đại lý. AGENT ID = khóa ngoại trong ENTERTAINERS.

#### Nhiều-Nhiều (M:N)
- **Định nghĩa:** Một bản ghi trong Bảng A có thể liên quan **không, một hoặc nhiều** bản ghi trong Bảng B và ngược lại.
- **Vấn đề nếu không giải quyết:** Làm sao liên kết sinh viên với nhiều lớp, hoặc lớp với nhiều sinh viên? Đặt nhiều trường CLASS vào STUDENTS (hoặc ngược lại) gây vấn đề dữ liệu và toàn vẹn.
- **Giải pháp:** Dùng **bảng liên kết**. Tạo bảng mới với bản sao cả hai khóa chính. Cùng nhau chúng tạo **khóa chính tổ hợp** của bảng liên kết; riêng lẻ mỗi cái là **khóa ngoại** tới bảng tương ứng.
- **Ví dụ:** STUDENTS ↔ CLASSES. Bảng liên kết STUDENT_CLASSES có STUDENT ID và CLASS ID — cả hai cùng nhau = khóa chính tổ hợp; mỗi cái = khóa ngoại tới bảng tương ứng.
- **M:N chưa giải quyết** = mối quan hệ chưa thiết lập đúng (không có bảng liên kết).

---

### Loại tham gia (Types of Participation)

**Định nghĩa:** Liệu một bảng có **bắt buộc** có bản ghi trước khi bảng liên quan có thể có bản ghi hay không.

Với mối quan hệ giữa TABLE_A và TABLE_B:
- **Bắt buộc (TABLE_A):** Bạn phải nhập ít nhất một bản ghi vào TABLE_A trước khi nhập bản ghi vào TABLE_B.
- **Tùy chọn (TABLE_A):** Bạn không bắt buộc nhập bản ghi nào vào TABLE_A trước khi nhập vào TABLE_B.

**Ví dụ (AGENTS ↔ CLIENTS):** Nếu mỗi khách hàng phải được gán cho đại lý, AGENTS có tham gia **bắt buộc** (cần đại lý trước khách hàng). Nếu khách hàng có thể tồn tại không cần đại lý, AGENTS có tham gia **tùy chọn**.

**Xác định:** Dựa trên cách bạn dùng dữ liệu so với bảng kia. Quy tắc nghiệp vụ quyết định điều này.

---

### Mức độ tham gia (Degree of Participation)

**Định nghĩa:** **Số lượng bản ghi tối thiểu và tối đa** trong một bảng có thể liên quan với một bản ghi trong bảng kia.

**Ký hiệu:** (tối thiểu, tối đa) — vd: 1,10 nghĩa là ít nhất 1, nhiều nhất 10.

**Ví dụ (AGENTS ↔ CLIENTS):**
- Nếu đại lý phải phụ trách ít nhất 1 nhưng không quá 8 khách hàng: mức độ CLIENT = **1,8**.
- Nếu khách hàng chỉ có thể có một đại lý: mức độ AGENTS = **1,1**.

**Xác định:** Dựa trên cách dữ liệu liên quan và cách bạn sử dụng. Quy tắc nghiệp vụ và ràng buộc quyết định.

*(Được chỉ ra trong sơ đồ; chi tiết ở Chương 10.)*

---

## 4. Thuật ngữ liên quan tính toàn vẹn

### Đặc tả trường (Field Specification)

**Định nghĩa:** Đặc tả trường (truyền thống gọi "miền") đại diện **mọi phần tử của trường** — mọi thứ định nghĩa cách trường được xây dựng, sử dụng và ràng buộc.

**Ba loại phần tử:**

| Danh mục | Mục đích | Ví dụ |
|----------|----------|-------|
| **Chung** | Thông tin cơ bản nhất | Tên trường, Mô tả, Bảng cha |
| **Vật lý** | Cách trường được xây và đại diện | Kiểu dữ liệu, Độ dài, Hỗ trợ ký tự |
| **Logic** | Giá trị lưu; ràng buộc | Giá trị bắt buộc, Khoảng giá trị, Hỗ trợ Null |

*(Tất cả phần tử và sử dụng ở Chương 9.)*

---

### Tính toàn vẹn dữ liệu (Data Integrity)

**Định nghĩa:** Tính toàn vẹn dữ liệu đề cập đến **tính hợp lệ, nhất quán và chính xác** của dữ liệu trong cơ sở dữ liệu.

**Nguyên tắc cơ bản:** Độ chính xác của thông tin bạn truy xuất tỷ lệ thuận với mức tính toàn vẹn bạn áp dụng. Bỏ qua tính toàn vẹn và bạn có nguy cơ lỗi khó phát hiện — và quyết định dựa trên thông tin không chính xác hoặc hoàn toàn không hợp lệ.

**Bốn loại tính toàn vẹn dữ liệu:**

| Loại | Tên truyền thống | Mục đích |
|------|------------------|----------|
| **1. Cấp bảng** | Tính toàn vẹn thực thể | Không trùng lặp bản ghi; khóa chính duy nhất và không bao giờ Null |
| **2. Cấp trường** | Tính toàn vẹn miền | Mỗi trường có cấu trúc chắc chắn; giá trị hợp lệ, nhất quán, chính xác; cùng loại trường định nghĩa nhất quán (vd: tất cả trường CITY) |
| **3. Cấp mối quan hệ** | Tính toàn vẹn tham chiếu | Mối quan hệ chắc chắn; bản ghi đồng bộ khi nhập, cập nhật hoặc xóa; không bản ghi mồ côi (vd: đơn hàng không có khách hàng) |
| **4. Quy tắc nghiệp vụ** | (Đặc thù tổ chức) | Ràng buộc dựa trên cách tổ chức nhận thức và dùng dữ liệu. Ảnh hưởng: khoảng giá trị, loại/mức độ tham gia, quy tắc đồng bộ. (Chương 11) |

**Kết luận thiết kế:** Cả bốn loại phải được xem xét khi thiết kế. Chúng phối hợp đảm bảo chất lượng thiết kế và độ chính xác truy xuất.

---

## Bảng tóm tắt: Phân biệt chính

| Khái niệm | Phân biệt |
|-----------|-----------|
| Dữ liệu vs. Thông tin | Dữ liệu = lưu; Thông tin = truy xuất |
| Null | Thiếu/không biết — không phải zero, không phải khoảng trắng. Hữu ích khi phù hợp; có vấn đề trong toán/tổng hợp |
| Khóa vs. Chỉ mục | Khóa = logic (định danh, liên kết); Chỉ mục = vật lý (tối ưu) |
| Loại bảng | Dữ liệu (động), Xác thực (tĩnh), Liên kết (giải quyết M:N) |
| Loại mối quan hệ | 1:1, 1:N, M:N (dùng bảng liên kết) |
| Tham gia | Bắt buộc vs. Tùy chọn |
| Mức độ | (min, max) bản ghi liên quan |
| Tính toàn vẹn | Bảng, Trường, Mối quan hệ, Quy tắc nghiệp vụ |

---

## Câu hỏi ôn tập (Tự kiểm tra)

1. Tại sao thuật ngữ quan trọng?
2. Nêu bốn nhóm thuật ngữ.
3. Sự khác biệt giữa dữ liệu và thông tin là gì?
4. Null đại diện gì?
5. Nhược điểm chính của Null là gì?
6. Các cấu trúc chính trong cơ sở dữ liệu là gì?
7. Nêu ba loại bảng.
8. Khung nhìn là gì?
9. Nêu sự khác biệt giữa khóa và chỉ mục.
10. Ba loại mối quan hệ có thể tồn tại giữa một cặp bảng là gì?
11. Ba cách đặc trưng mối quan hệ là gì?
12. Đặc tả trường là gì?
13. Đặc tả trường bao gồm ba loại phần tử nào?
14. Tính toàn vẹn dữ liệu là gì?
15. Nêu bốn loại tính toàn vẹn dữ liệu.

### Đáp án

1. Thuật ngữ quan trọng vì (a) diễn đạt và định nghĩa ý tưởng, khái niệm của mô hình cơ sở dữ liệu quan hệ, (b) diễn đạt và định nghĩa quy trình thiết kế cơ sở dữ liệu, và (c) được dùng khắp nơi khi thảo luận cơ sở dữ liệu quan hệ hoặc RDBMS.
2. **Liên quan giá trị**, **liên quan cấu trúc**, **liên quan mối quan hệ** và **liên quan tính toàn vẹn**.
3. **Dữ liệu** là giá trị bạn lưu trong cơ sở dữ liệu. **Thông tin** là dữ liệu bạn xử lý theo cách làm cho nó có ý nghĩa và hữu ích khi làm việc hoặc xem.
4. **Giá trị thiếu hoặc không biết**.
5. Null có **ảnh hưởng bất lợi đến phép toán** (mọi phép toán liên quan Null cho kết quả Null).
6. **Bảng**.
7. **Bảng dữ liệu**, **bảng liên kết** và **bảng xác thực**.
8. Bảng **ảo** gồm trường từ một hoặc nhiều bảng cơ sở trong cơ sở dữ liệu.
9. **Khóa** là cấu trúc logic dùng để xác định bản ghi trong bảng; **chỉ mục** là cấu trúc vật lý dùng để tối ưu xử lý dữ liệu.
10. **Một-một**, **một-nhiều** và **nhiều-nhiều**.
11. Theo **loại mối quan hệ**, **cách mỗi bảng tham gia** và **mức độ mỗi bảng tham gia**.
12. Đặc tả trường đại diện **tất cả các phần tử của một trường**.
13. **Chung**, **vật lý** và **logic**.
14. **Tính hợp lệ, nhất quán và chính xác** của dữ liệu trong cơ sở dữ liệu.
15. **Cấp trường**, **cấp bảng**, **cấp mối quan hệ** và **quy tắc nghiệp vụ**.

---

## Liên kết với mục tiêu học tập

Sau khi học chương này, bạn cần có khả năng:
- **Hiểu hệ quản trị cơ sở dữ liệu:** Dùng thuật ngữ đúng; phân biệt dữ liệu và thông tin; hiểu Null, khóa, chỉ mục, khung nhìn và loại bảng.
- **Thiết kế cơ sở dữ liệu quan hệ:** Áp dụng thuật ngữ cấu trúc (bảng, trường, bản ghi); thiết lập và đặc trưng mối quan hệ; định nghĩa đặc tả trường; triển khai bốn cấp tính toàn vẹn dữ liệu.

*Tiếp tục sang Chương 4: Tổng quan khái niệm*
