<template>
  <div class="marketplace">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">FlyMeCrods</a></li>
        <li class="is-active"><a href="/marketplace" aria-current="page">Marketplace</a></li>
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
            <router-link to="/" style="color: grey; background-color:#50ffb086">Latest</router-link>
            <router-link to="/informatics">Informatics</router-link>
            <router-link to="/business">Business</router-link>
            <router-link to="/law">Law</router-link>
            <router-link to="/health">Health</router-link>
            <router-link to="/design">Design</router-link>
            <router-link to="/others">Others</router-link>
          </div>

          <div class="column condition2">
            <p class="has-text-grey branch2">Status</p>
            <router-link to="/" style="color: grey; background-color:#50ffb086">All</router-link>
            <router-link to="/">Unaccepted</router-link>
            <router-link to="/">In Progress</router-link>
            <router-link to="/">Completed</router-link>
          </div>
        </div>
      </div>

      <div
       class="column is-3" 
       v-for="problem in latestProblems"
       v-bind:key = "problem.id"
       >
        <div class="box">
          <div class="tag is-dark">{{ problem.get_tagname }}</div>
          <figure class="image mb-4">
            <img v-bind:src="problem.get_thumbnail">
          </figure>

          <h3 class="is-size-4">{{ problem.name }}</h3>
          <p>{{ problem.description }}</p>
          <p class="is-size-6 has-text-grey">Budget: &euro; {{ problem.budget }}</p>
          <p v-if="problem.status==0" class="status">Status: Unaccepted</p>
          <p v-else-if="problem.status==1" class="status">Status: In Progress</p>
          <p v-else-if="problem.status==2" class="status">Status: Completed</p>
          <div id="view-details-button">
            <router-link v-bind:to="problem.get_absolute_url" class="button is-dark mt-4">View Details</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: relative;
  display: flex;
  flex-direction: column;
}

.box #view-details-button {
  place-self: center;
}

.status {
  color:brown;
}

.box p {
  margin-top: 0.5rem;
}

.tag {
  top: 0;
  left: 0;
  z-index: 1;
  position: absolute;
}

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
export default {
  name: 'Marketplace',
  data() {
    return {
      latestProblems: [],
    }
  },
  components: {
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