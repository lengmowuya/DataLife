import { createRouter, createWebHistory } from 'vue-router'
import Thought from '../views/Thought.vue'

const routes = [
  {
    path: '/',
    name: 'Thought',
    component: Thought
  },{
    path: '/thought',
    name: 'Thought',
    component: Thought
  },
  {
    path: '/affair',
    name: 'Affair',
    component: () => import(/* webpackChunkName: "about" */ '../views/Affair.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
