const mailSender = require("../Utils/MailSender");
require("dotenv").config();

exports.contactUs = async (req, res) => {
    try{ 
        const {name, email, phoneNo, message} = req.body;

        if(! name || ! email || ! phoneNo || ! message){
            return res.status(400).json({
                success: false,
                message: "Error while sending message",
            })
        }

        // Ek khud ko kro send email and ek Dusre ko
        await mailSender(email, "Your Message Has been sent", "Your msg. has been sent");

        return res.status(200).json({
            success: true,
            message: "Message has been successfully sent.",
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message: `Error while sending contact us message :- ${error}`
        })
    }
}