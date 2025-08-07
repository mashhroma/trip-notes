// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IExpense } from "@/interfaces/expenses-interfaces";
import path from "path";
import * as fsPromises from "fs/promises";

// const fsPromises = require("fs").promises;
const dataFilePath = path.join(process.cwd(), "data/expenses.json");

interface IMessage {
	message: string;
	id?: number;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IExpense[] | IMessage>
) {
	const jsonData = (await fsPromises.readFile(
		dataFilePath
	)) as unknown as string;
	const objectData: IExpense[] = JSON.parse(jsonData);

	if (req.method === "GET") {
		// Read the existing data from the JSON file
		res.status(200).json(objectData);
	} else if (req.method === "POST") {
		try {
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

			const id =
				objectData.reduce(
					(maxId: number, expense) => Math.max(maxId, expense.id),
					0
				) + 1;

			const newData = {
				id,
				date,
				description,
				expenses_type,
				currency_sum,
				currency,
				rate,
				country,
				region,
			};
			objectData.push(newData);

			const updatedData = JSON.stringify(objectData);

			await fsPromises.writeFile(dataFilePath, updatedData);

			res.status(200).json({ message: "Data stored successfully", id });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error storing data" });
		}
	} else if (req.method === "DELETE") {
		try {
			const { id } = req.body;

			const filteredData = objectData.filter((expense) => expense.id !== id);
			const updatedData = JSON.stringify(filteredData);

			await fsPromises.writeFile(dataFilePath, updatedData);

			res.status(200).json({ message: "Object deleted successfully", id });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error deleting data" });
		}
	}
}
