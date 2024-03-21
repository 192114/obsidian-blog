---  
date: 2024-03-21  
series: javascript  
tags:  
  - javascript  
  - 面试  
title: 柯里化  
slug: js-currying  
keywords: javascript  
description: 柯里化,Currying  
lastmod: 2024-03-21  
share: true  
---  
  
### 概念  
  
柯里化是是把接受*多个参数的函数*变换成接受*一个单一参数（最初函数的第一个参数）的函数*，并且*返回接受余下的参数而且返回结果的新函数的技术*，即一个函数从可调用的 `f(a,b,c)` 转换为 `f(a)(b)(c)`。  
  
### 部分求值（柯里化的好处）  
  
假定我们有下面日志输出的函数：  
  
```javascript   
function log(date, type, message) {  
	console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`)  
}  
```  
  
经过柯里化：  
  
```javascript  
const logCurry = _.curry(log)  
```  
  
我们就可以如下调用：  
  
```javascript  
log(new Date())('Error')('error message')  
```  
  
这样我们可以这样创建当前日志的便捷函数：  
  
```javascript  
// 当前时间的日志函数  
const logNow = log(new Date())  
// 使用  
log('Warning', 'message')  
  
```  
  
`logNow` 是固定了第一个参数的 `log` 函数，即 `logNow` 是*部分应用函数（partial）*  
  
### 实现  
  
```javascript  
function curry(fn) {  
  return function curried(...args) {  
    if (fn.length > args.length) {  
      return function (...args2) {  
        return curried.apply(this, args.concat(...args2))  
      }  
    } else {  
      return fn.apply(this, args)  
    }  
  }  
}  
  
function sum(a,b,c) {  
  return a + b + c  
}  
  
const currySum = curry(sum)  
  
console.log(currySum(1)(2,3)) // 6  
  
console.log(currySum(1)(2)(3)) // 6  
  
console.log(currySum(1,2,3)) // 6  
```  
  
关于上面实现的说明：  
- 首次调用时即 `curry(sum)` 时，形成 [ 闭包 ](js-closure.md)，`fn` 存储在函数的上下文中  
- `fn.length` 即传入函数（`sum`）的形式参数的数量，`args` 是函数执行时实际参数  
- `curried` 函数体中，如果 `fn` 的形参长度是大于传入的 `args` 的长度，则它是一个部分函数，还没有调用 `fn`，则返回一个包装器 `pass` 继续接收参数并将参数和原来参数拼接  
- 否则，只需要使用 `func.apply` 将调用传递给它即可  
