# Chương 9: Đặc tả trường — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 9 trình bày **định nghĩa đặc tả trường** cho mỗi trường trong cơ sở dữ liệu. Đặc tả trường thiết lập và thực thi **tính toàn vẹn cấp trường** và tạo thành **từ điển dữ liệu**. Mỗi đặc tả có ba thể loại thành tố: **General** (chung), **Physical** (vật lý) và **Logical** (logic). Ba loại đặc tả: **Unique** (duy nhất), **Generic** (chung) và **Replica** (bản sao).

---

## 1. Tại sao đặc tả trường quan trọng

- **Thiết lập và thực thi tính toàn vẹn cấp trường** — Đảm bảo dữ liệu nhất quán và hợp lệ.
- **Tăng cường tính toàn vẹn dữ liệu tổng thể** — Tính toàn vẹn cấp trường là một trong bốn thành phần (cùng với cấp bảng, mối quan hệ và quy tắc nghiệp vụ).
- **Buộc hiểu sâu dữ liệu** — Xác định bản chất và mục đích; đánh giá dữ liệu có cần thiết hay không.
- **Tạo thành từ điển dữ liệu** — Tập đặc tả đầy đủ = từ điển theo nghĩa đen của cấu trúc cơ sở dữ liệu. Dùng khi triển khai trong RDBMS; hướng dẫn cho trường, xác thực và giao diện người dùng.

*Thời gian dành cho đặc tả trường là đầu tư, không lãng phí. Bỏ qua hoặc hoàn thành một phần dẫn đến dữ liệu không nhất quán và mất thời gian sửa lỗi.*

---

## 2. Tính toàn vẹn cấp trường

Trường đạt tính toàn vẹn cấp trường khi có tập đặc tả trường hoàn chỉnh và tuân thủ **Các thành tố của Trường lý tưởng**. Tính toàn vẹn cấp trường đảm bảo:

- Định danh và mục đích rõ ràng; các bảng chứa trường được xác định.
- Định nghĩa trường nhất quán trong toàn bộ cơ sở dữ liệu.
- Giá trị nhất quán và hợp lệ.
- Các loại sửa đổi được xác định rõ.

**Các thành tố của Trường lý tưởng (ôn lại):**

1. Đại diện đặc điểm riêng biệt của chủ đề bảng
2. Chỉ chứa một giá trị duy nhất
3. Không thể phân rã thành thành phần nhỏ hơn
4. Không chứa giá trị tính toán hoặc nối chuỗi
5. Duy nhất trong toàn bộ cơ sở dữ liệu (trừ FK)
6. Giữ phần lớn đặc điểm khi xuất hiện dưới dạng khóa ngoại

---

## 3. Cấu trúc đặc tả trường

Ba thể loại thành tố:

### General Elements (Thành tố chung)

| Thành tố | Mục đích |
|----------|----------|
| **Field Name** | Số từ tối thiểu xác định duy nhất trường |
| **Parent Table** | Bảng chứa trường |
| **Specification Type** | Unique, Generic hoặc Replica |
| **Source Specification** | (Chỉ Replica) Tham chiếu đặc tả generic/nguồn |
| **Shared By** | Các bảng khác dùng chung trường (mối quan hệ rõ ràng) |
| **Alias(es)** | Tên thay thế cho trường hợp hiếm (vd: hai thể hiện trong cùng bảng) |
| **Description** | Giải thích đầy đủ về trường |

#### Hướng dẫn mô tả trường (8)

1. Xác định chính xác trường và nêu mục đích; bổ sung tên trường
2. Rõ ràng, ngắn gọn; số từ tối thiểu
3. Tránh lặp lại/viết lại tên trường
4. Không thuật ngữ kỹ thuật, viết tắt
5. Không thông tin triển khai cụ thể
6. Độc lập (không phụ thuộc mô tả trường khác)
7. Không ví dụ
8. Nêu vai trò trong bảng hoặc quan hệ với chủ đề

**Dùng Alias:** Khi cần hai thể hiện cùng trường trong một bảng (vd: PRESIDENT ID và VICE PRESIDENT ID cho EMPLOYEE ID NUMBER). Dùng thận trọng.

### Physical Elements (Thành tố vật lý)

| Thành tố | Mục đích |
|----------|----------|
| **Data Type** | Bản chất dữ liệu lưu trữ |
| **Length** | Tổng số ký tự cho phép |
| **Decimal Places** | Độ chính xác cho số thực |
| **Character Support** | Loại ký tự nào được phép |

**Kiểu dữ liệu:**

- **Alphanumeric** — Chữ cái, số, ký tự bàn phím, ký tự đặc biệt
- **Numeric** — Số nguyên và số thực (không có số 0 đầu)
- **DateTime** — Ngày, giờ hoặc cả hai

### Logical Elements (Thành tố logic)

| Thành tố | Mục đích |
|----------|----------|
| **Key Type** | Non-key, Primary, Alternate (Foreign ở Ch.10) |
| **Key Structure** | Simple hoặc Composite |
| **Uniqueness** | Unique hoặc Non-unique |
| **Null Support** | No Nulls hoặc Nulls Allowed |
| **Values Entered By** | User hoặc System |
| **Required Value** | Yes hoặc No |
| **Range of Values** | Giá trị hợp lệ (General, Integrity-specific, Business-specific) |
| **Edit Rule** | Khi nào có thể nhập giá trị; có thể sửa hay không |

**Tùy chọn Edit Rule:**

1. Enter Now, Edits Allowed
2. Enter Later, Edits Allowed
3. Enter Now, Edits Not Allowed
4. Enter Later, Edits Not Allowed
5. Not Determined At This Time

**Thể loại Range of Values:**
- **General** — Mọi giá trị có thể
- **Integrity-specific** — Theo vai trò trường trong mối quan hệ (Ch.10)
- **Business-specific** — Từ quy tắc nghiệp vụ (Ch.11)

*Tránh "Other" và "Miscellaneous" trong Range of Values.*

**Null:** Không đại diện khoảng trống. Dùng thận trọng. Dùng giá trị thật ("N/A", "Not Applicable") khi phù hợp.

---

## 4. Các loại đặc tả

| Loại | Khi dùng | Ghi chú |
|------|----------|---------|
| **Unique** | Mặc định; trường xuất hiện một lần hoặc là primary key | Mọi thành tố trừ Source Specification |
| **Generic** | Mẫu cho trường khác (vd: STATE) | Tên không cụ thể; thiết lập rộng; không Parent Table, Shared By, Alias, Source Spec |
| **Replica** | Dựa trên Generic hoặc là foreign key | Lấy từ nguồn; có thể sửa hoặc thêm thành tố |

**Ví dụ:**
- Generic STATE → Replica VENDSTATE, CUSTSTATE, EMPSTATE
- VENDOR ID NUMBER: Unique (cũng Shared By PRODUCTS)

---

## 5. Định nghĩa đặc tả trường

**Quy trình:**

1. Định nghĩa càng nhiều đặc tả có thể trước các cuộc họp.
2. Gặp người dùng và quản lý.
3. Giải thích các thành tố; đảm bảo hiểu.
4. Rà soát đặc tả; người tham gia đề xuất tinh chỉnh.
5. Làm việc trên các trường còn lại/chưa quen với người tham gia.
6. Tinh chỉnh Logical Elements với thông tin từ nhân viên.

**Chiến lược:** Không vội vàng. Làm việc với người đại diện quen dữ liệu. Lên lịch nhiều cuộc họp theo nhu cầu.

---

## 6. Ví dụ: Mike's Bikes

- Định nghĩa đặc tả cho PRODUCT DESCRIPTION và các trường đơn giản khác.
- Trường CATEGORY: Range of Values chưa biết; chỉ định phạm vi chung; xem lại khi định nghĩa quy tắc nghiệp vụ (Ch.11).
- Rà soát với Mike và nhân viên; xác nhận thiết lập thành tố.

---

## Câu hỏi ôn tập

1. Nêu hai lý do chính tại sao đặc tả trường quan trọng.
2. Bạn đạt được gì khi thiết lập tính toàn vẹn cấp trường?
3. Ba thể loại thành tố trong đặc tả trường là gì?
4. Đặt tên ba loại đặc tả.
5. Tại sao soạn mô tả trường đúng hữu ích?
6. Thành tố Data Type cho biết gì?
7. Thành tố Character Support cho biết gì?
8. Các loại khóa nào được chỉ định trên đặc tả trường?
9. Đúng hay Sai: Null đại diện giá trị khoảng trống.
10. Ý nghĩa của thành tố Range of Values là gì?
11. Mục đích của Edit Rule là gì?
12. Khi nào dùng đặc tả generic?

---

## Kết quả học tập

Sau khi học chương này, bạn có thể:

- **Định nghĩa** đặc tả trường với các thành tố General, Physical và Logical
- **Soạn** mô tả trường đúng bằng các hướng dẫn
- **Chọn** loại đặc tả Unique, Generic hoặc Replica phù hợp
- **Thiết lập** tính toàn vẹn cấp trường
- **Làm việc** với người dùng và quản lý để định nghĩa đặc tả hoàn chỉnh

*Tiếp tục Chương 10: Mối quan hệ bảng*
