import express from "express";
import {getOrder} from "../controllers/order.controller.js";


export const orderRoute = express.Router();


orderRoute.post('/', getOrder)