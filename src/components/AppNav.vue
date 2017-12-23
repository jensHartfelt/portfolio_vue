<template>
	<div class="nav-container">
		<transition 
			:name="this.$store.state.transitionMode" 
			mode="out-in"
		>        
			<div v-if="atOverview" class="container overview">
				<p @click="scrollTo('top')" class="title">JENS HARTFELT</p>
				<div class="navigation">
					<a @click="scrollTo('portfolio')" :class="{ active : portfolioActive }" tabindex="1">Portfolio</a>
					<a @click="scrollTo('contact')"  :class="{ active : contactActive }" tabindex="2">Kontakt</a>
				</div>
			</div>

			<div v-else class="container portfolio back-button" :key="2">
				<router-link :to="backButtonLocation" class="button u_c-blue">
					<i class="material-icons u_c-blue">chevron_left</i>
					Tilbage
				</router-link>
			</div>
		</transition>
	</div>
</template>

<script>
import axios from 'axios'
import tinyAnimate from 'tinyAnimate'

export default {
	name: 'app-nav',
	props: ['title'],
	data () {
		return {
			atOverview: true,
			backButtonLocation: "/",
			portfolioActive: false,
			contactActive: false
		}
	},
	created() {
		this.checkIfScrollHandleIsNeeded();
	},
	updated() {
		this.checkIfScrollHandleIsNeeded();
	},
	methods: {
		checkIfScrollHandleIsNeeded: function() {
			if (this.$route.name === "Overview") {
				window.addEventListener('scroll', this.handleScroll);
			} else {
				window.removeEventListener('scroll', this.handleScroll);
				this.atOverview = false;
			} 
		},
		handleScroll: function(e) {
			var curScroll = e.target.body.scrollTop + 50;
			var portfolioOffset = document.getElementById("portfolio").offsetTop;
			var contactOffset = document.getElementById("contact").offsetTop

			if (curScroll > portfolioOffset && curScroll < contactOffset) {
				this.portfolioActive = true;
			} else {
				this.portfolioActive = false;        
			}

			if (curScroll > contactOffset || curScroll + 100 + window.innerHeight > document.body.offsetHeight ) {
				this.contactActive = true;
				this.portfolioActive = false;     
			} else {
				this.contactActive = false;
			}
		},
		scrollTo: function(arg) {
			var self = this;

			// Removes dynamic link highlighting on scroll, and manually set the clicked link to active
			window.removeEventListener('scroll', this.handleScroll);

			// Decide which link to scroll to and to set active
			if (arg === "portfolio") {
				var scrollEnd = document.getElementById("portfolio").offsetTop - 32;
				this.portfolioActive = true; 
				this.contactActive = false; 
			} else if (arg === "contact") {
				var scrollEnd = document.getElementById("contact").offsetTop - 32;
				this.portfolioActive = false; 
				this.contactActive = true; 
			} else if (arg === "top") {
				var scrollEnd = 0;
				this.portfolioActive = false; 
				this.contactActive = false; 
			}
			var scrollStart = window.scrollY;
			tinyAnimate.animate(scrollStart, scrollEnd, 500, apply, "easeInOutCubic");
			function apply(e) {
				window.scrollTo(0, e);
			}
			
			if (self.$route.name === "Overview") {
				// Re-enable the dynamic link highlighting on scroll
				window.addEventListener('scroll', self.handleScroll);    
			}
		},
	},
	watch: {
		'$route' (to, from) {
			console.log('Watching route in AppNav.vue. to.name: ',  to.name);
			if (to.name === "Overview") {
				this.atOverview = true;

			} else if (to.name === "Portfolio")  {
				window.removeEventListener('scroll', this.handleScroll);      
				this.atOverview = false;
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import '../assets/css/material-icons.scss';
@import '../assets/css/_vars';

// @import '../assets/css/common-style.scss';

.nav-container {
	position: fixed;
	top: 0;
	width: 100vw;
	max-height: 1000px;
	background-color: $white;
	border: $light-grey solid;
	border-width: 0 0 1px 0;
	z-index: 1;
}

@media (min-width: 401px) {
	.nav-container .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
}
@media (max-width: 400px) {
	.nav-container .container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.nav-container .title {
		margin-bottom: -15px;
	}
}

.nav-container a {
	border-width: 0 0 4px 0;
	border-style: solid;
	border-color: rgba(0,0,0,0);
	margin-top: 2px;
	padding: 0 15px;
	line-height: 44px;
	display: inline-block;
}

.nav-container a:hover {
	cursor: pointer;
	color: $blue-primary;
}

.nav-container a.active {
	border-color: $blue-primary;
	color: $blue-primary;
}

.nav-container .title {
	line-height: 50px;
	font-weight: 700;
	font-size: 1.1em;
}

.nav-container .title:hover {
	color: $blue-primary;
	cursor: pointer;
}

.back-button.container:hover i {
	transform: translateX(-5px);
	transition: transform 240ms ease;
}

.back-button.container i {
	vertical-align: middle;
	margin-bottom: 3px;
	margin-left: -5px;
	margin-right: 3px;
	transition: transform 240ms ease;
}

.back-button.container a {
	text-decoration: none;
	padding-left: 0px;
	font-weight: 700;
	width: 100%;
}

</style>