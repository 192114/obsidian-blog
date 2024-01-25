---  
date: 2024-01-19  
series: 其他  
tags:  
  - git  
title: Git分支策略  
slug: git-branch-strategy  
keywords: git branch strategy  
description: git用法，git 分支策略  
lastmod:   
share: true  
---  
  
在实际开发中，我们应该按照几个基本原则进行分支管理：  
  
首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；  
  
那在哪干活呢？干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；  
  
你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。  
  
所以，团队合作的分支看起来就像这样：  
  
![git-team.png](../../static/images/git-team.png)  
合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。从分支历史上就可以看出分支信息  
  
``` shell  
$ git merge --no-ff -m "merge with no-ff" dev  
Merge made by the 'recursive' strategy.  
 readme.txt | 1 +  
 1 file changed, 1 insertion(+)  
```  
  
![git-no-ff.png](../../static/images/git-no-ff.png)  
  
### bug的处理  
  
每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。  
  
当前分支功能还没完成，这时候就需要git提供的`stash`，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作。  
  
```shell  
git stash  
Saved working directory and index state WIP on dev: f52c633 add merge  
  
git checkout master # 切换需要改bug的分支  
  
git checkout -b issue-1 # 创建修改bug分支  
  
git commit -m 'fixed' # 提交修改  
  
git switch master # 切换到主分支  
  
git merge --no-ff -m 'merge bug issue-1' # 合并代码 （--no-ff 关闭fast-forward 生成一条merge记录）  
  
git switch dev # 切换到开发分支  
```  
  
用`git stash list`命令看看  
  
``` shell  
git stash list  
stash@{0}: WIP on dev: f52c633 add merge  
```  
  
一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；  
  
另一种方式是用`git stash pop`，恢复的同时把stash内容也删了。  
  
在master分支上修复了bug后，我们要想一想，dev分支是早期从master分支分出来的，所以，这个bug其实在当前dev分支上也存在。  
  
Git专门提供了一个`cherry-pick`命令，让我们能复制一个特定的提交到当前分支。  
  
``` shell  
git branch  
* dev  
  master  
$ git cherry-pick 4c805e2  
[master 1d4b803] fix bug 101  
 1 file changed, 1 insertion(+), 1 deletion(-)  
```  
  
*`cherry-pick`和`git stash`步骤问题：*  
是回到dev分支后，先 git cherry-pick 4c805e2 再 git stash pop就可以了  
  
### 新特性开发  
  
添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。  
  
创建新特性分支  
``` shell  
git switch -c feature-vulcan  
Switched to a new branch 'feature-vulcan'  
```  
  
提交分支  
``` shell  
git add vulcan.py  
  
git status  
On branch feature-vulcan  
Changes to be committed:  
  (use "git reset HEAD <file>..." to unstage)  
  
	new file:   vulcan.py  
  
git commit -m "add feature vulcan"  
[feature-vulcan 287773e] add feature vulcan  
 1 file changed, 2 insertions(+)  
 create mode 100644 vulcan.py  
```  
  
切回开发分支  
``` shell  
git switch dev  
```  
  
如果一切正常，可以使用`git merge feature-vulcan`合并，如果不需要该特性就可以`git branch -D feature-vulcan` 删除该分支  
  
``` shell  
git branch -d feature-vulcan  
error: The branch 'feature-vulcan' is not fully merged.  
If you are sure you want to delete it, run 'git branch -D feature-vulcan'.  
```  
  
`-D` 是强制删除，使用`-d`则是给出提示当前分支未合并，不能删除。  
  
### 团队协作  
  
- 查看远程库信息，使用`git remote -v`；  
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；  
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；  
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；  
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；  
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。  
  
当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`。  
  
要查看远程库的信息，用`git remote`：  
  
``` shell  
git remote  
origin  
```  
  
或者，用`git remote -v`显示更详细的信息：  
  
``` shell  
git remote -v  
origin  git@github.com:michaelliao/learngit.git (fetch)  
origin  git@github.com:michaelliao/learngit.git (push)  
```  
  
上面显示了可以抓取和推送的`origin`的地址。如果没有推送权限，就看不到push的地址。  
  
推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上。  
  
``` shell  
git push origin dev # 推送到dev分支  
  
git push origin master # 推送到住分支  
```  
  
但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？  
- `master`分支是主分支，因此要时刻与远程同步；  
- `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；  
- bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；  
- feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。  
  
### 抓取分支  
  
多人协作时，大家都会往`master`和`dev`分支上推送各自的修改。  
  
``` shell  
git clone git@github.com:michaelliao/learngit.git  
Cloning into 'learngit'...  
remote: Counting objects: 40, done.  
remote: Compressing objects: 100% (21/21), done.  
remote: Total 40 (delta 14), reused 40 (delta 14), pack-reused 0  
Receiving objects: 100% (40/40), done.  
Resolving deltas: 100% (14/14), done.  
```  
  
从远程库clone时，默认情况下，你的小伙伴只能看到本地的`master`分支  
  
要在`dev`分支上开发，就必须创建远程`origin`的`dev`分支到本地，于是他用这个命令创建本地`dev`分支：  
  
```  
$ git checkout -b dev origin/dev  
```  
  
现在，就可以在`dev`上继续修改，然后，把`dev`分支`push`到远程：  
  
``` shell  
$ git push origin dev  
Counting objects: 3, done.  
Delta compression using up to 4 threads.  
Compressing objects: 100% (2/2), done.  
Writing objects: 100% (3/3), 308 bytes | 308.00 KiB/s, done.  
Total 3 (delta 0), reused 0 (delta 0)  
To github.com:michaelliao/learngit.git  
   f52c633..7a5e5dd  dev -> dev  
```  
  
多人协作的工作模式通常是这样：  
  
1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；  
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；  
3. 如果合并有冲突，则解决冲突，并在本地提交；  
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！  
  
如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。