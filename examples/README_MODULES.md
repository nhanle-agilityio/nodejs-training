# Modules Examples

Examples demonstrating concepts related to Node.js Modules and Streams.

## How to run

Run each script using `node` from the root directory.

### 17. CommonJS Basics

Shows the traditional Node.js module system using `require()` and `module.exports`.

```bash
node examples/17-commonjs-basic.js
```

### 18. ES Modules (ESM) Basics

Demonstrates modern JavaScript modules using `import` and `export`.

```bash
node examples/18-esm-basic.mjs
```

### 19. Simple Readable Stream

Creates a basic Readable stream that produces data.

```bash
node examples/19-readable-stream.js
```

### 20. Simple Writable Stream

Creates a basic Writable stream that consumes data.

```bash
node examples/20-writable-stream.js
```

### 21. Simple Transform Stream

Shows how to transform data as it passes through a stream.

```bash
node examples/21-transform-stream.js
```

### 11. Streams Pipe

Basic example of copying data from one file to another using `.pipe()`.

```bash
node examples/11-streams-pipe.js
```

### 12. Backpressure

Demonstrates how streams handle speed mismatch between a fast producer and a slow consumer.

```bash
node examples/12-streams-backpressure.js
```

### 13. Streams Object Mode

Shows how to stream JavaScript objects (instead of just binary data) through a pipeline.

```bash
node examples/13-streams-object-mode.js
```
