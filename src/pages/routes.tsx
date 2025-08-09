import Head from "next/head";
import { SITE_NAME } from "@/utils/consts/SITE_NAME";
import Routes from "@/components/Routes";
import Header from "@/components/Header";

export default function RoutesPage() {
	return (
		<>
			<Head>
				<title>{SITE_NAME} - Маршруты</title>
				<meta
					name="description"
					content="Мои заметки, чтобы контролировать расходы во время поездки"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container">
				<Header />
				<main>
					<Routes />
				</main>
				<footer>
					<i>{SITE_NAME}</i>
				</footer>
			</div>
		</>
	);
}
