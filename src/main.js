import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";
import "@/assets/css/index.css";

const app = createApp(App);

app.use(router).use(createPinia()).mount("#app");
