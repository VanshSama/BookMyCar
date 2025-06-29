import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./Slices/authSlice"
import profileReducer from "./Slices/profileSlice"
import cartReducer from "./Slices/cartSlice"
import productReducer from "./Slices/productSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer,
    product: productReducer
})

export default rootReducer