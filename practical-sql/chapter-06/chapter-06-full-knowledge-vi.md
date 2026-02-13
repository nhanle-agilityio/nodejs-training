# Chương 6: Kết Nối Bảng Trong Cơ Sở Dữ Liệu Quan Hệ

## Giới Thiệu

Trong Chương 1, chúng ta đã giới thiệu khái niệm về cơ sở dữ liệu quan hệ, một ứng dụng hỗ trợ dữ liệu được lưu trữ trên nhiều bảng liên quan. Trong mô hình quan hệ, mỗi bảng thường chứa dữ liệu về một thực thể—chẳng hạn như sinh viên, ô tô, mua hàng, nhà cửa—và mỗi hàng trong bảng mô tả một trong những thực thể đó. Một quá trình được gọi là **kết nối bảng** (table join) cho phép chúng ta liên kết các hàng trong một bảng với các hàng trong các bảng khác.

Khái niệm về cơ sở dữ liệu quan hệ đến từ nhà khoa học máy tính người Anh Edgar F. Codd. Khi làm việc cho IBM vào năm 1970, ông đã xuất bản một bài báo có tên "A Relational Model of Data for Large Shared Data Banks." Ý tưởng của ông đã cách mạng hóa thiết kế cơ sở dữ liệu và dẫn đến sự phát triển của SQL. Sử dụng mô hình quan hệ, bạn có thể xây dựng các bảng loại bỏ dữ liệu trùng lặp, dễ bảo trì hơn và cung cấp tính linh hoạt tăng lên trong việc viết truy vấn để có được chính xác dữ liệu bạn muốn.

## Liên Kết Bảng Sử Dụng JOIN

Để kết nối các bảng trong một truy vấn, chúng ta sử dụng câu lệnh `JOIN ... ON` (hoặc một trong các biến thể JOIN khác chúng ta sẽ đề cập trong chương này). Câu lệnh JOIN liên kết một bảng với bảng khác trong cơ sở dữ liệu trong quá trình truy vấn, sử dụng các giá trị khớp trong các cột chúng ta chỉ định trong cả hai bảng.

### Cú Pháp JOIN Cơ Bản

```sql
SELECT *
FROM table_a JOIN table_b
ON table_a.key_column = table_b.foreign_key_column
```

Điều này tương tự như cú pháp SELECT cơ bản bạn đã học, nhưng thay vì đặt tên một bảng trong mệnh đề FROM, chúng ta đặt tên một bảng, đưa ra từ khóa JOIN, và sau đó đặt tên bảng thứ hai. Từ khóa ON theo sau, nơi chúng ta chỉ định các cột chúng ta muốn sử dụng để khớp giá trị. Khi truy vấn chạy, nó kiểm tra cả hai bảng và sau đó trả về các cột từ cả hai bảng nơi các giá trị khớp trong các cột được chỉ định trong mệnh đề ON.

### Điều Kiện Mệnh Đề ON

Khớp dựa trên sự bằng nhau giữa các giá trị là cách sử dụng phổ biến nhất của mệnh đề ON, nhưng bạn có thể sử dụng bất kỳ biểu thức nào đánh giá thành kết quả Boolean true hoặc false. Ví dụ, bạn có thể khớp nơi các giá trị từ một cột lớn hơn hoặc bằng các giá trị trong cột khác:

```sql
ON table_a.key_column >= table_b.foreign_key_column
```

Điều đó hiếm khi xảy ra, nhưng đó là một tùy chọn nếu phân tích của bạn yêu cầu.

## Liên Hệ Bảng Với Cột Khóa

Hãy xem xét ví dụ này: tưởng tượng bạn là nhà phân tích dữ liệu với nhiệm vụ kiểm tra chi tiêu lương của một cơ quan công cộng theo phòng ban. Bạn nộp yêu cầu Đạo Luật Tự Do Thông Tin cho dữ liệu lương của cơ quan đó, mong đợi nhận được một bảng tính đơn giản liệt kê mỗi nhân viên và mức lương của họ.

Nhưng thay vào đó, cơ quan gửi cho bạn một bản dump dữ liệu từ hệ thống lương của họ: một tá tệp CSV, mỗi tệp đại diện cho một bảng trong cơ sở dữ liệu của họ. Hai trong số các bảng nổi bật: một có tên `employees` và một khác có tên `departments`.

### Tạo Bảng Liên Quan

```sql
CREATE TABLE departments (
    dept_id bigserial,
    dept varchar(100),
    city varchar(100),
    CONSTRAINT dept_key PRIMARY KEY (dept_id),
    CONSTRAINT dept_city_unique UNIQUE (dept, city)
);

CREATE TABLE employees (
    emp_id bigserial,
    first_name varchar(100),
    last_name varchar(100),
    salary integer,
    dept_id integer REFERENCES departments (dept_id),
    CONSTRAINT emp_key PRIMARY KEY (emp_id),
    CONSTRAINT emp_dept_unique UNIQUE (emp_id, dept_id)
);

INSERT INTO departments (dept, city)
VALUES
('Tax', 'Atlanta'),
('IT', 'Boston');

INSERT INTO employees (first_name, last_name, salary, dept_id)
VALUES
('Nancy', 'Jones', 62500, 1),
('Lee', 'Smith', 59300, 1),
('Soo', 'Nguyen', 83000, 2),
('Janet', 'King', 95000, 2);
```

### Khóa Chính (Primary Keys)

Hai bảng tuân theo mô hình quan hệ của Codd ở chỗ mỗi bảng mô tả các thuộc tính về một thực thể đơn. Trong bảng departments, cột `dept_id` là **khóa chính** của bảng. Khóa chính là một cột hoặc tập hợp các cột có giá trị xác định duy nhất mỗi hàng trong bảng.

**Một cột khóa chính hợp lệ thực thi các ràng buộc nhất định:**
- Cột hoặc tập hợp các cột phải có giá trị duy nhất cho mỗi hàng
- Cột hoặc tập hợp các cột không thể có giá trị thiếu

Bạn định nghĩa khóa chính bằng cách sử dụng từ khóa `CONSTRAINT`. Cột `dept_id` xác định duy nhất phòng ban.

**Lưu Ý:** Giá trị khóa chính chỉ cần duy nhất trong một bảng. Đó là lý do tại sao cả bảng employees và bảng departments đều có thể có giá trị khóa chính sử dụng cùng các số.

### Khóa Ngoại (Foreign Keys)

Cột `emp_id` xác định duy nhất mỗi hàng trong bảng employees. Để bạn biết nhân viên nào làm việc ở phòng ban nào, bảng bao gồm cột `dept_id`. Các giá trị trong cột này tham chiếu đến các giá trị trong khóa chính của bảng departments. Chúng ta gọi đây là **khóa ngoại**, mà bạn thêm như một ràng buộc khi tạo bảng.

**Ràng buộc khóa ngoại yêu cầu:**
- Một giá trị được nhập vào cột phải đã tồn tại trong khóa chính của bảng mà nó tham chiếu
- Vì vậy, các giá trị trong `dept_id` trong bảng employees phải tồn tại trong `dept_id` trong bảng departments; nếu không, bạn không thể thêm chúng

**Khác biệt với khóa chính:**
- Không giống như khóa chính, cột khóa ngoại có thể trống
- Cột khóa ngoại có thể chứa các giá trị trùng lặp

Trong ví dụ này, `dept_id` liên kết với nhân viên Nancy Jones là 1; điều này tham chiếu đến giá trị 1 trong khóa chính của bảng departments, `dept_id`. Điều đó cho chúng ta biết rằng Nancy Jones là một phần của phòng ban Tax nằm ở Atlanta.

### Ràng Buộc UNIQUE

Cả hai bảng cũng bao gồm ràng buộc UNIQUE, đảm bảo rằng các giá trị trong một cột, hoặc kết hợp các giá trị trong nhiều hơn một cột, là duy nhất. Trong departments, nó yêu cầu mỗi hàng có một cặp giá trị duy nhất cho `dept` và `city`. Trong employees, mỗi hàng phải có một cặp duy nhất của `emp_id` và `dept_id`. Bạn thêm các ràng buộc này để tránh dữ liệu trùng lặp. Ví dụ, bạn không thể có hai phòng ban thuế ở Atlanta.

### Lợi Ích Của Thiết Kế Quan Hệ

Bạn có thể hỏi: lợi ích của việc chia tách dữ liệu thành các thành phần như vậy là gì? Hãy xem xét dữ liệu mẫu này sẽ trông như thế nào nếu bạn nhận được nó tất cả trong một bảng:

**Vấn đề với bảng đơn:**
1. **Dữ liệu trùng lặp**: Khi bạn kết hợp dữ liệu từ các thực thể khác nhau trong một bảng, không thể tránh khỏi việc bạn phải lặp lại thông tin. Tên phòng ban và vị trí được viết ra cho mỗi nhân viên. Điều này ổn khi bảng bao gồm bốn hàng, hoặc thậm chí 4,000. Nhưng khi một bảng chứa hàng triệu hàng, việc lặp lại các chuỗi dài là dư thừa và lãng phí không gian quý giá.

2. **Khó khăn quản lý dữ liệu**: Nhồi nhét dữ liệu không liên quan vào một bảng làm cho việc quản lý dữ liệu trở nên khó khăn. Điều gì sẽ xảy ra nếu phòng ban Marketing thay đổi tên thành Brand Marketing? Mỗi hàng trong bảng sẽ yêu cầu cập nhật. Đơn giản hơn là lưu trữ tên phòng ban và vị trí chỉ trong một bảng và cập nhật nó chỉ một lần.

## Truy Vấn Nhiều Bảng Sử Dụng JOIN

Khi bạn kết nối các bảng trong một truy vấn, cơ sở dữ liệu kết nối các hàng trong cả hai bảng nơi các cột bạn chỉ định cho việc kết nối có giá trị khớp. Kết quả truy vấn sau đó bao gồm các cột từ cả hai bảng nếu bạn yêu cầu chúng như một phần của truy vấn. Bạn cũng có thể sử dụng các cột từ các bảng đã kết nối để lọc kết quả bằng cách sử dụng mệnh đề WHERE.

Các truy vấn kết nối bảng tương tự về cú pháp với câu lệnh SELECT cơ bản. Sự khác biệt là truy vấn cũng chỉ định:
- Các bảng và cột để kết nối, sử dụng câu lệnh SQL `JOIN ... ON`
- Loại kết nối để thực hiện bằng cách sử dụng các biến thể của từ khóa JOIN

### Ví Dụ JOIN Cơ Bản

Để kết nối các bảng employees và departments ví dụ và xem tất cả dữ liệu liên quan từ cả hai:

```sql
SELECT *
FROM employees JOIN departments
ON employees.dept_id = departments.dept_id;
```

**Cách hoạt động:**
- Bao gồm ký tự đại diện dấu sao với câu lệnh SELECT để chọn tất cả các cột từ cả hai bảng
- Từ khóa JOIN đi giữa hai bảng bạn muốn dữ liệu từ đó
- Chỉ định các cột để kết nối các bảng bằng cách sử dụng từ khóa ON
- Đối với mỗi bảng, cung cấp tên bảng, dấu chấm và cột chứa các giá trị khóa
- Dấu bằng đi giữa hai tên bảng và cột

Khi bạn chạy truy vấn, kết quả bao gồm tất cả các giá trị từ cả hai bảng nơi các giá trị trong các cột `dept_id` khớp. Trên thực tế, ngay cả trường `dept_id` cũng xuất hiện hai lần vì bạn đã chọn tất cả các cột của cả hai bảng.

Vì vậy, ngay cả khi dữ liệu sống trong hai bảng, mỗi bảng có một tập hợp cột tập trung, bạn có thể truy vấn các bảng đó để kéo dữ liệu liên quan trở lại với nhau.

## Các Loại Kết Nối

Có nhiều hơn một cách để kết nối các bảng trong SQL, và loại kết nối bạn sẽ sử dụng phụ thuộc vào cách bạn muốn truy xuất dữ liệu. Khi xem xét từng loại, hữu ích là nghĩ về hai bảng cạnh nhau, một ở bên trái của từ khóa JOIN và một ở bên phải.

### Thiết Lập Bảng Ví Dụ

Để hình dung tốt hơn các loại kết nối, hãy tạo hai bảng đơn giản chứa tên các trường học:

```sql
CREATE TABLE schools_left (
    id integer CONSTRAINT left_id_key PRIMARY KEY,
    left_school varchar(30)
);

CREATE TABLE schools_right (
    id integer CONSTRAINT right_id_key PRIMARY KEY,
    right_school varchar(30)
);

INSERT INTO schools_left (id, left_school) VALUES
(1, 'Oak Street School'),
(2, 'Roosevelt High School'),
(5, 'Washington Middle School'),
(6, 'Jefferson High School');

INSERT INTO schools_right (id, right_school) VALUES
(1, 'Oak Street School'),
(2, 'Roosevelt High School'),
(3, 'Morrison Elementary'),
(4, 'Chase Magnet Academy'),
(6, 'Jefferson High School');
```

Lưu ý rằng chỉ các trường học có id là 1, 2 và 6 khớp trong cả hai bảng.

### JOIN (INNER JOIN)

**Trả về:** Các hàng từ cả hai bảng nơi tìm thấy giá trị khớp trong các cột đã kết nối của cả hai bảng. Cú pháp thay thế là `INNER JOIN`.

```sql
SELECT *
FROM schools_left JOIN schools_right
ON schools_left.id = schools_right.id;
```

**Kết quả:** Chỉ ba hàng nơi ID khớp (1, 2, 6). Các trường học chỉ tồn tại trong một trong hai bảng không xuất hiện trong kết quả.

**Khi nào sử dụng:** Thông thường, khi bạn đang làm việc với các tập dữ liệu được cấu trúc tốt, được bảo trì tốt và chỉ cần tìm các hàng tồn tại trong tất cả các bảng bạn đang kết nối. Vì JOIN không cung cấp các hàng tồn tại chỉ trong một trong các bảng, nếu bạn muốn xem tất cả dữ liệu trong một hoặc nhiều bảng, hãy sử dụng một trong các loại kết nối khác.

### LEFT JOIN

**Trả về:** Mỗi hàng từ bảng bên trái cộng với các hàng khớp giá trị trong cột đã kết nối từ bảng bên phải. Khi một hàng bảng bên trái không có khớp trong bảng bên phải, kết quả hiển thị không có giá trị từ bảng bên phải.

```sql
SELECT *
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id;
```

**Kết quả:** Tất cả bốn hàng từ `schools_left` cũng như ba hàng trong `schools_right` nơi các trường id khớp. Vì `schools_right` không chứa giá trị 5, không có khớp, vì vậy LEFT JOIN hiển thị một hàng trống ở bên phải thay vì bỏ qua toàn bộ hàng từ bảng bên trái. Các hàng từ `schools_right` không khớp bất kỳ giá trị nào trong `schools_left` bị bỏ qua khỏi kết quả.

### RIGHT JOIN

**Trả về:** Mỗi hàng từ bảng bên phải cộng với các hàng khớp các giá trị khóa trong cột khóa từ bảng bên trái. Khi một hàng bảng bên phải không có khớp trong bảng bên trái, kết quả hiển thị không có giá trị từ bảng bên trái.

```sql
SELECT *
FROM schools_left RIGHT JOIN schools_right
ON schools_left.id = schools_right.id;
```

**Kết quả:** Tất cả các hàng từ `schools_right` cộng với các hàng từ `schools_left` nơi các cột id có giá trị khớp, nhưng truy vấn không trả về các hàng của `schools_left` không có khớp với `schools_right`.

**Khi nào sử dụng LEFT JOIN hoặc RIGHT JOIN:**
- Bạn muốn kết quả truy vấn của mình chứa tất cả các hàng từ một trong các bảng
- Bạn muốn tìm các giá trị thiếu trong một trong các bảng; ví dụ, khi bạn đang so sánh dữ liệu về một thực thể đại diện cho hai khoảng thời gian khác nhau
- Khi bạn biết một số hàng trong bảng đã kết nối sẽ không có giá trị khớp

### FULL OUTER JOIN

**Trả về:** Mỗi hàng từ cả hai bảng và khớp các hàng; sau đó kết nối các hàng nơi các giá trị trong các cột đã kết nối khớp. Nếu không có khớp cho một giá trị trong bảng bên trái hoặc bên phải, kết quả truy vấn chứa một hàng trống cho bảng khác.

```sql
SELECT *
FROM schools_left FULL OUTER JOIN schools_right
ON schools_left.id = schools_right.id;
```

**Kết quả:** Mỗi hàng từ bảng bên trái, bao gồm các hàng khớp và khoảng trống cho các hàng thiếu từ bảng bên phải, theo sau bởi bất kỳ hàng thiếu còn lại nào từ bảng bên phải.

**Khi nào sử dụng:** Một kết nối ngoài đầy đủ thừa nhận là ít hữu ích hơn và được sử dụng ít thường xuyên hơn so với kết nối trong và kết nối trái hoặc phải. Tuy nhiên, bạn có thể sử dụng nó cho một vài tác vụ:
- Để hợp nhất hai nguồn dữ liệu phần nào trùng lặp
- Để hình dung mức độ các bảng chia sẻ giá trị khớp

### CROSS JOIN

**Trả về:** Mọi kết hợp có thể của các hàng từ cả hai bảng (còn được gọi là tích Descartes).

```sql
SELECT *
FROM schools_left CROSS JOIN schools_right;
```

**Kết quả:** 20 hàng—tích của bốn hàng trong bảng bên trái nhân với năm hàng trong bảng bên phải. Mỗi hàng từ bảng bên trái được ghép với mỗi hàng từ bảng bên phải.

**Quan trọng:** Vì kết nối không cần tìm khớp giữa các trường khóa, không cần cung cấp mệnh đề sử dụng từ khóa ON.

**Cảnh báo:** Trừ khi bạn muốn nghỉ giải lao cà phê dài, hãy tránh truy vấn CROSS JOIN trên các bảng lớn. Hai bảng với 250,000 bản ghi mỗi bảng sẽ tạo ra một tập kết quả 62.5 tỷ hàng và làm quá tải ngay cả máy chủ mạnh nhất.

**Sử dụng thực tế:** Tạo dữ liệu để tạo danh sách kiểm tra, chẳng hạn như tất cả các màu bạn muốn cung cấp cho mỗi kiểu áo trong kho.

## Sử Dụng NULL Để Tìm Hàng Có Giá Trị Thiếu

Khả năng tiết lộ dữ liệu thiếu từ một trong các bảng là có giá trị khi bạn đang đào sâu vào dữ liệu. Bất cứ khi nào bạn kết nối các bảng, thông minh là kiểm tra chất lượng dữ liệu và hiểu rõ hơn bằng cách khám phá xem tất cả các giá trị khóa trong một bảng có xuất hiện trong bảng khác không. Có nhiều lý do tại sao sự khác biệt có thể tồn tại, chẳng hạn như lỗi văn phòng, đầu ra không đầy đủ từ cơ sở dữ liệu, hoặc một số thay đổi trong dữ liệu theo thời gian.

### Hiểu Về NULL

Trong SQL, **NULL** là một giá trị đặc biệt đại diện cho điều kiện trong đó không có dữ liệu hiện diện hoặc nơi dữ liệu không xác định vì nó không được bao gồm. Ví dụ, nếu một người điền vào biểu mẫu địa chỉ bỏ qua trường "Middle Initial", thay vì lưu trữ một chuỗi trống trong cơ sở dữ liệu, chúng ta sẽ sử dụng NULL để đại diện cho giá trị không xác định.

**Điểm quan trọng về NULL:**
- NULL khác với 0 hoặc chuỗi trống (`""`)
- Cả 0 và chuỗi trống đều có thể có một số ý nghĩa không mong muốn dễ bị hiểu sai
- NULL cho thấy giá trị không xác định
- Không giống như 0 hoặc chuỗi trống, bạn có thể sử dụng NULL trên các kiểu dữ liệu

### Tìm Giá Trị Thiếu

Khi một kết nối SQL trả về các hàng trống trong một trong các bảng, các cột đó không trả về trống mà thay vào đó trả về với giá trị NULL. Để tìm những hàng đó, chúng ta thêm mệnh đề WHERE để lọc cho NULL bằng cách sử dụng `IS NULL`:

```sql
SELECT *
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id
WHERE schools_right.id IS NULL;
```

**Kết quả:** Chỉ các hàng từ bảng bên trái không có khớp ở bên phải.

**Để tìm cột có dữ liệu:** Sử dụng `IS NOT NULL`:

```sql
WHERE schools_right.id IS NOT NULL;
```

## Ba Loại Quan Hệ Bảng

Một phần của khoa học (hoặc nghệ thuật) kết nối bảng liên quan đến việc hiểu cách nhà thiết kế cơ sở dữ liệu dự định các bảng liên hệ với nhau, còn được gọi là mô hình quan hệ của cơ sở dữ liệu. Ba loại quan hệ bảng là một-một, một-nhiều và nhiều-nhiều.

### Quan Hệ Một-Một

Trong ví dụ JOIN của chúng ta, chỉ có một khớp cho một id trong mỗi bảng. Ngoài ra, không có giá trị id trùng lặp trong cả hai bảng: chỉ có một hàng trong bảng bên trái tồn tại với id là 1, và chỉ có một hàng trong bảng bên phải có id là 1. Trong thuật ngữ cơ sở dữ liệu, điều này được gọi là **quan hệ một-một**.

**Ví dụ:** Kết nối hai bảng với dữ liệu điều tra dân số theo từng tiểu bang. Một bảng có thể chứa dữ liệu thu nhập hộ gia đình và bảng khác chứa dữ liệu về trình độ học vấn. Cả hai bảng sẽ có 51 hàng (một cho mỗi tiểu bang cộng với Washington, D.C.), và nếu chúng ta muốn kết nối chúng trên một khóa như tên tiểu bang, viết tắt tiểu bang, hoặc mã địa lý chuẩn, chúng ta sẽ chỉ có một khớp cho mỗi giá trị khóa trong mỗi bảng.

### Quan Hệ Một-Nhiều

Trong **quan hệ một-nhiều**, một giá trị khóa trong bảng đầu tiên sẽ có nhiều giá trị khớp trong cột đã kết nối của bảng thứ hai.

**Ví dụ:** Hãy xem xét một cơ sở dữ liệu theo dõi ô tô. Một bảng sẽ chứa dữ liệu về các nhà sản xuất ô tô, với một hàng cho mỗi Ford, Honda, Kia, v.v. Một bảng thứ hai với tên mẫu, chẳng hạn như Focus, Civic, Sedona và Accord, sẽ có nhiều hàng khớp với mỗi hàng trong bảng nhà sản xuất.

**Ví dụ thực tế:** Các bảng employees và departments chúng ta đã tạo trước đó. Một phòng ban (dept_id = 1) có nhiều nhân viên (Nancy Jones và Lee Smith).

### Quan Hệ Nhiều-Nhiều

Trong **quan hệ nhiều-nhiều**, nhiều hàng trong bảng đầu tiên sẽ có nhiều hàng khớp trong bảng thứ hai.

**Ví dụ:** Một bảng cầu thủ bóng chày có thể được kết nối với một bảng vị trí sân. Mỗi cầu thủ có thể được gán cho nhiều vị trí, và mỗi vị trí có thể được chơi bởi nhiều người.

**Hiểu các quan hệ này là điều cần thiết** vì nó giúp chúng ta phân biệt liệu kết quả của các truy vấn có phản ánh chính xác cấu trúc của cơ sở dữ liệu hay không.

## Chọn Cột Cụ Thể Trong Kết Nối

Cho đến nay, chúng ta đã sử dụng ký tự đại diện dấu sao để chọn tất cả các cột từ cả hai bảng. Điều đó ổn cho kiểm tra dữ liệu nhanh, nhưng thường xuyên hơn bạn sẽ muốn chỉ định một tập hợp con các cột. Bạn có thể tập trung vào chỉ dữ liệu bạn muốn và tránh vô tình thay đổi kết quả truy vấn nếu ai đó thêm một cột mới vào bảng.

### Vấn Đề Mơ Hồ

Như bạn đã học trong các truy vấn bảng đơn, để chọn các cột cụ thể bạn sử dụng từ khóa SELECT theo sau bởi tên cột mong muốn. Khi kết nối các bảng, cú pháp thay đổi một chút: **bạn phải bao gồm cột cũng như tên bảng của nó**. Lý do là nhiều hơn một bảng có thể chứa các cột có cùng tên, điều này chắc chắn đúng với các bảng đã kết nối của chúng ta cho đến nay.

Hãy xem xét truy vấn sau, cố gắng lấy cột `id` mà không đặt tên bảng:

```sql
SELECT id
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id;
```

Vì `id` tồn tại trong cả `schools_left` và `schools_right`, máy chủ đưa ra lỗi: **tham chiếu cột "id" không rõ ràng**. Không rõ cột `id` thuộc về bảng nào.

### Giải Pháp: Tiền Tố Tên Bảng

Để sửa lỗi, chúng ta cần thêm tên bảng ở phía trước mỗi cột chúng ta đang truy vấn, như chúng ta làm trong mệnh đề ON:

```sql
SELECT schools_left.id,
       schools_left.left_school,
       schools_right.right_school
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id;
```

Chúng ta chỉ cần thêm tiền tố tên bảng vào trước mỗi tên cột, và phần còn lại của cú pháp truy vấn giống nhau.

### Sử Dụng Bí Danh Cột

Chúng ta cũng có thể thêm từ khóa AS để làm rõ trong kết quả rằng cột id là từ `schools_left`:

```sql
SELECT schools_left.id AS left_id,
       schools_left.left_school,
       schools_right.right_school
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id;
```

Điều này sẽ hiển thị tên của cột id `schools_left` là `left_id`.

## Đơn Giản Hóa Cú Pháp JOIN Với Bí Danh Bảng

Đặt tên bảng cho một cột là đủ dễ dàng, nhưng làm như vậy cho nhiều cột làm lộn xộn mã của bạn. Một trong những cách tốt nhất để phục vụ đồng nghiệp của bạn là viết mã dễ đọc, điều này thường không nên liên quan đến việc làm cho họ phải lội qua các tên bảng lặp lại cho 25 cột! Cách để viết mã ngắn gọn hơn là sử dụng cách tiếp cận viết tắt được gọi là **bí danh bảng**.

### Tạo Bí Danh Bảng

Để tạo bí danh bảng, chúng ta đặt một hoặc hai ký tự sau tên bảng khi chúng ta khai báo nó trong mệnh đề FROM. (Bạn có thể sử dụng nhiều hơn một vài ký tự cho bí danh, nhưng nếu mục tiêu là đơn giản hóa mã, đừng đi quá xa.) Những ký tự đó sau đó phục vụ như một bí danh chúng ta có thể sử dụng thay cho tên bảng đầy đủ ở bất cứ đâu chúng ta tham chiếu bảng trong mã.

```sql
SELECT lt.id,
       lt.left_school,
       rt.right_school
FROM schools_left AS lt LEFT JOIN schools_right AS rt
ON lt.id = rt.id;
```

**Cách hoạt động:**
- Trong mệnh đề FROM, chúng ta khai báo bí danh `lt` để đại diện cho `schools_left` và bí danh `rt` để đại diện cho `schools_right` bằng cách sử dụng từ khóa AS
- Một khi điều đó được thiết lập, chúng ta có thể sử dụng các bí danh thay cho tên bảng đầy đủ ở mọi nơi khác trong mã
- Ngay lập tức, SQL của chúng ta trông gọn gàng hơn, và đó là lý tưởng

## Kết Nối Nhiều Bảng

Tất nhiên, các kết nối SQL không giới hạn ở hai bảng. Chúng ta có thể tiếp tục thêm các bảng vào truy vấn miễn là chúng ta có các cột với giá trị khớp để kết nối.

### Ví Dụ: Kết Nối Ba Bảng

Hãy nói chúng ta có thêm hai bảng liên quan đến trường học và muốn kết nối chúng với `schools_left` trong một kết nối ba bảng:

**Bảng 1: schools_enrollment** (số lượng sinh viên mỗi trường)
```sql
CREATE TABLE schools_enrollment (
    id integer,
    enrollment integer
);

INSERT INTO schools_enrollment (id, enrollment)
VALUES
(1, 360),
(2, 1001),
(5, 450),
(6, 927);
```

**Bảng 2: schools_grades** (cấp độ lớp học trong mỗi tòa nhà)
```sql
CREATE TABLE schools_grades (
    id integer,
    grades varchar(10)
);

INSERT INTO schools_grades (id, grades)
VALUES
(1, 'K-3'),
(2, '9-12'),
(5, '6-8'),
(6, '9-12');
```

**Truy vấn kết nối ba bảng:**
```sql
SELECT lt.id, lt.left_school, en.enrollment, gr.grades
FROM schools_left AS lt 
LEFT JOIN schools_enrollment AS en
ON lt.id = en.id
LEFT JOIN schools_grades AS gr
ON lt.id = gr.id;
```

**Cách hoạt động:**
- Chúng ta kết nối `schools_left` với `schools_enrollment` sử dụng các trường id của bảng
- Chúng ta khai báo bí danh bảng để giữ mã gọn gàng
- Tiếp theo, truy vấn kết nối `schools_left` với `schools_grades` lại trên các trường id
- Kết quả của chúng ta bây giờ bao gồm các cột từ cả ba bảng

**Kết quả:**
```
id | left_school              | enrollment | grades
---|--------------------------|------------|-------
1  | Oak Street School        | 360        | K-3
2  | Roosevelt High School    | 1001       | 9-12
5  | Washington Middle School | 450        | 6-8
6  | Jefferson High School    | 927        | 9-12
```

**Lưu Ý:** Nếu bạn cần, bạn có thể thêm nhiều bảng hơn vào truy vấn bằng cách sử dụng các kết nối bổ sung. Bạn cũng có thể kết nối trên các cột khác nhau, tùy thuộc vào quan hệ của các bảng. Mặc dù không có giới hạn cứng trong SQL về số lượng bảng bạn có thể kết nối trong một truy vấn đơn, một số hệ thống cơ sở dữ liệu có thể áp đặt một. Hãy kiểm tra tài liệu.

## Thực Hiện Toán Học Trên Cột Bảng Đã Kết Nối

Các hàm toán học chúng ta đã khám phá trong Chương 5 cũng có thể sử dụng khi làm việc với các bảng đã kết nối. Chúng ta chỉ cần bao gồm tên bảng khi tham chiếu một cột trong một thao tác, như chúng ta đã làm khi chọn cột bảng.

### Ví Dụ: So Sánh Dữ Liệu Điều Tra Dân Số Theo Thời Gian

Nếu bạn làm việc với bất kỳ dữ liệu nào có bản phát hành mới theo khoảng thời gian đều đặn, bạn sẽ thấy khái niệm này hữu ích để kết nối một bảng mới phát hành với bảng cũ hơn và khám phá cách các giá trị đã thay đổi.

Hãy xem cách làm điều này bằng cách xem lại bảng `us_counties_2010` chúng ta đã tạo trong Chương 4 và tải dữ liệu quận tương tự từ Điều Tra Dân Số trước đó, vào năm 2000, vào một bảng mới:

```sql
CREATE TABLE us_counties_2000 (
    geo_name varchar(90),
    state_us_abbreviation varchar(2),
    state_fips varchar(2),
    county_fips varchar(3),
    p0010001 integer,
    p0010002 integer,
    p0010003 integer,
    p0010004 integer,
    p0010005 integer,
    p0010006 integer,
    p0010007 integer,
    p0010008 integer,
    p0010009 integer,
    p0010010 integer,
    p0020002 integer,
    p0020003 integer
);

COPY us_counties_2000
FROM 'C:\YourDirectory\us_counties_2000.csv'
WITH (FORMAT CSV, HEADER);

SELECT c2010.geo_name,
       c2010.state_us_abbreviation AS state,
       c2010.p0010001 AS pop_2010,
       c2000.p0010001 AS pop_2000,
       c2010.p0010001 - c2000.p0010001 AS raw_change,
       round((CAST(c2010.p0010001 AS numeric(8,1)) - c2000.p0010001)
       / c2000.p0010001 * 100, 1) AS pct_change
FROM us_counties_2010 c2010 
INNER JOIN us_counties_2000 c2000
ON c2010.state_fips = c2000.state_fips
AND c2010.county_fips = c2000.county_fips
AND c2010.p0010001 <> c2000.p0010001
ORDER BY pct_change DESC;
```

**Cách hoạt động:**
- Chúng ta tạo bảng `us_counties_2000` với cấu trúc tương tự như bảng 2010
- Câu lệnh COPY nhập tệp CSV với dữ liệu điều tra dân số
- Câu lệnh SELECT bao gồm tên quận và viết tắt tiểu bang từ bảng 2010, được đặt bí danh với `c2010`
- Tiếp theo là các cột tổng dân số `p0010001` từ các bảng 2010 và 2000, cả hai được đổi tên với tên duy nhất bằng cách sử dụng AS
- Để có thay đổi thô về dân số, chúng ta trừ dân số 2000 từ số đếm 2010
- Để tìm thay đổi phần trăm, chúng ta sử dụng công thức và làm tròn kết quả đến một chữ số thập phân

**Kết nối trên nhiều cột:**
- Chúng ta kết nối bằng cách khớp giá trị trong hai cột trong cả hai bảng: `state_fips` và `county_fips`
- Lý do kết nối trên hai cột thay vì một là trong cả hai bảng, chúng ta cần sự kết hợp của mã tiểu bang và mã quận để tìm một quận duy nhất
- Chúng ta đã thêm điều kiện thứ ba sử dụng bất đẳng thức (`<>`) để giới hạn kết nối đến các quận nơi cột dân số `p0010001` có giá trị khác
- Chúng ta kết hợp cả ba điều kiện bằng cách sử dụng từ khóa AND
- Cuối cùng, kết quả được sắp xếp theo thứ tự giảm dần theo thay đổi phần trăm để chúng ta có thể thấy những người tăng trưởng nhanh nhất ở đầu

**Ví dụ kết quả:**
```
name            | state | pop_2010 | pop_2000 | raw_change | pct_change
----------------|-------|----------|----------|------------|-----------
Kendall County  | IL    | 114736   | 54544    | 60192      | 110.4
Pinal County    | AZ    | 375770   | 179727   | 196043     | 109.1
Flagler County  | FL    | 95696    | 49832    | 45864      | 92.0
Lincoln County  | SD    | 44828    | 24131    | 20697      | 85.8
Loudoun County  | VA    | 312311   | 169599   | 142712     | 84.1
```

Hai quận, Kendall ở Illinois và Pinal ở Arizona, đã tăng gấp đôi dân số trong 10 năm, với các quận ở Florida, South Dakota và Virginia không kém xa. Đó là một câu chuyện có giá trị được trích xuất từ phân tích này và một điểm khởi đầu để hiểu các xu hướng dân số quốc gia.

## Tóm Tắt

Với quan hệ bảng là nền tảng của kiến trúc cơ sở dữ liệu, học cách kết nối bảng trong truy vấn cho phép bạn xử lý nhiều tập dữ liệu phức tạp hơn mà bạn sẽ gặp phải. Thử nghiệm với các loại kết nối khác nhau trên bảng có thể cho bạn biết rất nhiều về cách dữ liệu đã được thu thập và tiết lộ khi có vấn đề về chất lượng. Hãy làm cho việc thử các kết nối khác nhau trở thành một phần thường xuyên trong việc khám phá tập dữ liệu mới của bạn.

### Các Khái Niệm Chính Đã Học

- **Cú pháp JOIN**: Cấu trúc câu lệnh `JOIN ... ON` cơ bản
- **Khóa chính**: Các cột xác định duy nhất mỗi hàng
- **Khóa ngoại**: Các cột tham chiếu khóa chính trong các bảng khác
- **Ràng buộc UNIQUE**: Đảm bảo giá trị duy nhất trong các cột hoặc kết hợp cột
- **Các loại kết nối**: JOIN/INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN
- **Giá trị NULL**: Giá trị đặc biệt đại diện cho dữ liệu thiếu hoặc không xác định
- **Quan hệ bảng**: Một-một, một-nhiều, nhiều-nhiều
- **Chọn cột**: Sử dụng tiền tố bảng để tránh mơ hồ
- **Bí danh bảng**: Đơn giản hóa mã với tên bảng viết tắt
- **Kết nối nhiều bảng**: Kết nối ba hoặc nhiều bảng
- **Toán học trên bảng đã kết nối**: Thực hiện phép tính trên các cột bảng đã kết nối

### Thực Hành Tốt

1. Luôn sử dụng tiền tố bảng hoặc bí danh khi chọn cột trong kết nối
2. Sử dụng loại kết nối phù hợp dựa trên nhu cầu dữ liệu của bạn
3. Sử dụng LEFT JOIN hoặc RIGHT JOIN khi bạn cần tất cả các hàng từ một bảng
4. Sử dụng INNER JOIN khi bạn chỉ cần các hàng khớp
5. Sử dụng IS NULL để tìm giá trị thiếu trong kết nối
6. Sử dụng bí danh bảng để giữ mã dễ đọc và ngắn gọn
7. Kết nối trên nhiều cột khi cần để xác định duy nhất quan hệ
8. Xác minh chất lượng dữ liệu bằng cách kiểm tra các khớp thiếu
9. Hiểu quan hệ bảng trước khi viết truy vấn kết nối
10. Sử dụng CROSS JOIN một cách tiết kiệm và chỉ trên các bảng nhỏ

### Khi Nào Sử Dụng Mỗi Loại Kết Nối

- **INNER JOIN**: Khi bạn chỉ cần các hàng tồn tại trong cả hai bảng
- **LEFT JOIN**: Khi bạn cần tất cả các hàng từ bảng bên trái cộng với các khớp từ bảng bên phải
- **RIGHT JOIN**: Khi bạn cần tất cả các hàng từ bảng bên phải cộng với các khớp từ bảng bên trái
- **FULL OUTER JOIN**: Khi bạn cần tất cả các hàng từ cả hai bảng bất kể khớp
- **CROSS JOIN**: Khi bạn cần tất cả các kết hợp có thể (sử dụng thận trọng)

## Bước Tiếp Theo

Tiến về phía trước, chúng ta sẽ tiếp tục xây dựng trên các khái niệm lớn hơn này khi chúng ta đào sâu hơn vào việc tìm thông tin trong các tập dữ liệu và làm việc với các sắc thái tinh tế hơn của việc xử lý kiểu dữ liệu và đảm bảo chúng ta có dữ liệu chất lượng. Nhưng trước tiên, chúng ta sẽ xem xét một yếu tố nền tảng nữa: áp dụng các thực hành tốt nhất để xây dựng cơ sở dữ liệu đáng tin cậy, nhanh chóng với SQL.
