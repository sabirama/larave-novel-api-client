import { createApp } from 'vue'
import App from './App.vue'
import MainRouter from './router/Router.js' 
import './style.css'

createApp(App).use(MainRouter).mount('#app')
