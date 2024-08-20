//-------------------------------------------
// CALL-SITE

//example to explain call-site of each functions and in what order each function goes in call-stack
/*
function baz() {
  console.log("baz");
  bar();
}

function bar() {
  console.log("bar");
  foo();
}

function foo() {
  console.log("foo");
  baz();
}

baz();
*/

//-------------------------------------------
// NOTHING BUT RULES

//1. Default binding

//the default binding for "this" applies to the function call, and so points "this" at the global object

/*
// "use strict"; in strict mode wont work
function foo() {
  console.log(this.a);
}
var a = 9;
foo();
*/

//2. Implicit Binding:
//the call-site uses the obj context to reference the function, so you could say that the obj object “owns” or “contains” the function reference at the time the function is called.
//Because obj is the this for the foo() call, this.a is synon‐ ymous with obj.a.
/*
"use strict";
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

obj.foo();
*/

//Only the top/last level of an object property reference chain matters to the call-site. For instance:
/*
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo,
};

var obj1 = {
  a: 2,
  obj2: obj2,
};

obj1.obj2.foo();
*/

//Implicitly lost:
//One of the most common frustrations that this binding creates is when an implicitly bound function loses that binding, which usually means it falls back to the default binding of either the global object or undefined, depending on strict mode.

//Example 1: bar taking obj's this
/*
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo, //this var points to obj a
};
var bar = obj.foo; //this variable now points to global scope (bcoz of default binding)
var a = 12;
bar();
*/

//Example 2: using callback function doFoo
/*
function foo() {
  console.log(this.a);
}
function doFoo(fn) {
  // `fn` is just another reference to `foo` fn(); // <-- call-site!
}
var obj = { a: 2, foo: foo };
var a = "oops, global"; // `a` also property on global object doFoo( obj.foo );

doFoo(obj.foo()); // "oops, global"
*/

//Example 3: using inbuild function
//still "this" refers to global scope
/*
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

var a = 32;

setTimeout(obj.foo, 1000);
*/

// 3. Explicit Binding
//Since you are directly stating what you want the this to be, we call it explicit binding.

/*
function foo() {
  console.log(this.a);
}

var obj = {
  a: 12,
  foo: foo,
};

var a = 2;

foo();
obj.foo();
foo.call(obj); //explicityly binding this to obj
*/

//Hard Binding:
//variation pattern around explicit binding as explicit binding doesnt actually solve our problem, of function losing its intended "this" binding

/*
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

var bar = function () {
  var a = 23;
  foo.call(obj);
};

bar();
setTimeout(bar, 100);
bar.call(window);
*/

//hard binding with arguments passing - apply

/*
function foo(something) {
  // console.log(this.a + something);
  return this.a + something;
}

var obj = {
  a: 12,
};

var bar = function () {
  return foo.apply(obj, arguments); //arguments is an array-like object accessible inside functions that contains the values of the arguments passed to that function.
};

var b = bar(3);
console.log(b);
*/

//another way to express this pattern is to create a bind helper

/*
function foo(something) {
  return this.a + something;
}

function bind(fn, obj) {
  return function () {
    return fn.apply(obj, arguments);
  };
}

var obj = {
  a: 12,
};

var bar = bind(foo, obj);
var ans = bar(123);
console.log(ans);
*/

//Since hard binding is such a common pattern, it’s provided with a built-in utility as of ES5, Function.prototype.bind, and it’s used like this:

//bind(..) returns a new function that is hardcoded to call the original function with the this context set as you specified.
/*
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}
var obj = { a: 2 };

var bar = foo.bind(obj);
var b = bar(2);
console.log(b);
*/

//APi call 'contexts'
function foo(el) {
  console.log(el, this.id);
}

var obj = {
  id: "awesome",
};

[1, 2, 3].forEach(foo, obj);
