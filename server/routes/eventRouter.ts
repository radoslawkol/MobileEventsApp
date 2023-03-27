import {
	createEvent,
	getAllEvents,
	getEventById,
} from "./../controllers/eventController.js";
import express, { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";

const router: Router = express.Router();

router.route("/").post(authenticate, createEvent).get(getAllEvents);
router.route("/:id").get(getEventById);

export default router;
