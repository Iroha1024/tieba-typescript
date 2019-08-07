import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import axios from './api/config';
import * as api from './api/';
import ElementUI from 'element-ui';
import Component from 'vue-class-component';
import VueLazyload from 'vue-lazyload';
// import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

import './assets/css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css/animate.min.css';

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

Vue.use(ElementUI);
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
// Vue.component(CollapseTransition.name, CollapseTransition);

Vue.use(VueLazyload, {
    error: require('./assets/img/error.jpg'),
    loading: require('./assets/img/loading.gif'),
})

// Register the router hooks with their names
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate' // for vue-router 2.2+
])

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
