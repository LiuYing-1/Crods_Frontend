<template>
  <div class="register">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">FlyMeCrods</a></li>
        <li class="is-active"><a href="/register">Register</a></li>
      </ul>
    </nav>

    <div class="columns">
      <div class="column is-4 is-offset-4" id="form-to-join">
        <div class="box">

          <h1 class="title">Register</h1>

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
            <input type="password" class="input" v-model="password">
            </div>
          </div>

          <div class="field">
            <label>Repeat Password</label>
            <div class="control">
            <input type="password" class="input" v-model="password2">
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Register</button>
            </div>
          </div>

          <hr>

          Or <router-link to="/login">click here</router-link> to login!
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'Register',
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            errors: []
        }
    },
    methods: {
        submitForm() {
            this.errors = []

            if (this.username === '') {
                this.errors.push('The Username is missing!')
            }

            if (this.password != this.password2) {
                this.errors.push('The Passwords do not match!')
            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                }

                axios
                    .post("api/v1/users/register/", formData)
                    .then(response => {
                        toast({
                            message: 'Account created, please login!',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right'
                        })

                        this.$router.push('/login')
                    })
                    .catch(error => {
                        if(error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }

                            console.log(JSON.stringify(error.response.data))
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again')

                            console.log(JSON.stringify(error))
                        }
                    })
            }
        }
    },
}
</script>

<style scoped>
.register .box {
  background-image: linear-gradient(135deg, white 0%, #363636 100%);
}

@media screen and (max-width: 800px) {
  
}
</style>