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
    },
  },
  {
    path: '/success',
    name: 'SuccessPost',
    component: () => import(/* webpackChunkName: "postsuccess" */ '../views/SuccessPost.vue')
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
    path: '/checklist/confirmation/motivation',
    name: 'Motivation',
    component: () => import(/* webpackChunkName: "checklist" */ '../views/Motivation.vue'),
  },
  {
    path: '/presessions/:presession_id',
    name: 'Presession',
    component: () => import(/* webpackChunkName: "presession" */ '../views/Presession.vue')
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
  },
  {
    path: '/problem-edit/:tag_slug/:problem_slug',
    name: 'ProblemEdit',
    component: () => import(/* webpackChunkName: "my-account" */ '../views/ProblemEdit.vue'),
  },
  {
    path: '/solution/:tag_slug/:problem_slug',
    name: 'Solution',
    component: () => import(/* webpackChunkName: "my-account" */ '../views/Solution.vue'),
  },
  {
    path: '/distributions/:distribution_id',
    name: 'Distribution',
    component: () => import(/* webpackChunkName: "my-account" */ '../views/Distribution.vue'),
  },
  {
    path: '/email',
    name: 'Email',
    component: () => import(/* webpackChunkName: "email" */ '../views/Email.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/email/:email_id',
    name: 'EmailDetail',
    component: () => import(/* webpackChunkName: "email-detail" */ '../views/EmailDetail.vue'),
  },
  {
    path: '/email/:tag_slug/:problem_slug',
    name: 'EmailToPoster',
    component: () => import(/* webpackChunkName: "email-to-poster" */ '../views/EmailToPoster.vue'),
  },
  {
    path: '/user/:user_id',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "user-profile" */ '../views/UserProfile.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/PageNotFound.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'Login', query: { to: to.path }});
  } else {
    next()
  }
})

// This is the method to route the new page to the top.
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})

export default router
