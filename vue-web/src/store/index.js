import { createStore } from 'vuex'

export default createStore({
  state: {
    // 当前时间
    NowDate:{
      time:new Date().getTime(),
      data:{},
      Date:new Date()
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
