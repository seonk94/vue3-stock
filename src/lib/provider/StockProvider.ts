import { inject, provide, reactive } from '@vue/runtime-core';
import Stock from '@/model/Stock';
import firebaseClient from '@/api/firebase';

const StockSymbol = Symbol();

const createContext = (userId: string) => {
  const state = reactive({
    stocks: [] as Stock[],
  });

  const action = {
    fetchStocks: async () => {
      const result: Stock[] = [];
      await firebaseClient.getStockDatum(userId).then((querySnapshot) => {
        querySnapshot.forEach((doc) => result.push(new Stock(doc.data() as StockPropertyType)));
      });
      state.stocks = result;
    },
  };

  action.fetchStocks();

  return {
    stockState: state,
    stockAction: action,
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
