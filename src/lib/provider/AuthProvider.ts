import { App } from 'vue';
import { inject, provide, reactive } from '@vue/runtime-core';

type NullableUser = firebase.User | null;

const AuthSymbol = Symbol();

const createContext = () => {
  const state = reactive({
    auth: null as NullableUser,
  });

  const action = {
    setAuth: (auth: NullableUser) => {
      state.auth = auth;
    },
  };

  return {
    authState: state,
    authAction: action,
  };
};

export const provideAuth = () => {
  const context = createContext();
  provide(AuthSymbol, context);
};

export const injectAuth = () => {
  const context = inject(AuthSymbol) as ReturnType<typeof createContext>;
  if (!context) throw Error('inject auth error');
  return context;
};

export default {
  install: (app: App) => {
    const context = createContext();
    app.provide(AuthSymbol, context);
    app.config.globalProperties.$auth = context;
  },
};
