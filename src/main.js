
import { createApp } from 'vue'
import App from './App.vue'
import VueCryptojs from 'vue-cryptojs'
import router from './router'

import './index.css'

const app = createApp(App)

app.use(VueCryptojs)
app.use(router)

app.mount('#app')
