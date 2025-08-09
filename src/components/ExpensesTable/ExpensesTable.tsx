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
import { getSumByType } from "@/utils/functions/getSumByType";

const ExpensesTable = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);
	const [expensesTypes, setExpensesTypes] = useState<Option[]>([]);
	const [isOpenCreateNewExpense, setIsOpenCreateNewExpense] =
		useState<boolean>(false);
	const [isOpenExpensesTypes, setIsExpensesTypes] = useState<boolean>(false);

	const sum = expenses.reduce(
		(acc: number, expense) => acc + expense.currency_sum * expense.rate,
		0
	);

	const expensesTypesWithSum = expensesTypes
		.map((type) => {
			return {
				...type,
				sum: getSumByType(expenses, +type.value),
			};
		})
		.filter((type) => type.sum > 0);

	const getExpenses = () => {
		expensesApi.getAllExpenses().then((res) => {
			const data: IExpense[] = res.data.sort(
				(a: IExpense, b: IExpense) =>
					new Date(b.date).getTime() - new Date(a.date).getTime()
			);
			setExpenses(data);
		});
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
			<header className={styles.titleBlock}>
				<div
					className={styles.title}
					onClick={() => setIsExpensesTypes(!isOpenExpensesTypes)}
				>
					<div>Расходы</div> <div>{getPrettyNumberStringFormat(sum)}</div>
				</div>
				{isOpenExpensesTypes && (
					<div>
						{expensesTypesWithSum.map((type) => (
							<div className={styles.expenseType} key={type.value}>
								<div>{type.label}</div>
								<div>{getPrettyNumberStringFormat(type.sum)}</div>
							</div>
						))}
					</div>
				)}
			</header>

			<div className={styles.addButtonBlock}>
				<Button
					label="НОВЫЙ РАСХОД"
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
