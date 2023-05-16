# JavaScript
- You comment with //

| cmd | output |
| :---: | :---: |
| console.log() | prints something to the screen |
| forEach | operates on arrays, goes through each item in the array and does whatever is in the function |
| let | assign a dynamic variable |
| const | assign a constant variable |
| return | returns a value from a function |
| debugger | hard coded break point for your code |
| typeof x | gives the type of a variable |

## Types:
- It is weakly typed, you can do reassignments easily
- Reassignments:
  - declare: let x = fish (string)
  - reassign: x = 1 (int)

| type | how to declare it |
| :---: | :---: |
| string | 'string' |
| int | 3 |
| array | [1,2,3] |
| object (key value pairs) | {v: 2, z: 'fish'} |
| null (no value) | null |
| undefined (no type) | undefined |

- With an object: 
  - x.lee = why --> adds an item to the object
  - x.v --> gives the value
  - x.v = 5 --> reassigns the value

## Automatic conversions 
- JavaScript will automatically reassign type for computations

| Examples | Output |
| :---: | :---: |
| 'rat'+[' fink'] | rat fink |
| 1 + 'rat' | 1rat |
| 1 * 'rat' | NaN |
| [2] + [3] | 23 |
| true + null | 1 |
| true + undefined | NaN |

## Equality
- === is strict equality, always use it
- == is loose equality, it will do type conversions

| Examples | Output |
| :---: | :---: |
| 0 === false | false |
| '' === false | false |
|'' === 0 | false |
| '0' === 0 | false |
| '0' == 0 | true |

## Variables
- `let` means it can change
- `const` means it can't
- `var` is deprecated, we don't care about it

## Conditionals
- truthy: everything that is not falsey
- falsy: 0, -1, '', NaN, null, undefined
- You also have `for` statements like in C++
- You can do `while` loops as well
- `break` is a thing as well
- `switch` statements are there too

## Functions!!!
```
# This is an anonymous function, given to variable f, we can reassign that f function 
let f = function (i) {
  return i;
};
# This is a function that has a name
function func(i) {
  return i;
};
# this next one has an optional parameter
# the function returns undefined if a value is not defined
f = function (a, b, c='rat') {
  return a + b + c;
};

```

## Arrow Functions
- Called this because it uses `=>`
```
const arrow = (a) => 1;
# output is 1, whatever the value you set after the arrow

const arrowWithBlock = (a) => {
  a;
}; 
# output is undefined, you need a return if you have {}

const arrowWithReturn = (a) +=> {
  return a;
};
# output is a, you get whatever the return value is
```

## Closures
- This is a function and its surrounding state
- You can create super functions, so you can make a function that returns a function. Just see...
```
function dup(i, sep =':') {
  let dupLimit = i;
  
  return (t) => {
    let dupCount = dupLimit;
    out = t;
    while (dupCount-- > 1) {
      out += sep + t;
    }
    return out;
  };
};

const duplicate4 = dup(4);
console.log(dupicate4('hello');
# output is hello:hello:hello:hello
console.log(dup(3)('again'));
# output is again:again:again
```

## Strings
| Function | What it does |
| :---: | :---: |
| toUpperCase | makes it all uppercase |
| toLowerCase | makes it all lowercase |

## Regex
- You can make a regularexpression with `new RegExp('string', 'i')` where i is an option
- Or `literalRegex = /cat?/i`
- You can use `match` to find matches, `replace` to replace that regex or `test(text)` to match a specific text

## Arrays
- Declare with `[]`
- Push with `.push(i)`
- Pop off with `.pop()`
- You can use `length` as well
- You can use `slice(2,5)` to get a subset
- `map((n) => operation)` to map each component of the array to a new array
- `reduce((p,c) => p + c)`, p is the past value, c is the cumulator, it just adds up the whole array
- `filter((n) => operation)`, if the operation returns true, we get rid of the value in the array
- `some((n) => operation)`, if one of the elements returns true from the operation, the return of the function is true
- `join(string)` will join the array with the string you provide between each value
- 

## Template Literals
` console.log(\`Template ${'lite' + 'rals'}! ${hello(name)}\`)`
- This will evaluate the stuff in the ${} and then put it in the string, you just have to use the \` symbol on both sides

## Special Operators
- nullish: `y &&= 30`, if y does not have a value, it is assigned a value

## Objects
- The first value also has to be string
- You can do something like `for(const property _in_ obj) {do something}`

## Spread
```
let input = [1, 2, 3];
input = [...input, 4, 5, 6]; --> The ... spreads out the input into the new array
console.log(input);
# output is [1, 2, 3, 4, 5, 6]
```
- You can do this with objects or arrays

## Rest
- This is also just ..., but you put it on a parameter of a function
```
const sumAndMultiply = (multiplier, ...numbers) => {
  console.log(numbers);
  return numbers.reduce((a,n) => a + multiplier * n);
};
```
- The ... just means the rest of the numbers are going to be passed into a function called numbers

## Object Operations

## Optional Chain

## Iterators and Generators

## Destructuring Arrays
a = [1,2]
x = a --> this just makes x equal to a
[x] = a --> this just makes x equal to the first of a
[x,y] = a --> this makes x the first of a and y the second
[x,y,z] = a --> same as above, z is undefined
[x,y,z=100] = a --> just makes z 100 since it would be undefined
[x,y,...z] = [1,2,3,4,5,6,7] --> This gives the rest after the first two to z

## Destructuring Parameters
```
function af([a=3, b='taco'] = []) {
  console.log(a,b);
}
```
- [] is the default (if nothing is passed in)
- You only want the first two values

## Destructuring Return Values
- You can do `return [a, b, 'cat']` to get multiple values out of the function

## How to load JavaScript:
```
# Script file
<head>
  script src="index.js"></script>
</head>
# Script tag
<body>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>
# Script style (to activate a function for a specific element, or you can write a whole function here...)
<button onlcik="sayHello()">Say Hello</button>
```
