import { Request, Response } from "express";
import User from "../models/User.js";

export const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.userId).select(
			"-password -_id -surname"
		);

		if (!user) {
			res.status(404).json({
				status: "fail",
				message: "This user account does not exist.",
			});
		}

		res.status(200).json({
			status: "success",
			data: {
				user,
				token: req.userToken,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
