import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req: Request, res: Response) => {
	try {
		console.log(req.body);

		const { firstName, surname, email, password } = req.body;

		if (!firstName || !surname || !email || !password) {
			return res.status(400).json({
				status: "fail",
				message: "Fields cannot be empty.",
			});
		}

		const isEmailAlreadyExists = await User.findOne({ email });

		if (isEmailAlreadyExists) {
			return res.status(401).json({
				status: "fail",
				message:
					"An account is already registered on this email. Try with a different one.",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			firstName,
			surname,
			email,
			password: hashedPassword,
		});

		const token = jwt.sign(
			{ id: user._id },
			process.env.JWT_SECRET_KEY as string
		);

		res.status(200).json({
			status: "success",
			data: {
				user,
				token,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err,
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				status: "fail",
				message: "Please provide correct email and password.",
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				status: "fail",
				message: "This email is not assigned to any account.",
			});
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				status: "fail",
				message: "Invalid credentials.",
			});
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

		res.status(200).json({
			status: "success",
			data: {
				user: {
					email: user.email,
					firstName: user.firstName,
					surname: user.surname,
				},
				token,
			},
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err,
		});
	}
};
