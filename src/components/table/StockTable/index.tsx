import { injectStock } from '@/lib/provider/StockProvider';
import Stock from '@/model/Stock';
import { defineComponent, ref } from '@vue/runtime-core';
import IconButton from '@/components/button/IconButton';
import SymbolAddModal from '@/components/modal/SymbolAddModal';
import TableHeader from '../TableHeader';
import Typography from '@/components/common/Typography';

const StockTable = defineComponent({
  setup() {
    const { stockState, stockAction } = injectStock();
    const showAddModal = ref(false);

    const headers = ['Symbol', 'Company', 'Holdings', 'Dividend', 'Months', 'Delete'];

    const openAddModal = () => {
      showAddModal.value = true;
    };
    const closeAddModal = () => {
      showAddModal.value = false;
    };
    const handleAdd = (stock: Stock) => {
      stockState.stocks.push(stock);
      closeAddModal();
    };
    const handleDelete = (stock: Stock) => {
      stockAction.deleteStock(stock);
    };
    return () => (
      <div class="flex flex-col">
        <div class="overflow-auto border border-gray-200 dark:border-gray-900 m-8 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-900 table-auto">
            <TableHeader headers={headers} />
            <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-900">
              <tr>
                <td colspan={6}>
                  <div class="flex justify-center items-center py-2">
                    <IconButton icon="plus" onClick={openAddModal} />
                  </div>
                </td>
              </tr>
              {stockState.stocks.map((stock) => (
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full border border-gray-200 dark:divide-gray-900"
                        src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`}
                        alt=""
                      />
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Typography fontSize="sm" fontWeight="bold">
                      {stock.symbol}
                    </Typography>
                    <Typography fontSize="sm">{stock.company.companyName}</Typography>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Typography fontSize="sm">{stock.holdings}</Typography>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Typography fontSize="sm">{stock.calculateDividend().amount}</Typography>
                    <Typography fontSize="sm">
                      {stock.holdings} x {stock.calculateDividend().amount} = {stock.holdings * stock.calculateDividend().amount}
                    </Typography>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Typography fontSize="sm">{stock.getMonths().join(',')}</Typography>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <IconButton icon="trash" onClick={() => handleDelete(stock)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showAddModal.value && <SymbolAddModal onAdd={handleAdd} onClose={closeAddModal} />}
      </div>
    );
  },
});
export default StockTable;
