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
    :name="this.$store.state.transitionMode" 
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
        this.$store.commit('setTransitionModeBackwards')

      } else {
        this.$store.commit('setTransitionModeForwards')
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





</style>
