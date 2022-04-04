<template>
  <div class="email-page">
    <div class="sidebar">
      <div class="slogan">
        <h2><p class="subtitle mr-3 text"><router-link to="/email">CATOGORY</router-link></p></h2>
        <button class="button is-dark subtitle" @click="sidebarOperation">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <hr>
      <div class="categories">
        <button class="button is-dark" @click="this.selectedPartIndex = 1" v-bind:class="{'is-active': this.selectedPartIndex == 1}"> 
          <span><p class="mr-6 text"><b>WRITE</b></p></span>
          <span><i class="fas fa-plus"></i></span>
        </button>
        <button class="button is-dark" @click="this.selectedPartIndex = 2" v-bind:class="{'is-active': this.selectedPartIndex == 2}">
          <span><p class="mr-6 text"><b>INBOX</b></p></span>
          <span><i class="fas fa-inbox"></i></span>
        </button>
        <button class="button is-dark" @click="this.selectedPartIndex = 3" v-bind:class="{'is-active': this.selectedPartIndex == 3}">
          <span><p class="mr-6 text"><b>SENTO</b></p></span>
          <span><i class="fas fa-paper-plane"></i></span>
        </button>
      </div>
    </div>

    <!-- Main Body of the Email Page -->
    <!-- Write Section -->
    <div class="email-section">
      <template v-if="selectedPartIndex==1">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h1 class="title"><b>Write</b></h1>
            <hr>
          </div>
          <div class="column is-12">
            <form @submit.prevent="sumitForm">
              <div class="box" id="write-email">
                <div class="columns is-multiline">
                  <div class="column is-12 box-header">
                    <p>New Letter</p>
                  </div>
                  <div class="column is-12 receiver-address">
                    <p>Receiver</p>
                    <input type="input" class="input" placeholder="e.g., @crods.flyme.social" v-model="this.ready_to_send" />
                    <button class="button is-light" v-if="this.ready_to_send != ''" @click="checkValid(this.ready_to_send)">Check</button>
                    <button class="button is-primary" v-if="this.valid == 1" disabled>Valid</button>
                    <button class="button is-danger" v-if="this.valid == 2" disabled>Invalid</button>
                  </div>
                  <div class="column is-12 topic">
                    <p>Topic</p>
                    <input type="input" class="input" />
                  </div>
                  <div class="column is-12 email-content">
                    <textarea type="textarea" class="textarea"></textarea>
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
                        <span class="file-name" v-if="this.fileName == ''">
                            No File has been Selected...
                        </span>
                        <span class="file-name" v-else>
                            {{this.fileName}}
                        </span>
                      </label>

                      <button class="button is-warning" @click="clearFile"  v-if="this.attachment != ''">
                        Clear
                      </button>
                    </div>
                  </div>
                  <div class="column is-12 has-text-right">
                    <button class="button is-info">Send</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </template>

      <!-- Inbox Section -->
      <template v-if="selectedPartIndex==2">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h1 class="title"><b>Inbox</b></h1>
            <hr>
          </div>
          <template v-if="this.received_emails.length == 0">
            <div class="column is-12">
              <div class="box">
                <p>There is no email here.</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="column is-12" id="inbox-part">
              <div v-for="email in this.received_emails" v-bind:key="email.id">
                <router-link :to="/email/ + email.id">
                  <div class="box unread-emails" v-if="email.unread == 0">
                    <div class="sender-username">
                      <p>{{ email.get_sender_username }}</p>
                    </div>
                    <div class="email-topic">
                      <p>{{ email.name }}</p>
                    </div>
                    <div class="email-content">
                      <p class="has-text-grey">{{ email.text }}</p>
                    </div>
                    <div class="email-date">
                      <p>{{ email.date_sent }}</p>
                    </div>
                  </div>
                  <!-- Already Read Emails -->
                  <div class="box read-emails" v-if="email.unread == 1">
                    <div class="sender-username">
                      <p>{{ email.get_sender_username }}</p>
                    </div>
                    <div class="email-topic">
                      <p>{{ email.name }}</p>
                    </div>
                    <div class="email-content">
                      <p class="has-text-grey">{{ email.text }}</p>
                    </div>
                    <div class="email-date">
                      <p>{{ email.date_sent }}</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </template>
        </div>
      </template>

      <!-- Sent Section -->
      <template v-if="selectedPartIndex==3">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h1 class="title"><b>Sent Before</b></h1>
            <hr>
          </div>
          <template v-if="this.sent_emails.length == 0">
            <div class="column is-12">
              <div class="box">
                <p>There is no email sent by you here.</p>
              </div>
            </div>
          </template>
          <template v-else>
            
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Email',
  data() {
    return {
      selectedPartIndex: 2,
      user: {},
      received_emails: [],
      sent_emails: [],
      // Below are the Writing Part
      ready_to_send: '',
      valid: 0,
      fileName: '',
      attachment: '',
    }
  },
  methods: {
    sidebarOperation() {
      const sidebar = document.querySelector('.sidebar')
      sidebar.classList.toggle('move-out')
      let texts = document.getElementsByClassName('text')
      for (let i = 0; i < texts.length; i++) {
        texts[i].classList.toggle('is-hidden')
        if(!texts[i].classList.contains('is-hidden')) {
            document.querySelector('.email-section').style.width = '85%'
        } else {
            document.querySelector('.email-section').style.width = '95%'
        }
      }
      let icons = document.getElementsByTagName('i')
      let email_section = document.querySelector('.email-section')
      for (let i = 0; i < icons.length; i++) {
        icons[i].classList.toggle('move-to-right')
      }
      email_section.classList.toggle('move-to-left')
    },

    getFileName() {
        const fileInput = document.querySelector('input[type=file]')
        
        this.attachment = fileInput.files[0].name
        if (fileInput.files.length > 0) {
          const fileName = document.querySelector('.file-name')
          fileName.textContent = fileInput.files[0].name
        }
    },

    clearFile() {
      this.fileName = ''
      this.attachment = ''
      const fileName = document.querySelector('.file-name')
      fileName.textContent = 'No File has been Selected...'
    },

    checkValid(ready_to_send) {
      axios
        .get(`api/v1/emails/${ready_to_send}/check-valid/`)
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

    getEmails(address) {
      axios
        .get('api/v1/emails/' + address)
        .then(response => {
          this.received_emails = response.data
          for (let i = 0; i < this.received_emails.length; i++) {
            this.received_emails[i].date_sent = this.received_emails[i].date_sent.slice(5, 10)
            if (this.received_emails[i].text.length > 65) {
              this.received_emails[i].text = this.received_emails[i].text.slice(0, 65) + '...'
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    getUserInfo() {
      const user_id = localStorage.getItem('userid')
      axios
        .get('api/v1/users/' + user_id)
        .then(response => {
          this.user = response.data
          const email_address = this.user.get_user_simple_data.email
          this.getEmails(email_address)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getUserInfo()
    document.title = "Email | FlyMeCrods"
  }
}
</script>

<style scoped>
.sidebar {
  width: 15%;
  height: 100%;
  top: 0rem;
  left: 0rem;
  display: flex;
  position: fixed;
  flex-direction: column;
  background-color: #363636;
  z-index: 1;
}

.sidebar p, a {
  color: white;
  font-weight: bold;
}

.sidebar .slogan {
  width: 100%;
  height: 15%;
  margin-top: 5rem;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.sidebar .categories {
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar .categories button {
  width: 100%;
  height: 33%;
  display: flex;
}

.move-out {
  transform: translateX(-10rem);
  transition: all 0.6s;
}

.move-to-right {
  transform: translateX(5rem);
  transition: all 0.6s;
}

.move-to-left {
  transform: translateX(-10rem);
  transition: all 0.6s;
}

.email-page {
  position: relative;
}

.email-section {
  width: 85%;
  margin-left: 15%;
}

#inbox-part .box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#inbox-part .box:hover {
  background-color: rgb(199, 196, 196);
}

#inbox-part .sender-username {
  width: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#inbox-part .email-topic {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#inbox-part .email-content {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#inbox-part .email-date {
  width: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#inbox-part .read-emails {
  background-color: rgb(228, 226, 226);
}

#write-email .box-header {
  color: white;
  border-radius: 0.2rem;
  background-color: #363636;
}

#write-email .receiver-address, #write-email .topic {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

#write-email .receiver-address p, #write-email .topic p {
  width: 5%;
  color: darkgray;
}

#write-email .receiver-address input, #write-email .topic input {
  font-family: 'Noto Serif Display', serif;
  margin-left: 1rem;
  border: none;
  border-bottom: 1px solid darkgray;
  border-top: 1px solid darkgray;
}

#write-email .receiver-address button {
  margin-left: 0.2rem;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 45%;
  }
  
  .email-section {
    width: 95%;
    margin-left: 50%;
  }

  #inbox-part .box {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  #inbox-part .sender-username {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  #inbox-part .email-topic {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  #inbox-part .email-content {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  #inbox-part .email-date {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 45%;
    display: flex;
  }

  #write-email .receiver-address, #write-email .topic {
    flex-direction: column;
    justify-content: flex-start;
  }

  #write-email .receiver-address p, #write-email .topic p {
    width: 100%;
  }

  #write-email .receiver-address button {
    margin-top: 1rem;
  }

  #write-email .receiver-address input, #write-email .topic input {
    border: 1px solid darkgray;
    margin-left: 0rem;
  }
}
</style>