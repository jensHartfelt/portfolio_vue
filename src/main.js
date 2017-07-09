// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'

import AppNav from './components/AppNav'
Vue.component('app-nav', AppNav)

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    posts: [],
    spinnerActive: true,
    overviewScrollY: 0
  },
  mutations: {
    getPosts (state) {
      axios.get('http://jenshartfelt.dk/portfolio/wp-json/wp/v2/portfolioelement')
      .then(function (res) {
        for (var i = 0; i < res.data.length; i++) {
          state.posts.push(res.data[i])
        }
        state.spinnerActive = false;
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  }
})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})