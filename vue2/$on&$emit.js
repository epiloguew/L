//$on $emit $off $once

//$on(event,callback)
//  event string --> 要监听的事件名
//  event Array<string> --> 以数组形式监听多个事件名
//  同一个事件名，可以通过多次调用$on注册多个callback,执行顺序为注册顺序

//$emit(event,options)
//  event string --> 触发的事件名称
//  options any --> 传递给callback的options

//$off([event,callback]) 移除自定义事件监听器
//  如果没有提供参数,移除所有事件
//  如果只提供事件名,移除该事件所有的监听器
//  如果同时提供了事件与回调，只移除此回调的监听器

//$once(event, callback) 监听一个自定义事件 ，只触发一次，触发后监听器就会被移除
//
