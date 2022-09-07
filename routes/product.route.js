import express from "express";
import {
    addProduct,
    editProduct,
    findAllProduct,
    findOneProduct, findProductByCategory,
    removeProduct
} from "../controllers/product.controller.js";
import {protect} from "../middleware/auth.middleware.js";

export const productRoute = express.Router()

productRoute
    .get('/', findAllProduct)
    .get('/:id', findOneProduct)
    .post('/', protect, addProduct)
    .put('/:id', protect, editProduct)
    .delete('/:id', protect, removeProduct)
    .get('/category/:name',findProductByCategory)
