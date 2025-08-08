import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
import style from "./Pickers.module.scss";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

interface YearPickerProps {
	label: string;
	selectedYear: number;
	setSelectedYear: (selectedYear: number) => void;
	availableYears?: number[];
	minYear?: number;
	maxYear?: number;
	handleChange?: (date: Date | null) => void;
	id?: string;
}

const YearPicker = ({
	label,
	selectedYear,
	setSelectedYear,
	availableYears,
	minYear: minYear,
	maxYear: maxYear,
	handleChange,
	id,
}: YearPickerProps) => {
	let availableDates: Date[] = [];

	if (availableYears?.length) {
		availableDates = availableYears.map((year) => new Date(`01/01/${year}`));
	}

	const min =
		(availableDates.length && availableDates[0]) ||
		new Date(`01/01/${minYear}`) ||
		undefined;
	const max =
		(availableDates.length && availableDates[availableDates.length - 1]) ||
		new Date(`01/01/${maxYear}`) ||
		undefined;

	const handleYearChange = (date: Date | null) => {
		if (date) {
			setSelectedYear(date.getFullYear());
		}
		if (handleChange) {
			handleChange(date);
		}
	};

	const handlePrevYear = () => {
		if (availableDates.length) {
			let currentIndex = availableDates.findIndex(
				(date) => date.getFullYear() === selectedYear
			);
			currentIndex =
				(currentIndex - 1 + availableDates.length) % availableDates.length;
			setSelectedYear(availableDates[currentIndex].getFullYear());
		} else {
			const prevYear = selectedYear - 1;
			const prevYearDate = new Date(selectedYear);
			prevYearDate.setFullYear(prevYear);
			setSelectedYear(prevYearDate.getFullYear());
			if (handleChange) {
				handleChange(prevYearDate);
			}
		}
	};

	const handleNextYear = () => {
		if (availableDates.length) {
			let currentIndex = availableDates.findIndex(
				(date) => date.getFullYear() === selectedYear
			);
			currentIndex = (currentIndex + 1) % availableDates.length;
			setSelectedYear(availableDates[currentIndex].getFullYear());
		} else {
			const nextYear = selectedYear + 1;
			const nextYearDate = new Date(selectedYear);
			nextYearDate.setFullYear(nextYear);
			setSelectedYear(nextYearDate.getFullYear());
			if (handleChange) {
				handleChange(nextYearDate);
			}
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
					selected={new Date(`01/01/${selectedYear}`)}
					onChange={handleYearChange}
					className={style.inputDate}
					locale={ru}
					dateFormat="yyyy"
					showYearPicker={true}
					includeDates={availableDates.length ? availableDates : undefined}
					minDate={min}
					maxDate={max}
					id={id || label}
				/>
			</div>

			<div className={style.buttonsBlock}>
				<button
					className={style.button}
					onClick={handleNextYear}
					disabled={selectedYear === max?.getFullYear()}
				>
					<BsChevronUp size={16} />
				</button>
				<button
					className={style.button}
					onClick={handlePrevYear}
					disabled={selectedYear === min?.getFullYear()}
				>
					<BsChevronDown size={16} />
				</button>
			</div>
		</div>
	);
};

export default YearPicker;
