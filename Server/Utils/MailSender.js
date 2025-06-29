const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: 'Book My Car - Sahil Sama',
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line
            html: `${body}`, // html body
        });
    
        console.log("Message sent: ", info);
        return info;
    }
    catch(error){
        console.log(`Error while sending mail :- ${error}`)
    }
}

module.exports = mailSender