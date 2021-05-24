import StockChart from '@/components/chart/StockChart';
import StockTable from '@/components/table/StockTable';
import { injectStock } from '@/lib/provider/StockProvider';
import { computed, defineComponent } from '@vue/runtime-core';

const HomeTemplate = defineComponent({
  setup() {
    const { stockState } = injectStock();
    const filterStocks = computed(() => stockState.stocks.filter((stock) => !!stock.frequency));
    return () => (
      <div class="container m-auto">
        {stockState.stocks.length > 0 && <StockChart stocks={filterStocks.value} />}
        <StockTable />
      </div>
    );
  },
});
export default HomeTemplate;
