# Asynchronous Work Examples

This folder contains typical examples illustrating Node.js asynchronous concepts.

## How to run

Run each script using `node` from the root directory.

### 1. Blocking vs Non-Blocking

Shows how synchronous file reading stops execution vs asynchronous reading.

```bash
node examples/06-blocking-vs-nonblocking.js
```

### 2. Event Loop Execution Order

Demonstrates the priority of `process.nextTick`, Promises, `setTimeout`, and `setImmediate`.

```bash
node examples/07-event-loop-order.js
```

### 3. Event Emitter

Shows how to create a custom class that emits events (Publisher/Subscriber pattern).

```bash
node examples/08-event-emitter.js
```

### 4. Promises & Flow Control

Demonstrates `Promise.all`, `Promise.race`, and `Promise.allSettled` for managing multiple async tasks.

```bash
node examples/09-promises-flow.js
```

### 5. Avoiding Event Loop Blocking (Partitioning)

Shows how to break a heavy CPU task into small chunks using `setImmediate` so the server doesn't freeze.

```bash
node examples/10-partitioning-heavy-task.js
```
