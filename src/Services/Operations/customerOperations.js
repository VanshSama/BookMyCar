import toast from "react-hot-toast";
import { paymentEndpoints } from "../apis"
import { apiConnector } from "../apiConnector";
// import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../Reduer/Slices/cartSlice";

const {CAPTURE_PAYMENT, VERIFY_SIGNATURE, SEND_PAYMENT_EMAIL} = paymentEndpoints

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export const buyCourse = async (token, products, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading...");

    // console.log("Products :- ", products);
    try{
        // Load the Script;
        const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(! res){
            toast.error("Razorpay SDK failed to load");
            return ;
        }

        // Initiate the order
        const orderResponse = await apiConnector("POST", 
            CAPTURE_PAYMENT, 
            {products: products},
            {
                Authorization: `Bearer ${token}`,
            }
        )

        // console.log("Order response :- ", orderResponse);
        if(! orderResponse?.data?.success){
            throw new Error(orderResponse.data.message);
        }

        // Create options
        // console.log("User Details :- ", userDetails);
        const options = {
            key: "rzp_test_PSdZCSNWJajYWq",
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "Book My Car",
            description: "Thank You for purchasing the Product",
            image: null,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails?.email
            },
            handler: function(response){
                // Send Success mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                
                // Verify Payments
                verifyPayment({...response, products}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("OOPs, Payment failed");
            console.log(response);
        })
    }
    catch(error){
        console.log("Payment API error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await apiConnector("POST", 
            SEND_PAYMENT_EMAIL, 
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
    }catch(error){
        console.log("Payment success email API error :- ", error);
    }
}

// Verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment...");
    // dispatch(setPaymentLoading(true));
    try{
        console.log("Body Data :- ", bodyData);
        const response = await apiConnector("POST", 
            VERIFY_SIGNATURE, 
            bodyData, 
            {
                Authorization: `Bearer ${token}`,
            }
        )

        if(! response?.data?.success){
            throw new Error(response.data.message);
        }
        
        toast.success("Payment successfull");
        navigate("/dashboard/product-history");
        dispatch(resetCart());
    }catch(error){
        console.log("Payment verify error", error);
        toast.error("Couldn't verify Payment");
    } 
    toast.dismiss(toastId);
    // dispatch(setPaymentLoading(false));
}