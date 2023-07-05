import { createRouter ,createWebHashHistory} from 'vue-router'
const ThoughtPage = () => import(/* webpackChunkName: "Thought" */ '../views/Thought/Thought.vue');
const AffairPage = () => import(/* webpackChunkName: "Affair" */ '../views/Affair/Affair.vue');
const ManagerPage = () => import(/* webpackChunkName: "Manager" */ '../views/Manager/Manager.vue');
const UserPage = () => import(/* webpackChunkName: "User" */ '../views/User/User.vue')
const SignPage = () => import(/* webpackChunkName: "Sign" */ '../views/Sign/Sign.vue');
// const ThoughtPage = () => import(/* webpackChunkName: "Sign" */ '../views/Sign/Sign.vue');

const routes = [
  {
    path: '/',
    redirect:'/affair'
  },
  {
    path: '/thought',
    name: 'Thought',
    component: ThoughtPage
  },{
    path: '/affair',
    name: 'Affair',
    component: AffairPage
  },{
    path: '/affair/manager',
    name: 'ManagerSelf',
    component: ManagerPage
  },{
    path: '/self',
    name: 'Self',
    component: UserPage
  },{
    path: '/sign',
    name: 'Sign',
    component: SignPage
  },{
    path: '/login',
    name: 'Login',
    component: SignPage
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
