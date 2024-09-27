import { useEffect } from "react"
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom"

const PrivateRoutes = ({ Component }) => {
    const  token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [token])

    return (
        <div>
            {token ? <Component /> : <Navigate to="/" />}
        </div>
    )
}

export default PrivateRoutes

