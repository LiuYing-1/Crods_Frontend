<template>
  <div class="user-profile-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/marketplace">Marketplace</router-link></li>
        <li class="is-active"><router-link to="/" aria-current="page">Profile</router-link></li>
      </ul>
    </nav>
    <div class="buttons" id="email-portal">
      <button class="button is-warning" @click="emailPortalAnimation">
        <i class="fas fa-envelope"></i>
      </button>
      <router-link to="/email">
        <button class="button is-warning"><b>Email Portal</b></button>
      </router-link>
    </div>
    <div class="columns is-multiline">
      <div class="column is-2" id="avatar-module">
        <div class="image is-96x96">
          <img :src="require('@/assets/icons8-man-in-yellow-striped-sweater.png')" alt="profile.png">
        </div>
        <p class="title">{{ this.user.username }}</p>
      </div>
      <div class="column is-5 userinfo-detail">
        <div class="posts module">
          <p class="subtitle">Post(s)</p>
          <p class="content">{{ this.user.posts_num }}</p>
        </div>
        <div class="picks module">
          <p class="subtitle">Pick(s)</p>
          <p class="content">{{ this.user.picks_num }}</p>
        </div>
        <div class="status module">
          <p class="subtitle">Status</p>
          <p class="content" v-if="this.user.is_busy == true">Busy</p>
          <p class="content" v-if="this.user.is_busy == false">Free</p>
        </div>
      </div>
      <div class="column is-5 userinfo-detail">
        <div class="reputation module">
          <p class="subtitle">Reputation</p>
          <p class="content">{{this.user.reputation}}</p>
        </div>
        <div class="email module">
          <p class="subtitle">Email</p>
          <p class="content" v-if="this.user.email != ''">{{this.user.email}}</p>
          <p class="content" v-if="this.user.email == ''">Haven't Registered</p>
        </div>
      </div>
      <div class="column box is-12 mt-3">
        <p class="subtitle"><b>Posts Module</b></p>
        <p v-if="this.posted_problems.length == 0">{{ this.user.username }} hasn't posted any problems till now.</p>
        <div v-if="this.posted_problems.length != 0">
          <button class="button is-light" @click="this.viewAllPostedProblems =! this.viewAllPostedProblems">View All Posted Problems</button>
          <div class="all-posted-problems" v-if="this.viewAllPostedProblems">
            <div v-for="problem in this.posted_problems" v-bind:key="problem.id">
              {{problem.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'UserProfile',
    data() {
      return {
        check_index: 0,
        user: {},
        posted_problems: [],
        viewAllPostedProblems: false,
      }
    },
    methods: {
      emailPortalAnimation() {
        let buttons = document.querySelectorAll('#email-portal .button.is-warning')
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.toggle('move-in')
        }
      },
      getUserPostedProblems() {
        const user_check_id = this.$route.params.user_id
        axios
          .get('api/v1/users/' + user_check_id + '/posted-problems/')
          .then(response => {
            this.posted_problems = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      getUser() {
        const user_check_id = this.$route.params.user_id
        axios
          .get(`api/v1/users/${user_check_id}/`)
          .then(response => {
            this.user = response.data

            this.user.username = this.user.get_user_simple_data.username
            this.user.email = this.user.get_user_simple_data.email
            
            document.title = 'Profile | ' + this.user.username + ' | FlyMeCrods'
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted() {
      this.getUserPostedProblems()
      this.getUser()
    },
}
</script>

<style scoped>
#email-portal {
  position: fixed;
  top: 5rem;
  right: -8rem;
  z-index: 1;
}

.move-in {
  transform: translateX(-8.5rem);
  transition: all 0.6s;
}

#avatar-module {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: azure;
}

#avatar-module .image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.userinfo-detail {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: lightgray;
}

.userinfo-detail .module {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.module .subtitle {
  font-weight: bold;
}
</style>