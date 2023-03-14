// Vue.watch
//  当需要在数据变化时执行异步或开销较大的操作时
//  Vue实例会在实例化时调用$watch，遍历watch对象的每一个property
//  key需要观察的表达式，value是对应的callback，也可以是方法名或者包含选项的对象。
/*      watch:{
            a:(){},
            b:'someMethods',
            c:{
                handler(){},
                deep:true
            },
            d:{
                handler:'someMethods',
                immediate:true
            },
            e:[
                'someMethods',
                function hd(){},
                {
                    handler(){}
                }
            ],//回调数组，将会被逐一调用
            "e.f":(){} //-> watch vm.e.f 
        }   
*/
