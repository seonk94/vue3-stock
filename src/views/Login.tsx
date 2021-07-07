import RoatateDollar from '@/components/common/RotateDollar';
import { GoogleProvider } from '@/lib/firebase';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { defineComponent, onMounted } from 'vue';
const Login = defineComponent({
  setup() {
    const dollars = (function () {
      const width = document.body.offsetWidth;
      const length = width / 40;

      return Array.from({ length }, (_, i) => i).map((i) => {
        const duration = `${Math.floor(Math.random() * 11) + 10}s`;
        const rotateDuration = `${Math.floor(Math.random() * 2) + 4}s`;
        const delay = `${Math.floor(Math.random() * 11)}s`;
        const left = `${i * 50}px`;
        return <RoatateDollar left={left} duration={duration} delay={delay} rotateDuration={rotateDuration} />;
      });
    })();

    function initFirebase() {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }

      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/manage',
        signInOptions: [GoogleProvider],
      });
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
            <h6 class="text-sm">buba @ dividends-info</h6>
          </div>
        </div>
        {dollars.map((image) => image)}
      </div>
    );
  },
});
export default Login;
