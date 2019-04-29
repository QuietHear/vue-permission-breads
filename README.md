# 基于权限、国际化的vue 面包屑组件

## 安装
	npm i vue-permission-breads

## 0. 组件说明
##### ①. 依赖组件
* vue-router
* 路由按照下方规范修改

##### ②. 支持扩展
* i18n
* iconfont(class形式)

## 1. 修改之前路由的meta属性(路由文件只能添加一层，其余全靠meta控制，必须遵循)
* `title:''`：导航展示的标题内容
* `show:false`：是否展示在导航栏，只有false才不展示
* `markName:''`：代替当前路由点亮的导航的name，show:false时才生效
* `hideBackBtn:''`：隐藏后退按钮，只有false才隐藏
* `parents:['a']`：当前页面show：false，且它的前一个页面也是show:false的，以此类推，
从展示的页面开始，按照层级依次push对应的出自己外的隐藏页面的name
* `replaceIndex: true`：当前页面是否在面包屑上与容器的名字合并，只有true才合并不显示自己的name
* `changeMark:''/['a']`：写在每个调用公共页面的路由上，替换指定路由的markName，可以使用字符串，也可以使用数组，适用于多个页面同时使用同一个公共隐藏页面

## 2. 参数
* `cname`：自定义class-->String;非必传;默认*'ele-nav'*
* `myStyle`：自定义内联样式-->String;非必传;默认*''*
* `backIcon`：返回图标的iconfont（class格式）-->String;非必传;默认*''*
* `backIconPosition`：返回图标的位置-->String;非必传;可选'left、'right';'默认*'left'*
* `i18n`：标题开启国际化-->Boolean;非必传;默认*false*
* `i18nMyPosition`：我的位置i18n名字-->String;非必传;默认*''*
* `i18nBtn`：按钮i18n名字-->String;非必传;默认*''*

## 3. 自定义class（demo）
	@navigate_height: 33px; // 面包屑高度
	@primary_color: #f49900; // 激活颜色
	.breads-extra {
	  height: @navigate_height;
	  background: #ffffff;
	  position: relative;
	  width: 100%;
	  line-height: @navigate_height;
	  color: #8998a6;
	  font-size: 14px;
	  padding-left: 1%;
	  > span {
	    margin-right: 6px;
	  }
	  a {
	    color: @primary_color;
	  }
	  button {
	    top: 6px;
	    right: 1vw;
	    padding: 0;
	    font-size: 14px;
	    height: 20px;
	  }
	}
