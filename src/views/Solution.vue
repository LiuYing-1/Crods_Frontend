<template>
  <div class="solution-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/my-account">My Account</router-link></li>
        <li class="is-active"><router-link to="#" aria-current="page">Solution</router-link></li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Solution</h1>
      </div>
      <div class="column is-3" id="solution">
        <div class="box">
          <div class="extend-button">
            <button class="button is-dark" @click="extendAndCoverImage">
              <i class="fas fa-chevron-circle-right" id="arrow"></i>
            </button>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12 has-text-centered">
              <p class="subtitle"><b>Solution</b></p>
            </div>
            <div class="column is-12 has-text-centered" id="result-status">
              <p v-if="this.solution.solution_result == 0">In Progress</p>
              <p v-if="this.solution.solution_result == 1">Submitted</p>
              <p v-if="this.solution.solution_result == 2">Accepted</p>
              <p v-if="this.solution.solution_result == 3">Rejected</p>
            </div>
            <div class="column is-12">
              <form @submit.prevent="submitForm">
                <div class="columns is-multiline">
                  <div class="column is-12">
                    <div class="field">
                      <label class="label"><b>* Your Answer in Text Format</b></label>
                      <div class="control">
                        <textarea class="textarea" placeholder="Please state your answer here." v-model="this.solution.text_solution" disabled v-if="(solution.solution_result==2)||(solution.solution_result==3)"></textarea>
                        <textarea class="textarea" placeholder="Please state your answer here." v-model="this.solution.text_solution" disabled v-if="!edit_button && solution.solution_result==1"></textarea>
                        <textarea class="textarea" placeholder="Please state your answer here." v-model="this.solution.text_solution" v-if="edit_button || solution.solution_result==0"></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6" id="attachment-part">
                    <div class="field">
                      <label class="label">Attachment</label>
                      <div class="file has-name is-boxed">
                        <label class="file-label">
                          <input class="file-input" type="file" @change="getFileName" disabled v-if="!edit_button && solution.solution_result==1">
                          <input class="file-input" type="file" @change="getFileName" v-if="edit_button || solution.solution_result==0">
                          <span class="file-cta">
                            <span class="file-icon">
                              <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                              Choose a file…
                            </span>
                          </span>
                          <span class="file-name" v-if="this.fileName == ''">
                              No File has been Selected...
                          </span>
                          <span class="file-name" v-else>
                              {{this.fileName}}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6" id="note">
                    <div class="field">
                      <label class="label"><b>* Note</b></label>
                      <div class="control">
                        <textarea class="textarea" placeholder="Please state your notice here." v-model="this.solution.notice" disabled v-if="(solution.solution_result==2)||(solution.solution_result==3)"></textarea>
                        <textarea class="textarea" placeholder="Please state your notice here." v-model="this.solution.notice" disabled v-if="!edit_button && solution.solution_result==1"></textarea>
                        <textarea class="textarea" placeholder="Please state your notice here." v-model="this.solution.notice" v-if="edit_button || solution.solution_result==0"></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="column is-2" id="solution-button" style="display: none">
                    <div class="field">
                      <div class="control">
                        <button class="button is-primary" type="submit" v-if="this.solution.solution_result==0 && !this.expired">Submit</button>
                        <button class="button is-primary" type="submit" v-if="this.solution.solution_result==0 && this.expired" disabled>Submit</button>
                        <template v-if="!edit_button">
                          <button class="button is-danger" @click="edit_button = !edit_button" v-if="this.solution.solution_result==1">Edit</button>
                          <button class="button is-danger" @click="edit_button = !edit_button" v-if="this.solution.solution_result!=0 && this.solution.solution_result!=1" disabled>
                            Completed
                          </button>
                        </template>

                        <template v-if="edit_button && this.solution.solution_result==1">
                          <div class="buttons">
                            <button class="button is-primary ml-1">Save</button>
                            <button class="button is-light" @click="edit_button = !edit_button">Cancel</button>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="column is-12">
                    <div class="notification is-danger" v-if="errors.length">
                      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-6" id="problem-introduction">
        <div class="box">
          <div class="image">
            <img :src="this.problem.get_image" alt="problem">
          </div>
        </div>
      </div>
      <div class="column is-3" id="problem-content">
        <div class="box">
          <div class="columns is-multiline">
            <div class="column is-12 has-text-centered">
              <h2 class="subtitle"><b>{{ this.problem.name }}</b></h2>
            </div>
            <div class="column is-12">
              <p><b>Problem Description</b></p>
              <p>{{ this.problem.description }}</p>
            </div>
            <div class="column is-12">
              <p><b>Problem Details</b></p>
              <p>{{ this.problem.details }}</p>
            </div>
            <div class="column is-6">
              <p><b>Deadline</b></p>
              <p>{{ this.problem.deadline }}</p>
            </div>
            <div class="column is-6">
              <p><b>Remaining</b></p>
              <p v-if="this.problem.status!=2">{{ this.remaining }} day(s)</p>
              <p v-if="this.problem.status==2">Ended</p>
            </div>
            <div class="column is-6">
              <p><b>Poster</b></p>
              <p>{{ this.problem.get_username }}</p>
            </div>
            <div class="column is-6">
              <p><b>Budget</b></p>
              <p>&euro; {{ this.problem.budget }}</p>
            </div>
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
  name: 'Solution',
  data() {
    return {
      edit_button: false,
      fileName: '',
      solution: {},
      attachment: '',
      expired: false,
      problem: {},
      remaining: 0,
      errors: [],
    }
  },
  methods: {
    getSolution() {
      const solution_id = this.$route.query.id;
      axios
        .get(`/api/v1/solutions/solution/${solution_id}/`)
        .then(response => {
          this.solution = response.data

          if (this.solution.file_solution != null) {
                this.fileName = this.solution.file_solution.split('/').pop()
          }
        })
        .catch(error => {
          console.log(error);
        })
    },

    getProblem() {
      const tag_slug = this.$route.params.tag_slug
      const problem_slug = this.$route.params.problem_slug
      
      axios
        .get(`/api/v1/problems/${tag_slug}/${problem_slug}/`)
        .then(response => {
          this.problem = response.data
          
          // Check whether the deadline has passed
          if (new Date(this.problem.deadline) < new Date()) {
            this.expired = true
          }

          this.problem.deadline = this.problem.deadline.split('T')[0]
          // Get remaining
          let end_time = new Date(this.problem.deadline)
          let now = new Date()
          // Check whether the deadline has passed
          if(now > end_time) {
            this.remaining = 0
          } else {
            this.remaining = Math.floor((end_time - now) / (1000 * 60 * 60 * 24))
          }
        })
        .catch(error => {
          console.log(error);
        })
    },

    getFileName() {
        const fileInput = document.querySelector('input[type=file]')
        
        this.attachment = fileInput.files[0].name
        if (fileInput.files.length > 0) {
          const fileName = document.querySelector('.file-name')
          fileName.textContent = fileInput.files[0].name
        }
      },

    extendAndCoverImage() {
      const extend_button = document.getElementById('solution')
      const problem_introduction = document.getElementById('problem-introduction')
      const arrow = document.getElementById('arrow')

      const attachment = document.getElementById('attachment-part')
      const note = document.getElementById('note')
      const solution_button = document.getElementById('solution-button')
      if (extend_button.classList.contains('is-3')) {
        extend_button.classList.remove('is-3')
        extend_button.classList.add('is-9')
        problem_introduction.classList.toggle('is-hidden')
        arrow.classList.toggle('rotate')
        note.classList.remove('is-6')
        note.classList.add('is-7')
        attachment.classList.remove('is-6')
        attachment.classList.add('is-3')
        solution_button.style.removeProperty('display')
      } else {
        extend_button.classList.remove('is-9')
        extend_button.classList.add('is-3')
        problem_introduction.classList.toggle('is-hidden')
        arrow.classList.toggle('rotate')
        note.classList.remove('is-7')
        note.classList.add('is-6')
        attachment.classList.remove('is-3')
        attachment.classList.add('is-6')
        solution_button.style.display = 'none'
      }
    },

    submitForm() {
      // Validate the Required Form Data
      this.errors = []

      if (this.solution.text_solution == null) {
          this.errors.push('Text is missing!')
      }

      if (this.solution.notice == null) {
          this.errors.push('Note is missing!')
      }

      if (!this.errors.length) {
        let file = document.querySelector('input[type=file]').files[0]

        if (file == undefined) {
          file = null
        }

        let formData = new FormData()

        formData.append('text_solution', this.solution.text_solution)
        formData.append('notice', this.solution.notice)
        formData.append('file_solution', file)

        let options = {
              url: `/api/v1/solutions/solution/${this.solution.id}/update/`,
              data: formData,
              method: 'put',
              processData: false,
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }

        axios(options)
          .then(response => {
            console.log(response.data.status)

            if (response.data.status == 201) {
              toast({
                message: 'Solution submitted successfully!',
                type: 'is-success',
                duration: 3000,
                position: 'bottom-right',
                dismissible: true,
              })

              if (this.edit_button == true) {
                this.edit_button = !this.edit_button
              } else {
                location.reload()
              }
            } else {
              toast({
                message: 'Something went wrong!',
                type: 'is-danger',
                duration: 3000,
                position: 'bottom-right',
                dismissible: true,
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  mounted() {
    this.getSolution()
    this.getProblem()
    document.title = 'Solution | FlyMeCrods'
  },
}
</script>

<style scoped>
#problem-introduction .box {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #363636;
}

#problem-content .box {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
}

#problem-introduction .box .image {
  background-color: darkgray;
  padding: 0.2rem;
  border-radius: 0.2rem;
}

#solution .box {
  position: relative;
  width: 100%;
  height: 100%;
}

#solution .box .extend-button .button {
  width: 5%;
  height: 10%;
  color: white;
  position: absolute;
  right: 0;
  top: 40%;
  z-index: 1;
}

#solution .box .buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form input, form textarea {
  font-family: 'Noto Serif Display', '宋体', serif;
}

.is-hidden {
  display: none;
}

.rotate {
  transform: rotate(-180deg);
  transition: transform 1s;
}

#result-status {
  color: #363636;
  background-color: #eeeeee;
}

#solution-button {
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 800px) {
  #solution .box .extend-button {
    display: none;
  }

  #solution .box .buttons {
    display: flex;
    flex-direction: row;
  }
}
</style>