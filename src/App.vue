<template>
  <div id="app">
    <!-- App navigation -->
    <app-nav></app-nav>

    <!-- Loader -->
    <!--<transition name="spinner-fade">
      <div v-if="this.$store.state.spinnerActive" class="loader">
          <div :class="{active: this.$store.state.spinnerActive}" class="spinner">
          </div>
      </div>
    </transition>-->

    <!-- Content -->
    <transition 
    :name="transitionMode" 
    mode="out-in"
    @enter="scroll">
      <router-view appear>    
      </router-view>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionMode: ""
    }
  },
  methods: {
    scroll: function () {
      if (this.$route.name === "Portfolio") {
        window.scrollTo(0,0);
      }

      if (this.$route.name === "Overview") {
        var scrollY = this.$store.state.overviewScrollY;
        window.scrollTo(0, scrollY);
      }
    }
  },
  created() {
    this.$store.commit('getPosts')
  },
  watch: {
    '$route' (to, from) {

      // Sets transition mode based on flow.
      // Will work if there is only 2 "nested" layers of views
      if (to.name === "Overview") {
        this.transitionMode = "backwards";
      } else {
        this.transitionMode = "forward"
      }

      if (from.name === "Overview") {
        this.$store.state.overviewScrollY = window.scrollY;
      }

    }
  }
}

</script>

<style lang="scss">

.forward-enter,
.forward-enter-to,
.forward-leave-to,
.forward-leave,
.backwards-enter,
.backwards-enter-to,
.backwards-leave-to,
.backwards-leave {
  transition: transform 180ms ease;
}


.forward-enter    {transform: translateX(100%);}
.forward-enter-to {transform: translateX(0%);}
.forward-leave-to {transform: translateX(-100%);}
.forward-leave    {transform: translateX(0%);}

.backwards-enter    {transform: translateX(-100%);}
.backwards-enter-to {transform: translateX(0%);}
.backwards-leave-to {transform: translateX(100%);}
.backwards-leave    {transform: translateX(0%);}

.spinner-fade-enter-active, .spinner-fade-leave-active {
  transition: opacity 100ms ease;
}
.spinner-fade-enter, .spinner-fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}


@import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700');

* {
  margin: 0;
  padding: 0;
  font-family: 'PT Sans', sans-serif;
  line-height: 1.3;
  box-sizing: border-box;
}

/* fallback */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'), local('MaterialIcons-Regular'), url(https://fonts.gstatic.com/s/materialicons/v22/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  vertical-align: bottom;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

#app {
/*  height: 100%;
  position: absolute;
  overflow: hidden;*/
  padding: 70px 0 0 0;
}

.container {
  max-width: 1400px;
  width: 90%;
  margin: 0 auto;
}

body {
  font-size: 16px;
  color: #676767;
  // background-color: #f0f0f0;
  -webkit-font-smoothing: antialiased; /* Makes fonts look pretty in chrome */
  -moz-osx-font-smoothing: grayscale; /* Makes fonts look pretty in firefox */
}

h1 {
  font-size: 2.5em;
}
h2 {
  font-size: 2em;
}
p {
  font-weight: 200;
}
p.lead {
  font-size: 1.3em;
}


.box {
  border: #e1e1e1 1px solid;
  border-radius: 2px;
  background-color: #fff;
}

img {
  width: 100%;
}

/* Padding and margin*/
.u_p-xs {padding: 4px;}
.u_p-sm {padding: 8px;}
.u_p-md {padding: 16px;}
.u_p-lg {padding: 24px;}
.u_p-xl {padding: 32px;}
.u_p-xxl {padding: 64px;}

.u_p-t-xs {padding-top: 4px;}
.u_p-t-sm {padding-top: 8px;}
.u_p-t-md {padding-top: 16px;}
.u_p-t-lg {padding-top: 24px;}
.u_p-t-xl {padding-top: 32px;}
.u_p-t-xxl {padding-top: 64px;}

.u_m-b-xs {margin-bottom: 4px;}
.u_m-b-sm {margin-bottom: 8px;}
.u_m-b-md {margin-bottom: 16px;}
.u_m-b-lg {margin-bottom: 24px;}
.u_m-b-xl {margin-bottom: 32px;}
.u_m-b-xxl {margin-bottom: 64px;}

.u_m-t-xs {margin-top: 4px;}
.u_m-t-sm {margin-top: 8px;}
.u_m-t-md {margin-top: 16px;}
.u_m-t-lg {margin-top: 24px;}
.u_m-t-xl {margin-top: 32px;}
.u_m-t-xxl {margin-top: 64px;}

.u_m-l-xs {margin-left: 4px;}
.u_m-l-sm {margin-left: 8px;}
.u_m-l-md {margin-left: 16px;}
.u_m-l-lg {margin-left: 24px;}
.u_m-l-xl {margin-left: 32px;}
.u_m-l-xxl {margin-left: 64px;}

.u_m-r-xs {margin-right: 4px;}
.u_m-r-sm {margin-right: 8px;}
.u_m-r-md {margin-right: 16px;}
.u_m-r-lg {margin-right: 24px;}
.u_m-r-xl {margin-right: 32px;}
.u_m-r-xxl {margin-right: 64px;}

/* Color */
.u_c-blue {color: #2C79E6 !important;}

/* Text */
.u_t-c {text-align: center;}

.loader {
  width: 100%;
  padding-top: 20vh;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.3;
}


.spinner {
  width: 56px;
  height: 56px;
  border: 6px solid;
  border-color: #333  #333 #333 rgba(0,0,0,0);
  border-radius: 100%;
  margin: 0 auto;
}

.spinner.active {
  animation: rotate 900ms infinite linear;
}

@keyframes rotate {
  0%   {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

</style>
