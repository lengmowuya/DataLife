import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Tool from './js/Tools'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-plus/dist/index.css'
import Work from './js/Work.js'
// import './aliFont.css'
import './aliFont.js'
const app = createApp(App)
// 加入全局工具库
app.config.globalProperties.Tool = Tool;
app.config.globalProperties.Work = Work;
app.use(VueAxios,Axios);
let data1 = app.use(store).use(router).mount('#app');
// window.vm = data1;
// console.log(data1);
// console.log(data1.axios);
// app.config.globalProperties.Work.prototype = data1;

