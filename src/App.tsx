import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import * as firebase from 'firebase/app';

const App = defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        router.push('/login');
      } else {
        store.commit('user/setUser', {
          name: user.displayName,
          uid: user.uid,
        });
      }
      store.commit('setLoading', false);
    });

    return () => <router-view></router-view>;
  },
});

export default App;
