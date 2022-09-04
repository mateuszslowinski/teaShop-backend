import {Order} from "../Models/Order.js";
import {NotFoundError, ValidationError} from "../utils/error.js";

//CREATE ORDER
export const createOrder = async (req, res) => {
    const {user, cartItems, deliveryAddress, totalPrice} = req.body;
    if (!user) {
        throw new ValidationError('Brak id użytkownika w zamówieniu')
    }

    if (!cartItems) {
        throw new ValidationError('Brak produktu w zamówieniu')
    }
    if (!deliveryAddress) {
        throw new ValidationError('Brak adresu w zamówieniu')
    }

    if (!totalPrice) {
        throw new ValidationError('Brak ceny w zamówieniu')
    }
    try {
        const order = new Order({
            user,
            orderItems: cartItems,
            shippingAddress: deliveryAddress,
            price: totalPrice
        })
        const createdOrder = await order.save()
        res.status(200).json(createdOrder)
    } catch (error) {
        throw new ValidationError(error.message);
    }
}

//GET SINGLE ORDER
export const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', "username email");

    if (!order) {
        throw new NotFoundError('Nie znaleziono podanego zamówienia')
    }

    try {
        res.status(200).json(order)
    } catch (e) {
        throw new ValidationError(e.message)
    }
}

// GET ALL ORDERS BY USER
export const getOrdersByUser = async (req, res) => {
    const orders = await Order.find({user: req.params.id})

    if (!orders) {
        throw new NotFoundError('Nie znaleziono zamówień podanego użytkownika')
    }

    try {
        res.status(200).json(orders)
    } catch (e) {
        throw new ValidationError(e.message)
    }

}