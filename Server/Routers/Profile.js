const express = require("express");
const router = express.Router();

const { auth, isProvider } = require("../Middlewares/Auth");
const { showAllProductsOfUser, showAllUserDetails, updateProfile, deleteAccount, updateProfileImage, getUserDetails } = require("../Controllers/Profile");

    // Update Profile Details
router.post("/update-profile", auth, updateProfile);
router.post("/delete-account", auth, deleteAccount);
router.post("/update-profile-image", auth, updateProfileImage);
router.get("/user-details", auth, getUserDetails);

    // User Details
router.get("/user-products", auth, isProvider, showAllProductsOfUser);
router.post("/users-details", showAllUserDetails);

module.exports = router