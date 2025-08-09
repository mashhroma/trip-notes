import { IExpense } from "@/interfaces/expenses-interfaces";

export const getSumByType = (expenses: IExpense[], type: number) => {
	return expenses.reduce(
		(sum: number, expense: IExpense) =>
			expense.expenses_type === type
				? sum + expense.currency_sum * expense.rate
				: sum + 0,
		0
	);
};
