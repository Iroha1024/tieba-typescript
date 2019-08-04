import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import axios from './api/config';
import ElementUI from 'element-ui';
// import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

import './assets/css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css/animate.min.css';

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
// Vue.component(CollapseTransition.name, CollapseTransition);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
