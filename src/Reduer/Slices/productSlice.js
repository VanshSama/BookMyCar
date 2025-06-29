import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    product: null,
    editProduct: false,
    paymentLoading: false,
}

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setStep: (state, value) => {
            state.step = value.payload
        },
        setProduct: (state, value) => {
            state.product = value.payload
        },
        setEditProduct: (state, value) => {
            state.editProduct = value.payload
        },
        setPaymentLoading: (state, value) => {
            state.paymentLoading = value.payload
        },
        resetProductState: (state) => {
            state.step = 1;
            state.editProduct = false;
            state.paymentLoading = false;
        }
    }
})

export const {setStep, setProduct, setEditProduct, setPaymentLoading, resetProductState} = productSlice.actions
export default productSlice.reducer;