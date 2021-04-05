import "./main.css";
import "./ui/directives";
import "typeface-montserrat";
import "typeface-inconsolata";
import Vue, { VNode } from "vue";
import Router from "vue-router";
import VueCompositionApi from "@vue/composition-api";
import firebase from "firebase";

import App from "./ui/App.vue";
import router from "./ui/router";
import i18n from "./service/i18n";
import * as store from "./ui/store";

const firebaseConfig = {
    apiKey: "AIzaSyCd0sDXKnU9JS5VdSFe6p6cWVBV6z4oHd8",
    authDomain: "the-breakouts.firebaseapp.com",
    databaseURL: "https://the-breakouts-default-rtdb.firebaseio.com",
    projectId: "the-breakouts",
    storageBucket: "the-breakouts.appspot.com",
    messagingSenderId: "531765942303",
    appId: "1:531765942303:web:3211134965db0fcd34dd2a",
    measurementId: "G-YWWE6LBT91"
};

firebase.initializeApp(firebaseConfig);

declare const IS_ELECTRON: boolean;
declare const MHW_ENV: string;

// Globally install the Vue3 Function API
Vue.use(VueCompositionApi);
Vue.use(Router);

// Globally catch uncaught exceptions and store it
/* eslint-disable-next-line @typescript-eslint/unbound-method */
Vue.config.errorHandler = function(error: Error): void {
    store.mutations.errorOccurred({ error });
};

const app = new Vue({
    router,
    render: (h): VNode => h(App),
    i18n
});

app.$mount("#app");

// For Cypress
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.vueapp = app;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.vueapp.$store = store;

if ("serviceWorker" in navigator && !IS_ELECTRON && MHW_ENV === "production") {
    window.addEventListener("load", () => {
        // eslint-disable-next-line compat/compat
        navigator.serviceWorker.register("./service-worker.js");
    });
}
