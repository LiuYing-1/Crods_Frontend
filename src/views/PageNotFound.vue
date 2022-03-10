<template>
  <div class="page-not-found">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="#">Page Not Found</router-link></li>
      </ul>
    </nav>

    <section class="section">
      <div class="columns" id="tag-not-found">
        <div class="column">
          <div class="image">
            <img :src="require('@/assets/logo.png')" alt="logo">
          </div>
        </div>

        <div class="column">
          <div class="content container">
            <div class="image">
              <img :src="require('@/assets/universities_inline.png')" alt="universities">
            </div>
            <div class="mt-4">
              <h1 class="title">Oops! Page Not Found</h1>
              <p class="subtitle mt-3">You have lost in FlyMeCrods.</p>              
              <p class="subtitle">Please check the spelling and try again.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    document.title = 'Page Not Found | FlyMeCrods' 
  }
}
</script>

<style scoped>
#tag-not-found .image {
  width: 50%;
  height: 50%;
}

#tag-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
}

#tag-not-found .column {
  display: flex;
  justify-content: center;
  align-items: center;
}

#tag-not-found .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#tag-not-found .container .image {
  margin-bottom: 1rem;
}

@media screen and (max-width: 800px) {
  #tag-not-found {
    flex-direction: column;
  }
  #tag-not-found .column {
    width: 100%;
    justify-content: center;
    align-items: flex-start;
  } 
}
</style>