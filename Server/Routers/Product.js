const express = require("express");
const router = express.Router();

const {createProduct, editProduct, deleteProduct, showCategoryProducts, productAllDetails, addProductAdditionalDetails, addProductVisuals, editProductAdditionalDetails, showAllProducts} = require("../Controllers/Product");
const { auth, isProvider, isCustomer } = require("../Middlewares/Auth");
const {createRating, getAvgRating, getAllRatings} = require("../Controllers/RatingAndReviews")

    // Basic Product Operations 
router.post("/create-product", auth, isProvider, createProduct);
router.post("/edit-product", auth, isProvider, editProduct);
router.post("/delete-product", auth, isProvider, deleteProduct);

    // Category Products
router.post("/category-products", showCategoryProducts);
router.get("/get-all-products", showAllProducts);

    // Product details
router.post("/product-details", productAllDetails);
router.post("/add-product-details", auth, isProvider, addProductAdditionalDetails);
router.post("/add-product-visuals", auth, isProvider, addProductVisuals);
router.post("/edit-product-details", auth, isProvider, editProductAdditionalDetails);

    // Rating and reviews
router.post("/create-rating", auth, isCustomer, createRating);
router.get("/get-ratings", getAllRatings);
router.get("/get-avg-rating", getAvgRating);



module.exports = router