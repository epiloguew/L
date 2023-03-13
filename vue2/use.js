// Vue.use 安装vue插件
//  若plugin 为 Object 需要提供install 方法
//  若plugin 为 Function 会被作为install
//      install调用时会传入Vue
//  Vue.use 需要在new Vue()之前调用
//  当install 方法被同一个插件多次调用，只会被安装一次
