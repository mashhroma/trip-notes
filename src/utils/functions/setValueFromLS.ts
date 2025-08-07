/* eslint-disable @typescript-eslint/no-explicit-any */
export const setValueFromLS = (key: string, setValue: (value: any) => void) => {
	const valueFromLS = localStorage.getItem(key);
	if (valueFromLS) {
		const value = valueFromLS.toString();
		if (Number.isInteger(value)) {
			setValue(+value);
		} else {
			setValue(value);
		}
	}
};
