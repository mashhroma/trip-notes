import { useState, useEffect, useRef, useCallback, CSSProperties } from "react";
import { createPortal } from "react-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import cn from "classnames";
import styles from "./Dropdown.module.scss";
import { Option } from "@/interfaces/option-interfaces";

interface DropdownProps {
	selected: string | number;
	options: Option[];
	onChange: (option: Option) => void;
	classDropdown?: "dropdown";
	size?: "smallest" | "small" | "medium" | "large";
	dropdownTitle?: string;
	width?: number | string;
	maxHeightContent?: number;
	buttonTextAlign?: "left" | "center" | "right";
	contentTextAlign?: "left" | "center" | "right";
}

const Dropdown = ({
	selected,
	options,
	onChange,
	classDropdown = "dropdown",
	size = "medium",
	dropdownTitle,
	width,
	maxHeightContent = 456,
	buttonTextAlign = "left",
	contentTextAlign = "left",
}: DropdownProps) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [dropdownPosition, setDropdownPosition] =
		useState<CSSProperties | null>(null);

	const buttonRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const dropdownBtnCn = cn(
		styles[classDropdown],
		isActive ? styles.dropdownActive : styles.dropdownBtn,
		styles[size]
	);
	const dropdownContentCn = cn(styles[classDropdown], styles.dropdownContent);

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
			options.length * (buttonRect.height + 2) + 10
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
	}, [isActive, options.length, buttonRef, maxHeightContent]);

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
		[isActive, options.length]
	);

	useEffect(() => {
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
		};
	}, [isActive]);

	return (
		<>
			<div
				className={dropdownBtnCn}
				ref={buttonRef}
				onClick={() => setIsActive(!isActive)}
				style={{ width, textAlign: buttonTextAlign }}
			>
				<div className={styles.titleBlock}>
					{dropdownTitle && (
						<div
							className={dropdownTitle !== selected ? styles.type : undefined}
						>
							{dropdownTitle}
						</div>
					)}
					{dropdownTitle !== selected && <div>{selected}</div>}
				</div>
				{isActive ? (
					<FaChevronUp className={styles.chevron} size={getChevronSize()} />
				) : (
					<FaChevronDown className={styles.chevron} size={getChevronSize()} />
				)}
			</div>
			{isActive &&
				dropdownPosition &&
				createPortal(
					<div
						className={dropdownContentCn}
						ref={dropdownRef}
						style={dropdownPosition}
					>
						{options.map((option: Option) => (
							<div
								onClick={() => {
									if (option.disable) return;
									onChange(option);
									setIsActive(false);
								}}
								className={getDropdownItemCn(option.disable)}
								style={{ justifyContent: contentTextAlign }}
								key={option.value}
							>
								{option.label}
							</div>
						))}
					</div>,
					document.body
				)}
		</>
	);
};

export default Dropdown;
