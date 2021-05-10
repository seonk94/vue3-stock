import { App } from 'vue';
import axios, { AxiosError } from 'axios';
import IexApi from '@/api/IexApi';

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
  const axios = createAxios();
  const client = IexApi(axios);
  if (!client) throw new Error('Use Client Error');

  return client;
}

export default {
  install: (app: App) => {
    const client = injectClient();
    app.config.globalProperties.$client = client;
  },
};
