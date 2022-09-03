import {Order} from "../Models/Order.js";
import {ValidationError} from "../utils/error.js";

export const getOrder = async (req, res) => {
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