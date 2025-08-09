import Card from "../Card";
import styles from "./Routes.module.scss";

const Routes = () => {
	return (
		<>
			<header className={styles.titleBlock}>
				<div className={styles.title}>
					<div>Маршруты</div>
				</div>
			</header>
			<div className={styles.block}>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />

				<Card />
				<Card />
			</div>
		</>
	);
};

export default Routes;
