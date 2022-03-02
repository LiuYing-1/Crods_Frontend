<template>
  <div class="column is-3">
    <div class="box">
      <div class="tag is-dark">{{ problem.get_tagname }}</div>
      <figure class="image mb-4">
        <img v-bind:src="problem.get_thumbnail">
      </figure>

      <h3 class="is-size-4">{{ problem.name }}</h3>
      <p>{{ problem.description }}</p>
      <p class="is-size-6 has-text-grey">Budget: &euro; {{ problem.budget }}</p>
      <p v-if="problem.status==0" class="status">Status: Unaccepted</p>
      <p v-else-if="problem.status==1" class="status">Status: In Progress</p>
      <p v-else-if="problem.status==2" class="status">Status: Completed</p>
      <div id="view-details-button">
        <router-link v-bind:to="problem.get_absolute_url" class="button is-dark mt-4">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ProblemBox',
    props: {
        problem: Object
    }
}
</script>

<style scoped>
.box {
  position: relative;
  display: flex;
  flex-direction: column;
}

.box #view-details-button {
  place-self: center;
}

.status {
  color:brown;
}

.box p {
  margin-top: 0.5rem;
}

.tag {
  top: 0;
  left: 0;
  z-index: 1;
  position: absolute;
}
</style>