import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Slice/AuthSlice"
import userReducer from "../Redux/Slice/UserSlice"
import CategoryReducer from "../Redux/Slice/CategorySlice"
import ProductReducer from "../Redux/Slice/ProductSlice"
const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        category:CategoryReducer,
        product:ProductReducer
    }
})
export default store