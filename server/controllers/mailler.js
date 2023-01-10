import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

let nodeConfig = {
    service : 'gmail',
    auth: {
        user: ENV.EMAIL, // generated ethereal user
        pass: ENV.PASS, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product:{
        name:"- Sh - Software Solutions",
        link:'https://mailgen.js/'
    }
});

export const registerMail = async(req, res) => {
    const {username, email, text, subject} = req.body;
    var e_mail = {
        body : {
            name: username,
            intro: text || 'Welcome to Our company',
            outro: 'Need help, or have a Quaction? Just Reply this e-mail'
        }
    }

    var emailBody = MailGenerator.generate(e_mail);

    let message = {
        from: ENV.EMAIL,
        to: email,
        subject: subject || 'Signup Successful',
        html: emailBody
    }

    //send e-mail
    transporter.sendMail(message)
    .then(() => {
        return res.status(201).send({msg: "You should Recived an email from us..!"})
    })
    .catch(err => res.status(500).send({err}))
}