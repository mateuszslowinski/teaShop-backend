import {Product} from "../Models/Product.js";
import {NotFoundError} from "../utils/error.js";

export const findAllProduct = async (req, res) => {

    try {
        const products = await Product.find({})
        res.json(products)
    } catch (e) {
        throw new NotFoundError(e.message)
    }


}

export const findOneProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product)
    } else {
        throw new NotFoundError('Nie znaleziono tego produktu')
    }

}