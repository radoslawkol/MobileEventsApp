import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import eventRouter from "./routes/eventRouter.js";
import followedEventsRouter from "./routes/followedEventsRouter.js";

dotenv.config({
	path: `./.env`,
});

let app: Express = express();

app.use(express.json());

app.use(authRouter);
app.use("/events", eventRouter);
app.use("/followed-events", followedEventsRouter);

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
