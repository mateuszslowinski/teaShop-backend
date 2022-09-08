import express from "express";
import { sendNewsletter} from "../controllers/email.controller.js";

export const emailRoute = express.Router();

emailRoute.post('/', sendNewsletter)