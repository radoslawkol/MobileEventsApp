import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";

dotenv.config({
	path: `./.env`,
});

let app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("hello a");
});

app.use(authRouter);

mongoose.connect(`${process.env.DATABASE_URI}`);

mongoose.connection.on("connected", () => {
	console.log("Connected to database.");
});

mongoose.connection.on("error", (err) => {
	console.log("Failed to connect to database.", err);
});

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
