# macOS arm start





## 2023.2.15更新

这次将threejs加载到vue项目里

实现了基本功能，并且针对我vscode的环境，自己配置了eslint+prettier代码美化的方案

目前todo问题：

位于src/views/maintain/plan/detail.vue 

在跳转detail页面时，不能在dom挂载后正常运行threejs相关函数语句



## 2023.2.03更新

**node版本为14.21.2**

如果已经有高版本node 需安装nvm  进行node版本控制进行切换

```shell
nvm install 14
nvm use 14
npm i
npm run dev
```
 如果安装过程遇到如下报错

```shell
npm ERR! /usr/local/bin/git ls-remote -h -t git://github.com/adobe-webplatform/eve.git
```

配置一个全局的字符串替换

```shell
git config --global url."https://".insteadOf git://
```

