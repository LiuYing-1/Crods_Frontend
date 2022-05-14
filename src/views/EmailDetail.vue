<template>
  <div class="email-detail-page">
    <div class="columns is-multiline" id="email-body">
      <div class="column is-12">
        <p class="title">{{ this.email.name }}</p>
      </div>
      <div class="column is-10" id="subtitle-with-image">
        <div class="image is-64x64">
          <img :src="require('@/assets/icons8-man-in-yellow-striped-sweater.png')">
        </div>
        <p class="subtitle">
          <span><b>{{ this.email.get_sender_username }}</b></span>
          <span><b>&nbsp;&lt;{{ this.email.sender_address }}&gt; </b></span>
        </p>
      </div>
      <div class="column is-2" id="date_sent">
        <p>{{this.email.date_sent}}</p>
      </div>
      <div class="column is-12" id="email-content">
        <div v-html="this.email.text"></div>
      </div>
      <div class="column is-12" id="attatchment-part" v-if="this.email.attatchment != null">
        <p id="title">Attatchment</p>
        <p id="content">
          <a :href="`${this.BACKEND_URL}${this.attatchment_address}`" target="_blank">
            <span><i class="fas fa-file-download is-size-4 mr-3"></i></span>
            <span>{{ this.fileName }}</span>
          </a>
        </p>
      </div>
      <div class="column is-12 buttons">
        <button class="button" @click="replyOperation">
          <span><i class="fas fa-reply-all mr-3"></i></span>
          <span>Reply</span>
        </button>
        <button class="button" @click="shareOperation">
          <span><i class="fas fa-share mr-3"></i></span>
          <span>Share</span>
        </button>
        <button class="button is-dark" @click="goBack">
          <span><i class="fas fa-arrow-left mr-3"></i></span>
          <span>Back</span>
        </button>
      </div>
      <!-- Reply Extended Part -->
      <div class="column is-12" v-if="replyPart" id="replyPart">
        <div class="box columns is-multiline">
          <div class="column is-12">
            <p>
              <span><i class="fas fa-reply-all mr-3"></i></span>
              <span>{{ this.email.sender_address }}</span>
            </p>
          </div>
          <div class="column is-12">
            <textarea class="textarea" type="textarea" v-model="this.replyContent"></textarea>
          </div>
          <div class="column is-12">
            <div class="file has-name is-left">
              <label class="file-label">
                <input class="file-input" type="file" @change="getFileName">
                  <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
                <span class="file-name" v-if="this.replyFileName == ''">
                  No File has been Selected...
                </span>
              </label>
              <button class="button is-warning ml-3" @click="clearFile" v-if="this.attatchment != ''">
                Clear
              </button>
            </div>
          </div>
          <div class="column is-12">
            <div class="notification is-danger" v-if="errors.length">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </div>
          <div class="column is-12">
            <button class="button is-info" @click="replySent">Send</button>
          </div>
        </div>
      </div>
      <!-- Share Extend Part -->
      <div class="column is-12" v-if="sharePart" id="sharePart">
        <div class="box columns is-multiline">
          <div class="column is-12" id="forward-title">
            <p>
              <span><i class="fas fa-share mr-3"></i></span>
              <span><b>Forward</b></span>
            </p>
          </div>
          <div class="column is-12 input-module">
            <p><b>Forward</b></p>
            <input type="input" class="input" placeholder="e.g., xxx@crods.flyme.social" v-model="this.forwardTo"/>
            <div class="check-buttons">
              <button class="button is-light" v-if="this.forwardTo != ''" @click="checkValid(this.forwardTo)">Check</button>
              <button class="button is-primary" v-if="this.valid == 1 && this.forwardTo != ''" disabled>Valid</button>
              <button class="button is-danger" v-if="this.valid == 2 && this.forwardTo != ''" disabled>Invalid</button>
            </div>
          </div>
          <div class="column is-12 input-module">
            <p><b>Topic</b></p>
            <input type="input" class="input" v-model="this.sharedTopic" />
          </div>
          <div class="column is-12">
            <textarea type="textarea" class="textarea" v-model="this.sharedContent"></textarea>
          </div>
          <div class="column is-12">
            <div class="file has-name is-left">
              <label class="file-label">
                <input class="file-input" type="file" disabled>
                <span class="file-cta">
                  <span class="file-label">
                    <i class="fas fa-file-download"></i>
                  </span>
                </span>
                <span class="file-name" v-if="this.sharedFile == ''">
                  No File has been Selected...
                </span>
                <span class="file-name" v-if="this.sharedFile != ''">
                  {{ this.sharedFileName }}
                </span>
              </label>
            </div>
          </div>
          <div class="column is-12">
            <div class="notification is-danger" v-if="errors.length">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </div>
          <div class="column is-12">
            <button class="button is-info" @click="sharedSent">Forward</button>
          </div>
        </div>
      </div>
      <!-- Previous Email Part -->
      <div class="reply-email-module" v-if="this.email.reply != null">
        <div class="columns is-multiline">
          <div class="column is-12">
            <hr>
            <p class="title">{{ this.previousEmail.name }}</p>
          </div>
          <div class="column is-10" id="subtitle-with-image">
            <div class="image is-64x64">
              <img :src="require('@/assets/icons8-man-in-yellow-striped-sweater.png')">
            </div>
            <p class="subtitle">
              <span><b>{{ this.previousEmail.get_sender_username }}</b></span>
              <span><b>&nbsp;&lt;{{ this.previousEmail.sender_address }}&gt; </b></span>
            </p>
          </div>
          <div class="column is-2" id="date_sent">
            <p>{{this.previousEmail.date_sent}}</p>
          </div>
          <div class="column is-12" id="email-content">
            <div v-html="this.previousEmail.text"></div>
          </div>
          <div class="column is-12" id="attatchment-part" v-if="this.previousEmail.attatchment != null">
            <p id="title">Attatchment</p>
            <p id="content">
              <a :href="this.BACKEND_URL + this.previous_attatchment_address" target="_blank">
                <span><i class="fas fa-file-download is-size-4 mr-3"></i></span>
                <span>{{ this.previousFileName }}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BACKEND_URL} from '../assets/js/commons.js'
import axios from 'axios'
import {toast} from 'bulma-toast'
export default {
    name: 'EmailDetail',
    data() {
      return {
        BACKEND_URL,
        attatchment_address: '',
        previous_attatchment_address: '',
        previousEmail: {},
        previousFileName: '',
        user: {},
        email: {},
        fileName: '',
        replyPart: false,
        sharePart: false,
        replyContent: '',
        replyFileName: '',
        attatchment: '',
        errors: [],
        // Shared Part
        valid: 0,
        forwardTo: '',
        sharedTopic: 'Fw:',
        sharedContent: '',
        sharedFileName: '',
        sharedFile: '',
      }
    },
    methods: {
      checkValid(forwardTo) {
      axios
        .get(`api/v1/emails/${forwardTo}/check-valid/`)
        .then(response => {
          if (response.data.status == 200) {
            this.valid = 1
          } else if (response.data.status == 400){
            this.valid = 2
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Forward Email - Share Sent
      sharedSent() {
        this.errors  = []
        if (this.valid == 0) {
          this.errors.push('Please check the email address before forwarding.')
        }

        if (this.forwardTo === '' || this.valid == 2) {
          this.errors.push('Please enter the correct email address.')
        }

        if (this.sharedTopic === '') {
          this.errors.push('Topic is missing!')        
        }

        if (this.sharedContent === '' && this.sharedFile === '') {
          this.errors.push('Email content could not be empty!')        
        }

        if (!this.errors.length) {
          let formData = new FormData()
          
          if (this.sharedFile != '') {
            var file = new File([this.sharedFile], 'Fw-' + this.sharedFileName)
          }

          formData.append('topic', this.sharedTopic)
          formData.append('receiver_address', this.forwardTo)
          formData.append('sender_address', this.user.get_user_simple_data.email)
          formData.append('text', this.sharedContent)
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
                message: 'Email has been forward successfully!',
                type: 'is-success',
                duration: 3000
              })
              location.href = '/email/'
            } else {
              toast({
                message: 'Email could not be forward!',
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

      shareOperation() {
        if (this.replyPart) {
          this.replyPart = false
        }
        this.sharePart = !this.sharePart
        this.sharedTopic = 'Fw: ' + this.email.name
      },

      clearFile() {
        this.replyFileName = ''
        this.attatchment = ''
        const replyFileName = document.querySelector('#replyPart .file-name')
        replyFileName.textContent = 'No File has been Selected...'
      },

      getFileName() {
        const fileInput = document.querySelector('input[type=file]')
        
        this.attatchment = fileInput.files[0].name
        if (fileInput.files.length > 0) {
          const replyFileName = document.querySelector('#replyPart .file-name')
          replyFileName.textContent = fileInput.files[0].name
        }
      },

      replySent() {
        this.errors = []

        if (this.replyContent === '' && this.attatchment === '') {
          this.errors.push('Email content could not be empty!')        
        }

        if (!this.errors.length) {
          let file = document.querySelector('#replyPart input[type=file]').files[0] 
          let formData = new FormData()
        
          formData.append('topic', 'Re: ' + this.email.name)
          formData.append('receiver_address', this.email.sender_address)
          formData.append('sender_address', this.user.get_user_simple_data.email)
          formData.append('text', this.replyContent)
          formData.append('attachment', file)
          formData.append('reply', this.email.id)   
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
                  message: 'Reply has been sent successfully!',
                  type: 'is-success',
                  duration: 3000
                })
                location.href = '/email/'
              } else {
                toast({
                  message: 'Reply could not be sent!',
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

      replyOperation() {
        if (this.sharePart) {
          this.sharePart = false
        }
        this.replyPart = !this.replyPart
      },
      goBack() {
        this.$router.go(-1)
      },

      setEmailStatusToRead(id) {
        axios
          .put('api/v1/emails/email/' + id + '/change-status/')
          .catch(error => {
            console.log(error)
          })
      },
      getEmail() {
        const email_id = location.pathname.match('[^/]+(?!.*/)')[0]

        axios
          .get('/api/v1/emails/email/' + email_id)
          .then(response => {
            this.email = response.data
            // Get previous email if it is a reply
            if(this.email.reply != null) {
              axios
                .get('/api/v1/emails/email/' + this.email.reply)
                .then(response => {
                  this.previousEmail = response.data
                  this.previousEmail.text = this.previousEmail.text.replace(/\r\n/g, "<br>")
                  if(this.previousEmail.attatchment != null) {
                    this.previous_attatchment_address = this.previousEmail.attatchment.slice(1)
                    this.previousFileName = this.previousEmail.attatchment.split('/')[4]
                  }
                  this.previousEmail.date_sent = this.previousEmail.date_sent.split('T')[0]
                })
            }
            // Calc the time to check whether it has been created over 12 hours
            var time = new Date(this.email.date_sent)
            var now = new Date()
            var diff = now - time
            var diffHours = diff / (1000 * 60 * 60)
            if (diffHours > 12) {
              this.email.date_sent = this.email.date_sent.split('T')[0] + ' ' + this.email.date_sent.split('T')[1].split('.')[0]
            } else {
              this.email.date_sent = diffHours.toFixed(0) + ' hrs'
            }
            let str = '----------------------------------------------'
            this.sharedContent = '=> Original: <' + this.email.sender_address + '>\n\n' + this.email.text + '\n' + str
            this.email.text = this.email.text.replace(/\r\n/g, "<br>")

            if(this.email.attatchment!=null) {
              this.attatchment_address = this.email.attatchment.slice(1)
              this.sharedFile = this.email.attatchment
              this.sharedFileName = this.sharedFile.split('/')[4]
              this.fileName = this.email.attatchment.split('/')[4]
            }
            // Not set the status to read if clicked from the portal of Sent Before
            if (this.email.unread == 0 && this.user.get_user_simple_data.email != this.email.sender_address) {
              this.setEmailStatusToRead(email_id)
            }

            document.title = this.email.name + ' | FlyMeCrods'
          })
          .catch(error => {
            console.log(error)
        })
      },

      getActiveUserInfo() {
        const user_id = localStorage.getItem('userid')
        axios
          .get('api/v1/users/' + user_id)
          .then(response => {
            this.user = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted() {
      this.getEmail()
      this.getActiveUserInfo()
    },  
}
</script>

<style scoped>
#email-body {
  margin-left: 2rem;
}

#subtitle-with-image {
  display: flex;
  align-items: center;
}

.image {
  position: absolute;
  left: 1rem;
}

#date_sent {
  display: flex;
  justify-content: flex-end;
}

#attatchment-part #title {
  color: white;
  background-color: #363636;
  padding: 0.5rem;
}

#attatchment-part #content {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: aliceblue;
}

#attatchment-part #content a {
  color: #363636;
}

#attatchment-part #content a:hover {
  text-decoration: underline;
}

textarea, input {
  font-family: 'Noto Serif Display', '宋体', serif;
}

#forward-title {
  color: white;
  background-color: #363636;
}

.input-module {
  display: flex;
  align-items: center;
}

.input-module p {
  margin-right: 1rem;
  width: 5%;
}

.check-buttons {
  display: flex;
}

.check-buttons .button {
  margin: 0.1rem;
}

@media screen and (max-width: 768px) { 
  #date_sent {
    justify-content: flex-start;
  }

  #email-body {
    margin-left: 0rem;
  }

  .image {
    display: none;
  }

  .input-module {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }

  .input-module p {
    width: 100%;
  }

  .input-module input {
    width: 100%;
  }

  .check-buttons {
    margin-top: 1rem;
  }
}
</style>