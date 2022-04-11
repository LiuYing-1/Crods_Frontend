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
      <div class="column box is-12 mt-3" id="posts-module">
        <p class="subtitle"><b>Posts Module</b></p>
        <p v-if="this.posted_problems.length == 0">{{ this.user.username }} hasn't posted any problems till now.</p>
        <div v-if="this.posted_problems.length != 0">
          <button class="button is-light" @click="this.viewAllPostedProblems =! this.viewAllPostedProblems">View All Posted Problems</button>
          <div class="all-posted-problems" v-if="this.viewAllPostedProblems">
            <span v-for="problem in this.posted_problems" v-bind:key="problem.id">
              {{problem.name}} |
            </span>
          </div>
          <div class="posted-problems-chart">
            <v-chart class="vuechart" :option="option" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toRaw} from '@vue/reactivity'
export default {
    name: 'UserProfile',
    data() {
      return {
        check_index: 0,
        user: {},
        posted_problems: [],
        viewAllPostedProblems: false,
        posted_times: [],
        accepted_solutions: [],
        accepted_times: [],
        rejected_solutions: [],
        rejected_times: [],
        // Chart Options
        option: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'Posted Problems / Solutions Desicion'
          },
          tooltip: {},
          legend: {
            top: '30px',
            left: 'center',
            data: ['Posted', 'Accepted', 'Rejected']
          },
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [
            {
              name: 'Posted',
              type: 'bar',
              data: [],
              itemStyle: {
                borderRadius: [5, 5, 0, 0]
              }
            },
            {
              name: 'Accepted',
              type: 'bar',
              data: [],
              itemStyle: {
                borderRadius: [5, 5, 0, 0]
              }
            },
            {
              name: 'Rejected',
              type: 'bar',
              data: [],
              itemStyle: {
                borderRadius: [5, 5, 0, 0]
              }
            }
          ],
        }
      }
    },
    methods: {
      emailPortalAnimation() {
        let buttons = document.querySelectorAll('#email-portal .button.is-warning')
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.toggle('move-in')
        }
      },

      drawBarChart(){
        axios
          .all([
            axios.get('api/v1/users/' + this.$route.params.user_id + '/posted-problems/'),
            axios.get('api/v1/users/' + this.$route.params.user_id + '/accepted-solutions/'),
            axios.get('api/v1/users/' + this.$route.params.user_id + '/rejected-solutions/')
          ])
          .then(axios.spread((posted, accepted, rejected) => {
            this.posted_problems = posted.data
            this.posted_problems.forEach(problem => {
              if (this.posted_times.filter(time => time.date == problem.date_posted.split('T')[0]).length == 0) {
                this.posted_times.push({date: problem.date_posted.split('T')[0], count: 1})
              } else {
                this.posted_times.filter(time => time.date == problem.date_posted.split('T')[0])[0].count += 1
              }
            })

            this.accepted_solutions = accepted.data
            this.accepted_solutions.forEach(solution => {
              if (this.accepted_times.filter(time => time.date == solution.date_posted.split('T')[0]).length == 0) {
                this.accepted_times.push({date: solution.date_posted.split('T')[0], count: 1})
              } else {
                this.accepted_times.filter(time => time.date == solution.date_posted.split('T')[0])[0].count += 1
              }
            })

            this.rejected_solutions = rejected.data
            this.rejected_solutions.forEach(solution => {
              if (this.rejected_times.filter(time => time.date == solution.date_posted.split('T')[0]).length == 0) {
                this.rejected_times.push({date: solution.date_posted.split('T')[0], count: 1})
              } else {
                this.rejected_times.filter(time => time.date == solution.date_posted.split('T')[0])[0].count += 1
              }
            })

            let all_dates = []
            toRaw(this.posted_times).forEach(time => {
              all_dates.push(time.date)
            })
            toRaw(this.accepted_times).forEach(time => {
              if (all_dates.filter(date => date == time.date).length == 0) {
                all_dates.push(time.date)
              }
            })
            toRaw(this.rejected_times).forEach(time => {
              if (all_dates.filter(date => date == time.date).length == 0) {
                all_dates.push(time.date)
              }
            })
            this.all_dates = all_dates.sort()
            all_dates.forEach(date => {
              this.option.xAxis.data.push(date)
              if (toRaw(this.posted_times).filter(time => time.date == date).length == 0) {
                this.option.series[0].data.push(0)
              } else {
                this.option.series[0].data.push(toRaw(this.posted_times).filter(time => time.date == date)[0].count)
              }
              if (toRaw(this.accepted_times).filter(time => time.date == date).length == 0) {
                this.option.series[1].data.push(0)
              } else {
                this.option.series[1].data.push(toRaw(this.accepted_times).filter(time => time.date == date)[0].count)
              }
              if (toRaw(this.rejected_times).filter(time => time.date == date).length == 0) {
                this.option.series[2].data.push(0)
              } else {
                this.option.series[2].data.push(toRaw(this.rejected_times).filter(time => time.date == date)[0].count)
              }
            })
          }))
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
      this.drawBarChart()
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

#posts-module {
  position: relative;
}

#posts-module .button {
  position: absolute;
  top: 0;
  right: 0;
}

.posted-problems-chart {
  margin-top: 2rem;
  width: 100%;
  height: 400px;
}

@font-face {
  font-family: "Noto Serif Display";
  src: local("Noto Serif Display"),
  url(../fonts/NotoSerifDisplay/static/NotoSerifDisplay/NotoSerifDisplay-Regular.ttf),
}

@media screen and (max-width: 768px) {
  .posted-problems-chart {
    width: 100%;
    height: 250px;
  }
}
</style>