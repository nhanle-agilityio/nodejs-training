/**
 * This example demonstrates the "Event Emitter" pattern.
 */

const EventEmitter = require('events');

// Custom Emitter Class
class MyStream extends EventEmitter {
  startStream() {
    console.log('Stream starting...');
    
    // Emit events periodically
    let count = 0;
    const interval = setInterval(() => {
      count++;
      this.emit('data', `Chunk ${count}`, new Date(), 'Hello World');
      
      if (count === 3) {
        clearInterval(interval);
        this.emit('end');
      }
    }, 500);
  }
}

const myStream = new MyStream();

// 1. Listen for 'data' events
myStream.on('data', (chunk, timestamp, message) => {
  console.log(`Received: ${chunk} at ${timestamp.toISOString()} with message: ${message}`);
});

// 2. Listen for 'end' event
myStream.once('end', () => {
  console.log('Stream finished!');
});

// Start the process
myStream.startStream();
