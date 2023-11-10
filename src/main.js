import './assets/main.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// Supports weights 200-900
import '@fontsource-variable/source-code-pro';
import '@fontsource/source-sans-pro';
import '@fontsource-variable/orbitron';




/* CSS COLORS FROM CONFIGURATION FILE */

let root = document.documentElement;

// Set the CSS variables
root.style.setProperty('--light', _a.colors.light);
root.style.setProperty('--dark', _a.colors.dark);
root.style.setProperty('--main', _a.colors.main);
root.style.setProperty('--second', _a.colors.second);




const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(FloatingVue)
app.mount('#app')

