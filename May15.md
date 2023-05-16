# JavaScript

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
- `switch` statements aer there too

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
