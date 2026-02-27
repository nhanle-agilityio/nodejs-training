# Chương 12: Views — Ghi chú học tập

*Tham chiếu nhanh cho định nghĩa view*

---

## Định nghĩa

**View:** Bảng ảo gồm trường từ một hoặc nhiều base tables. Không lưu dữ liệu; RDBMS xây lại mỗi truy cập. Còn gọi "saved queries."

---

## Ba loại

| Loại | Mục đích | Sửa được? |
|------|----------|------------|
| **Data** | Xem/thao tác dữ liệu (một hoặc đa bảng) | Có* |
| **Aggregate** | Hiển thị dữ liệu tổng hợp (Sum, Avg, Min, Max, Count) | Không |
| **Validation** | Thi hành phạm vi giá trị (như validation table) | — |

*Đặc tả trường và quy tắc nghiệp vụ xác định sửa đổi. Đa bảng: không sửa PK.

---

## Lý do View có giá trị

- Làm việc nhiều bảng đồng thời
- Phản ánh dữ liệu mới nhất
- Tùy chỉnh cho cá nhân/nhóm
- Thi hành tính toàn vẹn
- Bảo mật

---

## Yêu cầu

- **Data view đa bảng:** Bảng phải có mối quan hệ
- **Data view:** Không có khóa chính
- **Aggregate view:** Tất cả data fields = grouping fields; không sửa
- **Filter:** Trường kiểm tra phải trong cấu trúc view

---

## Xác định Views

1. Rà soát ghi chú (báo cáo)
2. Rà soát mẫu báo cáo
3. Xem bảng/chủ đề
4. Phân tích mối quan hệ
5. Nghiên cứu quy tắc nghiệp vụ

---

## Tờ Đặc tả View

Name | Type | Base tables | Calculated field expressions | Filters

---

## Calculated Fields

- View có thể chứa; bảng không thể
- Dùng khi phù hợp hoặc nâng cao hiển thị
- Biểu thức: Max(), Count(), nối chuỗi, v.v.

---

## Filters

- Criterion = biểu thức kiểm tra giá trị trường
- Ghi trên View Specifications (không trên diagram)
- Trường phải có trong view

---

## Mẹo ghi nhớ

| Khái niệm | Điểm chính |
|-----------|------------|
| **Ảo** | Không lưu; xây lại mỗi truy cập |
| **Data view** | Không PK; đa bảng cần mối quan hệ |
| **Aggregate** | Grouping + calculated; chỉ đọc |
| **Validation view** | Rút từ base; table lưu riêng |
