// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "./expensesType.json";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<string[]>
) {
	res.status(200).json(data);
}
