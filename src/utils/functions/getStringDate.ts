export const getStringDate = (date: Date) => {
	const day = date.getDate(),
		month = date.getMonth() + 1,
		year = date.getFullYear();

	return `${year}-${month}-${day}`;
};

export const getNewDate = (newDate: string) => {
	const [year, month, day] = newDate;
	return `${day}.${month}.${year}`;
};
