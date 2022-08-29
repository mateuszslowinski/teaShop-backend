import express from "express";
import { productReview} from "../controllers/review.controller.js";
import {protect} from "../middleware/auth.middleware.js";

export const reviewRoute = express.Router()


reviewRoute.post('/:id', protect, productReview)