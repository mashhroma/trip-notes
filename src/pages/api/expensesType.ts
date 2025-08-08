// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "./expensesType.json";
import { Option } from "@/interfaces/option-interfaces";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Option[]>
) {
	res.status(200).json(data);
}
