import {ValidationError} from "../utils/error.js";
import {User} from "../Models/User.js";
import bcrypt from 'bcryptjs';
import {generateToken} from "../utils/token.js";

export const userLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        throw new ValidationError('This email is not found')
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
        throw new ValidationError('Password is incorrect')
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