<template>
  <div class="introduction">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/introduction" aria-current="page">Introduction</router-link></li>
      </ul>
    </nav>
    <h1>This is the <strong>Introduction</strong> page.</h1>

    <section class="section">
      <div class="to-top-button">
        <to-top-button></to-top-button>
      </div>
    </section>
  </div>
</template>

<script>
import toTopButton from '@/components/TheToTopButton.vue'

export default {
  name: 'Introduction',
  data() {
    return {

    }
  },
  components: {
    toTopButton,
  },
  mounted() {
    document.title = "Introduction | FlyMeCrods"
  },
}
</script>

<style scoped>
.to-top-button {
  position: fixed;
  top: 4.5rem;
  right: -2.5rem;
}
</style>