import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { injectAuth } from './lib/provider/AuthProvider';
import { auth } from './lib/firebase';
import Loading from './components/common/Loading';

const App = defineComponent({
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const { authMethods } = injectAuth();

    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        authMethods.setAuth(user);
        router.push('/home');
      }
      loading.value = false;
    });
    const LoadingDiv = (
      <div class="bg-white w-screen h-screen flex items-center justify-center">
        <Loading class="w-14 h-14" />
      </div>
    );
    return () => <div>{loading.value ? LoadingDiv : <router-view></router-view>}</div>;
  },
});

export default App;
