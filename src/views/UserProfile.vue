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
        <div class="posts module" @click="this.check_index = 1">
          <p class="subtitle">Post(s)</p>
          <p class="content">{{ this.user.posts_num }}</p>
        </div>
        <div class="picks module" @click="this.check_index = 2">
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
      <div class="column box is-12 mt-3" id="posts-module" v-if="this.check_index == 1">
        <p class="subtitle"><b>Posts Module</b></p>
        <p v-if="this.posted_problems.length == 0">{{ this.user.username }} hasn't posted any problems till now.</p>
        <div v-if="this.posted_problems.length != 0">
          <button class="button is-light" @click="this.viewAllPostedProblems =! this.viewAllPostedProblems">View All Posted Problems</button>
          <div class="all-posted-problems" v-if="this.viewAllPostedProblems">
            <span v-for="(problem, index) in this.posted_problems" v-bind:key="problem.id">
              <span v-if="index != 0">|</span>
              <router-link :to="problem.get_absolute_url">{{problem.name}}</router-link>
            </span>
          </div>
          <div class="posted-problems-chart">
            <v-chart class="vuechart" :option="option" />
          </div>
          <div class="charts">
            <div class="posted-problems-fields-chart">
              <v-chart class="vuechart" :option="option2" />
            </div>
            <div class="posted-problems-decisions-chart">
              <v-chart class="vuechart" :option="option3" />
            </div>
          </div>
          <div class="ratio-part">
            <p><b>Last Posted / Decisided Date:</b> {{this.all_dates[(this.all_dates.length-1)]}}</p>
            <p><b>Field of Posted Most:</b> {{this.posted_most_problems_field}}</p>
            <p><b>Solution Already Accepted Ratio:</b> {{this.accepted_solutions_ratio}}%</p>
          </div>
        </div>
      </div>
      <div class="column box is-12 mt-3" id="posts-module" v-if="this.check_index == 2">
        <p class="subtitle"><b>Picks Module</b></p>
        <p v-if="this.picked_problems.length == 0">{{ this.user.username }} hasn't picked any problems till now.</p>
        <div v-if="this.picked_problems.length != 0">
          <div class="picked-problems-chart">
            <v-chart class="vuechart" :option="option4" />
          </div>
          <div class="charts">
            <div class="picked-problems-fields-chart">
              <v-chart class="vuechart" :option="option5" />
            </div>
            <div class="picked-problems-desicions-chart">
              <v-chart class="vuechart" :option="option6" />
            </div>
          </div>
          <div class="ratio-part">
            <p><b>Last Submitted / Picked Date:</b> {{this.all_dates2[(this.all_dates2.length-1)]}}</p>
            <p><b>Field of Picked Most:</b> {{this.picked_most_problems_field}}</p>
            <p><b>Solution Accepted Ratio:</b> {{this.accepted_solutions_ratio2}}%</p>
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
        check_index: 1,
        user: {},
        posted_problems: [],
        posted_most_problems_field: [],
        viewAllPostedProblems: false,
        posted_times: [],
        accepted_solutions: [],
        accepted_times: [],
        rejected_solutions: [],
        rejected_times: [],
        accepted_solutions_ratio: 0,
        // Chart Options - Bar Chart
        option: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'User Active Time Record - Posted',
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
                color: '#abd8cd',
                borderRadius: [5, 5, 0, 0]
              }
            },
            {
              name: 'Accepted',
              type: 'bar',
              data: [],
              itemStyle: {
                color: '#ddefe3',
                borderRadius: [5, 5, 0, 0]
              }
            },
            {
              name: 'Rejected',
              type: 'bar',
              data: [],
              itemStyle: {
                color: '#f6c6a9',
                borderRadius: [5, 5, 0, 0]
              }
            }
          ],
        },
        // Pie Chart
        fields_num: [],
        option2: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'Posted Problems Fields Ratio',
          },
          tooltip: {
            trigger: 'item',
          },
          visualMap: {
            show: false,
            min: 0,
            max: 100,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          legend: {
            top: '30px',
            left: 'center',
            data: []
          },
          series: [
            {
              name: 'Field',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [],
              roseType: 'radius',
              label: {
                color: '#363636'
              },
              itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'white',
              },
              labelLine: {
                lineStyle: {
                  color: '#363636'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            },
          ],
        },
        option3: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'Solution Desicions Ratio',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Accepted', 'Rejected']
          },
          series: [{
            name: 'Solution Desicions',
            type: 'pie',
            radius: '50%',
            data: [],
          }],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        // Picks Module
        picked_problems: [],
        user_solutions: [],
        passed_presessions: [],
        presession_times: [],
        submitted_times: [],
        distributions: [],
        fields_num2: [],
        picked_most_problems_field: [],
        accepted_solutions_ratio2: 0,
        all_dates2: [],
        option4: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'User Active Time Record - Picked',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: '30px',
            left: 'center',
            data: ['Picked', 'Submitted']
          },
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [
            {
              name: 'Picked',
              type: 'bar',
              data: [],
              itemStyle: {
                color: '#f7bec7',
                borderRadius: [5, 5, 0, 0]
              }
            },
            {
              name: 'Submitted',
              type: 'bar',
              data: [],
              itemStyle: {
                color: '#f39a9d',
                borderRadius: [5, 5, 0, 0]
              }
            }
          ],
        },
        option5: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'Picked Problems Fields Ratio',
          },
          tooltip: {
            trigger: 'item',
          },
          visualMap: {
            show: false,
            min: 0,
            max: 100,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          legend: {
            top: '30px',
            left: 'center',
            data: []
          },
          series: [
            {
              name: 'Field',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [],
              roseType: 'radius',
              label: {
                color: '#363636'
              },
              itemStyle: {
                color: '#365356',
                shadowBlur: 200,
                shadowColor: 'white',
              },
              labelLine: {
                lineStyle: {
                  color: '#363636'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            },
          ],
        },
        option6: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'Submitted Desicions Ratio',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Accepted', 'Rejected']
          },
          series: [{
            name: 'Submitted Desicions',
            type: 'pie',
            radius: '50%',
            data: [],
          }],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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

      drawPostsModuleChart(){
        axios
          .all([
            axios.get('api/v1/users/' + this.$route.params.user_id + '/posted-problems/'),
            axios.get('api/v1/users/' + this.$route.params.user_id + '/accepted-solutions/'),
            axios.get('api/v1/users/' + this.$route.params.user_id + '/rejected-solutions/')
          ])
          .then(axios.spread((posted, accepted, rejected) => {
            // Part for Bar Chart
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
            // Part for Pie Chart
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
            let fields = []
            this.posted_problems.forEach(problem => {
              if (fields.filter(field => field == problem.get_tagname).length == 0) {
                fields.push(problem.get_tagname)
                this.option2.legend.data.push(problem.get_tagname)
              }
            })
            fields.forEach(field => {
                let count = this.posted_problems.filter(problem => problem.get_tagname == field).length
                this.fields_num.push({name: field, value: count})
              }
            )
            this.fields_num.sort(function(a, b) { return a.value - b.value; })
            this.option2.series[0].data = this.fields_num
            if (this.fields_num.length > 0) {
              this.option2.visualMap.max = this.fields_num[this.fields_num.length - 1].value+0.5
              this.posted_most_problems_field = this.fields_num[(this.fields_num).length-1].name
            }
            // Part for Solution Desicions Ratio
            this.option3.series[0].data = [
              {value: this.accepted_solutions.length, name: 'Accepted', itemStyle: {color: '#363636'}},
              {value: this.rejected_solutions.length, name: 'Rejected', itemStyle: {color: 'lightgray'}},
            ]
            if (this.accepted_solutions != 0) {
              this.accepted_solutions_ratio = (this.accepted_solutions.length / (this.accepted_solutions.length + this.rejected_solutions.length)).toFixed(4) * 100
            }
          }))
      },

      // Part for Picked Module Chart
      drawPicksModuleChart() {
        const user_id = this.$route.params.user_id
        axios
          .all([
            axios.get(`api/v1/solutions/${user_id}/`),
            axios.get(`api/v1/users/${user_id}/passed-presessions/`),
            axios.get(`api/v1/users/${user_id}/picked-problems/`),
            axios.get(`api/v1/users/${user_id}/distributions/`)
          ])
          .then(axios.spread((solutions, presessions, picked_problems, distributions) => {
            this.user_solutions = solutions.data
            this.passed_presessions = presessions.data
            this.picked_problems = picked_problems.data
            this.distributions = distributions.data

            this.passed_presessions.forEach(presession => {
              if (this.presession_times.filter(time => time.date == presession.date_result.split('T')[0]).length == 0) {
                this.presession_times.push({date: presession.date_result.split('T')[0], count: 1})
              } else {
                this.presession_times.filter(time => time.date == presession.date_result.split('T')[0])[0].count += 1
              }
            })

            this.distributions.forEach(distribution => {
              if (this.submitted_times.filter(time => time.date == distribution.date_posted.split('T')[0]).length == 0) {
                this.submitted_times.push({date: distribution.date_posted.split('T')[0], count: 1})
              } else {
                this.submitted_times.filter(time => time.date == distribution.date_posted.split('T')[0])[0].count += 1
              }
            })

            let all_dates = []
            toRaw(this.presession_times).forEach(time => {
              all_dates.push(time.date)
            })
            toRaw(this.submitted_times).forEach(time => {
              if (all_dates.filter(date => date == time.date).length == 0) {
                all_dates.push(time.date)
              }
            })
            all_dates.sort()
            this.all_dates2 = all_dates
            all_dates.forEach(date => {
              this.option4.xAxis.data.push(date)
              if (toRaw(this.presession_times).filter(time => time.date == date).length == 0) {
                this.option4.series[0].data.push(0)
              } else {
                this.option4.series[0].data.push(toRaw(this.presession_times).filter(time => time.date == date)[0].count)
              }
              if (toRaw(this.submitted_times).filter(time => time.date == date).length == 0) {
                this.option4.series[1].data.push(0)
              } else {
                this.option4.series[1].data.push(toRaw(this.submitted_times).filter(time => time.date == date)[0].count)
              }
            })
            
            let fields = []
            this.picked_problems.forEach(problem => {
              if (fields.filter(field => field == problem.get_tagname).length == 0) {
                fields.push(problem.get_tagname)
                this.option5.legend.data.push(problem.get_tagname)
              }
            })
            fields.forEach(field => {
                let count = this.picked_problems.filter(problem => problem.get_tagname == field).length
                this.fields_num2.push({name: field, value: count})
              }
            )
            toRaw(this.fields_num2).sort(function(a, b) { return a.value - b.value; })
            this.option5.series[0].data = this.fields_num2
            if (toRaw(this.fields_num2).length > 0) {
              this.option5.visualMap.max = toRaw(this.fields_num2)[toRaw(this.fields_num2).length - 1].value+0.5
              this.picked_most_problems_field = toRaw(this.fields_num2)[toRaw(this.fields_num2).length-1].name
            }

            let submitted_accepted = []
            let submitted_rejected = []
            this.user_solutions.forEach(solution => {
              if (solution.solution_result == 2) {
                submitted_accepted.push(solution)
              } else if (solution.solution_result == 3) {
                submitted_rejected.push(solution)
              }
            })

            this.option6.series[0].data = [
              {value: submitted_accepted.length, name: 'Accepted', itemStyle: {color: '#b0988e'}},
              {value: submitted_rejected.length, name: 'Rejected', itemStyle: {color: '#eee7df'}},
            ]
            if (this.submitted_accepted != 0) {
              this.accepted_solutions_ratio2 = (submitted_accepted.length / (submitted_accepted.length + submitted_rejected.length)).toFixed(4) * 100
            }
          }))
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
            
            // Upper Case the first letter of username
            var converted_username = this.user.username.charAt(0).toUpperCase() + this.user.username.slice(1)
            document.title = 'Profile | ' + converted_username + ' | FlyMeCrods'
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted() {
      this.check_index = 1
      this.drawPostsModuleChart()
      this.drawPicksModuleChart()
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

.posts:hover > p, .picks:hover > p {
  cursor: pointer;
  color: #f0ffff;
  transition: all 0.6s;
}

#posts-module {
  position: relative;
}

#posts-module .button {
  position: absolute;
  top: 0;
  right: 0;
}

.all-posted-problems a {
  color: #363636;
}

.all-posted-problems a:hover {
  color: pink;
  transition: all 0.6s;
}

.posted-problems-chart {
  margin-top: 2rem;
  width: 100%;
  height: 400px;
}

.charts {
  display: flex;
}

.posted-problems-fields-chart {
  margin-top: 2rem;
  width: 50%;
  height: 400px;
}

.posted-problems-decisions-chart {
  margin-top: 2rem;
  width: 50%;
  height: 400px;
}

.picked-problems-chart {
  margin-top: 2rem;
  width: 100%;
  height: 400px;
}

.picked-problems-fields-chart {
  margin-top: 2rem;
  width: 50%;
  height: 400px;
}

.picked-problems-desicions-chart {
  margin-top: 2rem;
  width: 50%;
  height: 400px;
}

.ratio-part {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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

  .charts {
    display: flex;
    flex-direction: column;
  }

  .posted-problems-fields-chart {
    margin-top: 2rem;
    width: 100%;
    height: 400px;
  }

  .posted-problems-decisions-chart {
    margin-top: 2rem;
    width: 100%;
    height: 400px;
  }

  .picked-problems-fields-chart {
    margin-top: 2rem;
    width: 100%;
    height: 400px;
  }

  .picked-problems-desicions-chart {
    margin-top: 2rem;
    width: 100%;
    height: 400px;
  }

  .ratio-part {
    display: flex;
    flex-direction: column;
    align-items: space-around;
  }
}
</style>