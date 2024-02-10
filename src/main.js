import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import 'materialize-css/dist/css/materialize.min.css';

createApp(App).use(router).use(router).use(store).mount('#app')
