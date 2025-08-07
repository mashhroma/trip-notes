export function getValueByKey<T extends Object>(
	obj: T,
	key: string | number
): string {
	const stringKey = typeof key === "number" ? key.toString() : key;

	return stringKey in obj ? String(obj[stringKey as keyof T]) : "";
}
