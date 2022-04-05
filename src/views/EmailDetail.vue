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
          <a :href="'http://localhost:8000' + this.email.attatchment" target="_blank">
            <span><i class="fas fa-file-download is-size-4 mr-3"></i></span>
            <span>{{ this.fileName }}</span>
          </a>
        </p>
      </div>
      <div class="column is-12 buttons">
        <button class="button">
          <span><i class="fas fa-reply-all mr-3"></i></span>
          <span>Reply</span>
        </button>
        <button class="button">
          <span><i class="fas fa-share mr-3"></i></span>
          <span>Share</span>
        </button>
        <button class="button is-dark" @click="goBack">
          <span><i class="fas fa-arrow-left mr-3"></i></span>
          <span>Back</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'EmailDetail',
    data() {
      return {
        email: {},
        fileName: '',
      }
    },
    methods: {
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

            this.email.text = this.email.text.replace(/\r\n/g, "<br>")

            if(this.email.attatchment!=null) {
              this.fileName = this.email.attatchment.split('/')[4]
            }

            if (this.email.unread == 0) {
              this.setEmailStatusToRead(email_id)
            }

            document.title = this.email.name + ' | FlyMeCrods'
          })
          .catch(error => {
            console.log(error)
        })
      },
    },
    mounted() {
      this.getEmail()
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
}
</style>