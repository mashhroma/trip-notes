import { IExpense, IUpdatedExpense } from "@/interfaces/expenses-interfaces";
import { instance } from "./axios";
import { BASE_API_URL } from "@/utils/consts/API";

const expensesApi = {
	getAllExpenses() {
		return instance.get(BASE_API_URL);
	},
	getExpense(id: string) {
		return instance.get(`${BASE_API_URL}${id}`);
	},
	createExpense(expense: IExpense) {
		return instance.post(`${BASE_API_URL}`, expense);
	},
	updateExpense(expense: IUpdatedExpense) {
		return instance.put(`${BASE_API_URL}${expense.id}`, expense);
	},
	deleteExpense(id: string) {
		return instance.delete(`${BASE_API_URL}${id}`);
	},
};

export default expensesApi;
