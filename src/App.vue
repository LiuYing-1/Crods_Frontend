<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/#">
          <figure class="image is-48x48" id="logo">
            <img src="./assets/logo_without_name.png">
          </figure>
        </router-link>

        <router-link to="/#" class="navbar-item">
          <strong>FlyMeCrods</strong>
        </router-link>

        <a aria-label="menu" aria-expanded='false' data-target="navbar-menu" class="navbar-burger" @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
        <div class="navbar-end">
          <router-link class="navbar-item" to="summer">Summer</router-link>
          <router-link class="navbar-item" to="winter">Winter</router-link>
          
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-light" to="/log-in">
                <span class="icon"><i class="fas fa-user"></i></span>
                <span>Login</span>
              </router-link>

              <router-link class="button is-success" to="/tasks">
                <span class="icon"><i class="fas fa-tasks"></i></span>
                <span>Tasks</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-centered"><i>&copy; 2022 FlyMe.social - All Rights Reserved</i></p>
      <div class="repo">
        <div class="has-text-centered"><i>Repository <a href="https://github.com"><i class="fab fa-github"></i></a> LiuYing-1</i></div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false,
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma';
@font-face {
  font-family: "Noto Serif Display";
  src: local("Noto Serif Display"),
  url(./fonts/NotoSerifDisplay/static/NotoSerifDisplay/NotoSerifDisplay-Regular.ttf) format("truetype"),
}

#wrapper {
  font-family: "Noto Serif Display", serif;
}

.navbar-brand {
  font-size: 1.2rem;
}

#logo {
  margin-left: 1rem;
}

</style>
