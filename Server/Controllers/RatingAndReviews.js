const Product = require("../Models/Product");
const RatingAndReviews = require("../Models/RatingAndReviews");
require("dotenv").config();

// Create Rating 
exports.createRating = async (req, res) => {
    try{
        const {productId, rating, review} = req.body;
        const userId = req.user.id;

        if(! productId || ! rating || ! review || !userId){
            return res.status(400).json({
                success: false,
                message: "Provide all valid details."
            })
        }

        const alreadyGiven = await RatingAndReviews.findOne({user: userId, product: productId});

        if(alreadyGiven){
            return res.status(400).json({
                success: false,
                message: "You have already provided the rating and reviews."
            })
        }

        const response = await RatingAndReviews.create({
            user: userId,
            rating: rating, 
            reviews: review,
            product: productId,
        });
        
        const productUpdate = await Product.findByIdAndUpdate(
            {_id: productId},
            {
                $push: {
                    ratingAndReviews: response._id
                }
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "Successfully rated the product",
            data: response
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while creating rating and Reviews :- ${error}`
        })
    }
}

// Delete Rating

// Get all Rating and reviews
exports.getAllRatings = async (req, res) => {
    try{
        const response = await RatingAndReviews.find()
        .populate({
            path: "user",
            select: "firstName lastName email image"
        })
        .populate({
            path: "product",
            select: "productName"
        })
        .exec();

        return res.status(200).json({
            success: true,
            message: "Successfully fetched all rating and reviews.",
            data: response
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while fetching all rating and reviews`
        })
    }
}

// Get avg. Rating
exports.getAvgRating = async (req, res) => {
    try{
        const {productId} = req.body;

        if(! productId){
            return res.status(404).json({
                success: false,
                message: "Provide valid details",
            })
        }

        const response = await RatingAndReviews.find({product: productId});
        if(! response){
            return res.status(404).json({
                success: false,
                message: "Product doesn't exists."
            })
        }

        let avgRating = 0;
        for(let rr in response){
            avgRating += (rr?.rating);
        }

        avgRating = avgRating / response.length
        return res.status(200).json({
            success: true,
            message: "Successfully fetched avg. Rating",
            data: response,
            averageRating: avgRating, 
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while fetching avg. rating. :- ${error}`,
        })
    }
}