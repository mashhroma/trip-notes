import { getStringDate } from "./getStringDate";

export const getRusFormattedDate = (date: Date) => {
	const stringDate = getStringDate(date, ".").split(".").reverse().join(".");
	return stringDate;
};
