<template>
  <div class="base u_p-t-xxl">
    <div v-if="!pageIsReady" class="u_t-c spinner-container u_p-t-xxl" :class="{active : !pageIsReady}">
      <p>
        <div class="mini-spinner">
        </div>
        Loading content... 
      </p>
    </div>

    <div v-if="pageIsReady" class="container">
      <div class="single-element u_p-b-xxl" v-for="(post, key) in posts" :key="key">

        <h1 class="u_m-b-md u_m-t-lg">{{post.acf.title}}</h1>

        <div class="meta u_m-b-xl">
          <p class="u_m-r-lg">
            <i class="material-icons">date_range</i>
            22. marts 2017
          </p>
          <p>
            <i class="material-icons">crop</i>
            Animation
          </p>
        </div>


        <!-- Image -->
        <div class="image-container u_m-t-lg u_m-b-xl">
          <img 
            :srcset="
              post.acf.image.sizes.thumbnail+' 150w,'+
              post.acf.image.sizes.medium+' 300w,'+
              post.acf.image.sizes.medium_large+' 768w,'+
              post.acf.image.sizes.large+' 1024w'"
            sizes="
              (min-width: 360px) 768px,
              (min-width: 300px) 300px,
              150px"
            :src="post.acf.image.sizes.medium_large"
          >
        </div>


        <p class="lead u_m-b-md">{{post.acf.lead}}</p>
        <p class="u_m-b-xl">{{post.acf.content}}</p>

        <a target="blank" :href="post.acf.externalLinkUrl" class="button u_p-b-xxl">
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
      var curPost = this.$store.state.posts.filter(function(post){
        return post.id === postId;
      })
      self.posts.push(curPost[0]);
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

.base {
  background-color: $ultra-light-grey;
}

.lead {
  font-size: 1.5em;
}

p {
  font-size: 1.1em;
  line-height: 1.4;
}

.meta p {
  display: inline-block;
  font-size: 0.9em;
  color: $grey;

}

.container {
  max-width: 800px;
  width: 92%;
  margin: 0 auto;
}

/*.image-container {
  padding: 8px;
  border: 1px #e1e1e1 solid;
  border-radius: 3px;
}*/

  img {
    border-radius: 2px;
  }
.image-container {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}
@media (max-width: 700px) {
  img {
    border-radius: 0px;
  }
  .image-container {
    margin-left: -4%;
    margin-right: -4%;
  }
  
}

 .button {
  text-align: center;
  margin: 0 4px 16px 4px;
  border: 1px $blue-primary solid;
  background-color: $blue-primary;
  display: inline-block;
  width: auto;
  padding: 13px 45px;
  cursor: pointer;
  border-radius: 3px;
  color: $white;
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
}

.button.outline {
  color: $blue-primary;
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
