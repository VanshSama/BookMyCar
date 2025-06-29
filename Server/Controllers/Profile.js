const Product = require("../Models/Product");
const ProductDetails = require("../Models/ProductDetails");
const Profile = require("../Models/Profile");
const User = require("../Models/User");
const { uploadToCloud } = require("../Utils/UploadToCloud");
require("dotenv").config();
 
// Update profile
exports.updateProfile = async (req, res) => {
    try{
        const {firstName, lastName, contactNo, gender, dateOfBirth, pincode, city, state, about} = req.body;
        const userId = req.user.id;

        if(! userId){
            return res.status(400).json({
                success: false,
                message: "Provide valid details."
            })
        }

        const userDetails = await User.findById({_id: userId}).populate("additionalDetails").populate("products").exec();
        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "User doesn't exists."
            })
        }

        await Profile.findByIdAndUpdate(
            {_id: userDetails.additionalDetails._id},
            {
                gender: gender,
                dateOfBirth: dateOfBirth,
                pincode: pincode,
                city: city,
                state: state,
                about: about
            },
            {new: true}
        );

        await User.findByIdAndUpdate(
            {_id: userId},
            {
                firstName: firstName,
                lastName: lastName,
                contactNo: contactNo
            },
            {new: true}
        )
        // const addDetails = await Profile.findById({_id: userDetails.additionalDetails._id});
        // addDetails.gender = gender;
        // addDetails.dateOfBirth = dateOfBirth;
        // addDetails.pincode = pincode;
        // addDetails.city = city;
        // addDetails.state = state;
        // addDetails.about = about;
        // await addDetails.save();

        // userDetails.firstName = firstName;
        // userDetails.lastName = lastName;
        // userDetails.contactNo = contactNo;

        // await userDetails.save();

        const updatedDetails = await User.findById({_id: userId}).populate("additionalDetails").populate("products").exec();
        
        return res.status(200).json({
            success: true,
            message: "Successfully updated profile details.",
            data: updatedDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Profile Updating error :- ${error}`
        })
    }
}

// Delete Account
exports.deleteAccount = async (req, res) => {
    try{
        const userId = req.user.id;
        if(! userId){
            return res.status(400).json({
                success: false,
                message: `Provide valid details.`
            })
        }

        const userDetails = await User.findById({_id: userId});
        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "User doesn't exists."
            })
        }

        const prds = userDetails?.products;
        if(!prds && prds.length !== 0){
            if(userDetails.accountType === "Customer"){
                for(let prd_id in prds){
                    const productDetails = await Product.findByIdAndUpdate(
                        {_id: prd_id},
                        {
                            $pop: {
                                customers: userId,
                            }
                        },
                        {new: true},
                    );

                    if(! productDetails){
                        return res.status(400).json({
                            success: false,
                            message: "Error while deleting the account."
                        })
                    }
                }
            }
            else{
                for(let prd_id in prds){
                    const productDetails = await Product.findById({_id: prd_id});

                    if(! productDetails){
                        return res.status(400).json({
                            success: false,
                            message: "Error while deleting account.",
                        })
                    }

                    await ProductDetails.findByIdAndDelete({_id: productDetails.productDetails});

                    const cust = productDetails?.customers;
                    if(! cust && cust.length !== 0){
                        for(let uid in cust){
                            await User.findByIdAndUpdate(
                                {_id: uid},
                                {
                                    $pop: {
                                        products: prd_id,
                                    }
                                },
                                {new: true},
                            )
                        }
                    }
                }
            }
        }

        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        await User.findByIdAndDelete({_id: userId});

        return res.status(200).json({
            success: true,
            message: "User successfully deleted."
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while deleting account :- ${error}`,
        })
    }
}

// Update Display Profile Image
exports.updateProfileImage = async (req, res) => {
    try{
        const userId = req.user.id;
        if(! userId){
            return res.status(400).json({
                success: false,
                message: "Only registered user is allowed to change Profile image."
            })
        }

        if(! req.files || ! req.files.profileImage){
            return res.status(404).json({
                success: false,
                message: "Please provide image.",
            })
        }

        const image = req.files.profileImage;
        const response = await uploadToCloud(image, process.env.FOLDER_NAME);

        const userDetails = await User.findByIdAndUpdate(
            {_id: userId},
            {
                image: response.secure_url,
            },
            {new: true},
        )

        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "User doesn't exists."
            })
        }
        return res.status(200).json({
            success: true,
            message: "user profile image has been successfully updated.",
            data: userDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while updating profile image :- ${error}`
        })
    }
}

// Get User all Details
exports.getUserDetails = async (req, res) => {
    try{
        const userId = req.user.id;

        if(! userId){
            return res.status(400).json({
                success: false,
                message: "Provide valid details."
            })
        }

        const userDetails = await User.findById({_id: userId})
        .populate("additionalDetails")
        .populate({
            path: "products",
            populate: {
                path: "productDetails owner customers ratingAndReviews",
            }
        })
        .exec();

        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "User doesn't exists.",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User detailed successfully fetched.",
            data: userDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while getting user details :- ${error}`,
        })
    }
}

// Show all products of that user
exports.showAllProductsOfUser = async (req, res) => {
    try{
        const userId = req.user.id;

        if(! userId){
            return res.status(400).json({
                success: false,
                message: "Kindly Login to check your details",
            })
        }

        const userDetails = await User.findById({_id: userId})
        .populate({
            path: "products",
            populate: {
                path: "productDetails owner ratingAndReviews customers",
            }
        })
        .exec();

        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "User doesn't exists",
            })
        }

        const prd = userDetails?.products;
        return res.status(200).json({
            success: true,
            message: "All Products of User has been fetched successfully",
            data: prd,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false, 
            message: "Error while showing all products",
        })
    }
}

// Show all details of all users
exports.showAllUserDetails = async (req, res) => {
    try{
        const userDetails = await User.find()
        .populate("additionalDetails")
        .populate(
            {
                path: "products",
                populate: {
                    path: "productDetails"
                }
            }
        ).exec();

        return res.status(200).json({
            success: true,
            message: "All user details fetched successfully",
            data: userDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while showing all user all details`
        })
    }
}