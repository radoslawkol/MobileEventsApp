import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getCurrentUser } from "./../controllers/userController.js";

const router = express.Router();

router.get("/current", authenticate, getCurrentUser);

export default router;
