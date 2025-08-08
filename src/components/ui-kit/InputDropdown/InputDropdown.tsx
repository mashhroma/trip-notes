import { useState, useEffect, useRef, useCallback, CSSProperties } from "react";
import { createPortal } from "react-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import cn from "classnames";
import styles from "./InputDropdown.module.scss";
import { Option } from "@/interfaces/option-interfaces";

interface InputDropdownProps {
	selected: string | number;
	options: Option[];
	onChange: (option: Option) => void;
	onClear?: () => void;
	onAddOption?: (option: Option) => void;
	size?: "smallest" | "small" | "medium" | "large";
	dropdownTitle: string;
	width?: number | string;
	maxHeightContent?: number;
	buttonTextAlign?: "left" | "center" | "right";
	contentTextAlign?: "left" | "center" | "right";
	needExactMatch: boolean;
	needToClearAfterSelect?: boolean;
}

const InputDropdown = ({
	selected,
	options,
	onChange,
	onClear,
	onAddOption,
	size = "medium",
	dropdownTitle,
	width,
	maxHeightContent = 456,
	buttonTextAlign = "left",
	contentTextAlign = "left",
	needExactMatch,
	needToClearAfterSelect = false,
}: InputDropdownProps) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [dropdownPosition, setDropdownPosition] =
		useState<CSSProperties | null>(null);
	const [inputValue, setInputValue] = useState<string>(
		selected.toString() || ""
	);
	const [currentOptions, setCurrentOptions] = useState<Option[]>([]);

	const buttonRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const filteredOptions = currentOptions.filter((option) =>
		option.label.toLowerCase().includes(inputValue.toLowerCase())
	);

	const dropdownBtnCn = cn(styles.dropdown, styles.dropdownBtn, styles[size]);
	const dropdownContentCn = cn(styles.dropdown, styles.dropdownContent);

	const getDropdownItemCn = (isOptionDisable?: boolean) =>
		cn(
			styles.dropdownItem,
			styles[size + "Item"],
			isOptionDisable && styles.disable
		);

	const getChevronSize = () => {
		switch (size) {
			case "medium":
				return 18;
			case "large":
				return 20;
			case "small":
			case "smallest":
				return 13;
			default:
				return 18;
		}
	};

	const updateDropdownPosition = useCallback(() => {
		if (!isActive || !buttonRef.current) return;

		const buttonRect = buttonRef.current.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const windowWidth = window.innerWidth;

		const estimatedDropdownHeight = Math.min(
			maxHeightContent,
			filteredOptions.length * (buttonRect.height + 2) + 10
		);

		const spaceBelow = windowHeight - buttonRect.bottom;
		const spaceAbove = buttonRect.top;
		const newDirection: "up" | "down" =
			spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow
				? "up"
				: "down";

		const top =
			newDirection === "down"
				? buttonRect.bottom + 2 + window.scrollY
				: buttonRect.top - estimatedDropdownHeight + window.scrollY;

		const left =
			buttonRect.left + buttonRect.width > windowWidth
				? windowWidth - buttonRect.width - 5
				: buttonRect.left;

		setDropdownPosition({
			maxHeight: maxHeightContent,
			top,
			left,
			width: buttonRect.width,
		});
	}, [isActive, filteredOptions.length, buttonRef, maxHeightContent]);

	const getFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filter = e.target.value;
		setInputValue(filter);
		setIsActive(true);
		if (!needExactMatch) {
			onChange({ value: filter, label: filter });
		}
	};

	const handleClear = () => {
		setInputValue("");
		onClear?.();
	};

	const handleAddOption = () => {
		const newOption = { value: inputValue, label: inputValue };
		setCurrentOptions((prevOptions) => [...prevOptions, newOption]);
		onAddOption?.(newOption);
	};

	const toggleActive = (active: boolean) => {
		if (active) {
			inputRef.current?.focus();
		}
		setIsActive(active);
	};

	useEffect(() => {
		setCurrentOptions([...options]);
	}, [options]);

	useEffect(
		() => {
			if (!isActive && !dropdownPosition) return;
			if (!isActive && dropdownPosition) setDropdownPosition(null);

			updateDropdownPosition();

			const handleScroll = () => updateDropdownPosition();
			const handleResize = () => updateDropdownPosition();

			window.addEventListener("scroll", handleScroll, true);
			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("scroll", handleScroll, true);
				window.removeEventListener("resize", handleResize);
			};
		}, // eslint-disable-next-line
		[isActive, currentOptions.length]
	);

	useEffect(() => {
		if (
			needExactMatch &&
			!isActive &&
			!currentOptions.some((option) => option.label === inputValue)
		) {
			setInputValue(needToClearAfterSelect ? "" : selected.toString());
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (!isActive) return;

			const isClickInsideButton =
				buttonRef.current && buttonRef.current.contains(event.target as Node);
			const isClickInsideDropdown =
				dropdownRef.current &&
				dropdownRef.current.contains(event.target as Node);

			if (!isClickInsideButton && !isClickInsideDropdown) {
				setIsActive(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		}; // eslint-disable-next-line
	}, [isActive]);

	return (
		<>
			<div
				className={dropdownBtnCn}
				ref={buttonRef}
				style={{ width, textAlign: buttonTextAlign }}
			>
				<input
					ref={inputRef}
					value={inputValue}
					onChange={getFilterValue}
					type="text"
					placeholder={
						size === "small" || size === "smallest" ? dropdownTitle : undefined
					}
					id={dropdownTitle}
					onFocus={() => setIsActive(true)}
				/>
				{(size === "medium" || size === "large") && (
					<label htmlFor={dropdownTitle}>{dropdownTitle}</label>
				)}
				<div className={styles.icon}>
					{inputValue ? (
						<IoMdClose size={16} onClick={handleClear} />
					) : (
						<>
							{isActive ? (
								<FaChevronUp
									className={styles.chevron}
									size={getChevronSize()}
									onClick={() => toggleActive(false)}
								/>
							) : (
								<FaChevronDown
									className={styles.chevron}
									size={getChevronSize()}
									onClick={() => toggleActive(true)}
								/>
							)}
						</>
					)}
				</div>
			</div>
			{isActive &&
				dropdownPosition &&
				createPortal(
					<div
						className={dropdownContentCn}
						ref={dropdownRef}
						style={dropdownPosition}
					>
						{onAddOption &&
							!currentOptions.some((option) => option.label === inputValue) &&
							inputValue && (
								<div className={styles.addBlock} onClick={handleAddOption}>
									<IoAdd size={16} /> Добавить
								</div>
							)}
						{filteredOptions.length ? (
							filteredOptions
								.sort((a, b) => a.label.localeCompare(b.label))
								.map((option: Option) => (
									<div
										onClick={() => {
											if (option.disable) return;
											onChange(option);
											setInputValue(needToClearAfterSelect ? "" : option.label);
											setIsActive(false);
										}}
										className={getDropdownItemCn(option.disable)}
										style={{ justifyContent: contentTextAlign }}
										key={option.value}
									>
										{option.label}
									</div>
								))
						) : (
							<div className={styles.noData}>Нет данных</div>
						)}
					</div>,
					document.body
				)}
		</>
	);
};

export default InputDropdown;
