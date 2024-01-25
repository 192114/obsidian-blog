---  
date: 2024-01-04  
series: 其他  
tags:  
  - git  
title: Git rebase(变基)  
slug: git-rebase  
keywords: git rebase  
description: git用法，git rebase  
lastmod:   
share: true  
---  
  
使用  
  
``` Bash  
git rebase 目标基础点  
```  
  
*`rebase` 是站在需要被 `rebase` 的 `commit` 上进行操作*  
  
`rebase` 的意思是，给你的 `commit` 序列重新设置基础点（也就是父 `commit`）。展开来说就是，把你指定的 `commit` 以及它所在的 `commit` 串，以指定的目标 `commit` 为基础，依次重新提交一次。  
  
``` Bash  
git checkout branch1  
git rebase master  
```  
  
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/30/1600abd620a8e28c~tplv-t2oaga2asx-jj-mark:1512:0:0:0:q75.awebp)  
  
可以看出，通过 `rebase`，`5` 和 `6` 两条 `commit`s 把基础点从 `2` 换成了 `4` 。通过这样的方式，就让本来分叉了的提交历史重新回到了一条线。这种「重新设置基础点」的操作，就是 `rebase` 的含义。  
  
在 `rebase` 之后，记得切回 `master` 再 `merge` 一下，把 `master` 移到最新的 `commit`：  
  
``` Bash  
git checkout master   
  
git merge branch1  
```  
  
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/2/160149e054fe485c~tplv-t2oaga2asx-jj-mark:1512:0:0:0:q75.awebp)