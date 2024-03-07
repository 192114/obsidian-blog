---  
date: 2024-03-06  
series: javascript  
tags:  
  - 面试  
  - javascript  
title: Javascript的this  
slug: js-this  
keywords: javascript this  
description: 面试,javascript,this  
lastmod: 2024-03-06  
share: true  
---  
  
`this`指向当前代码运行时所处的上下文环境（context）。`this`指向的是**函数调用位置**的对象，也就是**调用该函数的对象**。`this`就是一个变量存储着调用该函数的对象的值。  
### 说明  
- `this`的指向是在**函数被调用的时候确定的**，也就是执行上下文时确定的  
- `this`与函数的声明位置无关，只取决于调用位置（由谁，在什么地方调用）  
- 在执行上下文时候调用，所以`this`不可更改  
### 指向规则  
#### 1.默认指向  
独立的函数调用，this会指向全局对象window。这样取决于是否是在严格模式下，如果在严格模式下，this的指向是undefined。  
```javascript  
function func1() {  
	console.log(this.a1)  
}  
  
var a1 = '1'  
  
func1() // '1' 此时this指向的是window  
  
function func2() {  
	'use strict'  
	console.log(this.a1)  
}  
  
func2() // Uncaught TypeError TypeError: Cannot read properties of undefined (reading 'a1')  
```  
如果是在`setTimeout`和`setInterval`中使用，this会指向window对象。  
```javascript  
var num = 0;  
class Obj {  
    constructor(num){  
        this.num = num;  
    }  
    func(){  
        console.log(this.num);  
    }  
    func1(){  
        setTimeout(function () {  
            console.log("setTimeout:"+this.num);  
        }, 1000)  
    }  
    func2(){  
        setInterval(function () {  
            console.log(this.num);  
        }, 2000)  
    }  
}  
var obj = new Obj(1);  
obj.func();//>> 1　             输出的是obj.num  
obj.func1()//>> setTimeout:0　  输出的是window.num  
obj.func2()//>> 0 0 0 0 ……　    输出的是window.num  
```  
  
#### 2. 隐式指向  
函数体内this指向是由调用位置的调用者决定的。**调用者调用的函数为某一个对象的方法，调用时内部的this指向该对象。**  
```javascript  
function func1() {  
	console.log(this.a)  
}  
  
var obj = {  
	a: 1,  
	func: func1,  
}  
  
obj.func() // >> 1  
// 此时的this指向的是调用者obj  
```  
如果多层调用，**则由最顶层或着说是最后一层调用影响。也就是离的最近的调用者。**  
```javascript  
function func() {  
  console.log(this.a);  
}  
  
var obj2 = {  
  a: "1891",  
  func: func  
};  
  
var obj1 = {  
  a: "coffe",  
  obj2: obj2  
};  
  
//此时的 this 指向 obj2 对象，因为obj2离得近！  
obj1.obj2.func(); //>> 1891  
```  
还有一种**隐式丢失**：  
```javascript  
function func() {  
    console.log( this.a );  
}  
  
var obj = {  
    a: "coffe1891",  
    func: func  
};  
  
var bar = obj.func; // 间接引用,见本文【壹.2.3.6】。此时bar和obj.func其实  
                    // 都指向内存中的函数func本身。  
var a = "oops, global"; // a 是全局对象window的属性，也是全局变量  
bar(); //>> oops, global  
  
// 虽然 bar 是 obj.func 的一个引用，但是实际上，它引用的是func函数本身，  
// 因此此时的 bar() 其实是一个不带任何定语的独立函数调用，应用【默认指向】规则,  
// 因此函数体内的this指向window，this.a指向window的属性a（全局变量a）  
```  
  
#### 3.显示调用  
由Javascript内置对象Function的三个原型方法`call`、`apply`、`bind`可以显示的修改this的指向。  
```javascript  
var a = '1'  
function func() {  
	console.log(this.a)  
}  
var obj = {  
	a: '2'  
}  
func.apply(obj) // '2' 调用时强制把this指向改成obj  
  
```  
使用`bind`改变setInterval和setTimeout的this的指向：  
```javascript  
var num = 0;  
class Obj {  
    constructor(num){  
        this.num = num;  
    }  
    func(){  
        console.log(this.num);  
    }  
    func1(){  
        setTimeout(function () {  
            console.log("setTimeout:"+this.num);  
        }.bind(this), 1000);//bind  
    }  
    func2(){  
        setInterval(function () {  
            console.log(this.num);  
        }.bind(this), 2000);//bind  
    }  
}  
var obj = new Obj(1);  
obj.func();//>> 1　             输出的是obj.num  
obj.func1()//>> setTimeout:1　  输出的是obj.num  
obj.func2()//>> 1 1 1 1 ……　    输出的是obj.num  
```  
  
#### 4. new 操作符的指向  
**构造函数**指的是**用new操作符调用的函数**。使用`new`调用函数或着说是发生构造函数调用时，会执行如下操作：  
1. 创建（构造）一个全新的对象  
2. 将构造函数的作用域赋值给新对象（this指向这个新对象）  
3. 执行构造函数中的代码（为新对象添加属性方法等）  
4. 如果函数没有返回值则返回这个新对象  
```javascript  
function Func(a) {  
	this.a = a  
}  
  
var foo = new Func('11')  
  
console.log(foo.a) // '11'  调用 new Fuc(..)时 将新对象绑定到了Func的this上  
```  
  
### 如果判断this的指向  
可以根据如下顺序判断`this`的指向问题。  
#### 1. 函数在new中被调用   
**`this`指向到新创建的对象**  
```javascript  
function func(name) {  
  this.name = name;  
  this.getName = function() {  
    return this.name;  
  };  
}  
  
var obj = new func("coffe"); //this会指向obj  
console.log(obj.getName()); //>> coffe  
```  
#### 2.函数通过`call`、`apply`、`bind`显示调用  
**`this`指向call、bind、apply方法的第一个参数执行的对象**  
```javascript  
var obj1 = {  
  name: "coffe"  
};  
function func() {  
  return this.name; //这里的this本来指向window  
}  
var str = func.call(obj1); //改变了func函数里面this的指向，指向obj1  
console.log(str); //>> coffe  
```  
#### 3.函数作为某个对象的方法隐式调用  
**`this`指向的是调用者，也就是那个调用对象**  
```javascript  
var obj1 = {  
  name: "coffe",  
  func() {  
    return this.name; //指向obj1  
  }  
};  
  
//这里的obj1.func()，表明func函数被obj1调用，因此func中的this指向obj1  
console.log(obj1.func()); //>> coffe  
```  
#### 4.以上都不是则默认指向  
**严格模式下指向到undefined，否则指向到全局对象。**  
```javascript  
var a = "coffe"; //为全局对象window添加一个属性a  
function func() {  
  "use strict";//开启严格模式  
  return this.a;  
}  
  
//严格模式下，this指向undefined  
console.log(func()); //>> TypeError  
```  
  
### 例外情况  
#### 1. 被忽略的this  
`null`或着`undefined`作为`this`的指向，如作为`call`、`apply`、`bind`第一个参数传进去，则会被忽略，使用默认的指向规则。  
```javascript  
function func() {  
  console.log(this.a);  
}  
  
var a = 2;  
func.call(null); //>> 2  
                 //this指向了window  
```  
#### 2.隐式指向之隐式丢失  
**隐式丢失最容易在赋值时发生**；隐式丢失发生时，调用这个函数会应用**默认指向规则**。  
```javascript  
function func() {  
  console.log(this.a);  
}  
var a = 2;  
var o = { a: 3, func: func };  
var p = { a: 4 };  
o.func(); //>> 3  
(p.func = o.func)(); //>> 2  
// 赋值表达式 p.func=o.func 的返回值是目标函数的引用，也就是 func 函数的引用  
// 因此调用位置是 func() 而不是 p.func() 或者 o.func()  
```  
#### 3.箭头函数  
箭头函数不遵守`this`的四种指向规则，而是**根据函数定义时的作用域来决定** `this` **的指向**。何谓“定义时的作用域”？就是你定义这个箭头函数的时候，该箭头函数在哪个函数里，那么箭头函数体内的this就是它父函数的this。  
```javascript  
function func() {  
  // 返回一个箭头函数  
  return a => {  
    //this 继承自 func()  
    console.log(this.a);  
  };  
}  
var obj1 = {  
  a: 2  
};  
var obj2 = {  
  a: 3  
};  
  
var bar = func.call(obj1);  
bar.call(obj2); //>> 2         不是 3 ！  
  
// func() 内部创建的箭头函数会捕获调用时 func() 的 this。  
// 由于 func() 的 this 绑定到 obj1， bar（引用箭头函数）的 this 也会绑定到 obj1，  
// this一旦被确定，就不可更改，所以箭头函数的绑定无法被修改。（new 也不行！）  
```  
  
所以也可以认为箭头函数没有自己的this，通常情况下，this只用在函数运行之后才能确定，但是箭头函数的this是在函数定义的时候就确定了，且运行时无法修改即相当一个固定的变量。