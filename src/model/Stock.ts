export default class Stock {
  _symbol: string;
  _holdings = 0;
  _dividend: IexDividend[] = [];
  _company: IexCompany;

  constructor(init: StockPropertyType) {
    Object.assign(this, init);
  }

  get symbol() {
    return this._symbol;
  }
  set symbol(symbol: string) {
    this._symbol = symbol;
  }
  get holdings() {
    return this._holdings;
  }
  set holdings(holdings: number) {
    this._holdings = holdings;
  }
  get dividend() {
    return this._dividend;
  }
  set dividend(dividend: IexDividend[]) {
    this._dividend = dividend;
  }
  get company() {
    return this._company;
  }
  set company(company: IexCompany) {
    this._company = company;
  }

  public calculateDividend() {
    if (this._dividend.length === 0)
      return {
        amount: 0,
        months: [],
      };
    const latestDividend = this._dividend[0];
    return {
      amount: Number(latestDividend.amount),
      frequency: latestDividend.frequency,
    };
  }
  public getMonths() {
    if (this._dividend.length === 0) return [];
    const latestDividend = this._dividend[0];
    if (latestDividend.frequency === 'monthly') {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    } else if (latestDividend.frequency === 'quarterly') {
      const month = new Date(latestDividend.date).getMonth() + 1;
      const monthList = [
        [1, 4, 7, 10],
        [2, 5, 8, 11],
        [3, 6, 9, 12],
      ];
      return monthList.find((arr) => arr.includes(month)) as number[];
    }
    return [];
  }
}
