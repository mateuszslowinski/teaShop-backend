import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
})

export const ReviewSchema = mongoose.model('Review', reviewSchema)