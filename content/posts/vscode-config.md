---  
date: 2023-12-17  
series: Mac装机  
tags:  
  - computer  
title: VS Code 配置  
slug: vscode-config  
keywords: Vscode  
description: Vscode配置，Vscode插件  
lastmod: 2024-03-07  
share: true  
---  
  
### 插件  
  
- better-comments 高亮注释  
- vscode-tailwindcss tailwindcss 语法提示  
- codeium AI 代码提示  
- vscode-eslint eslint 语法校验  
- prettier-vscode prettier 代码格式化  
- todo-tree 记录 todo 标识  
- git-graph git 图形化显示提交信息  
- vscode-language-pack-zh-hans 编辑器中文  
- svg-preview svg 预览  
- vscode-stylelint css 语法校验  
- vscode-icons 图标  
- ~~volar vue 语法支持~~ 官方建议换成 Vue - Official  
- ~~vscode-typescript-vue-plugin vue typescript 支持~~ 在插件搜索 `@builtin typescript-language-features` 并启用该功能  
- material-theme 编辑器主题  
  
### 配置  
  
```JSON  
{  
  "workbench.colorTheme": "One Dark Pro Mix",  
  "workbench.iconTheme": "vscode-icons",  
  "editor.fontSize": 18,  
  "editor.fontFamily": "'Hack Nerd Font Mono', Menlo, Monaco, 'Courier New', monospace",  
  "editor.tabSize": 2,  
  "editor.guides.bracketPairs": true,  
  "editor.guides.bracketPairsHorizontal": true,  
  "editor.wordWrap": "on",  
  "editor.wordWrapColumn": 100,  
  "workbench.startupEditor": "none",  
  "terminal.integrated.cursorStyle": "line",  
  "[typescriptreact]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "[typescript]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "[javascript]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "[css]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "editor.fontLigatures": true,  
  "[jsonc]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "[json]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "[html]": {  
    "editor.defaultFormatter": "vscode.html-language-features"  
  },  
  "[javascriptreact]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "typescript.inlayHints.parameterNames.enabled": "all",  
  "typescript.inlayHints.parameterTypes.enabled": true,  
  "[vue]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "[scss]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "codeium.enableConfig": {  
    "*": true,  
    "xml": true,  
    "plaintext": true  
  },  
  "terminal.integrated.defaultProfile.windows": "PowerShell",  
  "git.suggestSmartCommit": false,  
  "terminal.integrated.fontFamily": "'Hack Nerd Font Mono', monospace",  
  "terminal.integrated.env.linux": {},  
  "window.restoreFullscreen": true,  
  "workbench.tree.indent": 16,  
    
  "audioCues.diffLineDeleted": "off",  
  "audioCues.chatResponsePending": "off",  
  "audioCues.diffLineInserted": "off",  
  "audioCues.diffLineModified": "off",  
  "audioCues.lineHasBreakpoint": "off",  
  "audioCues.lineHasError": "off",  
  "audioCues.lineHasFoldedArea": "off",  
  "audioCues.lineHasInlineSuggestion": "off",  
  "audioCues.noInlayHints": "off",  
  "audioCues.notebookCellCompleted": "off",  
  "audioCues.notebookCellFailed": "off",  
  "audioCues.onDebugBreak": "off",  
  "audioCues.taskCompleted": "off",  
  "audioCues.taskFailed": "off",  
  "audioCues.terminalCommandFailed": "off",  
  "audioCues.terminalQuickFix": "off",  
  "audioCues.volume": 0,  
  "accessibility.alert.format": "never",  
  "accessibility.alert.save": "never"  
}  
  
```  
  
*可打开编辑器的同步功能，直接同步自己的配置*  
