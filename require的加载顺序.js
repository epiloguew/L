// 1. require加载自定义模块(加载指定路径)
//  1.1 若加载路径省略文件后缀名：优先匹配目录下同名文件,若不存在则会匹配同名文件夹
//      1.1.1 文件夹中优先匹配package.json中main字段指定模块出口文件,若package.json不存在或main指定入口无法加载，则会尝试匹配文件夹中index.js，若都失败，则报告模块缺失
//
//  1.2 尝试 nodemon ./requirePathDemo/index.js
//      1.2.1
