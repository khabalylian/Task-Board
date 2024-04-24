const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const transformTime = (time?: string): string => {
	const date = time ? new Date(time) : new Date();

	const month = months[date.getMonth()];
	const day = date.getDate();
	const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	const minutes = date.getMinutes();
	const period = date.getHours() >= 12 ? 'pm' : 'am';

	const formattedDate = `${month} ${day} at ${hours}:${minutes} ${period}`;

	return formattedDate;
};

const transformStringToDate = (str: string): string => {
	const date = new Date(str);

	// Функція для додавання ведучих нулів до числа, якщо воно менше 10
	const addLeadingZero = (num: number) => {
		return num < 10 ? '0' + num : num;
	};

	// Форматування дати у вимаганий формат "yyyy-mm-ddTHH:MM"
	const formattedDate =
		new Date().getFullYear() +
		'-' +
		addLeadingZero(date.getMonth() + 1) +
		'-' +
		addLeadingZero(date.getDate()) +
		'T' +
		addLeadingZero(date.getHours()) +
		':' +
		addLeadingZero(date.getMinutes());

	return formattedDate;
};

export { transformTime, transformStringToDate };
