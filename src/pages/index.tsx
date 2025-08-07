import Head from "next/head";
import ExpensesTable from "@/components/ExpensesTable";

export default function Home() {
	const SITE_NAME = "TRIP NOTES";
	return (
		<>
			<Head>
				<title>{SITE_NAME}</title>
				<meta
					name="description"
					content="Мои заметки, чтобы контролировать расходы во время поездки"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<header>{SITE_NAME}</header>
				<main>
					<ExpensesTable />
				</main>
				<footer style={{ textAlign: "center" }}>
					<i>{SITE_NAME}</i>
				</footer>
			</div>
		</>
	);
}
