<template>
  <div class="problem">
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
            <a class="button is-dark" @click="addToTasks">Add to Task List</a>
            <a class="button" id="back" @click="goBack">Back</a>
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
    name: 'Problem',
    data() {
        return {
            problem: {},
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

                    document.title = this.problem.name + ' | FlyMeCrods'
                })
                .catch(error => {
                    console.log(error)
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
  margin: 2rem 1rem;
}

#back {
  background-color: #dbdbdb;
}
</style>