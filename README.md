## 一、项目初始化配置
#### 配置别名 
- 配置：直接在 `build/webpack.base.conf.js` 中配置

- 别名有：`@  @icon @img  @css  @com  @pages  @js  @api  @store`

#### 使用vuex
- 配置：
1、安装 `npm i vuex`。
2、在src目录下创建store目录，创建index.js文件，并创建modules目录（根据需要创建文件，建议变量用getters导出，方法用actions导出）。
3、在根main.js中引入，如下
```
import store from '@store/index'
Vue.prototype.$store = store
```

- 使用方法：
在vue页面按需引用，利用 `mapGetters mapActions` 使用相关变量或方法。
在vue页面全局引用，在 `src/common.js` 中用方法1导入相关vuex变量或方法，再在vue页面直接使用 this.xxx 即可
在js文件先引入 `import store from '@store/index'` ，然后通过 `store.state.xxx  store.getters.xxx  store.dispatch(xxx, params)  store.commit(xxx, params)` 使用即可

#### 引用UI库 vant weapp（也可其他UI库，如iViewUI weapp、colorUI ...） 
- 使用方法：
1、安装 `npm i vant-weapp`。 
2、将组件库复制到static目录下，并更改该目录名称如vant。
3、在所需使用的页面的json文件中配置组件（也可全局配置）`{ "van-button": "/static/vant/button/index" }`。
4、直接在页面使用 `<van-button type="primary">测试按钮</van-button>`

#### css预处理使用 scss （mpvue默认将1px转为 0.5rpx）
- 安装sass-loader和node-sass `npm i sass-loader@7.3.1 node-sass` 

- 并设置公共类名 
1、安装sass-resources-loader `npm i sass-resources-loader` 
2、在 build/utils.js中配置，具体百度，如配置的全局样式为style.scss，则在该文件中写公共类即可
3、使用全局类需要在页面使用需在页面中添加 `<style lang="scss"></style>`
- 使用自定义图标 `白色 #ffffff  灰色 #b2b2b2  红色  #FA5151  绿色 #19be6b  蓝色 #1989FA `

#### 自定义配置http.js请求文件
- 配置：
1、在src/utils目录下新建http.js文件，利用小程序原生方法进行自定义封装
2、方法：包括 `get(带token)  getPub(不需要token)  getExt(请求外部接口)  post(带token)  postPub(不需要token)  postExt(请求外部接口) `
3、在Vue原型链中新增$http
```
import store from '@store'
Vue.prototype.$store = store
```

- 使用方法：
在vue页面，直接使用（xxx为get  getPub  getExt  post  postPub  postExt） `this.$http.xxx(url, data, config)` 
在js文件，先引入http.js文件，再使用 `http.xxx(url, data, config)`

#### 设置公共方法和全局方法
- 在Vue原型链添加方法，`$tools  $http  $toast  $showLoading  $hideLoading  $confirm  $alert` 如：常用js方法 tools.js，http.js请求封装，自定义交互方法（toast  showLoading  hideLoading  confirm  alert）

- 设置全局变量或方法 配置 common.js，然后在main.js中引用 
```
import common from '@/common'
Vue.use(common)
```

#### 组件
- 组件直接在components目录下创建，然后在页面中引入后使用即可，mpvue暂不使用全局组件

#### 路由、使用微信原生方法
**js方法路由跳转**
- `wx.navigateTo({url, events, success, fail, complete})` 页面跳转，events可以设置监听在下一个页面动态更改本页面的数据

- `wx.redirectTo({url, success, fail, complete})` 替换

- `wx.navigateBack({delta, success, fail, complete})` 后退

- `wx.switchTab({url, success, fail, complete})` 关闭所有非tabBar页面后跳转到tabBar页面

- `wx.reLaunch({url, success, fail, complete})` 关闭所有页面后跳转到新页面

- **注意：**参数以查询参方式放在url（其中switchTab不能传参），`redirectTo` 和 `navigateTo` 不能直接跳到tabBar页面

**组件方法时跳转**
- `<navigator></navigator>` 跳转，具体看官网

#### 常用插件
- dayjs时间处理，
配置：在main.js全局引入 `import dayjs from 'dayjs';  Vue.prototype.dayjs = dayjs` 
使用方法：1、在vue文件直接通过 `this.dayjs()` 使用即可。2、在js文件，先引入 `import dayjs from 'dayjs'` ，再使用 `dayjs()` 。具体方法看官网。


## 二、小程序开发注意事项
- {{}}表达式只能做简单的运算符运算（+ - * % ?: ! == === > < [] .），函数，复杂表达式，过滤器等均不可用，可用computed代替

- 不能使用ref

- 在模板中，只有事件可调用methods的方法

- style class 绑定对象或数组直接写在模板中，不支持对象变量，或者在computed中计算

- 使用v-for必须制定index，不使用template做循环，如 `<li v-for="(item, index) in list">item</li>`

- `<input />` 和 `<textarea />` 的change事件会转为blur事件，没有键盘事件

- 表单组件推荐使用小程序原生的表单组件

- 图片，插件等尽量按需引入，避免应用过大

- 小程序原生API封装在 wx 可直接使用，page 事件封装在 this.$mp.page 中

- 左侧为WEB事件 : 右侧为对应的小程序事件
```
{
    click: 'tap',
    touchstart: 'touchstart',
    touchmove: 'touchmove',
    touchcancel: 'touchcancel',
    touchend: 'touchend',
    tap: 'tap',
    longtap: 'longtap',
    input: 'input',
    change: 'change',
    submit: 'submit',
    blur: 'blur',
    focus: 'focus',
    reset: 'reset',
    confirm: 'confirm',
    columnchange: 'columnchange',
    linechange: 'linechange',
    error: 'error',
    scrolltoupper: 'scrolltoupper',
    scrolltolower: 'scrolltolower',
    scroll: 'scroll'
}

```



## 三、小程序问题及解决方法
**设置及使用全局变量或方法？**
- 使用 `vuex` 存放公共变量、方法

- 在 `src/common.js` 定义，直接定义全局变量或方法（只适合vue文件），然后在vue文件中全局使用即可

- 使用 `wx.setStorage({key:"key", data:"value" })` 存放持久数据（vue和js文件均可）

**页面路由跳转及参数传递？**
- 路由跳转：使用小程序原生路由跳转方法，先在根文件app.json中定义路由路径，然后在页面中可以使用 `<navigator>` 标签跳转，也可以使用js方法跳转 `wx.navigateTo  wx.redirectTo  wx.navigateBack  wx.switchTab  wx.reLaunch` 。

- 给跳转目标页面传递参数：直接在url后面通过查询参方式传递参数，然后在目标页面的onLoad(options)生命周期中获取参数；使用vuex；使用 `wx.setStorage({key:"key", data:"value" })` 。

- 返回上一页传递当前页数据
跳转前在 `wx.navigatorTo({url, events})` events定义监听更改本页面数据方法，如： `events: {test(age) { this.setData({age: 18}); console.log(age) }}` 然后在目标页面 `const eventChannel = this.$mp.page.getOpenerEventChannel();  eventChannel.emit('test', 18);` 合适的地方进行更改即可。
直接在目标页通过getCurrentPages获取历史栈更改数据，`let pages = getCurrentPages();  let prePage = pages[pages.length - 2];  prePage.setData({ age: 18 }); ` 。
通过vuex 。
通过 `wx.setStorage({key:"key", data:"value" })` 。



## Build Setup
``` bash
#### 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

#### 安装依赖
yarn

#### 开发时构建
npm dev

#### 打包构建
npm build

#### 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

#### 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

#### 生成 bundle 分析报告
npm run build --report
```