// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';


Vue.use(VueRouter);
Vue.use(VueResource);

const routes=[
  {path:'/goods',component:goods},
  {path:'/ratings',component:ratings},
  {path:'/seller',component:seller},
]

let router=new VueRouter({routes,linkActiveClass:'active'});
//linkActiveClass为被选中路由的默认值router-link-active   active为为期设置的样式

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  //eventHub用于事件的发射与接收
  data:{
    eventHub: new Vue()
  }
})
