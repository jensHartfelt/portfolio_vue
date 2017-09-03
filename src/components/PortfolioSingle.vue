<template>
  <div>
    <div v-if="!pageIsReady" class="u_t-c spinner-container u_m-t-xxl" :class="{active : !pageIsReady}">
      <p>
        <div class="mini-spinner">
        </div>
        Loading content... 
      </p>
    </div>

    <div v-if="pageIsReady" class="container">
      <div class="single-element u_m-b-xxl" v-for="(post, key) in posts" :key="key">

        <div class="u_p-sm u_m-b-xl box">
          <img class="u_m-b-xs" :src="post.acf.image.url">
          <p class="meta">{{post.acf.imageDescription}}</p>
        </div>

        <h1 class="u_m-b-md">{{post.acf.title}}</h1>
        <p class="lead u_m-b-md">{{post.acf.lead}}</p>
        <p class="u_m-b-xl">{{post.acf.content}}</p>

        <a target="blank" :href="post.acf.externalLinkUrl" class="button u_m-b-xxl">
          <i class="material-icons u_m-r-xs">open_in_new</i>
          {{post.acf.externalLinkTitle}}
        </a>
        
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
      posts: [],
      pageIsReady: false
    }
  },
  created() {
    var postId = this.$router.currentRoute.params.id;
    var self = this;


    // If there are no posts in the store (which means you probably came straight to this page)
    // then go ahead and fetch the currently needed post
    if (this.$store.state.posts.length === 0) {
      this.manuallyShowPost(postId);

    // If there are already posts in the store (Which means you clicked a link at the overview)
    // just get the postId from the params and display only that post
    } else {
      console.log( this.$store.state.posts );
      var curPost = this.$store.state.posts.filter(function(post){
        return post.id === postId
      })

      console.log("curPost: ", curPost);
      console.log("self.posts, before pushing: ", self.posts);
      self.posts.push(curPost[0]);
      console.log("self.posts, after pushing: ", self.posts);
      this.pageIsReady = true;
    }



    // function manuallyShowPost() {
    //   var reqUrl = "http://jenshartfelt.dk/portfolio/wp-json/wp/v2/portfolioelement/" + postId + "/"
    //   axios.get(reqUrl)
    //   .then(function (res) {
    //     self.posts.push(res.data);
    //   })
    //   .catch(function (err) {
    //     console.log("There was an error.. Maybe try again?");
    //   })
    //}
  },
  methods: {
    manuallyShowPost: function(postId) {
      var reqUrl = "http://jenshartfelt.dk/portfolio/wp-json/wp/v2/portfolioelement/"+postId+"/";
      console.log("manuallyShowPost from: "+reqUrl);
      axios.get(reqUrl)
      .then( (res) => {
        this.posts.push(res.data);
        this.pageIsReady = true;
      })
      .catch(function (err) {
        console.log("There was an error.. Maybe try again?", err);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '../assets/css/common-style.scss';
@import '../assets/css/material-icons.scss';


// @font-face {
//   font-family: 'Material Icons';
//   font-style: normal;
//   font-weight: 400;
//   src: url('../assets/fonts/MaterialIcons-Regular.eot') format('eot');
//   src: url('../assets/fonts/MaterialIcons-Regular.ttf') format('truetype');
//   src: url('../assets/fonts/MaterialIcons-Regular.woff') format('woff');
//   src: url('../assets/fonts/MaterialIcons-Regular.woff2') format('woff2');
// }
// .material-icons {
//   font-family: 'Material Icons';
//   font-weight: normal;
//   font-style: normal;
//   font-size: 110%;
//   line-height: 1;
//   letter-spacing: normal;
//   text-transform: none;
//   display: inline-block;
//   white-space: nowrap;
//   word-wrap: normal;
//   direction: ltr;
//   -webkit-font-feature-settings: 'liga';
//   -webkit-font-smoothing: antialiased;
//   vertical-align: sub;
//   /* Support for all WebKit browsers. */
//   -webkit-font-smoothing: antialiased;
//   /* Support for Safari and Chrome. */
//   text-rendering: optimizeLegibility;
//   /* Support for Firefox. */
//   -moz-osx-font-smoothing: grayscale;
//   /* Support for IE. */
//   font-feature-settings: 'liga';
// }


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
