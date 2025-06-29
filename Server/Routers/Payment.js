const express = require("express");
const router = express.Router();

const {capturePayment, verifySignature, sendPaymentSuccessEmail} = require("../Controllers/Payment");
const { auth, isCustomer } = require("../Middlewares/Auth");

router.post("/capture-payment", auth, isCustomer,capturePayment);
router.post("/verify-signature", auth, isCustomer, verifySignature);

router.post("/send-payment-email", auth, isCustomer, sendPaymentSuccessEmail)
 
module.exports = router