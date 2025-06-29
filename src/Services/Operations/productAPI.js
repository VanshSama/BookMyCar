import toast from "react-hot-toast";
import { productEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {CREATE_PRODUCT, EDIT_PRODUCT, GET_ALL_PRODUCTS, DELETE_PRODUCT, CATEGORY_PRODUCTS, PRODUCT_DETAILS, ADD_PRODUCT_DETAILS, ADD_PRODUCT_VISUALS, EDIT_PRODUCT_DETAILS} = productEndpoints

export const createProduct = async (formData, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try{
        const response = await apiConnector("POST", CREATE_PRODUCT, 
            formData,
            {
                enctype: "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        );

        if(! response?.data?.success){
            throw new Error("Create product API error");
        }

        toast.success("Product Created");
        result = response?.data?.product;
    }
    catch(error){
        console.log(`Product Creation API error`);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const productVisuals = async (formData, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", ADD_PRODUCT_VISUALS,
            formData,
            {
                enctype: "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        );

        if(! response?.data?.success){
            throw new Error("Product Visuals API error");
        }

        toast.success("Product Visuals added");
        result = response?.data?.data;
    }
    catch(error){
        console.log(`Product visuals API error :- ${error}`);
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const addProductDetails = async (formData, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", ADD_PRODUCT_DETAILS,
            formData,
            {
                enctype: "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        );

        if(! response?.data?.success){
            throw new Error("Product Details API error");
        }

        toast.success("Product Details added");
        result = response?.data?.data;
    }
    catch(error){
        console.log(`Product Details API error :- ${error}`);
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const editProductDetails = async (formData, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", EDIT_PRODUCT_DETAILS,
            formData,
            {
                enctype: "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        );

        if(! response?.data?.success){
            throw new Error("Product Details Updation API error");
        }

        toast.success("Product Details Updated");
        result = response?.data?.data;
    }
    catch(error){
        console.log(`Product Details Updation API error :- ${error}`);
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteProduct = async (productId, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", DELETE_PRODUCT,
            {productId},
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(! response?.data?.success){
            throw new Error("Delete Product API error");
        }

        toast.success('Product deleted')
        result = true;
    }
    catch(error){
        console.log(`Delete Product API error :- `, error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const productDetails = async(prdId) => {
    let result = null;
    // console.log("Product Id ;- ", prdId);
    try{
        const response = await apiConnector("POST", PRODUCT_DETAILS,
            {productId: prdId}
        );

        if(! response?.data?.success){
            throw new Error("Product details fetching API error");
        }

        result = response?.data?.data;
    }
    catch(error){
        console.log("Product details fetching API error :- ", error);
        toast.error(error?.response?.data?.message);
    }
    return result;
}

export const editProductInformation = async (formData, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", EDIT_PRODUCT,
            formData, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(! response?.data?.success){
            throw new Error("Product Edit API error");
        }

        toast.success("Details updated");
        result = response?.data?.data;
    }
    catch(error){
        console.log("Product editing API error :- ", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const getAllProducts = async () => {
    let result = null;
    try{
        const response = await apiConnector("GET", GET_ALL_PRODUCTS);

        if(! response?.data?.success){
            throw new Error("Get All Products API error");
        }

        result = response?.data?.data;
    }
    catch(error){
        console.log("Get all products API error :- ", error);
        toast.error("Unable to fetch products");
    }
    return result;
}