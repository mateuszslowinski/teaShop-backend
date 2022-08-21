import express from "express";
import {userLogin} from "../controllers/user.controller.js";

export const userRoute = express.Router()

userRoute
    .post('/login', userLogin)
