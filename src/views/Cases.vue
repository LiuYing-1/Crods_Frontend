<template>
  <div class="cases">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/cases" aria-current="page">Cases</router-link></li>
      </ul>
    </nav>
    This is the <strong>Cases</strong> page.
  </div>
</template>

<script>
export default {
  name: 'Cases',
  data() {
    return {

    }
  },
  mounted() {
    document.title = "Cases | FlyMeCrods"
  },
}
</script>