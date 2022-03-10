<template>
  <div class="post-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li class="is-active"><router-link to="/" aria-current="page">Post</router-link></li>
      </ul>
    </nav>
    
    <p class="title">Post</p>
    <div class="hero is-success">
      <div class="hero-body">
        <div class="columns is-multiline">
          <div class="column is-12" id="guideline-slogan">
            <div class="image">
              <img :src="require('@/assets/logo_without_name.png')">
            </div>
            <div class="content has-text-centered">
              <p class="title">Guideline</p>
              <p class="subtitle">Tips to Read before Filling Out the Form</p>
            </div>
          </div>
          
          <div class="column is-4">
            <p>Firstly, you should choose the suitable field tag to match your problem, so that FlyMeCrods will record and display it in the related part.</p>
          </div>
          <div class="column is-4">
            <p>Secondly, you should fill out the form with the correct information, so that FlyMeCrods will record and display it in the related part.</p>
          </div>
          <div class="column is-4">
            <p>Thirdly, you should fill out the form with the correct information, so that FlyMeCrods will record and display it in the related part.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="hero is-light">
      <div class="hero-body">
        <div class="columns is-multiline">
          <div class="column is-12 has-text-centered">
            <p class="title" id="form-title">Form</p>
          </div>
          <p id="notice-for-form">* All fields are required.</p>
          <div class="column is-12">
            <form @submit.prevent="submitForm">
              
              <div class="field" id="short-part">
                <div id="tag">
                  <label class="label">Tag</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="this.problem_tag">
                        <option value="">Informatics</option>
                        <option value="Health">Health</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                        <option value="Law">Law</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div id="budget">
                  <label class="label">Budget</label>
                  <div class="control">
                    <input class="input" type="number" v-model="this.problem_budget" placeholder="&euro;">
                  </div>
                </div>

                <div id="deadline">
                  <label class="label">Deadline</label>
                  <div class="control">
                    <input class="input" type="date" v-model="this.problem_deadline">
                  </div>
                </div>

                <div id="image">
                  <label class="label">Image</label>
                  <div class="file is-right is-dark">
                    <label class="file-label">
                      <input class="file-input" type="file" accept="image/*">
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                          Choose an image...
                        </span>
                      </span>
                      <span class="file-name">
                        No image uploaded
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="field">
                <label class="label">Problem Name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g., Software Development" maxlength=25 v-model="this.problem_name">
                </div>
                <span>{{this.problem_name.length}}/25</span>
              </div>

              <div class="field">
                <label class="label">Problem Description</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Simplify your problem in one sentence" maxlength=60 v-model="this.problem_description" />
                </div>
                <span>{{this.problem_description.length}}/60</span>
              </div>

              <div class="field">
                <label class="label">Problem Details</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Describe your problem as detailed as you can" v-model="this.problem_details"></textarea>
                </div>
              </div>
              
              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
              </div>

              <div class="post-button">
                <button class="button is-dark">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Post',
    data() {
        return {
            problem_tag: '',
            problem_name: '',
            problem_description: '',
            problem_details: '',
            problem_budget: '',
            problem_deadline: '',
            problem_image: '',
            errors: [],
        }
    },
    methods: {
      getFileName() {
        const fileInput = document.querySelector('input[type=file]')
        fileInput.onchange = () => {
          this.problem_image = fileInput.files[0].name
          if (fileInput.files.length > 0) {
            const fileName = document.querySelector('.file-name')
            fileName.textContent = fileInput.files[0].name
          }
        }
      },

      submitForm() {
        const user_id = localStorage.getItem('userid')

        // Validate the Required Form Data
        this.errors = []

        if (this.problem_budget === '') {
            this.errors.push('Budget is missing!')
        }

        if (this.problem_deadline === '') {
            this.errors.push('Deadline is missing!')
        }

        if (this.problem_name === '') {
            this.errors.push('Problem Name is missing!')
        }

        if (this.problem_description === '') {
            this.errors.push('Problem Description is missing!')
        }

        if (this.problem_details === '') {
            this.errors.push('Problem Details is missing!')
        }

        if (this.problem_image === '') {
            this.errors.push('Problem Image is missing!')
        }
        
        if (!this.errors.length) {
          // Align the matching name of the tag
          var tag_name = this.problem_tag
          if (tag_name == '') {
            tag_name = 'Informatics'
          }
          
          let file = document.querySelector('input[type=file]').files[0]
          let formData = new FormData()

          formData.append('problem_tag', tag_name)
          formData.append('user_id', user_id,)
          formData.append('problem_name', this.problem_name,)
          formData.append('problem_description', this.problem_description,)
          formData.append('problem_details', this.problem_details,)
          formData.append('problem_budget', this.problem_budget,)
          formData.append('problem_deadline', this.problem_deadline,)
          formData.append('problem_image', file)

          let options = {
              url: '/api/v1/problems/post/',
              data: formData,
              method: 'post',
              processData: false,
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }

          axios(options)
          .then(response => {
            console.log(response)
            this.$router.push('/post/success')
          })
          .catch(error => {
            if(error.response) {
              for (const property in error.response.data) {
                this.errors.push(error.response.data[property])
              }
            }
          })
          console.log(formData)
        }
      }
    },
    mounted() {
      this.getFileName()
      document.title = "Post | FlyMeCrods"
    },
    activated() {
      this.getFileName()
    }
}
</script>

<style scoped>
.post-page #guideline-slogan {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-page #guideline-slogan .image {
  width: 7rem;
  position: absolute;
  z-index: 0;
}

.post-page #guideline-slogan .content {
  z-index: 1;
  margin: 1rem;
}

form select, form input, form textarea {
  font-family: "Noto Serif Display", serif;
}

form #short-part {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

form #short-part #tag, form #short-part #budget, form #short-part #deadline {
  margin-right: 2rem;
}

#short-part #tag {
  width: 15%;
}

#short-part #budget {
  width: 15%;
}

#short-part #deadline {
  width: 15%;
}

#short-part #image {
  width: 25%;
}

form {
  display: flex;
  flex-direction: column;
}

#form-title {
  margin-bottom: 3rem;
}

form .post-button {
  display: flex;
  margin-top: 1rem;
  justify-content: center;
}

form .post-button .button {
  font-size: 1rem;
  padding: 0.2rem 1.5rem;
}

.file-label {
  width: 100%;
}

.file-name {
  width: 40%;
}

.file-cta {
  width: 60%;
}

#notice-for-form {
  color: red;
}

@media screen and (max-width: 800px) {
  form #short-part {
    display: flex;
    flex-direction: column;
  }

  form #short-part #tag, form #short-part #budget, form #short-part #deadline, form #image {
    margin-bottom: 1rem;
    width: 100%;
  }

  #form-title {
    margin-bottom: 1rem;
  }
}
</style>