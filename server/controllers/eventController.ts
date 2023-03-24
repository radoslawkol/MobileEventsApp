import { Request, Response } from "express";
import Event from "../models/Event.js";

export const createEvent = async (req: Request, res: Response) => {
	try {
		const {
			eventName,
			price,
			maxMembers,
			description,
			eventDatetime,
			coordinates,
		} = req.body;

		if (
			!eventName ||
			!price ||
			!maxMembers ||
			!description ||
			!eventDatetime ||
			!coordinates
		) {
			return res.status(400).json({
				status: "fail",
				message:
					"Event Name, price, maxMembers, description, eventDatetime, coordinates cannot be empty.",
			});
		}

		const event = await Event.create({
			eventName,
			price,
			maxMembers,
			description,
			eventDatetime,
			coordinates,
		});

		res.status(200).json({
			status: "success",
			data: event,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

export const getAllEvents = async (req: Request, res: Response) => {
	try {
		const events = await Event.find().select("eventName _id coordinates");

		if (events.length === 0) {
			return res.status(404).json({
				status: "fail",
				message: "Not found any event.",
			});
		}

		res.status(200).json({
			status: "success",
			data: events,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

export const getEventById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const event = await Event.findById(id);

		if (!event) {
			return res.status(404).json({
				status: "fail",
				message: "Event not found.",
			});
		}

		res.status(200).json({
			status: "success",
			data: event,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
