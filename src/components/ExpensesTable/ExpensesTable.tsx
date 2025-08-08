import { IExpense } from "@/interfaces/expenses-interfaces";
import { headers } from "@/utils/consts/headers-expenses";
import React, { useEffect, useState } from "react";
import styles from "./ExpensesTable.module.scss";
import { currencies } from "@/utils/consts/currencies";
import { getValueByKey } from "@/utils/functions/getValueByKey";
import { countries } from "@/utils/consts/countries";
import { getPrettyNumberStringFormat } from "@/utils/functions/getPrettyNumberStringFormat";
import CreateNewExpenseWindow from "../CreateNewExpenseWindow";
import { CgRemove } from "react-icons/cg";
import expensesApi from "@/services/expenses";
import axios from "axios";
import { BASE_API_URL } from "@/utils/consts/API";

const ExpensesTable = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);
	const [expensesTypes, setExpensesTypes] = useState<string[]>([]);
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

	const getInfo = (expense: IExpense, value: string) => {
		if (value === "rubble_sum") {
			return (
				<div className={styles.numberCell} title={getSumInfo(expense)}>
					{getPrettyNumberStringFormat(expense.currency_sum * expense.rate)}
				</div>
			);
		} else if (value == "description") {
			return <div className={styles.textCell}>{expense.description}</div>;
		} else if (value == "expenses_type") {
			return (
				<div className={styles.textCell}>
					{expensesTypes[expense.expenses_type]}
				</div>
			);
		} else if (value == "country") {
			return (
				<div className={styles.cell}>
					{getValueByKey(countries, expense.country)}
				</div>
			);
		} else if (value == "region") {
			return <div className={styles.textCell}>{expense.region}</div>;
		} else if (value == "delete") {
			return (
				<div
					className={styles.textCellDelete}
					onClick={() => deleteExpense(expense)}
					title="Удалить"
				>
					<CgRemove />
				</div>
			);
		} else
			return (
				<div className={styles.cell}>{expense[value as keyof IExpense]}</div>
			);
	};

	const getSumInfo = (expense: IExpense) => {
		return expense.currency === "rub"
			? "Оплачено в рублях"
			: `Оплата в валюте: ${getValueByKey(
					currencies,
					expense.currency
			  )} по курсу: ${expense.rate}`;
	};

	const openCreateNewExpenseWindow = () => {
		setIsOpenCreateNewExpense(true);
	};

	const deleteExpense = (expense: IExpense) => {
		expensesApi
			.deleteExpense(expense.id)
			.then(() => getExpenses())
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<h1 className={styles.titleBlock}>
				<div>Затраты</div> <div>{getPrettyNumberStringFormat(sum)}</div>
			</h1>

			<div className={styles.addButtonBlock}>
				<button
					className={styles.addButton}
					onClick={openCreateNewExpenseWindow}
				>
					Новый расход +
				</button>
			</div>

			<ul className={styles.table}>
				<li className={styles.row}>
					{headers.map((header) => (
						<div className={styles.cell} key={header.value}>
							{header.title}
						</div>
					))}
				</li>
				{expenses.map((expense, i) => (
					<li className={styles.row} key={expense.id}>
						{headers.map((header) => (
							<React.Fragment key={i + header.value}>
								{getInfo(expense, header.value)}
							</React.Fragment>
						))}
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
