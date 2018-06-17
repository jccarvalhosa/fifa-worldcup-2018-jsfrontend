import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './style.scss';

Vue.config.productionTip = false;

Vue.use(VueScrollTo, {
  container: 'body',
      duration: 800,
      easing: 'ease',
      offset: 0,
      cancelable: true,
      onStart: false,
      onDone: false,
      onCancel: false,
      x: false,
      y: true,
});

moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('d', 3000);
moment.relativeTimeThreshold('h', 24);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
