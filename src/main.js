import { createApp } from 'vue'
import { createPinia } from 'pinia'
//require("dotenv").config();

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
