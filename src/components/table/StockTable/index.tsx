import { injectStock } from '@/lib/provider/StockProvider';
import Stock from '@/model/Stock';
import { defineComponent, ref } from '@vue/runtime-core';
import IconButton from '@/components/button/IconButton';
import SymbolAddModal from '@/components/modal/SymbolAddModal';
import StockTableHeader from './StockTableHeader';

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
        <div class="overflow-auto border border-gray-300 m-8 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 table-auto">
            <StockTableHeader headers={headers} />
            <tbody class="bg-white divide-y divide-gray-200">
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
                        class="h-10 w-10 rounded-full border border-gray-300"
                        src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`}
                        alt=""
                      />
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 font-bold">{stock.symbol}</div>
                    <div class="text-sm text-gray-500">{stock.company.companyName}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{stock.holdings}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{stock.calculateDividend().amount}</div>
                    <div class="text-sm text-gray-900">
                      {stock.holdings} x {stock.calculateDividend().amount} = {stock.holdings * stock.calculateDividend().amount}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{stock.getMonths().join(',')}</div>
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
