# Simple Task Manager CLI

A beginner-friendly command-line task manager built with Node.js.

## Features

✅ Add tasks
📋 List all tasks (pending and completed)
✔️ Mark tasks as done
🗑️ Remove tasks
🧹 Clear all tasks
🎨 Colorful terminal output

## Installation

No installation required! Just have Node.js installed.

## Usage

### Show Help
```bash
node cli-task-manager.js help
```

### Add a Task
```bash
node cli-task-manager.js add "Buy groceries"
node cli-task-manager.js add "Learn Node.js"
node cli-task-manager.js add "Build a project"
```

### List All Tasks
```bash
node cli-task-manager.js list

# Or simply run without arguments
node cli-task-manager.js
```

### Mark Task as Done
```bash
node cli-task-manager.js done 1
```

### Remove a Task
```bash
node cli-task-manager.js remove 1

# Short form
node cli-task-manager.js rm 1
```

### Clear All Tasks
```bash
node cli-task-manager.js clear
```

## Examples

```bash
# Add some tasks
$ node cli-task-manager.js add "Buy milk"
✅ Task added successfully!
   ID: 1
   Task: Buy milk

$ node cli-task-manager.js add "Read Node.js docs"
✅ Task added successfully!
   ID: 2
   Task: Read Node.js docs

# List tasks
$ node cli-task-manager.js list

📋 Your Tasks:
──────────────────────────────────────────────────

⏳ Pending:
   [1] Buy milk
   [2] Read Node.js docs

──────────────────────────────────────────────────
Total: 2 tasks (2 pending, 0 completed)

# Complete a task
$ node cli-task-manager.js done 1
✅ Task marked as done!
   [1] Buy milk

# List again
$ node cli-task-manager.js list

📋 Your Tasks:
──────────────────────────────────────────────────

⏳ Pending:
   [2] Read Node.js docs

✅ Completed:
   [1] Buy milk

──────────────────────────────────────────────────
Total: 2 tasks (1 pending, 1 completed)
```

## How It Works

### File Storage
- Tasks are stored in `tasks.json` in the same directory
- Data persists between runs
- Simple JSON format for easy debugging

### Task Structure
```json
{
  "id": 1,
  "description": "Buy groceries",
  "done": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "completedAt": null
}
```

### Commands Breakdown

| Command | Alias | Description |
|---------|-------|-------------|
| `add <description>` | - | Adds a new task |
| `list` | (default) | Shows all tasks |
| `done <id>` | - | Marks task as completed |
| `remove <id>` | `rm` | Deletes a task |
| `clear` | - | Removes all tasks |
| `help` | `-h`, `--help` | Shows help |

## Code Structure

### Key Functions

1. **loadTasks()** - Reads tasks from JSON file
2. **saveTasks(tasks)** - Writes tasks to JSON file
3. **addTask(description)** - Creates new task
4. **listTasks()** - Displays all tasks with colors
5. **markTaskDone(id)** - Updates task status
6. **removeTask(id)** - Deletes a task
7. **clearTasks()** - Removes all tasks

### Color Coding

- 🟢 Green: Success messages, completed tasks
- 🟡 Yellow: Warnings, pending tasks
- 🔵 Blue: Info messages, headers
- 🔴 Red: Errors, delete operations
- ⚪ Gray: Helper text, completed task details

## Learning Points

This CLI tool demonstrates:

1. **Command-line arguments**: Using `process.argv`
2. **File system operations**: Reading/writing JSON files
3. **Error handling**: Try-catch blocks
4. **Array methods**: filter, find, map, splice
5. **Date handling**: ISO timestamps
6. **Terminal colors**: ANSI escape codes
7. **Switch statements**: Command routing
8. **JSON operations**: Parse and stringify
9. **Path module**: Cross-platform file paths
10. **Shebang**: Making scripts executable

## Extending the Tool

Want to add more features? Try:

- [ ] Edit task descriptions
- [ ] Add task priorities (high, medium, low)
- [ ] Add due dates
- [ ] Search/filter tasks
- [ ] Export to different formats
- [ ] Add categories/tags
- [ ] Undo last action
- [ ] Task statistics

## Troubleshooting

**Q: Tasks not saving?**
A: Check if you have write permissions in the directory.

**Q: Colors not showing?**
A: Some terminals don't support ANSI colors. The tool still works without colors.

**Q: "Cannot find module" error?**
A: Make sure you're running from the correct directory.

## License

Free to use and modify for learning purposes! 🚀

---

**Happy Task Managing!** 📝✨

