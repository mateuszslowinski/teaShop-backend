import {ValidationError} from "../utils/error.js";
import {Email} from "../utils/mailer.js";
import {validateEmail} from "../utils/validation.js";

export const sendNewsletter = async (req, res) => {
    const {email} = req.body;

    if (!validateEmail(email)) {
        throw new ValidationError('Nieprawidłowy email');
    }

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Subskrypcja TeaShop newsletter',
        html: `<!doctype html><html lang='pl'><head><meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
<meta http-equiv='X-UA-Compatible' content='ie=edge'>
<title>TeaShop</title></head>
<body>
<div style="margin:0;padding:20px;background-color:aliceblue;color:black;text-align:center;">
<h1>TeaShop - twoje najlepsze miejsce z herbatą</h1>
<h2>Dziękujemy za dołączenie do newslletera teaShop.</h2>
<p>Wkrótce więcej informajci od nas...</p>
</div>
</body>
</html>`,
    }

    try {
        await Email(mailOptions)
        res.status(201).json({msg: 'Wiadomość wysłano'});
    } catch (e) {
        throw new ValidationError(e.message)
    }

}