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
      component: PortfolioSingle,
    },
    
  ],
  scrollBehavior (to, from, savedPosition) {
    // Scroll behavior on route load is always at the top. Add exceptions if needed
    // Overview scroll is controllet in app.js
    
    console.log("savedPosition: ", savedPosition)

    // return { x: 0, y: 0 }
    //if (to.name === "Portfolio") { 
      //return { x: 0, y: 0 }
    //}
  },
  mode: "history",
  base: 'beta/10/'
})
