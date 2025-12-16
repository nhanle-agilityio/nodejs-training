# Node.js Learning Journey - Complete Summary

**Complete Guide to Node.js Fundamentals**

---

## 📚 Table of Contents

1. [Command Line Basics](#1-command-line-basics)
2. [File System Operations](#2-file-system-operations)
3. [Asynchronous Programming](#3-asynchronous-programming)
4. [Modules & Streams](#4-modules--streams)
5. [Diagnostics & Debugging](#5-diagnostics--debugging)
6. [Testing](#6-testing)
7. [NPX & Package Management](#7-npx--package-management)

---

## 1. Command Line Basics

### Running Node.js Scripts
- **Basic execution**: `node app.js`
- **Shebang for executables**: `#!/usr/bin/env node`
- **Watch mode**: `node --watch script.js` (auto-reload on changes)
- **Task runner**: `node --run <task>` (runs scripts from package.json)

### REPL (Interactive Shell)
- Start with: `node`
- Special variable `_` holds last result
- Dot commands: `.help`, `.editor`, `.exit`
- Quick testing and experimentation

### Console Output
- Basic logging: `console.log()`, `console.error()`, `console.warn()`
- Formatting: `console.count()`, `console.time()`, `console.trace()`
- Colored output: `styleText()` from `node:util`

### Environment Variables
- Access via: `process.env.VARIABLE_NAME`
- Native `.env` support: `node --env-file=.env script.js`
- Programmatic loading: `process.loadEnvFile()`

---

## 2. File System Operations

### File Stats & Information
```javascript
const fs = require('fs');
const stats = fs.statSync('file.txt');
stats.isFile();        // Check if file
stats.isDirectory();   // Check if directory
stats.size;            // File size in bytes
```

### Working with Paths
```javascript
const path = require('path');
path.dirname('/path/to/file.txt');   // Get directory
path.basename('/path/to/file.txt');  // Get filename
path.extname('file.txt');            // Get extension
path.join('dir', 'file.txt');        // Join paths safely
```

### Reading Files
- **Full file**: `fs.readFile()`, `fs.readFileSync()`, `fsPromises.readFile()`
- **Streams** (large files): `fs.createReadStream()`

### Writing Files
- **Overwrite**: `fs.writeFile()`, `fs.writeFileSync()`
- **Append**: `fs.appendFile()`
- **Flags**: `r`, `w`, `a`, `r+`, `w+`, `a+`

### File Descriptors
- Low-level file operations
- Open: `fs.open(path, 'r', callback)`
- Read/Write with fd: `fs.read(fd, buffer, ...)`
- Always close: `fs.close(fd, callback)`

### Working with Folders
```javascript
fs.existsSync('dir');              // Check existence
fs.mkdirSync('dir', {recursive: true}); // Create directory
fs.readdirSync('dir');             // List contents
fs.rmSync('dir', {recursive: true}); // Delete directory
```

### Cross-Platform Filesystem Issues
- **Case sensitivity**: Windows (insensitive), Linux/Mac (sensitive)
- **Unicode normalization**: NFC vs NFD
- **Best practice**: Always normalize for comparison: `str.normalize('NFC')`

---

## 3. Asynchronous Programming

### Callbacks (Traditional Pattern)
```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```
- **Error-first callbacks**: First parameter is always error
- **Problem**: Callback hell (nested callbacks)

### Promises (Modern Approach)
```javascript
const fsPromises = require('fs').promises;

fsPromises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log('Done'));
```

**States**: Pending → Fulfilled/Rejected → Settled

**Advanced Methods**:
- `Promise.all([p1, p2])` - Wait for all (fails if any fails)
- `Promise.race([p1, p2])` - First to finish wins
- `Promise.allSettled([p1, p2])` - Wait for all (never rejects)
- `Promise.any([p1, p2])` - First success wins

### Async/Await (Cleanest Syntax)
```javascript
async function readData() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### Timers
- `setTimeout(fn, ms)` - Run once after delay
- `setInterval(fn, ms)` - Run repeatedly
- `setImmediate(fn)` - Run in next event loop iteration
- `process.nextTick(fn)` - Run immediately after current operation (highest priority)

### Event Loop & Non-Blocking
**Event Loop Phases**:
1. Timers → Pending callbacks → Poll → Check → Close callbacks

**Priority Order**:
```
process.nextTick() (highest)
  ↓
Microtasks (Promises)
  ↓
setImmediate()
  ↓
setTimeout()
```

**Key Principle**: Never block the event loop!
- Use async methods, not sync (`*Sync`)
- Avoid complex regex (ReDoS attacks)
- Partition heavy computations
- Offload to Worker Threads when needed

### Event Emitter
```javascript
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();
emitter.on('event', (arg) => console.log(arg));
emitter.emit('event', 'Hello!');
```

---

## 4. Modules & Streams

### Module Systems

**CommonJS (Traditional)**:
```javascript
// Export
module.exports = { hello: () => 'Hello' };

// Import
const myModule = require('./myModule');
```

**ES Modules (Modern)**:
```javascript
// Export
export function hello() { return 'Hello'; }
export default subtract;

// Import
import { hello } from './myModule.mjs';
import subtract from './myModule.mjs';
```

### Streams (Efficient Data Processing)

**4 Types**:
1. **Readable** - Source of data (read from)
2. **Writable** - Destination (write to)
3. **Duplex** - Both readable and writable
4. **Transform** - Modify data as it passes through

**Basic Usage**:
```javascript
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

// Pipe (automatic backpressure handling)
readStream.pipe(writeStream);

// Or use pipeline (better error handling)
const { pipeline } = require('stream');
pipeline(readStream, writeStream, (err) => {
  if (err) console.error(err);
});
```

**Backpressure**: Prevents memory overflow when producer is faster than consumer
- `write()` returns `false` when buffer is full
- Listen to `'drain'` event to resume
- `pipe()` handles this automatically

**Object Mode**: Stream JavaScript objects instead of buffers
```javascript
const stream = new Transform({
  objectMode: true,
  transform(obj, encoding, callback) {
    this.push({ ...obj, processed: true });
    callback();
  }
});
```

### Publishing Packages

**package.json essentials**:
```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "./index.js",
  "exports": {
    ".": {
      "require": "./index.cjs",
      "import": "./index.mjs"
    }
  },
  "type": "module",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**For CLI tools** (npx-ready):
```json
{
  "bin": {
    "my-tool": "./cli.js"
  }
}
```

**ABI Stability (Node-API)**:
- Native addons work across Node.js versions without recompilation
- Forward-compatible binary interface

---

## 5. Diagnostics & Debugging

### Memory Issues

**Symptoms**:
- Out of Memory (OOM) crashes
- Growing heap usage
- Slow performance

**Tools**:
- **Heap Snapshot**: `node --inspect` + Chrome DevTools
- **Heap Profiler**: Track allocations over time
- **GC Traces**: `node --trace-gc script.js`

### CPU Performance

**Profiling Methods**:
```bash
# V8 Sampling Profiler
node --prof script.js
node --prof-process isolate-*.log > profile.txt

# Flame Graphs (with perf on Linux)
perf record -F 99 -p PID -g
perf script > out.perf
```

**Tools**:
- `0x` - Auto flame graph generator
- Chrome DevTools Performance tab

### Live Debugging
```bash
# Start with inspector
node --inspect script.js

# Or break at start
node --inspect-brk script.js

# Connect via chrome://inspect
```

**Features**:
- Set breakpoints
- Step through code
- Inspect variables
- Evaluate expressions in console

### Common Performance Issues
- **Blocking sync operations**: Use async alternatives
- **ReDoS**: Avoid complex regex on user input
- **JSON DOS**: Limit JSON payload size
- **Heavy computation**: Partition or use Worker Threads

---

## 6. Testing

### Built-in Test Runner (Node.js v18+)

**Basic Structure**:
```javascript
const { test, describe } = require('node:test');
const assert = require('node:assert');

describe('Math functions', () => {
  test('adds numbers', () => {
    assert.strictEqual(2 + 2, 4);
  });
  
  test('async operation', async () => {
    const result = await fetchData();
    assert.strictEqual(result.status, 'ok');
  });
});
```

**Run tests**:
```bash
node --test                    # Run all tests
node --test tests/myfile.test.js  # Run specific file
node --test --watch             # Watch mode
```

### Common Assertions
```javascript
assert.strictEqual(actual, expected);        // ===
assert.deepStrictEqual(obj1, obj2);          // Deep equality
assert.ok(value);                            // Truthy
assert.throws(() => fn());                   // Should throw
assert.rejects(async () => await fn());      // Should reject
```

### Hooks (Setup/Teardown)
```javascript
describe('suite', () => {
  before(() => { /* runs once before all tests */ });
  after(() => { /* runs once after all tests */ });
  beforeEach(() => { /* runs before each test */ });
  afterEach(() => { /* runs after each test */ });
});
```

### Mocking
```javascript
const { mock } = require('node:test');

// Mock function
const fn = mock.fn(() => 42);
fn();
assert.strictEqual(fn.mock.calls.length, 1);

// Mock timers
mock.timers.enable();
mock.timers.tick(1000);  // Advance 1 second
```

### Code Coverage
```bash
node --test --experimental-test-coverage

# With thresholds
node --test --experimental-test-coverage \
  --test-coverage-lines=90
```

---

## 7. NPX & Package Management

### What is npx?
- Executes npm packages **without permanent installation**
- Perfect for one-time commands
- Always uses latest version (if specified)
- Packages cached but not added to dependencies

### Common Usage
```bash
# Run package directly
npx cowsay "Hello"

# Specific version
npx typescript@4.9.0 --version

# Create new projects
npx create-react-app my-app
npx create-next-app my-next-app

# Run local tools
npx eslint .
npx prettier --write .

# Skip installation prompt
npx -y http-server
```

### Creating npx-Ready Packages

**1. Add shebang to script**:
```javascript
#!/usr/bin/env node
console.log('Hello from CLI!');
```

**2. Configure package.json**:
```json
{
  "name": "my-cli-tool",
  "version": "1.0.0",
  "bin": {
    "my-tool": "./cli.js"
  }
}
```

**3. Make executable**:
```bash
chmod +x cli.js
```

**4. Publish**:
```bash
npm publish
```

**5. Use**:
```bash
npx my-cli-tool
```

---

## 🎯 Key Takeaways

### Essential Principles

1. **Async by Default**: Always prefer async methods over sync
2. **Never Block**: Don't block the event loop or worker pool
3. **Streams for Large Data**: Use streams instead of loading entire files
4. **Error-First Callbacks**: Always handle errors as first parameter
5. **Promises > Callbacks**: Use async/await for cleaner code

### Best Practices

**File Operations**:
```javascript
// ❌ Bad - Blocks event loop
const data = fs.readFileSync('large-file.txt');

// ✅ Good - Non-blocking
const data = await fsPromises.readFile('large-file.txt');

// ✅ Better - For very large files
const stream = fs.createReadStream('huge-file.txt');
```

**Error Handling**:
```javascript
// ❌ Bad - Unhandled rejection
async function badCode() {
  const data = await fetchData(); // No try-catch!
}

// ✅ Good - Proper error handling
async function goodCode() {
  try {
    const data = await fetchData();
    return data;
  } catch (err) {
    console.error('Failed:', err);
    throw err;
  }
}
```

**Module Organization**:
```javascript
// ✅ Use ES Modules when possible
import { readFile } from 'fs/promises';

// ✅ Or CommonJS for compatibility
const { readFile } = require('fs').promises;
```

### Common Patterns

**1. Async Flow Control**:
```javascript
// Serial (one after another)
const result1 = await task1();
const result2 = await task2(result1);

// Parallel (all at once)
const [r1, r2, r3] = await Promise.all([task1(), task2(), task3()]);

// Limited concurrency
async function runInBatches(tasks, limit) {
  const results = [];
  for (let i = 0; i < tasks.length; i += limit) {
    const batch = tasks.slice(i, i + limit);
    results.push(...await Promise.all(batch.map(t => t())));
  }
  return results;
}
```

**2. Stream Pipeline**:
```javascript
const { pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');

pipeline(
  createReadStream('input.txt'),
  createGzip(),
  createWriteStream('input.txt.gz'),
  (err) => {
    if (err) console.error('Pipeline failed:', err);
    else console.log('Pipeline succeeded');
  }
);
```

**3. Event Emitter Pattern**:
```javascript
class DataProcessor extends EventEmitter {
  async process(data) {
    this.emit('start', data.length);
    try {
      const result = await heavyOperation(data);
      this.emit('complete', result);
      return result;
    } catch (err) {
      this.emit('error', err);
      throw err;
    }
  }
}
```

---

## 📖 Learning Resources Created

### Notes (38 files)
1. Command Line: Running scripts, REPL, console output, env variables
2. HTTP: Transactions, enterprise network config
3. File System: Stats, paths, reading, writing, descriptors, folders, cross-platform
4. Async: Callbacks, flow control, promises, timers, blocking, event loop, emitters
5. Modules: Streams, backpressure, publishing, Node-API, ABI stability
6. Diagnostics: User journey, memory, debugging, performance, flame graphs
7. Testing: Introduction, test runner, mocking, coverage
8. NPX: Complete guide with examples

### Examples (24 files)
- Basic examples: executable script, streams, file descriptors, Unicode, env files
- Async examples: blocking vs non-blocking, event loop order, event emitter, promises, partitioning
- Module examples: CommonJS, ESM, readable/writable/transform streams, pipe, backpressure, object mode
- Diagnostic examples: memory leak simulator, CPU profiling, live debugging, performance monitoring
- NPX: CLI demo tool, practical examples

### Tests (2 files)
- `basic.test.js`: Comprehensive tutorial on testing fundamentals
- `README.md`: Testing guide for beginners

---

## 🚀 Next Steps

1. **Practice**: Run all the examples in the `examples/` folder
2. **Test**: Try the test files and write your own tests
3. **Build**: Create a small Node.js CLI tool or API
4. **Explore**: Dive into frameworks (Express, Fastify, NestJS)
5. **Deploy**: Learn about production deployment and monitoring

---

**Congratulations!** You've covered all fundamental Node.js concepts. You're now ready to build production-ready applications! 🎉


