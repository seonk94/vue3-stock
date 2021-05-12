export const calculationDividend = (dividends: IexDividend[]) => {
  if (dividends.length === 0)
    return {
      amount: 0,
      months: [],
    };
  const latestDividend = dividends[0];
  return {
    amount: Number(latestDividend.amount),
    frequency: latestDividend.frequency,
    months: getMonths(dividends),
  };
};

export const getMonths = (dividends: IexDividend[]) => {
  if (dividends.length === 0) return [];
  const latestDividend = dividends[0];
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
};
