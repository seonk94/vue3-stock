interface StockPropertyType {
  symbol: string;
  holdings: number;
  dividend: IexDividend[];
  company: IexCompany;
}
