[
# Callbacks and Closures

### Private variables with closures
```js
const makeCounter = () => {
  // this variable can only be accessed within this scope
  let counter = 0

  // these functions are within this scope
  // therefore, they both have access to *counter*
  const up = () => ++counter
  const down = () => --counter

  // we return an object with the 2 functions as keys
  // so when we call these functions in the outside world
  // they will still have access to that counter
  // but nothing else can access it anymore
  return {
    up: up,
    down: down
  }
}

// we create 2 different counters
const counterA = makeCounter()
const counterB = makeCounter()

counterA.up()
// 1

counterB.up()
// 1

// each counter object has its own counter variable
// so they can go up and down independently of each other
// and because the counters are private
// nobody can come in and mutate them, so they are safe
```

### Function Composition
* Using the return values of functions as arguments to other functions

  ```js
  // Composition taking the form f(g(x)); uses return value of g(x) as the argument

  function decimalToPercent(decimal) {
    return decimal * 100.0;
  }

  // y = g(x)
  // f(y)
  let returnValue = decimalToPercent(0.5);
  console.log(returnValue); // => 50

  //Same thing, with more composition: f(g(x))
  console.log(decimalToPercent(0.5)); // => 50
  ```

* Passing a function as a callback to another function

  ```js
  //Composition taking the form f(g)(x); uses g itself as the argument

  function multiplyThenDo(num1, num2, callback) {
    let product = num1 * num2;
    return callback(product);
  }

  function addFive(num) {
    return num + 5;
  }

  function square(num) {
    return num * num;
  }

  multiplyThenDo(2, 3, addFive); // => 11
  multiplyThenDo(2, 3, square); // => 36
  multiplyThenDo(2, 3, console.log); // => Logs "6"

  //Take as many callbacks as needed

  function doThisThenDoThatToFive(callback1, callback2) {
    let result = callback1(5);
    return callback2(result);
  }

  doThisThenDoThatToFive(addFive, square) // => 100
  doThisThenDoThatToFive(square, addFive) // => 30

  ```

### Callbacks in Iterators
Students should be familiar with the differences between the iterators through their experience with Ruby, but feel free to remind the students of these.

* Iterators such as `.map`, `.forEach`, `.filter`, and `.find` are the most common use-cases for callbacks.

  ```js

  const people = ["Laura", "Natalie", "Matt"];
  const numbers = [78, 49, 32, 45];

  function sayIt(element) {
    console.log(element);
  }

  people.forEach(sayIt); // => Logs "Laura", "Natalie", and "Matt"
  numbers.forEach(sayIt); // => Logs "78", "49", "32", and "45"

  function yellIt(element) {
    return element + "!";
  }

  people.map(yellIt); // => ["Laura!", "Natalie!", "Matt!"]
  numbers.map(yellIt); // => ["78!", "49!", "32!", "45!"]

  //Writing inline anonymous functions. It might be useful to remind them of the differences in arrow function syntax

  people.forEach(name => console.log(`My name is ${name}`)); // => Logs "My name is Laura", "My name is Natalie", and "My name is Matt"
  numbers.map(num => num + 10); // => [88, 59, 42, 55]

  ```
* All iterators can pass up to three arguments: the element, the index of that element, and the original array

  ```js
  const theBox = ["Laura", "Natalie", "Matt"];

  function whatsInTheBox(element, index, array) {
    console.log(`${index+1}. ${element}`);
    console.log(array);
  }

  theBox.forEach(whatsInTheBox); // => Logs "1. Laura" and "["Laura", "Natalie", "Matt"]"; Logs "2. Natalie" and "["Laura", "Natalie", "Matt"]"; Logs "3. Matt" and "["Laura", "Natalie", "Matt"]"

  ```

### Higher Order Functions
It is useful to explain that students have already been exposed to higher order functions: any function that **takes** and/or **returns** a function (callback) as an argument is a HOF. This means that `.map`, `.forEach`, etc., as well as functions written in the first portion of the lecture were HOFs.

* Higher order function that takes a callback

  ```js
  //Higher order function;
  function withFormatting(sentence, format) {
    return format(sentence);
  }

  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1, string.length);
  }

  function camelCase(string) {
    const words = [];

    string.split(" ").forEach((word, index) => {
      if (index !== 0) {
        words.push(capitalize(word));
      } else {
        words.push(word);
      }
    })
    return words.join("");
  }

  withFormatting("is that a camel?", capitalize); // => "Is that a camel?"
  withFormatting("no this is a camel", camelCase); // => "noThisIsACamel"

  ```

* Higher order function that returns a function

  ```js
  function generateECardMaker(greeting) {
    return function(person) {
      return `${person} would like to tell you ${greeting}`;
    }
  }

  let sayHey = generateECardMaker("Hey");
  let sayMerryChristmas = generateECardMaker("Merry Christmas");
  let sayYouSmell = generateECardMaker("You smell");

  sayHey("Laura"); //=> "Laura would like to tell you Hey"
  sayHey("Ashlee"); // => "Ashlee would like to tell you Hey"
  sayMerryChristmas("Laura"); // => "Laura would like to tell you Merry Christmas
  sayYouSmell("Laura"); // => "Laura would like to tell you You smell"

  ```

* Higher order function that takes a callback **and** returns a function

  ```js
  function formatMultiplication(format) {
    return function(num1, num2) {
      return format(num1 * num2);
    }
  }

  function report(value) {
    return `Your new number is ${value}`;
  }

  function disappointed(value) {
    return `Oh no...it looks your number is ${value}...`
  }

  const disappointedMultiplication = formatMultiplication(disappointed);

  disappointedMultiplication(4, 5); // => "Oh no...it looks your number is 20..."
  disappointedMultiplication(7, 2); // => "Oh no...it looks your number is 14..."

  const reportMultiplication = formatMultiplication(report);
  reportMultiplication(4, 5); // => "Your new number is 20"
  reportMultiplication(7, 2); // => "Your new number is 14"


  //Ask them to explain granularly what happens in the following code:
  formatMultiplication(disappointed)(4, 5) // =>  "Oh no...it looks your number is 20..."

  ```

**Group Exercise** ~10m

This is a great opportunity to test their understanding of higher order functions by having them build a custom iterator using a `.for` loop. `.map` should look like the following:

  ```js
    function customMap(array, callback) {
      let final = [];
      for (let index = 0; index < array.length; index++) {
        final.push(callback(array[index], index, array))
      }
      return final;
    }
  ```

### Private Variables Using Closures
A closure is a higher order component that makes use of the lexical environment to contain values in memory. The above examples are all closures - begin this part of lecture with asking the students which values are contained in memory in the previous example. (`format` retains its value)

  ```js
  function generateCounter() {
    let counter = 0;
    console.log(`Initializing counter at ${counter}`)
    return function() {
      console.log(++counter);
    }
  }

  //Call function to generate a counter function
  let counterOne = generateCounter(); //=> Logs "Initializing counter at 0"

  //Call function; explain that the value of `counter` is modified when calling `counterOne` because `counterOne` sees the same point in memory for `counter` every time it is called
  counterOne(); // => Logs "1"
  counterOne(); // => Logs "2"
  counterOne(); // => Logs "3"
  counterOne(); // => Logs "4"

  //Create another instance of a counter
  let counterTwo = generateCounter(); // => Logs "Initializing counter at 0"

  //A fresh count is started; this instance of a counter sees a different `count` which refers to a different point in memory than the `count` in `counterOne`
  counterTwo(); // => Logs "1"
  counterTwo(); // => Logs "2"

  //`counter` in `counterOne` is unchanged
  counterOne(); // => Logs "5"
  ```

It may be useful to call `counter` to show them how its value is inaccessible outside of the function due to scope. `counter` has effectively become a private variable that is only modifiable by calling the generated counter function.

* Using an IIFE

  ```js
  let counterFunc = (function() {
    let counter = 0;
    console.log(`Initializing counter at ${counter}`);
    return function() {
      console.log(++counter);
    }
  })() // => Logs "Initializing counter at 0"

  counterFunc() // => Logs "1"

  //Ask students to explain this code.
  //What are the pros and cons of using this syntax?
  ```

### Currying with Closures
The act of currying is to break one function that takes a number of parameters into more functions that take fewer parameters. Students have already seen examples of this above. The point of this part of the lecture is to clarify the term and provide them with some use-cases.

  ```js
  function multiply(num1, num2) {
    return num1 * num2;
  }

  multiply(3, 4); // => 12

  function curriedMultiply(num1) {
    return function(num2) {
      return num1 * num2;
    }
  }

  triple = curriedMultiply(3);
  triple(4); // => 12
  ```

### Preview of OO
The following serves as a wrap up discussion about this lecture, as well as a transition into OO concepts in JS.

Consider the following example:

  ```js
  function robotFactory() {
    let count = 0;
    let all = [];

    return function(name, purpose) {
      count++;

      let robot = { name, purpose, id: count++ };
      all.push(robot);

      console.log("Your list of robots: ", all);
      return robot;
    }
  }

  const factory = robotFactory();
  const x29 = factory("x29", "combat"); // => Logs "Your list of robots: [{name: "x29", purpose: "combat", id: 1}]", returns undefined
  const p3x54 = factory("p3x54", "industrial"); // => Logs "Your list of robots: [{name: "x29", purpose: "combat", id: 1}, {name: "p3x54", purpose: "industrial", id: 3}]", returns undefined
  ```
](# Functional JS

### Functions are First Class Objects
  * They are objects
  * Can do anything you can do with other objects
  * Store in variables
  * Pass as arguments to other functions
  * Return from functions
  * Arrow Function

### Introduction to Callbacks
  * Compare to Ruby blocks
  * inline anonymous vs. named functions

    ```js
    function doThis(callback) {
      callback();
    }

    doThis(function() { console.log("Beef"); })

    function beefy() {
      console.log("Steak");
    }
    doThis(beefy); // => Logs "Steak", returns undefined
    ```

  * .map, .filter, .forEach as native functions that take callbacks

    ```js
    let arr = [1, 2, 3, 4, 5];
    function callback(num) { console.log(num); }
    arr.forEach(callback) // => Logs 1 2 3 4 5
    ```

### Introduction to Closures
  * Functions that draw a bubble around everything that's in scope at the time of their definition
  * Can be used to create 'private' variables
  * Can be used to curry (don't go too in depth on this concept)

  * First Class Functions
    * Reference vs. Execution

      ```js
      function definition() { return "Hey!" }
      let reference = definition;
      console.log(reference); // => f definition()
      console.log(reference()); // => "Hey!"
      ```

    * Higher-order functions
      * Functions that

        **A.)** accept other functions as arguments

          ```js
          // Higher Order Function
          function higherOrder(callback) {
            console.log('From Inside of Higher Order');
            callback();
          }

          // Callback
          function logHello() {
            console.log('Hello');
          }

          // Passing callback into higher-order function
          higherOrder(logHello)
          ```

        **B.)** and/or return a function

          ```js
          //Outer
           function multiplyBy(multiplier) {
              //Inner
             return function(num) {
               return multiplier * num;
             }
           }
           //Calling it once to return function, again to execute inner
           multiplyBy(3)(2); // => 6
           ```

   * Storage Within Data Structures

      ```js
      function funky() { console.log("Funky"); }
      function beefy() { console.log("Beefy"); }

      let array = [];

      array.push(funky);
      array.push(beefy);

      array[0](); // => "Funky"
      array[1](); // => "Beefy"

      let obj = {};

      obj.cool = funky;
      obj.steak = beefy;

      obj.cool(); // => "Funky"
      obj.steak(); // => "Beefy"
      ```

### Functional Programming Paradigms
* **Declarative** versus **imperative**
  * Imperative (procedural)
    * _How_ to do some operation
    * Based on statements such as `if`, `for`, and/or `switch`
  * Declarative
    * _What_ operations to do
    * Based on expressions which resolve to a value
* **Pure functions**
  * Given the same inputs, the function will always return the same output
  * Has no **side-effects**, meaning it doesn't change anything in the program
      * Modifying any external variable or object property
      * Logging to the console
      * Writing to the screen
      * Writing to a file
      * Writing to the network
      * Triggering any external process
      * Calling any other functions with side-effects
  * Avoid **shared state**
      * Don't use variables/data from outside of the function
  * Avoid **mutating state**
      * Creating new objects: `Object.assign`
      * Shallow immutability: `Object.freeze`
  * References
      * [Quick Read - Medium](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c)
      * [In depth read - Medium](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)

* **Higher-order functions** and reusability
  * Abstract or isolate actions, effects, or async flow control using callback functions, promises
  * Create utilities which can act on a wide variety of data types (think functional library)
  * **Partial application** of a function to its arguments or create a **curry**-able function for the purpose of reuse or function composition
  * Take a list of functions and return some composition of those input functions
  * References
      * [Simple Explanation of Higher Order Functions - Quora](https://www.quora.com/What-is-a-simple-explanation-of-higher-order-functions-and-callbacks-in-JavaScript)
      * [Eloquent JavaScript HOF - ebook](http://eloquentjavascript.net/05_higher_order.html)
      * [Sitepoint](https://www.sitepoint.com/higher-order-functions-javascript/)
      * [Currying and Partial Application](https://medium.com/wdstack/javascript-function-composition-currying-and-partial-application-5a04107530ee)

* Function **composition**
  * Combine two or more functions to perform some computation
      * `f(g(x))`
  * Combine two or more functions to produce a new function
      * `f(g)(x) === f(g(x))`
  * References
      * [Composition](http://blog.ricardofilipe.com/post/javascript-composition-for-dummies)

* Memoization
  * [Memoization - Good article](https://addyosmani.com/blog/faster-javascript-memoization/)
* Anonymous Functions
* Recursion

* Array methods `.forEach`, `.map`, `.filter`, `.reduce`

* Examples

  ```js
  // forEach passing function definition
  let arr = [1, 2, 3, 4, 5];
  arr.forEach(num => console.log(num);)
  // => 1
  // => 2
  // => 3
  // => 4
  // => 5

  // forEach passing function by reference
  arr.forEach(console.log);
  // => 1 0 (5) [1, 2, 3, 4, 5]
  // => 2 1 (5) [1, 2, 3, 4, 5]
  // => 3 2 (5) [1, 2, 3, 4, 5]
  // => 4 3 (5) [1, 2, 3, 4, 5]
  // => 5 4 (5) [1, 2, 3, 4, 5]

  // map passing function definition
  let numsTimesThree = arr.map(num => num * 3);
  numsTimesThree; // => [3, 6, 9, 12, 15]

  // filter passing function definition
  let numsLessThanTen = numsTimesThree.filter(num => num < 10);
  numsLessThanTen; // => [3, 6, 9]

  // reduce passing function definition
  let sum = numsLessThanTen.reduce((acc, val, ind) => acc + val);
  sum; // => 18

  // All of the above chained together
  arr.map(num => num * 3)
  .filter(num => num < 10)
  .reduce((acc, val, ind) => acc + val)
  // => 18
  ```
  )