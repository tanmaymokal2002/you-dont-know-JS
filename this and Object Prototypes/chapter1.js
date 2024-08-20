//----------------------------------
// chapter 1

//Why? "this"

/*
//we can normally pass obj but we can achieve same thing with "this" as well. "this" mechanism provides a more elegant way of im‐ plicitly “passing along” an object reference, leading to cleaner API design and easier reuse.

var me = {
  name: "Tanmay",
};

var you = {
  name: "Reader",
};

//with obj passing:
// function identify(obj) {
//   return obj.name.toUpperCase();
// }

// function speak(obj) {
//   var greeting = "Hello! i am " + identify(obj);
//   return greeting;
// }

//with this keyword

function identify() {
  return this.name.toUpperCase();
}
function speak() {
  var greeting = "Hello! i am " + identify.call(this);
  return greeting;
}

// console.log(identify(me));
// console.log(speak(me));
console.log(identify.call(me));
console.log(speak.call(you));
*/

//illustrate how this doesn’t let a function get a reference to itself like we might have assumed:
/*
function foo(num) {
  console.log("foo: " + num);
  this.count++;
}

foo.count = 0;
// var data = {
//   count: 0,
// };

var i;
for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo.call(foo, i);
  }
}

console.log(foo.count);
*/

/*
//Every time you feel yourself trying to mix lexical scope look-ups with "this", remind yourself - there is no bridge:

function foo() {
  var a = 2;
  this.bar();
}
function bar() {
  console.log(this.a);
}
foo();
*/
