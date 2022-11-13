# 面包屑组件（vue2版）
[**vue3版本**](https://github.com/QuietHear/vue-permission-breads-plus '浏览') | ***vue2版本***


## 安装
	npm i vue-permission-breads
	// 需要安装前置依赖组件，已安装请忽略
	npm i vue-router@3.x
	// 开启国际化需要安装组件，已安装请忽略
	npm i vue-i18n

## 使用
	import vuePermissionBreads from 'vue-permission-breads';
	
	Vue.use(vuePermissionBreads);


## 0. 组件说明
##### ①. 依赖组件
* vue-router

##### ②. 支持扩展
* i18n
* iconfont(class形式)


## 1. 修改之前路由的meta属性(展示属性全靠meta控制)
* `title:''`：面包屑的标题内容
* `hideBackBtn:''`：隐藏后退按钮，只有true才隐藏
* `parents:['a']`：平级路由变为父子级，从第一个未改变的路由name按顺序添加，例如详情页需要添加一个列表页（列表页是正常路由结构）即可
从展示的页面开始，按照层级依次push对应的出自己外的隐藏页面的name
* `replaceIndex: true`：面包屑上隐藏自己，只有true才会隐藏，建议顺便隐藏返回按钮


## 2. 参数
* `root-name`：从根目录开始，到业务菜单的name集合-->Array;非必传;默认*["main"]*,取根目录下main的所有菜单
* `i18n`：标题开启国际化-->Boolean;非必传;默认*false*
* `cname`：自定义class-->String;非必传;默认*'extra'*
* `my-position`：替换我的位置，可使用i18n-->String;非必传;默认*'我的位置'*
* `back-name`：替换返回，可使用i18n-->String;非必传;默认*'返回'*
* `iconfont`：图标开启iconfont格式-->Boolean;非必传;默认*false*
>
	// 未开启
	icon:"tuihuobaozhang" -->icon:"tuihuobaozhang"
	// 开启后的变化
	icon:"tuihuobaozhang" -->icon:"iconfont icon-tuihuobaozhang"
>

* `back-icon`：返回图标的class-->String;非必传;默认*''*
* `back-icon-position`：返回图标相对返回的位置-->String;非必传;'默认*'left'*
>
	left / right
>


## 3. 自定义class（demo）
>
	@primary_color: #f49900; // 激活颜色
	@breads_height: 33px; // 面包屑高度
	@breads_background:#fff; // 面包屑背景色
	@breads_position_color:#000; // 我的位置颜色
	@breads_normal_color:#8998a6; // 面包屑颜色
	@breads_back_color:#000; // 返回颜色
	.vue-permission-breads.extra {
	  height: @breads_height;
	  line-height: @breads_height;
	  background: @breads_background;
	  color: @breads_position_color;
	  ul{
	    li{
	      color: @breads_normal_color;
	      &.active{
	        color: @primary_color;
	      }
	    }
	  }
	  .back{
	    p{
	      color: @breads_back_color;
	      i{
	        font-size: 15px;
	      }
	    }
	  }
	}
>