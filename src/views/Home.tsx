import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    HelloWorld
  },
  setup() {
    return () => (
      <div class="home">
        <img alt="Vue logo" src={require("../assets/logo.png")} />
        <HelloWorld />
      </div>
    );
  }
});
