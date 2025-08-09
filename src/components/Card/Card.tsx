import styles from "./Card.module.scss";

const Card = () => {
	return (
		<article className={styles.card}>
			<div>
				<h4>Начало маршрута</h4>
				<div>Место:</div>
				<div>Дата:</div>
			</div>

			<div>
				<h4>Конец маршрута:</h4>
				<div>Место:</div>
				<div>Дата:</div>
			</div>

			<h4>Время в пути</h4>
		</article>
	);
};

export default Card;
