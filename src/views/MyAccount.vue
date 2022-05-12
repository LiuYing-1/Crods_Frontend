<template>
  <div class="myaccount">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/" aria-current="page">My Account</router-link></li>
      </ul>
    </nav>

    <!-- Below is the Email and Notification Part -->
    <div class="email-section">
      <router-link to="/email" id="icon-part">
        <i class="fas fa-envelope" v-if="this.user.email.length != 0"></i>
        <i class="fas fa-exclamation" v-if="this.unread_num != 0"></i>
      </router-link>
      <p class="tips" v-if="this.user.email.length != 0">You have {{this.unread_num}} unread message(s).</p>
      <a><i class="fas fa-envelope" v-if="this.user.email.length == 0"></i></a>
      <p class="tips" v-if="this.user.email.length == 0">You don't register your email.</p>
    </div>

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
                <a href="#sum">Summary</a>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-12" id="global">
          <div class="hero is-dark">
            <div class="hero-body">
              <div class="title">Global</div>
              <div><a :href="`${this.BACKEND_URL}admin`" target="_blank">Click here to Enter <b>FlyMeCrods</b> Backend</a></div>
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
              <template v-if="this.distributions.length == 0">
                <div class="box">Sorry, there is no distributions here.</div>
              </template>
              <template v-else>
                <div v-for="(item, index) in this.distributions" v-bind:key="item.id">
                  <div class="box">
                    <div class="tag">{{index+1}}</div>
                    <div class="link">
                      <router-link :to="'/distributions/' + item.id"><i class="fas fa-eye mr-2"></i>Distribution #{{item.id}}</router-link>
                    </div>
                    <p class="module-name"><b>Problem</b></p>
                    <div class="problem-name">
                      <p>{{item.get_problem_name}}</p>
                    </div>
                    <p class="module-name"><b>Poster</b></p>
                    <div class="problem-poster">
                      <p>{{item.get_poster_name}}</p>
                    </div>
                    <p class="module-name"><b>Date</b></p>
                    <div class="date-posted">
                      <p>{{ item.date_posted }}</p>
                    </div>
                    <p class="module-name"><b>Budget</b></p>
                    <div class="problem-budget">
                      <p>&euro; {{ item.get_problem_budget }}</p>
                    </div>
                    <p class="module-name"><b>Status</b></p>
                    <div class="distribution-button">
                      <button class="button is-primary" v-if="item.result==0" @click="distributeAction(item.id)">Distribute</button>
                      <button class="button is-dark" disabled v-if="item.result==1">Done</button>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="column is-12" id="sum">
          <div class="hero is-primary">
            <div class="hero-body">
              <div class="title">Summary</div>
              <div class="box charts-module">
                <div class="problems-module" v-if="this.all_problems.length == 0">
                  <p><b>FlyMeCrods</b> hasn't received any problems posted by users right now...</p>
                </div>
                <div class="problems-module" v-if="this.all_problems.length != 0">
                  <div class="platform-problems-chart">
                    <v-chart class="vuechart" :option="option7" />
                  </div>
                  <div class="ratio-part">
                    <p><b>Total Problems:</b> {{this.all_problems.length}}</p>
                    <p><b>Total Presessions:</b> {{this.all_presessions.length}}</p>
                    <p><b>Total Distributions:</b> {{this.all_distributions.length}}</p>
                  </div>
                  <hr>
                  <div class="charts">
                    <div class="platform-problems-fields-ratio-chart">
                      <v-chart class="vuechart" :option="option8" />
                    </div>
                    <div class="platform-solutions-successed-ratio-chart">
                      <v-chart class="vuechart" :option="option9" />
                    </div>
                  </div>
                  <div class="ratio-part">
                    <p><b>Field of Posted Most:</b> {{this.admin_posted_most_problems_field}}</p>
                    <p><b>Successed Session Ratio:</b> {{this.platform_accepted_solutions_ratio}}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Div to SideBar => Admin -->
        <div class="sidebar side-part">
          <div class="sidebar-item">
            <div class="sidebar-item-header">
              <p class="sidebar-item-header-text">
                <b>Page Instructor</b>
              </p>
            </div>
            <hr>
            <div class="sidebar-item-content">
              <div class="sidebar-item-content-item">
                <p class="sidebar-item-content-item-text">
                  <b><i class="fas fa-dot-circle"></i></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><i class="fas fa-dot-circle"></i></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><i class="fas fa-dot-circle"></i></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><i class="fas fa-dot-circle"></i></b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar main-part">
          <div class="sidebar-item">
            <div class="sidebar-item-header">
              <p class="sidebar-item-header-text">
                <b>Administration</b>
              </p>
            </div>
            <hr>
            <div class="sidebar-item-content">
              <div class="sidebar-item-content-item">
                <p class="sidebar-item-content-item-text">
                  <b><a href="#global">Global</a></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><a href="#presession">Presession</a></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><a href="#distribution">Distribution</a></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><a href="#sum">Summary</a></b>
                </p>
              </div>
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
                      <p><b>PreAccepted</b></p>
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
                      
                      <router-link :to="{path: '/solution' + item.get_problem_absolute_url, query: {id: item.id} }">
                        <button class="button is-dark" v-if="item.solution_result == 'Submitted'">
                          <i class="fas fa-reply-all mr-3"></i>
                          <span>Submitted</span>
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
              <!-- Draw Charts Here -->
              <div class="box charts-module">
                <div class="posted-module" v-if="this.posted.length != 0">
                  <div class="charts">
                    <div class="posted-problems-chart">
                      <v-chart class="vuechart" :option="option" />
                    </div>
                    <div class="posted-problems-fields-chart">
                      <v-chart class="vuechart" :option="option2" />
                    </div>
                    <div class="posted-problems-decisions-chart">
                      <v-chart class="vuechart" :option="option3" />
                    </div>
                  </div>
                  <div class="ratio-part">
                    <p><b>Last Operation Date:</b> {{this.all_dates[(this.all_dates.length-1)]}}</p>
                    <p><b>Field of Posted Most:</b> {{this.posted_most_problems_field}}</p>
                    <p><b>Solution Accepted Ratio:</b> {{this.accepted_solutions_ratio}}%</p>
                  </div>
                </div>
                <div v-if="this.posted.length == 0">
                  <p>You haven't posted any problems yet.</p>
                </div>
                <hr>
                <div class="picked-module" v-if="this.picked_problems.length != 0">
                  <div class="charts">
                    <div class="picked-problems-chart">
                      <v-chart class="vuechart" :option="option4" />
                    </div>
                    <div class="picked-problems-fields-chart">
                      <v-chart class="vuechart" :option="option5" />
                    </div>
                    <div class="picked-problems-desicions-chart">
                      <v-chart class="vuechart" :option="option6" />
                    </div>
                  </div>
                  <div class="ratio-part">
                    <p><b>Last Operation Date:</b> {{this.all_dates2[(this.all_dates2.length-1)]}}</p>
                    <p><b>Field of Picked Most:</b> {{this.picked_most_problems_field}}</p>
                    <p><b>Solution Accepted Ratio:</b> {{this.accepted_solutions_ratio2}}%</p>
                  </div>
                </div>
                <div v-if="this.picked_problems.length == 0">
                  <p>You haven't picked any problems yet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Div to SideBar -->
        <div class="sidebar side-part">
          <div class="sidebar-item">
            <div class="sidebar-item-header">
              <p class="sidebar-item-header-text">
                <b>Page Instructor</b>
              </p>
            </div>
            <hr>
            <div class="sidebar-item-content">
              <div class="sidebar-item-content-item">
                <p class="sidebar-item-content-item-text">
                  <b><i class="fas fa-dot-circle"></i></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><i class="fas fa-dot-circle"></i></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><i class="fas fa-dot-circle"></i></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><i class="fas fa-dot-circle"></i></b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar main-part">
          <div class="sidebar-item">
            <div class="sidebar-item-header">
              <p class="sidebar-item-header-text">
                <b>My Account</b>
              </p>
            </div>
            <hr>
            <div class="sidebar-item-content">
              <div class="sidebar-item-content-item">
                <p class="sidebar-item-content-item-text">
                  <b><a href="#profile">Profile</a></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><a href="#posted">Posted</a></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><a href="#picked">Picked</a></b>
                </p>
              </div>
              <div class="sidebar-item-content-item mt-3">
                <p class="sidebar-item-content-item-text">
                  <b><a href="#sum">Summary</a></b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {BACKEND_URL} from '../assets/js/commons.js'
import axios from 'axios'
import { toast } from 'bulma-toast'
import {toRaw} from '@vue/reactivity'
export default {
    name: 'MyAccount',
    data() {
      return {
        BACKEND_URL,
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
        distributions: [],
        // Unread Email
        unread_num: 0,
        // Chart Part
        all_dates: [],
        posted_most_problems_field: [],
        posted_times: [],
        accepted_solutions: [],
        accepted_times: [],
        rejected_solutions: [],
        rejected_times: [],
        accepted_solutions_ratio: 0,
        option: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'Active Time Record - Posted',
          },
          tooltip: {},
          legend: {
            top: '30px',
            left: 'center',
            data: ['Posted', 'Accepted', 'Rejected']
          },
          xAxis: {
            data: [],
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 2,
              fontSize: 10,
            }
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
                color: '#363636',
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
            top: '30px',
            left: 'center',
            data: []
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
        posted_distributions: [],
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
            text: 'Active Time Record - Picked',
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
            data: [],
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 2,
              fontSize: 10,
            }
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
            left: 'center',
            top: '30px',
            data: []
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
        },
        // Admin Charts
        all_problems: [],
        all_problems_posted_dates: [],
        all_presessions: [],
        all_presessions_dates: [],
        all_distributions: [],
        all_distributions_dates: [],
        plateform_all_posted_dates: [],
        admin_fields_num: [],
        admin_posted_most_problems_field: [],
        admin_all_solutions: [],
        platform_accepted_solutions_ratio: 0,
        option7: {
          textStyle: {
            fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'Problems Posted Date',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            orient: 'vertical',
            top: '30px',
            left: 'right',
            data: ['Problem', 'Presession', 'Distribution']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
          },
          yAxis: {
            data: []
          },
          series: [
          {
            name: 'Problem',
            type: 'bar',
            data: [],
            itemStyle: {
              color: '#725047',
              borderRadius: [0, 5, 5, 0]
            }
          },
          {
            name: 'Presession',
            type: 'bar',
            data: [],
            itemStyle: {
              color: '#da9e6a',
              borderRadius: [0, 5, 5, 0]
            }
          },
          {
            name: 'Distribution',
            type: 'bar',
            data: [],
            itemStyle: {
              color: '#f3e6c3',
              borderRadius: [0, 5, 5, 0]
            }
          },
        ]},
        option8: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'All Problems Fields Ratio',
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
                color: '#363636',
              },
              itemStyle: {
                color: '#a18da8',
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
        option9: {
          textStyle: {
              fontFamily: 'Noto Serif Display'
          },
          title: {
            left: 'center',
            text: 'Successed Session Ratio',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            left: 'center',
            top: '30px',
            data: []
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
      
      // Get Emails if user email address exists
      getEmails(address){
        if (address != '') {
          axios
            .get(`api/v1/emails/${address}/`)
            .then(response => {
              let emails = response.data
              for (let i = 0; i < emails.length; i++) {
                if (emails[i].unread == 0) {
                  this.unread_num += 1
                }
              }
            })
            .catch(error => {
              console.log(error)
            })
        } 
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
              this.getEmails(this.user.email)
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
              if(response.data.status == 400)
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
                this.picked[i].solution_result = 'Submitted'
              } else if (this.picked[i].solution_result == 2) {
                this.picked[i].solution_result = 'Accepted'
              } else if (this.picked[i].solution_result == 3) {
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

      // Process Presession
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

              // Reload the page
              location.reload()
            }
          })
          .catch(error => {
            console.log(error)
          })
      },

      // Admin - Distribution Part
      getDistributions() {
        axios
          .get('api/v1/all-distributions/')
          .then(response => {
            this.distributions = response.data
            
            for (let i = 0; i < this.distributions.length; i++) {
              this.distributions[i].date_posted = this.distributions[i].date_posted.split('T')[0]
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      distributeAction(distribution_id) {
        axios
          .put('api/v1/distributions/' + distribution_id + '/update/')
          .then(response=> {
            if (response.data.status == 201) {
              toast({
                message: 'Distribute Successfully',
                type: 'is-success',
                duration: 3000,
                position: 'bottom-right',
                dismissible: true
              })
              location.reload()
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      // Draw Charts
      drawPostedCharts() {
        const user_id = localStorage.getItem('userid')
        axios
          .all([
            axios.get('api/v1/users/' + user_id + '/accepted-solutions/'),
            axios.get('api/v1/users/' + user_id + '/rejected-solutions/')
          ])
          .then(axios.spread((accepted, rejected) => {
            // Part for Bar Chart
            this.posted_problems = this.posted
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
            this.option3.legend.data = ['Accepted', 'Rejected']
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
      drawPickedCharts() {
        const user_id = localStorage.getItem('userid')
        axios
          .all([
            axios.get(`api/v1/solutions/${user_id}/`),
            axios.get(`api/v1/users/${user_id}/passed-presessions/`),
            axios.get(`api/v1/users/${user_id}/picked-problems/`),
            axios.get(`api/v1/users/${user_id}/distributions/`)
          ])
          .then(axios.spread((solutions, presessions, picked_problems, posted_distributions) => {
            this.user_solutions = solutions.data
            this.passed_presessions = presessions.data
            this.picked_problems = picked_problems.data
            this.posted_distributions = posted_distributions.data

            this.passed_presessions.forEach(presession => {
              if (this.presession_times.filter(time => time.date == presession.date_result.split('T')[0]).length == 0) {
                this.presession_times.push({date: presession.date_result.split('T')[0], count: 1})
              } else {
                this.presession_times.filter(time => time.date == presession.date_result.split('T')[0])[0].count += 1
              }
            })

            this.posted_distributions.forEach(distribution => {
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
            this.option6.legend.data = ['Accepted', 'Rejected']
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

      // Draw Charts for Admin
      drawAdminCharts(){
        if (localStorage.getItem('userid') == 1) {
          axios.all([
            axios.get(`api/v1/all-problems/`),
            axios.get(`api/v1/all-presessions/`),
            axios.get(`api/v1/all-distributions/`),
            axios.get(`api/v1/all-solutions/`),
          ])
          .then(axios.spread((all_problems, all_presessions, all_distributions, all_solutions) => {
            this.all_problems = all_problems.data
  
            this.all_problems.forEach(problem => {
              if (this.all_problems_posted_dates.filter(time => time.date == problem.date_posted.split('T')[0]).length == 0) {
                this.all_problems_posted_dates.push({date: problem.date_posted.split('T')[0], count: 1})
              } else {
                this.all_problems_posted_dates.filter(time => time.date == problem.date_posted.split('T')[0])[0].count += 1
              }
            })
            
            this.all_presessions = all_presessions.data
            this.all_presessions.forEach(presession => {
              if (this.all_presessions_dates.filter(time => time.date == presession.date_posted.split('T')[0]).length == 0) {
                this.all_presessions_dates.push({date: presession.date_posted.split('T')[0], count: 1})
              } else {
                this.all_presessions_dates.filter(time => time.date == presession.date_posted.split('T')[0])[0].count += 1
              }
            })
  
            this.all_distributions = all_distributions.data
            this.all_distributions.forEach(distribution => {
              if (this.all_distributions_dates.filter(time => time.date == distribution.date_posted.split('T')[0]).length == 0) {
                this.all_distributions_dates.push({date: distribution.date_posted.split('T')[0], count: 1})
              } else {
                this.all_distributions_dates.filter(time => time.date == distribution.date_posted.split('T')[0])[0].count += 1
              }
            })
            
            let all_dates = []
            toRaw(this.all_problems_posted_dates).forEach(time => {
              all_dates.push(time.date)
            })
            toRaw(this.all_presessions_dates).forEach(time => {
              if (all_dates.filter(date => date == time.date).length == 0) {
                all_dates.push(time.date)
              }
            })
            toRaw(this.all_distributions_dates).forEach(time => {
              if (all_dates.filter(date => date == time.date).length == 0) {
                all_dates.push(time.date)
              }
            })
  
            this.plateform_all_posted_dates = all_dates.sort()
            all_dates.forEach(date => {
              this.option7.yAxis.data.push(date)
              if (toRaw(this.all_problems_posted_dates).filter(time => time.date == date).length == 0) {
                this.option7.series[0].data.push(0)
              } else {
                this.option7.series[0].data.push(toRaw(this.all_problems_posted_dates).filter(time => time.date == date)[0].count)
              }
              if (toRaw(this.all_presessions_dates).filter(time => time.date == date).length == 0) {
                this.option7.series[1].data.push(0)
              } else {
                this.option7.series[1].data.push(toRaw(this.all_presessions_dates).filter(time => time.date == date)[0].count)
              }
              if (toRaw(this.all_distributions_dates).filter(time => time.date == date).length == 0) {
                this.option7.series[2].data.push(0)
              } else {
                this.option7.series[2].data.push(toRaw(this.all_distributions_dates).filter(time => time.date == date)[0].count)
              }
            })

            let fields = []
            this.all_problems.forEach(problem => {
              if (fields.filter(field => field == problem.get_tagname).length == 0) {
                fields.push(problem.get_tagname)
                this.option8.legend.data.push(problem.get_tagname)
              }
            })
            fields.forEach(field => {
                let count = this.all_problems.filter(problem => problem.get_tagname == field).length
                this.admin_fields_num.push({name: field, value: count})
              }
            )
            this.admin_fields_num.sort(function(a, b) { return a.value - b.value; })
            this.option8.series[0].data = this.admin_fields_num
            if (this.admin_fields_num.length > 0) {
              this.option8.visualMap.max = this.admin_fields_num[this.admin_fields_num.length - 1].value+0.5
              this.admin_posted_most_problems_field = this.admin_fields_num[(this.admin_fields_num).length-1].name
            }

            this.admin_all_solutions = all_solutions.data
            let submitted_accepted = []
            let submitted_rejected = []
            this.admin_all_solutions.forEach(solution => {
              if (solution.solution_result == 2) {
                submitted_accepted.push(solution)
              } else if (solution.solution_result == 3) {
                submitted_rejected.push(solution)
              }
            })
            this.option9.legend.data = ['Accepted', 'Rejected']
            this.option9.series[0].data = [
              {value: submitted_accepted.length, name: 'Accepted', itemStyle: {color: '#b0988e'}},
              {value: submitted_rejected.length, name: 'Rejected', itemStyle: {color: '#eee7df'}},
            ]
            if (submitted_accepted != 0) {
              this.platform_accepted_solutions_ratio = (submitted_accepted.length / (submitted_accepted.length + submitted_rejected.length)).toFixed(2) * 100
            }
          }))
          .catch(error => {
            console.log(error)
          })
        }
      },
    },
    mounted() {
        document.title = "My Account | FlyMeCrods"
        this.getUserData()
        this.getUserPostedProblems()
        this.getPrecessions()
        this.getUserSolutions()
        this.getDistributions()

        this.drawPostedCharts()
        this.drawPickedCharts()
        this.drawAdminCharts()
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
  font-family: "Noto Serif Display", '宋体', serif;
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

#distribution .box {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

#distribution .box .tag {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #363636;
  color: #fff;
}

#distribution .box p {
  margin-right: 0.5rem;
}

#distribution .box .module-name {
  width: 3%;
  color: darkslateblue;
}

#distribution .link, #distribution .problem-name, #distribution .problem-poster, #distribution .date-posted {
  display: flex;
}

#distribution .link {
  width: 15%;
  justify-content: center;
}

#distribution .problem-name {
  width: 18%;
  justify-content: center;
}

#distribution .problem-poster {
  width: 20%;
  justify-content: center;
}

#distribution .date-posted {
  width: 10%;
  justify-content: center;
}

#distribution .problem-budget {
  display: flex;
  width: 10%;
  justify-content: center;
}

#distribution .distribution-button {
  display: flex;
  width: 22%;
  justify-content: center;
}

#distribution .link a:hover {
  color: #1f7fce;
  transition: all 0.4s;
}

.main-part {
  position: fixed;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  top: 3.5rem;
  left: -10rem;
  width: 10rem;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  z-index: 0;
  transition: all 0.6s;
}

.side-part {
  position: fixed;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  top: 3.5rem;
  left: 0rem;
  width: 3rem;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  z-index: 1;
  transition: all 0.6s;
}

.side-part .sidebar-item-header p {
  writing-mode: tb-rl;
}

.side-part .sidebar-item-content, .main-part .sidebar-item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sidebar a {
  color: #363636;
}

.sidebar-item-content-item {
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 0.2rem;
}

.sidebar .sidebar-item-content-item:hover {
  background-color: rgba(83, 241, 162, 0.76);
  transition: all 0.6s;
}

.sidebar .sidebar-item-content-item:hover a {
  color: darkgray;
  transition: all 0.6s;
}

.side-part:hover {
  opacity: 0;
  z-index: 0;
}

.side-part:hover + .main-part {
  transform: translateX(10rem);
  z-index: 1;
  transition: all 0.6s;
}

.main-part:hover {
  transform: translateX(10rem);
  z-index: 1;
}

.is-selected {
  background-color: rgba(83, 241, 162, 0.76);
  color: darkgray;
}

.my-account {
  position: relative;
}

.email-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  right: 3rem;
  top: 5rem;
}

.email-section .tips {
  display: none;
}

.email-section a:hover + .tips {
  display: initial;
  transition: all 0.6s;
}

.fa-exclamation {
  margin-left: 0.2rem;
  color: rgb(233, 87, 87);
}

@font-face {
  font-family: "Noto Serif Display";
  src: local("Noto Serif Display"),
  url(../fonts/NotoSerifDisplay/static/NotoSerifDisplay/NotoSerifDisplay-Regular.ttf),
}

.charts-module {
  display: flex;
  flex-direction: column;
}

.posted-module {
  display: flex;
  flex-direction: column;
}

.charts {
  display: flex;
  justify-content: space-between;
}

.ratio-part {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.posted-problems-chart {
  width: 30%;
  height: 400px;
}

.posted-problems-fields-chart {
  width: 30%;
  height: 400px;
}

.posted-problems-decisions-chart {
  width: 30%;
  height: 400px;
}

.picked-problems-chart {
  width: 30%;
  height: 400px;
}

.picked-problems-fields-chart {
  width: 30%;
  height: 400px;
}

.picked-problems-desicions-chart {
  width: 30%;
  height: 400px;
}

.platform-problems-chart {
  width: 100%;
  height: 450px;
}

.platform-problems-fields-ratio-chart {
  width: 50%;
  height: 450px;
}

.platform-solutions-successed-ratio-chart {
  width: 50%;
  height: 450px;
}

@media screen and (max-width: 768px) {
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

  #presession .problem-id, #presession .problem-name, #presession .problem-picker, #presession .date-posted, #presession .presession-result {
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

  #distribution .box {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  #distribution .problem-name, #distribution .problem-poster, #distribution .date-posted, #distribution .distribution-result {
    display: flex;
    width: 100%;
    justify-content: flex-start;
  }

  #distribution .link {
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-weight: bold;
    background-color: #363636;
    color: white;
    justify-content: center;
  }

  #distribution .distribution-button {
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

  .side-part {
    width: 1.4rem;
  }

  .email-section {
    right: 1.4rem;
  }

  .charts {
    flex-direction: column;
  }

  .ratio-part {
    flex-direction: column;
    justify-content: flex-start;
  }

  .posted-problems-chart {
    width: 100%;
  }

  .posted-problems-fields-chart {
    width: 100%;
  }

  .posted-problems-decisions-chart {
    width: 100%;
  }

  .picked-problems-chart {
    width: 100%;
  }

  .picked-problems-fields-chart {
    width: 100%;
  }

  .picked-problems-desicions-chart {
    width: 100%;
  }

  .platform-problems-chart {
    width: 100%;
    height: 450px;
  }

  .platform-problems-fields-ratio-chart {
    width: 100%;
    height: 450px;
  }

  .platform-solutions-successed-ratio-chart {
    width: 100%;
    height: 450px;
  }
}
</style>
