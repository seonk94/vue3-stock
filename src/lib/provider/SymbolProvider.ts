import { inject, provide, reactive } from '@vue/runtime-core';
import IexCloudClient from '@/api/IexCloud';

const SymbolSymbol = Symbol();

const createContext = () => {
  const state = reactive({
    symbols: [] as IexSymbol[],
  });

  const action = {
    fetchSymbols: async () => {
      const result = await new IexCloudClient(process.env.VUE_APP_IEX_API_TOKEN).getSymbolList();
      state.symbols = result.data;
    },
  };

  action.fetchSymbols();

  return {
    symbolState: state,
    symbolAction: action,
  };
};

export const provideSymbol = () => {
  const context = createContext();
  provide(SymbolSymbol, context);
};

export const injectSymbol = () => {
  const context = inject(SymbolSymbol) as ReturnType<typeof createContext>;
  if (!context) throw Error('inject symbol error');
  return context;
};
