<template>
  <div class="page-edit-problem">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/my-account">My Account</router-link></li>
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
          <div class="content">
            <p class="is-size-4"><b>Page Instructor</b></p>
            <p class="is-size-5"><a href="#edit-part"><i class="fas fa-edit mr-3"></i>Edit</a></p>
            <p class="is-size-5"><a href="#progress-part"><i class="far fa-calendar-check mr-3"></i>Progress</a></p>
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
            <p class="remaining-time" v-if="this.problem.status!=2">Remaining: {{ this.remaining }} days</p>
            <p class="remaining-time" v-if="this.problem.status==2">Remaining: Ended</p>
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
                    <button class="button is-danger" @click="edit_button = !edit_button" v-if="problem.status==0">Edit</button>
                    <button class="button is-danger" @click="edit_button = !edit_button" v-if="problem.status!=0" disabled>Edit</button>
                  </template>

                  <template v-else>
                    <button class="button is-primary">Save</button>
                    <button class="button is-light ml-3" @click="edit_button = !edit_button">Cancel</button>
                  </template>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="column is-12" id="progress-part">
        <div class="hero is-info">
          <div class="hero-body">
            <p class="title">Progress</p>
            <div class="columns is-multiline">
              <template v-if="this.solution.id == null">
                <div class="column is-12">
                  <div class="box">
                    <p>Sorry, Sir/Madam, there is no solution yet.</p>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="column is-12">
                  <div class="columns is-multiline">
                    <div class="column is-12">
                      <p>
                        <span>Your problem has been picked by </span>
                        <span><b>{{ this.solution.get_username }}</b>,</span>
                        <span> and is currently being worked on.</span>
                      </p>
                    </div>
                    <div class="column is-12">
                      <div class="subtitle"><b>Solution</b></div>
                    </div>
                    <div class="column is-12">
                      <div class="solution-text">
                        <label class="label"><b>Answer in the Text format</b></label>
                        <textarea class="textarea" v-model="this.solution.text_solution" placeholder="The author hasn't pushed any solution here." disabled></textarea>
                      </div>
                    </div>
                    <div class="column is-12">
                      <div class="solution_notice">
                        <label class="label"><b>Notice</b></label>
                        <textarea class="textarea" v-model="this.solution.notice" placeholder="The author hasn't pushed any notice here." disabled></textarea>
                      </div>
                    </div>
                    <div class="column is-12">
                      <label class="label">Attachment / Enclosure</label>
                      <div class="attachment-part" v-if="this.fileName == ''">
                        <p>No attachment</p>
                      </div>
                      <div class="attachment-part" v-else>
                        <p>{{ this.fileName }}</p>
                        <div class="buttons">
                          <button class="button is-dark">
                            <a :href="this.rootUrl + this.solution.file_solution" target="_blank">
                              <span><i class="far fa-eye mr-3"></i></span>
                              <span>Preview</span>
                            </a>
                          </button>
                          <button class="button is-light ml-3" v-if="this.solution.solution_result == 2">
                            <a :href="this.rootUrl + this.solution.file_solution" download target="_blank">
                              <span><i class="fas fa-unlock mr-3"></i></span>
                              <span>Download</span>
                            </a>
                          </button>
                          <button class="button is-light ml-3" v-else disabled>
                            <span><i class="fas fa-lock mr-3"></i></span>
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="column is-12" v-if="this.solution.solution_result != 0">
                      <div class="box">
                        <div id="line-1">
                          <div class="result-content">
                            <p>Please give your reply to the solution.</p>
                          </div>
                          <div class="buttons">
                            <button class="button is-primary" @click="updateSolutionResult(2)" v-if="this.problem.status != 2">
                              <span><i class="fas fa-check mr-3"></i></span>
                              <span>Accept</span>
                            </button>
                            <button class="button is-danger" @click="updateSolutionResult(3)" v-if="this.problem.status != 2">
                              <span><i class="fas fa-times mr-3"></i></span>
                              <span>Reject</span>
                            </button>

                            <!-- Lock the button to be disabled -->
                            <button class="button is-primary" disabled v-if="this.problem.status == 2 && this.solution.solution_result == 2">
                              <span><i class="fas fa-check mr-3"></i></span>
                              <span>Accepted</span>
                            </button>
                            <button class="button is-danger" disabled v-if="this.problem.status == 2 && this.solution.solution_result == 3">
                              <span><i class="fas fa-check mr-3"></i></span>
                              <span>Rejected</span>
                            </button>
                          </div>
                        </div>
                        <hr>
                        <div id="line-2">
                          <div class="field">
                            <label class="label"><b>Feedback</b></label>
                            <textarea class="textarea" v-model="this.solution.solution_feedback" placeholder="Please give your feedback here." v-if="this.problem.status != 2"></textarea>
                            <textarea class="textarea" v-model="this.solution.solution_feedback" placeholder="Please give your feedback here." disabled v-if="this.problem.status == 2"></textarea>
                          </div>
                          <div class="field">
                            <label class="label"><b>* Rating the Picker</b></label>
                            <div class="stars">
                              <input type="radio" id="star-5" class="star star-5" name="star" @click="ratingStar(5)" v-if="this.problem.status != 2"/>
                              <input type="radio" id="star-5" class="star star-5" name="star" @click="ratingStar(5)" disabled v-if="this.problem.status == 2"/>
                              <label for="star-5" class="star star-5"></label>
                              <input type="radio" id="star-4" class="star star-4" name="star" @click="ratingStar(4)" v-if="this.problem.status != 2"/>
                              <input type="radio" id="star-4" class="star star-4" name="star" @click="ratingStar(4)" disabled v-if="this.problem.status == 2"/>
                              <label for="star-4" class="star star-4"></label>
                              <input type="radio" id="star-3" class="star star-3" name="star" @click="ratingStar(3)" v-if="this.problem.status != 2"/>
                              <input type="radio" id="star-3" class="star star-3" name="star" @click="ratingStar(3)" disabled v-if="this.problem.status == 2"/>
                              <label for="star-3" class="star star-3"></label>
                              <input type="radio" id="star-2" class="star star-2" name="star" @click="ratingStar(2)" v-if="this.problem.status != 2"/>
                              <input type="radio" id="star-2" class="star star-2" name="star" @click="ratingStar(2)" disabled v-if="this.problem.status == 2"/>
                              <label for="star-2" class="star star-2"></label>
                              <input type="radio" id="star-1" class="star star-1" name="star" @click="ratingStar(1)" v-if="this.problem.status != 2"/>
                              <input type="radio" id="star-1" class="star star-1" name="star" @click="ratingStar(1)" disabled v-if="this.problem.status == 2"/>
                              <label for="star-1" class="star star-1"></label>
                            </div>
                          </div>
                        </div>
                        <div class="column is-12">
                          <div class="notification is-danger" v-if="errors.length">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
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
      solution: {},
      fileName: '',
      rating: 0,
      rootUrl: 'http://localhost:8000',
      errors: [],
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
          // Check whether the deadline is passed
          if (end_time < now) {
            this.remaining = 0
          } else {
            this.remaining = Math.floor((end_time - now) / (1000 * 60 * 60 * 24))
          }

          // Convert date to readable date object and there is 8 hours difference
          var dateTime = new Date(+ new Date(this.problem.deadline) + 8 * 3600 * 1000)
          this.problem.deadline = new Date(dateTime).toISOString().substr(0, 10)

          // Get Solution
          axios
            .get(`api/v1/solutions/problem/${this.problem.id}`)
            .then(response => {
              this.solution = response.data

              if (this.solution.file_solution != null) {
                this.fileName = this.solution.file_solution.split('/').pop()
              }
            })
            .catch(error => {
              console.log(error)
            })
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

    updateSolutionResult(i) {
      var feedback = this.solution.solution_feedback
      var picker = this.solution.get_username
      var rating = this.rating

      this.errors = []

        if (rating === 0) {
            this.errors.push('Rating is missing!')
        }

        // Align the default feedback, if poster doesn't fill it out
        if (!this.errors.length) {
          if ((feedback == null||feedback == '') && (i == 2)) {
            feedback = 'Default Feedback: Thanks for your help! Your fee will be distributed to your account by FlyMeCrods in several days.'
          }
          if ((feedback == null||feedback == '') && (i == 3)){
            feedback = 'Default Feedback: Sorry, I am not satisfied with your solution. You will not get the corresponding payment.'
          }

          let dataSent = {
            'problem_id': this.problem.id,
            'solution_id': this.solution.id, 
            'feedback': feedback,
            'picker_name': picker,
            'rating': rating,
            'result': i,
          }
          console.log(feedback)
          axios
            .post('api/v1/distributions/post/', dataSent)
            .then(response => {
              console.log(response.data)
              location.reload()
            })
            .catch(error => {
              console.log(error)
            })
        } 
    },

    ratingStar(i) {
      this.rating = i
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
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
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

#page-index .content {
  margin-top: 1rem;
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

.remaining-time {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #fff;
}

form #tag {
  width: 10%;
}

#progress-part textarea {
  font-family: 'Noto Serif Display', serif;
}

#progress-part .box #line-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#progress-part .box #line-2 {
  display: flex;
}

#progress-part .box #line-2 .field:first-child {
  width: 75%;
  height: 100%;
}

#progress-part .box #line-2 .field:first-child textarea:focus {
  background-color: darkgrey;
  color: white;
  transition: all 0.6s;
}

#progress-part .box #line-2 .field:last-child {
  width: 25%;
  height: 100%;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.attachment-part {
  display: flex;
  align-items: center;
}

.attachment-part .buttons {
  margin-left: 1rem;
  display: flex;
  align-items: center;
}

/* Rating Star */
div.stars {
  width: 270px;
  display: inline-block;
}

input.star {
  display: none;
}

label.star {
  cursor: pointer;
  float: right;
  padding: 10px;
  font-size: 36px;
  color: #444;
  transition: all .2s;
}

input.star:checked ~ label.star:before {
  content: '\f005';
  color: #FD4;
  transition: all .25s;
}

input.star-5:checked ~ label.star:before {
  color: #FE7;
  text-shadow: 0 0 20px #952;
}

input.star-1:checked ~ label.star:before {
  color: #F62;
}

label.star:hover {
  transform: rotate(-15deg) scale(1.3);
}

label.star:before {
  content: '\f006';
  font-family: FontAwesome;
}

@media screen and (max-width: 800px) {
  form {
    display: flex;
    flex-direction: column;
  }

  form #name, form #budget, form #deadline {
    width: 40%;
  }

  #progress-part .box #line-1 {
    flex-direction: column;
  }

  #progress-part .box .buttons {
    margin-top: 1rem;
  }

  #progress-part .box #line-2 {
    flex-direction: column;
  }

  #progress-part .box #line-2 .field:first-child {
    width: 100%;
    height: 100%;
  }

  #progress-part .box #line-2 .field:last-child {
    width: 100%;
    height: 100%;
    margin-left: 0;
  }

  .attachment-part {
    flex-direction: column;
  }

  .attachment-part .buttons {
    margin-top: 1rem;
    margin-left: 0;
  }
}
</style>