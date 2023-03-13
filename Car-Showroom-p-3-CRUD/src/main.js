import { createApp } from 'vue'
import App from './App.vue'
import Nav from './components/Nav.vue'

import './assets/main.css'

const app=createApp(App)
app.component("Nav",Nav)
app.mount('#app')
