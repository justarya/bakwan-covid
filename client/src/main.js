import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from './config/axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

moment.locale('id');
Vue.prototype.$moment = moment;

Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
