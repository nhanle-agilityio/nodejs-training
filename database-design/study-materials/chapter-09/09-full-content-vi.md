# Chương 9: Đặc tả trường

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Từ lâu tôi đã có nguyên lý rằng những điều nhỏ bé là vô cùng quan trọng nhất."*  
—SHERLOCK HOLMES, *THE ADVENTURES OF SHERLOCK HOLMES*

---

## Các chủ đề trong chương này

- Tại sao Đặc tả trường quan trọng
- Tính toàn vẹn mức trường (Field-Level Integrity)
- Giải phẫu Đặc tả trường (Anatomy of a Field Specification)
- Sử dụng Đặc tả trường Unique, Generic và Replica
- Định nghĩa Đặc tả trường cho mỗi Trường trong Cơ sở dữ liệu
- Ví dụ: Định nghĩa Đặc tả trường
- Tóm tắt
- Câu hỏi ôn tập

---

## Tại sao Đặc tả trường quan trọng

Các trường là nền tảng của cơ sở dữ liệu. Chúng đại diện các đặc điểm của các chủ đề quan trọng với tổ chức. Các trường lưu dữ liệu mà tổ chức dùng làm cơ sở cho thông tin—thông tin quan trọng cho hoạt động hàng ngày, thành công và phát triển tương lai của tổ chức. Bất chấp giá trị vốn có của chúng, các trường vẫn là tài sản bị coi nhẹ, tận dụng kém và bỏ bê nhất của tổ chức! Thường xuyên, rất ít hoặc không có thời gian được dành để đảm bảo tính toàn vẹn cấu trúc và logic của các trường trong cơ sở dữ liệu.

Nhiều điều được nói và viết về tính toàn vẹn dữ liệu, nhưng ít việc được thực hiện về nó. Nhiều người tin rằng theo dõi nhân viên nhập liệu và có giao diện người dùng "không thể sai" cho cơ sở dữ liệu sẽ giảm thiểu đáng kể các vấn đề liên quan đến dữ liệu. Cách tiếp cận nông cạn này với tính toàn vẹn dữ liệu thường xuất phát từ niềm tin sai lầm rằng thiết lập tính toàn vẹn dữ liệu đúng đắn mất quá nhiều thời gian. Tuy nhiên, điều quan trọng cần lưu ý là những người không có thời gian thiết lập tính toàn vẹn dữ liệu thường dành rất nhiều thời gian sửa cơ sở dữ liệu thiết kế không đúng—thường dành gấp ba lần thời gian so với việc thiết kế cơ sở dữ liệu đúng ngay từ đầu!

Trong chương này, bạn sẽ học cách thiết lập tính toàn vẹn dữ liệu bằng việc định nghĩa đặc tả trường (field specification) cho mỗi trường trong cơ sở dữ liệu. Đầu tiên, bạn sẽ học về ba nhóm yếu tố tạo thành đặc tả trường; sau đó bạn sẽ học cách tiến hành phỏng vấn với người dùng và quản lý để nhờ họ hỗ trợ định nghĩa đặc tả cho các trường.

Bất chấp những gì bạn có thể đã nghe, thời gian thiết lập đặc tả trường cho mỗi trường trong cơ sở dữ liệu là khoản đầu tư để xây dựng dữ liệu nhất quán và thông tin chất lượng—bạn hoàn toàn không lãng phí thời gian khi thực hiện quy trình này. Trên thực tế, bạn sẽ lãng phí nhiều thời gian hơn cuối cùng nếu bạn chỉ thực hiện một phần quy trình này hoặc bỏ qua hoàn toàn. Né tránh nhiệm vụ này có nghĩa là bạn chắc chắn sẽ gặp phải (và chịu thiệt từ) dữ liệu không nhất quán và sai sót cũng như thông tin không chính xác.

Đặc tả trường quan trọng vì nhiều lý do:

- **Đặc tả trường giúp thiết lập và thực thi tính toàn vẹn mức trường (field-level integrity).** Triển khai các đặc tả này cho phép bạn đảm bảo dữ liệu trong mỗi trường nhất quán và hợp lệ.
- **Định nghĩa đặc tả trường cho mỗi trường nâng cao tính toàn vẹn dữ liệu tổng thể.** Nhớ rằng tính toàn vẹn mức trường là một trong bốn thành phần của tính toàn vẹn dữ liệu tổng thể. Tính toàn vẹn mức trường nâng cao (ở mức nào đó) tính toàn vẹn mức bảng bạn đã thiết lập ở giai đoạn trước của quy trình thiết kế. (Điều này sẽ trở nên rõ ràng khi bạn làm việc với các yếu tố Logic của đặc tả trường.)
- **Định nghĩa đặc tả trường buộc bạn thu nhận hiểu biết hoàn chỉnh về bản chất và mục đích của dữ liệu trong cơ sở dữ liệu.** Hiểu dữ liệu có nghĩa là bạn có thể đánh giá liệu dữ liệu có thực sự cần thiết và quan trọng với tổ chức hay không, và bạn có thể học cách sử dụng nó để tối đa lợi thế.
- **Đặc tả trường cấu thành "data dictionary" (từ điển dữ liệu) của cơ sở dữ liệu.** Mỗi đặc tả trường lưu dữ liệu về đặc điểm của một trường cụ thể trong cơ sở dữ liệu. Tập đặc tả hoàn chỉnh bạn thiết lập cho tất cả các trường trong cơ sở dữ liệu tạo thành từ điển theo nghĩa đen của cấu trúc cơ sở dữ liệu. Data dictionary này đặc biệt hữu ích khi bạn triển khai cơ sở dữ liệu trong RDBMS—bạn có thể dùng nó làm hướng dẫn để tạo các trường và thiết lập thuộc tính cơ bản của chúng. Các đặc tả này cũng sẽ giúp bạn xác định loại quy trình nhập liệu và xác thực dữ liệu bạn cần triển khai trong bất kỳ ứng dụng giao diện người dùng nào bạn tạo cho cơ sở dữ liệu.

Hãy nhớ rằng mức độ nhất quán, chất lượng và độ chính xác của dữ liệu trong cơ sở dữ liệu (và thông tin truy xuất từ dữ liệu đó) tỷ lệ thuận với mức độ bạn hoàn thành các đặc tả này. Thiết lập mỗi đặc tả trường một cách hoàn chỉnh là điều tối quan trọng nếu tổ chức phụ thuộc nhiều vào thông tin bạn truy xuất từ cơ sở dữ liệu.

---

## Tính toàn vẹn mức trường (Field-Level Integrity)

Một trường đạt tính toàn vẹn mức trường (field-level integrity) sau khi bạn đã định nghĩa tập đặc tả trường hoàn chỉnh cho trường đó. Tính toàn vẹn mức trường đảm bảo những điều sau:

- Định danh và mục đích của trường rõ ràng, và tất cả các bảng trong đó trường xuất hiện được xác định đúng.
- Định nghĩa trường nhất quán trong toàn bộ cơ sở dữ liệu.
- Giá trị của trường nhất quán và hợp lệ.
- Các loại sửa đổi có thể áp dụng cho giá trị trong trường được xác định rõ ràng.

Bạn có thể đảm bảo cấu trúc trường vững chắc và thiết kế tối ưu khi trường có tập đặc tả trường hoàn chỉnh và tuân thủ đầy đủ Các yếu tố của Trường lý tưởng (Elements of the Ideal Field). Trên thực tế, đảm bảo trường tuân thủ Các yếu tố của Trường lý tưởng khiến việc định nghĩa tập đặc tả trở thành nhiệm vụ tương đối dễ dàng.

Nếu bạn còn nghi ngờ về việc trường cụ thể có tuân thủ Các yếu tố của Trường lý tưởng hay không, đây là thời điểm tốt để rà soát trường đó một lần nữa. Nếu bạn xác định trường không tuân thủ, dùng kỹ thuật phù hợp để giải quyết vấn đề và thực hiện điều chỉnh đúng cho bảng; nếu không, bạn có thể bắt đầu quy trình định nghĩa đặc tả trường cho mỗi trường trong cơ sở dữ liệu. Sau đây là Các yếu tố của Trường lý tưởng một lần nữa để tiện bạn tham khảo:

1. Nó đại diện đặc điểm phân biệt của chủ đề bảng.
2. Nó chỉ chứa một giá trị duy nhất.
3. Nó không thể phân tách thành thành phần nhỏ hơn.
4. Nó không chứa giá trị tính toán hoặc nối chuỗi.
5. Nó duy nhất trong toàn bộ cấu trúc cơ sở dữ liệu.
6. Nó giữ phần lớn đặc điểm của nó khi xuất hiện trong một hoặc nhiều bảng với vai trò khóa ngoại.

---

## Giải phẫu Đặc tả trường

Một đặc tả trường bao gồm các yếu tố khác nhau định nghĩa mọi thuộc tính của trường. Tất cả các yếu tố trong đặc tả được phân loại là general elements (các yếu tố chung), physical elements (các yếu tố vật lý) hoặc logical elements (các yếu tố logic). Các nhóm yếu tố này cho phép bạn tập trung vào khía cạnh phân biệt của trường khi định nghĩa đặc tả, và chúng cung cấp cách để bạn tìm một yếu tố cụ thể khá dễ dàng.

Sau đây là các yếu tố trong mỗi nhóm:

**General Elements (Các yếu tố Chung):** Field Name, Parent Table, Specification Type, Source Specification, Shared By, Alias(es), Description

**Physical Elements (Các yếu tố Vật lý):** Data Type, Length, Decimal Places, Character Support

**Logical Elements (Các yếu tố Logic):** Key Type, Key Structure, Uniqueness, Null Support, Values Entered By, Required Value, Range of Values, Edit Rule

*[Hình 9.1 Tờ Đặc tả trường.]*

### General Elements (Các yếu tố Chung)

Các mục trong nhóm General Elements đại diện các thuộc tính cơ bản nhất của trường. Chúng cung cấp thông tin về mục đích của trường, tên bảng mà trường xuất hiện trong đó, và các bí danh trường đảm nhận trong những trường hợp nhất định.

#### Field Name (Tên trường)

Field Name là tập từ tối thiểu tuyệt đối xác định duy nhất một trường cụ thể trong toàn bộ cơ sở dữ liệu. Bạn đã tạo và tinh chỉnh tên trường trước đó trong quy trình thiết kế cơ sở dữ liệu (xem Chương 7, "Thiết lập cấu trúc bảng"), nên bạn chỉ cần lấy mỗi tên và dùng làm thiết lập cho yếu tố này.

#### Parent Table (Bảng cha)

Bảng kết hợp trường cho trước trong cấu trúc của nó được gọi là Parent Table (bảng cha) của trường. Đây là bảng duy nhất trường sẽ xuất hiện trừ khi trường tham gia thiết lập mối quan hệ. (Bạn sẽ học thêm về ngoại lệ này trong Chương 10, "Mối quan hệ bảng.") Ví dụ, STUDENTS là Parent Table của trường STUDFIRST NAME.

#### Specification Type (Loại đặc tả)

Các yếu tố bạn thiết lập cho trường cho trước phụ thuộc vào loại đặc tả bạn định nghĩa cho trường. Bạn có thể định nghĩa đặc tả theo ba cách:

1. **Unique:** Đây là đặc tả mặc định cho tất cả các trường ngoại trừ những trường phục vụ làm mẫu cho trường khác hoặc những trường tham gia trong mối quan hệ bảng với vai trò khóa ngoại. Bạn có thể kết hợp tất cả trừ yếu tố Source Specification cho loại đặc tả này, và các thiết lập yếu tố bạn thiết lập sẽ chỉ áp dụng cho trường được chỉ định trong yếu tố Field Name.

2. **Generic:** Đặc tả này phục vụ làm mẫu cho các đặc tả trường khác và giúp bạn đảm bảo định nghĩa nhất quán cho các trường có ý nghĩa chung giống nhau. Ví dụ, bạn có thể tạo loại đặc tả này cho trường STATE chung rồi dùng làm cơ sở cho mọi trường STATE khác trong cơ sở dữ liệu. Các trường như CUSTSTATE, EMPSTATE và VENDSTATE đều có cùng ý nghĩa (chúng đại diện một bang trong Hoa Kỳ), nhưng có sự phân biệt rõ ràng đủ giữa chúng để yêu cầu chúng vẫn là các trường riêng biệt. (Nếu bạn nhớ, bạn đã học về generic field trong Chương 6, "Phân tích cơ sở dữ liệu hiện tại," khi bạn đang phát triển Danh sách trường sơ bộ và trong Chương 7 khi bạn làm việc với Các yếu tố của Trường lý tưởng.)

   Đặc tả Generic yêu cầu bạn dùng tên trường không cụ thể và các thiết lập yếu tố càng rộng và chung chung càng tốt. Tuy nhiên, bạn có thể kết hợp bất kỳ yếu tố nào trừ Parent Table, Shared By, Alias(es) và Source Specification.

3. **Replica:** Đây là đặc tả mặc định cho trường dựa trên generic field hoặc trường phục vụ làm khóa ngoại trong mối quan hệ bảng, và nó lấy phần lớn thiết lập yếu tố từ đặc tả hiện có. Bạn có thể kết hợp các yếu tố chưa được đặc tả nguồn kết hợp, và bạn có thể thay đổi bất kỳ thiết lập yếu tố nào lấy từ đặc tả nguồn.

Bạn sẽ học cách định nghĩa từng loại đặc tả trong phần "Sử dụng Đặc tả trường Unique, Generic và Replica" sau trong chương này.

#### Source Specification (Đặc tả nguồn)

Yếu tố Source Specification chỉ được thiết lập trên đặc tả Replica và chỉ ra tên đặc tả trường cụ thể mà đặc tả hiện tại dựa trên. (Bạn sẽ thấy ví dụ tốt về yếu tố này trong phần tiếp theo.)

#### Shared By (Chia sẻ bởi)

Yếu tố Shared By chỉ ra tên các bảng khác chia sẻ trường này. Tên bảng duy nhất nên xuất hiện ở đây là những bảng có mối quan hệ tường minh với Parent Table của trường. Ví dụ, giả sử bạn có bảng dữ liệu tên EMPLOYEES liên quan đến hai bảng tập con tên PART-TIME EMPLOYEES và FULL-TIME EMPLOYEES thông qua trường EMPLOYEE ID NUMBER. Khi bạn tạo đặc tả trường cho EMPLOYEE ID NUMBER, bạn sẽ dùng "PART-TIME EMPLOYEES, FULL-TIME EMPLOYEES" làm thiết lập cho yếu tố này.

#### Alias(es) (Bí danh)

Alias là tên (hoặc tập tên) bạn dùng cho trường trong những trường hợp rất hiếm. Một trường hợp bạn sẽ dùng alias là khi phải có hai lần xuất hiện của trường trong cùng một bảng. Giả sử một tổ chức quen xác định nhân viên bằng giá trị duy nhất trong trường EMPLOYEE ID NUMBER. Bây giờ, hãy xem xét cấu trúc bảng SUBSIDIARIES trong Hình 9.2 (đây chỉ là cấu trúc một phần).

*[Hình 9.2 Một bảng yêu cầu hai lần xuất hiện của cùng trường.]*

Trong trường hợp này, mỗi công ty con có tổng giám đốc và phó tổng giám đốc. Cả hai cá nhân này phải được đại diện trong bảng vì vị trí của họ trong tổ chức công ty con, nên có hai trường EMPLOYEE ID NUMBER trong cấu trúc bảng. Tuy nhiên, thiết kế cơ sở dữ liệu đúng đắn quy định chỉ có thể có một lần xuất hiện của trường này trong bảng; có vấn đề rõ ràng ở đây. Giải pháp duy nhất là dùng alias cho một hoặc cả hai lần xuất hiện của trường EMPLOYEE ID NUMBER. Chẳng hạn, bạn có thể (để rõ ràng) dùng PRESIDENT ID làm alias cho lần xuất hiện đầu của EMPLOYEE ID NUMBER và VICE PRESIDENT ID làm alias cho lần xuất hiện thứ hai của EMPLOYEE ID NUMBER. Với các alias đã đặt, cả hai nhân viên được đại diện đúng trong bảng. Hình 9.3 cho thấy cấu trúc bảng đã sửa.

*[Hình 9.3 Sử dụng alias thay cho các trường EMPLOYEE ID NUMBER.]*

Mặc dù việc dùng alias chấp nhận được trong những trường hợp này, bạn nên dùng chúng rất thận trọng; nếu không, chúng có thể trở nên khó quản lý và duy trì, cuối cùng che giấu hoặc ngụy trang ý nghĩa thực sự của các trường gốc, và khiến bạn hiểu sai dữ liệu thực sự đại diện gì. Vấn đề này sẽ trở nên rõ ràng hơn khi bạn bắt đầu thiết lập mối quan hệ bảng.

#### Description (Mô tả)

Description là diễn giải hoàn chỉnh của trường. Việc soạn mô tả trường cực kỳ có lợi vì buộc bạn (và mọi người trong tổ chức) suy nghĩ cẩn thận về bản chất của dữ liệu sẽ được lưu trong trường. Bạn có thể khá chắc chắn trường cần tinh chỉnh thêm nếu bạn gặp khó khi soạn mô tả phù hợp.

Trước đó trong quy trình thiết kế cơ sở dữ liệu, bạn đã học bộ hướng dẫn soạn mô tả bảng. Tương tự, có bộ hướng dẫn chi phối cách soạn mô tả trường đúng:

#### Hướng dẫn Soạn Mô tả Trường

- Dùng phát biểu xác định chính xác trường và nêu rõ mục đích của nó. Mô tả nên bổ sung cho tên trường trong việc định nghĩa trường đại diện gì. Nó cũng nên nêu vai trò của trường trong bảng hoặc mối quan hệ với chủ đề bảng. Đây là ví dụ mô tả như vậy:

  *CustCity—Khu vực đô thị mà khách hàng cư trú hoặc tiến hành kinh doanh. Đây là thành phần tích hợp của địa chỉ hoàn chỉnh của khách hàng.*

- Viết phát biểu rõ ràng và súc tích. Mô tả nên không có câu gây nhầm lẫn hoặc cụm từ mơ hồ. Mặc dù mô tả nên càng hoàn chỉnh càng tốt, dùng số từ tối thiểu cần thiết để truyền tải thông tin cần thiết. Như bạn đã thấy với mô tả bảng, phát biểu dài dòng khó đọc và hiểu.

- Tránh lặp lại hoặc diễn đạt lại tên trường. Cả hai cách làm này không làm sáng tỏ định danh hay mục đích của trường. Nhớ rằng mục đích của mô tả là cung cấp diễn giải hoàn chỉnh của trường. Đây là ví dụ mô tả kém:

  *CustLast Name—họ của khách hàng.*

  Mô tả hữu ích hơn nhiều khi bạn viết theo cách này:

  *CustLast Name—họ của khách hàng, dù gốc hay theo hôn nhân, mà chúng ta dùng trong mọi giao tiếp và thư từ chính thức với khách hàng đó.*

- Tránh dùng thuật ngữ kỹ thuật, chữ viết tắt hoặc viết tắt. Mặc dù một số người trong tổ chức sẽ hiểu các loại thành ngữ này, tốt hơn bạn dùng thuật ngữ mà mọi người đều hiểu. Nhớ rằng mô tả phải càng rõ ràng càng tốt với bất kỳ ai đọc nó. Ví dụ, bạn nên tránh loại phát biểu này:

  *Employee ID Number—Số duy nhất dùng để xác định nhân viên trong tổ chức. Nó là thành phần của SSP.*

  Vấn đề với mô tả này là không có cách nào nội tại để xác định ý nghĩa của chữ viết tắt SSP. Bạn có thể giải quyết vấn đề bằng cách viết đầy đủ thuật ngữ, nhưng tốt hơn bạn diễn đạt lại mục đích của trường.

- Không bao gồm thông tin triển khai cụ thể. Không có lý do bao gồm việc trường cụ thể xuất hiện trên màn hình nhập liệu cụ thể hay được dùng trong đoạn mã lập trình cụ thể. Loại thông tin này phù hợp hơn với giai đoạn triển khai của quy trình phát triển cơ sở dữ liệu tổng thể.

- Không làm mô tả này phụ thuộc vào mô tả trường khác. Mỗi mô tả nên càng hoàn chỉnh càng tốt và độc lập với mọi mô tả khác trong cơ sở dữ liệu. Các mô tả phụ thuộc lẫn nhau gây nhầm lẫn không cần thiết và có thể vô tình che giấu định danh và mục đích thực sự của trường. Tránh dùng mô tả như sau:

  *Item Reorder Level—Số lượng mục tối thiểu phải tồn tại cho sản phẩm cụ thể. (Xem mô tả cho Quantity On Hand.)*

- Không dùng ví dụ. Như bạn đã học ở Chương 7, dùng ví dụ trong mô tả là ý tưởng tồi vì chúng phụ thuộc thông tin bổ sung để truyền tải ý nghĩa đầy đủ. Bạn có thể đảm bảo mô tả rõ ràng và súc tích bằng cách giữ nó hoàn toàn không có ví dụ.

*[Hình 9.4 Nhóm General Elements cho trường EMPLOYEE ID NUMBER.]*

---

### Physical Elements (Các yếu tố Vật lý)

Nhóm Physical Elements liên quan đến cấu trúc của trường. Các yếu tố của nó được diễn đạt theo thuật ngữ chung vì mỗi chương trình RDBMS triển khai chúng hơi khác nhau. Thiết lập các yếu tố này trong giai đoạn này của quy trình thiết kế giúp bạn đảm bảo định nghĩa trường nhất quán trong toàn bộ cơ sở dữ liệu và giảm thời gian bạn cần để triển khai cấu trúc trường trong chương trình RDBMS.

#### Data Type (Kiểu dữ liệu)

Yếu tố Data Type chỉ ra bản chất của dữ liệu trường lưu. Ba kiểu dữ liệu chúng ta sẽ dùng làm thiết lập cho yếu tố này là:

1. **Alphanumeric (Chữ-số):** Kiểu dữ liệu này lưu bất kỳ kết hợp chữ cái, số, ký tự bàn phím hoặc ký tự đặc biệt. Ký tự bàn phím gồm dấu phẩy, ký hiệu đô la, dấu chấm than, ký hiệu phần trăm và dấu chấm. Ký tự đặc biệt gồm ký hiệu bản quyền, ký hiệu thương hiệu và ký hiệu cho pi.

2. **Numeric (Số):** Kiểu dữ liệu này chỉ lưu số nguyên và số thực. Nó sẽ không chấp nhận số có số 0 đứng đầu (ví dụ, 0000234) vì chúng không phải số thực sự.

3. **DateTime (Ngày-Giờ):** Kiểu dữ liệu này lưu ngày, giờ hoặc kết hợp cả hai.

Hãy nhớ rằng chương trình RDBMS bạn dùng để triển khai cơ sở dữ liệu sẽ có nhiều loại kiểu dữ liệu hơn để bạn sử dụng. Tuy nhiên, tôi dùng các kiểu dữ liệu chung này để giữ mọi thứ càng đơn giản và sạch sẽ càng tốt trong quá trình thiết kế.

#### Length (Độ dài)

Yếu tố Length chỉ định tổng số ký tự người dùng có thể nhập cho bất kỳ giá trị trường nào. Chương trình RDBMS bạn dùng để triển khai cơ sở dữ liệu sẽ xác định số ký tự tối đa bạn có thể thiết lập cho yếu tố này. Mặc dù về lý thuyết bạn có thể thiết lập yếu tố length cho bất kỳ kiểu dữ liệu nào, bạn nên lưu ý rằng một số chương trình RDBMS không cho phép bạn chỉ định length cho trường số. Thay vào đó, chương trình RDBMS thiết lập độ dài của trường số dựa trên loại số trường lưu, chẳng hạn như số nguyên, số nguyên dài hoặc số thực.

#### Decimal Places (Vị trí thập phân)

Yếu tố Decimal Places chỉ số chữ số bên phải dấu thập phân trong số thực. Số chữ số xác định độ chính xác của số thực. Ví dụ, nhiều doanh nghiệp yêu cầu tất cả giá trị tiền tệ có bốn chữ số độ chính xác bên phải dấu thập phân.

#### Character Support

Yếu tố Character Support chỉ ra loại ký tự người dùng có thể nhập vào giá trị trường cho trước. Thiết lập và thực thi yếu tố này giúp bạn đảm bảo người dùng không thể đưa dữ liệu vô nghĩa vào trường, do đó nâng cao tính toàn vẹn mức trường.

Giả sử bạn đang làm việc với trường CUSTSTATE và kiểu dữ liệu của nó là Alphanumeric. Kiểu dữ liệu này phù hợp cho trường vì cho phép người dùng kết hợp chữ cái như một phần của giá trị trường cho trước. Nhưng nó cũng cho phép anh ta dùng số, ký tự bàn phím và ký tự mở rộng, nghĩa là anh ta có thể nhập giá trị vô nghĩa vào trường—không có tên bang hay viết tắt bang nào chứa ký tự ngoài chữ cái. Bạn giải quyết vấn đề này bằng cách dùng yếu tố Character Support để định nghĩa các ký tự người dùng có thể kết hợp trong giá trị trường. (Tôi đề cập vấn đề tổ hợp chữ cái hợp lệ sau trong phần "Logical Elements.")

Bạn có thể chọn bao gồm hoặc loại trừ bất kỳ loại ký tự sau:

- **Letters (Chữ cái):** Tất cả chữ cái trong bảng chữ cái bao gồm chữ cái ngoại ngữ như é và ñ.
- **Numbers (Số):** 0 đến 9.
- **Keyboard characters (Ký tự bàn phím):** Bất kỳ ký tự chuẩn nào ngoài chữ cái và số, chẳng hạn như dấu sao, dấu và, dấu ngoặc vuông, dấu mũ, dấu phẩy, dấu bằng, dấu chấm than, dấu ngoặc đơn, ký hiệu phần trăm, dấu chấm, ký hiệu bảng, dấu chấm hỏi, dấu ngoặc kép, dấu chấm phẩy, dấu gạch chéo hoặc dấu sổ dọc. Lưu ý rằng tờ Đặc tả trường bao gồm ví dụ các ký tự thuộc nhóm này.
- **Special characters (Ký tự đặc biệt):** Bất kỳ ký tự nào bạn chỉ có thể tạo qua tổ hợp cụ thể các phím chuẩn và phím CTRL, ALT và/hoặc SHIFT, hoặc với sự hỗ trợ của chương trình phần mềm đặc biệt. Các ký tự trong nhóm này gồm ký hiệu toán học phức tạp, ký hiệu bản quyền, phân số, ký hiệu cho pi và ký hiệu thương hiệu. Tờ Đặc tả trường cũng bao gồm ví dụ các ký tự này.

*[Hình 9.5 Nhóm Physical Elements cho trường EMPLOYEE ID NUMBER.]*

---

### Logical Elements (Các yếu tố Logic)

Nhóm Logical Elements liên quan chủ yếu đến các giá trị trong trường. Các yếu tố của nó chi phối các vấn đề như vai trò của trường trong bảng, liệu mỗi giá trị có phải duy nhất hay không, khi nào giá trị nên được nhập, và liệu giá trị có thể được chỉnh sửa hay không. Thiết lập các yếu tố này giúp bạn thiết lập và thực thi phần lớn tính toàn vẹn mức trường.

#### Key Type (Loại khóa)

Yếu tố Key Type chỉ định vai trò của trường trong bảng, mà bạn đã xác định khi thiết lập khóa chính cho bảng. Như bạn đã biết, trường có thể phục vụ như non-key, primary key hoặc alternate key. Trong Chương 10, bạn sẽ học tất cả về khóa ngoại và khi nào chỉ định trường là khóa ngoại trên tờ Đặc tả trường.

#### Key Structure (Cấu trúc khóa)

Yếu tố Key Structure chỉ ra liệu trường được chỉ định là khóa chính có đang đóng vai trò khóa chính đơn (một trường) hay là phần của khóa chính tổ hợp (nhiều trường).

#### Uniqueness (Tính duy nhất)

Yếu tố này chỉ ra liệu giá trị của trường có duy nhất hay không. Bạn thiết lập nó là "Unique" khi yếu tố Key Type được thiết lập là "Primary"; nếu không, bạn sẽ thường thiết lập yếu tố này là "Non-unique." Khi bạn làm việc với trường non-key, hãy suy nghĩ về cách giá trị của nó sẽ được sử dụng để có thể xác định liệu chúng có nên duy nhất hay không. Hãy xem xét cấu trúc bảng DEPARTMENTS trong Hình 9.6.

*[Hình 9.6 Giá trị của EMPLOYEE ID NUMBER có nên duy nhất không?]*

Trong ví dụ này, trường EMPLOYEE ID NUMBER xác định người quản lý một phòng ban cụ thể. Giả sử một người được phép quản lý chỉ một phòng ban tại bất kỳ thời điểm nào, giá trị trong trường này nên duy nhất; do đó, bạn nên thiết lập yếu tố Uniqueness cho trường này là "Unique."

#### Null Support (Hỗ trợ Null)

Null Support chỉ định liệu trường có chấp nhận Null hay không. "No Nulls" là thiết lập bạn thường dùng cho yếu tố này, đặc biệt khi trường phục vụ làm khóa chính hoặc khóa thay thế, hoặc khi yếu tố Required Value của trường được thiết lập là "Yes." Tuy nhiên, bạn có thể thiết lập yếu tố này là "Nulls Allowed" khi có lý do hợp lệ để trường chấp nhận Null. Ví dụ, trường CUSTCOUNTY phải chấp nhận null vì khách hàng có thể không biết tên quận/hạt cô ấy sống. (Tất nhiên, nó sẽ không còn Null sau khi cô ấy cung cấp tên quận.)

Nhớ rằng Null không đại diện khoảng trống—nó đại diện giá trị thiếu hoặc không xác định. Người dùng thường mắc lỗi dùng khoảng trống để đại diện giá trị có nghĩa, như "None," "Not Applicable," "No Response" và "Not Wanted." Nếu các giá trị này hợp lệ cho trường cụ thể, hãy đảm bảo bạn bao gồm chúng trong yếu tố Range of Values của trường. Trên hết, dùng Null một cách thận trọng và không dùng khoảng trống!

#### Values Entered By (Giá trị nhập bởi)

Yếu tố Values Entered By chỉ ra nguồn giá trị của trường. Người dùng sẽ nhập giá trị vào trường thủ công hoặc chương trình ứng dụng cơ sở dữ liệu sẽ nhập chúng tự động; chương trình ứng dụng chỉ có thể cung cấp giá trị cho trường nếu người phát triển chương trình cung cấp phương tiện để nó tạo các giá trị. Lưu ý rằng thiết lập đại diện chương trình ứng dụng cơ sở dữ liệu là "System."

#### Required Value (Giá trị bắt buộc)

Yếu tố Required Value chỉ ra liệu người dùng có bắt buộc nhập giá trị cho trường hay không. Mặc dù bạn thường thiết lập yếu tố này là "No" cho hầu hết các trường trong bảng, bạn phải thiết lập nó là "Yes" khi trường phục vụ làm khóa chính. Bạn cũng có thể cần thiết lập Required Value là "Yes" cho trường như CUSTZIPCODE—thư hoặc gói bạn gửi cho khách hàng cho trước phải bao gồm mã bưu điện để Bưu điện xử lý đúng và chính xác.

#### Range of Values (Phạm vi giá trị)

Yếu tố Range of Values chỉ định mọi giá trị hợp lệ có thể có cho trường. Bạn có thể thiết lập yếu tố này theo nhiều cách khác nhau, như với giới hạn dưới và trên (1.000 đến 9.999) hoặc với danh sách giá trị cụ thể ("WA," "OR," "ID," "MT"). Bạn có thể thiết lập phạm vi giá trị theo ba nhóm:

1. **General (Chung):** Tập hợp hoàn chỉnh mọi giá trị có thể có cho trường này. Ví dụ, phạm vi giá trị chung cho trường CUSTSTATE có thể bao gồm tất cả viết tắt hợp lệ cho mọi bang ở Hoa Kỳ.

2. **Integrity-specific (Cụ thể tính toàn vẹn):** Tập hợp giá trị dựa trên vai trò của trường trong mối quan hệ bảng. (Bạn sẽ học tất cả về nhóm này trong Chương 10.)

3. **Business-specific (Cụ thể nghiệp vụ):** Tập hợp giá trị do yêu cầu nghiệp vụ cụ thể tạo ra. Các tổ chức thường có nhiều yêu cầu khác nhau giới hạn phạm vi giá trị của trường. Ví dụ, trong tổ chức tiến hành kinh doanh chặt chẽ ở Tây Bắc Thái Bình Dương, phạm vi giá trị hợp lệ cho trường CUSTSTATE là "WA," "OR," "ID" và "MT." (Bạn sẽ học thêm về nhóm này trong Chương 11, "Quy tắc nghiệp vụ.")

Bạn chỉ quan tâm đến phạm vi giá trị chung trong giai đoạn này của quy trình thiết kế cơ sở dữ liệu, và bạn sẽ xem lại yếu tố Range of Values sau khi thiết lập mối quan hệ bảng và quy tắc nghiệp vụ.

Điều quan trọng cần lưu ý là "Other" và "Miscellaneous" là hai giá trị bạn không muốn thiết lập trong bất kỳ nhóm nào của yếu tố Range of Values. Cả hai giá trị đều không cụ thể và hoàn toàn vô nghĩa trong ngữ cảnh này và là dấu hiệu của sự lười suy nghĩ vì sự hiện diện của chúng chỉ ra nhu cầu rà soát trường để tinh chỉnh có thể. Bạn có thể tránh nhầm lẫn không cần thiết và vấn đề tiềm ẩn bằng cách tránh dùng các giá trị này.

#### Edit Rule (Quy tắc chỉnh sửa)

Yếu tố này chỉ định thời điểm người dùng có thể nhập giá trị vào trường và liệu anh ta có thể sửa đổi giá trị đó hay không. Bạn thiết lập yếu tố này thành một trong năm tùy chọn sau:

1. **Enter Now, Edits Allowed (Nhập ngay, cho phép chỉnh sửa):** Người dùng phải nhập giá trị cho trường này khi cô ấy tạo bản ghi mới trong Parent Table của trường. Cô ấy sau đó có thể chỉnh sửa giá trị bất kỳ lúc nào.

2. **Enter Later, Edits Allowed (Nhập sau, cho phép chỉnh sửa):** Người dùng có tùy chọn nhập giá trị cho trường này khi tạo bản ghi mới trong Parent Table của trường. Điều này không ngụ ý theo bất kỳ cách nào rằng giá trị của trường có thể Null mãi mãi; người dùng phải nhập giá trị cho trường này tại một thời điểm nào đó trong tương lai gần. Sau khi nhập giá trị, cô ấy có thể chỉnh sửa nó bất kỳ lúc nào.

3. **Enter Now, Edits Not Allowed (Nhập ngay, không cho phép chỉnh sửa):** Người dùng phải nhập giá trị cho trường này khi cô ấy tạo bản ghi mới trong Parent Table của trường, nhưng cô ấy không thể chỉnh sửa nó bất kỳ lúc nào.

4. **Enter Later, Edits Not Allowed (Nhập sau, không cho phép chỉnh sửa):** Người dùng có tùy chọn nhập giá trị cho trường này khi tạo bản ghi mới trong Parent Table của trường. Điều này không ngụ ý theo bất kỳ cách nào rằng giá trị của trường có thể Null mãi mãi; người dùng phải nhập giá trị cho trường này tại một thời điểm nào đó trong tương lai gần. Sau khi nhập giá trị, cô ấy không thể chỉnh sửa nó bất kỳ lúc nào.

5. **Not Determined At This Time (Chưa xác định tại thời điểm này):** Edit Rule sẽ được xác định khi cơ sở dữ liệu được triển khai trong chương trình RDBMS.

**Lưu ý:** Tùy chọn hai và bốn cho người dùng lựa chọn nhập giá trị vào trường vào thời điểm sau. Độ dài thời gian người dùng được cho để nhập giá trị sẽ được xác định và theo cách nào đó thực thi khi cơ sở dữ liệu được triển khai vào chương trình RDBMS.

*[Hình 9.7 Nhóm Logical Elements cho trường EMPLOYEE ID NUMBER.]*

---

## Sử dụng Đặc tả trường Unique, Generic và Replica

Trước đó trong chương này, bạn đã học rằng bạn có thể định nghĩa đặc tả là Unique, Generic hoặc Replica. Bạn có thể đảm bảo định nghĩa loại đặc tả phù hợp cho trường cho trước bằng cách làm theo các hướng dẫn đơn giản sau:

- Dùng đặc tả **Unique** cho bất kỳ trường nào chỉ xuất hiện một lần trong toàn bộ cơ sở dữ liệu hoặc cho trường phục vụ làm khóa chính.
- Dùng đặc tả **Generic** cho trường phục vụ làm mẫu cho các trường khác trong cơ sở dữ liệu. Nhớ dùng tên trường không cụ thể và thiết lập yếu tố càng rộng và chung chung càng tốt.
- Dùng đặc tả **Replica** cho trường bạn dựa trên generic field cho trước hoặc cho trường phục vụ làm khóa ngoại trong mối quan hệ bảng.

*[Hình 9.8 Đặc tả trường Unique cho trường VENDOR ID NUMBER.]*

Sau đây là vài điều cần lưu ý về đặc tả này:

1. Trường này cũng xuất hiện trong bảng PRODUCTS, như được chỉ ra bởi yếu tố chung Shared By. Điều này vừa hợp lý vừa cần thiết vì mỗi sản phẩm phải được liên kết với nhà cung cấp cụ thể. (Bạn sẽ học thêm về loại vấn đề này trong chương tiếp theo.)
2. Xem xét thiết lập cho các yếu tố logic Uniqueness, Null Support, Required Value và Edit Rule. Chúng được thiết lập theo cách này vì yếu tố Key Type được thiết lập là "Primary." Trên thực tế, bạn nên dùng các thiết lập yếu tố này cho bất kỳ trường nào phục vụ làm khóa chính.

*[Hình 9.9 Đặc tả trường Generic cho trường STATE chung.]*

Lưu ý các mục sau:

1. Mô tả rất chung chung, như nên có cho loại đặc tả này.
2. Yếu tố logic Range of Values phù hợp rộng rãi.

Trường này (và đặc tả của nó) giờ phục vụ làm mẫu cho tất cả các trường bang khác bạn tạo trong cơ sở dữ liệu. Ví dụ, bạn có thể tạo trường VENDSTATE dựa trên trường STATE chung. Bạn sẽ định nghĩa đặc tả Replica cho trường VENDSTATE dựa trên đặc tả Generic của trường STATE. Mặc dù đặc tả Replica của trường VENDSTATE lấy thiết lập yếu tố ban đầu từ đặc tả Generic của trường STATE, bạn có thể sửa đổi bất kỳ thiết lập yếu tố nào của đặc tả Replica để hoàn toàn tùy chỉnh chúng cho trường VENDSTATE. Hình 9.10 cho thấy đặc tả trường Replica đã tùy chỉnh cho trường VENDSTATE.

*[Hình 9.10 Đặc tả trường Replica đã tùy chỉnh cho trường VENDSTATE.]*

Sau đây là vài điều cần lưu ý về đặc tả này:

1. Tên trường (VENDSTATE) xác định chính xác trường đại diện gì.
2. Yếu tố chung Source Specification tham chiếu đúng đặc tả của trường STATE chung.
3. Yếu tố Description giờ cụ thể cho trường này. Nhớ rằng mô tả chung chung hơn trong đặc tả nguồn.
4. Yếu tố Range of Values giờ cụ thể cho trường này; nó rộng hơn nhiều trong đặc tả nguồn.

Trong chương tiếp theo, bạn sẽ học cách định nghĩa đặc tả trường Replica cho trường phục vụ làm khóa ngoại.

---

## Định nghĩa Đặc tả trường cho mỗi Trường trong Cơ sở dữ liệu

Bây giờ bạn đã có tất cả các trường cần thiết được gán cho mỗi bảng và bạn hiểu các yếu tố khác nhau trong đặc tả trường, bạn có thể bắt đầu quy trình định nghĩa đặc tả trường cho mỗi trường trong cơ sở dữ liệu. Sẽ mất đáng kể thời gian để hoàn thành quy trình này, nhưng nhớ rằng bạn đang làm việc chăm chỉ để thiết lập tính toàn vẹn mức trường bằng cách đảm bảo dữ liệu nhất quán, hợp lệ và càng không có lỗi càng tốt. Tất cả công sức của bạn sẽ mang lại lợi ích lớn vì thông tin bạn truy xuất từ cơ sở dữ liệu sẽ luôn kịp thời và chính xác, và bạn sẽ có tập bản vẽ cấu trúc đáng tin cậy bạn có thể dùng khi triển khai cơ sở dữ liệu trong chương trình RDBMS.

Bạn có thể đảm bảo các đặc tả càng hoàn chỉnh và chính xác càng tốt bằng cách làm việc với cả người dùng và quản lý để định nghĩa chúng. Họ có thể cung cấp hiểu biết sâu về dữ liệu và có thể hỗ trợ đặc biệt trong việc tinh chỉnh các yếu tố logic của đặc tả. Bạn không cần nói chuyện với mọi người trong tổ chức, nhưng bạn muốn cố gắng gặp gỡ số đại diện người rất quen thuộc với dữ liệu và cách nó được sử dụng. Sắp xếp nhiều cuộc họp cần thiết (hoặc có thể) để hoàn thành quy trình phỏng vấn, và dành thời gian bạn cần để càng kỹ lưỡng càng tốt. Trên hết, đừng vội vàng trong giai đoạn này! Làm vậy chỉ giảm lợi ích của nỗ lực tổng thể của bạn và tăng cơ hội mắc lỗi không cần thiết.

Chiến lược tốt nhất cho nhiệm vụ này là định nghĩa càng nhiều đặc tả càng tốt (càng hoàn chỉnh càng tốt) rồi làm việc với những người tham gia để hoàn thành phần còn lại. Khi bạn làm việc với đặc tả của trường, dùng phán đoán tốt nhất của bạn để định nghĩa thiết lập cho mỗi yếu tố. Đừng lo nếu thiết lập của bạn có vẻ hơi sai hoặc nếu bạn gặp khó khi cung cấp thiết lập cho một số yếu tố—bạn sẽ rà soát chúng với những người tham gia dù sao. Sau khi bạn đã định nghĩa đặc tả cho tất cả các trường quen thuộc với bạn, bắt đầu gặp gỡ những người tham gia để làm việc về đặc tả cho các trường còn lại.

Nhiệm vụ đầu tiên của bạn trong cuộc họp ban đầu là giải thích các yếu tố khác nhau trong đặc tả trường và đảm bảo mọi người hiểu chúng càng nhiều càng tốt. Cung cấp cho những người tham gia giáo dục ngắn gọn và súc tích về các yếu tố của đặc tả giúp họ có kiến thức cần thiết để hỗ trợ bạn định nghĩa đặc tả đúng. (Trong các cuộc họp tiếp theo, chỉ rà soát các yếu tố để đảm bảo mọi người nhớ chúng đại diện gì.)

Tiếp theo, rà soát tất cả các đặc tả bạn đã định nghĩa và hỏi những người tham gia liệu thiết lập cho các yếu tố có phù hợp và đúng hay không. Trong một số trường hợp, những người tham gia sẽ tiết lộ thông tin mới về trường ảnh hưởng đến đặc tả của trường đó. Ví dụ, người tham gia có thể nhớ (được gợi ý bởi chủ đề nào đó trong cuộc thảo luận) rằng tập giá trị cụ thể luôn được dùng cho trường cụ thể; do đó bạn thiết lập yếu tố Range of Values của trường để phản ánh thông tin mới này. Đảm bảo bạn xem xét từng phần của đặc tả rồi chuyển sang đặc tả tiếp theo khi những người tham gia không còn gợi ý tinh chỉnh. Lặp lại quy trình này cho mỗi đặc tả.

Bây giờ, làm việc với những người tham gia về các đặc tả bạn không thể định nghĩa hoặc hoàn thành. Cố gắng làm việc với những người quen thuộc nhất với các trường đang thảo luận vì họ có khả năng biết thiết lập nào nên được dùng cho nhóm Logical Elements. Xác định thiết lập yếu tố phù hợp cho mỗi trường và đánh dấu trên tờ Đặc tả trường. Sau khi bạn đã định nghĩa đặc tả cho mỗi trường trong cơ sở dữ liệu, toàn bộ quy trình hoàn tất.

Thiết kế cơ sở dữ liệu mới giờ gần hoàn thành. Trong chương tiếp theo, bạn sẽ học cách thiết lập mối quan hệ giữa các bảng trong cơ sở dữ liệu. Mối quan hệ quan trọng vì cho phép view (khung nhìn) rút dữ liệu từ nhiều bảng đồng thời.

---

## Ví dụ: Định nghĩa Đặc tả trường

Bây giờ bạn đã có tất cả các trường phù hợp được gán cho các bảng trong cơ sở dữ liệu Mike's Bikes, đã đến lúc định nghĩa đặc tả trường cho mỗi trường. Trước khi gặp Mike và nhân viên của anh ấy, bạn định nghĩa càng nhiều đặc tả trường càng tốt. Không có bảng nào bất thường theo bất kỳ cách nào, và các trường khá đơn giản, nên bạn ít gặp khó khi định nghĩa các đặc tả. Hình 9.11 cho thấy đặc tả cho trường PRODUCT DESCRIPTION trong bảng PRODUCTS.

*[Hình 9.11 Đặc tả trường cho trường PRODUCT DESCRIPTION.]*

Bây giờ bạn gặp Mike và nhân viên của anh ấy để thảo luận các đặc tả trường bạn đã định nghĩa. Không ai có vấn đề với bất kỳ đặc tả nào; mọi người xác nhận tất cả thiết lập yếu tố có vẻ phù hợp và đúng. Tuy nhiên bạn có câu hỏi về trường CATEGORY trong bảng PRODUCTS: Bạn muốn biết thiết lập phù hợp cho yếu tố Range of Values. Phản hồi cho câu hỏi của bạn lẫn lộn—không ai có vẻ biết danh sách đầy đủ các danh mục hợp lệ cho trường, nên bạn quyết định chỉ định phạm vi giá trị chung cho hiện tại. Hình 9.12 cho thấy các yếu tố logic đã sửa cho trường CATEGORY.

*[Hình 9.12 Các yếu tố logic cho trường CATEGORY trong bảng PRODUCTS.]*

Bạn sẽ xem lại trường này (và các yếu tố của nó) khi thiết lập quy tắc nghiệp vụ cho cơ sở dữ liệu. Với vấn đề này được giải quyết, cuộc họp của bạn—cũng như quy trình thiết lập đặc tả trường—hoàn tất.

---

## Tóm tắt

Chương mở đầu với giải thích tại sao đặc tả trường quan trọng và lợi ích bạn thu được từ việc định nghĩa chúng. Bạn đã học rằng định nghĩa đặc tả giúp bạn thiết lập và thực thi tính toàn vẹn mức trường, nâng cao tính toàn vẹn dữ liệu tổng thể, và buộc bạn thu nhận hiểu biết hoàn chỉnh về bản chất và mục đích của dữ liệu trong cơ sở dữ liệu. Mức hiểu biết này cho phép bạn tận dụng dữ liệu để tối đa lợi thế.

Tiếp theo, chúng ta thảo luận giải phẫu đặc tả trường. Bạn giờ quen thuộc với ba nhóm yếu tố trong đặc tả và tờ bạn dùng để ghi chúng. Sau đó chúng ta thảo luận từng nhóm và các yếu tố của nó chi tiết. Như bạn giờ biết, nhóm General Elements đại diện các thuộc tính cơ bản nhất của trường. Trong cuộc thảo luận này, bạn đã học bộ hướng dẫn sẽ giúp bạn soạn mô tả trường tốt. Bạn cũng đã học rằng bạn có thể định nghĩa ba loại đặc tả, do đó cho phép bạn thiết lập và duy trì định nghĩa trường nhất quán. Chúng ta xem xét nhóm Physical Elements tiếp theo, và bạn đã học nó liên quan đến cấu trúc của trường. Nhóm Logical Elements là chủ đề thảo luận cuối trong phần này. Bạn giờ biết nó chủ yếu liên quan đến giá trị của trường và bao gồm các yếu tố như Key Type, Null Support, Range of Values, Edit Rule.

Sau đó chúng ta thảo luận cách sử dụng từng loại đặc tả, và bạn đã học bộ hướng dẫn giúp bạn xác định loại nào định nghĩa cho trường cho trước. Bạn cũng đã xem xét mẫu các đặc tả, và bạn biết chúng khác nhau như thế nào.

Chương kết thúc với thảo luận về định nghĩa đặc tả trường cho mỗi trường. Ở đây bạn đã học cách tốt nhất đảm bảo đặc tả hoàn chỉnh và chính xác là làm việc với người dùng và quản lý để định nghĩa chúng. Bạn nên đầu tiên định nghĩa càng nhiều đặc tả càng tốt rồi làm việc với nhân viên để định nghĩa đặc tả cho các trường còn lại. Bạn cũng đã học rằng bạn có thể làm việc với nhân viên để tinh chỉnh các đặc tả bạn ban đầu định nghĩa.

---

## Câu hỏi ôn tập

1. Nêu hai lý do chính tại sao đặc tả trường quan trọng.
2. Bạn thu được gì khi thiết lập tính toàn vẹn mức trường (field-level integrity)?
3. Ba nhóm yếu tố trong đặc tả trường là gì?
4. Nêu ba loại đặc tả.
5. Tại sao việc soạn mô tả trường đúng có lợi cho bạn?
6. Yếu tố Data Type chỉ ra gì?
7. Yếu tố Character Support chỉ ra gì?
8. Các loại khóa nào được chỉ ra trên đặc tả trường?
9. Đúng hay Sai: Null đại diện giá trị khoảng trống.
10. Ý nghĩa của yếu tố Range of Values là gì?
11. Mục đích của Edit Rule là gì?
12. Khi nào bạn dùng đặc tả generic?

---

## Đáp án Câu hỏi ôn tập

*(Từ Phụ lục A của sách)*

1. Đặc tả trường quan trọng vì những lý do sau:
   - a. Chúng giúp thiết lập và thực thi tính toàn vẹn mức trường.
   - b. Chúng giúp nâng cao tính toàn vẹn dữ liệu tổng thể.
   - c. Chúng buộc bạn thu nhận hiểu biết hoàn chỉnh về bản chất và mục đích của dữ liệu trong cơ sở dữ liệu.
   - d. Chúng cấu thành "data dictionary" của cơ sở dữ liệu.

2. Tính toàn vẹn mức trường đảm bảo những điều sau:
   - a. Định danh và mục đích của trường rõ ràng, và tất cả các bảng trong đó trường xuất hiện được xác định đúng.
   - b. Định nghĩa trường nhất quán trong toàn bộ cơ sở dữ liệu.
   - c. Giá trị của trường nhất quán và hợp lệ.
   - d. Các loại sửa đổi, so sánh và thao tác có thể áp dụng cho giá trị trong trường được xác định rõ ràng.

3. Ba nhóm yếu tố trong đặc tả trường là general (chung), physical (vật lý) và logical (logic).

4. Ba loại đặc tả là Unique, Generic và Replica.

5. Việc soạn mô tả trường đúng cực kỳ có lợi vì buộc bạn (và mọi người trong tổ chức) suy nghĩ cẩn thận về bản chất của dữ liệu sẽ được lưu trong trường.

6. Yếu tố Data Type chỉ ra bản chất của dữ liệu trường lưu.

7. Yếu tố Character Support chỉ ra loại ký tự người dùng có thể nhập vào giá trị trường cho trước.

8. Các loại khóa được chỉ ra trên đặc tả trường là non (không khóa), primary (chính), alternate (thay thế) và foreign (ngoại).

9. Sai. Null không đại diện khoảng trống—nó đại diện giá trị thiếu hoặc không xác định.

10. Yếu tố Range of Values chỉ định mọi giá trị hợp lệ có thể có cho trường.

11. Edit Rule chỉ định thời điểm người dùng có thể nhập giá trị vào trường và liệu anh ta có thể sửa đổi giá trị đó hay không.

12. Bạn dùng đặc tả generic cho trường phục vụ làm mẫu cho các trường khác trong cơ sở dữ liệu.

---

*Kết thúc Chương 9*
