// 1. for in 遍历对象中的可枚举属性，并且会顺着原型链向上查找
function A() {
    this.a = 1;
}

A.prototype.b = 2;

let a = new A();

console.log(a); //-->实例a中会有属性 a:1

console.log(a.__proto__); //实例a的构造函数的原型对象上有属性b:2

for (let i in a) {
    console.log(i, "-->key", a);
    //会遍历出原型链上的属性
}

// 1.1 可枚举属性 enumerable：true，该属性才会出现在对象的枚举属性中，默认值为false
let enumerTest = {};

enumerTest.a = 112; //--> 添加属性

console.log(Object.getOwnPropertyDescriptor(enumerTest, "a"), "--->查看属性描述");
//添加的属性是可被枚举的enumerable:true

for (let i in enumerTest) {
    console.log(i, "--->key in enumerTest"); //for in可以遍历到
}

Object.defineProperty(enumerTest, "a", { enumerable: false });
Object.defineProperty(enumerTest, "b", { enumerable: true, value: 1234 }); //通过defineProperty添加或修改的属性需要设置描述符
console.log(Object.getOwnPropertyDescriptors(enumerTest), "--->查看所有属性描述");
//属性b的描述符configurable因为没有显示定义所有使用默认值false

for (let i in enumerTest) {
    console.log(i, "--->key in enumerTest after fix"); //-->只能遍历到属性b
}

enumerTest.__proto__.c = "1";

for (let i in enumerTest) {
    console.log(i, "--->key in enumerTest after add ");
}

Object.defineProperty(enumerTest.__proto__, "c", { enumerable: false, value: "!!!" });

for (let i in enumerTest) {
    console.log(i, "--->key in enumerTest after add and fix"); //属性c不可被枚举
}
// 1.1.1 默认值是使用Object.defineProperty 定义属性时的默认值
// 1.2 其余属性
//    1.2.1 configurbale：true,该属性的描述符才能够修改，同时该属性也能从对应的对象上被删除,默认值false
//    1.2.2 value,设置属性的值,默认undefined
//    1.2.3 writable:true,该属性的值才能被重写,默认值为false
// 1.3 Object.defineProperty(obj,prop,description),若prop在obj上不存在，则会创建一个新的属性

//2. for of 作用与可迭代对象，一个可迭代对象必须要实现Iterator接口
let arrIter = [1, 2, 3];

let objIter = {
    a: 1,
    b: 2,
    c: 3,
};

for (let i of arrIter) {
    console.log(i, "-->i of arrIter"); //-->被遍历结构的每一项
}
//for (let i of objIter) {
//报错
//}

//2.1 Iterator接口是为了给各个数据结构提供统一的访问机制
//2.1.1 具有Iterator接口的数据结构：Array、Map、Set、Arguments、NodeList、TypedArray、String
//Array
//Map
const mapIter = new Map([
    ["1", "a"],
    ["2", "b"],
    ["3", "d"],
]);
for (let i of mapIter) {
    console.log(i);
}
//Set
const setIter = new Set(["a", "b", "c"]);
for (let i of setIter) {
    console.log(i);
}
//arguments
(function () {
    for (let i of arguments) {
        console.log(i);
    }
})("a", "b", "v");
//String
for (let i of "HelloWorld") {
    console.log(i);
}
//TypedArray
//NodeList

//2.2Iterator接口 遍历时，会创建一个指针对象，调用指针对象的next()方法依次指向数据结构中的成员
//  2.2.1 调用next() 方法返回 {value：当前成员值,done:遍历是否结束}

const GenerIter = (arr) => {
    //-->模拟实现next()
    let index = 0;
    return {
        next() {
            return {
                value: arr[index++], //-->借用闭包每次调用时保持变量引用不被销毁
                done: index > arr.length,
            };
        },
    };
};

let iterOptions = ["a", "b", { c: 1 }];
let s = GenerIter(iterOptions);
for (let i = 0; i <= iterOptions.length; i++) {
    console.log(s.next()); //---> {value:当前项,done:遍历是否结束},done:true时value为undefined
}

//2.3 手动调用 Array.prototype.Symbol(Symbol.iterator)
let noAutoIter = iterOptions[Symbol.iterator](); //--> Symbol.iterator是一个函数
for (let i = 0; i <= iterOptions.length; i++) {
    console.log(noAutoIter.next()); //--->{value:Any|undefined,done:Boolean}
}

//2.4 Object没有默认Iterator接口，因为Object的哪个属性先遍历，哪个后遍历是不确定的，本质上，遍历器是一种线性
//处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换赋

//2.5 Iterator使用场合
//  对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator
//  扩展运算符 //TODO 对象的扩展运算符
//  yield、Array.from()
