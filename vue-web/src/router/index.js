import { createRouter, createWebHistory } from 'vue-router'
import Thought from '../views/Thought.vue'

const routes = [
  {
    path: '/',
    // name: 'Thought',
    redirect:'/affair'
    // component: Thought
  },{
    path: '/thought',
    name: 'Thought',
    component: Thought
  },{
    path: '/affair',
    name: 'Affair',
    component: () => import(/* webpackChunkName: "about" */ '../views/Affair.vue')
  },{
    path: '/affair_mobile',
    name: 'AffairMobile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Affair_mobile.vue')
  },{
    path: '/self',
    name: 'Self',
    component: () => import(/* webpackChunkName: "about" */ '../views/Self.vue')
  },{
    path: '/sign',
    name: 'Sign',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sign.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
