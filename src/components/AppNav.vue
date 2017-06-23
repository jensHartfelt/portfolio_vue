<template>
  <div class="nav-container">
    <transition name="fade">
      <router-link appear v-if="showBackButton" :to="backButtonLocation" class="button u_c-blue"><i class="material-icons u_c-blue">chevron_left</i>Tilbage</router-link>
    </transition>
    <p class="title">JENS HARTFELT</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app-nav',
  props: ['title'],
  data () {
    return {
      showBackButton: false,
      backButtonLocation: "/"
    }
  },
  created() {
    if (this.$route.path.split('/').length > 2) {
      this.showBackButton = true;
    } else {
      this.showBackButton = false;
    }
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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms; 
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  
  transition: opacity 300ms; 
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

.button {
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
}
</style>
