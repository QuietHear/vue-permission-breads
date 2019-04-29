/*
* @Author: aFei
* @Date: 2019-04-29 09:56:41
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2019-04-29 09:56:42
*/
<template>
    <div>
        测试内容
    </div>
</template>

<script>
    export default {
        name: 'vuePermissionBreads',
        data() {
            return {

            }
        },
        props: {
            cname: { // 自定义class
                type: String,
                default: 'ele-nav'
            },
            myStyle: { // 自定义内联样式
                type: String,
                default: ''
            },
            i18n: { // 标题开启国际化
                type: Boolean,
                default: false
            }
        },
        created() {

        },
        methods: {

        },
        watch: {

        }
    }
</script>

<!--基础样式-->
<style scoped>
    @import "style/vuePermissionBreads.css";
</style>

<!--样式扩展-->

<style>
    /*默认颜色*/
    @import "style/cname.css";
</style>
