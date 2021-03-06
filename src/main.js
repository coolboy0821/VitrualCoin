import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import App from './App';
import shorts from './components/shorts/shorts';
import specials from './components/specials/specials';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

import './common/style/base.css';
import { ConfirmPlugin, AjaxPlugin } from 'vux';

Vue.use(AjaxPlugin);
Vue.use(ConfirmPlugin);
Vue.use(VueRouter);
Vue.use(Vuex);

fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const routes = [
  { path: '/', component: shorts },
  { path: '/specials', component: specials }
];

let router = new VueRouter({
  routes
});
router.push(location.hash.replace('#', ''));

const store = new Vuex.Store({});
store.registerModule('vux', {
  state: { isLoading: false },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    }
  }
});

FastClick.attach(document.body);

// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box');
