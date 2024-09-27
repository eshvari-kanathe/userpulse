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

const AppRoute = () => {
    const userToken = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        if (!userToken) {
            navigate("/")
        }
    }, [userToken])

    return (
        <>
            {!userToken ?
                <div>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/auth/reset-password/:id/:token" element={<ResetPassword />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                        <Route path="*" element={<PageNotFound />} />

                    </Routes>
                </div>
                :
                <div>
                    <div>
                        <Routes>
                            <Route path="/dashboard" element={<PrivateRoutes Component={UserList} />} />
                            <Route path="/form" element={<PrivateRoutes Component={UpdateUser} />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </div>
                </div>

            }
        </>
    );
};

export default AppRoute;

