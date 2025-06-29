const mongoose = require("mongoose");
const mailSender = require("../Utils/MailSender")
// const emailTemplate = require("../Templates/VerificationEmailTemplate")

const otpSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
})

async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "OTP for your login", `OTP :- ${otp}`);

        console.log("Mail Response :- ", mailResponse);
    }
    catch(error){
        console.log(`Error while sending verification email :- ${error}`)
        throw error;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this?.email, this?.otp)
    next();
})

module.exports = mongoose.model("OTP", otpSchema);