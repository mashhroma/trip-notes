export const getPrettyNumberStringFormat = (wholeNumber: number) => {
	const [integerPart, decimalPart] = wholeNumber.toString().split(".");
	const formatInteger = integerPart
		.split("")
		.reverse()
		.map((num, i) => ((i + 1) % 3 === 0 ? " " + num : num))
		.reverse()
		.join("");

	const formatDecimal = decimalPart?.slice(0, 2);

	return formatInteger + "," + (formatDecimal ?? "00");
};
