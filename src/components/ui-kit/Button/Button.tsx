import styles from "./Button.module.scss";
import cn from "classnames";
import LoaderIcon from "../LoaderIcon";

interface ButtonProps {
	backgroundColor?: string;
	label?: string;
	onClick?: () => void;
	icon?: React.ReactNode;
	leftIcon?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	loading?: boolean;
	loaderLabel?: string;
	classBtn?: "button" | "secondary";
	size?: "small" | "medium" | "large";
	width?: string | number;
	top?: string;
	title?: string;
	marginRight?: number;
}

export const Button = ({
	type = "button",
	backgroundColor,
	label,
	icon,
	leftIcon,
	classBtn = "button",
	size = "medium",
	disabled = false,
	loading = false,
	width,
	top,
	title,
	marginRight,
	loaderLabel,
	...props
}: ButtonProps) => {
	const isDisabled = disabled && !loading ? styles.disabled : null;

	const isLoading = loading ? styles.loading : null;

	const mainCn = cn(
		styles.defaultBtn,
		styles[classBtn],
		styles[size],
		isDisabled,
		isLoading
	);

	return (
		<button
			type={type}
			className={mainCn}
			disabled={disabled}
			{...props}
			title={title}
			style={{ width }}
		>
			{loading ? (
				<>
					<LoaderIcon
						color={classBtn === "secondary" ? "#3352F4" : "#ffffff"}
						size={size === "small" ? 20 : 24}
					/>
					{loaderLabel && (
						<span className={styles.loaderLabel}>{loaderLabel}</span>
					)}
				</>
			) : (
				<>
					{leftIcon}
					{label}
					{icon}
				</>
			)}
			<style jsx>{`
				button {
					background-color: ${backgroundColor};
					top: ${top};
					margin-right: ${marginRight}px;
				}
			`}</style>
		</button>
	);
};
