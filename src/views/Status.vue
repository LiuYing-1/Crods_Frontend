<template>
  <div class="page-status">
    <!-- Below is Status Not Found -->
    <template v-if="!status.statusText">
      <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/">FlyMeCrods</router-link></li>
          <li><router-link to="/marketplace">Marketplace</router-link></li>
          <li class="is-active"><router-link to="#">Error</router-link></li>
        </ul>
      </nav>

      <section class="section">
        <div class="columns" id="status-not-found">
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
                <h1 class="title">Oops! Status Not Found</h1>
                <p class="subtitle mt-3">The status you are looking for does not exist.</p>              
                <p class="subtitle">Please check the spelling and try again.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Below is the main body of the Status.vue -->
    <template v-else>
      <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/">FlyMeCrods</router-link></li>
          <li><router-link to="/marketplace">Marketplace</router-link></li>
          <li class="is-active"><router-link to="#">{{ status.statusText }}</router-link></li>
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
    </template>
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

                    document.title = 'Error | FlyMeCrods'
                })

            this.$store.commit('setIsLoading', false)        
        },
    }
}
</script>

<style scoped>
#status-not-found .image {
  width: 50%;
  height: 50%;
}

#status-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
}

#status-not-found .column {
  display: flex;
  justify-content: center;
  align-items: center;
}

#status-not-found .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#status-not-found .container .image {
  margin-bottom: 1rem;
}

@media screen and (max-width: 800px) {
  #status-not-found {
    flex-direction: column;
  }
  #status-not-found .column {
    width: 100%;
    justify-content: center;
    align-items: flex-start;
  } 
}
</style>