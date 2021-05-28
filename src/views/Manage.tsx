import { provideStock } from '@/lib/provider/StockProvider';
import { provideSymbol } from '@/lib/provider/SymbolProvider';
import HomeTemplate from '@/template/HomeTemplate';
import { defineComponent } from '@vue/runtime-core';

const Manage = defineComponent({
  setup() {
    provideStock();
    provideSymbol();

    return () => <HomeTemplate />;
  },
});
export default Manage;
