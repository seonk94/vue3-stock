import FirebaseClient from '@/api/firebase';
import { injectAuth } from '@/lib/provider/AuthProvider';
import { injectClient } from '@/plugins/client';
import { computed, defineComponent, reactive } from '@vue/runtime-core';
import DefaultButton from '../button/DefaultButton';
import SymbolSelector from '../Input/SymbolSelector';

const SymbolAddModal = defineComponent({
  emits: ['close', 'add'],
  setup(props, context) {
    const client = injectClient();
    const { authState } = injectAuth();
    const state = reactive({
      selectSymbol: '',
    });
    const symbolValid = computed(() => state.selectSymbol !== '');
    const handleClose = () => {
      context.emit('close');
    };
    const handleSelectSymbol = (symbol: string) => {
      state.selectSymbol = symbol;
    };
    const handleAdd = async () => {
      if (symbolValid.value && authState.auth) {
        const [companyResponse, dividendResponse] = await Promise.all([
          client.getCompanyInfomation(state.selectSymbol),
          client.getDividends(state.selectSymbol),
        ]);

        const stockDatum = {
          symbol: state.selectSymbol,
          dividend: dividendResponse.data,
          company: companyResponse.data,
          holdings: 1,
        };
        await new FirebaseClient().setStockDatum(authState.auth.uid, stockDatum);
        context.emit('add', stockDatum);
      }
    };
    return () => (
      <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div class="inline-block overflow-visible align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add Stock
                  </h3>
                  <div class="mt-2">
                    <SymbolSelector onSelect={handleSelectSymbol} />
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <DefaultButton disabled={!symbolValid.value} onClick={handleAdd} color="green">
                Add
              </DefaultButton>
              <DefaultButton onClick={handleClose}>Close</DefaultButton>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
export default SymbolAddModal;
