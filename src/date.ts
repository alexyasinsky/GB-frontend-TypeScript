const now = new Date();
const lastDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
const dayAfterTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);

export const nowDateString : string = dateFormatter(now, '-');

export const lastDayOfNextMonthDateString : string = dateFormatter(lastDayOfNextMonth, '-');

export const dayAfterTomorrowDateString = dateFormatter(dayAfterTomorrow, '-');

function dateFormatter(date, separator) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }

  return `${year}${separator}${month}${separator}${day}`;
}
