---  
date: 2024-02-23  
series: 其他  
tags:  
  - Obsidian  
  - 博客  
title: Obsidian的配置及插件  
slug: obsidian-config  
keywords: Obsidian,个人博客  
description: 配合github实现的博客工作流程  
lastmod: 2024-02-26 15:59  
share: true  
---  
  
发现了一款非常不错的笔记软件`Obsidian`，有着丰富的插件集，非常优秀的功能。便突发奇想，使用它作为我的主力笔记软件。  
  
### 我的插件  
  
#### Obsidian Git  
  
Obsidian有多种同步方案，我选择的是同步到`github`上去。  
- github上创建仓库  
- 并在笔记的根目录执行`git clone`  
之后就可以在右侧出现笔记修改的暂存区，便可以pull/push操作了。  
  
  
#### Github Publisher  
  
这个插件的主要作用是将文档推送到指定github仓库中去，使用这个插件的主要目的是自己搭建了一套博客网站，将需要推送的markdown文档推送到这个博客的仓库地址，配合`github action`生成特定格式的文件，实现与网站的互联互通。  
  
##### 首先配置目标github仓库的基础信息 Github config  
  
![Pasted image 20240223164533.png](../../static/images/Pasted%20image%2020240223164533.png)  
  
##### 配置上传目录信息 File paths  
![Pasted image 20240223164809.png](../../static/images/Pasted%20image%2020240223164809.png)  
Property key 是通过文章的属性上传目录，如我的配置  
- 通过`dir`属性上传，最终的路径是`Root folder/Property key`,即`content/dir`  
- 如果 dir 属性没有配置则默认上传到 Default folder 下，即`content/posts`  
##### Content  
- 开启`Internals links`配置  
- 开启 `[[Wikilinks]] to [MDlinks](links)` 配置  
- 开启`Markdown hard line break`配置  
- 开启`Dataview`配置  
- 由于在Obsidian中本地图片不需要路径，但是在博客系统中，需要指定图片的引入路径，故需要在 `Text replacer`配置中修改图片路径。`/\]\(([^/]+?)\.(png|jpg|jpeg|webp|gif)/`替换成`](/images/$1.$2`  
- 开启`Sluglify anchor in markdown links`配置  
- 开启`Inline tags`配置  
  
##### Attachment & embed note config  
默认开启附件上传，重点是配置Default attachment folder 。  
![Pasted image 20240223172028.png](../../static/images/Pasted%20image%2020240223172028.png)  
  
#### QuickAdd  
能快速添加笔记模板，目前只用了它的快速添加模板功能。  
  
选择`Template`然后点击`Add Choice`添加一条配置，点击齿轮按钮进行配置，可以设置预先的模板路径直接添加。  
  
![Pasted image 20240223172728.png](../../static/images/Pasted%20image%2020240223172728.png)  
  
#### Dataview   
配置采用默认的配置，然后在笔记的根目录创建文件夹并写入如下内容，并设置代码类型为`dataview`  
  
```  
list rows.file.link  
from -"Templates" and -"Dataview"  
sort file.ctime  
GROUP BY file.folder  
```  
  
效果如下：  
  
![Pasted image 20240223174155.png](../../static/images/Pasted%20image%2020240223174155.png)  
  
- 展现方式有`list`/`table`/`task`/`calendar`  
- `from` 要查询的目标，默认根目录就写`''`，如果去除哪个目标或目录可以写成`-[目录1] and -[目录2]`  
- `sort`排序，如`sort file.ctime asc/desc`  
- `GROUP BY file.folder` 分组输出  
  
`Linter` 目前采用默认配置。  
  
### 配置  
  
- 主题选择`Things`  
- 文件与连接 -> 附件默认存储位置 选择 当前文件所在文件夹的指定子文件夹，并设置子文件夹名称为 attachments  
- 模板 -> 模板指定位置 设置为 Templates  
- 打开页面的大纲![Pasted image 20240226155403.png](../../static/images/Pasted%20image%2020240226155403.png)