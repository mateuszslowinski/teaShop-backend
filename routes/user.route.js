import express from "express";
import {getUserProfile, updatedProfile, userLogin, userRegister} from "../controllers/user.controller.js";
import {protect} from "../middleware/auth.middleware.js";

export const userRoute = express.Router();


userRoute
    .post('/', userRegister)
    .post('/login', userLogin)
    .get('/profile', protect, getUserProfile)
    .put('/profile/:id',protect, updatedProfile)
