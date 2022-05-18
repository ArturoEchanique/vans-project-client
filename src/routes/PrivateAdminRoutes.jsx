import { useContext } from "react"
import Loader from "../components/Loader/Loader"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { MessageContext } from "../context/message.context"

const PrivateRoutes = () => {
    const { isLoggedIn, isLoading } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)

    if (isLoading) {
        return <Loader />
    }

    if (!isLoggedIn) {
        showMessage("Unauthorized", "Please Log in ")
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default PrivateRoutes
