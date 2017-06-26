<template>
  <div>
    <div class="container">
      <div class="single-element" v-for="post in posts">


        <h1 class="u_m-b-md">{{post.acf.title}}</h1>
        <p class="lead u_m-b-md">{{post.acf.lead}}</p>
        <p class="u_m-b-xl">{{post.acf.content}}</p>

        <a target="blank" :href="post.acf.externalLinkUrl" class="button u_m-b-xl">
          <i class="material-icons u_m-r-xs">open_in_new</i>
          {{post.acf.externalLinkTitle}}
        </a>

        <div class="u_p-sm box">
          <img class="u_m-b-xs" :src="post.acf.image.url">
          <p class="meta">{{post.acf.imageDescription}}</p>
        </div>
        


      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'portfolio-single',
  data () {
    return {
      posts: []
    }
  },
  beforeCreate() {
    console.log("PortfolioSingle.vue")
  },
  created() {
    var postId = this.$router.currentRoute.params.id;

    if (this.$store.state.posts.length === 0) {
      manuallyShowPost();
    } else {
      var curPost = this.$store.state.posts.filter(function(post){
        return post.id === postId
      })
      this.posts = curPost;
    }

    var self = this;

    function manuallyShowPost() {
      var reqUrl = "http://jenshartfelt.dk/portfolio/wp-json/wp/v2/portfolioelement/" + postId + "/"
      
      axios.get(reqUrl)
      .then(function (res) {
        console.log("setting posts value")
        self.posts[0] = res.data;
        console.log("Posts[0] is: ", self.posts[0])
      })
      .catch(function (err) {
        console.log(err)
      })
      
    }
  },
  methods: {
    manuallyShowPost: function() {

      var postId = this.$router.currentRoute.params.id;
      

      // axios.get(reqUrl)
      // .then(function (res) {
      //   self.posts[0] = res.data;

      // })
      // .catch(function (err) {
      //   console.log(err)
      // })
      // var postId = this.$router.currentRoute.params.id;
      // var self = this;
      
      // // Interval hack to check if there are posts in array
      // var interval = setInterval(function() {
      //   // Condition for when there are posts in array
      //   if (self.$store.state.posts.length > 0) {

      //     getCurrentPost

      //     // var curPost = self.$store.state.posts.filter(
      //     //   function(post) {
      //     //     console.log( "iterating" )
      //     //     return post.id === postId
      //     //   }
      //     // )
      //     // console.log(curPost);
      //     // self.posts = curPost;

      //     clearInterval(interval);
      //   }
      // }, 300);
      
      //console.log(curPost)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 3em;
}

.lead {
  font-size: 1.5em;
}

p {
  font-size: 1.1em;
  line-height: 1.4;
}

p.meta {
  font-size: 0.9em;
  opacity: 0.75;
}

.container {
  max-width: 800px;
  width: 92%;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 10px;
}

/*.image-container {
  padding: 8px;
  border: 1px #e1e1e1 solid;
  border-radius: 3px;
}*/

img {
  border-radius: 2px;
}

 .button {
  text-align: center;
  margin: 0 4px 16px 4px;
  border: 1px #2C79E6 solid;
  background-color: #2C79E6;
  display: inline-block;
  width: auto;
  padding: 13px 45px;
  cursor: pointer;
  border-radius: 3px;
  color: #fff;
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
}

.button.outline {
  color: #2C79E6;
  background-color: rgba(0,0,0,0)
}
.button:hover {
  opacity: 0.7;
}

/*.button {
  padding: 16px 38px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
  display: inline-block;
  border-radius: 3px;
}
.button:hover {
  background-color: #999;
}*/
</style>
