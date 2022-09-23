const now : Date = new Date();

export const currentDate : string = now.toLocaleDateString('en-ca');

export const lastDayOfNextMonthDate : string = new Date(now.getFullYear(), now.getMonth() + 2, 0).toLocaleDateString('en-ca');
