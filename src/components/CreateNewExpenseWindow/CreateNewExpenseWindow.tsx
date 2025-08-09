import { useLayoutEffect, useRef, useState } from "react";
import styles from "./CreateNewExpenseWindow.module.scss";
import { currencies, currenciesOptions } from "@/utils/consts/currencies";
import { countries, countriesOptions } from "@/utils/consts/countries";
import { setValueFromLS } from "@/utils/functions/setValueFromLS";
import expensesApi from "@/services/expenses";
import { IExpense } from "@/interfaces/expenses-interfaces";
import Dropdown from "../ui-kit/Dropdown";
import { Option } from "@/interfaces/option-interfaces";
import Input from "../ui-kit/Input";
import Button from "../ui-kit/Button";
import { getValueByKey } from "@/utils/functions/getValueByKey";
import DayPicker from "../ui-kit/Pickers/DayPicker";
import { SlClose } from "react-icons/sl";

interface CreateNewExpenseWindowProps {
	setIsOpenCreateNewExpense: (openCreateNewExpense: boolean) => void;
	expensesTypes: Option[];
	getExpenses: () => void;
	expenses: IExpense[];
}

const CreateNewExpenseWindow = ({
	setIsOpenCreateNewExpense,
	expensesTypes,
	getExpenses,
	expenses,
}: CreateNewExpenseWindowProps) => {
	const [date, setDate] = useState<Date>(new Date());
	const [description, setDescription] = useState<string>();
	const [SelectedExpensesType, setSelectedExpensesType] = useState<Option>(
		expensesTypes[0]
	);
	const [currencySum, setCurrencySum] = useState<number>();
	const [currency, setCurrency] = useState<string>("rub");
	const [rate, setRate] = useState<number>();
	const [country, setCountry] = useState<string>("russia");
	const [region, setRegion] = useState<string>();

	const blockRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		setValueFromLS("expensesType", setSelectedExpensesType);
		setValueFromLS("currency", setCurrency);
		setValueFromLS("rate", setRate);
		setValueFromLS("country", setCountry);
		setValueFromLS("region", setRegion);
	}, []);

	const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value);
	};

	const handleExpensesType = (option: Option) => {
		setSelectedExpensesType(option);
		localStorage.setItem("expensesType", JSON.stringify(option));
	};

	const handleCurrencySum = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrencySum(+e.target.value);
	};

	const handleCurrency = (option: Option) => {
		const value = `${option.value}`;

		setCurrency(value);
		localStorage.setItem("currency", value);

		if (option.value === "rub") {
			setRate(1);
			localStorage.setItem("rate", "1");
		}
	};

	const handleRate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setRate(+value);
		localStorage.setItem("rate", value);
	};

	const handleCountry = (option: Option) => {
		const value = `${option.value}`;
		setCountry(value);
		localStorage.setItem("country", value);
	};

	const handleRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setRegion(value);
		localStorage.setItem("region", value);
	};

	const addExpense = () => {
		const id = (
			expenses.reduce(
				(maxId: number, expense) => Math.max(maxId, +expense.id),
				0
			) + 1
		).toString();

		if (!description) {
			alert("Введите описание");
		} else if (!region) {
			alert("Введите регион");
		} else if (!currencySum) {
			alert("Введите сумму");
		} else if (currencySum < 1) {
			alert("Сумма должна быть больше 1");
		} else if ((!rate || rate <= 1) && currency !== "rub") {
			alert("Введите курс валюты");
		} else {
			const expense = {
				id,
				date,
				description,
				expenses_type: +SelectedExpensesType.value,
				currency_sum: currencySum,
				currency,
				rate: rate || 1,
				country,
				region,
			};

			expensesApi
				.createExpense(expense)
				.then(() => {
					getExpenses();
					setIsOpenCreateNewExpense(false);
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal} ref={blockRef}>
				<div className={styles.close}>
					<SlClose onClick={() => setIsOpenCreateNewExpense(false)} size={25} />
				</div>
				<div className={styles.multiBlock}>
					<DayPicker
						label="Дата"
						selectedDate={date}
						setSelectedDate={setDate}
						showNavigationButtons={false}
					/>

					<Dropdown
						options={expensesTypes}
						selected={SelectedExpensesType.label}
						onChange={handleExpensesType}
						dropdownTitle="Категория"
						maxHeightContent={300}
					/>
				</div>

				<Input
					type="text"
					placeholder="Описание"
					value={description || ""}
					onChange={handleDescription}
				/>

				<div className={styles.multiBlock}>
					<Dropdown
						options={countriesOptions}
						selected={getValueByKey(countries, country)}
						onChange={handleCountry}
						dropdownTitle="Страна"
					/>
					<Input
						type="text"
						placeholder="Регион"
						value={region || ""}
						onChange={handleRegion}
					/>
				</div>

				<div className={styles.multiBlock}>
					<Dropdown
						options={currenciesOptions}
						selected={getValueByKey(currencies, currency)}
						onChange={handleCurrency}
						dropdownTitle="Валюта"
					/>
					<Input
						type="text"
						placeholder="Сумма"
						value={currencySum || ""}
						onChange={handleCurrencySum}
					/>
					{currency !== "rub" && (
						<Input
							type="text"
							placeholder="Курс"
							value={rate || ""}
							onChange={handleRate}
						/>
					)}
				</div>

				<Button label="Сохранить" onClick={addExpense} />
			</div>
		</div>
	);
};

export default CreateNewExpenseWindow;
