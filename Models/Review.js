import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
        username: {
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

    },
    {timestamps: true}
)

export const ReviewSchema = mongoose.model('Review', reviewSchema)