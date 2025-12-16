# NPX Examples - Hands-On Practice

This file contains practical npx examples you can run immediately in your terminal.

## 🚀 Quick Start Examples

### 1. Fun Commands (No Installation Needed!)

```bash
# Say hello with a cow 🐮
npx cowsay "Hello Node.js!"

# Display text as ASCII art
npx figlet "NPX is Cool"

# Show a Christmas tree
npx xmas-tree

# Display a random quote
npx quote-cli

# Fun loading spinner
npx loading-cli "Processing..."
```

---

## 📦 Useful Development Tools

### 2. HTTP Server (Serve Current Directory)

```bash
# Start a local HTTP server
npx http-server

# With specific port
npx http-server -p 8080

# With open browser automatically
npx http-server -o
```

### 3. Check Node.js Package Info

```bash
# View package information
npx npm-check

# Check for outdated packages
npx npm-check-updates

# Show package details
npx package-json-view express
```

### 4. Code Quality Tools

```bash
# Initialize ESLint configuration
npx eslint --init

# Run Prettier on current directory
npx prettier --check .

# Format code with Prettier
npx prettier --write .

# Check TypeScript setup
npx tsc --init
```

### 5. Project Scaffolding

```bash
# Create React app (in new folder)
npx create-react-app my-react-app

# Create Next.js app
npx create-next-app my-next-app

# Create Vite project
npx create-vite my-vite-app

# Create Express app
npx express-generator my-express-app

# Create Node.js CLI tool
npx create-cli-app my-cli
```

---

## 🔍 Testing & Debugging Tools

### 6. Bundle Analysis

```bash
# Analyze package size
npx package-size express

# Check bundle size
npx bundlephobia lodash
```

### 7. JSON Tools

```bash
# Pretty print JSON (if you have a json file)
npx json-server --help

# Validate JSON
npx jsonlint package.json
```

### 8. Git & Version Control

```bash
# Generate conventional commit messages
npx cz

# Create .gitignore file
npx gitignore node

# Check git status with style
npx git-open
```

---

## 🎨 File & Directory Operations

### 9. File Management

```bash
# Create directory structure
npx mkdirp src/components/ui

# Copy files with glob patterns
npx cpy '**/*.js' dist

# Clean directories
npx rimraf node_modules
```

### 10. QR Code Generation

```bash
# Generate QR code in terminal
npx qrcode "https://nodejs.org"

# Generate QR code with custom text
npx qrcode "Your text here"
```

---

## 🧪 Package Testing & Information

### 11. Test Packages Before Installing

```bash
# Try different versions
npx typescript@latest --version
npx typescript@4.9.0 --version

# Test webpack
npx webpack --version

# Try different build tools
npx vite --version
npx parcel --version
```

### 12. License & Documentation

```bash
# Generate LICENSE file
npx license mit > LICENSE

# Generate README template
npx readme-md-generator
```

---

## 💻 Your Own Local Examples

### 13. Run Your Own Scripts (If You Have Them)

```bash
# If you have a local script in package.json
npx ts-node script.ts

# Run local binary
npx eslint src/

# Run tests
npx jest
npx mocha
```

---

## 🎯 Recommended: Try These First!

Here are the safest and most fun commands to try immediately:

```bash
# 1. Fun ASCII art
npx figlet "Hello World"

# 2. Show a cow saying something
npx cowsay "NPX is awesome!"

# 3. Start a simple HTTP server
npx http-server

# 4. Check your package.json
npx package-json-view express

# 5. Generate a QR code
npx qrcode "https://github.com"
```

---

## 🛠️ Practical Workflow Examples

### Example 1: Quick File Server

```bash
# Navigate to your project
cd /home/nhanle/Desktop/my_training/nodejs-training

# Start server to view files in browser
npx http-server -p 3000
```

### Example 2: Format Code

```bash
# Check formatting
npx prettier --check examples/

# Auto-fix formatting
npx prettier --write examples/
```

### Example 3: Initialize TypeScript

```bash
# Create tsconfig.json
npx tsc --init

# Check version
npx typescript --version
```

### Example 4: Run a One-Time Script

```bash
# Execute a script from npm without installing
npx node-fetch-cli https://api.github.com/users/nodejs

# Or create a temp script
npx -c 'echo "Hello from npx shell command"'
```

---

## 📝 Notes

- **First run**: npx will ask for permission to install the package (press `y`)
- **Skip prompt**: Use `npx -y <package>` to auto-approve
- **Cache location**: Packages are cached in `~/.npm/_npx/`
- **No cleanup needed**: Packages don't clutter your project

---

## 🎓 Educational Examples for Your Project

### Create a Simple CLI Tool

Create `my-cli.js`:

```javascript
#!/usr/bin/env node
console.log("Hello from my CLI!");
console.log("Args:", process.argv.slice(2));
```

Make it executable:

```bash
chmod +x my-cli.js

# Test it
npx ./my-cli.js test 123
```

---

## 🚨 Common Issues & Solutions

**Issue 1: "command not found"**

```bash
# Solution: Check if package exists
npx <package-name> --help
```

**Issue 2: Want specific version**

```bash
# Solution: Specify version
npx <package>@1.2.3
```

**Issue 3: Slow first run**

```bash
# Solution: Package is downloading, this is normal!
# Use -y to skip prompt
npx -y <package>
```

---

## 🎉 Start Experimenting!

Pick any command above and try it. Start with the fun ones like `cowsay` or `figlet`!

Remember: npx is perfect for trying things without commitment! 🚀

