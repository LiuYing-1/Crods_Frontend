<template>
  <div class="page-edit-problem">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/my-account">{{ problem.get_username }}</router-link></li>
        <li class="is-active"><router-link to="#" aria-current="page">Problem Management</router-link></li>
      </ul>
    </nav>  

    <div class="columns is-multiline">
      <div class="column is-12">
        <p class="title">Problem Management</p>
      </div>
      
      <div class="column is-5">
        <div class="box" id="page-index">
          <div class="image">
            <img :src="require('@/assets/universities_inline.png')" alt="universities">
          </div>
          <div class="content mt-6">
            <p class="is-size-4"><b>Page Instructor</b></p>
            <p class="is-size-5"><a href="#edit-part">Edit</a></p>
            <p class="is-size-5"><a href="#progress-part">Progress</a></p>
          </div>
        </div>
      </div>

      <div class="column is-7">
        <div class="box">
        
          <div class="image">
            <img :src="problem.get_image" alt="Problem Image">
          </div>
          
        </div>
      </div>

      <div class="column is-12" id="edit-part">
        <div class="hero is-dark">
          <div class="hero-body">
            <p class="title">Detailed Info</p>
            <p id="remaining-time">Remaining: {{ this.remaining }} days</p>
            <form @submit.prevent="submitForm">
              <div class="columns is-multiline">
                <div class="column is-2" id="name">
                  <div class="field">
                    <label class="label">Problem Name</label>
                    <div class="control">
                      <input class="input" type="text" v-model="problem.name" placeholder="Problem Name" maxlength="25" disabled v-if="!edit_button">
                      <input class="input" type="text" v-model="problem.name" placeholder="Problem Name" maxlength="25" v-else>
                    </div>
                  </div>
                </div>
                <div class="column is-2 is-offset-1">
                  <div class="field">
                    <label class="label">Problem Tag</label>
                    <div class="control">
                      <div class="select" v-if="!edit_button">
                        <select v-model="problem.get_tagname"  disabled>
                          <option value="Informatics">Informatics</option>
                          <option value="Business">Business</option>
                          <option value="Law">Law</option>
                          <option value="Health">Health</option>
                          <option value="Design">Design</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div class="select" v-else>
                        <select v-model="problem.get_tagname">
                          <option value="Informatics">Informatics</option>
                          <option value="Business">Business</option>
                          <option value="Law">Law</option>
                          <option value="Health">Health</option>
                          <option value="Design">Design</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-2">
                  <div class="field">
                    <label class="label">Problem Status</label>
                    <div class="control">
                      <div class="select">
                        <select v-model="problem.status" disabled>
                          <option value="0">Unaccepted</option>
                          <option value="1">In Progress</option>
                          <option value="2">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-2" id="budget">
                  <div class="field">
                    <label class="label">Problem Budget</label>
                    <div class="control">
                      <input class="input" type="number" v-model="problem.budget" placeholder="Problem Budget" disabled v-if="!edit_button">
                      <input class="input" type="number" v-model="problem.budget" placeholder="Problem Budget" v-else>
                    </div>
                  </div>
                </div>
                <div class="column is-2 is-offset-1" id="deadline">
                  <div class="field">
                    <label class="label">Problem Deadline</label>
                    <div class="control">
                      <input class="input" type="date" v-model="problem.deadline" placeholder="Problem Deadline" disabled v-if="!edit_button">
                      <input class="input" type="date" v-model="problem.deadline" placeholder="Problem Deadline" v-else>
                    </div>
                  </div>
                </div>

                <div class="column is-12">
                  <div class="field">
                    <label class="label">Problem Description</label>
                    <div class="control">
                      <input type="input" class="input" v-model="problem.description" maxlength="60" disabled v-if="!edit_button">
                      <input type="input" class="input" v-model="problem.description" maxlength="60" v-else>
                    </div>
                  </div>
                </div>

                <div class="column is-12">
                  <div class="field">
                    <label class="label">Problem Details</label>
                    <div class="control">
                      <textarea class="textarea" placeholder="Describe your problem as detailed as you can" v-model="problem.details" disabled v-if="!edit_button"></textarea>
                      <textarea class="textarea" placeholder="Describe your problem as detailed as you can" v-model="problem.details" v-else></textarea>
                    </div>
                  </div>
                </div>

                <div class="column is-12 has-text-centered">
                  <template v-if="!edit_button">
                    <button class="button is-danger" @click="edit_button = !edit_button">Edit</button>
                  </template>

                  <template v-if="edit_button">
                    <button class="button is-primary">Save</button>
                    <button class="button is-light ml-3" @click="edit_button = !edit_button">Cancel</button>
                  </template>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';

export default {
  name: 'ProblemEdit',
  data() {
    return {
      problem: {},
      remaining: 0,
      edit_button: false,
    }
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
          // Get remaining
          let end_time = new Date(this.problem.deadline)
          let now = new Date()
          this.remaining = Math.floor((end_time - now) / (1000 * 60 * 60 * 24))

          // Convert date to readable date object and there is 8 hours difference
          var dateTime = new Date(+ new Date(this.problem.deadline) + 8 * 3600 * 1000)
          this.problem.deadline = new Date(dateTime).toISOString().substr(0, 10)
        })
        .catch(error => {
          console.log(error)
        })
      
      this.$store.commit('setIsLoading', false)
    },

    submitForm() {
      this.$store.commit('setIsLoading', true)

      const problem_id = this.problem.id
      
      axios
        .put(`/api/v1/problems/${problem_id}/update/`, this.problem)
        .then(response => {
          var message = response.data.message

          if (response.data.status == '200') {
            toast({
              message: message,
              type: 'is-success',
              duration: 3000,
              position: 'bottom-right',
            })
            this.edit_button = false
          } else {
            toast({
              message: message,
              type: 'is-danger',
              duration: 3000,
              position: 'bottom-right',
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    },
  },
  mounted() {
    document.title = 'Problem Management | FlyMeCrods'
    this.getProblem()
  }
}
</script>

<style scoped>
form input, form select, form textarea {
  font-family: 'Noto Serif Display', serif;
}

form input:focus, form select:focus, form textarea:focus {
  color: white;
  transition: all 0.5s;
  background-color: grey;
}

form label, form select .option {
  color: white;
}

#page-index {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f5f5f5;
}
 
#page-index .image {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
}

#page-index p, #page-index a {
  color: #fff;
}

#page-index .content {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-image: linear-gradient(45deg, #363636, #4bbca9);
}

#page-index .content a {
  text-decoration: none;
}

#page-index .content a:hover {
  color: #0dbc79;
  transition: all 0.6s;
}

#edit-part {
  margin-top: 2rem;
}

form {
  margin-top: 3rem;
}

.hero-body {
  position: relative;
}

#remaining-time {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #fff;
}

form #tag {
  width: 10%;
}

@media screen and (max-width: 800px) {
  form {
    display: flex;
    flex-direction: column;
  }

  form #name, form #budget, form #deadline {
    width: 40%;
  }
}
</style>