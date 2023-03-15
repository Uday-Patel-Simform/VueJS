import { createApp } from 'vue'
import App from './App.vue'
import Nav from './components/Nav.vue'
import axios from 'axios'

import './assets/main.css'

const app=createApp(App)
app.component("Nav",Nav)
app.config.globalProperties.axios = axios;
app.mount('#app')
