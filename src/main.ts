import "/src/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { install } from "vue3-recaptcha-v2";

import router from "./router";
import App from "@/App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
