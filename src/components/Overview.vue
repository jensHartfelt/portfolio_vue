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
        <!-- <h1 class="u_m-b-xl u_p-t-md u_t-c">Portfolio</h1> -->
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
                <brush v-if="post.acf.category === 'Grafisk design'"/>
                <camcorder v-if="post.acf.category === 'Film'"/>
                <camcorder v-if="post.acf.category === 'Animationsfilm'"/>
                <cellphone-link v-if="post.acf.category === 'Hjemmeside'" />
                <gamepad-variant v-if="post.acf.category === 'Spil'"/>
                <gesture v-if="post.acf.category === 'Animation'"/>
                
                {{post.acf.category}}
              </p>

              <!-- Title -->
              <h1 class="u_m-b-sm">{{post.acf.title}}</h1>
              
              <!-- Description -->
              <p class="u_m-b-lg">{{post.acf.lead}}</p>
              
              <!-- Action -->
              <router-link  
              :to="{ name: 'Portfolio', params: { id: post.id }}" 
              class="button">
                Læs mere
                <arrow-right />
              </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="section u_p-t-xl" id="contact">
      <!-- <h1 class="u_p-t-md u_t-c">Kontakt</h1> -->

      <div class="content">

        <p class="u_m-b-lg">Jeg er altid åben overfor nye projekter og muligheder, send en mail til:</p>
        <a href="mailto:mail@jenshartfelt.dk" class="button full-width xl contact-button"><email-outline />mail@jenshartfelt.dk</a>
        <p class="u_p-t-xl u_m-b-md">Hvis du vil vide mere om mig, kan du se min <a href="https://www.linkedin.com/in/jens-hartfelt-084b61112/" class="bold">linkedIn profil</a>, nogle flere af mine projekter på <a href="https://codepen.io/JensHartfelt/" class="bold">Codepen</a> eller min <a href="https://github.com/jensHartfelt/" class="bold">github-profil</a></p>
       
       
        <p>Dette website er udviklet med <a href="https://vuejs.org/" class="bold">vue.js</a>. Hvis du vil se kildekoden kan du se den <a class="bold" href="https://github.com/jensHartfelt/portfolio_vue/">på github</a>.</p>
        

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
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/_vars';


@media (min-width: 700px) {
  .section {
    text-align: left;
  }
  .section p {
    font-size: 1.25rem;
    hyphens: auto;
  }
}
@media (max-width: 699px) {
  .section {
    text-align: left;
  }  
  .section p {
    font-size: 1.25rem;
  }
}

.section.landingpage {
  min-height: 100vh;
  animation: enter 500ms ease forwards;

  p {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.35rem;
    line-height: 1.5;
    font-weight: 400;
  }

  .bold {
    font-family: 'Barlow', sans-serif;
    margin-top: -.4rem;
  }
}

@keyframes enter {
  0%   {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);

  }
  
}

.section {
  width: 100vw;
  background-color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.section .content {
  padding: 80px 20px 100px 20px;
  max-width: 600px;
}


.section .bold {
  font-weight: 700;
  color: $blue-primary;
}

.section span.bold {
  display: block;
  font-size: 2.5em;
  font-weight: 700;
  color: $blue-primary;
}

.section a.bold {
  border-width: 0 0 1px 0;
  border-color: $blue-primary;
  border-style: dashed;
  text-decoration: none;
}


.section .button {
  text-align: center;
  margin: 0 4px 16px 0px;
  border: 1px $blue-primary solid;
  background-color: $blue-primary;
  display: inline-block;
  width: auto;
  padding: .6rem 2rem .7rem 2rem;
  cursor: pointer;
  border-radius: 3px;
  color: $white;
  font-weight: 400;
  font-size: 20px;
}

@media (max-width: 374px) {
  .section .button {
    padding: 13px 28px;
  }
}

.button.outline {
  color: $blue-primary;
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
  background-color: $ultra-light-grey;

}

.portfolio-element {
  display: inline-block;
  width: 100%;
  margin: 2% 0;
  vertical-align: top;
  min-height: 100%;
  position: relative;
  h1 {
    font-size: 1.5rem;
  }
}

.seperator {
  background-color: $light-grey;
  height: 1px;
  margin-left: -16px;
  margin-right: -16px;
  display: block;

}

.category {
  color: $grey;

  .material-design-icon {
    fill: $grey;
    margin-right: .25rem;
  }
}

.button {
  padding: 2px 4px;
  text-decoration: none;
  font-weight: 700;
  color: $blue-primary;
  font-size: 1.1em;
  width: 100%;
  display: block;
  margin: -8px 0;
  text-align: right;
  .material-design-icon {
    fill: $blue-primary;
    margin-right: 8px;
    transition: margin 200ms ease;
  }

  &:hover {
    opacity: 0.7; 
    .material-design-icon {
      margin-right: -6px;
      margin-left: 6px;
      transition: margin 200ms ease;
    }
  }

  &.full-width {
    width: 100%;
  }

  &.contact-button {
    .material-design-icon {
      fill: $white;
    }

    &:hover .material-design-icon {
      margin-right: 8px;
      margin-left: 0;
    }
  }

}

p.footer {
  font-size: 1em;
  opacity: 0.6;
}




</style>
