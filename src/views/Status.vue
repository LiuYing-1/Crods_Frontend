<template>
  <div class="page-status">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">FlyMeCrods</a></li>
        <li><a href="/marketplace">Marketplace</a></li>
        <li class="is-active"><a>{{ status.statusText }}</a></li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ status.statusText }}</h2>
      </div>
      <template v-if="status.problems.length != 0">
        <ProblemBox 
        v-for="problem in status.problems"
        v-bind:key="problem.id"
        v-bind:problem="problem" />
      </template>
      <template v-else>
        <div class="column is-12">
          <p class="is-size-4 has-text-centered">
            <span class="icon"><i class="far fa-grin-beam-sweat"></i></span>
            <span> Sorry, there is no problem in the '{{ status.statusText }}' status, currently.</span>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import ProblemBox from '@/components/ProblemBox'

export default {
    name: 'Status',
    data() {
        return {
            status: {
                statusText: '',
                problems: []
            }
        }
    },
    components: {
        ProblemBox
    },
    mounted() {
        this.getStatus()
    },
    methods: {
        async getStatus() {
            var statusSlug = this.$route.params.status
            
            if (statusSlug == 'unaccepted') {
                statusSlug = 0
                this.status.statusText = 'Unaccepted'
            } else if (statusSlug == 'in-progress') {
                statusSlug = 1
                this.status.statusText = 'In Progress'
            } else if (statusSlug == 'completed') {
                statusSlug = 2
                this.status.statusText = 'Completed'
            }

            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/api/v1/problems/${statusSlug}/`)
                .then(response => {
                    this.status.problems = response.data

                    document.title = this.status.statusText + ' | FlyMeCrods'
                })
                .catch(error => {
                    console.log(error)

                    toast({
                        message: "Something went wrong. Please try again.",
                        type: "is-danger",
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })

            this.$store.commit('setIsLoading', false)        
        }
    }
}
</script>

<style scoped>

</style>