import { IExpense } from "@/interfaces/expenses-interfaces";
import expensesApi from "@/services/expenses";
import { currencies } from "@/utils/consts/currencies";
import { headers } from "@/utils/consts/headers-expenses";
import { getPrettyNumberStringFormat } from "@/utils/functions/getPrettyNumberStringFormat";
import { getRusFormattedDate } from "@/utils/functions/getRusFormattedDate";
import { getValueByKey } from "@/utils/functions/getValueByKey";
import React, { useState } from "react";
import styles from "./Expense.module.scss";
import { countries } from "@/utils/consts/countries";
import { CgRemove } from "react-icons/cg";
import { Option } from "@/interfaces/option-interfaces";
import { CgEditMarkup } from "react-icons/cg";

const Expense = ({
	expense,
	expensesTypes,
	getExpenses,
}: {
	expense: IExpense;
	expensesTypes: Option[];
	getExpenses: () => void;
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const getSumInfo = (expense: IExpense) => {
		return expense.currency === "rub"
			? "Оплачено в рублях"
			: `Оплата в валюте: ${getValueByKey(
					currencies,
					expense.currency
			  )} по курсу: ${expense.rate}`;
	};

	const deleteExpense = (expense: IExpense) => {
		const isConfirm = confirm("Вы уверены, что хотите удалить эту строку?");
		if (isConfirm) {
			expensesApi
				.deleteExpense(expense.id)
				.then(() => getExpenses())
				.catch((error) => console.log(error));
		}
	};

	const getInfo = (expense: IExpense, value: string) => {
		if (value === "date") {
			return (
				<div className={styles.cellDate}>
					{getRusFormattedDate(new Date(expense.date))}
				</div>
			);
		} else if (value === "rubble_sum") {
			return (
				<div className={styles.numberCell} title={getSumInfo(expense)}>
					{getPrettyNumberStringFormat(expense.currency_sum * expense.rate)}
				</div>
			);
		} else if (value == "description") {
			return <div className={styles.textCell}>{expense.description}</div>;
		} else if (value == "expenses_type") {
			const expensesType = expensesTypes.find(
				(expensesType) => +expensesType.value === +expense.expenses_type
			);
			return <div className={styles.textCell}>{expensesType?.label}</div>;
		}
	};

	return (
		<div className={isOpen ? styles.block : undefined}>
			<div className={styles.row} onClick={() => setIsOpen(!isOpen)}>
				{headers.map((header) => (
					<React.Fragment key={expense.id + header.value}>
						{getInfo(expense, header.value)}
					</React.Fragment>
				))}
			</div>
			{isOpen && (
				<div className={styles.fullInfo}>
					<div>
						<h2>{expense.description}</h2>
						<div>Страна: {getValueByKey(countries, expense.country)}</div>
						<div>Регион: {expense.region}</div>
						<div>Сумма: {expense.currency_sum}</div>
						<div>
							Оплачено в валюте: {getValueByKey(currencies, expense.currency)}
						</div>
						{expense.currency !== "rub" && <div>По курсу: {expense.rate}</div>}
					</div>

					<div>
						<div
							className={styles.textCellDelete}
							onClick={() => deleteExpense(expense)}
							title="Удалить"
						>
							<CgRemove size={30} />
						</div>
						<div className={styles.textCellEdit}>
							<CgEditMarkup size={27.5} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Expense;
