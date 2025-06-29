const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true,
    },
    lastName: {
        type: String, 
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    image: {
        type: String,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    resetPasswordExipres: {
        type: Date,
    },
    accountType: {
        type: String,
        required: true,
        enum: ["Customer", "Provider"]
    }
})

module.exports = mongoose.model("User", userSchema)