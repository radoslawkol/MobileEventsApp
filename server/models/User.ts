import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
});

const User = mongoose.model("User", userSchema);

export default User;
