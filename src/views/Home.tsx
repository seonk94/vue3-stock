import { injectAuth } from '@/lib/provider/AuthProvider';
import { provideStock } from '@/lib/provider/StockProvider';
import HomeTemplate from '@/template/HomeTemplate';
import { defineComponent } from '@vue/runtime-core';

const Home = defineComponent({
  setup() {
    const { authState } = injectAuth();

    provideStock((authState.auth as firebase.User).uid);

    return () => <HomeTemplate />;
  },
});
export default Home;
