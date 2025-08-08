export const currencies = {
	rub: "RUB",
	lari: "GEL",
	lira: "TRY",
	euro: "EUR",
	dollar: "USD",
};

export const currenciesOptions = Object.entries(currencies).map(
	([value, label]) => {
		return {
			value,
			label,
		};
	}
);
