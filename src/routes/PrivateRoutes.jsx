import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { MessageContext } from "../context/message.context"
import { Navigate, Outlet } from 'react-router-dom'
import Loader from "../components/Loader/Loader"


const PrivateRoutes = ({requiredRole}) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)

    console.log("user is", user.role, "it has to be", requiredRole)

    if (isLoading) {
        return <Loader />
    }
    if (!isLoggedIn) {
        showMessage('Unauthorized', 'Please Log in ')
        return <Navigate to="/login" />
    }

    if(requiredRole === user.role || user.role === "ADMIN"){
        return <Outlet />
    }
    else{
        showMessage('Unauthorized')
        return <Navigate to="/" />
    }
    
}


export default PrivateRoutes