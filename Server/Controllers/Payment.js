// const { instance } = require("../Config/razorpay");
const Product = require("../Models/Product");
const crypto = require("crypto");
const User = require("../Models/User");
const mailSender = require("../Utils/MailSender");
const { instance } = require("../Config/Razorpay");
require("dotenv").config();
// const {instance} = require("../Config/Razorpay")

// Capture Payment  
exports.capturePayment = async (req, res) => {
    try{
        const {products} = req.body;
        const userId = req.user.id;

        if(products.length === 0){
            return res.status(400).json({
                success: false,
                message: "Provide products to capture payment."
            })
        }

        if(! userId){
            return res.status(400).json({
                success: false,
                message: "Only registered users are allowed to buy product",
            })
        }

        let totalAmount = 0;
        // console.log("Products :- ", products);
        for(let prd of products){
            // console.log("Prd :- ", prd);
            try{
                let productFind = await Product.findById({_id: prd._id});

                if(! productFind){
                    return res.status(400).json({
                        success: false,
                        message: "Please provide correct list of products."
                    })
                }

                // if(prd.customers.includes(userId)){
                //     return res.status(400).json({
                //         success: false,
                //         message: "User has already bought the product."
                //     })
                // }

                totalAmount += prd?.price;
            }catch(error){
                return res.status(500).json({
                    success: false,
                    message: "Error while calculating total Amount"
                })
            }
        }

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
        }

        const paymentResponse = await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            message: "Successfully created order.",
            data: paymentResponse,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while capturing payment :- ${error}`
        })
    }
}

// Verify Signature
exports.verifySignature = async (req, res) => {
    try{
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;

        const products = req.body?.products;
        const userId = req.user.id;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !products || !userId){
            return res.status(400).json({
                success: false,
                message: "Payment failed as something is empty"
            });
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature){
            // Enroll Customers
            await enrollCustomers(products, userId, res);
            
            //return response
            return res.status(200).json({
                success: true,
                message: "Payment Verified"
            });
        }
        return res.status(400).json({
            success: false,
            message: "Payment verification failed"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while verifying the payment signature. :- ${error}`,
        })
    }
}

// Enroll Customer
async function enrollCustomers(products, userId, res){
    try{
        if(products.length === 0 || ! userId){
            return res.status(400).json({
                success: false,
                message: "Please provide valid details."
            })
        }

        for(let prd of products){
            try{
                await Product.findByIdAndUpdate(
                    {_id: prd._id},
                    {
                        $push: {
                            customers: userId,
                        }
                    },
                    {new: true},
                )

                const userDetails = await User.findByIdAndUpdate(
                    {_id: userId},
                    {
                        $push: {
                            products: prd._id
                        }
                    },
                    {new: true}
                )

                await mailSender(userDetails.email, "You have successfully bought the course", "You have success payment.")
            }
            catch(error){
                return res.status(400).json({
                    success: false,
                    message: `Error while enrolling customers to product and product to customers list. :- ${error}`
                })
            }
        }
        return res.status(200).json({
            success: true,
            message: "Successfully enrolled customers and products to each other's list."
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while enrolling customers.`
        })
    }
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
    try{
        const {orderId, paymentId, amount} = req.body
        const userId = req.user.id;

        if(! orderId || ! paymentId || ! amount || !userId){
            return res.status(400).json({
                success: false,
                message: "Provide valid details."
            })
        }

        const userDetails = await User.findById({_id: userId});
        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "User doesn't exists",
            })
        }

        await mailSender(userDetails.email, "Payment Successfull", `Payment Order Id :- ${orderId}, Payment Id :- ${paymentId}, Amount :- ${amount}`);

        return res.status(200).json({
            success: true, 
            message: "Payment success email sent successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while sending payment success email :- ${error}`
        })
    }
}