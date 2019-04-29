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
* `icon:''`：iconfont(class形式)，需要先在本地加入iconfont
* `show:false`：是否展示在导航栏，只有false才不展示
* `markName:''`：代替当前路由点亮的导航的name，show:false时才生效
* `parents:['a']`：当前页面show：false，且它的前一个页面也是show:false的，以此类推，
从展示的页面开始，按照层级依次push对应的出自己外的隐藏页面的name
* `replaceIndex: true`：当前页面是否在面包屑上与容器的名字合并，只有true才合并不显示自己的name
* `changeMark:''/['a']`：写在每个调用公共页面的路由上，替换指定路由的markName，可以使用字符串，也可以使用数组，适用于多个页面同时使用同一个公共隐藏页面
* `keepAlive:true`（需要改造页面）：永久开启页面缓存，只有为true为开启
* `defaultAlive: true`（需要改造页面）：动态操作缓存时，想要复原初始化，必须写该属性才能恢复原值
>
	// 前提，改造main页面<router-view>
	<keep-alive>
    	<router-view v-if="$route.meta.keepAlive===true"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.keepAlive!==true"></router-view>
	//
	// 使用方式：例如，现在实现从a-b时关闭其缓存功能，其余页面进入时正常缓存（b默认时开启的）
	//
	// 打开a页面，并编写js
	beforeRouteLeave (to, from, next) {
		if (to.name === 'b') {
			to.meta.keepAlive = false;
		}
		next();
	}
	// 打开b页面，并编写js
	beforeRouteLeave (to, from, next) {
		if (from.meta.defaultAlive !== undefined) {
			from.meta.keepAlive = from.meta.defaultAlive;
		}
		next();
	}

## 2. 参数
* `permissionTemplate`：权限对照表-->Array;必传
* `permissionList`：当前权限-->String;必传
* `cname`：自定义class-->String;非必传;默认*'ele-nav'*
* `myStyle`：自定义内联样式-->String;非必传;默认*''*
* `horizontal`：开启横向导航-->Boolean;非必传;默认*false*
* `accordion`：开启手风气模式-->Boolean;非必传;默认*false*
* `i18n`：标题开启国际化-->Boolean;非必传;默认*false*

## 3. 必传项获取（demo）
	const permissionTemplate = { // 权限对照表--键值必须是路由文件的name
		firstChild: '1',
		firstChildHome: '1-1',
		secondChild: '2',
		secondChildA: '2-1',
		secondChildB: '2-2'
	};
	const permissionList = ['1', '1-1', '2', '2-1']; // 当前权限


## 4. 自定义class（demo）
	@primary_color: #f49900; // 导航激活颜色
	@primary_background_color: #1e2836; // 导航背景颜色
	@primary_nav_a_color: #a2adb8; // 正常字体颜色
	.views-nav {
	  .replace_active, .replace_active_child {
	    &, .icon {
	      color: @primary_color !important;
	    }
	  }
	  .replace_active {
	    &:after {
	      content: '';
	      position: absolute;
	      top: 0;
	      left: 0;
	      width: 150%;
	      height: 100%;
	      opacity: 0.3;
	      background-image: -webkit-linear-gradient(
	          0deg,
	          @primary_color 0%,
	          @primary_background_color 25%
	      );
	      z-index: -1;
	      box-sizing: border-box;
	      animation: navGradient 1s 1;
	      -webkit-animation: navGradient 1s 1;
	    }
	  }
	  .el-menu {
	    background-color: darken(@primary_background_color, 3%);
	  }
	  li {
	    a {
	      color: @primary_nav_a_color;
	      &:hover {
	        background-color: lighten(@primary_background_color, 5%) !important;
	      }
	    }
	  }
	  &.el-menu--horizontal { // 横向一级菜单
	    background: @primary_background_color !important;
	    height: 60px;
	    a {
	      line-height: 60px;
	    }
	    i {
	      color: @primary_nav_a_color;
	    }
	    .replace_active {
	      &:after {
	        background-image: none;
	        width: 100%;
	        border-bottom: 4px solid @primary_color;
	        opacity: 1;
	        animation: navGradient1 0.4s 1 ease-in-out;
	        -webkit-animation: navGradient1 0.4s 1 ease-in-out;
	      }
	    }
	  }
	}
	// 横向一级、二级菜单
	body{
		.el-menu--horizontal {
		  a {
		    color: @primary_nav_a_color;
		    &.replace_active_child {
		      color: @primary_color;
		    }
		    &:hover {
		      background-color: lighten(@primary_background_color, 5%) !important;
		    }
		  }
		  .el-menu {
		    background-color: darken(@primary_background_color, 3%);
		  }
		}
	}
	// 导航垂直方向动画
	@keyframes navGradient {
	  0% {
	    left: -50%;
	  }
	  100% {
	    left: 0;
	  }
	}
	// 导航横向方向动画
	@keyframes navGradient1 {
	  0% {
	    left: 50%;
	    width: 0;
	  }
	  100% {
	    left: 0;
	    width: 100%;
	  }
	}
