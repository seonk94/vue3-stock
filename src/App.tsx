import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import * as firebase from 'firebase/app';
import { injectAuth } from './lib/provider/AuthProvider';

const App = defineComponent({
  setup() {
    const router = useRouter();
    const { authAction } = injectAuth();

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        authAction.setAuth(user);
      }
    });

    return () => <router-view></router-view>;
  },
});

export default App;
