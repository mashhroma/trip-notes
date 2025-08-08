import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
import style from "./Pickers.module.scss";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { FiCalendar } from "react-icons/fi";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import ReactDatePicker from "react-datepicker";
import { getStringDate } from "@/utils/functions/getStringDate";

interface DayPickerProps {
	label: string;
	selectedDate: Date | null;
	setSelectedDate: (selectedDate: Date) => void;
	availableDates?: Date[];
	minDate?: Date;
	maxDate?: Date;
	handleChange?: (date: Date | null) => void;
	id?: string;
	showCalendarIcon?: boolean;
	showClearIcon?: boolean;
	handleClear?: () => void;
	showNavigationButtons?: boolean;
	sizeSmall?: boolean;
}

const DayPicker = ({
	label,
	selectedDate,
	setSelectedDate,
	availableDates,
	minDate,
	maxDate,
	handleChange,
	id,
	showNavigationButtons = true,
	showCalendarIcon = false,
	showClearIcon = false,
	handleClear,
	sizeSmall,
}: DayPickerProps) => {
	const pickerRef = useRef<ReactDatePicker>(null);

	const min =
		(availableDates?.length && availableDates[0]) || minDate || undefined;
	const max =
		(availableDates?.length && availableDates[availableDates.length - 1]) ||
		maxDate ||
		undefined;

	const handleDayChange = (date: Date | null) => {
		if (date) {
			setSelectedDate(date);
		}

		if (handleChange) {
			handleChange(date);
		}
	};

	const handlePrevDay = () => {
		if (selectedDate) {
			if (availableDates?.length) {
				let currentIndex = availableDates.findIndex(
					(date) => date.getTime() === selectedDate.getTime()
				);
				currentIndex =
					(currentIndex - 1 + availableDates.length) % availableDates.length;
				setSelectedDate(availableDates[currentIndex]);
				if (handleChange) {
					handleChange(availableDates[currentIndex]);
				}
			} else {
				const prevDate = new Date(selectedDate);
				prevDate.setDate(prevDate.getDate() - 1);
				setSelectedDate(prevDate);
				if (handleChange) {
					handleChange(prevDate);
				}
			}
		}
	};

	const handleNextDay = () => {
		if (selectedDate) {
			if (availableDates?.length) {
				let currentIndex = availableDates.findIndex(
					(date) => date.getTime() === selectedDate.getTime()
				);
				currentIndex = (currentIndex + 1) % availableDates.length;
				setSelectedDate(availableDates[currentIndex]);
				if (handleChange) {
					handleChange(availableDates[currentIndex]);
				}
			} else {
				const nextDate = new Date(selectedDate);
				nextDate.setDate(nextDate.getDate() + 1);
				setSelectedDate(nextDate);
				if (handleChange) {
					handleChange(nextDate);
				}
			}
		}
	};

	const getClassNameInputDate = () => {
		if (sizeSmall) {
			if (selectedDate) {
				return style.inputDateSmall;
			} else {
				return style.hideInputDateSmall;
			}
		} else {
			return style.inputDate;
		}
	};

	return (
		<div className={sizeSmall ? style.blockSmall : style.block}>
			<div className={style.inputBlock}>
				<label
					className={sizeSmall ? style.labelSmall : style.label}
					htmlFor={id || label}
				>
					{selectedDate && sizeSmall ? null : label}
				</label>
				<DatePicker
					showPopperArrow={false}
					selected={selectedDate}
					onChange={handleDayChange}
					className={getClassNameInputDate()}
					locale={ru}
					dateFormat="dd.MM.yyyy"
					showYearDropdown
					showMonthDropdown
					scrollableYearDropdown
					includeDates={availableDates?.length ? availableDates : undefined}
					minDate={min}
					maxDate={max}
					id={id || label}
					ref={pickerRef}
				/>
			</div>

			{showClearIcon && selectedDate && handleClear && (
				<div className={style.clearIcon} onClick={() => handleClear()}>
					<IoMdClose />
				</div>
			)}

			{showCalendarIcon && (
				<div
					className={style.calendarIcon}
					onClick={() => pickerRef.current?.setFocus()}
				>
					<FiCalendar />
				</div>
			)}

			{showNavigationButtons && selectedDate && (
				<div className={style.buttonsBlock}>
					<button
						className={style.button}
						onClick={handleNextDay}
						disabled={
							max &&
							getStringDate(selectedDate, "-") === getStringDate(max, "-")
						}
					>
						<BsChevronUp size={16} />
					</button>
					<button
						className={style.button}
						onClick={handlePrevDay}
						disabled={
							min &&
							getStringDate(selectedDate, "-") === getStringDate(min, "-")
						}
					>
						<BsChevronDown size={16} />
					</button>
				</div>
			)}
		</div>
	);
};

export default DayPicker;
