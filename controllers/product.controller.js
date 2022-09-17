import {Product} from "../Models/Product.js";
import {NotFoundError, ValidationError} from "../utils/error.js";
import {validateLength, validateMaxNumber} from "../utils/validation.js";

export const findAllProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (e) {
        throw new NotFoundError(e.message)
    }
}

export const findOneProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        throw new NotFoundError('Nie znaleziono tego produktu');
    }
}

export const findProductByCategory = async (req, res) => {
    const products = await Product.find({category: req.params.name});

    if (products) {
        res.status(200).json(products);
    } else {
        throw new NotFoundError('Nie znalezionio takiej kategori');
    }
}

export const addProduct = async (req, res) => {
    const {productName, name, category, description, price, countInStock} = req.body

    validateLength(productName, 30, 'Nazwa nie może być pusta ani większa niż 30 znaków');
    validateLength(category, 50, 'Kategoria produktu nie może być pusta ani większa niż 50 znaków');
    validateLength(description, 800, 'Opis nie może być pusty ani większy niż 800 znaków');
    validateMaxNumber(price, 0, 'Cena nie może byc mniejsza niż zero');
    validateMaxNumber(countInStock, 0, 'Ilość produktów nie może byc mniejsza niż zero');

    const product = await new Product({
        name: productName.toLowerCase(),
        category: category.toLowerCase(),
        image: name,
        description,
        price,
        countInStock
    })
    try {
        await product.save();
        res.status(200).json(product);
    } catch (e) {
        throw new ValidationError('Nie udana próba dodania produktu');
    }
}

export const removeProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id)
        res.status(201).json('Pomyślnie usunięto produkt')
    } catch (error) {
        throw new ValidationError(error.message);
    }
}

export const editProduct = async (req, res) => {
    const {productName, name, category, description, price, countInStock} = req.body;

    validateLength(productName, 30, 'Nazwa nie może być pusta ani większa niż 30 znaków');
    validateLength(category, 50, 'Kategoria produktu nie może być pusta ani większa niż 50 znaków');
    validateLength(description, 800, 'Opis nie może być pusty ani większy niż 800 znaków');
    validateMaxNumber(price, 0, 'Cena nie może byc mniejsza niż zero');
    validateMaxNumber(countInStock, 0, 'Ilość produktów nie może byc mniejsza niż zero');

    try {
        await Product.findByIdAndUpdate(req.params.id, {
            name: productName,
            image: name,
            category,
            description,
            price,
            countInStock
        });
        res.status(200).json({message: 'Produkt zaktualizowany'});
    } catch (error) {
        throw new ValidationError(error.message);
    }

}