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

//@import 'assets/css/material-icons.scss';
@import 'assets/css/common-style.scss';

.forward-enter,
.forward-enter-to,
.forward-leave-to,
.forward-leave,
.backwards-enter,
.backwards-enter-to,
.backwards-leave-to,
.backwards-leave {
  transition: all $transition-medium;
}

.forward-enter    {transform: translate3d(100%,0,0); opacity: 0;}
.forward-enter-to {transform: translate3d(0%,0,0); opacity: 1;}
.forward-leave-to {transform: translate3d(-50%,0,0); opacity: 0;}
.forward-leave    {transform: translate3d(0%,0,0);}

.backwards-enter    {transform: translate3d(-100%,0,0); opacity: 0;}
.backwards-enter-to {transform: translate3d(0%,0,0); opacity: 1;}
.backwards-leave-to {transform: translate3d(50%,0,0); opacity: 0;}
.backwards-leave    {transform: translate3d(0%,0,0);}



</style>
