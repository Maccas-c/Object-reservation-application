export const getContent = content =>
  content === null ? 'Nie podano' : content;

export const getActiveDays = days => {
  let activeDaysStringBuilder = 'Dostępność: ';

  days &&
    days.forEach(day => {
      if (day.value) {
        if (day.nameOfDay === 'Mon') {
          activeDaysStringBuilder += ' ' + getDay(day.nameOfDay);
        } else {
          activeDaysStringBuilder += ', ' + getDay(day.nameOfDay);
        }
      }
    });

  return activeDaysStringBuilder;
};

const getDay = day =>
  day === 'Mon'
    ? 'poniedziałek'
    : day === 'Tue'
    ? 'wtorek'
    : day === 'Wed'
    ? 'środa'
    : day === 'Thu'
    ? 'czwartek'
    : day === 'Fri'
    ? 'piątek'
    : day === 'Sat'
    ? 'sobota'
    : 'niedziela';
