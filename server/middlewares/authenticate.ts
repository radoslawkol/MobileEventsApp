import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { authorization } = req.headers;

		if (authorization) {
			const token = authorization.split(" ")[1];

			jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
				if (err) {
					return res.status(403).json({
						status: "fail",
						message: "You are not authorized to perform this action.",
					});
				}
				req.userId = user.id;
				req.userToken = token;
				next();
			});
		} else {
			res.status(401).json({
				status: "fail",
				message: "You are not authenticated.",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			mesasge: err.message,
		});
	}
};
