import { useContext } from "react"
import Loader from "../components/Loader/Loader"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { MessageContext } from "../context/message.context"

const PrivateRoutes = ({ requiredRoles }) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)

    if (isLoading) {
        return <Loader />
    } else {
        if (!isLoggedIn) {
            showMessage("Unauthorized", "Please Log in ")
            return <Navigate to="/login" />
        } else {
            if (requiredRoles.includes(user.role) || user.role === "ADMIN") {
                return <Outlet />
            } else {
                showMessage("Unauthorized")
                return <Navigate to="/" />
            }
        }
    }
}

export default PrivateRoutes
