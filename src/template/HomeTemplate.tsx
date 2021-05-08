import StockTable from '@/components/table/StockTable';
import { injectStock } from '@/lib/provider/StockProvider';
import { defineComponent } from '@vue/runtime-core';

const HomeTemplate = defineComponent({
  setup() {
    const { stockState } = injectStock();
    return () => (
      <div class="sm:container m-auto">
        <StockTable stocks={stockState.stocks} />
      </div>
    );
  },
});
export default HomeTemplate;
