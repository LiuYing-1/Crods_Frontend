<template>
  <div class="cases">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">FlyMeCrods</a></li>
        <li class="is-active"><a href="/cases" aria-current="page">Cases</a></li>
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