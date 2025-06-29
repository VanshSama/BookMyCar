const User = require("../Models/User");
const mongoose = require("mongoose");
const crypto = require("crypto");
const mailSender = require("../Utils/MailSender");
require("dotenv").config();
const bcrypt = require("bcrypt");

// Reset password token generation 
exports.resetPasswordToken = async (req, res) => {
    try{
        const {email} = req.body;

        if(! email){
            return res.status(400).json({
                success: false,
                message: "Provide valid details",
            })
        }

        const userDetails = await User.findOne({email: email});
        if(! userDetails){
            return res.status(404).json({
                success: false,
                message: "User doesn't exists"
            })
        }

        const token = crypto.randomUUID();

        const updatedDetails = await User.findByIdAndUpdate(
            {_id: userDetails._id},
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            {new: true},
        )

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(userDetails.email, "Reset Password Link", `Click on the link to reset the password ${url}`)

        return res.status(200).json({
            success: true,
            message: "Successfully sent reset password token to email",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while reset password token generation.`
        })
    }
}

// Reset Password
exports.resetPassword = async (req, res) => {
    try{
        const {token, password, confirmPassword} = req.body;
        // const {token} = req.params;

        // console.log(token, " - ", password, " - ", confirmPassword);
        if(! token || ! password || ! confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Provide all details",
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Both passwords should be same"
            })
        }

        const userDetails = await User.findOne({token: token});
        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "User doesn't exists",
            })
        }

        if(userDetails.resetPasswordExipres < Date.now()){
            return res.status(400).json({
                success: false,
                message: "Token has been expired"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if(userDetails.password === hashedPassword){
            return res.status(400).json({
                success: false,
                message: "New password should be different from old password",
            })
        }

        await User.findOneAndUpdate(
            {token: token},
            {
                password: hashedPassword
            },
            {new: true},
        )
        return res.status(200).json({
            success: true,
            message: "Password has been updated successfully."
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while reset the password :- ${error}`,
        })
    }
}