---  
date: 2024-03-13  
series: javascript  
tags:  
  - 面试  
  - javascript  
  - 算法  
title: javascript的斐波那契算法实现  
slug: javascript-fibonacci  
keywords: javascript  
description: 斐波那契,javascript,算法  
lastmod: 2024-03-13  
share: true  
---  
  
### 斐波那契算法介绍  
  
[斐波那契数](https://zh.wikipedia.org/wiki/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0) 序列有这样的公式： `Fn = Fn-1 + Fn-2`。换句话说，下一个数字是前两个数字的和。  
前两个数字是 `1`，然后是 `2(1+1)`，然后 `3(1+2)`，`5(2+3)` 等：`1, 1, 2, 3, 5, 8, 13, 21...`。  
  
### 算法实现  
  
#### 普通递归  
  
```javascript  
function fib(num) {  
  if (num <= 2) {  
    return 1  
  } else {  
    return fib(num-2) + fib(num-1)  
  }  
}  
console.log(fib(7)) // ==> 13  
// console.log(fib(77)) // 5527939700884757 ==> 超级慢 涉及到很多的重复计算  
```  
  
该方法有一个很大的问题就是*重复计算*，比如：  
  
```javascript  
...  
fib(5) = fib(4) + fib(3)  
fib(6) = fib(5) + fib(4)  
...  
```  
  
这是完整的递归树示例：  
![Pasted image 20240313163059.png](../../static/images/Pasted%20image%2020240313163059.png)  
我们可以清除的发现 `fib(3)` 被调用了 2 次，`fib(2)` 调用了 3 次。如果总数越大重复调用就越多。  
  
#### 缓存计算结果优化的方法  
  
通过缓存之前出现的计算结果，减少计算的数量，达到优化的目的。  
  
```javascript  
const map = new Map()  
function fibOptimization (n) {  
    
  if (n <= 2) {  
    return 1  
  } else {  
    const cache1 = map.get(n - 1)  
    const cache2 = map.get(n - 2)  
    let a  
    let b  
    if (cache1) {  
      a = cache1  
    } else {  
      a = fibOptimization(n - 1)  
      map.set(n - 1, a)  
    }  
  
    if (cache2) {  
      b = cache2  
    } else {  
      b = fibOptimization(n - 2)  
      map.set(n - 2, b)  
    }  
      
    return a + b  
  }  
}  
  
console.log(fibOptimization(77))  
```  
  
#### 自下而上的动态规划  
  
**动态规划（Dynamic Programming）** 是一种解决问题的数学方法，常用于优化问题。在计算机科学中，动态规划通过将问题分解为子问题，并存储子问题的解来避免重复计算，从而提高算法的效率。  
  
**自下而上**是通过 **迭代** 实现的，先从子问题开始计算，重复计算推算出问题的解。  
  
分析过程：  
根据斐波那契数的计算规则，数值小于等于 2 的时候返回的是 1，之后是它前两个数的和，传入数值小于 3 的时候不用执行循环，故循环的起始值从 3 开始即可。  
  
```javascript  
// a = fib(1), b = fib(2)，这些值是根据定义 1 得到的  
let a = 1, b = 1;  
  
// 求两者的和得到 c = fib(3)  
let c = a + b;  
  
/* 现在我们有 fib(1)，fib(2) 和 fib(3)  
a  b  c  
1, 1, 2  
*/  
```  
  
计算 `fib(4)=fib(3)+fib(2)`，我们就将变量 `a,b` 移动得到 `fib(2),fib(3)`，`c` 将得到两者的和  
  
```javascript  
a = b; // 现在 a = fib(2)  
b = c; // 现在 b = fib(3)  
c = a + b; // c = fib(4)  
  
/* 现在我们有这样的序列  
   a  b  c  
1, 1, 2, 3  
*/  
```  
  
以此类推，这样会比递归快很多，且没有重复计算。下边是完整代码：  
  
```javascript  
function fibDynamicProgramming(n) {  
  let a = 1  
  let b = 1  
  
  for (let i = 3; i <= n; i++) {  
    let c = a + b  
    a = b  
    b = c  
  }  
  
  return b  
}  
  
console.log(fibDynamicProgramming(77))  
```  
