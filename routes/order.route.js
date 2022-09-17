import express from "express";
import {createOrder, getOrder, getOrdersByUser} from "../controllers/order.controller.js";
import {protect} from "../middleware/auth.middleware.js";


export const orderRoute = express.Router();


orderRoute
    .get('/:id',protect, getOrder)
    .get('/user/:id',protect,getOrdersByUser)
    .post('/', protect, createOrder)
