import { createApp } from 'vue';
import App from './App';
import router from './router';
import AuthProvider from './lib/provider/AuthProvider';
import './index.css';
import client from './plugins/client';
import theme from './plugins/theme';

createApp(App).use(router).use(client).use(theme).use(AuthProvider).mount('#app');
