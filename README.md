



### 一、问题背景
1. 传统前端业务通常会集成在一个站点上，随着业务复杂度上升，项目的包的体积就会变得很大。过大的代码集合还会发布频繁，比如某个业务模块升级会导致整个项目都跟着打包、测试和上线
2. 新项目需要整合多个老项目，项目之间技术栈不同，相同技术栈依赖版本也会不同
### 二、微前端概念
> 微前端架构是一种类似于微服务的架构，由 `ThoughtWorks` 2016年提出，它将微服务的理念用于浏览器端，即将 `web` 应用由单一的单体应用转变为多个小型前端应用聚合唯一的应用

所以微前端可以理解成把一个大的应用拆分成几个子应用，只要可以独立运行、独立开发、独立部署、独立完成一些功能就是一个微应用，不管这些微应用是否具有路由功能。
![Untitled Diagram.png](https://i.loli.net/2021/01/21/p5DROHrTbsqgUhd.png)

### 子应用加载流程
如果我们在主应用里面注册了子应用A，激活规则为`/a`,当我们在地址栏输入`/a/home`时，实际上需要先加载主应用，主应用检测到是`/a`打头的路由，于是去加载应用A，应用加载完以后此时应用A接管了路由，它发现后面的路由是`/home`,于是显示出`/home`的正确页面，整个应用才算加载完成。


### 三、qiankun
qiankun 是一个生产可用的微前端框架，它基于 single-spa，具备 js 沙箱、样式隔离、HTML Loader、预加载 等微前端系统所需的能力。qiankun 可以用于任意 js 框架，微应用接入像嵌入一个 iframe 系统一样简单。

#### js 沙箱
如果不做隔离的话多个子应用之间共享一个全局环境，比如某个应用对全局的API进行重写或者操作同一个全局属性，此时子应用可能就跑不下去了，所以JS沙箱大部分情况下还是有必要的。以下是沙箱实现的两种方式：
1. 在子应用`mount`时对当前全局window做一个快照，`unmount`时把当前window与快照进行对比，把它恢复回原来的全局状态，[快照沙箱实现](https://github.com/umijs/qiankun/blob/master/src/sandbox/snapshotSandbox.ts#L20)

2. ES6的 Proxy 代理，通过劫持 window 子应用对全局环境的一些修改，在子应用往 window 上添加、修改、删除属性时会执行对应的handler，每个子应用的window是一个假的window(fakeWindow)对象 在子应用`unmount`的时候执行以下反向操作即可。[Proxy文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，[proxy沙箱实现](https://github.com/umijs/qiankun/blob/master/src/sandbox/proxySandbox.ts#L128)

沙箱被创建完以后我们的子应用代码是如何被执行的呢？答案是我们子应用的scripts被主应用用 `fetch` API请求获取，拿到代码文本之后在文本外面包括一层立即执行的函数代码，这样我们在代码中访问的window实际上是这个函数的参数名而已，[源码实现片段](https://github.com/kuitos/import-html-entry/blob/master/src/index.js#L61)：
``` javascript
`;(function(window, self, globalThis){
  // 这里是我们子应用的script text
}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`
```
> 这样不管你在子应用全局环境下的this、window、self、globalThis都是指向这个代理的fakeWindow对象了
#### 样式隔离
社区上讨论的隔离方案有BEM、CSS Modules、 CSS-in-js
- BEM 简单来说就是不同项目之间约定一个前缀后者命名规则，[对应介绍](https://segmentfault.com/a/1190000009953887)
- CSS Modules 如果是webpack项目在使用`css-loader`时开始modules选项就行，[对应介绍](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)
- CSS-in-js 简单来说就是CSS 和 jS 编码在一起， [对应介绍](https://zhuanlan.zhihu.com/p/103522819)

但是`qiankun`做处理的时候是使用以下两种方式：
- 使用Shadow DOM是创建一个DOM节点作为Shadow host，并把子应用html text作为该host的内容，[Shadow DOM介绍](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)
- 动态创建样式表对应的Style节点，并挂载在子应用挂载节点下，因为应用unmount的时候子应用内的DOM树会被移除，这其实只是解决了子子应用之间的样式隔离问题，且是单应用模式下。今天分享的都是单应用模式，qiankun2.0现在支持多应用模式

#### HTML Loader
HTML Loader解决的是子应用如何选择的问题，也就是说它使用html作为子应用的入口，基座应用于子应用解耦，因为这样子应用可以单独运行、独立部署。还有一种方式是通过js作为子应用入口，不过这种方式依赖基座应用提供挂载点，这样子应用的独立性就不高了。html loader大致工作流程如下：
1. fetch 请求入口html文件
2. 解析html文本获取所有的资源信息（css、script）
3. fetch 请求所有css
4. 判断是否使用
> 对于已经下载的资源内部会做一个缓存



### 基座应用配置

```shell
 yarn add qiankun 
```

- 在入口文件注册子应用

```javascript

registerMicroApps([
  {
    name: 'react',
    entry: '//localhost:30001',
    activeRule: '/react',
    container: '#sub-app'
  },
  {
    name: 'vue',
    entry: '//localhost:30002',
    activeRule: '/vue',
    container: '#sub-app'
  }
])
```



### 微应用配置

1. 在入口文件中导出`bootstrap` 、`mount`、` unmount`三个异步函数生命周期钩子以供主应用适当时机调用

2. webpack 打包配置

   ```javascript
   {
       devServer: {
         headers: {
           'Access-Control-Allow-Origin': '*'
         }
       },
       output: {
         library: 'vue',
         libraryTarget: 'umd'
       }
     }
   ```

3. webpack 运行时 publicPath 配置

   ```javascript
   if(window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
   }
   ```

4. 独立运行微应用

   ```javascript
   if(!window.__POWERED_BY_QIANKUN__) {
     render()
   }
   ```

   

