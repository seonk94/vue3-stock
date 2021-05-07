interface StockDatum {
  symbol: string;
  holdings: number;
  dividend: IexDividend[];
  company: IexCompany;
}
