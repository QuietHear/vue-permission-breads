/*
* @Author: aFei
* @Date: 2019-04-29 09:56:41
*/
/*
 * @LastEditors: afei
 * @LastEditTime: 2020-12-24 14:38:11
*/
<template>
  <div :class="['vue-permission-breads',cname]">
    {{ i18n ? $t(myPosition) : myPosition }}：
    <ul>
      <li
        :class="[index !== navigate.length - 1 ? 'active' : '']"
        @click="goOne(item, index)"
        v-for="(item, index) in navigate"
        :key="index"
      >
        {{ i18n ? $t(item.name) : item.name }}
        <span v-if="index !== navigate.length - 1">&gt;</span>
      </li>
    </ul>
    <div class="back" v-if="!hideBackBtn">
      <p @click="goBack">
        <i
          :class="[iconfont ? 'iconfont icon-' + backIcon : backIcon]"
          v-if="backIconPosition === 'left' && backIcon"
        ></i>
        {{ i18n ? $t(backName) : backName }}
        <i
          :class="[iconfont ? 'iconfont icon-' + backIcon : backIcon]"
          v-if="backIconPosition === 'right' && backIcon"
        ></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "vuePermissionBreads",
  data() {
    return {
      hideBackBtn: false,
      navigate: [],
      routerTmp: [],
    };
  },
  props: {
    rootName: {
      // 根目录开始路径
      type: Array,
      default: () => {
        return ["main"];
      },
    },
    i18n: {
      // 开启国际化
      type: Boolean,
      default: false,
    },
    cname: {
      // 自定义class
      type: String,
      default: "extra",
    },
    myPosition: {
      // 替换我的位置
      type: String,
      default: "我的位置",
    },
    backName: {
      // 替换返回
      type: String,
      default: "返回",
    },
    iconfont: {
      // 图标开启iconfont格式
      type: Boolean,
      default: false,
    },
    backIcon: {
      // 返回图标的class
      type: String,
      default: "",
    },
    backIconPosition: {
      // 返回图标的位置
      type: String,
      default: "left",
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化路由菜单
    init() {
      let routeMsg = JSON.parse(JSON.stringify(this.$router.options.routes));
      // 根目录查找
      this.rootName.forEach((item) => {
        routeMsg = routeMsg.filter((one) => {
          return one.name === item;
        })[0].children;
      });
      // 移除parents并格式化结构
      this.removeParents(routeMsg);
      // 格式化数据
      this.sortData(routeMsg);
      this.routerTmp = [...routeMsg];
      this.changeRouter();
    },
    // 移除parents
    removeParents(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].meta.parents) {
          if (list[i].meta.parents.length > 0) {
            let lin = list.filter((one) => {
              return one.name === list[i].meta.parents[0];
            });
            if (lin.length > 0) {
              if (!lin[0].children) {
                lin[0].children = [];
              }
              if (
                lin[0].children.filter((one) => {
                  return one.name === list[i].meta.parents[0];
                }).length === 0
              ) {
                lin[0].children.push(list[i]);
              }
              list[i].meta.parents.splice(0, 1);
              list.splice(i, 1);
              i -= 1;
            }
          }
        }
      }
      list.forEach((item) => {
        if (item.children && item.children.length > 0) {
          this.removeParents(item.children);
        } else {
          item.children = [];
        }
      });
    },
    // 格式化数据
    sortData(list, parent) {
      for (let i = 0; i < list.length; i++) {
        let arr = parent ? [...parent.parentList] : [];
        if (parent) {
          arr.push(parent);
        }
        let obj = {
          linkName: list[i].name,
          path: `/${list[i].path}`,
          index: `${parent ? parent.index + "-" : ""}${i + 1}`,
          parentList: arr,
          name: list[i].meta.title,
          hideBackBtn: list[i].meta.hideBackBtn === true ? true : false,
          replaceIndex: list[i].meta.replaceIndex === true ? true : false,
          children: list[i].children,
        };
        list[i] = { ...obj };
        if (list[i].children.length > 0) {
          this.sortData(list[i].children, list[i]);
        }
      }
    },
    // 路由改变
    changeRouter() {
      const router = this.$route;
      this.findPath(router).then((res) => {
        const routeMsg = res;
        this.navigate = [...routeMsg.detail.parentList];
        if (!routeMsg.detail.replaceIndex) {
          this.navigate.push(routeMsg.detail);
        }
        this.hideBackBtn = routeMsg.detail.hideBackBtn;
      });
    },
    // 返回当前路由路径
    findPath(route) {
      return new Promise((resolve) => {
        this.searchRoute(this.routerTmp, route).then((res) => {
          let obj = {
            detail: { ...res },
            list: [],
          };
          obj.list = res.index.split("-");
          resolve(obj);
        });
      });
    },
    // 找到当前路径
    searchRoute(list, route) {
      return new Promise((resolve) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].linkName === route.name) {
            resolve(list[i]);
          } else if (list[i].children.length > 0) {
            this.searchRoute(list[i].children, route).then((res) => {
              resolve(res);
            });
          }
        }
      });
    },
    // 去指定路由
    goOne(item, index) {
      if (index !== this.navigate.length - 1) {
        this.$router.push({ name: item.linkName });
      }
    },
    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
  },
  watch: {
    $route(to) {
      this.changeRouter();
    },
  },
};
</script>

<!--基础样式-->
<style scoped>
@import "style/vuePermissionBreads.css";
</style>

<!--样式扩展-->
<style>
@import "style/cname.css";
</style>