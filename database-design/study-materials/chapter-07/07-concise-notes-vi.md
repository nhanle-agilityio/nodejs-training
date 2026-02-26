# Chương 7: Thiết lập cấu trúc bảng — Ghi chú học tập (Mở rộng)

*Ghi chú chi tiết cho việc học, ôn tập và giải thích khái niệm Giai đoạn 3*

---

## Chương này trình bày gì

Chương 7 nói về **Giai đoạn 3**: **thiết lập cấu trúc bảng**. Bạn tạo Danh sách bảng sơ bộ → Danh sách bảng cuối cùng → gán trường → tinh chỉnh trường → tinh chỉnh cấu trúc bảng. Mỗi bảng = một chủ đề. Bảng = nền tảng của cơ sở dữ liệu.

---

## Ba quy trình cho Danh sách bảng sơ bộ

| # | Nguồn | Hành động |
|---|-------|-----------|
| **1** | Danh sách trường sơ bộ | Suy chủ đề từ nhóm trường. Góc nhìn không thiên lệch—trường "nói." |
| **2** | Danh sách chủ đề | Gộp: (1) giải quyết trùng, (2) giải quyết cùng-chủ đề-khác-tên, (3) kết hợp. |
| **3** | Mục tiêu sứ mệnh | Kỹ thuật xác định chủ đề; kiểm chéo chủ đề bỏ sót. |

### Các bước gộp (Danh sách chủ đề + Danh sách bảng sơ bộ)

- **Trùng** (cùng tên): Chủ đề khác? Đổi tên cả hai, thêm cả hai. Cùng chủ đề? Gạch bỏ trên danh sách chủ đề.
- **Cùng chủ đề, tên khác**: Chọn tên tốt nhất; dùng làm định danh duy nhất. Gạch bỏ mục tương ứng.
- **Kết hợp**: Thêm phần còn lại vào Danh sách bảng sơ bộ; loại danh sách chủ đề.

---

## Danh sách bảng cuối cùng

Thêm cho mỗi bảng: **tên đã tinh chỉnh**, **loại**, **mô tả**.

### Loại bảng

- **Dữ liệu** — Chủ đề chính; nền tảng thông tin
- **Liên kết** — Quan hệ M:N (sau)
- **Tập con** — Chủ đề phụ thuộc của bảng dữ liệu
- **Xác thực** — Tra cứu tĩnh (sau)

*Ban đầu: tất cả = bảng dữ liệu.*

### Hướng dẫn tên bảng (8)

- Duy nhất, mô tả rõ, có ý nghĩa
- Không mơ hồ; số từ tối thiểu; không từ vật lý (file, record, table)
- Không viết tắt, chữ viết tắt, tên riêng
- Không nhiều chủ đề (và, hoặc, gạch chéo, ký tự &, "Khác")
- Dạng **số nhiều**

### Hướng dẫn mô tả bảng (6)

- Định nghĩa chính xác + tại sao quan trọng
- Rõ ràng, ngắn gọn; không thông tin triển khai; độc lập; không ví dụ

---

## Gán trường

Gán trường từ Danh sách trường sơ bộ cho bảng. Trường nào **mô tả tốt nhất đặc điểm** chủ đề mỗi bảng? Dùng giấy; liệt kê dưới mỗi tên bảng.

---

## Tinh chỉnh trường

### Hướng dẫn tên trường (7)

- Duy nhất, mô tả rõ (ngoại lệ: trường quan hệ)
- Không mơ hồ; số từ tối thiểu
- Không viết tắt; chữ viết tắt thận trọng
- Không từ thừa/đồng nghĩa; không nhiều đặc điểm
- Dạng **số ít** (bảng = số nhiều; trường = số ít)

### Các yếu tố của Trường lý tưởng (6)

1. Đặc điểm phân biệt của chủ đề
2. Chỉ một giá trị
3. Không thể phân tách (không đa phần)
4. Không giá trị tính toán/nối chuỗi
5. Duy nhất trong DB (trừ trường quan hệ)
6. Giữ thuộc tính khi ở nhiều bảng

### Trường đa phần → Tách

INSTNAME (họ + tên) → INSTFIRST NAME, INSTLAST NAME  
INSTADDRESS (đường, thành phố, bang, ZIP) → bốn trường riêng  
INSTRUMENT ID (danh mục + số) → hai trường

### Trường đa giá trị → Bảng mới (3 bước)

1. **Loại** trường; dùng làm cơ sở cho **bảng mới**. Đổi tên nếu cần.
2. **Liên kết** qua trường từ bảng gốc (xuất hiện ở cả hai).
3. **Thêm** bảng mới vào Danh sách bảng cuối cùng (tên, loại, mô tả).

*Trường phụ thuộc (1:1 với đa giá trị)? Đưa vào bảng mới.*

---

## Tinh chỉnh cấu trúc bảng

### Dữ liệu thừa vs. Trường trùng

- **Dữ liệu thừa** OK khi do liên kết bảng; KHÔNG OK khi do bất thường
- **Trường trùng** cần thiết chỉ khi **thiết lập mối quan hệ**

### Các yếu tố của Bảng lý tưởng (6)

1. Một chủ đề
2. Có khóa chính
3. Không trường đa phần/đa giá trị
4. Không trường tính toán
5. Không trường trùng không cần thiết
6. Dữ liệu thừa tối thiểu

### Trường trùng không cần thiết

| Loại | Cách sửa |
|------|----------|
| **Tham chiếu** (thông tin từ bảng khác) | Loại bỏ. Dùng khung nhìn để kết hợp. |
| **Nhiều thể hiện** (INSTRUMENT 1, 2, 3) | Coi như đa giá trị đã làm phẳng → bảng mới |

### Bảng tập con

**Định nghĩa:** Chủ đề phụ thuộc của bảng dữ liệu. Có trường riêng + trường liên kết từ bảng dữ liệu. Trường chung ở bảng dữ liệu.

**Khi nào:** Nhiều giá trị trống; trường chia thành nhóm riêng (vd thiết bị vs. sách).

**Các bước:** Tạo bảng tập con; thêm trường liên kết; thêm vào Danh sách bảng cuối cùng (loại = Tập con).

### Bảng tập con chưa xác định trước đó

Bảng có cấu trúc gần như giống nhau (vd FULL-TIME EMPLOYEES, PART-TIME EMPLOYEES) = bảng tập con. Trích trường chung → bảng dữ liệu mới (vd EMPLOYEES); bảng tập con trở thành phụ thuộc.

---

## Gợi nhớ

| Khái niệm | Điểm chính |
|-----------|------------|
| **Danh sách bảng sơ bộ** | Từ trường (chủ đề ngụ ý) + chủ đề (gộp) + mục tiêu sứ mệnh |
| **Tên bảng** | Số nhiều; duy nhất; không mơ hồ; không viết tắt |
| **Tên trường** | Số ít; duy nhất; không mơ hồ |
| **Đa phần** | Tách thành trường riêng |
| **Đa giá trị** | Bảng mới + liên kết |
| **Trường trùng** | OK chỉ cho quan hệ |
| **Bảng tập con** | Chủ đề phụ thuộc; trường liên kết từ bảng dữ liệu |

---

## Tham khảo nhanh

- **Trường lý tưởng:** Một giá trị, không đa phần, không tính toán, duy nhất
- **Bảng lý tưởng:** Một chủ đề, PK, không đa phần/đa giá trị/tính toán/trùng không cần thiết
- **Trường tham chiếu** = Loại bỏ
- **Đa giá trị đã làm phẳng** (Field1, Field2, Field3) = Giải quyết như đa giá trị
