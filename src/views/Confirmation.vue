<template>
  <div class="confirmation-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li><router-link to="/checklist">Planlist</router-link></li>
        <li class="is-active"><router-link to="#" aria-current="page">Confirmation</router-link></li>
      </ul>
    </nav>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Confirmation</h1>
      </div>

      <div class="column is-12">
        <div v-for="(item, index) in tasks.items" v-bind:key="item.problem.id">
          <div class="box mb-3">
            <div class="tag is-black is-size-6">{{ index+1 }}</div>
            <div class="image">
              <img v-bind:src="item.problem.get_thumbnail">
            </div>
            <div class="name">
              <p>{{ item.problem.name }}</p>
            </div>
            <div class="desc">
              <p>{{ item.problem.description }}</p>
            </div>
            <div class="budget">
              <p>&euro; {{ item.problem.budget }}</p>
            </div>
            <div class="deadline">
              <p>{{ item.problem.deadline }}</p>
            </div>
          </div>
        </div>

        <hr />

        <div class="columns" id=second-part>
          <div class="column is-6">
            <div class="box">
              <div class="tag is-black is-size-6">Terms</div>
              <div class="image">
                <img :src="require('@/assets/logo.png')">
              </div>
              <div class="terms-content">
                <p class="subtitle"><b>Before Accept</b></p>
                <p>
                  Dear, the tasks cannot be cancelled once accepting. Please
                  <b>strictly</b> follow the instructions and guidelines.
                </p>
              </div>

              <div class="terms-accept">
                <div class="checkbox">
                  <input type="checkbox" id="checkbox" v-model="terms" class="mr-1">
                  <label for="checkbox">I accept the terms</label>
                </div>
              </div>
            </div>
          </div>

          <div class="column is-6">
            <div class="box" id="total-part">
              <div class="tag is-black is-size-6">Total</div>
              <div class="total-num" id="move-part">
                <p class="subtitle"><b>Total: {{ tasks.items.length }}</b></p>
              </div>
              <div class="accept-button">
                <button class="button is-primary" v-if="terms" @click="accept">
                  <router-link to="/checklist/confirmation/motivation">Accept</router-link>
                </button>
              </div>
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
  name: 'Confirmation',
  data() {
    return {
      tasks: {
        items: []
      },
      terms: false,
    }
  },
  methods: {
  },
  mounted() {
    document.title = 'Confirmation | FlyMeCrods'
    this.tasks = this.$store.state.tasks
  },
}
</script>

<style scoped>
.box {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.tag {
  position: absolute;
  left: 0;
  z-index: 1;
}

.image, .name, .desc, .budget, .deadline {
  width: 20%;
}

.budget, .name {
  display: flex;
  justify-content: center;
}

.name p{
  font-size: 1.5rem;
  font-weight: bold;
}

#second-part .box {
  height: 100%;
  display: flex;
  justify-content: flex-start;
}

#second-part .box .image{
  width: 18%;
  margin-right: 1rem;
}

#second-part .box .terms-content {
  width: 50%;
}

#second-part .box .terms-accept {
  color: darkblue;
}

#second-part .box .terms-accept :hover{
  cursor: pointer;
  text-decoration: underline;
  color: pink;
}

#second-part .box .tag {
  top: 0;
}

#total-part {
  display: flex;
  justify-content: center;
  background-color: #363636;
}

#total-part p {
  color: white;
}

#total-part .total-num {
  width: 50%;
  display: flex;
  justify-content: center;
}

#total-part .accept-button {
  width: 50%;
  display: flex;
  justify-content: center;
}

#total-part .accept-button .button a {
  color: white;
}

@media screen and (max-width: 800px) {
  .box {
    flex-direction: column;
  }

  .tag {
    top: 0;
  }

  .image, .name, .desc, .budget, .deadline {
    width: 100%;
    margin-top: 0.5rem;
  }

  .budget, .name {
    justify-content: flex-start;
  }

  .image {
    width: 100%;
    height: auto;
  }

  #second-part .box .image {
    width: 30%;
  }

  #second-part .box .terms-content {
    margin-top: 1rem;
    width: 100%;
  }

  #second-part .box .terms-accept {
    margin-top: 1rem;
  }

  #total-part .total-num {
    margin-bottom: 1rem;
  }
}
</style>