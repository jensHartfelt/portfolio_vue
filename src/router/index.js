import Vue from 'vue'
import Router from 'vue-router'
import Overview from '@/components/Overview'
import PortfolioSingle from '@/components/PortfolioSingle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/portfolio/:id',
      name: 'Portfolio',
      component: PortfolioSingle
    }
  ],
  scrollBehavior (to, from, savedPosition) {

  },
  mode: "history",
  base: 'beta/10/'
})
