import { createApp } from 'vue'
import App from './App.vue'
// import postcs from './App.vue'
// import Vue from 'vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)

// console.log(Vue);
// app.prototype.$axios = axios
// Vue.prototype.axios = Axios
app.use(VueAxios,Axios);
// Vue.config.productionTip = false
// app.use(ElementPlus)
app.use(store).use(router).mount('#app')

// function page_thought(){
//     Controldata.date = FormatDate(new Date().getTime());
//     axios.get('http://127.0.0.1:3000/thought/all')
//     .then(res=>{
//         Controldata.List = res.data;
//         console.log(res);
//         TCCase.setThoughtList();
//         TCCase.initDateList();
//         TCCase.$forceUpdate();
//     });
//     axios.get('http://127.0.0.1:3000/emotion/all')
//     .then(res=>{
//         Controldata.EmotionList = res.data;
//         TCCase.$forceUpdate();
//     });
// }