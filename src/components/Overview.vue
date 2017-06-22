<template>
  <div>
    <div class="container">

      <!-- Posts -->
      <div 
        class="portfolio-element box u_p-md"
        v-for="(post, key) in posts"
        :id="post.id"
        >
         
          <img class="u_m-b-sm" :src="post.acf.image.sizes.medium_large">
          <h1 class="u_m-b-sm">{{post.acf.title}}</h1>
          <p class="u_m-b-lg">{{post.acf.lead}}</p>
          <div class="seperator u_m-b-md"></div>
          <router-link  
            :to="{ name: 'Portfolio', params: { id: post.id }}" 
            class="button">Læs mere
          <i class="material-icons">arrow_forward</i>
          </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'overview',
  data () {
    return {
      posts: this.$store.state.posts
    }
  },
  methods: {

  },
  beforeCreate() {
    this.$emit('activateSpinner');
    console.log(this.$store.state.posts)
  },
  created() {
    // var posts = [];
    // var self = this;

    console.log(this.$store.state.posts)

    // axios.get('http://jenshartfelt.dk/portfolio/wp-json/wp/v2/portfolioelement')
    // .then(function (res) {
    //   for (var i = 0; i < res.data.length; i++) {
    //     self.posts.push(res.data[i])
    //   }
    //   self.$emit('deactivateSpinner');
    // })
    // .catch(function (err) {
    //   console.log(err)
    // })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.fade-enter-active, .fade-leave-active {
  transition: all 200ms; 
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translate3d(0,20px,0);
}*/

@media (min-width: 1000px) {
  .container {
    columns: 3;
  }
}

@media (min-width: 700px) and (max-width: 999px) {
  .container {
    columns: 2;
  }
}

h1 {
  font-size: 1.5em;
}

.portfolio-element {
  display: inline-block;
  width: 100%;
  margin: 2% 0;
  vertical-align: top;
  min-height: 100%;
  overflow: hidden;
}

.seperator {
  background-color: #e1e1e1;
  height: 1px;
  margin-left: -16px;
  margin-right: -16px;
  display: block;

}

img {
  margin-left: -15px;
  margin-top: -15px;
  width: calc(100% + 30px);
}

.button {
  padding: 8px 4px;
  text-decoration: none;
  font-weight: 700;
  color: #333;
  font-size: 1.1em;
  width: 100%;
  display: block;
  margin: -8px 0;
  text-align: right;
}
.button i {
  vertical-align: bottom;
  transition: margin 200ms ease;
}
.button:hover {
  opacity: 0.5;
}
.button:hover>i {
  margin-right: -6px;
  margin-left: 6px;
  transition: margin 200ms ease;
}

/*.button {
  display: block;
  padding: 8px 16px;
  border: 2px #333 solid;
  color: #fff;
  background-color: #333;
  border-radius: 3px;
  text-decoration: none;
  text-align: center;
  font-size: 1.4em;
}*/
</style>
