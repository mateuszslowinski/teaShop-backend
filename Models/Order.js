import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        orderItems: [
            {
                name: {type: String, required: true},
                price: {type: String, required: true},
                quantity: {type: Number, required: true},
                image: {type: String, required: true},
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product"
                }
            }
        ],
        shippingAddress: {
            name: {type: String, required: true},
            street: {type: String, required: true},
            buildingNumber: {type: String, required: true},
            zipCode: {type: String, required: true},
            city: {type: String, required: true},
        },
        price: {
            type: Number,
            required: true,
            default: 0.0,
        },
    },
    {timestamps: true}
)


export const Order = mongoose.model('Order', orderSchema)