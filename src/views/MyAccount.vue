<template>
  <div class="myaccount">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/" aria-current="page">My Account</router-link></li>
      </ul>
    </nav>

    <!-- This is the Page for the Admin -->
    <template v-if="user.username == 'YING'">
      <div class="columns is-multiline" id="admin-page">
        <div class="column is-12">
          <h1 class="title">Admin</h1>
        </div>

        <div class="column is-12">
          <div class="hero is-info is-halfheight">
            <div class="hero-body" id="welcome-back-body">
              <p class="subtitle has-text-centered">Dear <u>{{ user.username }}</u>, welcome back to FlyMeCrods!</p>
              <button @click="logout()" class="button is-danger">Log out</button>
              <div class="refs mt-5">
                <a href="#global">Global</a>
                <a href="#presession">Presession</a>
                <a href="#distribution">Distribution</a>
                <a href="#summary">Summary</a>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-12" id="global">
          <div class="hero is-dark">
            <div class="hero-body">
              <div class="title">Global</div>
              <div><a href="http://localhost:8000/admin" target="_blank">Click here to Enter <b>FlyMeCrods</b> Backend</a></div>
            </div>
          </div>
        </div>
        <div class="column is-12" id="presession">
          <div class="hero is-light">
            <div class="hero-body">
              <div class="title">Presession</div>
              <template v-if="this.presessions.length == 0">
                <div class="box">There is no precession here...</div>
              </template>
              <template v-else>
                <div v-for="(item, index) in this.presessions" v-bind:key="item.id">
                  <div class="box">
                    <div class="tag">{{index+1}}</div>
                    <div class="link">
                      <router-link :to="'/presessions/' + item.id"><i class="fas fa-eye mr-2"></i>Presession #{{item.id}}</router-link>
                    </div>
                    <p class="module-name"><b>Problem</b></p>
                    <div class="problem-name">
                      <p>{{item.get_problem_name}}</p>
                    </div>
                    <p class="module-name"><b>Picker</b></p>
                    <div class="problem-picker">
                      <p>{{item.get_picker_name}}</p>
                    </div>
                    <p class="module-name"><b>Date</b></p>
                    <div class="date-posted">
                      <p>{{ item.date_posted }}</p>
                    </div>
                    <p class="module-name"><b>Result</b></p>
                    <div class="presession-result">
                      <p v-if="item.result == 0">Waiting</p>
                      <p v-if="item.result == 1">Accept</p>
                      <p v-if="item.result == 2">Reject</p>
                    </div>
                    <p class="module-name"><b>Decision</b></p>
                    <div class="presession-button">
                      <button class="button is-primary" v-if="item.result == 0" @click="submitPresession(item, 1)">Accept</button>
                      <button class="button is-dark ml-4" v-if="item.result == 0" @click="submitPresession(item, 2)">Reject</button>
                      
                      <button class="button is-primary" v-if="item.result == 1" disabled>Accepted</button>
                      <button class="button is-danger" v-if="item.result == 2" disabled>Rejected</button>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="column is-12" id="distribution">
          <div class="hero is-warning">
            <div class="hero-body">
              <div class="title">Distribution</div>

            </div>
          </div>
        </div>
        <div class="column is-12" id="summary">
          <div class="hero is-primary">
            <div class="hero-body">
              <div class="title">Summary</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- This is the Page for Normal Client -->
    <template v-else>
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
                    <label class="label">Status (Busy)</label>
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
              <div id="title-part">
                <p class="title is-fullwidth">Posted</p>
                <router-link to="/post" class="routerlink">
                  <div class="post-button">
                    <button class="button is-primary">
                      <i class="fas fa-plus mr-3"></i>
                      <span>New Problem</span>
                    </button>
                  </div>
                </router-link>
              </div>
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
                      <router-link :to="'/problem-edit' + item.get_absolute_url">{{ item.name }}</router-link>
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
                      <p>Publish</p>
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

        <div class="column is-12" id="picked">
          <div class="hero is-warning">
            <div class="hero-body">
              <div class="title-part">
                <p class="title">Picked</p>
                <router-link to="/marketplace">
                  <div class="marketplace-button">
                    <button class="button is-dark marketplace">
                      <span>Marketplace</span>
                    </button>
                  </div>
                </router-link>
              </div>
              <template v-if="this.picked.length">
                <div v-for="(item, index) in this.picked" v-bind:key="item.id">
                  <div class="box mb-3">
                    <div class="tag">{{index+1}}</div>
                    <div class="module-part">
                      <p><b>Problem</b></p>
                    </div>
                    <div class="problem-name">
                      <router-link :to="{ path: '/solution' + item.get_problem_absolute_url, query: {id: item.id} }">{{ item.get_problem_name }}</router-link>
                    </div>
                    <div class="module-part">
                      <p><b>Accepted</b></p>
                    </div>
                    <div class="date-result">
                      {{ item.get_presession_date }}
                    </div>
                    <div class="module-part">
                      <p><b>Deadline</b></p>
                    </div>
                    <div class="deadline">
                      {{ item.get_problem_deadline }}
                    </div>
                    <div class="module-part">
                      <p><b>Status</b></p>
                    </div>
                    <div class="result-status">
                      {{ item.solution_result }}
                    </div>
                    
                    <div class="module-part">
                      <p><b>Portal</b></p>
                    </div>

                    <div class="picked-button">
                      <router-link :to="{path: '/solution' + item.get_problem_absolute_url, query: {id: item.id} }">
                        <button class="button is-dark" v-if="item.solution_result == 'In Progress'">
                          <i class="fas fa-edit mr-3"></i>
                          <span>Edit</span>
                        </button>
                      </router-link>

                      <button class="button is-primary" v-if="item.solution_result == 'Accepted'" disabled>
                        <i class="fas fa-lock mr-3"></i>
                        <span>Completed</span>
                      </button>

                      <button class="button is-danger" v-if="item.solution_result == 'Rejected'" disabled>
                        <i class="fas fa-lock mr-3"></i>
                        <span>Completed</span>
                      </button>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="box">
                  <p>You haven't picked any problems till now.</p>
                </div>
              </template>
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
    </template>
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
        picked: [],
        // Admin Part
        presessions: [],
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
                // Convert to readable format
                this.posted[i].deadline = this.posted[i].deadline.split('T')[0]
                this.posted[i].date_posted = this.posted[i].date_posted.split('T')[0]
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

      getUserSolutions(){
        const user_id =  localStorage.getItem('userid')

        axios
          .get(`/api/v1/solutions/${user_id}/`)
          .then(response => {
            this.picked = response.data
            for (let i = 0; i < this.picked.length; i++) {
              this.picked[i].get_presession_date = this.picked[i].get_presession_date.split('T')[0]
              this.picked[i].get_problem_deadline = this.picked[i].get_problem_deadline.split('T')[0]
              if (this.picked[i].solution_result == 0) {
                this.picked[i].solution_result = 'In Progress'
              } else if (this.picked[i].solution_result == 1) {
                this.picked[i].solution_result = 'Accepted'
              } else {
                this.picked[i].solution_result = 'Rejected'
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      },

      // Admin Part
      // GET Presessions
      async getPrecessions() {
        await axios
          .get('/api/v1/all-presessions/')
          .then(response => {
            this.presessions = response.data

            for (let i = 0; i < this.presessions.length; i++){
              this.presessions[i].date_posted = this.presessions[i].date_posted.split('T')[0]
            }
          })
          .catch(error => {
            console.log(error)
          })
      },

      // Accept Presession
      submitPresession(presession, result){
        axios
          .put('/api/v1/presessions/' + presession.id + '/update/', {
            result: result,
            reason: presession.reason,
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
              this.$router.push('/my-account')
            }
          })
          .catch(error => {
            console.log(error)
          })
      }

    },
    mounted() {
        document.title = "My Account | FlyMeCrods"
        this.getUserData()
        this.getUserPostedProblems()
        this.getPrecessions()
        this.getUserSolutions()
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
  color: #3e8ed0;
  transition: all 0.4s;
}

#posted .hero-body #title-part {
  position: relative;
  display: flex;
}

#posted #title-part .routerlink {
  position: absolute;
  top: -0.2rem;
  right: 0rem;
}

.post-button .button:hover {
  color: black;
  background-color: #fff;
  transition: all 0.6s;
}

#posted .tag {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  padding: 0.2rem 0.5rem;
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

#picked .hero-body .title-part {
  position: relative;
}

#picked .marketplace {
  position: absolute;
  background-color: #f0a5;
  top: 0;
  right: 0;
}

#picked .marketplace:hover {
  background-color: #1f7fce;
  transition: all 0.6s;
}

#picked .box {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#picked .tag {
  top: 0;
  left: 0;
  color: white;
  position: absolute;
  background-color: #363636;
}

#picked .box .module-part {
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#picked .box .problem-name, #picked .box .date-result, #picked .box .deadline, #picked .box .result-status, #picked .box .picked-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

#picked .box .problem-name {
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#picked .box .problem-name a:hover {
  color: #f0a5;
  transition: all 0.6s;
}

#picked .box .date-result {
  width: 15%;
}

#picked .box .deadline {
  width: 15%;
}

#picked .box .result-status {
  width: 15%;
}

#picked .box .picked-button {
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Admin Part Below */
#presession .box {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

#presession .box .tag {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #363636;
  color: #fff;
}

#presession .box p {
  margin-right: 0.5rem;
}

#presession .box .module-name {
  width: 3%;
  color: darkslateblue;
}

#presession .link, #presession .problem-id, #presession .problem-name, #presession .problem-name, #presession .problem-picker, #presession .date-posted {
  display: flex;
}

#presession .link {
  width: 15%;
  justify-content: center;
}

#presession .problem-name {
  width: 18%;
  justify-content: center;
}

#presession .problem-picker {
  width: 20%;
  justify-content: center;
}

#presession .date-posted {
  width: 10%;
  justify-content: center;
}

#presession .presession-result {
  display: flex;
  width: 10%;
  justify-content: center;
}

#presession .presession-button {
  display: flex;
  width: 22%;
  justify-content: center;
}

#presession .link a:hover {
  color: #1f7fce;
  transition: all 0.4s;
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

  #presession .box {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  #presession .problem-id, #presession .problem-name, #presession .problem-name, #presession .problem-picker, #presession .date-posted, #presession .presession-result {
    display: flex;
    width: 100%;
    justify-content: flex-start;
  }

  #presession .link {
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-weight: bold;
    background-color: #363636;
    color: white;
    justify-content: center;
  }

  #presession .presession-button {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }

  #picked .box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  
  #picked .box .module-part, #picked .box .problem-name, #picked .box .date-result, #picked .box .deadline, #picked .box .result-status {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  #picked .box .picked-button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
