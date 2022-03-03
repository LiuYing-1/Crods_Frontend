<template>
  <div class="marketplace">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/marketplace" aria-current="page">Marketplace</router-link></li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest 12 Requests</h2>
      </div>

      <div class="column is-12 condition">
        <div class="columns is-multiline">
          <div class="column condition1">
            <p class="has-text-grey branch1">Field</p>
            <router-link :to="this.$route.path" style="color: grey; background-color:#50ffb086">Latest</router-link>
            <router-link to="/informatics">Informatics</router-link>
            <router-link to="/business">Business</router-link>
            <router-link to="/law">Law</router-link>
            <router-link to="/health">Health</router-link>
            <router-link to="/design">Design</router-link>
            <router-link to="/others">Others</router-link>
          </div>

          <div class="column condition2">
            <p class="has-text-grey branch2">Status</p>
            <router-link :to="this.$route.path" style="color: grey; background-color:#50ffb086">All</router-link>
            <router-link to="/status/unaccepted">Unaccepted</router-link>
            <router-link to="/status/in-progress">In Progress</router-link>
            <router-link to="/status/completed">Completed</router-link>
          </div>
        </div>
      </div>

      <ProblemBox 
        v-for="problem in latestProblems"
        v-bind:key="problem.id"
        v-bind:problem="problem" />
    </div>
  </div>
</template>

<style scoped>
.condition .condition1 {
  display: flex;
  justify-content: space-evenly;
}

.condition .condition2 {
  display: flex;
  justify-content: space-evenly;
}

.condition a, .condition p {
  padding: 0.5rem;
}

.condition a {
  color: black;
  border-radius: 0.4rem;
  text-decoration: none;
}

.condition a:hover {
  color: grey;
  cursor: pointer;
  transition: all 0.6s;
  background-color: #50ffb086;
}

@media screen and (max-width: 800px) {
  .condition .columns{
    display: flex;
    flex-direction: row;
  }

  .condition .condition1 {
    display: flex;
    flex-direction: column;
  }

  .condition .condition2 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}

</style>

<script>
import axios from 'axios'

import ProblemBox from '@/components/ProblemBox'

export default {
  name: 'Marketplace',
  data() {
    return {
      latestProblems: [],
    }
  },
  components: {
    ProblemBox,
  },
  mounted() {
    this.getLatestProblems()

    document.title = "Marketplace | FlyMeCrods"
  },
  methods: {
    getLatestProblems() {
      axios
        .get('/api/v1/latest-problems')
        .then(response => {
          this.latestProblems = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
}
</script>