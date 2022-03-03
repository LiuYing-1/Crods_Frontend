<template>
  <tr>
    <td><router-link :to="item.problem.get_absolute_url">{{ item.problem.name }}</router-link></td>
    <td>&euro; {{ item.problem.budget }}</td>
    <td>{{ item.problem.deadline }}</td>
    <td>{{ item.problem.get_username }}</td>
    <td><button class="delete" @click="removeFromList(item)"></button></td>
  </tr>
</template>

<script>
export default {
    name: 'ListItem',
    props: {
        initialItem: Object
    },
    data() {
        return {
            item: this.initialItem
        }
    },
    methods: {
      updateList() {
        localStorage.setItem('tasks', JSON.stringify(this.$store.state.tasks))
      },
      removeFromList(item) {
        this.$emit('removeFromList', item)

        this.updateList()
      }
    }
}
</script>

<style>

</style>