import jwt from "jsonwebtoken";
import {User} from "../Models/User.js";
import {ValidationError} from "../utils/error.js";

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    if (!token) {
        throw new ValidationError('Nieprawidlowe uwierzytelnienie');
    }
}