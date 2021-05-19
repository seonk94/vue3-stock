import firebaseClient from '@/api/firebase';
import { injectAuth } from '@/lib/provider/AuthProvider';
import Stock from '@/model/Stock';
import { injectClient } from '@/plugins/client';
import { computed, defineComponent, reactive } from '@vue/runtime-core';
import DefaultInput from '../Input/DefaultInput';
import SymbolSelector from '../Input/SymbolSelector';
import ModalContainer from './ModalContainer';

const SymbolAddModal = defineComponent({
  emits: ['close', 'add'],
  setup(props, context) {
    const client = injectClient();
    const { authState } = injectAuth();
    const state = reactive({
      selectSymbol: '',
      holdings: 1,
    });
    const addValid = computed(() => {
      const isValidSymbol = state.selectSymbol !== '';
      const isValidHoldings = state.holdings > 0;
      return isValidHoldings && isValidSymbol;
    });
    const handleClose = () => {
      context.emit('close');
    };
    const handleSelectSymbol = (symbol: string) => {
      state.selectSymbol = symbol;
    };
    const handleHoldings = (value: number) => {
      state.holdings = value;
    };
    const combineStock = async () => {
      const [companyResponse, dividendResponse] = await Promise.all([
        client.getCompanyInfomation(state.selectSymbol),
        client.getDividends(state.selectSymbol),
      ]);

      return {
        symbol: state.selectSymbol,
        dividend: dividendResponse.data,
        company: companyResponse.data,
        holdings: state.holdings,
      };
    };
    const handleAdd = async () => {
      if (addValid.value && authState.auth) {
        const stockDatum = await combineStock();
        await firebaseClient.setStockDatum(stockDatum);
        context.emit('add', new Stock(stockDatum));
      }
    };
    return () => (
      <ModalContainer successValid={addValid.value} onClose={handleClose} onSuccess={async () => handleAdd()}>
        {{
          body: () => (
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Add Stock
              </h3>
              <div class="mt-2">
                <SymbolSelector onSelect={handleSelectSymbol} />
              </div>
              <div class="mt-2">
                <DefaultInput placeholder="holdings" value={state.holdings} onUpdate={handleHoldings} />
              </div>
            </div>
          ),
        }}
      </ModalContainer>
    );
  },
});
export default SymbolAddModal;
