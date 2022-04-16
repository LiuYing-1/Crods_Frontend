<template>
  <div class="page-motivation">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li><router-link to="/checklist">Planlist</router-link></li>
        <li><router-link to="/checklist/confirmation">Confirmation</router-link></li>
        <li class="is-active"><router-link to="#" aria-current="page">Motivation</router-link></li>
      </ul>
    </nav>

    <p class="title">Motivation</p>
    <div class="hero is-info">
      <div class="hero-body">
        <p class="subtitle"><b>Problem: [ {{ this.problem.name }} ]</b></p>
        <p id="notice">*Please state motivation here, and wait for the decision.</p>
        <hr>

        <form @submit.prevent=submitForm class="mt-3">
          <div class="columns is-multiline">
            <div class="column is-12">
              <label class="label">Motivation</label>
              <textarea class="textarea" placeholder="State your motivation here" v-model="this.motivation"></textarea>
            </div>
          </div>

          <div class="column is-12">
            <div class="notification is-danger" v-if="errors.length">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </div>

          <div class="column is-12 has-text-centered">
            <button class="button is-dark">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';

export default {
  name: 'Motivation',
  data() {
    return {
      problem: {},
      motivation: '',
      errors: [],
    }
  },
  components: {
  },
  methods: {
    async submitForm() {
      this.errors = []

      if (this.motivation === '') {
        this.errors.push('Please state your motivation')
      }

      var user = localStorage.getItem("userid");
      var problem = this.problem
      var motivation = this.motivation
      
      if (!this.errors.length){
        const formData = {
          user: user,
          problem: problem.id,
          motivation: motivation,
        }
        
        await axios
          .post('/api/v1/presessions/post/', formData)
          .then(response => {
            console.log(response);
            var message = "Your motivation has been sent."
            if (response.data.status == 201) {
              toast({
                message: message,
                type: 'is-success',
                duration: 3000,
                position: 'bottom-right',
                dismissible: true,
              });
              this.$store.commit('removeTasks')
              this.$router.push({path: '/success'})
            } else {
              message = response.data.message
              toast({
                message: message,
                type: 'is-danger',
                duration: 3000,
                position: 'bottom-right',
                dismissible: true,
              });
            }
          })
          .catch(error => {
            console.log(error);
            if(error.response) {
            for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }
              console.log(JSON.stringify(error.response.data))
            }
          });
      }
    }
  },
  mounted() {
    this.problem = this.$store.state.tasks.items[0].problem;
    document.title = 'Motivation | FlyMeCrods'
  }
}
</script>

<style scoped>
#notice {
  color: darkred;
}
form textarea {
  font-family: 'Noto Serif Display', '宋体', serif;
}
</style>