export interface IExpense {
	id: number;
	date: string;
	description: string;
	expenses_type: number;
	currency_sum: number;
	currency: string;
	rate: number;
	country: string;
	region: string;
}
