// Slot
//  父级模板里所有的内容都是在父级作用域中编译的，子模版里的所有内容都是在子作用域中编译的
//  具名插槽 <slot name=''></slot>
//      无显示指定attribute name 则默认为 name='default'
//      <slot name='header'></slot> <template v-slot:header></template> <template v-slot:default></template>
//      v-slot 只能添加在<template>上,除非只存在默认插槽，组件的标签才可以被当作默认插槽的模板使用，v-slot可以直接用在标签上
//  作用域插槽
//      让插槽内容能够访问子组件中才有的数据，需要使用插槽prop
//      <slot :user='user'></slot>  <template v-slot:default='{user}'></template>
//  动态插槽名 <template v-slot:[dynamicSlotName]></template
//  具名插槽简写 v-slot:default --> #default
