<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
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
        </div>
        <!-- Items (Specific) -->
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-light" to="tasks">
                <span class="icon"><i class="fas fa-tasks"></i></span>
                <span>Tasks</span>
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
                      <router-link class="dropdown-item" to="login">Login</router-link>
                      <router-link class="dropdown-item" to="register">Register</router-link>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>

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
    }
  },
  beforeCreated() {
    this.$store.commit('initializeStore')

    const token = this.$store.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
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
  font-family: "Noto Serif Display", serif;
}

button {
  font-family: "Noto Serif Display", serif;
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

</style>
