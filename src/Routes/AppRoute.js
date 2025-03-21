import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import PrivateRoutes from "./PrivateRoutes";
import UserList from "../Pages/UserDashboard/UserList";
import UpdateUser from "../Pages/UserDashboard/UpdateUser";
import ResetPassword from "../Pages/Auth/ResetPassword";
import PageNotFound from "../Components/System/PageNotFound";
import ProductData from "../Pages/Products/ProductData";

const AppRoute = () => {
    const userToken = localStorage.getItem("token");
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!userToken) {
    //         navigate("/"); 
    //     }
    // }, [userToken, navigate]);

    return (
        <>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/auth/reset-password/:id/:token" element={<ResetPassword />} />
                {/* <Route path="*" element={<Login />} /> */}

                {/* <Route path="/dashboard" element={userToken ? <PrivateRoutes Component={UserList} /> : <Login />} />
                <Route path="/form" element={userToken ? <PrivateRoutes Component={UpdateUser} /> : <Login />} /> */}

                <Route path="/dashboard" element={<PrivateRoutes Component={UserList} /> } />
                <Route path="/form" element={<PrivateRoutes Component={UpdateUser} /> } />
                <Route path="/productData" element={<PrivateRoutes Component={ProductData}/>}/>


                <Route path="*" element={<PageNotFound />} />
                
            </Routes>
        </>
    )
}

export default AppRoute;
