import Appbar from '@/components/navigation/AppBar';
import { defineComponent } from '@vue/runtime-core';

const AppLayout = defineComponent({
  setup() {
    return () => (
      <div class="container max-w-full h-screen">
        <Appbar />
        <router-view />
      </div>
    );
  },
});
export default AppLayout;
