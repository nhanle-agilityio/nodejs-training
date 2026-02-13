# Chương 1: Tạo Cơ Sở Dữ Liệu và Bảng Đầu Tiên

## Giới Thiệu

SQL không chỉ là công cụ để trích xuất kiến thức từ dữ liệu. Nó còn là ngôn ngữ để định nghĩa các cấu trúc lưu trữ dữ liệu để chúng ta có thể tổ chức các mối quan hệ trong dữ liệu. Trong số các cấu trúc đó, quan trọng nhất là **bảng (table)**.

Bảng là một lưới các hàng và cột lưu trữ dữ liệu. Mỗi hàng chứa một tập hợp các cột, và mỗi cột chứa dữ liệu của một kiểu được chỉ định: thường là số, ký tự và ngày tháng. Chúng ta sử dụng SQL để định nghĩa cấu trúc của bảng và cách mỗi bảng có thể liên quan đến các bảng khác trong cơ sở dữ liệu. Chúng ta cũng sử dụng SQL để trích xuất, hoặc truy vấn, dữ liệu từ các bảng.

### Hiểu Về Bảng

Hiểu về bảng là điều cơ bản để hiểu dữ liệu trong cơ sở dữ liệu của bạn. Khi bắt đầu với một cơ sở dữ liệu mới, bước đầu tiên là xem xét các bảng trong đó. Hãy tìm manh mối trong:
- Tên bảng và cấu trúc cột của chúng
- Các loại dữ liệu chúng chứa (văn bản, số, hoặc cả hai)
- Có bao nhiêu hàng trong mỗi bảng
- Có bao nhiêu bảng trong cơ sở dữ liệu

Cơ sở dữ liệu đơn giản nhất có thể chỉ có một bảng. Một ứng dụng đầy đủ xử lý dữ liệu khách hàng hoặc theo dõi hàng không có thể có hàng chục hoặc hàng trăm bảng. Số lượng bảng cho bạn biết không chỉ lượng dữ liệu bạn cần phân tích, mà còn gợi ý rằng bạn nên khám phá các mối quan hệ giữa dữ liệu trong mỗi bảng.

### Ví Dụ: Cấu Trúc Cơ Sở Dữ Liệu Quan Hệ

Hãy xem xét một cơ sở dữ liệu giả định để quản lý việc đăng ký lớp học của trường. Trong cơ sở dữ liệu đó có một số bảng theo dõi sinh viên và các lớp học của họ:

**Bảng student_enrollment:**
```
student_id  | class_id     | class_section | semester
------------|--------------|---------------|----------
CHRISPA004  | COMPSCI101   | 3             | Fall 2017
DAVISHE010  | COMPSCI101   | 3             | Fall 2017
ABRILDA002  | ENG101       | 40            | Fall 2017
DAVISHE010  | ENG101       | 40            | Fall 2017
RILEYPH002  | ENG101       | 40            | Fall 2017
```

**Bảng students:**
```
student_id  | first_name | last_name  | dob
------------|------------|------------|----------
ABRILDA002  | Abril      | Davis      | 1999-01-10
CHRISPA004  | Chris      | Park       | 1996-04-10
DAVISHE010  | Davis      | Hernandez  | 1987-09-14
RILEYPH002  | Riley      | Phelps     | 1996-06-15
```

Cột `student_id` hoạt động như một khóa duy nhất kết nối cả hai bảng, cho phép bạn tạo các mối quan hệ giữa dữ liệu. Các nhà xây dựng cơ sở dữ liệu thích tổ chức dữ liệu bằng cách sử dụng các bảng riêng biệt cho mỗi thực thể chính mà cơ sở dữ liệu quản lý để giảm dữ liệu trùng lặp. Trong ví dụ, chúng ta lưu trữ tên và ngày sinh của mỗi sinh viên chỉ một lần, ngay cả khi sinh viên đăng ký nhiều lớp học.

## Tạo Cơ Sở Dữ Liệu

Chương trình PostgreSQL là một **hệ thống quản lý cơ sở dữ liệu**, một gói phần mềm cho phép bạn định nghĩa, quản lý và truy vấn cơ sở dữ liệu. Khi bạn cài đặt PostgreSQL, nó đã tạo một **máy chủ cơ sở dữ liệu**—một phiên bản của ứng dụng đang chạy trên máy tính của bạn—bao gồm một cơ sở dữ liệu mặc định có tên là `postgres`.

Cơ sở dữ liệu là một tập hợp các đối tượng bao gồm bảng, hàm, vai trò người dùng và nhiều thứ khác. Theo tài liệu PostgreSQL, cơ sở dữ liệu mặc định "được dùng cho người dùng, tiện ích và ứng dụng của bên thứ ba". Trong các bài tập trong chương này, chúng ta sẽ để mặc định như vậy và thay vào đó tạo một cơ sở dữ liệu mới. Chúng ta làm điều này để giữ các đối tượng liên quan đến một chủ đề hoặc ứng dụng cụ thể được tổ chức cùng nhau.

### Câu Lệnh SQL Để Tạo Cơ Sở Dữ Liệu

Để tạo cơ sở dữ liệu, bạn chỉ cần một dòng SQL:

```sql
CREATE DATABASE analysis;
```

Câu lệnh này tạo một cơ sở dữ liệu trên máy chủ của bạn có tên `analysis` sử dụng các cài đặt mặc định của PostgreSQL. Mã bao gồm hai từ khóa—`CREATE` và `DATABASE`—theo sau là tên của cơ sở dữ liệu mới. Câu lệnh kết thúc bằng dấu chấm phẩy, báo hiệu kết thúc lệnh.

**Lưu Ý Quan Trọng:**
- Dấu chấm phẩy kết thúc tất cả các câu lệnh PostgreSQL và là một phần của tiêu chuẩn ANSI SQL
- Đôi khi bạn có thể bỏ qua dấu chấm phẩy, nhưng không phải lúc nào cũng vậy, và đặc biệt là không khi chạy nhiều câu lệnh trong admin
- Sử dụng dấu chấm phẩy là một thói quen tốt cần hình thành

### Thực Thi SQL Trong pgAdmin

pgAdmin là công cụ quản trị đồ họa cho PostgreSQL. Trong phần lớn công việc của chúng ta, bạn sẽ sử dụng pgAdmin để chạy (hoặc thực thi) các câu lệnh SQL mà chúng ta viết.

**Các Bước Tạo Cơ Sở Dữ Liệu Trong pgAdmin:**

1. Chạy PostgreSQL. Nếu bạn đang sử dụng Windows, trình cài đặt đã đặt PostgreSQL để khởi động mỗi khi bạn khởi động máy. Trên macOS, bạn phải nhấp đúp vào Postgres.app trong thư mục Applications của bạn.

2. Khởi chạy pgAdmin. Trong ngăn dọc bên trái (trình duyệt đối tượng), mở rộng dấu cộng bên trái nút Servers để hiển thị máy chủ mặc định.

3. Nhấp đúp vào tên máy chủ. Nếu bạn đã cung cấp mật khẩu trong quá trình cài đặt, hãy nhập mật khẩu tại lời nhắc.

4. Trong trình duyệt đối tượng của pgAdmin, mở rộng Databases và nhấp một lần vào cơ sở dữ liệu `postgres` để làm nổi bật nó.

5. Mở Query Tool bằng cách chọn Tools → Query Tool.

6. Trong ngăn SQL Editor (ngăn ngang phía trên), nhập hoặc sao chép mã `CREATE DATABASE analysis;`.

7. Nhấp vào biểu tượng tia sét để thực thi câu lệnh.

8. Để xem cơ sở dữ liệu mới của bạn, nhấp chuột phải vào Databases trong trình duyệt đối tượng. Từ menu pop-up, chọn Refresh, và cơ sở dữ liệu `analysis` sẽ xuất hiện trong danh sách.

**Thực Hành Tốt:** Trong công việc của riêng bạn, thường là thực hành tốt để tạo một cơ sở dữ liệu mới cho mỗi dự án để giữ các bảng có dữ liệu liên quan cùng nhau.

### Kết Nối Với Cơ Sở Dữ Liệu Analysis

Trước khi bạn tạo bảng, bạn phải đảm bảo rằng pgAdmin được kết nối với cơ sở dữ liệu `analysis` thay vì cơ sở dữ liệu mặc định `postgres`.

**Các Bước Kết Nối:**

1. Đóng Query Tool bằng cách nhấp vào X ở góc trên bên phải của công cụ. Bạn không cần lưu tệp khi được nhắc.

2. Trong trình duyệt đối tượng, nhấp một lần vào cơ sở dữ liệu `analysis`.

3. Mở lại Query Tool bằng cách chọn Tools → Query Tool.

4. Bây giờ bạn sẽ thấy nhãn `analysis on postgres@localhost` ở đầu cửa sổ Query Tool.

Bây giờ, bất kỳ mã nào bạn thực thi sẽ áp dụng cho cơ sở dữ liệu `analysis`.

## Tạo Bảng

Bảng là nơi dữ liệu sống và các mối quan hệ của nó được định nghĩa. Khi bạn tạo bảng, bạn:
- Gán tên cho mỗi cột (đôi khi được gọi là trường hoặc thuộc tính)
- Gán cho nó một kiểu dữ liệu

Đây là các giá trị mà cột sẽ chấp nhận—chẳng hạn như văn bản, số nguyên, số thập phân và ngày tháng—và định nghĩa của kiểu dữ liệu là một cách SQL thực thi tính toàn vẹn của dữ liệu. Ví dụ, một cột được định nghĩa là `date` sẽ nhận dữ liệu ở một trong nhiều định dạng chuẩn, chẳng hạn như `YYYY-MM-DD`. Nếu bạn cố gắng nhập các ký tự không phải định dạng ngày, ví dụ, từ "peach", bạn sẽ nhận được lỗi.

Dữ liệu được lưu trữ trong bảng có thể được truy cập và phân tích, hoặc truy vấn, bằng các câu lệnh SQL. Bạn có thể sắp xếp, chỉnh sửa và xem dữ liệu, và dễ dàng thay đổi bảng sau này nếu nhu cầu của bạn thay đổi.

### Câu Lệnh CREATE TABLE

Đối với bài tập này, chúng ta sẽ sử dụng một phần dữ liệu thường được thảo luận: lương giáo viên. Đây là câu lệnh SQL để tạo một bảng có tên `teachers`:

```sql
CREATE TABLE teachers (
    id bigserial,
    first_name varchar(25),
    last_name varchar(50),
    school varchar(50),
    hire_date date,
    salary numeric
);
```

**Hiểu Về Câu Lệnh:**

1. **Từ khóa CREATE TABLE**: Mã bắt đầu bằng hai từ khóa SQL `CREATE` và `TABLE` mà, cùng với tên `teachers`, báo hiệu PostgreSQL rằng đoạn mã tiếp theo mô tả một bảng để thêm vào cơ sở dữ liệu.

2. **Định nghĩa cột**: Theo sau dấu ngoặc mở, câu lệnh bao gồm danh sách tên cột được phân tách bằng dấu phẩy cùng với kiểu dữ liệu của chúng. Vì mục đích phong cách, mỗi dòng mã mới nằm trên dòng riêng của nó và được thụt lề bốn khoảng trắng, điều này không bắt buộc, nhưng nó làm cho mã dễ đọc hơn.

3. **Chi tiết cột**:
   - **id**: Cột `id` có kiểu dữ liệu `bigserial`, một kiểu số nguyên đặc biệt tự động tăng mỗi khi bạn thêm một hàng vào bảng. Hàng đầu tiên nhận giá trị 1 trong cột id, hàng thứ hai là 2, và cứ thế. Kiểu dữ liệu `bigserial` và các kiểu serial khác là các triển khai cụ thể của PostgreSQL, nhưng hầu hết các hệ thống cơ sở dữ liệu đều có tính năng tương tự.
   - **first_name, last_name, school**: Mỗi cột có kiểu dữ liệu `varchar`, một cột văn bản có độ dài tối đa được chỉ định bởi số trong ngoặc đơn. Chúng ta giả định rằng không ai trong cơ sở dữ liệu sẽ có họ dài hơn 50 ký tự.
   - **hire_date**: Được đặt thành kiểu dữ liệu `date`
   - **salary**: Kiểu `numeric`

4. **Kết thúc**: Khối mã kết thúc bằng dấu ngoặc đóng và dấu chấm phẩy.

**Lưu Ý:** Định nghĩa bảng này chưa đầy đủ. Ví dụ, nó thiếu một số ràng buộc sẽ đảm bảo rằng các cột phải được điền có dữ liệu hoặc chúng ta không vô tình nhập các giá trị trùng lặp. Các ràng buộc được trình bày chi tiết trong Chương 7.

### Tạo Bảng teachers

Để tạo bảng bằng pgAdmin:

1. Mở pgAdmin Query Tool (nếu chưa mở, nhấp một lần vào cơ sở dữ liệu `analysis` trong trình duyệt đối tượng của pgAdmin, sau đó chọn Tools → Query Tool).

2. Sao chép script CREATE TABLE vào SQL Editor.

3. Thực thi script bằng cách nhấp vào biểu tượng tia sét.

Nếu mọi thứ diễn ra tốt đẹp, bạn sẽ thấy thông báo trong ngăn đầu ra dưới cùng của pgAdmin Query Tool có nội dung "Query returned successfully with no result in X msec."

**Xem Bảng:**

1. Quay lại cửa sổ pgAdmin chính và, trong trình duyệt đối tượng, nhấp chuột phải vào cơ sở dữ liệu `analysis` và chọn Refresh.

2. Chọn Schemas → public → Tables để xem bảng mới của bạn.

3. Mở rộng nút bảng `teachers` bằng cách nhấp vào dấu cộng bên trái tên của nó. Điều này hiển thị thêm chi tiết về bảng, bao gồm tên cột.

4. Nhấp vào tên bảng và sau đó chọn menu SQL trong không gian làm việc pgAdmin sẽ hiển thị câu lệnh SQL được sử dụng để tạo bảng `teachers`.

## Chèn Hàng Vào Bảng

Bạn có thể thêm dữ liệu vào bảng PostgreSQL theo nhiều cách. Thường thì bạn sẽ làm việc với một số lượng lớn hàng, vì vậy phương pháp dễ nhất là nhập dữ liệu từ tệp văn bản hoặc cơ sở dữ liệu khác trực tiếp vào bảng. Nhưng để bắt đầu, chúng ta sẽ thêm một vài hàng bằng câu lệnh `INSERT INTO ... VALUES` chỉ định các cột đích và giá trị dữ liệu.

### Câu Lệnh INSERT

Để chèn một số dữ liệu vào bảng, hãy sao chép mã sau vào pgAdmin Query Tool của bạn:

```sql
INSERT INTO teachers (first_name, last_name, school, hire_date, salary)
VALUES ('Janet', 'Smith', 'F.D. Roosevelt HS', '2011-10-30', 36200),
       ('Lee', 'Reynolds', 'F.D. Roosevelt HS', '1993-05-22', 65000),
       ('Samuel', 'Cole', 'Myers Middle School', '2005-08-01', 43500),
       ('Samantha', 'Bush', 'Myers Middle School', '2011-10-30', 36200),
       ('Betty', 'Diaz', 'Myers Middle School', '2005-08-30', 43500),
       ('Kathleen', 'Roush', 'F.D. Roosevelt HS', '2010-10-22', 38500);
```

**Hiểu Về Câu Lệnh INSERT:**

1. **Từ khóa INSERT INTO**: Sau các từ khóa `INSERT INTO` là tên của bảng, và trong ngoặc đơn là các cột sẽ được điền.

2. **Từ khóa VALUES**: Ở dòng tiếp theo là từ khóa `VALUES` và dữ liệu để chèn vào mỗi cột trong mỗi hàng.

3. **Định dạng dữ liệu**: 
   - Bạn cần đặt dữ liệu cho mỗi hàng trong một bộ ngoặc đơn
   - Bên trong mỗi bộ ngoặc đơn, sử dụng dấu phẩy để phân tách mỗi giá trị cột
   - Thứ tự của các giá trị cũng phải khớp với thứ tự của các cột được chỉ định sau tên bảng
   - Mỗi hàng dữ liệu kết thúc bằng dấu phẩy, và hàng cuối cùng kết thúc toàn bộ câu lệnh bằng dấu chấm phẩy

4. **Yêu cầu trích dẫn**: 
   - Văn bản và ngày tháng yêu cầu dấu ngoặc kép (dấu ngoặc đơn)
   - Số, bao gồm số nguyên và số thập phân, không yêu cầu dấu ngoặc kép

5. **Định dạng ngày**: Sử dụng định dạng `YYYY-MM-DD` (năm bốn chữ số theo sau là tháng và ngày, mỗi phần được nối bằng dấu gạch ngang). Đây là tiêu chuẩn quốc tế cho định dạng ngày tháng; sử dụng nó sẽ giúp bạn tránh nhầm lẫn. PostgreSQL hỗ trợ nhiều định dạng ngày tháng bổ sung.

6. **id tự động tăng**: Lưu ý rằng chúng ta không chèn giá trị cho cột `id`. Khi bạn tạo bảng, script của bạn đã chỉ định cột đó là kiểu dữ liệu `bigserial`. Vì vậy khi PostgreSQL chèn mỗi hàng, nó tự động điền cột `id` bằng một số nguyên tự động tăng.

Sau khi chạy mã, thông báo trong Query Tool sẽ bao gồm các từ "Query returned successfully: 6 rows affected."

### Xem Dữ Liệu

Bạn có thể xem nhanh dữ liệu bạn vừa tải vào bảng `teachers` bằng pgAdmin:

1. Trong trình duyệt đối tượng, định vị bảng và nhấp chuột phải.
2. Trong menu pop-up, chọn View/Edit Data → All Rows.

Bạn sẽ thấy sáu hàng dữ liệu trong bảng với mỗi cột được điền bởi các giá trị trong câu lệnh SQL. Lưu ý rằng mặc dù bạn không chèn giá trị cho cột `id`, mỗi giáo viên đều có số ID được gán.

Bạn có thể xem dữ liệu bằng giao diện pgAdmin theo một số cách, nhưng chúng ta sẽ tập trung vào việc viết SQL để xử lý các tác vụ đó.

## Khi Mã Gặp Lỗi

Có thể có một vũ trụ nơi mã luôn hoạt động, nhưng không may, chúng ta chưa phát minh ra máy móc có khả năng đưa chúng ta đến đó. Lỗi xảy ra. Cho dù bạn mắc lỗi đánh máy hay nhầm lẫn thứ tự thao tác, ngôn ngữ máy tính không khoan nhượng về cú pháp.

**Ví Dụ Lỗi:**

Nếu bạn quên dấu phẩy trong câu lệnh INSERT, PostgreSQL sẽ trả về lỗi:

```
ERROR:  syntax error at or near "("
LINE 5:  ('Samuel', 'Cole', 'Myers Middle School', '2005-08-01', 43...
         ^
********** Error **********
```

**Mẹo Khắc Phục Sự Cố:**

- Thông báo lỗi gợi ý về những gì sai và ở đâu: lỗi cú pháp gần dấu ngoặc mở ở dòng 5
- Đôi khi thông báo lỗi có thể khó hiểu hơn. Trong trường hợp đó, hãy làm như các lập trình viên giỏi nhất: tìm kiếm nhanh trên internet cho thông báo lỗi
- Rất có thể, người khác đã gặp phải vấn đề tương tự và có thể biết câu trả lời

## Định Dạng SQL Để Dễ Đọc

SQL không yêu cầu định dạng đặc biệt để chạy, vì vậy bạn có thể tự do sử dụng phong cách riêng của mình về chữ hoa, chữ thường và thụt lề ngẫu nhiên. Nhưng điều đó sẽ không giúp bạn có thêm bạn bè khi người khác cần làm việc với mã của bạn (và sớm hay muộn ai đó sẽ cần). Vì lợi ích của khả năng đọc và trở thành một lập trình viên tốt, tốt nhất là tuân theo các quy ước sau:

### Quy Ước Định Dạng SQL

1. **Từ khóa SQL viết hoa**: Sử dụng chữ hoa cho các từ khóa SQL, chẳng hạn như `SELECT`. Một số lập trình viên SQL cũng viết hoa tên của các kiểu dữ liệu, chẳng hạn như `TEXT` và `INTEGER`. Bạn có thể sử dụng ký tự chữ thường cho kiểu dữ liệu để phân biệt chúng trong tâm trí bạn với từ khóa, nhưng bạn có thể viết hoa chúng nếu muốn.

2. **Quy ước đặt tên**: 
   - Tránh camel case
   - Thay vào đó sử dụng `lowercase_and_underscores` cho tên đối tượng, chẳng hạn như tên bảng và cột

3. **Thụt lề**: 
   - Thụt lề các mệnh đề và khối mã để dễ đọc bằng hai hoặc bốn khoảng trắng
   - Một số lập trình viên thích tab hơn khoảng trắng; sử dụng bất cứ thứ gì phù hợp nhất với bạn hoặc tổ chức của bạn

Chúng ta sẽ khám phá các quy ước mã hóa SQL khác khi chúng ta đi qua cuốn sách, nhưng đây là những điều cơ bản.

## Tóm Tắt

Trong chương này, bạn đã hoàn thành khá nhiều việc:
- Tạo một cơ sở dữ liệu (`analysis`)
- Tạo một bảng (`teachers`) với định nghĩa cột và kiểu dữ liệu phù hợp
- Tải dữ liệu vào bảng bằng các câu lệnh INSERT
- Tìm hiểu về cú pháp SQL, định dạng và xử lý lỗi

Bạn đang trên đường thêm SQL vào bộ công cụ phân tích dữ liệu của mình! Trong chương tiếp theo, bạn sẽ sử dụng tập dữ liệu giáo viên này để tìm hiểu những điều cơ bản về truy vấn bảng bằng `SELECT`.

## Các Khái Niệm Chính Đã Học

- **Cơ sở dữ liệu**: Một tập hợp các đối tượng bao gồm bảng, hàm, vai trò người dùng và nhiều thứ khác
- **Bảng**: Một lưới các hàng và cột lưu trữ dữ liệu
- **Cột**: Một trường hoặc thuộc tính trong bảng chứa dữ liệu của một kiểu được chỉ định
- **Hàng**: Một bản ghi duy nhất trong bảng
- **Kiểu Dữ Liệu**: Định nghĩa loại dữ liệu mà cột có thể chứa (văn bản, số, ngày tháng, v.v.)
- **CREATE DATABASE**: Câu lệnh SQL để tạo cơ sở dữ liệu mới
- **CREATE TABLE**: Câu lệnh SQL để định nghĩa cấu trúc bảng mới
- **INSERT INTO**: Câu lệnh SQL để thêm dữ liệu vào bảng
- **bigserial**: Kiểu dữ liệu PostgreSQL cho số nguyên tự động tăng
- **varchar**: Kiểu dữ liệu ký tự có độ dài thay đổi
- **date**: Kiểu dữ liệu ngày tháng
- **numeric**: Kiểu dữ liệu số cho số thập phân

## Thực Hành Tốt

1. Tạo một cơ sở dữ liệu mới cho mỗi dự án để giữ dữ liệu liên quan được tổ chức
2. Luôn kết thúc câu lệnh SQL bằng dấu chấm phẩy
3. Sử dụng quy ước định dạng SQL phù hợp để dễ đọc
4. Sử dụng tên mô tả cho bảng và cột
5. Chọn kiểu dữ liệu phù hợp cho mỗi cột
6. Sử dụng định dạng ngày quốc tế (YYYY-MM-DD)
7. Trích dẫn văn bản và ngày tháng, nhưng không trích dẫn số trong câu lệnh INSERT
