# Chương 2: Bắt Đầu Khám Phá Dữ Liệu Với SELECT

## Giới Thiệu

Phần tốt nhất của việc khám phá dữ liệu là khi bạn thực sự có thể phỏng vấn dữ liệu. Đó là những khoảnh khắc khi bạn khám phá xem dữ liệu có sạch hay bẩn, có đầy đủ hay không, và quan trọng nhất là câu chuyện mà dữ liệu kể. Hãy nghĩ về việc phỏng vấn dữ liệu như một quá trình tương tự như phỏng vấn một người ứng tuyển việc làm. Bạn muốn đặt câu hỏi để tiết lộ xem thực tế chuyên môn của họ có khớp với sơ yếu lý lịch không.

Phỏng vấn là thú vị vì bạn khám phá ra sự thật. Ví dụ, bạn có thể phát hiện ra rằng một nửa số người trả lời quên điền trường email trong bảng câu hỏi, hoặc thị trưởng chưa trả thuế tài sản trong năm năm qua. Hoặc bạn có thể học được rằng dữ liệu của bạn bẩn: tên được đánh vần không nhất quán, ngày tháng không chính xác, hoặc số không khớp với kỳ vọng của bạn. Những phát hiện của bạn trở thành một phần của câu chuyện dữ liệu.

Trong SQL, phỏng vấn dữ liệu bắt đầu với từ khóa **SELECT**, truy xuất các hàng và cột từ một hoặc nhiều bảng trong cơ sở dữ liệu. Một câu lệnh SELECT có thể đơn giản, truy xuất mọi thứ trong một bảng duy nhất, hoặc nó có thể phức tạp đủ để liên kết hàng chục bảng trong khi xử lý nhiều phép tính và lọc theo tiêu chí chính xác.

## Cú Pháp SELECT Cơ Bản

### Câu Lệnh SELECT Đơn Giản Nhất

Đây là câu lệnh SELECT truy xuất mọi hàng và cột trong một bảng có tên `my_table`:

```sql
SELECT * FROM my_table;
```

Dòng mã đơn này thể hiện dạng cơ bản nhất của một truy vấn SQL. Dấu hoa thị (`*`) theo sau từ khóa SELECT là một **ký tự đại diện (wildcard)**. Ký tự đại diện giống như một giá trị thay thế: nó không đại diện cho bất cứ thứ gì cụ thể và thay vào đó đại diện cho mọi thứ mà giá trị đó có thể là. Ở đây, nó là cách viết tắt của "chọn tất cả các cột."

**Các Thành Phần Chính:**
- `SELECT` - Từ khóa chỉ định các cột cần truy xuất
- `*` - Ký tự đại diện có nghĩa là "tất cả các cột"
- `FROM` - Từ khóa chỉ định bảng nguồn
- `my_table` - Tên của bảng
- `;` - Dấu chấm phẩy đánh dấu kết thúc câu lệnh truy vấn

### Ví Dụ: Truy Vấn Tất Cả Dữ Liệu

Sử dụng bảng `teachers` từ Chương 1:

```sql
SELECT * FROM teachers;
```

Điều này trả về tất cả các hàng và cột từ bảng teachers. Lưu ý rằng cột `id` (kiểu `bigserial`) tự động điền bằng các số nguyên tuần tự, mặc dù bạn không chèn chúng một cách rõ ràng. Số nguyên tự động tăng này hoạt động như một định danh duy nhất, hoặc khóa, không chỉ đảm bảo mỗi hàng trong bảng là duy nhất, mà còn sẽ cho chúng ta cách kết nối bảng này với các bảng khác trong cơ sở dữ liệu sau này.

## Truy Vấn Một Tập Hợp Con Các Cột

Sử dụng ký tự đại diện dấu hoa thị rất hữu ích để khám phá toàn bộ nội dung của bảng. Nhưng thường thì thực tế hơn là giới hạn các cột mà truy vấn truy xuất, đặc biệt là với các cơ sở dữ liệu lớn. Bạn có thể làm điều này bằng cách đặt tên các cột, được phân tách bằng dấu phẩy, ngay sau từ khóa SELECT.

### Cú Pháp

```sql
SELECT cột1, cột2, cột3 FROM tên_bảng;
```

Với cú pháp đó, truy vấn sẽ truy xuất tất cả các hàng chỉ từ những cột được chỉ định.

### Ví Dụ: Chọn Các Cột Cụ Thể

```sql
SELECT last_name, first_name, salary FROM teachers;
```

**Lưu Ý Quan Trọng:**
- Thứ tự của các cột trong truy vấn có thể khác với thứ tự trong bảng
- Bạn có thể truy xuất các cột theo bất kỳ thứ tự nào bạn muốn
- Đây là một chiến lược tốt để bắt đầu phỏng vấn một tập dữ liệu

### Đánh Giá Chất Lượng Dữ Liệu

Khi truy vấn dữ liệu, thông minh là bắt đầu phân tích của bạn bằng cách kiểm tra xem dữ liệu của bạn có hiện diện và ở định dạng bạn mong đợi không:
- Ngày tháng có ở định dạng tháng-ngày-năm đầy đủ không?
- Mỗi hàng có giá trị không?
- Có bí ẩn nào không có họ bắt đầu bằng chữ cái ngoài "M"?

Tất cả những vấn đề này cho thấy các mối nguy tiềm ẩn từ dữ liệu thiếu đến việc ghi chép kém ở đâu đó trong quy trình làm việc. Khi bạn đang đối mặt với một bảng có hàng nghìn hoặc thậm chí hàng triệu hàng, điều cần thiết là có được một cái nhìn nhanh về chất lượng dữ liệu và phạm vi giá trị mà nó chứa.

## Sử Dụng DISTINCT Để Tìm Giá Trị Duy Nhất

Trong một bảng, không có gì bất thường khi một cột chứa các hàng có giá trị trùng lặp. Trong bảng teachers, ví dụ, cột school liệt kê cùng tên trường nhiều lần vì mỗi trường tuyển dụng nhiều giáo viên.

### Cú Pháp DISTINCT Cơ Bản

Để hiểu phạm vi giá trị trong một cột, chúng ta có thể sử dụng từ khóa **DISTINCT** như một phần của truy vấn loại bỏ các bản sao và chỉ hiển thị các giá trị duy nhất. Sử dụng từ khóa DISTINCT ngay sau SELECT:

```sql
SELECT DISTINCT tên_cột
FROM tên_bảng;
```

### Ví Dụ: Tìm Tên Trường Duy Nhất

```sql
SELECT DISTINCT school
FROM teachers;
```

Điều này chỉ trả về các tên trường duy nhất, mặc dù có nhiều hàng trong bảng. Đây là bước đầu tiên hữu ích để đánh giá chất lượng dữ liệu. Ví dụ, nếu tên trường được đánh vần theo nhiều cách, những biến thể đánh vần đó sẽ dễ dàng phát hiện và sửa chữa.

### DISTINCT Với Nhiều Cột

Từ khóa DISTINCT cũng hoạt động trên nhiều hơn một cột cùng lúc. Nếu chúng ta thêm một cột, truy vấn trả về mỗi cặp giá trị duy nhất:

```sql
SELECT DISTINCT school, salary
FROM teachers;
```

Điều này trả về mỗi kết hợp duy nhất của trường và lương. Kỹ thuật này cho chúng ta khả năng hỏi, "Đối với mỗi x trong bảng, tất cả các giá trị y là gì?" Ví dụ:
- Đối với mỗi nhà máy, tất cả các hóa chất nó sản xuất là gì?
- Đối với mỗi khu vực bầu cử, tất cả các ứng cử viên đang tranh cử là ai?
- Đối với mỗi phòng hòa nhạc, các nghệ sĩ đang biểu diễn tháng này là ai?

## Sắp Xếp Dữ Liệu Với ORDER BY

Dữ liệu có thể có ý nghĩa hơn và có thể tiết lộ các mẫu dễ dàng hơn khi nó được sắp xếp theo thứ tự thay vì lộn xộn ngẫu nhiên.

### Cú Pháp ORDER BY Cơ Bản

Trong SQL, chúng ta sắp xếp kết quả của truy vấn bằng cách sử dụng một mệnh đề chứa các từ khóa **ORDER BY** theo sau là tên của cột hoặc các cột để sắp xếp. Áp dụng mệnh đề này không thay đổi bảng gốc, chỉ kết quả của truy vấn.

```sql
SELECT cột1, cột2
FROM tên_bảng
ORDER BY cột1 DESC;
```

### Hướng Sắp Xếp

- **ASC** - Thứ tự tăng dần (mặc định, có thể bỏ qua)
- **DESC** - Thứ tự giảm dần (phải chỉ định)

### Ví Dụ: Sắp Xếp Theo Lương

```sql
SELECT first_name, last_name, salary
FROM teachers
ORDER BY salary DESC;
```

Điều này sắp xếp cột lương từ cao nhất đến thấp nhất, cho phép bạn xác định giáo viên nào kiếm được nhiều nhất.

### Sắp Xếp Nhiều Cột

Bạn không bị giới hạn chỉ sắp xếp trên một cột. Bạn có thể sắp xếp theo nhiều cột:

```sql
SELECT last_name, school, hire_date
FROM teachers
ORDER BY school ASC, hire_date DESC;
```

Trong trường hợp này, chúng ta đang truy xuất họ của giáo viên, trường của họ và ngày họ được tuyển dụng. Bằng cách sắp xếp cột trường theo thứ tự tăng dần và hire_date theo thứ tự giảm dần, chúng ta tạo một danh sách giáo viên được nhóm theo trường với các giáo viên được tuyển dụng gần đây nhất được liệt kê đầu tiên.

**Lưu Ý Quan Trọng:**
- Bạn có thể sử dụng ORDER BY trên nhiều hơn hai cột, nhưng bạn sẽ sớm đạt đến điểm giảm lợi ích
- Một chiến lược tốt hơn là giới hạn số lượng cột trong truy vấn của bạn chỉ những cột quan trọng nhất, và sau đó chạy nhiều truy vấn để trả lời mỗi câu hỏi bạn có
- Tiêu hóa dữ liệu xảy ra dễ dàng nhất khi kết quả tập trung vào việc trả lời một câu hỏi cụ thể

### Hiểu Về Sắp Xếp Văn Bản

Sắp xếp một cột số trong PostgreSQL cho kết quả như bạn có thể mong đợi: dữ liệu được xếp hạng từ giá trị lớn nhất đến nhỏ nhất hoặc ngược lại. Nhưng sắp xếp một cột có chữ cái hoặc ký tự khác có thể trả về kết quả đáng ngạc nhiên, đặc biệt nếu nó có hỗn hợp ký tự chữ hoa và chữ thường, dấu câu hoặc số được xử lý như văn bản.

Trong quá trình cài đặt PostgreSQL, máy chủ được gán một locale cụ thể cho collation, hoặc sắp xếp văn bản, cũng như một bộ ký tự. Cả hai đều dựa trên cài đặt trong hệ điều hành máy tính hoặc các tùy chọn tùy chỉnh được cung cấp trong quá trình cài đặt.

**PostgreSQL sắp xếp các ký tự theo thứ tự này (dựa trên UTF-8):**
1. Dấu câu, bao gồm dấu ngoặc kép, ngoặc đơn và toán tử toán học
2. Số 0 đến 9
3. Dấu câu bổ sung, bao gồm dấu chấm hỏi
4. Chữ cái viết hoa từ A đến Z
5. Dấu câu nhiều hơn, bao gồm dấu ngoặc và dấu gạch dưới
6. Chữ cái viết thường từ a đến z
7. Dấu câu bổ sung, ký tự đặc biệt và bảng chữ cái mở rộng

Thông thường, thứ tự sắp xếp sẽ không phải là vấn đề vì các cột ký tự thường chỉ chứa tên, địa điểm, mô tả và văn bản đơn giản khác. Nhưng nếu bạn tự hỏi tại sao từ "Ladybug" xuất hiện trước "ladybug" trong sắp xếp của bạn, bây giờ bạn đã có lời giải thích.

## Lọc Hàng Với WHERE

Đôi khi, bạn sẽ muốn giới hạn các hàng mà truy vấn trả về chỉ những hàng trong đó một hoặc nhiều cột đáp ứng các tiêu chí nhất định. Sử dụng teachers làm ví dụ, bạn có thể muốn tìm tất cả giáo viên được tuyển dụng trước một năm cụ thể hoặc tất cả giáo viên kiếm được hơn $75,000 tại các trường tiểu học.

### Cú Pháp WHERE Cơ Bản

Từ khóa **WHERE** cho phép bạn tìm các hàng khớp với một giá trị cụ thể, một phạm vi giá trị hoặc nhiều giá trị dựa trên tiêu chí được cung cấp qua một toán tử. Bạn cũng có thể loại trừ các hàng dựa trên tiêu chí.

**Cú pháp SQL chuẩn:** Mệnh đề WHERE theo sau từ khóa FROM và tên của bảng hoặc các bảng đang được truy vấn.

```sql
SELECT cột1, cột2
FROM tên_bảng
WHERE điều_kiện;
```

### Ví Dụ: Lọc Theo Trường

```sql
SELECT last_name, school, hire_date
FROM teachers
WHERE school = 'Myers Middle School';
```

Điều này trả về chỉ các giáo viên được phân công tại Myers Middle School.

## Các Toán Tử So Sánh và Khớp

Mệnh đề WHERE sử dụng các toán tử để định nghĩa điều kiện. Đây là các toán tử so sánh và khớp được sử dụng phổ biến nhất trong PostgreSQL:

### Các Toán Tử So Sánh

| Toán Tử | Chức Năng | Ví Dụ |
|---------|-----------|-------|
| `=` | Bằng | `WHERE school = 'Baker Middle'` |
| `<>` hoặc `!=` | Không bằng* | `WHERE school <> 'Baker Middle'` |
| `>` | Lớn hơn | `WHERE salary > 20000` |
| `<` | Nhỏ hơn | `WHERE salary < 60500` |
| `>=` | Lớn hơn hoặc bằng | `WHERE salary >= 20000` |
| `<=` | Nhỏ hơn hoặc bằng | `WHERE salary <= 60500` |
| `BETWEEN` | Trong một phạm vi | `WHERE salary BETWEEN 20000 AND 40000` |
| `IN` | Khớp một trong một tập giá trị | `WHERE last_name IN ('Bush', 'Roush')` |
| `LIKE` | Khớp một mẫu (phân biệt chữ hoa chữ thường) | `WHERE first_name LIKE 'Sam%'` |
| `ILIKE` | Khớp một mẫu (không phân biệt chữ hoa chữ thường) | `WHERE first_name ILIKE 'sam%'` |
| `NOT` | Phủ định một điều kiện | `WHERE first_name NOT ILIKE 'sam%'` |

*Toán tử `!=` không phải là một phần của tiêu chuẩn ANSI SQL nhưng có sẵn trong PostgreSQL và một số hệ thống cơ sở dữ liệu khác.

### Ví Dụ Về Các Toán Tử So Sánh

**Bằng:**
```sql
SELECT first_name, last_name, school
FROM teachers
WHERE first_name = 'Janet';
```

**Không bằng:**
```sql
SELECT school
FROM teachers
WHERE school != 'F.D. Roosevelt HS';
```

**Nhỏ hơn (với ngày tháng):**
```sql
SELECT first_name, last_name, hire_date
FROM teachers
WHERE hire_date < '2000-01-01';
```

**Lớn hơn hoặc bằng:**
```sql
SELECT first_name, last_name, salary
FROM teachers
WHERE salary >= 43500;
```

**BETWEEN (bao gồm):**
```sql
SELECT first_name, last_name, school, salary
FROM teachers
WHERE salary BETWEEN 40000 AND 65000;
```

Lưu ý rằng BETWEEN là bao gồm, có nghĩa là kết quả sẽ bao gồm các giá trị khớp với phạm vi bắt đầu và kết thúc được chỉ định.

## Sử Dụng LIKE và ILIKE Với WHERE

Các toán tử so sánh khá đơn giản, nhưng LIKE và ILIKE xứng đáng được giải thích thêm. Cả hai đều cho phép bạn tìm kiếm các mẫu trong chuỗi bằng cách sử dụng hai ký tự đặc biệt:

### Ký Tự Đại Diện

- **Dấu phần trăm (`%`)** - Một ký tự đại diện khớp một hoặc nhiều ký tự
- **Dấu gạch dưới (`_`)** - Một ký tự đại diện khớp chỉ một ký tự

### Ví Dụ Mẫu

Ví dụ, nếu bạn đang cố gắng tìm từ "baker", các mẫu LIKE sau sẽ khớp với nó:
- `LIKE 'b%'` - Khớp với bất cứ thứ gì bắt đầu bằng "b"
- `LIKE '%ak%'` - Khớp với bất cứ thứ gì chứa "ak"
- `LIKE '_aker'` - Khớp với bất kỳ chuỗi 5 ký tự nào kết thúc bằng "aker"
- `LIKE 'ba_er'` - Khớp với "ba" + bất kỳ ký tự đơn nào + "er"

### LIKE vs ILIKE

Sự khác biệt giữa LIKE và ILIKE:
- **LIKE** - Phân biệt chữ hoa chữ thường (một phần của tiêu chuẩn ANSI SQL)
- **ILIKE** - Không phân biệt chữ hoa chữ thường (triển khai chỉ dành cho PostgreSQL)

### Ví Dụ: Phân Biệt Chữ Hoa Chữ Thường

```sql
-- Trả về không có kết quả (phân biệt chữ hoa chữ thường)
SELECT first_name
FROM teachers
WHERE first_name LIKE 'sam%';

-- Trả về Samuel và Samantha (không phân biệt chữ hoa chữ thường)
SELECT first_name
FROM teachers
WHERE first_name ILIKE 'sam%';
```

**Thực Hành Tốt:** Qua nhiều năm, nhiều nhà phát triển có xu hướng sử dụng ILIKE và các toán tử ký tự đại diện trong tìm kiếm để đảm bảo họ không vô tình loại trừ kết quả khỏi tìm kiếm. Đừng giả định rằng bất cứ ai đã gõ tên người, địa điểm, sản phẩm hoặc danh từ riêng khác luôn nhớ viết hoa chúng. Và nếu một trong những mục tiêu của việc phỏng vấn dữ liệu là hiểu chất lượng của nó, sử dụng tìm kiếm không phân biệt chữ hoa chữ thường sẽ giúp bạn tìm thấy các biến thể.

**Lưu Ý Hiệu Suất:** Vì LIKE và ILIKE tìm kiếm các mẫu, hiệu suất trên các cơ sở dữ liệu lớn có thể chậm. Chúng ta có thể cải thiện hiệu suất bằng cách sử dụng chỉ mục, sẽ được trình bày trong các chương sau.

## Kết Hợp Các Toán Tử Với AND và OR

Các toán tử so sánh trở nên hữu ích hơn khi chúng ta kết hợp chúng. Để làm điều này, chúng ta kết nối chúng bằng cách sử dụng các từ khóa **AND** và **OR** cùng với, nếu cần, dấu ngoặc đơn.

### Sử Dụng AND

Từ khóa AND yêu cầu cả hai điều kiện phải đúng:

```sql
SELECT *
FROM teachers
WHERE school = 'Myers Middle School'
AND salary < 40000;
```

Điều này tìm các giáo viên làm việc tại Myers Middle School **và** có lương ít hơn $40,000. Vì chúng ta kết nối hai điều kiện bằng AND, cả hai phải đúng để một hàng đáp ứng tiêu chí trong mệnh đề WHERE và được trả về trong kết quả truy vấn.

### Sử Dụng OR

Từ khóa OR yêu cầu ít nhất một điều kiện phải đúng:

```sql
SELECT *
FROM teachers
WHERE last_name = 'Cole'
OR last_name = 'Bush';
```

Điều này tìm kiếm bất kỳ giáo viên nào có họ khớp với Cole **hoặc** Bush. Khi chúng ta kết nối các điều kiện bằng OR, chỉ một trong các điều kiện phải đúng để một hàng đáp ứng tiêu chí của mệnh đề WHERE.

### Sử Dụng Dấu Ngoặc Đơn Để Nhóm

Khi chúng ta đặt các câu lệnh bên trong dấu ngoặc đơn, chúng được đánh giá như một nhóm trước khi được kết hợp với các tiêu chí khác:

```sql
SELECT *
FROM teachers
WHERE school = 'F.D. Roosevelt HS'
AND (salary < 38000 OR salary > 40000);
```

Điều này tìm các giáo viên tại Roosevelt có lương ít hơn $38,000 **hoặc** lớn hơn $40,000. Tên trường phải chính xác là F.D. Roosevelt HS **và** lương phải ít hơn hoặc cao hơn được chỉ định để một hàng đáp ứng tiêu chí của mệnh đề WHERE.

**Quan Trọng:** Không có dấu ngoặc đơn, truy vấn sẽ được hiểu khác đi do thứ tự ưu tiên toán tử. Dấu ngoặc đơn đảm bảo nhóm logic đúng.

## Kết Hợp Tất Cả Lại Với Nhau

Bạn có thể kết hợp các câu lệnh toán tử so sánh bằng cách sử dụng các từ khóa AND và OR để cung cấp nhiều tiêu chí lọc, và bạn có thể bao gồm mệnh đề ORDER BY để xếp hạng kết quả.

### Cấu Trúc Câu Lệnh SELECT Hoàn Chỉnh

SQL rất cụ thể về thứ tự của các từ khóa, vì vậy hãy tuân theo quy ước này:

```sql
SELECT tên_cột
FROM tên_bảng
WHERE tiêu_chí
ORDER BY tên_cột;
```

### Ví Dụ: Truy Vấn Hoàn Chỉnh

```sql
SELECT first_name, last_name, school, hire_date, salary
FROM teachers
WHERE school LIKE '%Roos%'
ORDER BY hire_date DESC;
```

Truy vấn này:
1. Chọn các cột cụ thể
2. Lọc các hàng nơi tên trường chứa "Roos" (phân biệt chữ hoa chữ thường)
3. Sắp xếp kết quả theo ngày tuyển dụng theo thứ tự giảm dần (mới nhất trước)

Điều này trả về các giáo viên tại Roosevelt High School, được sắp xếp từ tuyển dụng mới nhất đến sớm nhất. Chúng ta có thể thấy mối tương quan rõ ràng giữa ngày tuyển dụng của giáo viên tại trường và mức lương hiện tại của họ.

## Tóm Tắt

Bây giờ bạn đã học cấu trúc cơ bản của một số truy vấn SQL khác nhau, bạn đã có được nền tảng cho nhiều kỹ năng bổ sung sẽ được trình bày trong các chương sau. Sắp xếp, lọc và chọn chỉ những cột quan trọng nhất từ một bảng có thể mang lại một lượng thông tin đáng ngạc nhiên từ dữ liệu của bạn và giúp bạn tìm thấy câu chuyện mà nó kể.

### Các Khái Niệm Chính Đã Học

- **SELECT** - Truy xuất dữ liệu từ các bảng
- **Ký tự đại diện (`*`)** - Chọn tất cả các cột
- **Chọn Cột** - Chọn các cột cụ thể
- **DISTINCT** - Tìm các giá trị duy nhất
- **ORDER BY** - Sắp xếp kết quả truy vấn
- **WHERE** - Lọc các hàng dựa trên điều kiện
- **Các Toán Tử So Sánh** - `=`, `<>`, `>`, `<`, `>=`, `<=`, `BETWEEN`, `IN`
- **Khớp Mẫu** - `LIKE` và `ILIKE` với ký tự đại diện (`%`, `_`)
- **Các Toán Tử Logic** - `AND`, `OR`, `NOT`
- **Dấu Ngoặc Đơn** - Nhóm các điều kiện cho các truy vấn phức tạp

### Thực Hành Tốt

1. Bắt đầu với `SELECT *` để khám phá dữ liệu, sau đó thu hẹp thành các cột cụ thể
2. Sử dụng DISTINCT để đánh giá chất lượng dữ liệu và tìm các giá trị duy nhất
3. Sử dụng ORDER BY để tiết lộ các mẫu trong dữ liệu của bạn
4. Sử dụng WHERE để lọc dữ liệu để trả lời các câu hỏi cụ thể
5. Ưu tiên ILIKE hơn LIKE để khớp mẫu không phân biệt chữ hoa chữ thường
6. Sử dụng dấu ngoặc đơn để làm rõ các điều kiện logic phức tạp
7. Giới hạn các cột trong truy vấn để tập trung vào việc trả lời các câu hỏi cụ thể
8. Chạy nhiều truy vấn tập trung thay vì một truy vấn phức tạp

## Bước Tiếp Theo

Trong chương tiếp theo, bạn sẽ học về một khía cạnh nền tảng khác của SQL: kiểu dữ liệu. Hiểu về kiểu dữ liệu là điều cần thiết để làm việc hiệu quả với cơ sở dữ liệu và thực hiện phân tích chính xác.
