export interface IExpense {
	id: string;
	date: Date;
	description: string;
	expenses_type: number;
	currency_sum: number;
	currency: string;
	rate: number;
	country: string;
	region: string;
}

export interface IUpdatedExpense {
	id: string;
	date?: Date;
	description?: string;
	expenses_type?: number;
	currency_sum?: number;
	currency?: string;
	rate?: number;
	country?: string;
	region?: string;
}
