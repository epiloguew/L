//  directive
//对普通dom进行底层操作
//形式v-注册指令名
//形参除了el外都是只读
//钩子函数间通信建议使用dataset
//Vue.directive(event,options) options需要提供一个Object ，但也可以直接传入function，会被作为update和bind
//  等同于 {bind(){},update(){}}
