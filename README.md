



### 二、问题背景
1. 传统前端业务通常会集成在一个站点上，随着业务复杂度上升，项目的包的体积就会变得很大。过大的代码集合还会发布频繁，比如某个业务模块升级会导致整个项目都跟着打包、测试和上线
2. 新项目需要整合多个老项目，项目之间技术栈不同，相同技术栈依赖版本也会不同
### 三、微前端概念
> 微前端架构是一种类似于微服务的架构，由 `ThoughtWorks` 2016年提出，它将微服务的理念用于浏览器端，即将 `web` 应用由单一的单体应用转变为多个小型前端应用聚合唯一的应用

所以微前端可以理解成把一个大的应用拆分成几个子应用，而且这些子应用可以独立运行、独立开发、独立部署。
![Untitled Diagram.png](https://i.loli.net/2021/01/21/p5DROHrTbsqgUhd.png)

### 四、qiankun
> qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。
