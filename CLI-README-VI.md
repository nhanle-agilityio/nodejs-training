# CLI Task Manager - Trình Quản Lý Công Việc Dòng Lệnh

Công cụ quản lý công việc đơn giản, thân thiện với người mới học Node.js.

## Tính Năng

✅ Thêm công việc
📋 Liệt kê tất cả công việc (đang làm và hoàn thành)
✔️ Đánh dấu công việc hoàn thành
🗑️ Xóa công việc
🧹 Xóa tất cả công việc
🎨 Màu sắc đẹp mắt trong terminal

## Cài Đặt

Không cần cài đặt gì! Chỉ cần có Node.js.

## Cách Sử Dụng

### Hiển Thị Trợ Giúp
```bash
node cli-task-manager.js help
```

### Thêm Công Việc
```bash
node cli-task-manager.js add "Mua đồ ăn"
node cli-task-manager.js add "Học Node.js"
node cli-task-manager.js add "Làm dự án"
```

### Liệt Kê Tất Cả Công Việc
```bash
node cli-task-manager.js list

# Hoặc chạy không cần tham số
node cli-task-manager.js
```

### Đánh Dấu Hoàn Thành
```bash
node cli-task-manager.js done 1
```

### Xóa Công Việc
```bash
node cli-task-manager.js remove 1

# Dạng ngắn gọn
node cli-task-manager.js rm 1
```

### Xóa Tất Cả
```bash
node cli-task-manager.js clear
```

## Ví Dụ

```bash
# Thêm một vài công việc
$ node cli-task-manager.js add "Mua sữa"
✅ Task added successfully!
   ID: 1
   Task: Mua sữa

$ node cli-task-manager.js add "Đọc tài liệu Node.js"
✅ Task added successfully!
   ID: 2
   Task: Đọc tài liệu Node.js

# Liệt kê công việc
$ node cli-task-manager.js list

📋 Your Tasks:
──────────────────────────────────────────────────

⏳ Pending:
   [1] Mua sữa
   [2] Đọc tài liệu Node.js

──────────────────────────────────────────────────
Total: 2 tasks (2 pending, 0 completed)

# Hoàn thành công việc
$ node cli-task-manager.js done 1
✅ Task marked as done!
   [1] Mua sữa

# Liệt kê lại
$ node cli-task-manager.js list

📋 Your Tasks:
──────────────────────────────────────────────────

⏳ Pending:
   [2] Đọc tài liệu Node.js

✅ Completed:
   [1] Mua sữa

──────────────────────────────────────────────────
Total: 2 tasks (1 pending, 1 completed)
```

## Cách Hoạt Động

### Lưu Trữ File
- Công việc được lưu trong file `tasks.json` cùng thư mục
- Dữ liệu được giữ lại giữa các lần chạy
- Định dạng JSON đơn giản, dễ debug

### Cấu Trúc Task
```json
{
  "id": 1,
  "description": "Mua đồ ăn",
  "done": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "completedAt": null
}
```

### Các Lệnh

| Lệnh | Viết Tắt | Mô Tả |
|------|----------|-------|
| `add <mô tả>` | - | Thêm công việc mới |
| `list` | (mặc định) | Hiển thị tất cả công việc |
| `done <id>` | - | Đánh dấu hoàn thành |
| `remove <id>` | `rm` | Xóa công việc |
| `clear` | - | Xóa tất cả |
| `help` | `-h`, `--help` | Hiển thị trợ giúp |

## Cấu Trúc Code

### Các Hàm Chính

1. **loadTasks()** - Đọc tasks từ file JSON
2. **saveTasks(tasks)** - Ghi tasks vào file JSON
3. **addTask(description)** - Tạo task mới
4. **listTasks()** - Hiển thị tất cả tasks với màu sắc
5. **markTaskDone(id)** - Cập nhật trạng thái task
6. **removeTask(id)** - Xóa một task
7. **clearTasks()** - Xóa tất cả tasks

### Mã Màu

- 🟢 Xanh lá: Thông báo thành công, tasks hoàn thành
- 🟡 Vàng: Cảnh báo, tasks đang chờ
- 🔵 Xanh dương: Thông tin, tiêu đề
- 🔴 Đỏ: Lỗi, thao tác xóa
- ⚪ Xám: Text hỗ trợ, chi tiết tasks hoàn thành

## Điểm Học Tập

Công cụ CLI này minh họa:

1. **Command-line arguments**: Sử dụng `process.argv`
2. **Thao tác file system**: Đọc/ghi file JSON
3. **Xử lý lỗi**: Khối try-catch
4. **Array methods**: filter, find, map, splice
5. **Xử lý Date**: ISO timestamps
6. **Màu sắc terminal**: Mã ANSI escape
7. **Switch statements**: Định tuyến lệnh
8. **Thao tác JSON**: Parse và stringify
9. **Path module**: Đường dẫn đa nền tảng
10. **Shebang**: Làm script có thể thực thi

## Mở Rộng Công Cụ

Muốn thêm tính năng? Thử:

- [ ] Sửa mô tả task
- [ ] Thêm độ ưu tiên (cao, trung bình, thấp)
- [ ] Thêm ngày hạn
- [ ] Tìm kiếm/lọc tasks
- [ ] Xuất sang định dạng khác
- [ ] Thêm danh mục/tags
- [ ] Hoàn tác hành động cuối
- [ ] Thống kê tasks

## Khắc Phục Sự Cố

**H: Tasks không lưu được?**
Đ: Kiểm tra quyền ghi trong thư mục.

**H: Không hiển thị màu?**
Đ: Một số terminal không hỗ trợ màu ANSI. Công cụ vẫn hoạt động bình thường.

**H: Lỗi "Cannot find module"?**
Đ: Đảm bảo bạn đang chạy từ đúng thư mục.

## Giấy Phép

Tự do sử dụng và chỉnh sửa cho mục đích học tập! 🚀

---

**Chúc Quản Lý Công Việc Vui Vẻ!** 📝✨

