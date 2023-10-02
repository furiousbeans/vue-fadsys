import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'

import './assets/main.css'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'


const myApp = createApp(App)


myApp.use(Quasar, {
  plugins: {}, 
})


myApp.use(router);
myApp.mount('#app')