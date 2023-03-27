import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import Nav from './components/Nav.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.component("Nav",Nav)
app.use(router)
app.config.globalProperties.axios = axios;
app.mount('#app')
