import express from "express";
import {addProductReview, removeReview} from "../controllers/review.controller.js";
import {protect} from "../middleware/auth.middleware.js";

export const reviewRoute = express.Router()


reviewRoute
    .post('/:id', protect, addProductReview)
    .put('/:id',protect,removeReview)