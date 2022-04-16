<template>
  <div id="wrapper">
    <nav class="navbar is-dark is-fixed-top">
      <div class="navbar-brand">
        <!-- Logo of the business -->
        <router-link :to="{name: 'Home'}">
          <figure class="image is-48x48" id="logo">
            <img src="./assets/logo_without_name.png">
          </figure>
        </router-link>

        <!-- Name of the business -->
        <router-link :to="{name: 'Home'}" class="navbar-item" id="name">
          <strong>FlyMeCrods</strong>
        </router-link>

        <!-- Hamburger menu -->
        <a aria-label="menu" aria-expanded='false' data-target="navbar-menu" class="navbar-burger" @click="showMobileMenu = !showMobileMenu" v-bind:class="{'is-active': showMobileMenu}">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <!-- Items of the menu -->
      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
        <!-- Items (Normal) -->
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{name: 'Home'}">Home</router-link>
          <router-link class="navbar-item" :to="{name: 'Marketplace'}">Marketplace</router-link>
          <router-link class="navbar-item" :to="{name: 'Cases'}">Cases</router-link>
          <router-link class="navbar-item" :to="{name: 'Introduction'}">Introduction</router-link>
          <router-link class="navbar-item" :to="{name: 'Contact'}">Contact</router-link>

          <div class="navbar-item" id="search-part">
            <form method="get" action="/search">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input" placeholder="Search your problems here" name="query">
                </div>

                <div class="control">
                  <button class="button is-light">
                    <span class="icon">
                      <i class="fas fa-search"></i>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- Items (Specific) -->
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-light" to="/tasks">
                <span class="icon"><i class="fas fa-tasks"></i></span>
                <span>Tasks ({{ tasksTotalNum }})</span>
              </router-link>

              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-success">My account</router-link>
              </template>
              
              <template v-else>
                <div class="dropdown is-right" v-bind:class="{'is-active': showDropdownMenu}">
                  <div class="dropdown-trigger" @click="showDropdownMenu = !showDropdownMenu">
                    <button class="button is-success" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span class="icon">
                        <i class="fas fa-user"></i>
                      </span>
                      <span>Login</span>
                      <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <router-link class="dropdown-item" to="/login">Login</router-link>
                      <router-link class="dropdown-item" to="/register">Register</router-link>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading}">
      <div class="lds-dual-ring"></div>
    </div>

    <section class="section">
      <router-view :key="$router.path" />
    </section>

    <footer class="footer">
      <p class="has-text-centered">&copy; 2022 FlyMe.social - All Rights Reserved</p>
      <div class="repo">
        <div class="has-text-centered">Repository <a href="https://github.com"><i class="fab fa-github"></i></a> LiuYing-1</div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'

import WebChat from './components/WebChat.vue'
import bulmaCarousel from '../node_modules/bulma-extensions/bulma-carousel/dist/js/bulma-carousel.min.js'
export default {
  data() {
    return {
      itemSelected: false,
      showMobileMenu: false,
      showDropdownMenu: false,

      tasks: {
        items: []
      }
    }
  },
  computed: {
    tasksTotalNum() {
      let totalNum = 0

      for (let i = 0; i < this.tasks.items.length; i++) {
        totalNum = this.tasks.items.length
      }

      return totalNum
    }
  },

  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },

  mounted() {
    this.tasks = this.$store.state.tasks
  },
  watch: {
    '$route' (to, from) {
      if (to.name !== 'Home') {
        this.showDropdownMenu = false
      } else {
        this.showDropdownMenu = true
      }
      this.showDropdownMenu = false
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma';
@import '../node_modules/bulma-extensions/bulma-carousel/dist/css/bulma-carousel.min.css';
@font-face {
  font-family: "Noto Serif Display";
  src: local("Noto Serif Display"),
  url(./fonts/NotoSerifDisplay/static/NotoSerifDisplay/NotoSerifDisplay-Regular.ttf) format("truetype"),
}

#wrapper {
  font-family: "Noto Serif Display", '宋体', serif;
}

button {
  font-family: "Noto Serif Display", '宋体', serif;
}

.navbar-brand #name {
  font-size: 1.2rem;
}

#logo {
  margin-left: 1rem;
}

.dropdown-content {
  background-color: #363636;
}

.dropdown-item {
  color: white;
  font-size: 1rem;
}

.section {
  margin-top: 2rem;
}

// This is the part for the Loading Bar
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
    height: 0;
    overflow: hidden;

    -webkit-transition: all 0.3s;
    transition: all 0.3s;

    &.is-loading {
      height: 80px;
    }
}

#search-part input {
  font-family: "Noto Serif Display", 宋体;
  src: local("Noto Serif Display"),
  url(./fonts/NotoSerifDisplay/static/NotoSerifDisplay/NotoSerifDisplay-Regular.ttf) format("truetype"),
}
</style>
