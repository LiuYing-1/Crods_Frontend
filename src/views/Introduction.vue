<template>
  <div class="introduction">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">FlyMeCrods</a></li>
        <li class="is-active"><a href="/introduction" aria-current="page">Introduction</a></li>
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