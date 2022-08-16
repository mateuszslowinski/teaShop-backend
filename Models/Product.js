import mongoose from "mongoose";
import {Review} from "./Review.js";


const productSchema = mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        reviews: [Review],
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numReviews: {
            type: Number,
            require: true,
            default: 0
        },
        price: {
            type: Number,
            require: true,
            default: 0
        },
        countInStock: {
            type: Number,
            require: true,
            default: 0
        },
    },
    {timestamps: true}
)


export const Product = mongoose.model('Product', productSchema)