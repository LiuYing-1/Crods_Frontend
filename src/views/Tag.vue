<template>
  <div class="tag-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">FlyMeCrods</a></li>
        <li><a href="/marketplace">Marketplace</a></li>
        <li class="is-active"><a>{{ tag.name }}</a></li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ tag.name }}</h2>
      </div>

      <div 
          class="column is-3" 
          v-for="problem in tag.problems"
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

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'Tag',
    data() {
        return {
            tag: {
                problems: []
            }
        }
    },
    mounted() {
        this.getTag()
    },
    methods: {
        async getTag() {
            const tagSlug = this.$route.params.tag_slug

            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/api/v1/problems/${tagSlug}/`)
                .then(response => {
                    this.tag = response.data

                    document.title = this.tag.name + ' | FlyMeCrods'
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
</style>