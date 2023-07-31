# 云手机H5

## 开发指南

```bash
# 安装依赖
npm install

# 启动服务 
npm run serve

# 打包构建
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Vue 开发风格

[参考 vue 风格指南](https://cn.vuejs.org/v2/style-guide/)

1. 单文件组件的文件名(.vue 文件)应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。这个项目中，我们约定采用 PascalCase 写法。
2. vue 组件/实例的选项顺序（推荐写法）：name  => components  =>  props  =>  data  =>  created  =>  mounted  =>  activited  =>  update  =>  beforeRouteUpdate  =>  computed  =>  methods
3. 通用组件统一放在 src/components 文件夹，非通用组件放在引用页面的文件夹中
4. vue页面放在 src/views 文件夹中
5. 全局的样式文件放在 src/styles文件夹中


## 提交格式

提交 commit 需要说明改动类型。常用的修改类型包括：

```
feat：新功能（feature）
fix：修补bug
docs：文档
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

例子：
```
feat: 新增活动入口
```


## 代码规范


```
  全局接口调用统一使用 api/getData 内的方法，不能直接将接口请求的url路径写在业务层中，接口层只处理请求头，data以及少量特例话请求回调信息，
  若回调处理较多，请另外封装文件至 dataProcessor 目录。
  后续如果有特性功能模块请新建对应文件存放其接口请求
```