import { useState } from "react";
import styles from "./CreateNewExpenseWindow.module.scss";
import { currencies } from "@/utils/consts/currencies";
import { countries } from "@/utils/consts/countries";
import { getNewDate, getStringDate } from "@/utils/functions/getStringDate";

interface CreateNewExpenseWindowProps {
	setIsOpenCreateNewExpense: (openCreateNewExpense: boolean) => void;
	expensesTypes: string[];
}

const CreateNewExpenseWindow = ({
	setIsOpenCreateNewExpense,
	expensesTypes,
}: CreateNewExpenseWindowProps) => {
	const today = getStringDate(new Date());
	const [dateValue, setDateValue] = useState<string>(today);
	const [date, setDate] = useState<string>(getNewDate(today));
	const [description, setDescription] = useState<string>("");
	const [expensesType, setExpensesType] = useState<number>(0);
	const [currencySum, setCurrencySum] = useState<number>(0);
	const [currency, setCurrency] = useState<string>("rub");
	const [rate, setRate] = useState<number>(1);
	const [country, setCountry] = useState<string>(countries.russia);
	const [region, setRegion] = useState<string>("");

	const handleDate = (e: any) => {
		console.log(e.target.value);
		const newDate = getNewDate(e.target.value);
		setDateValue(e.target.value);
		setDate(newDate);
	};

	const handleDescription = (e: any) => {
		setDescription(e.target.value);
	};

	const handleExpensesType = (e: any) => {
		setExpensesType(e.target.value);
	};

	const handleCurrencySum = (e: any) => {
		setCurrencySum(e.target.value);
	};

	const handleCurrency = (e: any) => {
		setCurrency(e.target.value);
		console.log(e.target.value);
		if (e.target.value === "rub") {
			setRate(1);
		}
	};

	const handleRate = (e: any) => {
		setRate(e.target.value);
	};

	const handleCountry = (e: any) => {
		setCountry(e.target.value);
	};

	const handleRegion = (e: any) => {
		setRegion(e.target.value);
	};

	return (
		<div className={styles.overlay}>
			<div
				className={styles.modal}
				onDoubleClick={() => setIsOpenCreateNewExpense(false)}
			>
				<div className={styles.inputBlock}>
					<label htmlFor="date">Дата</label>
					<input type="date" value={dateValue} onChange={handleDate} />
				</div>

				<div className={styles.inputBlock} onChange={handleExpensesType}>
					<label htmlFor="expensesType">Категория</label>
					<select name="expensesType">
						{expensesTypes.map((type, i) => (
							<option value={i} selected={expensesType === i}>
								{type}
							</option>
						))}
					</select>
				</div>

				<div className={styles.inputBlock}>
					<label htmlFor="description">Описание</label>
					<input
						type="description"
						value={description}
						onChange={handleDescription}
					/>
				</div>

				<div className={styles.multiBlock}>
					<label htmlFor="region">Регион</label>

					<div className={styles.multiInputBlock}>
						<select name="country" onChange={handleCountry}>
							{Object.entries(countries).map(([key, value]) => (
								<option value={key} selected={country === key}>
									{value}
								</option>
							))}
						</select>
						<input type="text" value={region} onChange={handleRegion} />
					</div>
				</div>

				<div className={styles.multiBlock}>
					<label htmlFor="currencySum">Сумма</label>

					<div className={styles.multiInputBlock}>
						<select name="currency" onChange={handleCurrency}>
							{Object.entries(currencies).map(([key, value]) => (
								<option value={key} selected={currency === key}>
									{value}
								</option>
							))}
						</select>

						<input
							type="number"
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
							<input type="number" value={rate} onChange={handleRate} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateNewExpenseWindow;
