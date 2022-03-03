<template>
  <div class="search-page">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">
          <span>Search</span>
          <span>
            <button class="button is-primary" @click="goBack">
              <span class="icon">
                <i class="fas fa-angle-left"></i>
              </span>
              <span>Back</span>
            </button>
          </span>
        </h1>
        <h2 class="is-size-5 has-text-grey" id="result-num">
          Term: "<b>{{ query }}</b>" | Total: <b>{{ problems.length }}</b>
        </h2>
        <hr />
      </div>
      
      <template v-if="problems.length==0">
        <div class="column is-12">
          <p class="has-text-grey">Sorry, no results found.</p>
        </div>
      </template>
      <template v-else>
        <ProblemBox 
            v-for="problem in problems"
            v-bind:key="problem.id"
            v-bind:problem="problem" />
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProblemBox from '@/components/ProblemBox.vue'

export default {
    name: 'Search',
    data() {
        return {
            problems: [],
            query: '',
        }
    },
    components: {
        ProblemBox
    },
    mounted() {
        document.title = 'Search | FlyMeCrods'

        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)

        if (params.get('query')) {
            this.query = params.get('query')

            this.performSearch()
        }
    },
    methods: {
        async performSearch() {
            this.$store.commit('setIsLoading', true)

            await axios
                    .post('/api/v1/problems/search/', {'query': this.query})
                    .then(response => {
                        this.problems = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })

            this.$store.commit('setIsLoading', false)
        },
        goBack() {
            this.$router.go(-1)
        },
    }
}
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>