export const getStringDate = (date: Date) => {
	let day: number | string = date.getDate(),
		month: number | string = date.getMonth() + 1;
	const year = date.getFullYear();

	day = day > 10 ? `${day}` : "0" + day;
	month = month > 10 ? `${month}` : "0" + month;

	return `${year}-${month}-${day}`;
};

export const getNewDate = (newDate: string) => {
	const [year, month, day] = newDate.split("-");
	return `${day}.${month}.${year}`;
};
