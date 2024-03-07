---  
date: 2023-12-16  
series: Mac装机  
tags:  
  - computer  
title: 装机指南 - Terminal zsh 配置  
slug: mac-terminal  
keywords: mac装机  
description: mac装机，terminal，zsh，volta  
lastmod: 2024-03-07  
share: true  
---  
  
### 安装 Homebrew  
  
官网地址 [Homebrew](https://brew.sh/)  
  
``` Bash  
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"  
```  
  
### 配置 zsh（使用 mac terminal）  
  
``` Bash  
# ~/.zshenv  
// 将homebrew写入环境变量  
eval "$(/usr/local/bin/brew shellenv)"  
  
# 快捷的cd命令 启发与z autojump  
eval "$(zoxide init zsh --cmd cd)"  
  
```  
  
zsh 常见配置文件  
1. .zshenv 通常放环境变量 任何时候都会被加载  
2. .zshrc 交互式终端可用  
  
加载顺序：`.zshenv `-> `.zprofile` if login ->` .zshrc` if interactive -> `.zlogin` if login -> `.zlogout`  
  
  
### zsh 插件管理  
  
文档地址 [zinit](https://github.com/zdharma-continuum/zinit#manual)  
  
``` Bash  
 brew install zinit  
```  
  
``` Bash  
# .zshrc file  
### Added by Zinit's installer  
  
source "/usr/local/opt/zinit/zinit.zsh"  
  
autoload -Uz _zinit  
  
(( ${+_comps} )) && _comps[zinit]=_zinit  
  
### End of Zinit's installer chunk  
  
# pure 主题  
  
zinit ice compile'(pure|async).zsh' pick'async.zsh' src'pure.zsh'  
  
zinit light sindresorhus/pure  
  
# 语法高亮  
  
zinit ice lucid wait='0' atinit='zpcompinit'  
  
zinit light zdharma-continuum/fast-syntax-highlighting  
  
...  
```  
  
zinit 语法说明  
- `zinit light <repo/plugin>` 加载插件 不追踪插件行为  
- `zinit load <repo/plugin>` 加载插件 可用 unload 卸载 追踪插件行为 查看报告 卸载  
- `zinit snippet URL` 加载本地或远程文件  
- `zinit self-update` 自更新  
- `zinit update --parallel number` 更新插件  
- `zinit ice wait="0"` 等待 0s  **ice**选项 表示只使用一次 对下一条命令起作用 **pick** 正则匹配第一个符合条件的文件 **src** 指定 source 的文件 **atinit** 在加载插件时需要执行的命令  
  
##### 插件  
  
- [zdharma-continuum/fast-syntax-highlighting](https://github.com/zdharma-continuum/fast-syntax-highlighting) 语法高亮  
- [ zdharma-continuum/history-search-multi-word](https://github.com/zdharma-continuum/history-search-multi-word) `ctrl+r` 选择输入匹配的语法  
- [zsh-users/zsh-completions](https://github.com/zsh-users/zsh-completions) 补全 zsh 语法  
- [zsh-users/zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) 建议 提示之前的输入值  
- [eza](https://github.com/eza-community/eza) 更好的 ls 命令  
  
``` Bash  
brew install eza  
# ~/.zshrc  
# eza 别名  
  
# 带图标  
  
alias ls="eza --icons"  
  
# 文件详情  
  
alias ll="eza --icons --long --header"  
  
# 文件详情 包含隐藏文件  
  
alias la="eza --icons --long --header --all"  
  
# 显示文件详情并带git信息  
  
alias lg="eza --icons --long --header --all --git"  
  
# 关闭默认ls颜色  
  
DISABLE_LS_COLORS=true   
  
```  
  
- [bat](https://github.com/sharkdp/bat/blob/master/doc/README-zh.md) 类似 cat 但有语法高亮  
  
``` Bash  
brew install bat  
  
#命令  
bat /example/z.js -r 16 #显示文件 从第16行显示  
  
# ~/.config/bat.conf  
--paging=never #不分页  
--theme="Solarized (dark)" # 主题  
  
# `bat --list-themes` 一份语法高亮主题的清单  
```  
  
- [ripgrep](https://github.com/BurntSushi/ripgrep) 命令行搜索工具  
  
``` Bash  
brew install ripgrep  
  
#命令  
rg const demo.js # 在demo.js 搜索const关键字  
rg const\w+ demo.js # 正则匹配内容  
  
# ~/.config/ripgrep.conf  
 #Don't let ripgrep vomit really long lines to my terminal, and show a preview.  
--max-columns=150  
--max-columns-preview   
  
# Add my 'web' type.  
--type-add  
web:*.{html,css,js}*   
  
# Search hidden files / directories (e.g. dotfiles) by default  
--hidden    
  
# Using glob patterns to include/exclude files or folders  
--glob=!.git/*  
  
# or  
--glob  
!.git/*   
  
# Set the colors.  
--colors=line:none  
--colors=line:style:bold  
  
# Because who cares about case!?  
--smart-case  
```  
  
### 修改 terminal 主题配色  
  
1. 左上角终端选偏好设置  
2. 点击描述文件  
3. [themes](https://github.com/lysyi3m/macos-terminal-themes) 下载主题  
4. 导入下载的主题  
5. 点击使用主题  
  
### 安装字体  
  
``` Bash  
brew tap homebrew/cask-fonts  
brew install font-hack-nerd-font  
```  
  
- terminal 描述文件 文本处切换字体  
- vscode fontfamily 配置 字体 'Hack Nerd Font Mono' （terminal 设置字体同理）  
  
### 完整.zshrc  
  
``` Bash  
### Added by Zinit's installer  
source "/usr/local/opt/zinit/zinit.zsh"  
autoload -Uz _zinit  
(( ${+_comps} )) && _comps[zinit]=_zinit  
### End of Zinit's installer chunk  
  
# pure 主题  
zinit ice compile'(pure|async).zsh' pick'async.zsh' src'pure.zsh'  
zinit light sindresorhus/pure  
  
# 语法高亮  
zinit ice lucid wait='0' atinit='zpcompinit'  
zinit light zdharma-continuum/fast-syntax-highlighting  
  
# 搜索历史输入  
zinit ice lucid wait='0'  
zinit light zdharma-continuum/history-search-multi-word  
  
# 补全  
zinit ice lucid wait='0'  
zinit light zsh-users/zsh-completions  
  
# 自动建议  
zinit ice wait lucid atload'_zsh_autosuggest_start'  
zinit light zsh-users/zsh-autosuggestions  
  
# 加载 OMZ 框架及部分插件  
zinit snippet OMZ::lib/completion.zsh  
zinit snippet OMZ::lib/history.zsh  
zinit snippet OMZ::lib/key-bindings.zsh  
zinit snippet OMZ::lib/theme-and-appearance.zsh  
zinit snippet OMZ::plugins/colored-man-pages/colored-man-pages.plugin.zsh  
zinit snippet OMZ::plugins/sudo/sudo.plugin.zsh  
zinit snippet OMZ::plugins/extract  
    
zinit ice lucid wait='1'  
zinit snippet OMZ::plugins/git/git.plugin.zsh  
  
# alias 代理命令  
alias proxy="export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;export ALL_PROXY=socks5://127.0.0.1:1080"  
alias unproxy="unset https_proxy http_proxy all_proxy"  
  
# eza 别名  
# 带图标  
alias ls="eza --icons"  
# 文件详情  
alias ll="eza --icons --long --header"  
# 文件详情 包含隐藏文件  
alias la="eza --icons --long --header --all"  
# 显示文件详情并带git信息  
alias lg="eza --icons --long --header --all --git"  
# 关闭默认ls颜色  
DISABLE_LS_COLORS=true  
    
# 快捷清屏  
alias cls=clear  
  
# volta 环境变量  
export VOLTA_HOME="$HOME/.volta"  
export PATH="$VOLTA_HOME/bin:$PATH"  
  
# bat 配置文件路径  
export BAT_CONFIG_PATH="$HOME/.config/bat.conf"  
  
# ripgrep 配置文件路径  
export RIPGREP_CONFIG_PATH="$HOME/.config/ripgrep.conf"  
```  
