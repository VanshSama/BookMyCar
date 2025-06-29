const User = require("../Models/User");
const otpGenerator = require("otp-generator");
const OTP = require("../Models/OTP")
const bcrypt = require("bcrypt");
const Profile = require("../Models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../Utils/MailSender");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
    try{
        const {email} = req.body;

        if(! email){
            return res.status(404).json({
                success: false,
                message: "Provide valid details i.e. Email is invalid",
            })
        }

        const response = await User.findOne({email});
        if(response){
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await OTP.findOne({otp: otp});

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            
            result = await OTP.findOne({otp: otp});
        }

        const otpBody = await OTP.create({email: email, otp: otp});
        console.log("OTP body :- ", otpBody);

        return res.status(200).json({
            success: true,
            message: "Successfully sent OTP",
            otp: otp,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Failed to Send OTP :- ${error}`
        })
    }
}

exports.signup = async (req, res) => {
    try{
        const {accountType, firstName, lastName, email, contactNo, password, confirmPassword, otp} = req.body;
        // console.log(accountType, " - ", firstName, " - ", lastName, " - ", email, " - ", contactNo, " - ", password, " - ", confirmPassword, " - ", otp);

        if(! firstName || ! lastName || !accountType || ! password || ! confirmPassword || ! otp || !email || !contactNo){
            return res.status(404).json({
                success: false,
                message: "Please enter all valid details",
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Both Passwords must be same",
            })
        }

        const checkUserExists = await User.findOne({email: email});

        if(checkUserExists){
            return res.status(400).json({
                success: false,
                message: "Already account exists, Kindly go for login",
            })
        }

        const recentOtp = await OTP.find({email: email}).sort({createdAt: -1}).limit(1);
        if(recentOtp.length === 0){
            return res.status(400).json({
                success: false,
                message: "No OTP found, try again"
            })
        }

        if(recentOtp[0].otp !== otp){
            return res.status(400).json({
                success: false,
                message: "OTP doesn't matches, Enter Correct OTP",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const profileDetails = await Profile.create({
            dateOfBirth: "",
            gender: "",
            pincode: "",
            city: "",
            about: "",
            state: ""
        });

        const details = await User.create({
            firstName: firstName,
            lastName: lastName,
            contactNo: contactNo,
            email: email,
            password: hashedPassword,
            additionalDetails: profileDetails._id,
            accountType: accountType,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        }).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "Successfully created profile",
            user: details,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while creating account :- ${error}`,
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        // console.log("Req. body :- ", req.body);

        if(! email || ! password){
            return res.status(400).json({
                success: false,
                message: "Please enter valid details",
            })
        }

        const userDetails = await User.findOne({email: email}).populate("products").populate("additionalDetails").exec();
        if(! userDetails){
            return res.status(404).json({
                success: false,
                message: "User doesn't exists",
            })
        }

        const hashedPassword = userDetails.password;
        if(await bcrypt.compare(password, hashedPassword)){
            const payload = {
                email: userDetails.email,
                id: userDetails._id,
                accountType: userDetails.accountType
            };

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            userDetails.token = token;
            userDetails.password = undefined;

            // Generate Cookie
            const options = {
                expires: new Date(Date.now() + 2*24*60*60*1000),
                httpOnly: true,
            };

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                userDetails,
                message: "Logged in Successfully",
            })
        }
        return res.status(400).json({
            success: false,
            message: "Password doesn't matches",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error in logging :- ${error}`
        })
    }
}

exports.changePassword = async (req, res) => {
    try{
        const {newPassword, confirmNewPassword} = req.body;
        const userId = req.user.id;

        if(! confirmNewPassword || ! newPassword){
            return res.status(400).json({
                success: false,
                message: "Provide valid details",
            })
        }

        if(confirmNewPassword !== newPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords must be different",
            })
        }

        const userDetails = await User.findById({_id: userId}).populate("additionalDetails").exec();

        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "User doesn't exists"
            })
        }

        const hashedPassword = userDetails.password;

        if(! await bcrypt.compare(newPassword, hashedPassword)){
            const newHashPass = await bcrypt.hash(newPassword, 10);

            const updatedDetails = await User.findByIdAndUpdate(
                {_id: userId},
                {
                    password: newHashPass,
                },
                {new: true},
            )

            // await updatedDetails.save();
            updatedDetails.password = undefined;
            
            await mailSender(userDetails.email, 
                "Your Password has been updated",
            "Your Password has been updated");

            return res.status(200).json({
                success: true,
                message: "Password has been updated successfully",
                data: updatedDetails,
            })
        }
        return res.status(400).json({
            success: false,
            message: "Password should be different from Old Password."
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error in changing password :- ${error}`
        })
    }
}