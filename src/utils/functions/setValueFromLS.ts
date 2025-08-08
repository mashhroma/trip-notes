/* eslint-disable @typescript-eslint/no-explicit-any */
export const setValueFromLS = (key: string, setValue: (value: any) => void) => {
	const valueFromLS = localStorage.getItem(key);
	if (valueFromLS) {
		try {
			const value = JSON.parse(valueFromLS);
			setValue(value);
		} catch (error) {
			console.log(error);
			setValue(valueFromLS.toString());
		}
	}
};
