import { AxiosResponse, AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => {
  return {
    getCompanyInfomation(symbol: string): Promise<AxiosResponse<IexCompany>> {
      return axios.get(`stock/${symbol}/company?token=${process.env.VUE_APP_IEX_API_TOKEN}`);
    },

    getStockLogo(symbol: string): Promise<AxiosResponse<{ url: string }>> {
      return axios.get(`stock/${symbol}/logo?token=${process.env.VUE_APP_IEX_API_TOKEN}`);
    },

    getSymbolList(): Promise<AxiosResponse<IexSymbol[]>> {
      return axios.get(`ref-data/symbols?token=${process.env.VUE_APP_IEX_API_TOKEN}`);
    },

    getDividends(symbol: string): Promise<AxiosResponse<IexDividend[]>> {
      return axios.get(`stock/${symbol}/dividends/1y?token=${process.env.VUE_APP_IEX_API_TOKEN}`);
    },

    getEarnings(symbol: string, period: 'annual' | 'quarter' = 'quarter'): Promise<AxiosResponse<IexEarning[]>> {
      return axios.get(`stock/${symbol}/earnings/`, {
        params: {
          period,
        },
      });
    },

    getPreviousPrive(symbol: string): Promise<AxiosResponse<IexPreviousPrice>> {
      return axios.get(`stock/${symbol}/previous?token=${process.env.VUE_APP_IEX_API_TOKEN}`);
    },
  };
};
