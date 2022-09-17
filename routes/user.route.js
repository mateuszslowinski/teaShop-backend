import express from "express";
import {
    findAllUsers,
    getUserProfile,
    removeUser,
    updatedProfile,
    userLogin,
    userRegister
} from "../controllers/user.controller.js";
import {protect} from "../middleware/auth.middleware.js";

export const userRoute = express.Router();


userRoute
    .get('/', protect, findAllUsers)
    .delete('/:id', protect, removeUser)
    .post('/register', userRegister)
    .post('/login', userLogin)
    .get('/profile', protect, getUserProfile)
    .put('/profile/:id', protect, updatedProfile)
