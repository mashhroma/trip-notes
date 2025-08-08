import { IoMdClose } from "react-icons/io";
import { PiEyeSlash, PiEye } from "react-icons/pi";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import styles from "./Input.module.scss";
import cn from "classnames";
import { useRef, useState } from "react";

interface InputProps {
	value: string | number;
	placeholder: string;
	label?: string;
	type: "text" | "password" | "number" | "email";
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	classInput?: "baseInput";
	size?: "small" | "medium" | "large";
	labelPosition?: "labelIn" | "labelOut";
	width?: number | string;
	name?: string;
	maxLength?: number;
	id?: string;
	required?: boolean;
	min?: number;
	max?: number;
	disabled?: boolean;
	handleClear?: () => void;
	handleNextNumber?: () => void;
	handlePrevNumber?: () => void;
}

export const Input = ({
	id,
	placeholder,
	value,
	classInput = "baseInput",
	size = "medium",
	labelPosition = "labelIn",
	type = "text",
	width,
	name,
	maxLength,
	required,
	min,
	max,
	disabled,
	handleClear,
	handleNextNumber,
	handlePrevNumber,
	label,
	...props
}: InputProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const mainCn = cn(styles[classInput], styles[size + "_" + labelPosition]);

	return (
		<div className={mainCn} style={{ width }}>
			<input
				ref={inputRef}
				id={id || placeholder}
				value={value}
				type={showPassword ? "text" : type}
				name={name}
				placeholder={placeholder}
				maxLength={maxLength}
				required={required}
				min={min}
				max={max}
				disabled={disabled}
				{...props}
			/>
			<label htmlFor={id || placeholder}>{label || placeholder}</label>
			{type === "number" &&
				handleNextNumber &&
				handlePrevNumber &&
				!disabled && (
					<div className={styles.buttonsBlock}>
						<button
							className={styles.button}
							onClick={handleNextNumber}
							disabled={
								(max !== undefined ? +value === max || +value > max : false) ||
								disabled
							}
						>
							<BsChevronUp size={16} />
						</button>
						<button
							className={styles.button}
							onClick={handlePrevNumber}
							disabled={
								(min !== undefined ? +value === min || +value < min : false) ||
								disabled
							}
						>
							<BsChevronDown size={16} />
						</button>
					</div>
				)}
			{type === "password" && (
				<div
					className={styles.eyeIcon}
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? <PiEyeSlash size={24} /> : <PiEye size={24} />}
				</div>
			)}
			{type !== "password" && handleClear && value && (
				<div className={styles.closeIcon} onClick={handleClear}>
					<IoMdClose size={16} />
				</div>
			)}
		</div>
	);
};
