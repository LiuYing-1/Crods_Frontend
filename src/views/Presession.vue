<template>
  <div class="page-presession">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/my-account">My Account</router-link></li>
        <li class="is-active"><router-link to="#" aria-current="page">Presession</router-link></li>
      </ul>
    </nav>

    <div class="columns is-multiline presession-part">
      <div class="column is-12">
        <h1 class="title">Presession</h1>
      </div>

      <div class="back-button">
        <router-link to="/my-account" class="button is-primary">Back</router-link>
      </div>

      <div class="column is-6">
        <div class="problem-part box">
          <div class="tag">Problem-Info</div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <div class="image">
                <img :src="this.problem.get_image" alt="">
              </div>
            </div>
            <div class="column is-12 has-text-centered">
              <p class="subtitle">
                <b>{{ this.problem.name }}</b>
              </p>
            </div>
            <div class="column is-6">
              <p><b>Description</b></p>
              <p>{{ this.problem.description }}</p>
            </div>
            <div class="column is-6">
              <p><b>Details</b></p>
              <p>{{ this.problem.details }}</p>
            </div>
            <div class="column is-6">
              <p>
                <span><b>Poster</b></span>
                <span class="ml-4">{{ this.problem.get_username }}</span>
              </p>
            </div>
            <div class="column is-6">
              <p>
                <span><b>Deadline</b></span>
                <span class="ml-4">{{ this.problem.deadline }}</span>
              </p>
            </div>
            <div class="column is-12 has-text-centered remaining">
              <hr>
              <p>
                <span><b>Remaining</b></span>
                <span class="ml-4" v-if="this.problem.status!=2">{{ this.remaining }} days</span>
                <span class="ml-4" v-if="this.problem.status==2">Ended</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div class="picker-part box">
          <div class="tag">Presession-Info</div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <p class="subtitle">Picker</p>
            </div>
            <div class="column is-12 has-text-centered">
              <p class="trigger" @click="getUser">
                <span><b>User</b></span>
                <span class="ml-4" v-if="this.trigger">{{ this.user.get_user_simple_data.username }}</span>
              </p>
            </div>
            <div class="column detail-part" v-if="this.trigger">
              <table class="table">
                <tr>
                  <th>Username</th>
                  <td>{{ this.user.get_user_simple_data.username }}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ this.user.get_user_simple_data.email }}</td>
                </tr>
                <tr>
                  <th>Num of Posts</th>
                  <td>{{ this.user.posts_num }}</td>
                </tr>
                <tr>
                  <th>Num of Picks</th>
                  <td>{{ this.user.picks_num }}</td>
                </tr>
                <tr>
                  <th>Reputation</th>
                  <td>{{ this.user.reputation }}</td>
                </tr>
                <tr>
                  <th>Profile</th>
                  <td><router-link :to="'/user/' + this.user_id">Portal</router-link></td>
                </tr>
              </table>
            </div>
            <div class="column is-12">
              <p class="mb-3"><b>Motivation</b></p>
              <div class="box motivation">
                <p>{{ this.presession.motivation }}</p>
              </div>
            </div>
            <div class="column is-12">
              <form @submit.prevent="submitForm">
                <div class="field">
                  <label class="label">Reason (Accept/Reject)</label>
                  <textarea class="textarea" placeholder="Waiting for the decision" v-model="this.presession.reason" v-if="this.presession.result == 0"></textarea>
                  <textarea class="textarea" placeholder="Waiting for the decision" v-model="this.presession.reason" disabled v-if="this.presession.result != 0"></textarea>
                </div>

                <div class="buttons">
                  <button class="button is-primary" v-if="this.presession.result == 0" @click="submitForm(1)">
                    <span>
                      <i class="fas fa-check"></i>
                    </span>
                    <span class="ml-2">Accept</span>
                  </button>
  
                  <button class="button is-light ml-2" v-if="this.presession.result == 0" @click="submitForm(2)">
                    <span>
                      <i class="fas fa-times"></i>
                    </span>
                    <span class="ml-2">Reject</span>
                  </button>

                  <button class="button is-primary" disabled v-if="this.presession.result == 1">Accepted</button>
                  <button class="button is-danger" disabled v-if="this.presession.result == 2">Rejected</button>
                </div>
              </form>
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
  name: 'Presession',
  data() {
    return {
      presession: {},
      remaining: 0,
      problem: {},
      user_id: 0,
      trigger: false,
      user: {}
    }
  },
  methods: {
    async getPresession() {
      const presession_id = this.$route.params.presession_id
      
      await axios
        .get('/api/v1/presessions/' + presession_id + '/')
        .then(response => {
          this.presession = response.data

          // Get Corresponding Problem
          let problem_url = this.presession.get_problem_absolute_url
          axios
            .get('/api/v1/problems' + problem_url)
            .then(response => {
              this.problem = response.data
              this.problem.deadline = this.problem.deadline.split('T')[0]
              this.user_id = this.presession.user

              let end_time = new Date(this.problem.deadline)
              let now = new Date()
              if (now > end_time) {
                this.remaining = 0
              } else {
                this.remaining = Math.floor((end_time - now) / (1000 * 60 * 60 * 24))
              }
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

    async getUser() {
      await axios
        .get('/api/v1/users/' + this.user_id + '/')
        .then(response => {
          this.trigger = !this.trigger
          this.user = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    async submitForm(i) {
      if (i == 1) {
        this.presession.result = 1
      } else if (i == 2){
        this.presession.result = 2
      }

      await axios
        .put('/api/v1/presessions/' + this.presession.id + '/update/', {
          result: this.presession.result,
          reason: this.presession.reason
        })
        .then(response => {
          if (response.data.status == 400) {
            toast({
              message: response.data.message,
              type: 'is-danger',
              duration: 3000,
              position: 'bottom-right',
              dismissible: true
            })
            this.presession.result = 0
          } else if (response.data.status == 201) {
            toast({
              message: response.data.message,
              type: 'is-success',
              duration: 3000,
              position: 'bottom-right',
              dismissible: true
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getPresession()
    document.title = "Presession | FlyMeCrods"
  }
}
</script>

<style scoped>
.presession-part {
  position: relative;
}

.back-button {
  position: absolute;
  top: 0;
  right: 1rem;
}

.problem-part {
  position: relative;
}

.problem-part .tag {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  color: white;
  background-color: #363636;
}

.problem-part .subtitle {
  color: white;
  padding: 0.5rem;
  background-color: #363636;
}

.remaining span {
  color: red;
}

.picker-part {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #363636;
}

.picker-part .tag {
  position: absolute;
  background-color: white;
  top:0;
  left:0;
}

.picker-part p {
  color: white;
}

.picker-part {
  width: 100%;
  height: 100%;
}

.trigger {
  cursor: pointer;
}

.table p {
  color: black;
}

.table {
  width: 100%;
  background-color: #c2bfbf;
}

.table td {
  border-left: 1px solid white;
  text-align: center;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table a {
  color: #363636;
}

.detail-part {
  display: flex;
  justify-content: center;
  align-items: center;
}

.motivation {
  background-color: rgb(99, 158, 231);
}

.motivation p {
  color: black;
}

form .label {
  color: white;
}

form textarea {
  font-family: 'Noto Serif Display', serif;
}

form textarea:focus {
  background-color: darkgray;
  transition: all 0.6s;
}

.buttons {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 800px) {

}

</style>