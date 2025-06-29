const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res, next) => {
    try{
        let token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(! token){
            return res.status(404).json({
                success: false,
                message: `Token not found`
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            // console.log("decoded :- ", decode);
            req.user = decode
        }
        catch(error){
            return res.status(402).json({
                success: false,
                message: `Error while verifying token :- ${error}`
            })
        }
        next()
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: `User verification error :- ${error}`
        })
    }
}

exports.isCustomer = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Customer"){
            return res.status(401).json({
                success: false, 
                message: `Only Customers are allowed to perform this action :- ${req.user.accountType}`
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while verification of user role"
        })
    }
}

exports.isProvider = async(req, res, next) => {
    try{
        // console.log("Request :- ", req);
        if(req.user.accountType !== "Provider"){
            return res.status(401).json({
                success: false, 
                message: `Only Providers are allowed to perform this action :- ${req}`
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while verification of customer"
        })
    }
}