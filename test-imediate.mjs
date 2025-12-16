const baz = () => console.log("baz (setImmediate)");
const foo = () => console.log("foo (nextTick)");
const zoo = () => console.log("zoo (nextTick trong promise)");

const start = () => {
  console.log("start");

  setImmediate(baz); // Macrotask

  new Promise((resolve) => {
    resolve("bar (promise)");
  }).then((res) => {
    console.log(res); // Microtask
    process.nextTick(zoo); // Thêm nextTick mới từ Microtask
  });

  process.nextTick(foo); // nextTick
};

start();
