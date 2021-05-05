import { createApp } from 'vue';
import * as firebase from 'firebase/app';
import App from './App';
import router from './router';
import { store } from './store';
import AuthProvider from './lib/provider/AuthProvider';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGIN_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
});

createApp(App).use(router).use(AuthProvider).use(store).mount('#app');
