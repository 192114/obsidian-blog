---  
date: 2024-01-08  
series: 其他  
tags:  
  - git  
title: Git 标签  
slug: git-tag  
keywords: git tag  
description: git用法，git tag  
lastmod:   
share: true  
---  
  
- 命令`git tag <tagname>`用于新建一个标签，默认为`HEAD`，也可以指定一个commit id；  
- 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；  
- 命令`git tag`可以查看所有标签。  
- 命令`git push origin <tagname>`可以推送一个本地标签；  
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；  
- 命令`git tag -d <tagname>`可以删除一个本地标签；  
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。  
- *命令`git push origin -d tag tagName`也可以用来删除一个远程分支*  
  
发布一个版本时，我们通常先在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。  
  
Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。  
  
``` Bash  
git tag v1.0 # 打标签  
```  
  
``` Bash  
git tag v0.9 f52c633  
```  
  
``` Bash  
git tag -a v0.1 -m "version 0.1 released" 1094adb  
```  
  
查看某个标签的详细信息 `git show <tagname>`  
  
``` Bash  
git show v0.9  
commit f52c63349bc3c1593499807e5c8e972b82c8f286 (tag: v0.9)  
Author: Michael Liao <askxuefeng@gmail.com>  
Date:   Fri May 18 21:56:54 2018 +0800  
  
    add merge  
  
diff --git a/readme.txt b/readme.txt  
...  
```  
  
查看标签  
  
``` Bash  
git tag  
v1.0  
```  
  
删除标签  
  
``` Bash  
git tag -d v0.1  
Deleted tag 'v0.1' (was f15b0dd)  
```  
  
推送某个标签到远程  
  
``` Bash  
git push origin v1.0  
Total 0 (delta 0), reused 0 (delta 0)  
To github.com:michaelliao/learngit.git  
 * [new tag]         v1.0 -> v1.0  
```  
  
推送全部标签到远程  
  
``` Bash  
git push origin --tags  
Total 0 (delta 0), reused 0 (delta 0)  
To github.com:michaelliao/learngit.git  
 * [new tag]         v0.9 -> v0.9  
```  
  
远程标签的删除（标签名和分支名不同名的情况）  
  
前提是先删除本地的tag `git tag -d v1.0`  
  
``` Bash  
git push --delete origin prod1.0  
  
To https://github.com/myrepos/prod.git  
 - [deleted]         prod1.0  
```  
  
也可以用  
  
```Bash  
git push origin :refs/tags/prod1.0  
  
To https://github.com/myrepos/prod.git  
 - [deleted]         prod1.0  
```