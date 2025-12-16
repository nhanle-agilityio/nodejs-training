# NPX - Run npm Packages Without Installation

**Source:** [npm Documentation - npx](https://docs.npmjs.com/cli/v11/commands/npx)

---

## 1. NPX Basics

### What is npx?

**English:**

- `npx` is a command that allows you to run arbitrary commands from npm packages
- It can execute packages either installed locally OR fetched remotely
- It runs packages in a similar context as `npm run`
- Built into npm (since npm v7.0.0, npx became part of npm core)
- Executes package binaries without requiring global installation

**Vietnamese:**

- `npx` là một lệnh cho phép bạn chạy các lệnh từ npm packages
- Nó có thể thực thi packages đã cài đặt locally HOẶC tải từ xa
- Nó chạy packages trong ngữ cảnh tương tự như `npm run`
- Tích hợp sẵn trong npm (từ npm v7.0.0 trở đi, npx đã trở thành một phần của npm core)
- Thực thi package binaries mà không cần cài đặt global

### npx vs npm install

**English:**

| npm install                        | npx                                       |
| ---------------------------------- | ----------------------------------------- |
| Installs package to `node_modules` | Doesn't permanently install               |
| Takes up disk space                | Downloads to npm cache only               |
| Requires update management         | Always uses latest version (if specified) |
| Good for regular dependencies      | Good for one-time commands                |
| `npm install -g create-react-app`  | `npx create-react-app my-app`             |

**Vietnamese:**

| npm install                        | npx                                         |
| ---------------------------------- | ------------------------------------------- |
| Cài đặt package vào `node_modules` | Không cài đặt vĩnh viễn                     |
| Chiếm dung lượng ổ đĩa             | Chỉ tải về npm cache                        |
| Cần quản lý cập nhật               | Luôn dùng phiên bản mới nhất (nếu chỉ định) |
| Tốt cho dependencies thường xuyên  | Tốt cho lệnh chạy một lần                   |
| `npm install -g create-react-app`  | `npx create-react-app my-app`               |

### When to Use npx

**English:**

1. **One-time commands**: Running tools you don't need permanently
2. **Testing packages**: Try before installing
3. **Latest versions**: Always use the newest version of a tool
4. **Avoiding global installs**: Keep global namespace clean
5. **Running different versions**: Test multiple versions easily
6. **Create commands**: `create-react-app`, `create-next-app`, etc.

**Vietnamese:**

1. **Lệnh chạy một lần**: Chạy các công cụ bạn không cần cài đặt vĩnh viễn
2. **Thử nghiệm packages**: Dùng thử trước khi cài đặt
3. **Phiên bản mới nhất**: Luôn dùng phiên bản mới nhất của công cụ
4. **Tránh cài đặt global**: Giữ global namespace sạch sẽ
5. **Chạy các phiên bản khác nhau**: Dễ dàng thử nghiệm nhiều phiên bản
6. **Lệnh create**: `create-react-app`, `create-next-app`, v.v.

### How npx Works

**English:**

1. **Check local dependencies**: First looks for the package in local `node_modules`
2. **Check npm cache**: If not found locally, checks npm cache
3. **Download if needed**: If not in cache, downloads to cache folder
4. **Prompt user**: Shows a prompt before downloading (can suppress with `-y` or `--no`)
5. **Execute**: Runs the package's binary with provided arguments
6. **Clean up**: Package stays in cache but not in project dependencies

**Vietnamese:**

1. **Kiểm tra dependencies local**: Đầu tiên tìm package trong `node_modules` local
2. **Kiểm tra npm cache**: Nếu không tìm thấy local, kiểm tra npm cache
3. **Tải về nếu cần**: Nếu không có trong cache, tải về thư mục cache
4. **Hỏi người dùng**: Hiển thị prompt trước khi tải (có thể bỏ qua với `-y` hoặc `--no`)
5. **Thực thi**: Chạy binary của package với các arguments được cung cấp
6. **Dọn dẹp**: Package vẫn ở trong cache nhưng không nằm trong project dependencies

---

## 2. Common Use Cases

### Syntax

```bash
# Basic syntax
npx <package-name> [args...]

# Specify version
npx <package>@<version> [args...]

# Use specific package but run different command
npx --package=<pkg> -- <cmd> [args...]

# Run shell command with package context
npx -c '<cmd> [args...]'
```

### Use Case 1: Running Package Binaries

**English:**
Execute tools without global installation.

**Vietnamese:**
Thực thi các công cụ mà không cần cài đặt global.

```bash
# Run eslint (if in local dependencies)
npx eslint src/

# Run prettier
npx prettier --write .

# Run typescript compiler
npx tsc --init
```

### Use Case 2: Executing One-Off Commands

**English:**
Run commands you only need once or occasionally.

**Vietnamese:**
Chạy các lệnh bạn chỉ cần một lần hoặc thỉnh thoảng.

```bash
# Generate a new project
npx create-react-app my-app

# Run http-server for current directory
npx http-server

# Run cowsay (fun command)
npx cowsay "Hello, Node.js!"
```

### Use Case 3: Testing Packages Before Installing

**English:**
Try packages before committing to installation.

**Vietnamese:**
Dùng thử packages trước khi quyết định cài đặt.

```bash
# Test a linter
npx eslint --init

# Try a different bundler
npx vite

# Test a code formatter
npx prettier --check .
```

### Use Case 4: Running Different Versions

**English:**
Test or use specific versions of packages.

**Vietnamese:**
Thử nghiệm hoặc sử dụng các phiên bản cụ thể của packages.

```bash
# Use latest version
npx create-react-app@latest my-app

# Use specific version
npx typescript@4.5.0 --version

# Compare different versions
npx webpack@4 --version
npx webpack@5 --version
```

### Use Case 5: Using create-\* Packages

**English:**
Scaffold new projects quickly.

**Vietnamese:**
Khởi tạo dự án mới nhanh chóng.

```bash
# Create React app
npx create-react-app my-app

# Create Next.js app
npx create-next-app my-next-app

# Create Vite project
npx create-vite my-vite-app

# Create Express app
npx express-generator my-express-app
```

### Advanced Examples

```bash
# Run command with specific package context
npx --package=foo -- bar --bar-argument

# Run shell script in project context
npx -c 'eslint && echo "Lint passed!"'

# Run local version with arguments
npx tap --bail test/foo.js

# Suppress installation prompt
npx -y create-react-app my-app
```

---

## 3. Creating NPX Packages

### Step 1: Adding bin Field in package.json

**English:**
The `bin` field tells npm which file(s) should be executable.

**Vietnamese:**
Trường `bin` cho npm biết file nào có thể thực thi được.

**Single binary:**

```json
{
  "name": "my-cli-tool",
  "version": "1.0.0",
  "bin": "./cli.js"
}
```

**Multiple binaries:**

```json
{
  "name": "my-tools",
  "version": "1.0.0",
  "bin": {
    "tool1": "./bin/tool1.js",
    "tool2": "./bin/tool2.js"
  }
}
```

**Named binary (recommended):**

```json
{
  "name": "my-awesome-tool",
  "version": "1.0.0",
  "bin": {
    "my-awesome-tool": "./index.js"
  }
}
```

### Step 2: Making Scripts Executable

**English:**
Add shebang line at the top of your executable file.

**Vietnamese:**
Thêm dòng shebang ở đầu file thực thi.

**Example: `cli.js`**

```javascript
#!/usr/bin/env node

// Your CLI code here
console.log("Hello from my CLI tool!");

// Parse arguments
const args = process.argv.slice(2);
console.log("Arguments:", args);
```

**Make file executable (Linux/Mac):**

```bash
chmod +x cli.js
```

### Step 3: Testing Locally

**English:**
Test your package before publishing.

**Vietnamese:**
Thử nghiệm package trước khi publish.

```bash
# Link your package locally
npm link

# Test it
my-cli-tool --help

# Or test with npx
npx .
```

### Step 4: Publishing npx-Ready Packages

**English:**
Publish your package to npm registry.

**Vietnamese:**
Publish package của bạn lên npm registry.

```bash
# Login to npm
npm login

# Publish package
npm publish

# Test published package
npx my-awesome-tool
```

### Complete Example: Simple CLI Tool

**package.json:**

```json
{
  "name": "greet-cli",
  "version": "1.0.0",
  "description": "A simple greeting CLI tool",
  "bin": {
    "greet": "./index.js"
  },
  "keywords": ["cli", "greeting"],
  "author": "Your Name",
  "license": "MIT"
}
```

**index.js:**

```javascript
#!/usr/bin/env node

const args = process.argv.slice(2);
const name = args[0] || "World";

console.log(`Hello, ${name}!`);

if (args.includes("--help")) {
  console.log(`
Usage: greet [name]

Options:
  --help    Show this help message
  `);
}
```

**Usage after publishing:**

```bash
npx greet-cli
# Output: Hello, World!

npx greet-cli Alice
# Output: Hello, Alice!

npx greet-cli --help
# Shows help message
```

---

## 4. npx vs npm exec

**English:**
`npx` is essentially an alias for `npm exec`, but with different argument parsing.

**Vietnamese:**
`npx` về cơ bản là alias của `npm exec`, nhưng có cách parse arguments khác.

### Key Differences

**With npx:**

```bash
# All flags must come BEFORE positional arguments
npx foo@latest bar --package=@npmcli/foo
# Result: runs "foo bar --package=@npmcli/foo"
```

**With npm exec:**

```bash
# Without -- : npm parses ALL options
npm exec foo@latest bar --package=@npmcli/foo
# Result: installs @npmcli/foo, then runs "foo@latest bar"

# With -- : stops npm parsing
npm exec -- foo@latest bar --package=@npmcli/foo
# Result: same as npx (runs "foo bar --package=@npmcli/foo")
```

**Recommendation:** Use `--` with `npm exec` for clarity.

---

## 5. Important Options

**English:**

| Option            | Description                          |
| ----------------- | ------------------------------------ |
| `-y, --yes`       | Skip installation prompt             |
| `--no`            | Don't install if not found           |
| `--package=<pkg>` | Specify package to install           |
| `-c '<cmd>'`      | Run shell command                    |
| `-p <pkg>`        | Shorthand for `--package` (npx only) |

**Vietnamese:**

| Tùy chọn          | Mô tả                              |
| ----------------- | ---------------------------------- |
| `-y, --yes`       | Bỏ qua prompt cài đặt              |
| `--no`            | Không cài đặt nếu không tìm thấy   |
| `--package=<pkg>` | Chỉ định package cần cài đặt       |
| `-c '<cmd>'`      | Chạy lệnh shell                    |
| `-p <pkg>`        | Viết tắt của `--package` (chỉ npx) |

---

## 6. Best Practices

**English:**

1. ✅ Use `npx` for one-time commands and scaffolding
2. ✅ Use `npm install` for regular project dependencies
3. ✅ Always specify version for reproducibility: `npx pkg@1.2.3`
4. ✅ Use `-y` flag in CI/CD to skip prompts
5. ✅ Test locally with `npm link` before publishing CLI tools
6. ✅ Include clear help messages in your CLI tools
7. ❌ Don't use `npx` for frequently used commands (install locally instead)
8. ❌ Don't forget the shebang `#!/usr/bin/env node` in executable scripts

**Vietnamese:**

1. ✅ Dùng `npx` cho lệnh chạy một lần và scaffolding
2. ✅ Dùng `npm install` cho project dependencies thường xuyên
3. ✅ Luôn chỉ định version để đảm bảo tái tạo: `npx pkg@1.2.3`
4. ✅ Dùng flag `-y` trong CI/CD để bỏ qua prompts
5. ✅ Test locally với `npm link` trước khi publish CLI tools
6. ✅ Bao gồm thông báo help rõ ràng trong CLI tools
7. ❌ Không dùng `npx` cho lệnh thường xuyên (cài đặt locally thay vào đó)
8. ❌ Đừng quên shebang `#!/usr/bin/env node` trong executable scripts

---

## 7. Quick Reference

```bash
# Run package (latest version)
npx <package-name>

# Run specific version
npx <package>@<version>

# Skip prompt
npx -y <package>

# Run with package context
npx --package=<pkg> -- <command>

# Run shell command
npx -c '<command>'

# Common examples
npx create-react-app my-app
npx eslint .
npx prettier --write .
npx typescript --init
npx http-server
```

---

## Summary / Tóm tắt

**English:**

- **npx** runs npm packages without permanent installation
- Perfect for one-time commands, testing, and scaffolding
- Packages are cached but not added to dependencies
- Create npx-ready packages with the `bin` field in `package.json`
- Always include `#!/usr/bin/env node` shebang in executable files
- Use `-y` flag to skip prompts in automated environments

**Vietnamese:**

- **npx** chạy npm packages mà không cần cài đặt vĩnh viễn
- Hoàn hảo cho lệnh một lần, thử nghiệm, và scaffolding
- Packages được lưu cache nhưng không thêm vào dependencies
- Tạo npx-ready packages với trường `bin` trong `package.json`
- Luôn bao gồm shebang `#!/usr/bin/env node` trong executable files
- Dùng flag `-y` để bỏ qua prompts trong môi trường tự động

