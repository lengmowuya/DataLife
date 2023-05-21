import { createStore } from 'vuex'

export default createStore({
  state: {
    // 当前时间
    NowDate: {
      time: new Date().getTime(),
      data: {},
      Date: new Date(),
    },
    user: {
      name: "",
      passward: "",
      email: "",
      id: '',
      isLogin: false,
      Token: ''
    },
    AffairList: [],
    AffairRecordList: [],
    RecordDateList: [],
    RecordShowDate: null,
    ThoughtRecordList: []
  },
  getters: {

  },
  mutations: {

  },
  actions: {
  },
  modules: {
  }
})
