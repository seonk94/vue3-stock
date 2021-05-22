import StockTable from '@/components/table/StockTable';
import { defineComponent } from '@vue/runtime-core';

const HomeTemplate = defineComponent({
  setup() {
    return () => (
      <div class="container m-auto">
        <StockTable />
      </div>
    );
  },
});
export default HomeTemplate;
