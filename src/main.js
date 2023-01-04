import { createApp } from 'vue'
/* import './style.css' */
import App from './App.vue'
import './index.css'

// instalar router 4 
//npm install vue-router@4

// importar router 4
import router from './router'

createApp(App).use(router).mount('#app')
