import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AudioPlayer from '@liripeng/vue-audio-player'
const app = createApp(App)

app.use(router)
app.use(AudioPlayer)
app.mount('#app')
