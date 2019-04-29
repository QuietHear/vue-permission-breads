/*
* @Author: aFei
* @Date: 2019-04-29 09:56:41
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2019-04-29 16:57:21
*/
<template>
  <div class="permission-breads" :class=cname :style=myStyle>
    {{i18n===true?$t(i18nMyPosition):'我的位置'}}：
    <span :key="index"
          v-for="(item,index) in navigate"
          v-if="index<navigate.length-1">
              <router-link
                :to="{name:item.linkName}">{{i18n===true?$t(item.name):item.name}}&nbsp;&nbsp;&gt;</router-link>
            </span>
    <span v-else>{{i18n===true?$t(item.name):item.name}}</span>
    <button @click="goBack"
            v-if="showBack && backIconPosition==='left'">
      <i class="icon iconfont" :class="backIcon"></i>
      {{i18n===true?$t(i18nBtn):'返回'}}
    </button>
    <button @click="goBack"
            v-if="showBack && backIconPosition==='right'">
      {{i18n===true?$t(i18nBtn):'返回'}}
      <i class="icon iconfont" :class="backIcon"></i>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'vuePermissionBreads',
    data() {
      return {
        showBack: true,
        navigate: []
      }
    },
    props: {
      cname: { // 自定义class
        type: String,
        default: 'breads-extra'
      },
      myStyle: { // 自定义内联样式
        type: String,
        default: ''
      },
      backIcon: { // 返回图标的iconfont（class格式）
        type: String,
        default: ''
      },
      backIconPosition: { // 返回图标的位置
        type: String,
        default: 'left'
      },
      i18n: { // 开启国际化
        type: Boolean,
        default: false
      },
      i18nMyPosition: { // 我的位置i18n名字
        type: String,
        default: ''
      },
      i18nBtn: { // 按钮i18n名字
        type: String,
        default: ''
      }
    },
    created() {
      console.log()
      if (this.$route.name !== 'main') {
        this.change(this.$route);
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      change(to) { // 根据当前路由改变数据
        this.showBack = to.meta.hideBackBtn !== false ? true : false; // 判断是否隐藏返回按钮
        // console.log('导航change')
        let navMsg = this.$router.options.routes.filter(function (item) {
          return item.name === 'main'; // 根据当前项目最外层name容器修改
        })[0].children;
        if (to.meta.changeMark !== undefined && to.meta.changeMark !== '') { // 改变指定页面的markName
          if (to.meta.changeMark.toString() === to.meta.changeMark) { // 字符串
            let parent;
            let child;
            parent = navMsg.filter(function (item) {
              return item.name === to.meta.changeMark;
            });
            if (parent.length > 0) {
              parent[0].meta.markName = to.name;
            } else {
              parent = navMsg.filter(function (item) {
                let isTrue = false;
                if (item.children !== undefined && item.children.length > 0) {
                  let arr = item.children.filter(function (one) {
                    return one.name === to.meta.changeMark;
                  });
                  if (arr.length > 0) {
                    isTrue = true;
                  }
                }
                return isTrue;
              });
              child = parent[0].children.filter(function (item) {
                return item.name === to.meta.changeMark;
              });
              child[0].meta.markName = to.name;
            }
          } else { // 数组
            for (let i = 0; i < to.meta.changeMark.length; i++) {
              let parent;
              let child;
              parent = navMsg.filter(function (item) {
                return item.name === to.meta.changeMark[i];
              });
              if (parent.length > 0) {
                parent[0].meta.markName = to.name;
              } else {
                parent = navMsg.filter(function (item) {
                  let isTrue = false;
                  if (item.children !== undefined && item.children.length > 0) {
                    let arr = item.children.filter(function (one) {
                      return one.name === to.meta.changeMark[i];
                    });
                    if (arr.length > 0) {
                      isTrue = true;
                    }
                  }
                  return isTrue;
                });
                child = parent[0].children.filter(function (item) {
                  return item.name === to.meta.changeMark[i];
                });
                child[0].meta.markName = to.name;
              }
            }
          }
        }
        if (to.meta.markName !== undefined && to.meta.markName !== '') { // 当前路由在nav上是隐藏的页面
          // console.log('我是隐藏的')
          if (to.meta.parents !== undefined && to.meta.parents !== '') { // 前一个页面是隐藏页面
            // console.log('前一个页面是隐藏的')
            let arr = [];
            let parent;
            let child;
            parent = navMsg.filter(function (item) {
              return item.name === to.meta.markName;
            });
            if (parent.length > 0) {
              arr = [{name: parent[0].meta.title, linkName: parent[0].name}];
            } else {
              parent = navMsg.filter(function (item) {
                let isTrue = false;
                if (item.children !== undefined && item.children.length > 0) {
                  let arr = item.children.filter(function (one) {
                    return one.name === to.meta.markName;
                  });
                  if (arr.length > 0) {
                    isTrue = true;
                  }
                }
                return isTrue
              });
              child = parent[0].children.filter(function (item) {
                return item.name === to.meta.markName;
              });
              arr = [{name: parent[0].meta.title, linkName: parent[0].name}, {
                name: child[0].meta.title,
                linkName: child[0].name
              }];
            }
            for (let i = 0; i < to.meta.parents.length; i++) {
              parent[0].children.filter(function (item) {
                if (item.name === to.meta.parents[i]) {
                  arr.push({name: item.meta.title, linkName: item.name});
                }
                return false;
              });
            }
            arr.push({name: to.meta.title, linkName: to.name});
            this.navigate = [...arr];
          } else {
            // console.log('前一个页面不是隐藏的')
            let parent;
            let child;
            parent = navMsg.filter(function (item) {
              return item.name === to.meta.markName;
            });
            if (parent.length > 0) {
              this.navigate = [{name: parent[0].meta.title, linkName: parent[0].name}];
            } else {
              parent = navMsg.filter(function (item) {
                let isTrue = false;
                if (item.children !== undefined && item.children.length > 0) {
                  let arr = item.children.filter(function (one) {
                    return one.name === to.meta.markName;
                  });
                  if (arr.length > 0) {
                    isTrue = true;
                  }
                }
                return isTrue;
              });
              child = parent[0].children.filter(function (item) {
                return item.name === to.meta.markName;
              });
              this.navigate = [{name: parent[0].meta.title, linkName: parent[0].name}, {
                name: child[0].meta.title,
                linkName: child[0].name
              }];
            }
            if (to.meta.replaceIndex !== true) {
              this.navigate.push({name: to.meta.title, linkName: to.name});
            }
          }
        } else { // 当前路由在nav上是显示的页面
          // console.log('我是显示的')
          let parent;
          let child;
          parent = navMsg.filter(function (item) {
            return item.name === to.name;
          });
          if (parent.length > 0) {
            this.navigate = [{name: parent[0].meta.title, linkName: parent[0].name}];
          } else {
            parent = navMsg.filter(function (item) {
              let isTrue = false;
              if (item.children.length > 0) {
                let arr = item.children.filter(function (one) {
                  return one.name === to.name;
                });
                if (arr.length > 0) {
                  isTrue = true;
                }
              }
              return isTrue;
            });
            child = parent[0].children.filter(function (item) {
              return item.name === to.name;
            });
            this.navigate = [{name: parent[0].meta.title, linkName: parent[0].name}, {
              name: child[0].meta.title,
              linkName: child[0].name
            }]
          }
        }
      }
    },
    watch: {
      $route(to) {
        this.change(to);
      }
    }
  }
</script>

<!--基础样式-->
<style scoped>
  @import "style/vuePermissionBreads.css";
</style>

<!--样式扩展-->

<style scoped>
  /*默认颜色*/
  @import "style/cname.css";
</style>
