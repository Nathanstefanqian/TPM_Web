# macOS arm start



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

