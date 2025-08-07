import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./CreateNewExpenseWindow.module.scss";
import { currencies } from "@/utils/consts/currencies";
import { countries } from "@/utils/consts/countries";
import { getNewDate, getStringDate } from "@/utils/functions/getStringDate";
import { setValueFromLS } from "@/utils/functions/setValueFromLS";

interface CreateNewExpenseWindowProps {
	setIsOpenCreateNewExpense: (openCreateNewExpense: boolean) => void;
	expensesTypes: string[];
	getExpenses: () => void;
}

const CreateNewExpenseWindow = ({
	setIsOpenCreateNewExpense,
	expensesTypes,
	getExpenses,
}: CreateNewExpenseWindowProps) => {
	const today = getStringDate(new Date());
	const [dateValue, setDateValue] = useState<string>(today);
	const [date, setDate] = useState<string>(getNewDate(today));
	const [description, setDescription] = useState<string>("");
	const [expensesType, setExpensesType] = useState<number>(0);
	const [currencySum, setCurrencySum] = useState<number>(0);
	const [currency, setCurrency] = useState<string>("rub");
	const [rate, setRate] = useState<number>(1);
	const [country, setCountry] = useState<string>("russia");
	const [region, setRegion] = useState<string>("");

	const blockRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		setValueFromLS("expensesType", setExpensesType);
		setValueFromLS("currency", setCurrency);
		setValueFromLS("rate", setRate);
		setValueFromLS("country", setCountry);
		setValueFromLS("region", setRegion);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				blockRef.current &&
				!blockRef.current.contains(event.target as Node)
			) {
				setIsOpenCreateNewExpense(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [blockRef, setIsOpenCreateNewExpense]);

	useEffect(() => {
		console.log(expensesType);
	}, [expensesType]);

	const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = getNewDate(e.target.value);
		setDateValue(e.target.value);
		setDate(newDate);
	};

	const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value);
	};

	const handleExpensesType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setExpensesType(+value);
		localStorage.setItem("expensesType", value);
	};

	const handleCurrencySum = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrencySum(+e.target.value);
	};

	const handleCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;

		setCurrency(value);
		localStorage.setItem("currency", value);

		if (e.target.value === "rub") {
			setRate(1);
			localStorage.setItem("rate", "1");
		}
	};

	const handleRate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setRate(+value);
		localStorage.setItem("rate", value);
	};

	const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;

		setCountry(value);
		localStorage.setItem("country", value);
	};

	const handleRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setRegion(value);
		localStorage.setItem("region", value);
	};

	const addExpense = () => {
		const expense = {
			date,
			description,
			expenses_type: expensesType,
			currency_sum: currencySum,
			currency,
			rate,
			country,
			region,
		};

		fetch("/api/expenses", {
			method: "POST",
			body: JSON.stringify(expense),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(() => {
				getExpenses();
				setIsOpenCreateNewExpense(false);
			})
			.catch(() => alert("Попробуйте еще раз"));
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal} ref={blockRef}>
				<div className={styles.inputBlock}>
					<label htmlFor="date">Дата</label>
					<input
						type="date"
						name="date"
						value={dateValue}
						onChange={handleDate}
					/>
				</div>

				<div className={styles.inputBlock}>
					<label htmlFor="expensesType">Категория</label>
					<select
						name="expensesType"
						value={expensesType}
						onChange={handleExpensesType}
					>
						{expensesTypes.map((type, i) => (
							<option value={i} key={i}>
								{type}
							</option>
						))}
					</select>
				</div>

				<div className={styles.inputBlock}>
					<label htmlFor="description">Описание</label>
					<input
						type="text"
						name="description"
						value={description}
						onChange={handleDescription}
					/>
				</div>

				<div className={styles.multiBlock}>
					<label htmlFor="region">Регион</label>

					<div className={styles.multiInputBlock}>
						<select name="country" onChange={handleCountry} value={country}>
							{Object.entries(countries).map(([key, value]) => (
								<option value={key} key={key}>
									{value}
								</option>
							))}
						</select>
						<input
							type="text"
							name="region"
							value={region}
							onChange={handleRegion}
						/>
					</div>
				</div>

				<div className={styles.multiBlock}>
					<label htmlFor="currencySum">Сумма</label>

					<div className={styles.multiInputBlock}>
						<select name="currency" value={currency} onChange={handleCurrency}>
							{Object.entries(currencies).map(([key, value]) => (
								<option value={key} key={key}>
									{value}
								</option>
							))}
						</select>

						<input
							type="text"
							name="currencySum"
							value={currencySum}
							onChange={handleCurrencySum}
						/>
					</div>
				</div>

				{currency !== "rub" && (
					<div className={styles.sumBlock}>
						<div></div>
						<div className={styles.inputBlock}>
							<label htmlFor="rate">Курс</label>
							<input
								type="text"
								name="rate"
								value={rate}
								onChange={handleRate}
							/>
						</div>
					</div>
				)}

				<button className={styles.button} type="button" onClick={addExpense}>
					Сохранить
				</button>
			</div>
		</div>
	);
};

export default CreateNewExpenseWindow;
