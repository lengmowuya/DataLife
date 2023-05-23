import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus  from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Work from './js/work.js'
import Tool from './js/tools.js'
import Config from './js/config.js'
// import './aliFont.css'
import './aliFont.js'
const app = createApp(App)
// 加入全局工具库
app.config.globalProperties.Tool = Tool;
app.config.globalProperties.Work = Work;
app.config.globalProperties.Config = Config;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(VueAxios,Axios);
app.use(ElementPlus);
let data1 = app.use(store).use(router).mount('#app');
// window.vm = data1;
// console.log(data1);
// console.log(data1.axios);
// app.config.globalProperties.Work.prototype = data1;

