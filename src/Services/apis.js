const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/send-otp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// Profile End Points
export const profileEndpoints = {
    UPDATE_PROFILE: BASE_URL + "/profile/update-profile",
    DELETE_ACCOUNT: BASE_URL + "/profile/delete-account",
    UPDATE_PROFILE_IMAGE: BASE_URL + "/profile/update-profile-image",
}

// User End Points
export const userEndpoints = {
    USER_DETAILS: BASE_URL + "/profile/user-details",
    USER_PRODUCTS: BASE_URL + "/profile/user-products",
    USERS_DETAILS: BASE_URL + "/profile/users-details",
}

// Product End points
export const productEndpoints = {
    CREATE_PRODUCT: BASE_URL + "/product/create-product",
    EDIT_PRODUCT: BASE_URL + "/product/edit-product",
    DELETE_PRODUCT: BASE_URL + "/product/delete-product",

    CATEGORY_PRODUCTS: BASE_URL + "/product/category-products",
    PRODUCT_DETAILS: BASE_URL + "/product/product-details",
    ADD_PRODUCT_DETAILS: BASE_URL + "/product/add-product-details",
    ADD_PRODUCT_VISUALS: BASE_URL + "/product/add-product-visuals",
    EDIT_PRODUCT_DETAILS: BASE_URL + "/product/edit-product-details",
    GET_ALL_PRODUCTS: BASE_URL + "/product/get-all-products",
}

// Rating End Points
export const ratingEndpoints = {
    CREATE_RATING: BASE_URL + "/product/create-rating",
    GET_RATINGS: BASE_URL + "/product/get-ratings",
    GET_AVG_RATING: BASE_URL + "/product/get-avg-rating",
}

// Payment End Points
export const paymentEndpoints = {
    CAPTURE_PAYMENT: BASE_URL + "/payment/capture-payment",
    VERIFY_SIGNATURE: BASE_URL + "/payment/verify-signature",
    SEND_PAYMENT_EMAIL: BASE_URL + "/payment/send-payment-email",
}