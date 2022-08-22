import express from "express";
import { getUserProfile, userLogin} from "../controllers/user.controller.js";
import {protect} from "../middleware/auth.middleware.js";

export const userRoute = express.Router()

userRoute
    .post('/login', userLogin)
    .post('/profile',protect, getUserProfile)