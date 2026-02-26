# Chương 7: Thiết lập cấu trúc bảng — Tóm tắt chi tiết

*Database Design for Mere Mortals®, Ấn bản kỷ niệm 25 năm — Phiên bản thứ tư*

---

## Tổng quan

Chương 7 trình bày **Giai đoạn 3** của quy trình thiết kế: **thiết lập cấu trúc bảng**. Bạn định nghĩa bảng (sơ bộ rồi cuối cùng), gán trường cho mỗi bảng, tinh chỉnh trường và tinh chỉnh cấu trúc bảng. Tổ chức theo dõi các chủ đề; mỗi chủ đề được đại diện bởi một bảng. Bảng tạo nền tảng của cơ sở dữ liệu; thiết kế đúng đảm bảo nền tảng chắc chắn.

---

## 1. Định nghĩa Danh sách bảng sơ bộ

Dùng ba quy trình để phát triển Danh sách bảng sơ bộ:

### Quy trình 1: Xác định chủ đề ngầm (từ Danh sách trường sơ bộ)

**Tại sao bắt đầu với trường, không phải chủ đề?** Danh sách chủ đề có vẻ trực quan hơn, nhưng thiếu bảng là rủi ro. Nghiên cứu trường giúp xác định chủ đề từ **góc nhìn không thiên lệch**—trường "nói" với bạn. Kiểm chéo với chủ đề xác định trong phỏng vấn.

**Quy trình:** Rà soát Danh sách trường sơ bộ. Hỏi: *Một tập trường có định nghĩa hoặc mô tả một chủ đề cụ thể không?* Khi bạn suy ra chủ đề, thêm vào Danh sách bảng sơ bộ mới. Tiếp tục đến khi rà soát hết trường.

### Quy trình 2: Sử dụng danh sách chủ đề (Gộp)

Gộp danh sách chủ đề (từ phỏng vấn) với phiên bản đầu của Danh sách bảng sơ bộ. Quy trình ba bước:

| Bước | Hành động |
|------|-----------|
| **1. Giải quyết mục trùng** | Mục trên cả hai danh sách có **cùng tên**. Xác định: chủ đề khác? → Đổi tên mỗi cái; thêm cả hai. Cùng chủ đề? → Gạch bỏ trên danh sách chủ đề; giữ trên Danh sách bảng sơ bộ. |
| **2. Giải quyết mục đại diện cùng chủ đề** | Mục có **tên khác** nhưng cùng chủ đề. Chọn tên tốt nhất; dùng làm định danh duy nhất. Gạch bỏ mục tương ứng trên danh sách kia. |
| **3. Gộp** | Thêm mục còn lại từ danh sách chủ đề vào Danh sách bảng sơ bộ. Loại danh sách chủ đề. Kết quả = phiên bản thứ hai của Danh sách bảng sơ bộ. |

### Quy trình 3: Sử dụng mục tiêu sứ mệnh

Dùng mục tiêu sứ mệnh để tìm chủ đề có thể bỏ sót. Áp dụng Kỹ thuật xác định chủ đề cho mỗi mục tiêu sứ mệnh; kiểm chéo với Danh sách bảng sơ bộ:

1. **Khớp** → Cùng chủ đề? Gạch bỏ trùng. Chủ đề khác? Đổi tên và thêm cả hai.
2. **Tên đồng nghĩa** → Cùng chủ đề? Chọn tên tốt nhất cho Danh sách bảng sơ bộ.
3. **Chủ đề mới** → Thêm vào Danh sách bảng sơ bộ.

---

## 2. Định nghĩa Danh sách bảng cuối cùng

Chuyển Danh sách bảng sơ bộ thành **Danh sách bảng cuối cùng** bằng cách thêm: tên bảng đã tinh chỉnh, loại bảng và mô tả bảng.

### Các loại bảng

| Loại | Mô tả |
|------|-------|
| **Dữ liệu** | Đại diện chủ đề quan trọng với tổ chức; nền tảng chính của thông tin cơ sở dữ liệu |
| **Liên kết** | Thiết lập liên kết giữa hai bảng trong mối quan hệ nhiều-nhiều |
| **Tập con** | Trường liên quan đến bảng dữ liệu; mô tả chủ đề bảng dữ liệu theo cách cụ thể |
| **Xác thực** | Dữ liệu tương đối tĩnh; quan trọng cho tính toàn vẹn dữ liệu |

*Ban đầu, chỉ định mọi bảng là bảng dữ liệu. Gán loại liên kết, tập con và xác thực sau.*

### Hướng dẫn tạo tên bảng (8)

1. **Duy nhất, mô tả rõ, có ý nghĩa** với toàn bộ tổ chức
2. **Chính xác, rõ ràng, không mơ hồ** xác định chủ đề
3. **Số từ tối thiểu** cần thiết
4. **Không dùng từ biểu đạt đặc điểm vật lý** (file, record, table)
5. **Không dùng viết tắt hay chữ viết tắt**
6. **Không dùng tên riêng** hoặc từ hạn chế dữ liệu có thể nhập
7. **Không dùng tên xác định nhiều hơn một chủ đề** (tránh "và," "hoặc," gạch chéo, ký tự &; tránh "Khác")
8. **Dùng dạng số nhiều** của tên

### Hướng dẫn soạn mô tả bảng (6)

1. **Định nghĩa chính xác** — Ai cũng có thể xác định bảng không nhầm lẫn
2. **Giải thích tầm quan trọng** — Tại sao dữ liệu quan trọng với tổ chức
3. **Rõ ràng và ngắn gọn** — Tránh lặp tên; không quá ngắn hoặc dài dòng
4. **Không có thông tin triển khai cụ thể** — Không đề cập cách/ở đâu bảng được dùng
5. **Độc lập** — Không làm mô tả này phụ thuộc mô tả kia
6. **Không dùng ví dụ** — Mô tả định nghĩa tốt tự giải thích

### Phỏng vấn người dùng và quản lý

Tiến hành phỏng vấn (thường cùng lúc) để thiết lập định nghĩa và tầm quan trọng mỗi bảng. Đạt đồng thuận. Soạn mô tả cuối dùng hướng dẫn. Hội ý lần nữa để chấp nhận. Danh sách bảng cuối cùng hoàn thành khi mọi người đồng ý.

---

## 3. Gán trường cho mỗi bảng

**Quy trình:** Gán trường từ Danh sách trường sơ bộ cho mỗi bảng trên Danh sách bảng cuối cùng. Xác định trường nào mô tả tốt nhất đặc điểm chủ đề mỗi bảng. Liệt kê trường dưới mỗi tên bảng. Nếu trường mô tả đặc điểm nhiều hơn một bảng, gán cho cả hai. Tinh chỉnh sau sẽ cho thấy tính phù hợp.

**Kỹ thuật:** Dùng tờ giấy; viết tên bảng ngang phía trên; liệt kê trường phía dưới. Tránh dùng RDBMS cho đến khi thiết kế hoàn thành.

---

## 4. Tinh chỉnh trường

### Hướng dẫn tạo tên trường (7)

1. Duy nhất, mô tả rõ, có ý nghĩa (ngoại lệ: trường thiết lập mối quan hệ)
2. Chính xác, rõ ràng, không mơ hồ xác định đặc điểm
3. Số từ tối thiểu cần thiết
4. Không viết tắt; dùng chữ viết tắt thận trọng
5. Không dùng từ thừa/đồng nghĩa gây nhầm lẫn
6. Không dùng tên xác định nhiều hơn một đặc điểm (tránh và, hoặc, gạch chéo, ký tự &)
7. Dùng dạng **số ít** (bảng = số nhiều; trường = số ít)

### Các yếu tố của Trường lý tưởng (6)

1. **Đại diện đặc điểm phân biệt** của chủ đề bảng
2. **Chỉ chứa một giá trị** (không trường đa giá trị)
3. **Không thể phân tách** thành thành phần nhỏ hơn (không trường đa phần/tổ hợp)
4. **Không chứa** giá trị tính toán hoặc nối chuỗi
5. **Duy nhất** trong toàn bộ cơ sở dữ liệu (trừ trường thiết lập mối quan hệ)
6. **Giữ phần lớn thuộc tính** khi xuất hiện trong nhiều hơn một bảng

### Giải quyết trường đa phần

**Trường đa phần** = lưu hai hoặc nhiều mục riêng biệt trong một giá trị (vd INSTNAME với họ + tên; INSTADDRESS với đường, thành phố, bang, mã bưu điện).

**Giải pháp:** Xác định mục riêng biệt; coi mỗi mục là một trường. Hỏi: *Giá trị trường này đại diện mục cụ thể nào?* Chuyển mỗi mục thành trường mới.

**Ví dụ:** INSTNAME → INSTFIRST NAME, INSTLAST NAME. INSTADDRESS → INSTSTREET ADDRESS, INSTCITY, INSTSTATE, INSTZIPCODE.

**Đa phần ẩn:** INSTRUMENT ID có thể mã hóa danh mục (AMP, GUIT) + số ID—phân tách thành trường riêng.

### Giải quyết trường đa giá trị (3 bước)

**Trường đa giá trị** = có thể lưu hai hoặc nhiều thể hiện cùng giá trị (thường tên số nhiều; giá trị chứa dấu phẩy).

**Vấn đề:** Khó truy xuất, sắp xếp; giới hạn số giá trị; dữ liệu thừa nếu "làm phẳng" thành một giá trị mỗi bản ghi.

**Giải pháp:**

1. Loại trường; dùng làm cơ sở cho **bảng mới**. Đổi tên nếu cần (vd CATEGORIES TAUGHT → CATEGORY TAUGHT).
2. Dùng trường từ bảng gốc để **liên kết** bảng gốc với bảng mới. Các trường đó xuất hiện ở cả hai bảng.
3. Gán tên, loại, mô tả cho bảng mới; thêm vào Danh sách bảng cuối cùng.

**Trường phụ thuộc:** Nếu trường khác (vd MAXIMUM LEVEL TAUGHT) có mối liên hệ một-một với trường đa giá trị, đưa trường phụ thuộc vào cấu trúc bảng mới.

---

## 5. Tinh chỉnh cấu trúc bảng

### Dữ liệu thừa so với trường trùng

**Dữ liệu thừa** = giá trị lặp lại trong trường do (a) vai trò trường trong việc liên kết hai bảng—chấp nhận được; hoặc (b) bất thường trường/bảng—không chấp nhận được.

**Trường trùng** = trường xuất hiện trong hai hoặc nhiều bảng do: liên kết bảng (cần thiết); nhiều thể hiện cùng giá trị (không cần thiết); nhu cầu thông tin bổ sung (không cần thiết).

### Các yếu tố của Bảng lý tưởng (6)

1. **Đại diện một chủ đề** (đối tượng hoặc sự kiện)
2. **Có khóa chính**
3. **Không có trường đa phần hoặc đa giá trị**
4. **Không có trường tính toán**
5. **Không có trường trùng không cần thiết**
6. **Chỉ lượng dữ liệu thừa tối thiểu tuyệt đối**

### Giải quyết trường trùng không cần thiết

| Loại | Giải pháp |
|------|-----------|
| **Trường tham chiếu** | Cung cấp thông tin bổ sung từ bảng khác (vd MANPHONE, WEB SITE trong INSTRUMENTS khi đã có trong MANUFACTURERS). **Loại** khỏi bảng. Dùng khung nhìn để kết hợp trường khi cần. |
| **Nhiều thể hiện** | INSTRUMENT 1, INSTRUMENT 2, INSTRUMENT 3 = trường đa giá trị đã làm phẳng. Giải quyết như trường đa giá trị: tạo bảng mới (vd STUDENT INSTRUMENTS) với trường liên kết. |
| **Hai tập** | Hai trường đa giá trị đã làm phẳng (vd nhạc cụ + ngày mượn). Hình dung từng cái; giải quyết cả hai; xử lý mối liên một-một giữa giá trị (đưa phụ thuộc vào bảng mới). |

### Bảng tập con

**Bảng tập con** = đại diện **chủ đề phụ thuộc** của một bảng dữ liệu cụ thể. Chứa trường liên quan chủ đề phụ thuộc + trường từ bảng dữ liệu để liên kết. **Không** chứa trường chung cho cả hai—những trường đó ở bảng dữ liệu.

**Khi nào tạo:** Bảng có nhiều giá trị trống; trường chia thành nhóm riêng (vd thiết bị vs. sách trong INVENTORY).

**Các bước:**

1. Dùng trường chuyên biệt tạo bảng tập con mới (vd EQUIPMENT, BOOKS).
2. Thêm trường liên kết (vd ITEM NAME) để liên kết tập con với bảng dữ liệu.
3. Thêm vào Danh sách bảng cuối cùng; loại = "Tập con."

### Tinh chỉnh bảng tập con chưa xác định trước đó

Bảng có cấu trúc gần như giống nhau (vd FULL-TIME EMPLOYEES, PART-TIME EMPLOYEES) thường là bảng tập con. Trường chung bị trùng không cần thiết.

**Các bước:**

1. Loại trường chung; dùng làm cơ sở cho **bảng dữ liệu mới** (vd EMPLOYEES).
2. Đặt tên phù hợp cho bảng mới.
3. Đảm bảo bảng tập con đại diện chủ đề phụ thuộc; đổi tên nếu cần.
4. Thêm bảng dữ liệu vào Danh sách bảng cuối cùng; loại = "Dữ liệu."

---

## Câu hỏi ôn tập (Tự kiểm tra)

1. Bạn xác định và thiết lập bảng cho cơ sở dữ liệu mới thế nào?
2. Tại sao bạn dùng Danh sách trường sơ bộ để giúp định nghĩa bảng?
3. Bạn làm gì khi mục trên danh sách chủ đề và mục tên khác trên Danh sách bảng sơ bộ đều đại diện cùng chủ đề?
4. Danh sách bảng cuối cùng cung cấp thông tin gì?
5. Nêu ba hướng dẫn tạo tên bảng.
6. Nêu hai hướng dẫn soạn mô tả bảng.
7. Bạn gán trường cho bảng trên Danh sách bảng cuối cùng thế nào?
8. Nêu ba hướng dẫn tạo tên trường.
9. Hai vấn đề gì trường thiết kế kém có thể gây ra?
10. Bạn dùng gì để giải quyết bất thường trường?
11. Nêu ba yếu tố của Trường lý tưởng.
12. Dưới điều kiện nào dữ liệu thừa chấp nhận được?
13. Nói chung, ba bước nào bạn làm để giải quyết trường đa giá trị?
14. Khi nào cần dùng trường trùng trong bảng?
15. Bạn có thể tinh chỉnh cấu trúc bảng thế nào?
16. Nêu ba yếu tố của Bảng lý tưởng.
17. Bảng tập con là gì?

### Đáp án

1. Bằng **Danh sách bảng sơ bộ**.
2. Vì trường trên danh sách **có thể ngụ ý chủ đề** cơ sở dữ liệu cần theo dõi.
3. Chọn tên **mô tả tốt nhất chủ đề** và dùng làm định danh duy nhất.
4. **Tên, loại và mô tả** của mỗi bảng.
5. Ba trong tám hướng dẫn.
6. Hai trong sáu hướng dẫn.
7. Bằng cách xác định trường nào **mô tả tốt nhất đặc điểm** của chủ đề bảng.
8. Ba trong bảy hướng dẫn.
9. **Dữ liệu trùng** và **dữ liệu thừa**.
10. Đảm bảo trường tuân thủ **Các yếu tố của Trường lý tưởng**.
11. Ba trong sáu yếu tố.
12. Khi là kết quả giải quyết trường đa giá trị hoặc trường trùng không cần thiết (giai đoạn đầu), hoặc khi là kết quả **liên kết hai bảng**.
13. (1) Loại trường và dùng làm cơ sở cho bảng mới; (2) Dùng trường từ bảng gốc để liên kết; (3) Gán tên, loại, mô tả cho bảng mới và thêm vào Danh sách bảng cuối cùng.
14. Khi trường **thiết lập mối quan hệ** giữa hai bảng.
15. Bằng cách đảm bảo mỗi bảng tuân thủ **Các yếu tố của Bảng lý tưởng**.
16. Ba trong sáu yếu tố.
17. Bảng đại diện **chủ đề phụ thuộc** của một bảng dữ liệu cụ thể.

---

## Liên kết với mục tiêu học tập

Sau khi học chương này, bạn cần có khả năng:
- **Định nghĩa** Danh sách bảng sơ bộ và cuối cùng bằng trường, chủ đề và mục tiêu sứ mệnh
- **Áp dụng** hướng dẫn cho tên bảng và mô tả bảng
- **Gán** trường cho bảng và **tinh chỉnh** trường (đa phần, đa giá trị)
- **Tinh chỉnh** cấu trúc bảng (trường trùng, bảng tập con)

*Tiếp tục sang Chương 8: Khóa*
