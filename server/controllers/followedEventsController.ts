import { Request, Response } from "express";
import Event from "../models/Event.js";
import User from "../models/User.js";

export const followEvent = async (req: Request, res: Response) => {
	try {
		const { eventId }: { eventId: string } = req.body;

		if (!eventId) {
			return res.status(400).json({
				status: "fail",
				message: "Cannot follow request without ID.",
			});
		}
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				status: "fail",
				message: "This Event does not exist.",
			});
		}

		const user = await User.findById(req.userId);
		const isAlreadyFollowed = user.followed.find(
			(event) => event._id.toString() === eventId
		);

		if (isAlreadyFollowed) {
			await User.updateOne(
				{ _id: req.userId },
				{ $pull: { followed: event._id } }
			);
			return res.status(200).json({
				status: "success",
				message: "Event was unfollowed.",
			});
		} else {
			await User.updateOne(
				{ _id: req.userId },
				{ $push: { followed: event._id } }
			);
		}

		res.status(200).json({
			status: "success",
			message: "Event has been followed",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

export const getFollowedEvents = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.userId).populate("followed");

		res.status(200).json({
			status: "success",
			data: user.followed,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
