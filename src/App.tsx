import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { injectAuth } from './lib/provider/AuthProvider';
import { auth } from './lib/firebase';

const App = defineComponent({
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const { authAction } = injectAuth();

    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        authAction.setAuth(user);
      }
      loading.value = false;
    });

    return () => <div>{loading.value ? <h3>loading</h3> : <router-view></router-view>}</div>;
  },
});

export default App;
