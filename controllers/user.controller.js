import bcrypt from 'bcryptjs';
import {generateToken} from "../utils/token.js";
import {User} from "../Models/User.js";
import {NotFoundError, ValidationError} from "../utils/error.js";

export const userLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        throw new ValidationError('This email is not found');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
        throw new ValidationError('Password is incorrect');
    }

    if (user && isCorrectPassword) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            createdAt: user.createdAt,
        })
    }
}

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
        });
    } else {
        throw new NotFoundError('User not found');
    }
}