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

@import '/assets/css/common-style.scss';



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

.forward-enter    {transform: translate3d(100%,0,0);}
.forward-enter-to {transform: translate3d(0%,0,0);}
.forward-leave-to {transform: translate3d(-100%,0,0);}
.forward-leave    {transform: translate3d(0%,0,0);}

.backwards-enter    {transform: translate3d(-100%,0,0);}
.backwards-enter-to {transform: translate3d(0%,0,0);}
.backwards-leave-to {transform: translate3d(100%,0,0);}
.backwards-leave    {transform: translate3d(0%,0,0);}

.spinner-fade-enter-active, .spinner-fade-leave-active {
  transition: opacity 100ms ease;
}
.spinner-fade-enter, .spinner-fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
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

.u_p-b-xs {padding-bottom: 4px;}
.u_p-b-sm {padding-bottom: 8px;}
.u_p-b-md {padding-bottom: 16px;}
.u_p-b-lg {padding-bottom: 24px;}
.u_p-b-xl {padding-bottom: 32px;}
.u_p-b-xxl {padding-bottom: 64px;}

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


.spinner-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.spinner {
  width: 56px;
  height: 56px;
  border: 6px solid;
  border-color: #333  #333 #333 rgba(0,0,0,0);
  border-radius: 100%;
}

.spinner.active {
  animation: rotate 900ms infinite linear;
}

@keyframes rotate {
  0%   {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

</style>
