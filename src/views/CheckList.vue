<template>
  <div class="checklist-page">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li class="is-active"><router-link to="#" aria-current="page">Planlist</router-link></li>
      </ul>
    </nav>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Planlist</h1>
      </div>
      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="listLength">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Budget</th>
              <th>Deadline (UTC+8)</th>
              <th>Poster</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <ListItem 
                v-for="item in checklist.items"
                v-bind:key="item.problem.id"
                v-bind:initialItem="item" 
                v-on:removeFromList="removeFromList" />
          </tbody>
        </table>

        <p v-else>There is no problem in the checklist...</p>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Going to Accept</h2>
        <p v-if="checklist.items.length>1" style="color: red" class="mb-3">FlyMeCrods strongly recommends you to accept 1 problem once a time.</p>
        <div class="names mb-4">
          <div v-for="(item, index) in checklist.items" v-bind:key="item.problem.id">
            <span v-if="index != 0">|</span>
            <span>{{ item.problem.name }}</span>
          </div>
        </div>
        <b>{{ listLength }} problem(s)</b>

        <hr />

        <router-link to="/checklist/confirmation" class="button is-dark" v-if="listLength && listLength == 1">Proceed to Accept</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ListItem from '@/components/ListItem.vue';
export default {
    name: 'CheckList',
    data() {
        return {
            checklist: {
                items: []
            },
        }
    },
    components: {
        ListItem
    },
    methods: {
        removeFromList(item) {
            this.checklist.items = this.checklist.items.filter(i => i.problem.id !== item.problem.id);
        }
    },
    mounted() {
        this.checklist = this.$store.state.tasks
        document.title = "CheckList | FlyMeCrods"
    },
    computed: {
        listLength() {
            return this.checklist.items.length
        }
    }
}
</script>

<style scoped>
.names {
  display: flex;
  justify-content: flex-start;
}

</style>