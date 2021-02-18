import Vue from 'vue';
import * as firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import { store } from './store';
import vuetify from './plugins/vuetify';

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/login')
      } else {
        this.$store.commit('user/setUser', {
          name: user.displayName,
          uid: user.uid,
        })
      }
      this.$store.commit('setLoading', false)
    });
  }
}).$mount('#app');
