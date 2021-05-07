import { inject, provide, reactive } from '@vue/runtime-core';
import FirebaseClient from '@/api/firebase';

const StockSymbol = Symbol();

const createContext = (userId: string) => {
  const state = reactive({
    stocks: [] as StockDatum[],
  });

  const action = {
    fetchStocks: async () => {
      const result: StockDatum[] = [];
      await new FirebaseClient().getStockDatum(userId).then((querySnapshot) => {
        querySnapshot.forEach((doc) => result.push(doc.data() as StockDatum));
      });
      state.stocks = result;
    },
  };

  action.fetchStocks();

  return {
    authState: state,
    authAction: action,
  };
};

export const provideStock = (userId: string) => {
  const context = createContext(userId);
  provide(StockSymbol, context);
};

export const injectStock = () => {
  const context = inject(StockSymbol) as ReturnType<typeof createContext>;
  if (!context) throw Error('inject stock error');
  return context;
};
