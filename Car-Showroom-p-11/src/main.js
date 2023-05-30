import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import Nav from './components/Nav.vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/main.css'
import i18n from './i18n'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)
app.component("Nav",Nav)
app.use(router)
app.use(createPinia())
app.use(vuetify)
app.use(i18n)
app.config.globalProperties.axios = axios
app.mount('#app')

