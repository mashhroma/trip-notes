import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
import style from "./Pickers.module.scss";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

interface MonthPickerProps {
	label: string;
	selectedMonth: number;
	setSelectedMonth: (selectedMonth: number) => void;
	currentYear: number;
	handleChange?: (date: Date | null) => void;
	id?: string;
}

const MonthPicker = ({
	label,
	selectedMonth,
	setSelectedMonth,
	currentYear,
	handleChange,
	id,
}: MonthPickerProps) => {
	const handleYearChange = (date: Date | null) => {
		if (date) {
			setSelectedMonth(date.getMonth() + 1);
		}
		if (handleChange) {
			handleChange(date);
		}
	};

	const handlePrevYear = () => {
		const prevMonth = selectedMonth - 1;
		const prevMonthDate = new Date(`01/${prevMonth}/${currentYear}`);
		setSelectedMonth(prevMonth);
		if (handleChange) {
			handleChange(prevMonthDate);
		}
	};

	const handleNextYear = () => {
		const nextMonth = selectedMonth + 1;
		const nextMonthDate = new Date(`01/${nextMonth}/${currentYear}`);
		setSelectedMonth(nextMonth);
		if (handleChange) {
			handleChange(nextMonthDate);
		}
	};

	return (
		<div className={style.block}>
			<div className={style.inputBlock}>
				<label className={style.label} htmlFor={id || label}>
					{label}
				</label>
				<DatePicker
					showPopperArrow={false}
					selected={new Date(`${selectedMonth}/01/${currentYear}`)}
					onChange={handleYearChange}
					className={style.inputDate}
					locale={ru}
					dateFormat="M"
					showMonthYearPicker
					showFourColumnMonthYearPicker
					minDate={new Date(`01/01/${currentYear}`)}
					maxDate={new Date(`12/31/${currentYear}`)}
					id={id || label}
				/>
			</div>

			<div className={style.buttonsBlock}>
				<button
					className={style.button}
					onClick={handleNextYear}
					disabled={+selectedMonth === 12}
				>
					<BsChevronUp size={16} />
				</button>
				<button
					className={style.button}
					onClick={handlePrevYear}
					disabled={+selectedMonth === 1}
				>
					<BsChevronDown size={16} />
				</button>
			</div>
		</div>
	);
};

export default MonthPicker;
