import mongoose from "mongoose";
import Event from "./Event.js";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "User has to have a first name."],
		},
		surname: {
			type: String,
			required: [true, "User has to have a surname."],
		},
		email: {
			type: String,
			unique: true,
			required: [true, "User has to have an email."],
		},
		password: {
			type: String,
			required: [true, "Password is required."],
		},
		followed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
