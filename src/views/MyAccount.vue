<template>
  <div class="myaccount">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/" aria-current="page">My Account</router-link></li>
      </ul>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">My Account</h1>
      </div>

      <div class="column is-12">
        <div class="hero is-dark is-halfheight">
          <div class="hero-body" id="welcome-back-body">
            <p class="subtitle has-text-centered">Dear <b><u>{{ user.username }}</u></b>, welcome back to FlyMeCrods!</p>
            <button @click="logout()" class="button is-danger">Log out</button>
            <div class="refs mt-5">
              <a href=#profile>Profile</a>
              <a href=#posted>Posted</a>
              <a href=#picked>Picked</a>
              <a href=#sum>Summary</a>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-12" id="profile" >
        <div class="hero is-light">
          <div class="hero-body">
            <p class="title">Profile</p>
            <form @submit.prevent="submitForm" class="columns is-multiline">
              <div class="column is-3">
                <div class="field">
                  <label class="label">Username</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Username" v-model="user.username" disabled="disabled">
                  </div>
                </div>
              </div>
              <div class="column is-3">
                <div class="field">
                  <label class="label">Password (Token)</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Password" v-model="user.password" disabled="disabled">
                  </div>
                </div>
              </div>
              <div class="column is-3">
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input class="input" type="email" placeholder="Empty" v-model="user.email" v-if="save_button">
                    <input class="input" type="email" placeholder="Empty" v-model="user.email" v-if="!save_button" disabled>
                  </div>
                  
                </div>
              </div>
              <div class="column is-3">
                <div class="field">
                  <label class="label">Posted Number</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Posted Number" v-model="user.posts_num" disabled="disabled">
                  </div>
                </div>
              </div>
              <div class="column is-3">
                <div class="field">
                  <label class="label">Picked Number</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Picked Number" v-model="user.picks_num" disabled="disabled">
                  </div>
                </div>
              </div>
              <div class="column is-3">
                <div class="filed">
                  <label class="label">Status</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Status" v-model="user.is_busy" disabled="disabled">
                  </div>
                </div>
              </div>
              <div class="column is-3">
                <div class="filed">
                  <label class="label">Balance</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Balance" v-model="user.balance" disabled="disabled">
                  </div>
                </div>
              </div>
              <div class="column is-3">
                <div class="filed">
                  <label class="label">Reputation</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Reputation" v-model="user.reputation" disabled="disabled">
                  </div>
                </div>
              </div>
              
              <div class="column is-12"  id="save-button">
                <div class="field mt-3">
                  <div class="control">
                    <button class="button is-dark" v-if="!save_button" @click="save_button = !save_button">Modify</button>
                    <button class="button is-primary" v-if="save_button">Save</button>
                    <button class="button ml-3" v-if="save_button" @click="save_button = !save_button">Cancel</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="column is-12" id="posted">
        <div class="hero is-info">
          <div class="hero-body">
            <p class="title is-fullwidth">Posted</p>
            <template v-if="this.posted.length">
              <div v-for="(item, index) in this.posted" v-bind:key="item.id">
                <div class="box mb-3">
                  <div class="tag">
                    <span class="has-text-weight-bold mr-2">{{ index+1 }}</span>
                    <span class="has-text-weight-bold">{{ item.get_tagname }}</span>
                  </div>
                  <div class="header-name">
                    <p>Problem</p>
                  </div>
                  <div class="posted-problem-name">
                    <router-link :to="item.get_absolute_url">{{ item.name }}</router-link>
                  </div>
                  <div class="header-name">
                    <p>Budget</p>
                  </div>
                  <div class="posted-problem-budget">
                    <p>&euro; {{ item.budget }}</p>
                  </div>
                  <div class="header-name">
                    <p>Deadline</p>
                  </div>
                  <div class="posted-problem-deadline">
                    <p>{{ item.deadline }}</p>
                  </div>
                  <div class="header-name">
                    <p>PubDate</p>
                  </div>
                  <div class="posted-problem-date-posted">
                    <p>{{ item.date_posted }}</p>
                  </div>
                  <div class="header-name">
                    <p>Status</p>
                  </div>
                  <div class="posted-problem-status">
                    <p>{{ item.status }}</p>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="box">
                <p>You haven't posted any problems till now.</p>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="column is-12">
        <div class="hero is-warning">
          <div class="hero-body">
            <p class="title" id="picked">Picked</p>
          </div>
        </div>
      </div>

      <div class="column is-12">
        <div class="hero is-primary">
          <div class="hero-body">
            <p class="title" id="sum">Summary</p>
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
    name: 'MyAccount',
    data() {
      return {
        save_button: false,
        posted: [],
        user: {
          user_id: '',
          username: '',
          password: '',
          email: '',
          posts_num: '',
          picks_num: '',
          is_busy: '',
          balance: '',
          reputation: '',
        },
      }
    },
    methods: {
      logout() {
          axios.defaults.headers.common['Authorization'] = ""

          localStorage.removeItem("token")
          localStorage.removeItem("username")
          localStorage.removeItem("userid")
          this.$store.commit('removeToken')

          this.$router.push('/')
        },

      async getUserData() {
        this.$store.commit('setIsLoading', true)

        const user_id = localStorage.getItem('userid')
        await axios
            .get(`/api/v1/users/${user_id}/`)
            .then(response => {
              this.user = {
                username: response.data.get_user_simple_data.username,
                password: response.data.get_user_simple_data.password,
                email: response.data.get_user_simple_data.email,
                posts_num: response.data.posts_num,
                picks_num: response.data.picks_num,
                is_busy: response.data.is_busy,
                balance: response.data.balance,
                reputation: response.data.reputation,
              }
            })
            .catch(error => {
              console.log(error)
            })

        this.$store.commit('setIsLoading', false)
      },

      async submitForm() {
        this.$store.commit('setIsLoading', true)

        const user_id = localStorage.getItem('userid')
        await axios
            .put(`/api/v1/users/${user_id}/update-email/`, {
              email: this.user.email,
            })
            .then(response => {
              console.log(response)
              if(response.data.message == 'Please do not use the same email address')
              {
                toast({
                  message: response.data.message,
                  type: 'is-danger',
                  duration: 3000,
                  position: 'bottom-right',
                })
              } else {
                toast({
                  message: response.data.message,
                  type: 'is-success',
                  duration: 3000,
                  position: 'bottom-right',
                })
                this.save_button = false
              }
            })
            .catch(error => {
              console.log(error)
            })
          this.$store.commit('setIsLoading', false)
      },

      async getUserPostedProblems() {
        this.$store.commit('setIsLoading', true)

        const user_id = localStorage.getItem('userid')
        await axios
            .get(`/api/v1/users/${user_id}/posted-problems/`)
            .then(response => {
              this.posted = response.data
              
              for (let i = 0; i < this.posted.length; i++) {
                // Assign to specific page for problems
                this.posted[i].get_absolute_url = this.posted[i].get_absolute_url
                // Convert to readable format
                this.posted[i].deadline = this.posted[i].deadline.split('T')[0] + ' ' + this.posted[i].deadline.split('T')[1].split('+')[0]
                this.posted[i].date_posted = this.posted[i].date_posted.split('T')[0] + ' ' + this.posted[i].date_posted.split('T')[1].split('.')[0]
                if (this.posted[i].status == 0) {
                  this.posted[i].status = 'Unaccepted'
                } else if (this.posted[i].status == 1) {
                  this.posted[i].status = 'In Progress'
                } else {
                  this.posted[i].status = 'Completed'
                }
              }
            })
            .catch(error => {
              console.log(error)
            })
        this.$store.commit('setIsLoading', false)
      },
    },
    mounted() {
        document.title = "My Account | FlyMeCrods"
        this.getUserData()
        this.getUserPostedProblems()
      }
}
</script>

<style scoped>
#welcome-back-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.refs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.refs a {
  color: #fff;
  padding: 0 0.2rem;
}

.refs a:hover {
  transform: scale(1.1);
  transition: all 0.4s ease-in-out;
}

form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

form input{
  font-family: "Noto Serif Display", serif;
}

#save-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

#posted .box {
  color: white;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #363636;
}

#posted .box a:hover {
  color: pink;
  transition: all 0.4s;
}

.tag {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: #000;
}

.header-name {
  width: 5%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  color: #00c4a7;
}

.posted-problem-name, .posted-problem-budget, .posted-problem-deadline, .posted-problem-date-posted, .posted-problem-status {
  width: 15%;
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 800px) {
  form {
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;
  }
  #profile {
    position: relative;
  }

  #save-button {
    position: absolute;
    place-self: center;
    bottom: 1rem;
  }

  #posted .box {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .posted-problem-name, .posted-problem-budget, .posted-problem-deadline, .posted-problem-date-posted, .posted-problem-status {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
  .header-name {
    justify-content: flex-start;
    width: 100%;
  }
}
</style>
