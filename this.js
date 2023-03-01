//关于this的指向问题
// 1. 每个函数本身都有自己的this指向 ：函数的独立调用中this指向window（全局对象）
//  1.1 严格模式下 函数内的this 指向undefined，函数的独立调用this也指向undefined，但有调用者this将会返回
// 2. 默认绑定规则 this === window / global
//  2.1 非函数作用域中由var定义的变量，等同于window的变量，但global不会
(function () {
    console.log(this);
    // console.log(global );
    // console.log(this === global );
})();

// 3. 隐式绑定规则：谁调用，就指向谁
//  3.1 方法在赋值时会出现隐式丢失
//  3.2 父函数可以决定子函数的this指向
let objFather = {
    s: "this is father",
};
(function () {
    let obj = {
        s: "obj",
        a() {
            console.log(this);
        },
    };
    //obj.a(); //调用方法a() this指向对象obj
    let s = obj.a; // 隐式丢失,obj.a 被赋值后，与obj再无关系
    s(); //调用方法 s() this遵守默认绑定规则 指向全局对象
    s.call(this); //指向objFather
}.call(objFather));

// 4. 显式绑定 ：call、bind、apply
//  4.1 若传入的第一个参数不是对象，取该值的包装类，undefined或null取window
(function () {
    let obj = {
        a: "this is X",
        b(e, s) {
            console.log(e, s, "e");
        },
    };
    function a(e, s) {
        console.log(this);
        this.b && this.b(e, s);
    }
    a(); //函数的独立调用 全局
    a.call(obj, 1, 2); //obj
    a.apply(obj, [1, 2, 3, 4]);
    let s = a.bind(obj, 1, 2, 4, 5, 6); //bind 传参与call 相同
    s();
    a.call(1, 1, 2);
    a.call(true, 1, 2);
    a.call("1", 1, 2);
    a.call(undefined, 1, 2);
    var ddd = "glgl";
    // console.log(global.ddd);
})();

function d() {
    "use strict";
    return this;
}
let dd = {
    s: 1,
};
console.log(d.call(globalThis));
