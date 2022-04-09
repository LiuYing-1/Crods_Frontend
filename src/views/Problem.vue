<template>
  <div class="problem">
    <!-- Below is Problem Not Found -->
    <template v-if="!problem.name">
      <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/">FlyMeCrods</router-link></li>
          <li><router-link to="/marketplace">Marketplace</router-link></li>
          <li class="is-active"><router-link to="/" aria-current="page">Error</router-link></li>
        </ul>
      </nav>

      <section class="section">
        <div class="columns" id="problem-not-found">
          <div class="column">
            <div class="image">
              <img :src="require('@/assets/logo.png')" alt="logo">
            </div>
          </div>

          <div class="column">
            <div class="content container">
              <div class="image">
                <img :src="require('@/assets/universities_inline.png')" alt="universities">
              </div>
              <div class="mt-4">
                <h1 class="title">Oops! Problem Not Found</h1>
                <p class="subtitle mt-3">The problem you are looking for does not exist.</p>              
                <p class="subtitle">Please check the spelling and try again.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Below is the main body of Problem.vue -->
    <template v-else>
      <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/">FlyMeCrods</router-link></li>
          <li><router-link to="/marketplace">Marketplace</router-link></li>
          <li class="is-active"><router-link to="/problem" aria-current="page">Problem</router-link></li>
        </ul>
      </nav>

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
          </div>
        </div>
      </div>

      <div class="sidebar main-part">
        <div class="sidebar-item">
          <div class="sidebar-item-header">
            <p class="sidebar-item-header-text">
              <b>Problem Intro</b>
            </p>
          </div>
          <hr>
          <div class="sidebar-item-content">
            <div class="sidebar-item-content-item">
              <p class="sidebar-item-content-item-text">
                <b><a href="#">Details</a></b>
              </p>
            </div>
            <div class="sidebar-item-content-item mt-3">
              <p class="sidebar-item-content-item-text">
                <b><a href="#comments-part">Comments</a></b>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Problem.vue Main Body -->
      <div class="columns is-multiline">
        <div class="column is-6">
          <figure class="image mb-6">
            <img v-bind:src='problem.get_image'>
          </figure>

          <h1 class="title">{{ problem.name }}</h1>
          <p>{{ problem.description }}</p>
        </div>

        <div class="column is-4 is-offset-1">
          <h2 class="subtitle"><b>Details</b></h2>

          <table class="table">
            <tr>
              <th>Request-ID</th>
              <td>#{{ problem.id }}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{{ problem.status }}</td>
            </tr>
            <tr>
              <th>Field</th>
              <td>{{ problem.get_tagname }}</td>
            </tr>
            <tr>
              <th>Branch</th>
              <td>{{ problem.name }}</td>
            </tr>
            <tr>
              <th>Requirements</th>
              <td>{{ problem.details }}</td>
            </tr>
            <tr>
              <th>Deadline</th>
              <td>{{ problem.deadline }}</td>
            </tr>
            <tr>
              <th>Budget</th>
              <td>&euro; {{ problem.budget }}</td>
            </tr>
            <tr>
              <th>Posted-Date</th>
              <td>{{ problem.date_posted }}</td>
            </tr>
            <tr>
              <th>Poster</th>
              <td>{{ problem.get_username }}</td>
            </tr>
          </table>

          <div class="field">
            <div class="control">
              <a class="button is-dark" @click="addToTasks" v-if="problem.status == 'Unaccepted' && !this.expired">Add to Task List</a>
              <a class="button is-dark" @click="addToTasks" v-if="problem.status == 'Unaccepted' && this.expired" disabled>Expired</a>
              <a class="button is-danger" disabled v-if="problem.status == 'In Progress'">In Progress</a>
              <a class="button is-dark" disabled v-if="problem.status == 'Completed'">Completed</a>
              <a class="button" id="back" @click="goBack">Back</a>
            </div>
          </div>
        </div>

        <!-- Email to Poster -->
        <div class="chat-to-poster column is-1" v-if="this.picker_address == ''">
          <router-link to="/my-account"><p>
            <span><i class="fas fa-grin-beam-sweat"></i></span>
            <span>Sorry!Register | Login your email first.</span>
          </p></router-link>
        </div>
        <div class="chat-to-poster column is-1" v-if="this.poster_address == ''">
          <router-link to="/my-account"><p>
            <span><i class="fas fa-grin-beam-sweat"></i></span>
            <span>Sorry! Poster doesn't register email.</span>
          </p></router-link>
        </div>
        <div class="chat-to-poster column is-1" v-if="this.picker_address != ''">
          <router-link :to="'/email' + this.problem.get_absolute_url">
            <p>
              <span><i class="far fa-comment-dots"></i></span>
              <span>Email To Poster</span>
            </p>
          </router-link>
        </div>

        <!-- Comments Part Below -->
        <div class="column is-12" id="comments-part">
          <hr>
          <h2 class="title"><p>Comments</p></h2>
          <template v-if="this.comments.length == 0">
            <p class="mb-4"><strong>There are no comments on this problem yet.</strong></p>
          </template>

          <template v-else>
            <div class="columns is-multiline" v-for="comment in this.comments" v-bind:key="comment.id">
              <div class="column is-12">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <img :src="require('@/assets/icons8-man-in-yellow-striped-sweater.png')">
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{{ comment.get_username }}</strong>
                        <br>
                        {{ comment.content }}
                        <br>
                        <small><a class="like" @click="likeOperation(comment.id, 1)">Like</a> · <a @click="extendReplyPart(comment.id)">Reply</a> · {{comment.created_at}}</small>
                      </p>
                      <div v-if="comment.id == this.replyOn" class="reply-extend-part">
                        <input type="input" class="input" name="input" placeholder="Say something..." v-model="inputContent"/>
                        <button class="button small is-primary" @click="submitReply(comment.id)" v-if="this.inputContent != ''">
                          <span><i class="fas fa-check mr-3"></i></span>
                          <span>ok</span>
                        </button>
                      </div>
                    </div>
                    <!-- Check the corresponding replies -->
                    <div v-for="array in this.replies" v-bind:key="array.id">
                      <div v-for="reply in array" v-bind:key="reply.id">
                        <article class="media" v-if="reply.comment == comment.id">
                          <figure class="media-left">
                            <p class="image is-48x48">
                              <img :src="require('@/assets/icons8-man-in-blue-t-shirt.png')">
                            </p>
                          </figure>
                          <div class="media-content">
                            <div class="content">
                              <p>
                                <strong>{{ reply.get_username }}</strong>
                                <br>
                                {{ reply.content }}
                                <br>
                                <small><a class="like" @click="likeOperation(reply.id, 2)">Like</a> · {{ reply.created_at }}</small>
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="mb-1">
              </div>
            </div>
          </template>
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="require('@/assets/icons8-man-in-yellow-striped-sweater.png')">
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea class="textarea" placeholder="Add a comment..."></textarea>
                </p>
              </div>

              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
              </div>
              <div class="field">
                <p class="control">
                  <button class="button" @click="postComments">Post comment</button>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'Problem',
    data() {
        return {
            problem: {},
            comments: [],
            replies: [],
            expired: false,
            errors: [],
            replyOn: false,
            inputContent: '',
            // Email To Poster Part
            picker_address: '',
            poster_address: '',
        }
    },
    methods: {
        // Email To Poster Part
        // Get the current user's email address
        checkCurrentEmailAddress() {
          if (localStorage.getItem('userid') != null) {
            const user_id = localStorage.getItem('userid')
            axios
              .get(`api/v1/users/${user_id}/`)
              .then(response => {
                if (response.status == 200) {
                  this.picker_address = response.data.get_user_simple_data.email
                }
              })
              .catch(error => {
                console.log(error)
              })
          }
        },
        checkPosterEmailAddress(username) {
          this.checkCurrentEmailAddress()
          axios
            .get(`api/v1/users/${username}/email-address/`)
            .then(response => {
              if (response.data.status == true) {
                this.poster_address = response.data.email
              }
            })
            .catch(error => {
              console.log(error)
            })
        },
        // Like Operation
        likeOperation(id, category) {
          let comment = 0
          let reply = 0
          // Category == 1 => Comment, Category == 2 => Reply
          if (category == 1) {
            comment = id
          } else if (category == 2) {
            reply = id
          }
          
          axios
            .put(`api/v1/comments/like/`, {
              comment: comment,
              reply: reply,
            })
            .then(response => {
              console.log(response)
              toast({
                    message: 'Like + 1 Done!',
                    type: 'is-success',
                    position: 'bottom-right',
                    dismissible: true,
                    duration: 2000
                  })
            })
            .catch(error => {
              console.log(error)
            })
        },

        // Get the replies for the comment
        getReplies(comment_id) {
          axios
            .get(`api/v1/comments/${comment_id}/replies/`)
            .then(response => {
              for (let i = 0; i < response.data.length; i++) {
                // Calc the time to check whether it has been created over 12 hours
                var time = new Date(response.data[i].created_at)
                var now = new Date()
                var diff = now - time
                var diffHours = diff / (1000 * 60 * 60)
                if (diffHours > 12) {
                  response.data[i].created_at = response.data[i].created_at.split('T')[0] + ' ' + response.data[i].created_at.split('T')[1].split('.')[0]
                } else {
                  response.data[i].created_at = diffHours.toFixed(0) + ' hrs'
                }
              }
              this.replies.push(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        // Get the comments for the problem
        getComments(id){
          axios
            .get(`api/v1/comments/${id}`)
            .then(response => {
              this.comments = response.data
              
              for (var i = 0; i < this.comments.length; i++) {
                // Calc the time to check whether it has been created over 12 hours
                var time = new Date(this.comments[i].created_at)
                var now = new Date()
                var diff = now - time
                var diffHours = diff / (1000 * 60 * 60)
                if (diffHours > 12) {
                  this.comments[i].created_at = this.comments[i].created_at.split('T')[0] + ' ' + this.comments[i].created_at.split('T')[1].split('.')[0]
                } else {
                  this.comments[i].created_at = diffHours.toFixed(0) + ' hrs'
                }
                // Get the replies for the comment
                this.getReplies(this.comments[i].id)
              }
            })
            .catch(error => {
              console.log(error)
            })
        },

        postComments() {
          // Check user login status 
          if (localStorage.getItem('userid') == null) {
            toast({
              message: 'You must be logged in to post a comment.',
              type: 'is-danger',
              position: 'bottom-right',
              dismissible: true,
              duration: 2000
            })
            return
          } else {
            const problem_id = this.problem.id
            const user_id = localStorage.getItem('userid')
            const content = document.querySelector('textarea').value

            this.errors = []

            if (content == '') {
              this.errors.push('You must enter a comment.')
            } else {
              axios
                .post(`api/v1/comments/post/`, {
                  user: user_id,
                  problem: problem_id,
                  content: content
                })
                .then(response => {
                  toast({
                    message: 'Comment posted successfully.',
                    type: 'is-success',
                    position: 'bottom-right',
                    dismissible: true,
                    duration: 2000
                  })
                  location.reload()
                })
                .catch(error => {
                  if(error.response) {
                    for (const property in error.response.data) {
                      this.errors.push(error.response.data[property])
                    }
                  }
                  toast({
                    message: 'Error posting comment.',
                    type: 'is-danger',
                    position: 'bottom-right',
                    dismissible: true,
                    duration: 2000
                  })
                })
            }
          }
        },

        // Extend Part for a reply to a comment
        extendReplyPart(id){
          // Check user login status
          if (localStorage.getItem('userid') == null) {
            toast({
              message: 'You must be logged in to post a reply.',
              type: 'is-danger',
              position: 'bottom-right',
              dismissible: true,
              duration: 2000
            })
            return
          } else {
            this.replyOn = id
          }
        },

        // Submit the reply
        submitReply(id) {
          const user_id = localStorage.getItem('userid')
          const comment_id = id
          const content = this.inputContent

          axios
            .post(`api/v1/comments/replies/post/`, {
              user: user_id,
              comment: comment_id,
              content: content,
            })
            .then(response => {
              toast({
                message: 'Reply posted successfully.',
                type: 'is-success',
                position: 'bottom-right',
                dismissible: true,
                duration: 2000
              })
              location.reload()
            })
            .catch(error => {
              toast({
                message: 'Error posting reply.',
                type: 'is-danger',
                position: 'bottom-right',
                dismissible: true,
                duration: 2000
              })
            })
        },

        async getProblem() {
            this.$store.commit('setIsLoading', true)

            const tag_slug = this.$route.params.tag_slug
            const problem_slug = this.$route.params.problem_slug

            await axios
                .get(`/api/v1/problems/${tag_slug}/${problem_slug}`)
                .then(response => {
                    this.problem = response.data

                    this.problem.deadline = this.problem.deadline.split('T')[0] + ' ' + this.problem.deadline.split('T')[1].split('+')[0]
                    this.problem.date_posted = this.problem.date_posted.split('T')[0] + ' ' + this.problem.date_posted.split('T')[1].split('.')[0]

                    if (this.problem.status == 0) {
                        this.problem.status = 'Unaccepted'
                    } else if (this.problem.status == 1) {
                        this.problem.status = 'In Progress'
                    } else {
                        this.problem.status = 'Completed'
                    }

                    // Check whether the problem is expired
                    if (this.problem.deadline < new Date().toISOString().split('T')[0]) {
                        this.expired = true
                    }

                    // Get Related Comments
                    this.getComments(this.problem.id)

                    // Get the Poster's Email by Poster's username
                    this.checkPosterEmailAddress(this.problem.get_username)

                    document.title = this.problem.name + ' | FlyMeCrods'
                })
                .catch(error => {
                    console.log(error)

                    document.title = 'Error | FlyMeCrods'

                    toast ({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 5000,
                        position: 'bottom-right',
                    })
                })

            this.$store.commit('setIsLoading', false)
        },

        goBack() {
            this.$router.go(-1)
        },

        addToTasks() {
          const item = {
            problem: this.problem
          }

          this.$store.commit('addToTasks', item)

          if (!this.$store.state.tasks.items.includes(item)) {
            toast({
              message: 'Please do not add the same task twice!',
              type: 'is-danger',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right'
            })
          } else {
            toast({
              message: 'The problem was added to your task list',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right'
            })
          }
        }
    },
    mounted() {
        this.getProblem()
    },
}
</script>

<style scoped>
.control {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.button {
  place-content: center;
  margin: 1rem 1rem;
}

#back {
  background-color: #dbdbdb;
}

#problem-not-found .image {
  width: 50%;
  height: 50%;
}

#problem-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
}

#problem-not-found .column {
  display: flex;
  justify-content: center;
  align-items: center;
}

#problem-not-found .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#problem-not-found .container .image {
  margin-bottom: 1rem;
}

/* Sidebar */
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
  width: 2.8rem;
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

.chat-to-poster {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.chat-to-poster a p {
  color: white;
  padding: 0.6rem;
  border-radius: 0.3rem;
  writing-mode: vertical-rl;
  background-color: #363636;
}

.chat-to-poster a :hover {
  background-color: #f03a5f;
  transition: all 0.6s;
}

.chat-to-poster a p i {
  margin-bottom: 0.5rem;
}

.fa-comment-dots {
  transform: rotate(90deg);
}

.fa-grin-beam-sweat {
  transform: rotate(90deg);
}

textarea {
  font-family: 'Noto Serif Display', serif;
}

.reply-extend-part {
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  font-family: 'Noto Serif Display', serif;
}

@media screen and (max-width: 800px) {
  #problem-not-found {
    flex-direction: column;
  }
  #problem-not-found .column {
    width: 100%;
    justify-content: center;
    align-items: flex-start;
  } 
  .side-part {
    width: 1.4rem;
  }
  .media .image {
    display: none;
  }
  .chat-to-poster {
    justify-content: center;
    align-items: center;
  }
  .chat-to-poster a p {
    writing-mode: horizontal-tb;
  }
  .chat-to-poster a p i {
    margin-bottom: 0;
    margin-right: 0.5rem;
  }

  .fa-comment-dots {
    transform: rotate(0deg);
  }
  .fa-grin-beam-sweat {
    transform: rotate(0deg);
  }
}
</style>