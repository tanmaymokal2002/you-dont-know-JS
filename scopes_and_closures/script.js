//----------------------------------
/* --- What is Scope? --- */

// identify all the RHS and LHS lookups from below code:
/*
function foo(a) {
  var b = a;
  return a + b;
}
var c = foo(2);
*/

//----------------------------------
/* --- Lexical Scope --- */

//it refers to visibility and accessibility of variables based on the structure of code

/*
//understand variables scope :
function foo(a) {
  var b = a * 2;
  function bar(c) {
    console.log(a, b, c);
  }
  bar(b * 3);
}
foo(2);
*/

//two ways of cheating lexical scope:
/*
//eval():The eval(..) function in JavaScript takes a string as an argument and treats the contents of the string as if it had actually been authored code at that point in the program.
function foo(str, a) {
  eval(str); // cheating! console.log( a, b );
}
var b = 2;
foo("var b = 3;", 1); //new b value is passed through eval.
console.log(b);
*/
/*
//with keyword:with is typically explained as a shorthand for making multiple prop‐ erty references against an object without repeating the object reference itself each time. but it als helps in cheating lexical scope.

var obj = {
  a: 1,
  b: 2,
  c: 3,
};

//more tediuos way to reassign object values:
// The with statement takes an object, one that has zero or more prop‐ erties, and treats that object as if it is a wholly separate lexical scope, and thus the object’s properties are treated as lexically defined identi‐ fiers in that scope.

//obj.a = 2;

//but we can use with(object):
with (obj) {
  (a = 2), (b = 3), (c = 4);
}

//now there's more with with() then just a convinent shorthand:
function foo(obj) {
  with (obj) {
    a = 2; //normal LHS refernce, to assign it to value 2
  }
}

var o1 = {
  a: 3,
};

var o2 = {
  b: 3,
};

foo(o1);
console.log(o1.a); //expected result after with(obj)

foo(o2);
console.log(o2.a); // also expected because a is never defined
console.log(o2.b); //also expected
console.log(a); //unexpected as the variable is leaked into global scope because of with keyword
*/

//----------------------------------
/* --- Function versus block Scope --- */

//collision avoidance:
// Another benefit of “hiding” variables and functions inside a scope is to avoid unintended collision between two different identifiers with the same name but different intended usages. Collision results often in unexpected overwriting of values.
/*
function foo() {
  function bar(a) {
    i = 3; // changing the `i` in the enclosing scope's // for-loop
    console.log(a + i);
  }
  for (var i = 0; i < 10; i++) {
    bar(i * 2); // oops, inifinite loop ahead!
  }
}
// foo();
*/

//Anonymous function:
//naming function is good practice and more drawbacks of anonymous func read in book.
/*
setTimeout(function () {
  console.log("I waited 1 second!");
}, 1000);
*/

//IIFE
/*
var a = 2;
(function foo() {
  var a = 3;
  console.log(a); 
})();
console.log(a); 
*/
/*
var a = 2;
(function IIFE(w) {
  var a = 3;
  console.log(w.a);
})(window); //window object contains all global var/functions
*/
/*
undefined = true;//avoid!
(function IIFE(undefined) {
  var a;
  if (a === undefined) {
    console.log("undefined is safe here");
  }
})();
*/

//Still another variation of the IIFE:
// The def function expression is defined in the second-half of the snip‐ pet, and then passed as a parameter (also called def) to the IIFE func‐ tion defined in the first half of the snippet. Finally, the parameter def (the function) is invoked, passing window in as the global parameter.
/*
var a = 2;
(function IIFE(def) {
  def(window);
})(function def(global) {
  var a = 3;
  console.log(a);
  console.log(global.a);
});
*/

//----------------------------------
// chapter 3: block scope

//normal you know while and for loops block scopes so wont write code of them

/*
try {
  x();
} catch (error) {
  console.log(error); //only can use error in catch scope
}
console.log(error);
*/

// let and var block and functional scope implicit
/*
var foo = true;
if (foo) {
  var bar = 2; // if u use var here the block scope wont work
}
console.log(bar); // ReferenceError

function x() {
  var ar = 2;
}
console.log(ar); //we can't acced var variables only if defined in functional scopes
*/

//----------------------------------
// chapter 4: Hoisting

// The chicken Egg problem below 2 codes:

//our view of code:
/*
a = 2;
var a;
console.log(a);
*/
// compiler view of same code:
/*
var a;
a = 2;
console.log(a);
*/

//our view of code:
/*
console.log(a);
var a = 2;
*/

//compiler view of same code:
/*
var a;
console.log(a);
a = 2;
*/

//reason behind above code is  egg(declaration)comes first and then chicken(assignment) comes

//Function declaration is hoisted before function expression
/*
foo(); // 1
var foo;
function foo() {
  console.log(1);
}
foo = function () {
  console.log(2);
};
*/

//another example
/*
foo();
function foo() {
  console.log(1);
}
var foo = function () {
  console.log(2);
};
function foo() {
  console.log(3);
}
*/

//----------------------------------
// chapter 4: Closures

//Closure is when a function is able to remember its lexical scope even when that function is executing outside its lexical scope

//Example 1:
//closure lets the function(bar) continue to access the lexical scope(of foo) it was defined in at author-time(globally).
/*
function foo() {
  var a = 12;
  function bar() {
    console.log(a);
  }
  return bar;
}

let baz = foo();
baz();
*/

//Example 2:
/*
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  baz(bar);
}

function baz(fn) {
  fn(); // saw closure 
}
foo();
*/

//Example 3:
//timer has a closure over lexical scope of wait for keeping and using the refernce to the variable message and second
/*
function wait(message, second) {
  setTimeout(function timer() {
    console.log(message);
  }, second * 1000);
}

wait("hello sir!", 3);
*/

//Example 4: read from pdf if you don't remeber pg. 55
/*
for (var i = 1; i <= 5; ++i) {
  (function (j) {
    j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}
*/
/*
for (let i = 0; i <= 5; ++i) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
*/

//----------------------------------
// Appendix C

/*
var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log(this.id);
  },
};
// let id = "not awesome";
var id = "not awesome";
obj.cool();
setTimeout(obj.cool, 1000);
*/

var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(
        function timer() {
          this.count++;
          console.log("awesome");
        }.bind(this),
        1000
      );
    }
  },
};

obj.cool();
console.log(obj.count);
