import { SITE_NAME } from "@/utils/consts/SITE_NAME";
import { SlMenu } from "react-icons/sl";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
	const [isOpenNav, setIsOpenNav] = useState<boolean>(false);

	const navRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(event.target as Node)) {
				setIsOpenNav(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [navRef]);

	return (
		<>
			<div className={styles.overlay}>
				<header className={styles.header}>
					<h1>{SITE_NAME}</h1>

					<SlMenu
						size={30}
						className={styles.hamburger}
						onClick={() => setIsOpenNav(!isOpenNav)}
					/>
				</header>
			</div>
			{isOpenNav && (
				<nav className={styles.nav} ref={navRef}>
					<Link href={"/"}>Расходы</Link>
					<Link href={"/routes"}>Маршруты</Link>
				</nav>
			)}
		</>
	);
};

export default Header;
