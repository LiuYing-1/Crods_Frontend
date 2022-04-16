<template>
  <div class="email-to-poster-page">
    <div class="columns is-multiline">
      <div class="buttons" id="email-portal">
        <button class="button is-warning" @click="emailPortalAnimation">
          <i class="fas fa-envelope"></i>
        </button>
        <router-link to="/email">
          <button class="button is-warning"><b>Email Portal</b></button>
        </router-link>
      </div>
      <div class="column box is-12" id="problem-info">
        <div class="columns is-multiline">
          <div class="column is-3">
            <div class="image">
              <img :src="this.problem.get_thumbnail">
            </div>
          </div>
          <div class="column is-2 problem-name">
            <p><b>{{ this.problem.name }}</b></p>
          </div>
          <div class="column is-3 problem-details">
            <p class="tips">{{ this.problem.details }}</p>
          </div>
          <div class="column is-2 problem-status">
            <p v-if="this.problem.status == 0"><b>Unaccepted</b></p>
            <p v-if="this.problem.status == 1"><b>In Progress</b></p>
            <p v-if="this.problem.status == 2"><b>Completed</b></p>
          </div>
          <div class="column is-2 poster-info">
            <p><b>{{ this.problem.get_username }}</b></p>
            <p><b>&lt;{{ this.poster_address }}&gt;</b></p>
          </div>
        </div>
      </div>

      <div class="column is-12" id="email-to-poster-detail">
        <form @submit.prevent="submitForm">
          <div class="columns is-multiline">
            <div class="column is-12">
              <p class="title">Email to Poster</p>
            </div>
            <div class="column is-12 input-module">
              <label class="label">Receiver Address</label>
              <input type="input" class="input" v-model="this.poster_address" disabled />
            </div>
            <div class="column is-12 input-module">
              <label class="label">Email Topic</label>
              <input type="input" class="input" v-model="this.email_topic" />
            </div>
            <div class="column is-12">
              <textarea class="textarea" type="textarea" v-model="this.email_text" placeholder="Say something here..."></textarea>
            </div>
            <div class="column is-12">
              <div class="file has-name is-left">
                <label class="file-label">
                  <input class="file-input" type="file" @change="getFileName">
                  <span class="file-cta">
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                  <span class="file-name" v-if="this.email_fileName == ''">
                      No File has been Selected...
                  </span>
                  <span class="file-name" v-else>
                      {{this.email_fileName}}
                  </span>
                </label>

                <button class="button is-danger ml-1" @click="clearFile"  v-if="this.email_file != ''">Clear</button>
              </div>
            </div>
            <div class="column is-12">
              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
              </div>
            </div>
            <div class="column is-12">
              <button class="button is-info" type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
export default {
    name: 'EmailToPoster',
    data() {
      return {
        problem: {},
        poster_address: '',
        picker_address: '',
        email_topic: '',
        email_text: '',
        email_fileName: '',
        email_file: '',
        errors: [],
      }
    },
    methods: {
      emailPortalAnimation() {
        let buttons = document.querySelectorAll('#email-portal .button.is-warning')
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.toggle('move-in')
        }
      },

       getFileName() {
        const fileInput = document.querySelector('input[type=file]')
        
        this.email_file = fileInput.files[0].name
        if (fileInput.files.length > 0) {
          const fileName = document.querySelector('.file-name')
          fileName.textContent = fileInput.files[0].name
        }
      },

      clearFile() {
        this.email_fileName = ''
        this.email_file = ''
        const fileName = document.querySelector('.file-name')
        fileName.textContent = 'No File has been Selected...'
      },

      getPickerEmailAddress(user_id) {
        axios
          .get(`api/v1/users/${user_id}/`)
          .then(response => {
            this.picker_address = response.data.get_user_simple_data.email
          })
          .catch(error => {
            console.log(error)
          })
      },

      getPosterEmailAddress(username) {
        axios
          .get(`api/v1/users/${username}/email-address/`)
          .then(response => {
            this.poster_address = response.data.email
          })
      },

      submitForm() {
        // Validate the Required Form Data
        this.errors = []

        if (this.topic === '') {
          this.errors.push('Topic is missing!')        
        }

        if (this.email_text === '' && this.email_file === '') {
          this.errors.push('Email content could not be empty!')        
        }

        if (!this.errors.length) {
          let file = document.querySelector('input[type=file]').files[0]
          let formData = new FormData()

          formData.append('topic', this.email_topic)
          formData.append('receiver_address', this.poster_address)
          formData.append('sender_address', this.picker_address)
          formData.append('text', this.email_text)
          formData.append('attachment', file)
          formData.append('reply', 'undefined')

          let options = {
                url: '/api/v1/emails/email/post/',
                data: formData,
                method: 'post',
                processData: false,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
          axios(options)
            .then(response => {
            if (response.data.status == 200) {
              toast({
                message: 'Email has been sent successfully!',
                type: 'is-success',
                duration: 3000
              })
              location.reload()
            } else {
              toast({
                message: 'Email could not be sent!',
                type: 'is-danger',
                duration: 3000
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
        }
      },

      getProblem() {
        const userid = localStorage.getItem('userid')
        this.getPickerEmailAddress(userid)

        const tag_slug = this.$route.params.tag_slug
        const problem_slug = this.$route.params.problem_slug
        axios
          .get(`api/v1/problems/${tag_slug}/${problem_slug}`)
          .then(response => {
            this.problem = response.data

            // Connect the email topic with the problem name
            this.email_topic = 'About: ' + this.problem.name

            // Pass Value to the Poster
            this.getPosterEmailAddress(this.problem.get_username)

            // Document.title
            document.title = 'Email: ' + this.problem.name + ' | FlyMeCrods'
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted() {
      this.getProblem()
    },
}
</script>

<style scoped>
#email-portal {
  position: fixed;
  right: -8rem;
  z-index: 1;
}

#problem-info {
  color: white;
  background-color: #363636;
}

.move-in {
  transform: translateX(-8.5rem);
  transition: all 0.6s;
}

.problem-name, .problem-status, .poster-info, .problem-details {
  display: flex;
  justify-content: center;
  align-items: center;
}

#email-to-poster-detail form {
  display: flex;
  flex-direction: column;
}

form input, textarea {
  font-family: 'Noto Serif Display', '宋体', serif;
}

form .input-module {
  display: flex;
  flex-direction: row;
  align-items: center;
}

form .label {
  width: 15%;
}

@media screen and (max-width: 768px) {
  .problem-name, .problem-status, .poster-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  form .input-module {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  
  form .label {
    width: 100%;
  }

  form input {
    width: 100%;
  }
}
</style>