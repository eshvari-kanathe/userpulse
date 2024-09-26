import { configureStore } from "@reduxjs/toolkit";
// import  authReducer  from "../redux/authentication/authSlice"
// import userReducer from "../redux/users/userSlice"
import authReducer from "../Redux/Slice/AuthSlice"
import userReducer from "../Redux/Slice/UserSlice"
const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
    }
})
export default store