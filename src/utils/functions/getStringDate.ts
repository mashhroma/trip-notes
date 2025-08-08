export const getStringDate = (date: Date, delimiter?: "-" | ".") => {
	const year = date.getFullYear();
	const month = ("0" + (date.getMonth() + 1)).slice(-2);
	const day = ("0" + date.getDate()).slice(-2);

	return delimiter
		? year + delimiter + month + delimiter + day
		: year + month + day;
};
