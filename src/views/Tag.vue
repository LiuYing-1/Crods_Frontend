<template>
  <div class="tag-page">
    <!-- Below is Tag Not Found -->
    <template v-if="!tag.name">
      <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/">FlyMeCrods</router-link></li>
          <li><router-link to="/marketplace">Marketplace</router-link></li>
          <li class="is-active"><router-link to="#">Error</router-link></li>
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
                <h1 class="title">Oops! Tag not found</h1>
                <p class="subtitle mt-3">The tag you are looking for does not exist.</p>              
                <p class="subtitle">Please check the spelling and try again.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
    
    <!-- Below is the main body of the Tag.vue -->
    <template v-else>
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
    </template>
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
                    document.title = 'Error | FlyMeCrods'
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