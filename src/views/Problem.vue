<template>
  <div class="problem">
    <!-- Below is Problem Not Found -->
    <template v-if="!problem.name">
      <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/">FlyMeCrods</router-link></li>
          <li><router-link to="/marketplace">Marketplace</router-link></li>
          <li class="is-active"><router-link to="/" aria-current="page">Error</router-link></li>
        </ul>
      </nav>

      <section class="section">
        <div class="columns" id="problem-not-found">
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
                <h1 class="title">Oops! Problem Not Found</h1>
                <p class="subtitle mt-3">The problem you are looking for does not exist.</p>              
                <p class="subtitle">Please check the spelling and try again.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Below is the main body of Problem.vue -->
    <template v-else>
      <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/">FlyMeCrods</router-link></li>
          <li><router-link to="/marketplace">Marketplace</router-link></li>
          <li class="is-active"><router-link to="/problem" aria-current="page">Problem</router-link></li>
        </ul>
      </nav>

      <div class="columns is-multiline">
        <div class="column is-6">
          <figure class="image mb-6">
            <img v-bind:src='problem.get_image'>
          </figure>

          <h1 class="title">{{ problem.name }}</h1>
          <p>{{ problem.description }}</p>
        </div>

        <div class="column is-4 is-offset-1">
          <h2 class="subtitle"><b>Details</b></h2>

          <table class="table">
            <tr>
              <th>Request-ID</th>
              <td>#{{ problem.id }}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{{ problem.status }}</td>
            </tr>
            <tr>
              <th>Field</th>
              <td>{{ problem.get_tagname }}</td>
            </tr>
            <tr>
              <th>Branch</th>
              <td>{{ problem.name }}</td>
            </tr>
            <tr>
              <th>Requirements</th>
              <td>{{ problem.details }}</td>
            </tr>
            <tr>
              <th>Deadline</th>
              <td>{{ problem.deadline }}</td>
            </tr>
            <tr>
              <th>Budget</th>
              <td>&euro; {{ problem.budget }}</td>
            </tr>
            <tr>
              <th>Posted-Date</th>
              <td>{{ problem.date_posted }}</td>
            </tr>
            <tr>
              <th>Poster</th>
              <td>{{ problem.get_username }}</td>
            </tr>
          </table>

          <div class="field">
            <div class="control">
              <a class="button is-dark" @click="addToTasks" v-if="problem.status == 'Unaccepted' && !this.expired">Add to Task List</a>
              <a class="button is-dark" @click="addToTasks" v-if="problem.status == 'Unaccepted' && this.expired" disabled>Expired</a>
              <a class="button is-danger" disabled v-if="problem.status == 'In Progress'">In Progress</a>
              <a class="button is-dark" disabled v-if="problem.status == 'Completed'">Completed</a>
              <a class="button" id="back" @click="goBack">Back</a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'Problem',
    data() {
        return {
            problem: {},
            expired: false,
        }
    },
    mounted() {
        this.getProblem()
    },
    methods: {
        async getProblem() {
            this.$store.commit('setIsLoading', true)

            const tag_slug = this.$route.params.tag_slug
            const problem_slug = this.$route.params.problem_slug

            await axios
                .get(`/api/v1/problems/${tag_slug}/${problem_slug}`)
                .then(response => {
                    this.problem = response.data

                    this.problem.deadline = this.problem.deadline.split('T')[0] + ' ' + this.problem.deadline.split('T')[1].split('+')[0]
                    this.problem.date_posted = this.problem.date_posted.split('T')[0] + ' ' + this.problem.date_posted.split('T')[1].split('.')[0]

                    if (this.problem.status == 0) {
                        this.problem.status = 'Unaccepted'
                    } else if (this.problem.status == 1) {
                        this.problem.status = 'In Progress'
                    } else {
                        this.problem.status = 'Completed'
                    }

                    // Check whether the problem is expired
                    if (this.problem.deadline < new Date().toISOString().split('T')[0]) {
                        this.expired = true
                    }

                    document.title = this.problem.name + ' | FlyMeCrods'
                })
                .catch(error => {
                    console.log(error)

                    document.title = 'Error | FlyMeCrods'

                    toast ({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 5000,
                        position: 'bottom-right',
                    })
                })

            this.$store.commit('setIsLoading', false)
        },

        goBack() {
            this.$router.go(-1)
        },

        addToTasks() {
          const item = {
            problem: this.problem
          }

          this.$store.commit('addToTasks', item)

          if (!this.$store.state.tasks.items.includes(item)) {
            toast({
              message: 'Please do not add the same task twice!',
              type: 'is-danger',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right'
            })
          } else {
            toast({
              message: 'The problem was added to your task list',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right'
            })
          }
        }
    }
}
</script>

<style scoped>
.control {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.button {
  place-content: center;
  margin: 1rem 1rem;
}

#back {
  background-color: #dbdbdb;
}

#problem-not-found .image {
  width: 50%;
  height: 50%;
}

#problem-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
}

#problem-not-found .column {
  display: flex;
  justify-content: center;
  align-items: center;
}

#problem-not-found .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#problem-not-found .container .image {
  margin-bottom: 1rem;
}

@media screen and (max-width: 800px) {
  #problem-not-found {
    flex-direction: column;
  }
  #problem-not-found .column {
    width: 100%;
    justify-content: center;
    align-items: flex-start;
  } 
}
</style>