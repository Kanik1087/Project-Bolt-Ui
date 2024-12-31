import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { setupPrimeVue } from './plugins/primevue';
import './assets/main.css';

const app = createApp(App);

// Setup plugins
setupPrimeVue(app);
app.use(createPinia());

app.mount('#app');