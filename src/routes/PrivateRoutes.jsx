import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { MessageContext } from "../context/message.context";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const PrivateRoutes = ({ requiredRoles }) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext);
    const { showMessage } = useContext(MessageContext);

    if (isLoading) {
        return <Loader />;
    } else {
        if (!isLoggedIn) {
            showMessage("Unauthorized", "Please Log in ");
            return <Navigate to="/login" />;
        } else {
            console.log("user is", user.role, "it has to be", requiredRoles);
            if (requiredRoles.includes(user.role) || user.role === "ADMIN"|| user.role === "OWNER") {
                return <Outlet />;
            } else {
                showMessage("Unauthorized");
                return <Navigate to="/" />;
            }
        }
    }
};

export default PrivateRoutes;
