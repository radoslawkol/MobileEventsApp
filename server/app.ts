import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

let app: Express = express();

app.get("/", (req: Request, res: Response) => {
	res.send("hello");
});

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
