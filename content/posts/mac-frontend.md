---  
date: 2023-12-15  
series: Mac装机  
tags:  
  - computer  
title: 装机指南 - 前端开发环境  
slug: mac-frontend  
keywords: mac装机  
description: mac装机，前端，brew  
lastmod: 2024-03-07  
share: true  
---  
  
### VOLTA- javascript 工具链管理工具 主要用于 node 版本管理  
  
[VOLTA官网](https://github.com/volta-cli/volta)  
  
#### 安装  
  
``` Bash  
brew install   
```  
  
#### 配置环境变量  
  
``` Bash  
# ~/.zshrc  
...  
export VOLTA_HOME="$HOME/.volta"  
export PATH="$VOLTA_HOME/bin:$PATH"  
...  
```  
  
#### 常用命令  
  
``` Bash  
volta install node # 安装最新版的node  
volta install node@version # 安装指定版本的node  
  
volta uninstall node@version # 卸载  
  
volta pin node@12.20.2 # 指定项目使用node的版本  
volta pin yarn@1.19.2  
# 会在package.json里添加  
"volta": {  
  "node": "12.20.2",  
  "yarn": "1.19.2"  
}  
  
```  
  
*关注 node 的试验特性（包管理器的管理器） -  Corepack*  
  
### 必备软件  
  
1. vs code 编辑器 ([vscode-config](./vscode-config.md))  
2. chrome 浏览器  
3. inna 视频播放器  
4. maccy 剪切板工具  
5. obsidian 笔记工具 ([obsidian-config](./obsidian-config.md))  
6. The Unarchiver 解压缩工具  
