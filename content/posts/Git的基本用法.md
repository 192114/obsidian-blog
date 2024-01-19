---  
date: 2024-12-25  
series: 其他  
tags:  
  - git  
title: Git的基本用法  
slug: git-usage  
keywords: git基本用法  
description: git用法，git 基础用法  
lastmod:   
share: true  
---  
  
[廖雪峰老师的git教程](https://www.liaoxuefeng.com/wiki/896043488029600)  
  
- `git init` 初始化仓库  
- `git add [file1 file2] / .` 添加到暂存区  
- `git commit -m [message]` 将当前staged修改提交`--amend`就会生成一条新的commit替换了原commit  
- `git status` 查看状态  
``` shell  
git status  
On branch master  
Changes not staged for commit:  
  (use "git add <file>..." to update what will be committed)  
  (use "git checkout -- <file>..." to discard changes in working directory)  
  
	modified:   readme.txt  
  
Untracked files:  
  (use "git add <file>..." to include in what will be committed)  
  
	LICENSE  
  
no changes added to commit (use "git add" and/or "git commit -a")  
```  
- `git log` 查看历史记录 `--pretty=oneline` 加上他一行展示信息  
``` shell  
git log  
commit e475afc93c209a690c39c13a46716e8fa000c366 (HEAD -> master)  
Author: Michael Liao <askxuefeng@gmail.com>  
Date:   Fri May 18 21:03:36 2018 +0800  
  
    add distributed  
  
commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0  
Author: Michael Liao <askxuefeng@gmail.com>  
Date:   Fri May 18 20:59:18 2018 +0800  
  
    wrote a readme file  
```  
- `git reflog` 记录你的每一次命令  
``` shell  
git reflog  
  
e475afc HEAD@{1}: reset: moving to HEAD^  
1094adb (HEAD -> master) HEAD@{2}: commit: append GPL  
e475afc HEAD@{3}: commit: add distributed  
eaadf4e HEAD@{4}: commit (initial): wrote a readme file  
```  
- `git diff` 比对改动  
``` shell  
git diff readme.txt   
diff --git a/readme.txt b/readme.txt  
index 46d49bf..9247db6 100644  
--- a/readme.txt  
+++ b/readme.txt  
@@ -1,2 +1,2 @@  
-Git is a version control system.  
+Git is a distributed version control system.  
 Git is free software.  
```  
#### 回退版本  
  
首先，Git必须知道当前版本是哪个版本，在Git中，用`HEAD`表示当前版本，也就是最新的提交`1094adb...`（注意我的提交ID和你的肯定不一样），上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。  
  
- `git reset --hard HEAD^` 回退到上一个版本   
- `git reset --hard commitId` 回退到指定commit，说重置应该更为准确  
  
#### 撤销修改  
  
``` shell  
git checkout -- readme.txt  
```  
  
命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：  
  
- 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；  
  
- 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。  
  
总之，就是让这个文件回到最近一次git commit或git add时的状态。  
  
`git checkout -- file`命令中的`--`很重要，没有`--`，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到`git checkout`命令。  
  
如果已经`git add`到暂存区了，需要先执行`git reset --hard HEAD file`将文件修改撤销掉（unstage）之后在执行 `git checkout -- file`  
  
  
撤销操作汇总：  
  
- 情况1：**文件只在工作区操作，未add**。撤销操作：`git restore <file>`。结果：工作区文件回退*。  
- 情况2：**文件已add，未commit**。撤销操作：`git restore --staged <file>`。结果：**暂存区文件回退，工作区文件未回退，如需继续回退，操按情况1操作。**  
- 情况3：**文件已add，已commit**。撤销操作：**git reset --hard commit_id**。结果：**工作区文件、暂存区文件、本地仓库都回退**  
  
#### 远程仓库配置  
##### 生成公钥私钥  
``` shell  
ssh-keygen -t rsa -C "youremail@example.com"  
```  
用户目录下的`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。  
  
登录github，“Account settings”，“SSH Keys”页面将公钥配置到gitbub中  
  
将本地仓库关联远程仓库  
``` shell  
git remote add origin git@github.com:192114/git-practice.git  
```  
添加后，远程库的名字就是`origin`，这是Git默认的叫法，也可以改成别的，但是`origin`这个名字一看就知道是远程库。  
``` shell  
git push -u origin master  
Counting objects: 20, done.  
Delta compression using up to 4 threads.  
Compressing objects: 100% (15/15), done.  
Writing objects: 100% (20/20), 1.64 KiB | 560.00 KiB/s, done.  
Total 20 (delta 5), reused 0 (delta 0)  
remote: Resolving deltas: 100% (5/5), done.  
To github.com:michaelliao/learngit.git  
 * [new branch]      master -> master  
Branch 'master' set up to track remote branch 'master' from 'origin'.  
```  
  
由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。  
  
##### 删除远程库  
```shell  
git remote -v  
origin  git@github.com:192114/git-practice.git (fetch)  
origin  git@github.com:192114/git-practice.git (push)  
```  
  
``` shell  
git remote rm origin  
```  
  
##### 从远端克隆  
``` shell  
git clone git@github.com:192114/gitskills.git  
Cloning into 'gitskills'...  
remote: Counting objects: 3, done.  
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 3  
Receiving objects: 100% (3/3), done.  
```  
