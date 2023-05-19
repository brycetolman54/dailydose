# More JavaScript
- Add `'use strict';` at the top of your file for it to make sure that you can't do weird stuff

## Objects and Classes

### From my Reading
- You create an object with property-value pairs
  - The property has to be a string or symbol (not sure what symbol is)
- You can make a new object with the `new` operator: `const obj = new Object();`
- You can add properties to an object just by using it in an assignment: `obj.myThing = 3`, creates a `myThing` property
- You can reference properties with the dot operator or []
- You can make a new object also like this (called object-literal syntax):
```
const obj = {
  a: 3,
  b: 'fish',
};
```
- Here are some object functions:

| Function | Meaning |
| :---: | :---: |
| entries | returns an array of key value pairs (an array of arrays) |
| keys | returns an array of the keys |
| values | returns an array of the values |

- If a function returns an object, it is a constructor and can be invoked with `new`: `const p = new Person('Eich');
- You can also create functions as properties of the object that you can later call on: `p.log()' (where log is a property function declared in the object)
- The `this` pointer is a thing, in this case it refers to the object it is in
- A class is pretty much like an object, but you can reuse it rather than have it be a one off type thing
  - You declare it almost the same, but have to give a constructor and usually will give functions
  - Adding a # before a value of the class will make it private
- You define inheritance with `extends`: `class Employee extends Person {}` (where Person is the parent)
  - You can use the `super` keyword to access the functions of the parent (like the this keyword)

### From Class
- You declare a new variable with `const name = new obj(parameters)`, where const means you can't reassign the `name` a value, but you can change the object's properties still
- When you want to make a class with functions, you don't have to use the `function` keyword for them
- You should use `get` and `set` for those functions though in the classes

 ## JSON
 - You can use `JSON.stringify(obj)` to make an object into JSON file
 - You can use `JSON.parse(json)` to make a JSON file into an object
 - This is to send data around

## Compatibility
- Don't use var

## DOM: Document Object Model
- Your computer turns the HTML and CSS code into a tree
- The variable name for the DOM is `document`
- `document.querySelectorAll('el')` goes for all the el elements in the document
  - You can also do this on classes, ids, etc.
- You can use `querySelector('el')` to get the first element or id or whatever, not all of them
- You can use `.textContent` to get out the text or assign it if it is text
- You can use `.innerHTML` to inject HTML into your browser
  - You just find the id you want to change, then do `el.innerHTML = newHTML`
  -  You shouldn't use this at all... It's dangerous for security reasons, use the following:
- You can create an element with `document.createElement('el');`
- You can then put this into the document with `parentElement.appendChild(child)`
- Functions from DOM:

| Function | What it does |
| :---: | :---: |
| tagName | gives the element name |
| children | returns the children of an element |
| querySelectorAll | returns an array of all the elements that fit the selector it is passed |
| textContent | containts all the element's text |
| innerHTML | gives the HTML of the element in text form |
| createElement | creates a new element in the DOM |
| querySelector | finds only the first  (or only) instance of the selector given it |
| appendChild | allows you to add an element to the element you are using this on |
| removeChild | removes a child from a parent (you want to call this on the parent like `el.parentElement.removeChild(el)` |
| parentElement | gives the parent element of the element we are looking at |
| setAttribute | takes an attribute name and value, adds to a DOM element |
| hasAttribute | sees if an element has an attribute |
| getAttribute | gets the value of an attribute of the element operated on, given the attribute to look for |

- Injecting HTML into the DOM

## Events
- You can take in input and then do things when input is in
- Example: `<button onclick='console.log("hello")'>click me</button>` --> This will print "hello" to the console
- Example: `<button onclick='alert("hello")'>click me</button>` --> This will send an alert that says "hello"
- `.addEventListener('click', (event) => console.log('clicked'))` --> The `addEventListener` takes an event (click in this case) and does whatever the function says to do
- You can add the `defer` attribute to the `script` element so that the JS doesn't do anything until the whole document has been read

## Scope
- You can use `globalThis` to get to the `this` of the global scope when you are inside a different scope
- IF you are not in anything, `this` will point to the window itself
- IF you have a `this` pointer in your JS function (as you call it in the HTML element), it will point to that element

 ## Modules
 - You want to take code and encapsulate it somehow
 - You can use `export` and `import` to send functions between files
 ```
 # In hello.js
 export function hello() {
   console.log('hello');
 }
 
 # in index.js
 import {hello} from './hello.js'; --> that after import is actually destructuring, you are just grabbing the one function you want out of all of them that exist
 hello();
 # to get all the library
 import x from './hello.js';
 x.hello();
 ```
- If you are going to import modules, specify in the `script` element an attribute of `type="module"`

## Promises and Async
- JS can't run a long time, the program will pull off the thing that is taking a long time and do the rest while the long thing takes its time
- That is async
```
function demo() {
  console.log('Before timeout');

  setTimeout(() => {
    console.log('In timeout');
  }, 5000);

  console.log('After timeout');
}
  
  demo();
  console.log('Done');
  
  # output looks like: Berfore timeout, After timeout, Done, In timeout
```
- The `setTimeout()` takes a function to do and a time to do it after
- That line is done last because it takes the longest, so it is set aside while the rest goes until it is done
