// class & style 动态绑定
//   class 对象语法
//      :class="{ active:if }" --> className active是否存在取绝于property if的 truthiness
//      :class="cla"
//          data(){
//              return { cla:{active:true} }
//          }
//      :class='Computed'
//      :class 可以与 class共存
//  class 数组语法
//      :class='[activeClass,errorClass]'  data:{ activeClass:'active',errorClass:'error'}
//      :class='[is?activeClass:errorClass]'
//      :class='[{activeClass:true},errorClass]'
//  class 用在组件上 在一个自定义组件上使用class property， class将被添加到该组件的根元素上(排在原有class后)，根元素上已经存在的class不会被覆盖，
//
//  style 对象语法
//      :style='{color:attr,"font-size":font+'px'}' -->css属性名使用camelCase或kebab-case但kebal-case需要使用引号
//  style 自动添加前缀 使用需要添加浏览器引擎前缀的css property时，会自动添加
//  style property提供一个包含多个值的数组
//      :style="{display:['-webkit-box','-ms-flexbox','flex]}" --> 只渲染数组中最后一个被浏览器支持的值
