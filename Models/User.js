import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            text: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {timestamps: true}
);



export const User = mongoose.model('User', userSchema)