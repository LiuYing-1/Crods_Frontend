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
          <span><p class="mr-6 text"><b>SENT-TO</b></p></span>
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
export default {
  name: 'Email',
  data() {
    return {
      selectedPartIndex: 2,
      received_emails: [],
      sent_emails: [],
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
  },
  mounted() {
    document.title = "Email | FlyMeCrods"
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 15%;
  height: 100%;
  top: 0rem;
  left: 0rem;
  background-color: #363636;
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
  /* position: absolute; */
  width: 85%;
  margin-left: 15%;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 45%;
  }
  
  .email-section {
    width: 95%;
    margin-left: 50%;
  }
}
</style>