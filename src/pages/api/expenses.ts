// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "./expenses.json";
import { IExpense } from "@/interfaces/expenses-interfaces";

const fsPromises = require("fs").promises;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IExpense[]>
) {
	res.status(200).json(data);
	if (req.method === "POST") {
		const {
			date,
			description,
			expenses_type,
			currency_sum,
			currency,
			rate,
			country,
			region,
		} = req.body;
		// Добавить новые данные в объект
		const newData = {
			date,
			description,
			expenses_type,
			currency_sum,
			currency,
			rate,
			country,
			region,
		};
		data.push(newData);
		// Преобразовать объект обратно в строку JSON
		const updatedData = JSON.stringify(data);
		// Написать обновлённые данные в JSON-файл
		await fsPromises.writeFile("./expenses.json", updatedData);
		// // Отправить ответ успеха
		// res.status(200).json({ message: 'Data stored successfully' });
	}
}
