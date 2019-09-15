import Vue from 'vue';
import JsonCSV from 'vue-json-csv';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';

Vue.component('downloadCsv', JsonCSV);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
