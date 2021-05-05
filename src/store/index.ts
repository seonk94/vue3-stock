import Vuex, { GetterTree, MutationTree, ActionTree, ModuleTree, createStore } from 'vuex';
import user from '@/store/module/user';
import stock from '@/store/module/stock';
import { IRootState } from '@/@types';

export const state: IRootState = {
  token: '',
  loading: true,
};

export const getters: GetterTree<IRootState, IRootState> = {};

export const mutations: MutationTree<IRootState> = {
  setLoading(state, value) {
    state.loading = value;
  },
};

export const actions: ActionTree<IRootState, IRootState> = {};

export const modules: ModuleTree<IRootState> = {
  user,
  stock,
};

export const store = createStore({
  state,
  mutations,
  actions,
  modules,
});
