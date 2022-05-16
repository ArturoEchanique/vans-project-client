import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { MessageContext } from "../context/message.context"
import { Navigate, Outlet } from 'react-router-dom'
import Loader from "../components/Loader/Loader"


const PrivateRoutes = () => {
    const { isLoggedIn, isLoading } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)

    if (isLoading) {
        return <Loader />
    }

    if (!isLoggedIn) {
        showMessage('Unauthorized', 'Please Log in ')
        return <Navigate to="/login" />
    }

    return <Outlet />
}


export default PrivateRoutes