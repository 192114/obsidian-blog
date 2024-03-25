---  
date: 2024-03-25  
series: 算法  
tags:  
  - 算法  
  - 面试  
  - javascript  
title: 冒泡排序  
slug: bubble-sort  
keywords: 算法  
description: 冒泡排序  
lastmod: 2024-03-25  
share: true  
---  
  
### 算法步骤  
  
- 比较相邻的两个元素如果第一个比第二个大就交换两个元素的位置  
- 对每个相邻的元素执行同样的工作，从开始的一对到最后的一对，执行完后最大的元素将在最后一位  
- 依次执行元素，除了后边的最大的元素  
- 持续执行，直到没有需要比较的数字  
  
### 图解  
  
![bubbleSort.gif](../../static/images/bubbleSort.gif)  
  
### 实现  
  
#### 未优化版本  
  
```javascript  
const arr = [95, 26, 29, 23, 72, 54, 23, 30, 2, 45]  
function bubbleSort(list) {  
  const len = list.length;  
  
  for (let i = 0; i < len; i++) {  
    for (let j = 0; j < len - 1 - i; j++) {  
      if (list[j] > list[j + 1]) {  
        const temp = list[j];  
        list[j] = list[j + 1];  
        list[j + 1] = temp;  
      }  
    }  
  }  
  
  return list;  
}  
console.log(bubbleSort(arr)); // [2, 23, 23, 26, 29, 30, 45, 54, 72, 95]  
```  
  
#### 优化版本  
  
1. 如果内层循环没有发生位置交换，则说明排序已经完成，就不用在继续执行了  
2. 记录内层循环最后发生位置交换的指针，可以较少内层循环的次数  
  
```javascript  
function bubbleSort(list) {  
  const len = list.length;  
  // 内层优化 记录上一次冒泡的位置 减少内循环的次数  
  let lastIndex = 0  
  let innerEnd = len - 1 // 初始的内循环结束  
  
  for (let i = 0; i < len; i++) {  
  // 外层优化 如果没有发生冒泡 则说明排序完成  
  let haveBubble = false  
    for (let j = 0; j < innerEnd; j++) {  
      if (list[j] > list[j + 1]) {  
        const temp = list[j];  
        list[j] = list[j + 1];  
        list[j + 1] = temp;  
        haveBubble = true // 发生冒泡标识  
        lastIndex = j // 记录最后发生位置交换的指针  
      }  
    }  
  
    // 如果没有发生位置交换 则结束指针是0 即 内层循环不发生  
    innerEnd = lastIndex   
      
    if (!haveBubble) {  
      // 说明顺序已经正确了  
      break  
    }  
  }  
  
  return list;  
}  
  
console.log(bubbleSort(arr));  
```  
