const Product = require("../Models/Product");
const ProductDetails = require("../Models/ProductDetails");
const User = require("../Models/User");
const { uploadToCloud } = require("../Utils/UploadToCloud");
require("dotenv").config(); 

exports.createProduct = async (req, res) => {
    try{
        const {productName, productDescription, productType, price} = req.body;
        const userId = req.user.id;
        const thumbnail = req.files.thumbnail;

        if(! productName || ! productDescription || ! productType || !price){
            return res.status(400).json({
                success: false,
                message: `Provide valid details`
            })
        }

        if(! userId){
            return res.status(400).json({
                success: false,
                message: "Kindly login, then only you are allowed to create a product."
            })
        }

        const imgUploadResponse = await uploadToCloud(thumbnail, process.env.FOLDER_NAME);
        if(! imgUploadResponse){
            return res.status(400).json({
                success: false,
                message: "Error while uploading image to cloud"
            })
        }

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        const productResponse = await Product.create({
            productName: productName,
            productDescription: productDescription,
            productType: productType,
            price: price,
            owner: userId,
            thumbnail: imgUploadResponse.secure_url,
            createdAt: formattedDate,
        });

        const userDetails = await User.findByIdAndUpdate(
            {_id: userId},
            {
                $push: {
                    products: productResponse._id,
                }
            },
            {new: true},
        )

        return res.status(200).json({
            success: true,
            message: "Successfully created product",
            product: productResponse,
            // data: userDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while creating product :- ${error}`
        })
    }
}

exports.editProduct = async (req, res) => {
    try{
        const {productId, productName, productDescription, productType, price} = req.body;
        const userId = req.user.id;

        const productDetails = await Product.findById({_id: productId})
        if(! productDetails){
            return res.status(404).json({
                success: false,
                message: "Product doesn't exists"
            })
        }

        // if(productDetails.owner !== userId){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Only owner is allowed to edit product details."
        //     })
        // }

        let newthumbnail = productDetails?.thumbnail;
        if(req.files && req.files.thumbnail){
            const newthmb = req.files.thumbnail;

            const uploadedImage = await uploadToCloud(newthmb, process.env.FOLDER_NAME);
            newthumbnail = uploadedImage.secure_url;
        }

        // for(let key in updates){
        //     if(updates.hasOwnProperty(key)){
        //         if(key === "productDetails"){
        //             courseDetails[key] = JSON.parse(updates[key]);
        //         }else{
        //             courseDetails[key] = updates[key]
        //         }
        //     }
        // }
        

        await Product.findByIdAndUpdate(
            {_id: productId},
            {
                productName: productName,
                productDescription: productDescription,
                price: price,
                productType: productType,
                thumbnail: newthumbnail,
            },
            {new: true}
        )
        .populate("productDetails")
        .exec();

        const updatedDetails = await Product.findById({_id: productId})
        .populate("productDetails")
        .exec();

        // console.log("Updated details :- ", updatedDetails);

        return res.status(200).json({
            success: true,
            message: "Product details are updated",
            data: updatedDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while updating product details :- ${error}`
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const userId = req.user.id;
        const {productId} = req.body;

        if(! userId || ! productId){
            return res.status(400).json({
                success: false,
                message: "Provide all valid details"
            })
        }

        const prdDetails = await Product.findById({_id: productId}).populate("customers");

        if(! prdDetails){
            return res.status(404).json({
                success: false,
                message: "Product doesn't exists"
            })
        }

        const cstm = prdDetails?.customers;

        if(cstm.length > 0){
            for(let cst in cstm){
                await User.findByIdAndUpdate(
                    {_id: cst._id},
                    {
                        $pull: {
                            products: productId,
                        }
                    },
                    {new: true}
                )
            }
        }

        await User.findByIdAndUpdate(
            {_id: userId},
            {
                $pull: {
                    products: productId
                }
            },
            {new: true}
        )

        await Product.findByIdAndDelete({_id: productId});

        return res.status(200).json({
            success: true, 
            message: "Product has been deleted",
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message: `Error while deleting the product :- ${error}`
        })
    }
}

// Show All products acc. to category
exports.showCategoryProducts = async (req, res) => {
    try{
        const {category} = req.body;

        if(! category){
            return res.status(400).json({
                success: false,
                message: "Provide all valid details"
            })
        }

        const prds = await Product.find({category: category})
        .populate("productDetails")
        .populate("ratingAndReviews")
        .populate("customers")
        .exec();

        return res.status(200).json({
            success: true,
            message: "Successfully fetched products acc. to category",
            data: prds
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while returning category products :- ${error}`
        })
    }
}
 
// Show product all details
exports.productAllDetails = async (req, res) => {
    try{
        const {productId} = req.body;
        // console.log("Product Id :- ", productId);

        if(! productId){
            return res.status(404).json({
                success: false,
                message: "Provide all valid details."
            })
        }

        const details = await Product.findById({_id: productId})
        .populate("productDetails")
        .populate("owner", "firstName lastName contactNo email")
        .populate("ratingAndReviews")
        .populate("customers", "firstName lastName contactNo email").exec();

        return res.status(200).json({
            success: true,
            message: "All details of product fetched successfully",
            data: details,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while returning product all details.`
        })
    }
}

// Show all products acc. to location

// Edit Product Additional Details
exports.editProductAdditionalDetails = async (req, res) => {
    try{
        const {productId, brandModel, yearOfManufacture, fuelType, transmission, vehicleType, seatingCapacity, mileage, bodyType, color, engineCapacity, powerOutput, torque, topSpeed, acceleration, fuelTankCapacity, groundClearance, odometerReading, numberOfOwners, tyreType} = req.body;
        const userId = req.user.id;

        if(! productId || ! userId){
            return res.status(400).json({
                success: false,
                message: "Provide valid details",
            })
        }

        const productDetails = await Product.findById({_id: productId});
        if(! productDetails){
            return res.status(404).json({
                success: false,
                message: "Product doesn't exists",
            })
        }

        if(! productDetails.productDetails){
            return res.status(404).json({
                success: false,
                message: "Additional details has not been added yet."
            })
        }

        await ProductDetails.findByIdAndUpdate(
            {_id: productDetails.productDetails},
            {
                brandModel: brandModel, 
                yearOfManufacture: yearOfManufacture, 
                fuelType: fuelType, 
                transmission: transmission, 
                vehicleType: vehicleType,
                seatingCapacity: seatingCapacity, 
                mileage: mileage,
                bodyType: bodyType, 
                color: color, 
                engineCapacity: engineCapacity, 
                powerOutput: powerOutput, 
                torque: torque, 
                topSpeed: topSpeed, 
                acceleration: acceleration, 
                fuelTankCapacity: fuelTankCapacity, 
                groundClearance: groundClearance, 
                odometerReading: odometerReading, 
                numberOfOwners: numberOfOwners, 
                tyreType: tyreType,
            },
            {new: true}
        );

        const updatedDetails = await Product.findById({_id: productId})
        .populate("productDetails")
        .populate("owner")
        .populate("ratingAndReviews")
        .populate("customers")
        .exec();

        return res.status(200).json({
            success: true,
            message: "Successfully Updated additional details",
            data: updatedDetails,
        })
    }
    catch(error){

    }
}

// Add product Additional details for a product
exports.addProductAdditionalDetails = async (req, res) => {
    try{
        const {productId, brandModel, yearOfManufacture, fuelType, transmission, vehicleType, seatingCapacity, mileage, bodyType, color, engineCapacity, powerOutput, torque, topSpeed, acceleration, fuelTankCapacity, groundClearance, odometerReading, numberOfOwners, tyreType} = req.body;
        const userId = req.user.id;

        if(! productId || ! userId){
            return res.status(400).json({
                success: false,
                message: "Provide valid details",
            })
        }

        const productDetails = await Product.findById({_id: productId});
        if(! productDetails){
            return res.status(404).json({
                success: false,
                message: "Product doesn't exists",
            })
        }

        const dtls = await ProductDetails.create({
            brandModel: brandModel, 
            yearOfManufacture: yearOfManufacture, 
            fuelType: fuelType, 
            transmission: transmission, 
            vehicleType: vehicleType, 
            seatingCapacity: seatingCapacity, 
            mileage: mileage,
            bodyType: bodyType, 
            color: color, 
            engineCapacity: engineCapacity, 
            powerOutput: powerOutput, 
            torque: torque, 
            topSpeed: topSpeed, 
            acceleration: acceleration, 
            fuelTankCapacity: fuelTankCapacity, 
            groundClearance: groundClearance, 
            odometerReading: odometerReading, 
            numberOfOwners: numberOfOwners, 
            tyreType: tyreType,
        });


        const updatedDetails = await Product.findByIdAndUpdate(
            {_id: productId},
            {
                productDetails: dtls._id
            },
            {new: true}
        ).populate("productDetails")
        .populate("owner")
        .populate("ratingAndReviews")
        .populate("customers")
        .exec();

        return res.status(200).json({
            success: true,
            message: "Successfully added additional details of product",
            data: updatedDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while adding product additional details`,
        })
    }
}

exports.addProductVisuals = async (req, res) => {
    try{
        const {productId} = req.body;
        const userId = req.user.id;

        if(! productId || ! userId){
            return res.status(400).json({
                success: false,
                message: "Provide valid details",
            })
        }

        const productDetails = await Product.findById({_id: productId});
        if(! productDetails){
            return res.status(404).json({
                success: false,
                message: "Product doesn't exists",
            })
        }

        if(req.files && req.files.Visual){
            if(req.files.Visual.length > 1){
                for(let file of req.files.Visual){
                    const uploadedImage = await uploadToCloud(file, process.env.FOLDER_NAME);

                    await Product.findByIdAndUpdate(
                        {_id: productId},
                        {
                            $push: {
                                images: uploadedImage.secure_url,
                            }
                        },
                        {new: true},
                    )
                }
            }
            else{
                const uploadedImage = await uploadToCloud(req.files.Visual, process.env.FOLDER_NAME);

                await Product.findByIdAndUpdate(
                    {_id: productId},
                    {
                        $push: {
                            images: uploadedImage.secure_url,
                        }
                    },
                    {new: true},
                )
            }
        }

        const updatedDetails = await Product.findById({_id: productId}).populate("productDetails")
        .populate("owner")
        .populate("ratingAndReviews")
        .populate("customers")
        .exec();

        return res.status(200).json({
            success: true,
            message: "Product Visuals added successfully",
            data: updatedDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while adding product visuals :- ${error}`,
        })
    }
}

// Show All products
exports.showAllProducts = async (req, res) => {
    try{
        const response = await Product.find({})
        .populate("ratingAndReviews").exec();

        return res.status(200).json({
            success: true,
            message: "All products shown Successfully",
            data: response
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while getting all products details :- ${error}`
        })
    }
}