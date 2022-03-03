<template>
  <div class="tasks">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="#">Tasks</router-link></li>
      </ul>
    </nav>

    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <p class="intro has-text-centered subtitle"><b>Post Your Problem by Filling Out a Form</b></p>
          <div class="image">
            <img :src="require('@/assets/post_problem.jpg')" alt="post-problem">
          </div>
          <button class="button is-dark">
            <router-link to="/post"><p class="is-size-4">Post</p></router-link>
          </button>
          
          <p class="reference-pic">Photo by Tara Winstead from Pexels</p>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <p class="intro has-text-centered subtitle"><b>Check Your Tasks that Are Ready to Do</b></p>
          <div class="image">
            <img :src="require('@/assets/ready_todo_cart.jpg')" alt="ready-to-do" @load="loadBar">
          </div>
          <button class="button is-dark">
            <router-link to="/checklist"><p class="is-size-4">Check</p></router-link>
          </button>
          
          <p class="reference-pic">Photo by Startup Stock Photos from Pexels</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  data () {
    return {
    }
  },
  methods: {
    loadBar () {
      this.$store.commit('setIsLoading', false) 
    }
  },
  mounted() {
    document.title = "Tasks | FlyMeCrods"
    this.$store.commit('setIsLoading', true) 
  },
}
</script>

<style scoped>
.columns .box {
  background-color: #363636;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.columns .box p{
  color: white;
}

.columns .box .button {
  position: absolute;
  bottom: 3rem;
  place-self: center;
  border-radius: 1rem;
  padding: 1.5rem;
}

.reference-pic {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
  font-size: 0.8rem;
  color: #363636;
}

</style>