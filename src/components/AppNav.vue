<template>
  <div class="nav-container" @click="toggleNestView">


    <transition name="bounce">
      <p v-if="atOverview">one</p>
      <p v-else>two</p>
    </transition>


    <!--<transition appear name="fade" mode="in-out">
      <div v-if="atOverview" class="container">
        <p @click="scrollTo('top')" class="title">JENS HARTFELT</p>
        <div class="navigation">
          <a @click="scrollTo('portfolio')" :class="{ active : portfolioActive }">Portfolio</a>
          <a @click="scrollTo('contact')"  :class="{ active : contactActive }">Kontakt</a>
        </div>
      </div>

      <div v-else class="container">
        <router-link  :to="backButtonLocation" class="button u_c-blue"><i class="material-icons u_c-blue">chevron_left</i>Tilbage</router-link>
      </div>
    </transition>-->

    <!--<transition name="fade">
      <router-link appear v-if="showBackButton" :to="backButtonLocation" class="button u_c-blue"><i class="material-icons u_c-blue">chevron_left</i>Tilbage</router-link>
    </transition>
    <p class="title">JENS HARTFELT</p>-->
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
    if (this.$route.path.split('/').length > 2) {
      this.showBackButton = true;
    } else {
      this.showBackButton = false;
    }
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleNestView: function() {
      this.atOverview = !this.atOverview;
    },
    handleScroll: function(e) {
      // console.log(
      //   e.target.body.scrollTop +"\n"+
      //   "portfolio: " + document.getElementById("portfolio").offsetTop +"\n"+
      //   "contact: " + document.getElementById("contact").offsetTop
      // );
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
      
      // Re-enable the dynamic link highlighting on scroll
      window.addEventListener('scroll', self.handleScroll);

    },
  },
  watch: {
    '$route' (to, from) {
      if (to.fullPath.split('/').length > 2) {
        this.showBackButton = true;
      } else {
        this.showBackButton = false;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 3000ms; 
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transition: opacity 3000ms; 
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
  padding: 0 10px;

}

.nav-container>.container {
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