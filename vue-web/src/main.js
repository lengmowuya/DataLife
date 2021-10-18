import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-plus/dist/index.css'
// import './aliFont.css'
import './aliFont.js'
const app = createApp(App)

app.use(VueAxios,Axios);
app.use(store).use(router).mount('#app')
