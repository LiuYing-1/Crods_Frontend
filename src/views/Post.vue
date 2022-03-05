<template>
  <div class="post-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li class="is-active"><router-link to="/" aria-current="page">Post</router-link></li>
      </ul>
    </nav>
    
    <p class="title">Post</p>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="columns is-multiline">
          <div class="column is-12" id="guideline-slogan">
            <div class="image">
              <img :src="require('@/assets/logo_without_name.png')">
            </div>
            <div class="content has-text-centered">
              <p class="title">Guideline</p>
              <p class="subtitle">Tips to Read before Filling Out the Form</p>
            </div>
          </div>
          
          <div class="column is-4">
            <p>Firstly, you should choose the suitable field tag to match your problem, so that FlyMeCrods will record and display it in the related part.</p>
          </div>
          <div class="column is-4">
            <p>Secondly, you should fill out the form with the correct information, so that FlyMeCrods will record and display it in the related part.</p>
          </div>
          <div class="column is-4">
            <p>Thirdly, you should fill out the form with the correct information, so that FlyMeCrods will record and display it in the related part.</p>
          </div>
        </div>
      </div>
    </div>
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
    },
    mounted() {
      document.title = "Post | FlyMeCrods"
    }
}
</script>

<style scoped>
.post-page #guideline-slogan {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-page #guideline-slogan .image {
  width: 7rem;
  position: absolute;
  z-index: 0;
}

.post-page #guideline-slogan .content {
  z-index: 1;
  margin: 1rem;
}

@media screen and (max-width: 800px) {
}
</style>