<template>
  <div class="solution-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/my-account">My Account</router-link></li>
        <li class="is-active"><router-link to="#" aria-current="page">Solution</router-link></li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Solution</h1>
      </div>
      <div class="image">
        <img :src="this.problem.get_thumbnail" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Solution',
  data() {
    return {
      solution: {},
      problem: {},
    }
  },
  methods: {
    getSolution() {
      const solution_id = this.$route.query.id;
      axios
        .get(`/api/v1/solutions/solution/${solution_id}/`)
        .then(response => {
          this.solution = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },

    getProblem() {
      const tag_slug = this.$route.params.tag_slug;
      const problem_slug = this.$route.params.problem_slug;
      
      axios
        .get(`/api/v1/problems/${tag_slug}/${problem_slug}/`)
        .then(response => {
          this.problem = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    }

  },
  mounted() {
    this.getSolution()
    this.getProblem()
    document.title = 'Solution | FlyMeCrods'
  }
}
</script>

<style>

</style>