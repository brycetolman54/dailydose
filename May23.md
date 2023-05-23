# JavaScript
## Promises
```
new Promise(() => {})
# The function you put in is what the promise will do

Promise {<pending>}
  [[Prototype]]: Promise
  [[PromiseState]]: "pending"
  [[PromiseResult]]: undefined
# The state is pending, undefined is the return value of the function
```
- Three states possible:
  - pending: it is running asynchronously
  - fulfilled: the code finished sucessfully
  - rejected: the code failed to complete
```
function callback(resolve, reject) {
  resolve('done');
}
# callback can take 0-2 parameters, what to do in success and in failure

const p = new Promise(callback);
p.then((result) => console.log(result));
# The then function takes a callback function that is run when the promise resolves (resolve [first] or reject [second])
# The result of the callback function from above (the return value) is the value of 'result' in the then function
# The 'then' fucntion can take two parameters, two functions: one for success (first) and one for failure (second)

.then(function) returns a promise
.catch(function) handles the error or reject in any case
.finally(function) is always called at the end
```

## Async/Await
- This is the same thing as promise, but we wrap it with keywords that make it more pretty in the JS
```
try {
  const result = await tossCoin;
  console.log(`Toss result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log('Toss completed');
}

async function cow() {
  return 'moo';
}
# output would be Promise{<fulfilled>: 'moo'}
# It creates a promise for you even if you didn't create and return one

async function cow() {
  return new Promise ((resolve) => {
    resolve('moo')
  });
}
console.log(await cow());
# the output would be 'moo' now since you have put the await there, if you put the await on the previous example, it would also output 'moo'
```
- You can only use await on a function that you have declared async


