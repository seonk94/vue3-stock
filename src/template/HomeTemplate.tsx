import StockChart from '@/components/chart/StockChart';
import StockTable from '@/components/table/StockTable';
import { injectStock } from '@/lib/provider/StockProvider';
import { computed, defineComponent } from '@vue/runtime-core';

const HomeTemplate = defineComponent({
  setup() {
    const { stockMethods } = injectStock();
    const filterStocks = computed(() => stockMethods.hasDividendStocks().map((stock) => stock.chartData));
    return () => (
      <div class="container m-auto">
        {filterStocks.value.length > 0 && <StockChart dataSets={filterStocks.value} />}
        <StockTable />
      </div>
    );
  },
});
export default HomeTemplate;
