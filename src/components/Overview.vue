<template>
  <div>

    <div class="section landingpage">
      <div class="content">
        <p class="intro u_m-b-xl">
          Hej! Mit navn er <span class="bold">Jens Hartfelt</span>
          Jeg brænder for frontendudvikling og webdesign. Lige nu arbejder jeg hos <a href="http://www.toecho.dk" target="blank" class="bold">To Echo</a> som frontendudvikler og læser <a href="http://www.kea.dk/en/programmes/top-up-bachelor-degree-ba-programmes/ba-in-web-development/" target="blank" class="bold">web development på KEA</a>. 

        </p>
        <div class="actions">
          <p @click="scrollTo('portfolio')" class="button u_m-b-md">Portfolio</p>
          <p @click="scrollTo('contact')" class="button outline">Kontakt</p>
        </div>
      </div>
    </div>

    <div class="container-fluid u_p-t-xl u_p-b-xl" id="portfolio">
      <div class="container">
        <!-- Posts -->
        <h1 class="u_m-b-xl u_p-t-md u_t-c">Portfolio</h1>
        <div class="columns-container u_m-b-xl">

          <div v-if="this.$store.state.spinnerActive" class="u_t-c spinner-container" :class="{active : this.$store.state.spinnerActive}">
            <p>
              <div class="mini-spinner">
              </div>
              Loading projects... 
            </p>
          </div>



          <!--<div class="portfolio-element fake box u_p-md">
              <div class="image-container u_m-b-md">
              </div>
              <div class="fake-title u_m-b-xl u_m-t-xl">
              </div>
              <div class="fake-content full-width u_m-b-sm">
              </div>
              <div class="fake-content full-width u_m-b-sm">
              </div>
              <div class="fake-content full-width u_m-b-sm">
              </div>
              <div class="fake-content normal-width">
              </div>
          </div>-->

          <div 
            class="portfolio-element box u_p-md"
            v-for="(post, key) in posts"
            :id="post.id"
            :key="key"
            >
            
              <!-- Image -->
              <div class="image-container u_m-b-md">
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

              <!-- Category -->
              <p class="category u_m-b-md"> 
                <i class="material-icons">
                  {{getCategoryIcon(post.acf.category)}}
                </i> 
                {{post.acf.category}}
              </p>

              <!-- Title -->
              <h1 class="u_m-b-sm">{{post.acf.title}}</h1>
              
              <!-- Description -->
              <p class="u_m-b-lg">{{post.acf.lead}}</p>
              
              <!-- Action -->
              <router-link  
                :to="{ name: 'Portfolio', params: { id: post.id }}" 
                class="button">Læs mere
              <i class="material-icons">arrow_forward</i>
              </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="section u_m-t-xl" id="contact">
      <h1 class="u_p-t-md u_t-c">Kontakt</h1>

      <div class="content">

        <p class="u_m-b-lg">Jeg er altid åben overfor nye projekter og muligheder, send en mail til:</p>
        <a href="mailto:mail@jenshartfelt.dk" class="button full-width xl"><i class="material-icons">mail_outline</i> mail@jenshartfelt.dk</a>
        <p class="u_p-t-xl u_m-b-md">Hvis du vil vide mere om mig, kan du se min <a href="" class="bold">linkedIn profil</a> eller nogle flere af mine projekter på <a href="" class="bold">Codepen.</a></p>
        <p>Dette website er udviklet med <a href="" class="bold">vue.js</a>, <a href="" class="bold">vue-router</a>, <a href="" class="bold">vuex</a>, <a href="" class="bold">axios</a>, <a href="" class="bold">TinyAnimate</a>, <a href="" class="bold">webpack</a>, <a href="" class="bold">git</a> og <a href="" class="bold">wordpress</a>. Hvis du vil se kildekoden kan du se den <a class="bold" href="">på github</a>.</p>

      </div>
      
      <p class="footer u_m-b-xxl">Jens Hartfelt 2017</p>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import tinyAnimate from 'tinyAnimate'

export default {
  name: 'overview',
  data () {
    return {
      posts: this.$store.state.posts
    }
  },
  methods: {
    scrollTo:function(arg) {
      // Get position of portfolio section

      if (arg === "portfolio") {
        var scrollEnd = document.getElementById("portfolio").offsetTop - 32;
      } else if (arg === "contact") {
        var scrollEnd = document.getElementById("contact").offsetTop - 32;
      }
      
      var scrollStart = window.scrollY;
    
      tinyAnimate.animate(scrollStart, scrollEnd, 500, apply, "easeInOutCubic");

      function apply(e) {
        window.scrollTo(0, e);
      }

      console.log("scrollTo: " + arg)
    },
    getCategoryIcon: function(category) {
      switch (category) {
        case "Hjemmeside": 
          return "devices";

        case "Film": 
          return "videocam";

        case "Animationsfilm": 
          return "videocam";

        case "Spil": 
          return "games";

        case "Grafisk design": 
          return "brush";
          
        case "Animation": 
          return "transform";
          
        default: 
          return "broken_image";
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import '../assets/css/material-icons.scss';


@media (min-width: 700px) {
  .section {
    text-align: left;
  }
  .section p {
    font-size: 24px;
    hyphens: auto;
  }
}
@media (max-width: 699px) {
  .section {
    text-align: left;
  }  
  .section p {
    font-size: 20px;
  }
}

.section.landingpage {
  margin: -60px 0 0 0;
  min-height: 100vh;
}

.section {
  width: 100vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.section .content {
  padding: 100px 20px;
  max-width: 600px;
}


.section .bold {
  font-weight: 700;
  color: #2C79E6;
}

.section span.bold {
  display: block;
  font-size: 2.5em;
  font-weight: 700;
  color: #2C79E6;
}

.section a.bold {
    border-width: 0 0 1px 0;
    border-color: #2C79E6;
    border-style: dashed;
    text-decoration: none;
}


.section .button {
  text-align: center;
  margin: 0 4px 16px 0px;
  border: 1px #2C79E6 solid;
  background-color: #2C79E6;
  display: inline-block;
  width: auto;
  padding: 13px 42px;
  cursor: pointer;
  border-radius: 3px;
  color: #fff;
  font-weight: 400;
  font-size: 20px;
}

.section .button.xl {
  font-size: 24px;
}

.section .button.full-width {
  width: 100%;
}

@media (max-width: 374px) {
  .section .button {
    padding: 13px 28px;
  }
}

.button.outline {
  color: #2C79E6;
  background-color: rgba(0,0,0,0)
}

@media (min-width: 1000px) {
  .columns-container {
    columns: 3;
  }
}

@media (min-width: 700px) and (max-width: 999px) {
  .columns-container {
    columns: 2;
  }
}

.container-fluid#portfolio {
  min-height: 500px;
  background-color: #f2f2f3;

}

.portfolio-element h1 {
  font-size: 1.5em;
}









/* Fake it till you make it content  */
.portfolio-element.fake * {
  animation: loading 1000ms infinite ease-in-out;
}

@keyframes loading {
  0%   {opacity: 0.4;}
  90%  {opacity: 1;}
  100% {opacity: 0.4;}
}

.portfolio-element.fake {
  transform: translateX(100%);
}

.portfolio-element.fake .fake-title {
  width: 75%;
  height: 26px;
  background-color: #e1e1e1;
}

.portfolio-element.fake .fake-content {
  height: 8px;
  background-color: #e1e1e1;
}

.portfolio-element.fake .fake-content.full-width {
  width: 100%;
}

.portfolio-element.fake .fake-content.normal-width {
  width: 70%;
}





.portfolio-element {
  display: inline-block;
  width: 100%;
  margin: 2% 0;
  vertical-align: top;
  min-height: 100%;
  overflow: hidden;
  position: relative
}

.seperator {
  background-color: #e1e1e1;
  height: 1px;
  margin-left: -16px;
  margin-right: -16px;
  display: block;

}

.image-container {
  margin-right: -15px;
  margin-left: -15px;
  margin-top: -15px;
  position: relative;
  padding-bottom: 63.1510416667%; /* ratio of image height to width */
  height: 0;
  overflow: hidden;
  background-color: #e1e1e1; 
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.category {
  color: #777;
}
.category i {
  font-size: 18px;
  vertical-align: sub;
}

.button {
  padding: 8px 4px;
  text-decoration: none;
  font-weight: 700;
  color: #2C79E6;
  font-size: 1.1em;
  width: 100%;
  display: block;
  margin: -8px 0;
  text-align: right;
}
.button i {
  vertical-align: sub;
  margin-right: 8px;
  transition: margin 200ms ease;
}
.button:hover,
a:hover {
  opacity: 0.7; 
}
.portfolio-element .button:hover>i {
  margin-right: -6px;
  margin-left: 6px;
  transition: margin 200ms ease;
}

p.footer {
  font-size: 1em;
  opacity: 0.6;
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
