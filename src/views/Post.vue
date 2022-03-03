<template>
  <div class="post-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li class="is-active"><router-link to="/" aria-current="page">Post</router-link></li>
      </ul>
    </nav>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Post',
    data() {
        return {
            errors: []
        }
    }
}
</script>

<style>

</style>