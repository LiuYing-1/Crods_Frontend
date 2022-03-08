import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/introduction',
    name: 'Introduction',
    // route level code-splitting
    // this generates a separate chunk (introduction.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "introduction" */ '../views/Introduction.vue')
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: () => import(/* webpackChunkName: "marketplace" */ '../views/Marketplace.vue')
  },
  {
    path: '/:tag_slug/:problem_slug',
    name: 'Problem',
    component: () => import(/* webpackChunkName: "problem" */ '../views/Problem.vue')
  },
  {
    path: '/:tag_slug',
    name: 'Tag',
    component: () => import(/* webpackChunkName: "tag" */'../views/Tag.vue')
  },
  {
    path: '/status/:status',
    name: 'Status',
    component: () => import(/* webpackChunkName: "status" */'../views/Status.vue')
  },
  {
    path: '/cases',
    name: 'Cases',
    component: () => import(/* webpackChunkName: "cases" */ '../views/Cases.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue')
  },
  {
    path: '/checklist',
    name: 'Checklist',
    component: () => import(/* webpackChunkName: "checklist" */ '../views/CheckList.vue')
  },
  {
    path: '/checklist/confirmation',
    name: 'Confirmation',
    component: () => import(/* webpackChunkName: "checklist" */ '../views/Confirmation.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: () => import(/* webpackChunkName: "my-account" */ '../views/MyAccount.vue'),
    meta: {
      requireLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'Login', query: { to: to.path }});
  } else {
    next()
  }
})

export default router
