import { App, inject } from 'vue';
import axios, { AxiosError } from 'axios';
import IexApi from '@/api/IexApi';

const AxiosSymbol = Symbol();
export const createAxios = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_IEX_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      const messages: string[] = (error.response?.data.messages || []).map((err: AxiosError) => err.message);
      alert(messages.join(''));
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export function injectClient() {
  const client = inject(AxiosSymbol) as ReturnType<typeof IexApi>;
  if (!client) throw new Error('Use Client Error');
  return client;
}

export default {
  install: (app: App) => {
    const axios = createAxios();
    app.provide(AxiosSymbol, IexApi(axios));
    app.config.globalProperties.$client = IexApi(axios);
  },
};
