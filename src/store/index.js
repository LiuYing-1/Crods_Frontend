import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
  },

  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('tasks')) {
        state.tasks = JSON.parse(localStorage.getItem('tasks'))
      } else {
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
      }

      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },

    addToTasks(state, item) {
      const exists = state.tasks.items.filter(i => i.problem.id === item.problem.id)
      
      if (!exists.length) {
        state.tasks.items.push(item)
      }

      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },

    removeTasks(state, item) {
      state.tasks.items = []
      item = null
    },

    setIsLoading(state, status) {
      state.isLoading = status
    },

    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },

    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
  },
  actions: {
  },
  modules: {
  }
})
