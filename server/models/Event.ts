import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
	eventName: {
		type: String,
		maxLength: 30,
		required: [true, "Event Name is required."],
	},
	price: {
		type: Number,
		required: [true, "Price is required."],
	},
	maxMembers: {
		type: Number,
		required: [true, "Max members amount is required."],
	},
	description: {
		type: String,
		required: [true, "Event description is required."],
	},
	eventDatetime: {
		type: Date,
		required: [true, "Event datetime is required."],
	},
	coordinates: {
		lat: {
			type: Number,
			required: [true, "Lattitude is required."],
		},
		lng: {
			type: Number,
			required: [true, "Longitude is required."],
		},
	},
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
