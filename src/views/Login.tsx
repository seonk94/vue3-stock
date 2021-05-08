import { GoogleProvider } from '@/lib/firebase';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { defineComponent, onMounted } from 'vue';
const Login = defineComponent({
  setup() {
    function initFirebase() {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      const uiConfig = {
        signInSuccessUrl: '/home',
        signInOptions: [GoogleProvider],
      };
      ui.start('#firebaseui-auth-container', uiConfig);
    }

    onMounted(() => {
      initFirebase();
    });

    return () => (
      <div class="container mx-auto h-screen">
        <div class="flex flex-col h-full max-w-sm mx-auto">
          <div class="block py-4">
            <h3 class="text-3xl font-bold pb-4">Login</h3>
            <div>
              <section id="firebaseui-auth-container"></section>
            </div>
          </div>
          <div class="flex-grow" />
          <div class="block py-4 text-center">
            <h6 class="text-sm">buba @</h6>
          </div>
        </div>
      </div>
    );
  },
});
export default Login;
