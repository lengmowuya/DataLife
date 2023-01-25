import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import vuex from './../store/index'
import Thought from '../views/Thought.vue'

const routes = [
  {
    path: '/',
    redirect:'/affair'
  },
  {
    path: '/thought',
    name: 'Thought',
    component: Thought
  },{
    path: '/affair',
    name: 'Affair',
    component: () => import(/* webpackChunkName: "about" */ '../views/Affair.vue')
  },{
    path: '/affair/manager',
    name: 'ManagerSelf',
    component: () => import(/* webpackChunkName: "about" */ '../views/AllAffairManager.vue')
  },{
    path: '/self',
    name: 'Self',
    component: () => import(/* webpackChunkName: "about" */ '../views/Self.vue')
  },{
    path: '/sign',
    name: 'Sign',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sign.vue')
  },
  
  
  
  // {
  //   path: '/record_mobile',
  //   name: 'RecordMobile',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/mobile/m_Record.vue')
  // },{
  //   path: '/affair_mobile',
  //   name: 'AffairMobile',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/mobile/m_Affair.vue')
  // },{
  //   path: '/thought_mobile',
  //   name: 'ThoughtMobile',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/mobile/m_Thought.vue')
  // },{
  //   path: '/newAffair_mobile',
  //   name: 'NewAffairOnlayAffair',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/mobile/m_NewAffair.vue')
  // },{
  //   path: '/newThought_mobile',
  //   name: 'NewThoughtOnlayAffair',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/mobile/m_NewThought.vue')
  // }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  // mode:hash,
  routes
})
router.beforeEach((to,from,next)=>{
  let user = vuex.state.user;
  if(user == undefined ||user.email == undefined || user.email == '' && to.path != '/sign'){
    next("/sign");
  }else{
    next();
  }
})

export default router
