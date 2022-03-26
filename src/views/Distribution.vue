<template>
  <div class="page-distribution">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/my-account">My Account</router-link></li>
        <li class="is-active"><router-link to="#" aria-current="page">Distribution</router-link></li>
      </ul>
    </nav>

    <div class="columns is-multiline distribution-part">
      <div class="column is-12">
        <h1 class="title">Distribution</h1>
      </div>

      <div class="back-button">
        <router-link to="/my-account" class="button is-primary">Back</router-link>
      </div>

      <div class="column is-4" id="problem-part">
        <div class="box">
          <p class="is-size-4 mb-3"><b>Problem</b></p>
          <div class="image box">
            <img :src="this.problem.get_image" alt="problem_image">
          </div>
          <div id="problem-content">
            <div class="columns is-multiline">
              <div class="column is-12">
                <p><b>#{{ this.problem.id }} {{ this.problem.name }}</b></p>
              </div>
              <div class="column is-6">
                <p class="module-name">Field</p>
                <p class="module-content">{{ this.problem.get_tagname }}</p>
              </div>
              <div class="column is-6">
                <p class="module-name">Posted Date</p>
                <p class="module-content">{{ this.problem.date_posted }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">Budget</p>
                <p class="module-content">&euro; {{ this.problem.budget }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">Poster</p>
                <p class="module-content">{{ this.problem.get_username }}</p>
              </div>     
              <div class="column is-12">
                <p class="module-name">Description</p>
                <p class="module-content">{{ this.problem.description }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">Prob&amp;Detail</p>
                <p class="module-content">{{ this.problem.details }}</p>
              </div>
              <div class="column is-12 detail-button">
                <button class="button is-info" @click="knowDetail(this.problem.get_absolute_url, 1)">Click to Know More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-4" id="presession-part">
        <div class="box">
          <p class="is-size-4 mb-3"><b>Presession</b></p>
          <div class="image box">
            <img :src="require('@/assets/logo.png')" alt="FlyMeCrods_Logo.png">
          </div>
          <div id="presession-content">
            <div class="columns is-multiline">
              <div class="column is-12">
                <p><b>#{{ this.presession.id }}</b></p>
              </div>
              <div class="column is-6">
                <p class="module-name">Connection</p>
                <p class="module-content">{{ this.presession.get_problem_name }}</p>
              </div>
              <div class="column is-6">
                <p class="module-name">Posted Date</p>
                <p class="module-content">{{ this.presession.date_posted }}</p>
              </div>
              <div class="column is-6">
                <p class="module-name">Picker</p>
                <p class="module-content">{{ this.presession.get_picker_name }}</p>
              </div>
              <div class="column is-6">
                <p class="module-name">Passed Date</p>
                <p class="module-content">{{ this.presession.date_result }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">Picker's Motivation</p>
                <p class="module-content">{{ this.presession.motivation }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">FlyMeCrodsReason</p>
                <p class="module-content">{{ this.presession.reason }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">FlyMeCrodsDecision</p>
                <p class="module-content">{{ this.presession.result }}</p>
              </div>
              <div class="column is-12 detail-button">
                <button class="button is-info" @click="knowDetail('/presessions/' + this.presession.id, 2)">Click to Know More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-4" id="solution-part">
        <div class="box">
          <p class="is-size-4 mb-3"><b>Solution</b></p>
          <div class="image box">
            <img :src="require('@/assets/universities_inline.png')" alt="solution_image">
          </div>
          <div id="solution-content">
            <div class="columns is-multiline">
              <div class="column is-12">
                <p><b>#{{ this.solution.id }}</b></p>
              </div>
              <div class="column is-12">
                <p class="module-name">Problem Connection</p>
                <p class="module-content">{{ this.solution.get_problem_name }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">Presession Connection</p>
                <p class="module-content">#{{ this.solution.presession }}</p>
              </div>
              <div class="column is-6">
                <p class="module-name">Text Content</p>
                <p class="module-content" v-if="this.solution.text_solution != ''">Yes</p>
              </div>
              <div class="column is-6">
                <p class="module-name">Notice Content</p>
                <p class="module-content" v-if="this.solution.notice">Yes</p>
              </div>
              <div class="column is-12">
                <p class="module-name">File Submittion</p>
                <p class="module-content" v-if="this.solution.file_solution != ''">{{ this.solution.file_solution }}</p>
                <p class="module-content" v-if="this.solution.file_solution == null">No File</p>
              </div>
              <div class="column is-12">
                <p class="module-name">Completion Date</p>
                <p class="module-content">{{ this.distribution.date_posted }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">Solution Result</p>
                <p class="module-content">{{ this.solution.solution_result }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">Solution Feedback</p>
                <p class="module-content">{{ this.solution.solution_feedback }}</p>
              </div>
              <div class="column is-12">
                <p class="module-name">Rating to Picker</p>
                <p class="module-content">{{ this.distribution.picker_rating }}</p>
              </div>
              <div class="column is-12 detail-button">
                <button class="button is-info" @click="knowDetail('solution' + this.problem.get_absolute_url, 3)">Click to Know More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12 has-text-centered mt-3" id="button-line">
        <button class="button is-primary" @click="distributeAction" v-if="this.distribution.result==0">Distribute</button>
        <button class="button is-dark" @click="distributeAction" v-if="this.distribution.result==1" disabled>Done</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';
export default {
  name: 'Distribution',
  data() {
    return {
      distribution: [],
      problem: [],
      presession: [],
      solution: [],
    }
  },
  methods: {
    getDistribution() {
      const distribution_id = this.$route.params.distribution_id;

      axios
        .get(`/api/v1/distributions/${distribution_id}/`)
        .then(response => {
          this.distribution = response.data
          this.distribution.date_posted = this.distribution.date_posted.split('T')[0]
          
          // Get Problem
          this.getProblem(this.distribution.get_problem_absolute_url)

          // Get Solution
          this.getSolution(this.distribution.solution)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Get Problem
    getProblem(problem_url) {
      axios
        .get(`/api/v1/problems${problem_url}`)
        .then(response => {
          this.problem = response.data
          this.problem.date_posted = this.problem.date_posted.split('T')[0]
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Get Solution
    getSolution(solution_id) {
      axios
        .get(`/api/v1/solutions/solution/${solution_id}/`)
        .then(response => {
          this.solution = response.data
          if (this.solution.solution_result == 2) {
            this.solution.solution_result = 'Accepted'
          } else if (this.solution.solution_result == 3) {
            this.solution.solution_result = 'Rejected'
          } 
          // FileName
          if (this.solution.file_solution != null) {
            this.solution.file_solution = this.solution.file_solution.split('/').pop()
          }
          // Get Presession
          this.getPresession(this.solution.presession)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Get Presession
    getPresession(presession_id){
      axios
        .get(`/api/v1/presessions/${presession_id}/`)
        .then(response => {
          this.presession = response.data
          this.presession.date_posted = this.presession.date_posted.split('T')[0]
          this.presession.date_result = this.presession.date_result.split('T')[0]
          if (this.presession.result == 1) {
            this.presession.result = 'Accepted'
          } else {
            this.presession.result = 'Rejected'
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    knowDetail(url, i) {
      if (i != 3)  {
        this.$router.push(url)
      } else {
        this.$router.push(`/${url}?id=${this.solution.id}`)
      }
    },

    // Distribute
    distributeAction() {
      const distribution_id = this.$route.params.distribution_id
      axios
        .put(`/api/v1/distributions/${distribution_id}/update/`)
        .then(response => {
          if (response.data.status == 201) {
            toast({
              message: "Distribute Successfully",
              type: 'is-success',
              duration: 3000,
              position: 'bottom-right',
            })
            location.reload()
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getDistribution()
    document.title = 'Distribution | FlyMeCrods'
  }
}
</script>

<style scoped>
.distribution-part {
  position: relative;
}

.back-button {
  position: absolute;
  top: 0;
  right: 1rem;
}

.box:not(.image):hover {
  color: white;
  background-color: #363636;
  transition: all 0.6s;
}

.image:hover {
  transform: scale(1.01);
  transition: all 0.6s;
}

#presession-part :not(.image).box, #solution-part :not(.image).box, #presession-part :not(.image).box {
  width: 100%;
  height: 100%;
}

#presession-part .image{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#presession-part .image img {
  width: 55%;
}

#problem-content .column, #presession-content .column, #solution-content .column {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.module-name {
  font-weight: bold;
  margin-right: 1rem;
}

#problem-content .detail-button, #presession-content .detail-button, #solution-content .detail-button {
  margin-top: 1rem;
  justify-content: center;
}

#problem-content .button:hover, #presession-content .button:hover, #solution-content .button:hover {
  background-color: white;
  color: #363636;
  transition: all 0.6s;
}

#button-line .button:hover {
  background-color: #353636;
  transition: all 0.6s;
}
</style>