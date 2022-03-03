<template>
  <div class="tag-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/marketplace">Marketplace</router-link></li>
        <li class="is-active"><router-link to="#">{{ tag.name }}</router-link></li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ tag.name }}</h2>
      </div>

      <ProblemBox 
        v-for="problem in tag.problems"
        v-bind:key="problem.id"
        v-bind:problem="problem" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

import ProblemBox from '@/components/ProblemBox'

export default {
    name: 'Tag',
    data() {
        return {
            tag: {
                problems: []
            }
        }
    },
    components: {
        ProblemBox
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

</style>