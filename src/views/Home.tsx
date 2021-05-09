import { injectAuth } from '@/lib/provider/AuthProvider';
import { provideStock } from '@/lib/provider/StockProvider';
import { provideSymbol } from '@/lib/provider/SymbolProvider';
import HomeTemplate from '@/template/HomeTemplate';
import { defineComponent } from '@vue/runtime-core';

const Home = defineComponent({
  setup() {
    const { authState } = injectAuth();

    provideStock((authState.auth as firebase.User).uid);
    provideSymbol();

    return () => <HomeTemplate />;
  },
});
export default Home;
