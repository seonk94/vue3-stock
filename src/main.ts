import { createApp } from 'vue';
import App from './App';
import router from './router';
import { store } from './store';
import AuthProvider from './lib/provider/AuthProvider';
import './assets/css/index.scss';

createApp(App).use(router).use(AuthProvider).use(store).mount('#app');
