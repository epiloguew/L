// Vue.component 注册或 获取全局组件
//  Vue.component(id,[definition])
//      若组件无显示声明name属性，则会自动给定id设置组件的name
//
//  Vue.component('my-component',Vue.extend({})) 注册组件，传入一个扩展过的构造器
//  Vue.component('my-component',{}) 注册组件，传入一个选项对象，自动调用Vue.extend
//  var MyComponent = Vue.component('my-component') 获取注册的组件(始终返回构造器)
