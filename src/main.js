import { createApp } from "vue";
import App from "./App.vue";
import Store from "./store/store.js";
import Router from "./routes/routes.js";
import VModal from "vue-js-modal";

import "./common/reset.css";
import "./common/fonts/sf-pro-display/font.css";

const Vue = createApp(App).use(Router).use(Store).mount("#app");
