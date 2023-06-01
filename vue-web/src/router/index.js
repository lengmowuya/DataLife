import { createRouter ,createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/affair'
  },
  {
    path: '/thought',
    name: 'Thought',
    component: () => import(/* webpackChunkName: "Thought" */ '../views/Thought/Thought.vue')
  },{
    path: '/affair',
    name: 'Affair',
    component: () => import(/* webpackChunkName: "Affair" */ '../views/Affair/Affair.vue')
  },{
    path: '/affair/manager',
    name: 'ManagerSelf',
    component: () => import(/* webpackChunkName: "Manager" */ '../views/Manager/Manager.vue')
  },{
    path: '/self',
    name: 'Self',
    component: () => import(/* webpackChunkName: "User" */ '../views/User/User.vue')
  }
  ,{
    path: '/sign',
    name: 'Sign',
    component: () => import(/* webpackChunkName: "Sign" */ '../views/Sign/Sign.vue')
  },{
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Sign" */ '../views/Sign/Sign.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  let id = localStorage.getItem('id');
  if((id == "" || id == undefined|| id == 'undefined') && to.path != '/sign'){
    next("/sign");
  }else{
    next();
  }
})

export default router
