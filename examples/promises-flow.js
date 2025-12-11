/**
 * This example shows how to use Promise.all and Promise.race
 * for handling parallel asynchronous tasks.
 */

// Helper to simulate a delay
const delay = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

// Helper to simulate failure
const delayFail = (ms, reason) => new Promise((_, reject) => setTimeout(() => reject(reason), ms));

async function runPromiseExamples() {
  console.log('--- Promise.all (Wait for all) ---');
  try {
    const start = Date.now();
    const results = await Promise.all([
      delay(3000, 'User Data'),
      delay(2000, 'Posts Data'),
      delay(500, 'Settings')
    ]);
    const time = Date.now() - start;
    console.log(`Fetched all in ${time}ms:`, results);
  } catch (err) {
    console.error('One failed:', err);
  }

  console.log('\n--- Promise.race (First one wins) ---');
  try {
    const start = Date.now();
    const winner = await Promise.race([
      delay(3000, 'Slow Response'),
      delay(500, 'Fast Response') // This will win
    ]);
    const time = Date.now() - start;
    console.log(`Winner: ${winner} in ${time}ms`);
  } catch (err) {
    console.error('Race failed:', err);
  }
  
  console.log('\n--- Promise.allSettled (Wait for all, ignore failures) ---');
  const results = await Promise.allSettled([
    delay(3000, 'Success 1'),
    delay(1000, 'Success 2'),
    delayFail(500, 'Network Error')
  ]);
  console.log(results);
}

runPromiseExamples();
