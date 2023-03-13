// Vue.extend 使用基础Vue构造器 创建一个子类 参数是一个包含组件选项的对象
//  Vue.extend(options)
//      options 中 data 需要一个funtion return {}
//  Vue.component 中也会调用 Vue.extend 区别在于 Vue.extend 需要 new 并使用$mount进行挂载
//  主要作用就是生成组件的构造函数VueComponent
//      将Vue构造函数的options和Vue.extend 的options合并 实现继承
//  el 和 $mount
//      作用都是讲实例化后的vue 挂载到(替换)指定的dom元素
//      在实例化vue的时候指定el，则会渲染在此el对应的dom中，若没有，vue实例则会处于一种未挂载的状态，需要$mount来手动执行挂载
//      换句话说，$mount的作用就是将'未挂载'状态中的vue实例挂载到指定的dom元素
//      el只能在使用new 创建实例时使用
//          若render函数和template property都不存在，挂载dom元素的html会被提取出来用作模板，此时必须使用Runtime+Compiler构建的Vue库
