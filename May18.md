# More JavaScript

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
- 
