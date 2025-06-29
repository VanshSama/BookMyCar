const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({ 
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
    },
    productType: {
        type: String, 
    },
    productDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductDetails"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews"
    }],
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    category: {
        type: "String",
        // required: true,
        enum: ["New", "Rent", "Old"]
    },
    images: [{
        type: String,
    }],
    createdAt: {
        type: Date,
    }
})

module.exports = mongoose.model("Product", productSchema)