import { inject, provide, reactive } from '@vue/runtime-core';
import { injectClient } from '@/plugins/client';

const SymbolSymbol = Symbol();

const createContext = () => {
  const client = injectClient();
  const state = reactive({
    symbols: [] as IexSymbol[],
  });

  const action = {
    fetchSymbols: async () => {
      const result = await client.getSymbolList();
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
