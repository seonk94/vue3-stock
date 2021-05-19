import firebaseClient from '@/api/firebase';
import Appbar from '@/components/navigation/AppBar';
import { injectAuth } from '@/lib/provider/AuthProvider';
import { defineComponent } from '@vue/runtime-core';

const AppLayout = defineComponent({
  setup() {
    const { authState } = injectAuth();

    const initFirebaseClient = () => {
      if (authState.auth) {
        firebaseClient.setId(authState.auth.uid);
      } else {
        throw Error('Firebase Client Init Error!');
      }
    };
    initFirebaseClient();
    return () => (
      <div class="container max-w-full h-screen">
        <Appbar />
        <router-view />
      </div>
    );
  },
});
export default AppLayout;
