import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())

// Vuetify
import 'vuetify/styles'
import vuetify from '@/plugins/vuetify.js'
app.use(vuetify)

app.use(router)
app.mount('#app')