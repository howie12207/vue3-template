import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import { createPinia } from 'pinia';
import '@/assets/css/index.css';

import { createMetaManager } from 'vue-meta';

const app = createApp(App);

app.use(router).use(createPinia()).use(createMetaManager()).mount('#app');
