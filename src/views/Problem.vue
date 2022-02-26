<template>
  <div class="problem">
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
            <a class="button is-dark">Add to Task List</a>
            <a class="button" id="back" @click="goBack">Back</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
        getProblem() {
            const tag_slug = this.$route.params.tag_slug
            const problem_slug = this.$route.params.problem_slug

            axios
                .get(`/api/v1/problems/${tag_slug}/${problem_slug}`)
                .then(response => {
                    this.problem = response.data
                    
                    if (this.problem.status == 0) {
                        this.problem.status = 'Unaccepted'
                    } else if (this.problem.status == 1) {
                        this.problem.status = 'In Progress'
                    } else {
                        this.problem.status = 'Completed'
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },

        goBack() {
            this.$router.go(-1)
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