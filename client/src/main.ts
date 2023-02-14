import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from "./components/UI"
import './assets/main.css'
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'
const app = createApp(App)

// components.forEach(component => {
//
//     app.component(component.name, component);
// })


app.use(router)
   .use(createPinia())
   .mount('#app')

