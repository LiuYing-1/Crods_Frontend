<template>
  <div class="login">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>

    <div class="columns">
      <div class="column is-4 is-offset-4" id="form-to-join">
        <div class="box">

          <h1 class="title">Login</h1>

          <form @submit.prevent="submitForm">
            <div class="field">
              <label>Username</label>
              <div class="control">
                <input type="text" class="input" v-model="username">
              </div>
            </div>

            <div class="field">
              <label>Password</label>
              <div class="control">
                <input type="text" class="input" v-model="password">
              </div>
            </div>

            <div class="notification is-danger" v-if="errors.length">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>

            <div class="field">
              <div class="control">
                <button class="button is-dark">Login</button>
              </div>
            </div>

            <hr>

            Or <router-link to="/register">click here</router-link> to register!
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Login | FlyMeCrods'
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common['Authorization'] = ''

      localStorage.removeItem('token')

      const formData = {
        username: this.username,
        password: this.password
      }

      await axios
            .post("/api/v1/users/login/", formData)
            .then(response => {
              const token = response.data.token
              this.$store.commit('setToken', token)
              axios.defaults.headers.common['Authorization'] = "Token " + token
              localStorage.setItem('token', token)
              const toPath = this.$route.query.to || '/'
              this.$router.push(toPath)
            })
            .catch(error => {
              if (error.response) {
                for (const property in error.response.data) {
                  if (`${property}` === 'non_field_errors') {
                    this.errors.push("Login Failed")
                  } else {
                    this.errors.push(`${property}: ${error.response.data[property]}`)
                  }
                }
              } else {
                this.errors.push('Something went wrong. Please try again')

                console.log(JSON.stringify(error))
              }
            })
    },
  }
}
</script>

<style scoped>
.login .box {
  background-image: linear-gradient(135deg, white 0%, #363636 100%);
}
</style>