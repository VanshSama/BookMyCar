const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({ 
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    pincode: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    about: {
        type: String,
    }
})

module.exports = mongoose.model("Profile", profileSchema)