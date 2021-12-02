<p align="center">
<img src="https://raw.githubusercontent.com/tnfe/csijs/master/images/logo.png?raw=true" alt="logo" />
</p>

<br />
<p align="center">
  <h1 align="center">CSI.JS 重建犯罪现场</h1>
  <p align="left">
 CSI.JS是一个前端日志系统，它将错误信息记录于本地localStorage中。<strong>无任何依赖</strong>、无入侵性。使用<strong>非常简单</strong>，很容易引入你的系统中，而且不会造成任何影响。
它可以帮你快速重建犯罪现场。
    <br />
    <br />
  </p>
</p>
<div align="center">
<a href="https://www.npmjs.com/csijs" target="_blank"><img src="https://img.shields.io/npm/l/ffcreator.svg" alt="Package License" /></a>
<a href="https://github.com/prettier/prettier" target="_blank"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="Code Style"></a>
<a href="https://github.com/tnfe/csijs/pulls" target="_blank"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs"/></a>
<a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node-%3E%3D%208.0.0-brightgreen.svg" alt="Node Version" /></a>
</div>
<br />
<table>
  <tr>
    <th><h4 align="center"><h4 align="center">无入侵</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">轻量易用</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">功能强大</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">高性能</h4 align="center"></th>
  </tr>
  <tr>
    <td width="20%" align="center"><sub>丢上去不管，我们承诺永不入侵你的业务！</sub></td>
    <td width="20%" align="center"><sub>兼容各种系统，不管你使用的是jQuery、angular1/2、React、Vue，都可以使用它</sub></td>
    <td width="20%" align="center"><sub>完善的查错机制，截图预览、导出excel、直接上传到后台查看等</sub></td>
    <td width="20%" align="center"><sub>文件超小，Gzip 5k对你几乎毫无影响</td>
  </tr>
</table>

<p align="center">
<img src="https://raw.githubusercontent.com/tnfe/csijs/master/images/kefu.jpg" alt="kefu" />
</p>

![](https://raw.githubusercontent.com/tnfe/csijs/master/images/demo.gif)


## 一、快速开始

### 1、npm安装
```shell script
npm i csijs --save
or
yarn add csijs
```

### 2、使用
```javascript
import CSI from 'csijs';

// 示例：自定义上报
const csi = new CSI({
    feID: '', // 项目id，日志区分项目使用
    report: (lines) =>  {
        // todo 自定义你的上报逻辑
        console.log('error lins', lines);
    }, 
});

// 如果你想主动上报
csi.report();
```

## 二、日志查看

查看日志快捷键: Ctrl+6


## 三、本地开发

```shell
// 本地开发
npm run start
// 发布环境
npm run build
```

## 四、MR 流程

TNTWeb 团队会查看所有的 MR，我们会运行一些代码检查和测试，一经测试通过，我们会接受这次 MR，但不会立即发布外网，会有一些延迟。

当您准备 MR 时，请确保已经完成以下几个步骤:

1. 将主仓库代码 Fork 到自己名下。
1. 基于 `master` 分支创建您的开发分支。
1. 如果您更改了 API(s) 请更新代码及文档。
1. 检查您的代码语法及格式。
1. 提一个 MR 到主仓库的 `master` 分支上。

## 五、如何加入

我们十分期待您的任何贡献，无论是修复错别字、提 Bug 还是提交一个新的特性。

如果您使用过程中发现 Bug，请通过 [issues](https://github.com/tnfe/csijs/issues) 来提交并描述相关的问题，您也可以在这里查看其它的 issue，通过解决这些 issue 来贡献代码。

如果您是第一次贡献代码，请阅读 [CONTRIBUTING](https://github.com/tnfe/csijs/blob/master/contribution) 了解我们的贡献流程，并提交 Merge Request 给我们。

## 六、License
The MIT License (MIT). Please see [License File](https://github.com/tnfe/csijs/blob/master/LICENSE) for more information.
