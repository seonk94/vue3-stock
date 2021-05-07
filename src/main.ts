import { createApp } from 'vue';
import App from './App';
import router from './router';
import AuthProvider from './lib/provider/AuthProvider';
import './index.css';

createApp(App).use(router).use(AuthProvider).mount('#app');
