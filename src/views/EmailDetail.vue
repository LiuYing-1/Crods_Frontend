<template>
  <div class="email-detail-page">
    <p>{{ this.email }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'EmailDetail',
    data() {
      return {
        email: {},
      }
    },
    methods: {
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

            if (this.email.unread == 0) {
              this.setEmailStatusToRead(email_id)
            }
          })
          .catch(error => {
            console.log(error)
        })
      },
    },
    mounted() {
      this.getEmail()
      document.title = 'Email Detail | FlyMeCrods'
    },  
}
</script>

<style scoped>

</style>