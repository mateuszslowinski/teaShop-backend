import nodemailer from "nodemailer";
import {ValidationError} from "./error.js";

export const Email = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
    });

    await transporter.sendMail(options, (err, info) => {
        if (err) {
            throw new ValidationError(err.message)
        }
    });
}