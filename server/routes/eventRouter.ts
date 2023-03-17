import {
	createEvent,
	getAllEvents,
	getEventById,
} from "./../controllers/eventController.js";
import express, { Router } from "express";

const router: Router = express.Router();

router.route("/").post(createEvent).get(getAllEvents);
router.route("/:id").get(getEventById);

export default router;
