import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { injectAuth } from './lib/provider/AuthProvider';
import { auth } from './lib/firebase';

const App = defineComponent({
  setup() {
    const router = useRouter();
    const { authAction } = injectAuth();

    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        authAction.setAuth(user);
      }
    });

    return () => (
      <div>
        <router-view></router-view>
      </div>
    );
  },
});

export default App;
