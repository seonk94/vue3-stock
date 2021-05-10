import { createApp } from 'vue';
import App from './App';
import router from './router';
import AuthProvider from './lib/provider/AuthProvider';
import './index.css';
import client from './plugins/client';

createApp(App).use(router).use(client).use(AuthProvider).mount('#app');
