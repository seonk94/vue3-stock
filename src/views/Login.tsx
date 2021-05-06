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
        signInSuccessUrl: '/',
        signInOptions: [GoogleProvider],
      };
      ui.start('#firebaseui-auth-container', uiConfig);
    }

    onMounted(() => {
      initFirebase();
    });

    return () => (
      <div class="container" style={{ height: '100vh' }}>
        <div class="columns is-centered fill-height">
          <div class="columns is-flex-direction-column">
            <div class="block pa-4">
              <h3 class="title is-3">Login</h3>
              <div>
                <section id="firebaseui-auth-container"></section>
              </div>
            </div>
            <div class="block spacer" />
            <div class="block py-2 has-text-centered">
              <h6 class="subtitle is-6">buba.</h6>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
export default Login;
