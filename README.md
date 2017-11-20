# Damo中文文档
![brand](brand.png)

Damo是一套完整前端开发框架，通过JSX和JavaScript编译成JavaScript的语言，来构建客户端应用。

Damo框架包括前端应用开发所用到的一系列库，有些是核心库，有些是可选库。核心库引导你开发的各代码模块串通起来，使得应用可以正常启动和访问；可选库帮助你解决特定的业务逻辑问题或者编写更灵活的前端代码。

### Damo的特性与优点

#### →数据驱动

1. 可预测的状态容器

  Damo会把应用拆分成多个独立视图和视图渲染需要的状态数据（理解概念），应用的所有状态数据通过机制存储到单一的状态容器，这种机制就是使用响应式虚拟依赖状态图表，可以直观的理解和遇到应用每个视图的不同时刻的状态数据结构。

2. 状态驱动视图渲染

  视图需要渲染为特定状态，借助于Damo数据驱动模型，在状态容器中选定状态数据后，和视图建立连接成功后，从而驱动视图和状态数据进行渲染。

#### →生产效率

1. 模板即组件

  搭配组件框架React，一切模板都属于组件，模板结构以JSX语法进行开发（类HTML语法，所有HTML都属于JSX）。所以模板即组件，组件即HTML自定义标签，组件是包含了模板代码的一种特殊的HTML标签类型。

2. Damo CLI

  Damo提供了命令行工具，快速进入开发、调试和投建环节，最终部署整个应用。

#### →速度与性能

1. 代码拆分

  借助React-Router路由器以及CLI命令行工具，Damo可以实现快速加载。自动代码拆分机制可以让用户仅仅加载哪些用于渲染所请求页面的代码。

2. 安全与统一

  借助React的安全机制，解决应用构建遇到的安全问题。

  JavaScript虚拟机进行高度优化，轻松获得框架提供的高生产率，同时又能保留所有手写代码的优点。

#### →完整的开发故事

1. 整站解决方案

  Damo是应用开发的整套方案，包括目录结构、代码组织、组件开发、服务开发、状态管理等视图展示，同时提供实用的应用的特定模块的解决方案以及前后端开发模式的编程思路。

2. 前端先行

  借助于CLI和数据模拟套件，帮助你提前构建前端应用，无需等待数据接口就绪。在后续数据接口具备后，无缝切换到真实数据接口。

### 基础

1. 模板JSX，模板是React提供的JSX语法，使得开发者可以像编写HTML标签的方式来描述视图的结构。简单来解释的话，JSX就像是附加了几个特殊语法的HTML代码（比如：附加的{}是用来嵌套JSX子结构或者JavaScript表达式），了解JSX可参考React

2. 组件component，组件是包含了模板JSX的一种特殊自定义HTML标签。（组件是一种虚拟标签ShadowDOM，使用和HTML一样简单，其内部包含了真实的HTML结构）

3. 服务service，服务是一段特定的JS代码逻辑，不引用到外部的对象，可以单独执行。服务是用来完成一件特定的事情，比如表格数据的静态排序，那么这个服务实际上是在调用时传入表格数据，排序好后，返回新的表格数据，最终表格组件拿新的表格数据进行渲染。

### 概念

1. 状态state，状态是驱动组件的数据，包括接口数据、描述UI显示状态的数据、激活的页面路由等等，都可以是状态。

2. 状态容器store，store是应用全局唯一的数据缓存对象，渲染应用所需的所有状态数据state，都以一个对象树的形式储存在sotre。

3. 数据模型model, model和store建立连接后，向store写入状态数据，model描述state的初始化数据结构和定义了改变state值的方法。

4. 选择器selector, selector可以和store建立连接后，从中获取状态数据通过数据绑定到视图，从而驱动视图渲染和更新。

### 开发原则

1. 服务是通过JS完成一件特定的事情，对象、函数、类都可以是一个服务，编写服务是一个好的编码习惯，开发可复用的逻辑代码。

2. 单一的应用状态容器，状态数据储存在状态容器中，而状态数据的使用是通过数据绑定机制来完成。

3. 状态数据是单向流动的，Model -> Store -> Selector -> Component。

4. Selector是Component应用数据的一个控制类，包括数据获取以及数据产生的操作（由调用Model对应方法来产生数据）。

### 资料参考

1. [react](https://github.com/facebook/react), React是一个用于构建用户界面的JavaScript库，是一套高性能的组件框架。
2. [redux](https://github.com/reactjs/redux), Redux可以理解为Flux模式的一种实现，弱化了dispatcher的概念，强化了reducer概念。Redux是JavaScript状态容器，对应用提供可与预测化的状态管理。
3. [react-router](https://github.com/reactjs/react-router), ReactRouter是一套路由管理方案
4. [history](https://github.com/mjackson/history), History是浏览器history增强库，更好管理H5的路由状态。
5. [redux-react-router](https://github.com/reactjs/react-router-redux), Redux和Rrouter结合的一个库。
6. [reselect](https://github.com/reactjs/reselect), 对Redux状态数据进行二次缓存和读取，减少不必要的数据驱动更新行为。
7. [recompose](https://github.com/acdlite/recompose), Hoc的封装工具类库。
8. [rxjs](https://github.com/ReactiveX/rxjs), RxJS是基于响应式编程实现的JavaScript高性能库，提供管理复杂异步应用非常优秀的方案，RxJS是一个包含丰富数据变换的函数库。
9. [events](https://github.com/Gozala/events), 事件驱动器。
10. [react-intl](https://www.npmjs.com/package/react-intl), 基于intl的国际化。
11. [seamless-immutable](https://www.npmjs.com/package/seamless-immutable), 封装不可变的数据接口，使得Redux的状态数据更加可靠。
12. [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch)），通过ES的fetch接口来调用接口，更加规范和高性能。
13. 异步路由 - https://segmentfault.com/a/1190000006063554


2. multi app
3. Api, uri , ?
4. view precallback
5. routes
6. routesMap


6. ts
7. css-module -> cheap-module-eval-source-map
8. require.ensure
