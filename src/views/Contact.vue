<template>
  <div class="contact">
  <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/contact" aria-current="page">Contact</router-link></li>
      </ul>
    </nav>  
    This is the <strong>Contact</strong> page.
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {

    }
  },
  mounted() {
    document.title = "Contact | FlyMeCrods"
  },
}
</script>