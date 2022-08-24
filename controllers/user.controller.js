import bcrypt from 'bcryptjs';
import {generateToken} from "../utils/token.js";
import {User} from "../Models/User.js";
import {NotFoundError, ValidationError} from "../utils/error.js";
import {validateEmail} from "../utils/validation.js";

//REGISTER
export const userRegister = async (req, res) => {
    const {username, email, password} = req.body;

    if (!validateEmail(email)) {
        throw new ValidationError('Invalid email');
    }
    if (!username || username.length > 20) {
        throw new ValidationError('Username can not be empty or longer then 20 signs')
    }
    if (!password || password.length > 15) {
        throw new ValidationError('Password can not be empty or longer then 15 signs')
    }

    const checkEmail = await User.findOne({email});
    if (checkEmail) {
        throw new ValidationError('This email has been taken')
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt)

    const user = await new User({
        username,
        email,
        password: encryptedPassword,
        isAdmin: email === process.env.ADMIN_EMAIL,
    }).save();

    res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    });
}

//LOGIN
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
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
}

//GET USER PROFILE
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        });
    } else {
        throw new NotFoundError('User not found');
    }
}

//UPDATED PROFILE
export const updatedProfile = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            createdAt: updatedUser.createdAt,
            token: generateToken(updatedUser._id),
        });

    } else {
        throw new NotFoundError('Użytkownik nie znaleziony');
    }


}