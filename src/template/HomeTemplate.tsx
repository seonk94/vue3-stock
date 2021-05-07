import Appbar from '@/components/navigation/AppBar';
import { defineComponent } from '@vue/runtime-core';

const HomeTemplate = defineComponent({
  setup() {
    return () => (
      <div class="container max-w-full">
        <Appbar />
      </div>
    );
  },
});
export default HomeTemplate;
