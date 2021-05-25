export default class Stock {
  public symbol: string;
  public holdings = 0;
  public dividend: IexDividend[] = [];
  public company: IexCompany;

  constructor(init: StockPropertyType) {
    Object.assign(this, init);
  }

  get months() {
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

  get amount() {
    if (this.dividend.length === 0) return 0;
    const latestDividend = this.dividend[0];
    return Number(latestDividend.amount);
  }

  get frequency() {
    if (this.dividend.length === 0) return null;
    const latestDividend = this.dividend[0];
    return latestDividend.frequency;
  }

  get chartData() {
    const data = Array.from({ length: 12 }, () => 0);
    const color = Math.floor(Math.random() * 16777215).toString(16);
    const amount = this.amount;

    this.months.forEach((month) => {
      data[month - 1] = amount;
    });
    return {
      data,
      label: this.symbol,
      backgroundColor: `#${color}aa`,
    };
  }
}
