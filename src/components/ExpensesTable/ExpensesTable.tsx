import { IExpense } from "@/interfaces/expenses-interfaces";
import { headers } from "@/utils/consts/headers-expenses";
import React, { useEffect, useState } from "react";
import styles from "./ExpensesTable.module.scss";
import { getPrettyNumberStringFormat } from "@/utils/functions/getPrettyNumberStringFormat";
import CreateNewExpenseWindow from "../CreateNewExpenseWindow";
import expensesApi from "@/services/expenses";
import { Option } from "@/interfaces/option-interfaces";
import Button from "../ui-kit/Button";
import Expense from "../Expense/Expense";

const ExpensesTable = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);
	const [expensesTypes, setExpensesTypes] = useState<Option[]>([]);
	const [isOpenCreateNewExpense, setIsOpenCreateNewExpense] =
		useState<boolean>(false);

	const sum = expenses.reduce(
		(acc: number, expense) => acc + expense.currency_sum * expense.rate,
		0
	);

	const getExpenses = () => {
		expensesApi.getAllExpenses().then((res) => setExpenses(res.data));
	};
	const getExpensesTypes = () => {
		fetch("/api/expensesType")
			.then((res) => res.json())
			.then((data) => setExpensesTypes(data));
	};

	useEffect(() => {
		getExpenses();
		getExpensesTypes();
	}, []);

	const openCreateNewExpenseWindow = () => {
		setIsOpenCreateNewExpense(true);
	};

	return (
		<div>
			<h1 className={styles.titleBlock}>
				<div>Затраты</div> <div>{getPrettyNumberStringFormat(sum)}</div>
			</h1>

			<div className={styles.addButtonBlock}>
				<Button
					label="Новый расход +"
					onClick={openCreateNewExpenseWindow}
					size="large"
					classBtn="secondary"
				/>
			</div>

			<ul className={styles.table}>
				<li className={styles.header}>
					{headers.map((header) => (
						<div className={styles.cell} key={header.value}>
							{header.title}
						</div>
					))}
				</li>
				{expenses.map((expense) => (
					<li key={expense.id}>
						<Expense
							expense={expense}
							expensesTypes={expensesTypes}
							getExpenses={getExpenses}
						/>
					</li>
				))}
			</ul>

			{isOpenCreateNewExpense && (
				<CreateNewExpenseWindow
					setIsOpenCreateNewExpense={setIsOpenCreateNewExpense}
					expensesTypes={expensesTypes}
					getExpenses={getExpenses}
					expenses={expenses}
				/>
			)}
		</div>
	);
};

export default ExpensesTable;
