export default class Stock {
  public symbol: string;
  public holdings = 0;
  public dividend: IexDividend[] = [];
  public company: IexCompany;

  constructor(init: StockPropertyType) {
    Object.assign(this, init);
  }

  public calculateDividend() {
    if (this.dividend.length === 0)
      return {
        amount: 0,
        frequency: null,
      };
    const latestDividend = this.dividend[0];
    return {
      amount: Number(latestDividend.amount),
      frequency: latestDividend.frequency,
    };
  }
  public getMonths() {
    if (this.dividend.length === 0) return [];
    const latestDividend = this.dividend[0];
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
