const path = require("path");
//1.  匹配路径 './api' 目标 './apis.js'
const a = require(path.join(__dirname, "./api"));

console.log(a);

//2. 匹配路径 './api/apis' 目标 './api/apis/index.js'

const b = require(path.join(__dirname, "./api/apis"));

console.log(b);

//3. 匹配路径 './http' 目标 './http/tssss.js'

const c = require(path.join(__dirname, "./http"));

console.log(c);
