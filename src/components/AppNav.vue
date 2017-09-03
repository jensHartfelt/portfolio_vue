<template>
  <div class="nav-container">
    <div class="nav-content">

      <transition 
        :name="this.$store.state.transitionMode" 
        mode="out-in"
      >        
        <div v-if="atOverview" class="container overview">
          <p @click="scrollTo('top')" class="title">JENS HARTFELT</p>
          <div class="navigation">
            <a @click="scrollTo('portfolio')" :class="{ active : portfolioActive }" tabindex="1">Portfolio</a>
            <a @click="scrollTo('contact')"  :class="{ active : contactActive }" tabindex="2">Kontakt</a>
          </div>
        </div>

        <div v-else class="container portfolio back-button" :key="2">
          <router-link :to="backButtonLocation" class="button u_c-blue">
            <i class="material-icons u_c-blue">chevron_left</i>
            Tilbage
          </router-link>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import tinyAnimate from 'tinyAnimate'

export default {
  name: 'app-nav',
  props: ['title'],
  data () {
    return {
      atOverview: true,
      backButtonLocation: "/",
      portfolioActive: false,
      contactActive: false
    }
  },
  created() {
    console.log("route name: " + this.$route.name);

    if (this.$route.name === "Overview") {
      window.addEventListener('scroll', this.handleScroll);
    } else {
      window.removeEventListener('scroll', this.handleScroll);
      this.atOverview = false;
    }
  },
  methods: {
    handleScroll: function(e) {
      var curScroll = e.target.body.scrollTop + 50;
      var portfolioOffset = document.getElementById("portfolio").offsetTop;
      var contactOffset = document.getElementById("contact").offsetTop

      if (curScroll > portfolioOffset && curScroll < contactOffset) {
        this.portfolioActive = true;
      } else {
        this.portfolioActive = false;        
      }

      if (curScroll > contactOffset || curScroll + 100 + window.innerHeight > document.body.offsetHeight ) {
        this.contactActive = true;
        this.portfolioActive = false;     
      } else {
        this.contactActive = false;
      }
    },
    scrollTo: function(arg) {
      var self = this;

      // Removes dynamic link highlighting on scroll, and manually set the clicked link to active
      window.removeEventListener('scroll', this.handleScroll);

      // Decide which link to scroll to and to set active
      if (arg === "portfolio") {
        var scrollEnd = document.getElementById("portfolio").offsetTop - 32;
        this.portfolioActive = true; 
        this.contactActive = false; 
      } else if (arg === "contact") {
        var scrollEnd = document.getElementById("contact").offsetTop - 32;
        this.portfolioActive = false; 
        this.contactActive = true; 
      } else if (arg === "top") {
        var scrollEnd = 0;
        this.portfolioActive = false; 
        this.contactActive = false; 
      }
      var scrollStart = window.scrollY;
      tinyAnimate.animate(scrollStart, scrollEnd, 500, apply, "easeInOutCubic");
      function apply(e) {
        window.scrollTo(0, e);
      }
      
      if (self.$route.name === "Overview") {
        // Re-enable the dynamic link highlighting on scroll
        window.addEventListener('scroll', self.handleScroll);    
      }
    },
  },
  watch: {
    '$route' (to, from) {
      console.log('Watching route in AppNav.vue. to.name: ',  to.name);

      if (to.name === "Overview") {
        this.atOverview = true;

      } else if (to.name === "Portfolio")  {
        window.removeEventListener('scroll', this.handleScroll);      
        this.atOverview = false;
      }

      console.log(this.atOverview)

      
      // if (to.fullPath.split('/').length > 2) {
      //   this.atOverview = true;
      // } else {
      //   this.atOverview = false;
      // }
    }
  }
}
</script>

<style scoped lang="scss">

@import '../assets/css/material-icons.scss';


// .fade-enter-active, .fade-leave-active {
//   opacity: 0;
//   transition: all 3000ms; 
// }
// // .fade-enter, .fade-leave-to {
// //   opacity: 1;
// //   transition: opacity 3000ms; 
// // }


.fade-enter {
  transform: translate3d(100%, 0, 0);
}

.fade-enter-active,
.fade-leave-active   {
  transition: all 400ms ease;
 // transition: all 400ms ease;
}

.fade-enter-to   {
  transform: translate3d(0, 0%, 0);
}

.fade-leave {
  transform: translate3d(0, 0%, 0);
}

.fade-leave-to {
  transform: translate3d(-100%, 0, 0);
}


.nav-container {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 50px;
  background-color: #fff;
  border: #e1e1e1 solid;
  border-width: 0 0 1px 0;
  z-index: 1;
}

.nav-content {
  height: 50px;
  overflow: hidden;
}

// .nav-container .container.overview {
//   margin-top: 0px;
//   opacity: 1;
//   transition: all 400ms ease-in-out;
// }
// .nav-container .container.overview.hidden {
//   margin-top: -50px;
//   opacity: 0;
//   transition: all 400ms ease-in-out;
// }

.nav-container .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.nav-container a {
  border-width: 0 0 4px 0;
  border-style: solid;
  border-color: rgba(0,0,0,0);
  margin-top: 2px;
  padding: 0 15px;
  line-height: 44px;
  display: inline-block;
  transition: all 230ms ease;
}

.nav-container a:hover {
  cursor: pointer;
  color: #2C79E6;
}

.nav-container a.active {
  border-color: #2C79E6;
  color: #2C79E6;
  transition: all 230ms ease;
}

.nav-container .title {
  line-height: 50px;
  font-weight: 700;
  font-size: 1.1em;
  transition: all 230ms ease;
}

.nav-container .title:hover {
  color: #2C79E6;
  cursor: pointer;
  transition: all 230ms ease;
}

.back-button.container:hover i {
  transform: translateX(-5px);
  transition: transform 240ms ease;
}

.back-button.container i {
  vertical-align: middle;
  margin-bottom: 3px;
  margin-left: -5px;
  margin-right: 3px;
  transition: transform 240ms ease;
}

.back-button.container a {
  text-decoration: none;
  padding-left: 0px;
  font-weight: 700;
  width: 100%;
}

/*.button {
  font-size: 1em;
  line-height: 50px;
  vertical-align: bottom;
  text-decoration: none;
  font-weight: 700;
}
.button:hover {
  opacity: 0.7;
}
.button i {
  color: #333;
  font-size: 30px;
  line-height: 50px;
  text-decoration: none;
}
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  line-height: 50px;
  font-weight: 700;
}*/
</style>