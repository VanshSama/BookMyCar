import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalPrice: localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const index = state.cart.findIndex((prd) => prd._id === product._id);

            // console.log(state.cart);
            console.log(index);
            if(index >= 0){
                toast.error("Product is already in Cart");
                return ;
            }

            state.cart.push(product);
            state.totalItems++;
            state.totalPrice += product?.price;

            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
            localStorage.setItem("cart", JSON.stringify(state.cart));

            toast.success("Item added")
        },
        removeFromCart(state, action){
            const product = action.payload;
            const index = state.cart.findIndex((prd) => prd._id === product._id);

            if(index >= 0){
                state.totalItems--;
                state.totalPrice -= state.cart[index].price;
                state.cart.splice(index, 1);

                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
                localStorage.setItem("cart", JSON.stringify(state.cart));

                toast.success("Item removed");
            }
        },
        setTotalItems(state, action){
            state.totalItems = action.payload;
        },
        resetCart(state, action){
            state.cart = [];
            state.totalItems = 0;
            state.totalPrice = 0;

            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")

            // toast.success("Cart reset");
        }
    }
})

export const {addToCart, removeFromCart, setTotalItems, resetCart} = cartSlice.actions;
export default cartSlice.reducer;