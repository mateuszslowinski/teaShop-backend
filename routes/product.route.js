import express from "express";
import {findAllProduct, findOneProduct} from "../controllers/product.controller.js";

export const productRoute = express.Router()

productRoute
    .get('/', findAllProduct)
    .get('/:id', findOneProduct)