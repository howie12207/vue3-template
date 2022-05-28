import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import { createPinia } from 'pinia';
import '@/assets/css/index.css';

import { createMetaManager } from 'vue-meta';

import fontAwesomeIcon from '@/utils/fontawesome';

const app = createApp(App);

app.use(router)
    .use(createPinia())
    .use(createMetaManager())
    .component('FAIcon', fontAwesomeIcon)
    .mount('#app');
