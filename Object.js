//静态方法

//Object.assign 将所有可枚举的自有属性从一个或多个源对象复制到目标对象，返回修改后的对象
//TODO 可枚举的自有属性
//TODO 该方法会调用源对象的get 和 目标对象的set
//TODO 赋值期间出错，抛出异常前的属性依旧会修改target
//TODO 原型链的属性不受影响
(function () {
    let obj = {
        a: 1,
        b: 2,
        c: 3,
    };
    let newObj = Object.assign(obj, { a: "1234", d: 5 });
    //console.log(obj, "-->target "); //->{a:"1234",b:2,c:3,d:5} Object.assign源对象会合并目标对象，若源对象中属性不存在则会合并，若存在则会覆盖
    //console.log(newObj, "-->new "); //->{a:"1234",b:2,c:3,d:5} Object.assign返回修改后的对象
    let os = {};
    Object.defineProperties(os, {
        a: {
            enumerable: false,
        },
        b: {
            enumerable: true,
            get() {
                console.log("assign --->");
            },
        },
    });
    console.log(Object.assign({}, os)); //属性a不会被合并到target，属性b的getter被触发
})();

//Object.create 创建一个新对象，使用现有的对象来作为新对象的原型(prototype)
(function () {
    // Object.create(proto,propertiesObject)
    let obj = Object.create(null, {
        a: { value: 1, enumerable: false },
    }); //null 将不会从Object.prototype继承任何对象方法
    obj.toString = Object.prototype.toString; //为以null为原型的对象添加方法；但此方法是对象自身的方法而非继承因为没原型
    Object.defineProperty(obj, "b", {
        value: 2,
        enumerable: false,
    });
    console.log(obj);
})();

//Object.definePerporty 直接在一个对象上定义一个新属性或修改一个对象的现有属性，并返回此对象
//TODO Object.defineProperty是定义key为Symbol的属性的方法之一
//属性描述符分两种形式：数据描述符（描述属性值、是否可枚举、是否可被等号赋值重新、描述符是否可修改i），存取描述符（get、set）
//  value或writable 和get或set不能同时拥有，描述符只能是数据或存取之一，不能同时两者
// 使用点运算符创建属性时，writable、configurable、enumerable均为true，并不遵守defineProperty的默认值
(function () {
    let obj = Object.create(null);
    //Object.defineProperty(obj,property,descriptor)
    let objs = Object.defineProperty(obj, "a", {
        // value: "",
        enumerable: true,
        configurable: true,
        // writable: true,
        get: () => {
            // console.log(123);
        },
        set(e) {
            this.b = e;
            // this.a = 12;
            console.log(e, "3");
        },
    });
    //若对象obj不存在property a 则会创建,并且未显示声明的描述符会被赋默认值，修改属性不会
    //数据描述符 value、enumerable、configurable、writable
    //存取描述符 configurable、enumerable、get、set
    let v = objs.a; //-->会调用getter
    objs.a = 1; //-->调用setter
    console.log(objs, "33"); //存取描述符无法赋值，没有属性value和writable，只能做代理作用
})();

//Object.defineProperties

//Object.entries 返回给定对象自身可枚举属性的键值对数组
//  排列顺序与for in一致 //TODO for in顺序
//  不会找原型链上的属性
(function () {
    function A() {
        this.a = 1;
        this.b = 2;
    }

    A.prototype.c = 3;

    let a = new A();
    Object.defineProperty(a, "d", {
        enumerable: false,
    });
    console.log(Object.entries(a)); //->[['a',1],['b',2]]
    //搭配for of使用
    for (let i of Object.entries(a)) {
        let [key, value] = i;
        console.log(key, value);
    }
    //快速转换map
    const map = new Map(Object.entries(a));
    console.log(map);
})();

//Object.freeze 冻结一个对象
//  不能向此对象添加新的属性
//  不能删除已有属性
//  不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值
//  TODO冻结一个对象后，该对象的原型也不能被修改
//  freeze()返回和传入的参数相同的对象，而不是一个冻结的拷贝
//数据也可被冻结
(function () {
    let obj = {
        a: 10,
        b: "1111",
    };
    Object.freeze(obj); //-->冻结obj
    obj.a = 20;
    console.log(obj, "---> a not change");
    // Object.defineProperty(obj, "b", {
    //     enumerable: false,
    // }); ---> 描述符属性不可修改

    let arr = [1, 2, 34];
    Object.freeze(arr);
    arr[0] = 10;
    console.log(arr, "---> arr[0] not change");

    //若属性为引用类型，触发显示冻结，否则依旧可以修改
    let objZ = {
        obj: {
            a: 1,
        },
    };
    Object.freeze(objZ);
    objZ["obj"]["a"] = 1000;
    console.log(objZ, "-->objz.obj.a change");
    Object.freeze(objZ.obj);
    objZ["obj"]["a"] = 2221000;
    console.log(objZ, "-->objz.obj.a not change");
})();

//Object.fromEntries 接收一个键值对的列表参数，并返回带有键值对的新对象
//  Object.fromEntries 与 Object.entries 互逆
(function () {
    let arr = [
        [1, 0],
        [2, 1],
        [320, 8],
        ["asdfasdfasfs", 0],
    ];
    let map = new Map(arr);
    console.log(Object.fromEntries(map), "map -> object");
    console.log(Object.fromEntries(arr), "arr -> object");

    //对 Object 进行数据加工
    let obj = {
        a: 10,
        b: 22,
        c: 33,
        d: 3,
        e: 130,
    };
    let news = Object.fromEntries(Object.entries(obj).map((item) => [item[0], item[1] * 10 + "ADFG"]));
    console.log(news, "after map -> news");
})();

// Object.getOwnPropertyDescriptor 返回指定对象上自有属性对应的属性描述符
//  自有属性是指直接赋予该对象的属性，不需要从原型链上进行查找
//  若属性不存在则返回undefined
(function () {
    function A() {
        this.a = "!!!!";
    }
    A.prototype.b = "@@@@@";
    let a = new A();
    Object.defineProperty(a, "c", { value: "$$$$" });
    // console.log(Object.getOwnPropertyDescriptor(a, "a"), "a.a ->description");
    // console.log(Object.getOwnPropertyDescriptor(a, "b"), "a.b ->description");
    // console.log(Object.getOwnPropertyDescriptor(a, "c"), "a.c ->description");
})();

// Object.getOwnPropertyNames 返回一个由指定对象的所有自身属性的属性名组成的数组
//TODO  包括不可枚举属性
//  不包括Symbol值作为名称的属性
(function () {
    //arr 会有length属性
    let arr = [1, 2, 3];
    console.log(Object.getOwnPropertyNames(arr), "arr -> getOwnPropertyNames");
    //obj
    let obj = Object.create(null, {
        a: {
            value: "qqq",
            enumerable: true,
        },
        b: {
            value: "nono",
            enumerable: false,
        },
    });
    console.log(Object.getOwnPropertyNames(obj), "obj -> getOwnPropertyNames");
    //enumerable false 也被查出来
})();

////TODO Object.getOwnPropertySymbols

// Object.getPropertyOf 返回对象的原型(实例构造函数的原型对象)
(function () {
    function A() {
        this.a = "!!!!";
    }
    A.prototype.b = "@@@@@";
    let a = new A();
    console.log(Object.getPrototypeOf(a), "getPrototype a");
    console.log(Object.getPrototypeOf(a) === a.__proto__, "===a.__proto__");
    console.log(Object.getPrototypeOf(a) === A.prototype, "===A.prototype");
})();

// Object.is 判断两个值是否为同一个值
//  NaN与NaN是一个值，但在Set中NaN!==NaN
//  满足以下任意条件两个值相等：1.都是undefined；2.都是null；3.都是true或false；4.都是长度相等、字符相同、按相同顺序排列的字符串；5.都是相同对象(都是同一个对象的值引用)；6.都是数字且都是+0或-0或NaN或都是一个值非零且都不是NaN
//  Object.is 与 == 不同，不会强制转换两边的值
//  Object.is 与=== 不同，差别在对待有符号的0和NaN，

// Object.isExtensible 判断一个对象是否可拓展的(是否可以添加新的属性)
//  默认情况下，对象是可拓展的，可以为它添加新的属性，已经__proto__上的属性可以被更改
//  Object.preventExtensions、Object.seal、Object.freeze 可以标记一个对象为不可拓展
//  密封对象是不可扩展的 seal
//  冻结对象是不可扩展的 freeze
(function () {
    //新对象默认是可拓展的
    let obj = Object.create(null, {
        a: {
            enumerable: true,
            value: 1,
        },
    });
    console.log(Object.isExtensible(obj), "new obj ->");
    //修改为不可扩展
    Object.preventExtensions(obj);
    console.log(Object.isExtensible(obj), "change obj ->");
    obj.b = 1;
    console.log(obj, "add b obj ->");
})();

// Object.isFrozen 判断一个对象是否被冻结
//  一个对象是冻结的指它不可扩展，所有属性都是不可配置的，且所有数据属性(数据描述符)都是不可写的(不可修改？)
//  一个不可扩展的对象空对象也是一个冻结对象
//  一个非空对象默认也是非冻结的
(function () {
    //一个对象默认是可扩展的，也是非冻结的
    let obj = Object.create(null, {
        a: {
            enumerable: true,
            value: 1,
        },
    });
    console.log(Object.isFrozen(obj), "ifFrozen");

    //一个不可扩展的对象空对象也是一个冻结对象
    console.log(Object.isFrozen(Object.preventExtensions({})), "isExtensible empty obj");

    //一个非空对象默认也是非冻结的
    console.log(Object.isFrozen({ a: 1 }), "not empty obj");

    //TODO  nmgbd这么多判断条件
})();

// Object.isSealed 判断一个对象是否被密封
//  密封是指那些不可扩展的，且所有自身属性都不可配置且因此不可删除(但不一定是不可写)的对象
(function () {
    //一个新对象默认不是密封的
    let obj = {};
    console.log(Object.isSealed(obj), "isSealed ->");
    //将一个空对象变得不可扩展，同时也成为一个密封对象
    console.log(Object.isSealed(Object.preventExtensions(obj)), "to isEx");
    //若转变为不可扩展对象的不是一个空对象，则不会变为密封对象，因为密封对象得所有自身属性必须是不可配置的
    //如果将对象中的属性变为不可配置的，则该对象变为密封对象
})();

// Object.keys 返回一个由给定对象的自身可枚举属性组成的数组
//  keys -> 自身可枚举
//  getOwnPropertyNames -> 自身可枚举和不可枚举属性
//  for in -> 自身以及原型链上可枚举属性

////TODO Object.preventExtensions

////TODO Object.seal

// Object.setPrototyoeOf 设置一个指定的对象到另一个对象的__proto__或null
(function () {
    class A {
        constructor() {
            this.a = 10;
        }
        a() {
            return 1;
        }
    }
    let a = new A();
    let s = {};
    Object.setPrototypeOf(s, a);
    console.log(s.__proto__.a);
})();

// Object.values 返回一个给定对象自身的所有可枚举属性值的数组

//实例属性

// Object.prototype.constructor 指向Object构造函数

// Object.prototype.__proto__ 但Object实例化时，使用该对象作为实例化对象的__proto__
