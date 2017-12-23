// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise/auto');
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
// import "vue-material-design-icons/styles.css"

// Icons
import arrowRight from "vue-material-design-icons/arrow-right.vue"
import brush from "vue-material-design-icons/brush.vue"
import calendarRange from "vue-material-design-icons/calendar-range.vue"
import camcorder from "vue-material-design-icons/camcorder.vue"
import chevronLeft from "vue-material-design-icons/chevron-left.vue"
import crop from "vue-material-design-icons/crop.vue"
import cellphoneLink from "vue-material-design-icons/cellphone-link.vue"
import emailOutline from "vue-material-design-icons/email-outline.vue"
import gamepadVariant from "vue-material-design-icons/gamepad-variant.vue"
import gesture from "vue-material-design-icons/gesture.vue"
import openInNew from "vue-material-design-icons/open-in-new.vue"

Vue.component("arrow-right", arrowRight)
Vue.component("brush", brush)
Vue.component("calendar-range", calendarRange)
Vue.component("camcorder", camcorder)
Vue.component("chevron-left", chevronLeft)
Vue.component("crop", crop)
Vue.component("cellphone-link", cellphoneLink)
Vue.component("email-outline", emailOutline)
Vue.component("gamepad-variant", gamepadVariant)
Vue.component("gesture", gesture)
Vue.component("openInNew", openInNew)

// Compontens 
import AppNav from './components/AppNav'
Vue.component('app-nav', AppNav)
Vue.config.productionTip = false

/* Vuex */
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    posts: [],
    spinnerActive: true,
    overviewScrollY: 0,
    transitionMode: "forwards"
  },
  mutations: {
    getPosts (state) {
      axios.get('//jenshartfelt.dk/portfolio/wp-json/wp/v2/portfolioelement')
      .then(function (res) {
        for (var i = 0; i < res.data.length; i++) {
          state.posts.push(res.data[i])
        }
        state.spinnerActive = false;
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    setTransitionModeForwards (state) {
      // console.log(state);
      state.transitionMode = "forwards";
    },
    setTransitionModeBackwards (state) {
      // console.log(state);
      state.transitionMode = "backwards";
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