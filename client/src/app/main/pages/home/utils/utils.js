export const getActiveDays = day => {
	let activeDaysStringBuilder = 'Dostępność: ';
	if (day === 'Mon') {
		activeDaysStringBuilder += ` ${getDay(day.nameOfDay)}`;
	} else {
		activeDaysStringBuilder += `, ${getDay(day.nameOfDay)}`;
	}

	return activeDaysStringBuilder;
};

export const getDay = day =>
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
