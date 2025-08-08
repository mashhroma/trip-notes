export const countries = {
	russia: "Россия",
	turkey: "Турция",
	georgia: "Грузия",
};

export const countriesOptions = Object.entries(countries).map(
	([value, label]) => {
		return {
			value,
			label,
		};
	}
);
