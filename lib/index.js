/*
* @Author: aFei
* @Date: 2019-04-29 09:58:32
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2019-04-29 10:18:15
*/
import vuePermissionBreads from './vuePermissionBreads';

const comment = {
  install(Vue) {
    Vue.component('vuePermissionBreads', vuePermissionBreads);
  },
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment);
}

export default comment;
