import { injectStock } from '@/lib/provider/StockProvider';
import Stock from '@/model/Stock';
import { defineComponent, ref } from '@vue/runtime-core';
import IconButton from '../button/IconButton';
import SymbolAddModal from '../modal/SymbolAddModal';

const StockTable = defineComponent({
  setup() {
    const { stockState } = injectStock();
    const showAddModal = ref(false);

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
    return () => (
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Logo
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Holdings
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dividend
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Months
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td colspan={6}>
                      <div class="flex justify-center items-center py-2">
                        <IconButton icon="plus" color="green" onClick={openAddModal} />
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
                          {stock.holdings} x {stock.calculateDividend().amount} ={' '}
                          {stock.holdings * stock.calculateDividend().amount}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{stock.getMonths().join(',')}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" class="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showAddModal.value && <SymbolAddModal onAdd={handleAdd} onClose={closeAddModal} />}
      </div>
    );
  },
});
export default StockTable;
