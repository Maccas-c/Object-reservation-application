export const getDay = number =>
	number === 1
		? 'Mon'
		: number === 2
		? 'Tue'
		: number === 3
		? 'Wed'
		: number === 4
		? 'Thu'
		: number === 5
		? 'Fri'
		: number === 6
		? 'Sat'
		: 'Sun';
