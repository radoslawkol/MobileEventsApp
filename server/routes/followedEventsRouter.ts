import { authenticate } from "./../middlewares/authenticate.js";
import {
	followEvent,
	getFollowedEvents,
} from "../controllers/followedEventsController.js";
import express, { Express, Router } from "express";

const router = express.Router();

router
	.route("/")
	.patch(authenticate, followEvent)
	.get(authenticate, getFollowedEvents);

export default router;
