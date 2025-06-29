const express = require("express");
const router = express.Router();

const {sendOTP, signup, login, changePassword} = require("../Controllers/Auth");
const { resetPassword, resetPasswordToken } = require("../Controllers/ResetPassword");
const { auth } = require("../Middlewares/Auth");

router.post("/send-otp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/change-password", auth, changePassword);

    // Reset Password
router.post("/reset-password", resetPassword);
router.post("/reset-password-token", resetPasswordToken);

module.exports = router 