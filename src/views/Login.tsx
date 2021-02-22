import { defineComponent } from "vue";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default defineComponent({
  setup() {
    function initFirebase() {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      const uiConfig = {
        signInSuccessUrl: "/",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ]
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    }

    initFirebase();
    return () => (
      <div class="container is-fluid">
        <div class="columns is-centered">
          <section class="section">
            <h1 class="title">Login</h1>
            <section id="firebaseui-auth-container"></section>
          </section>
        </div>
      </div>
    );
  }
});
