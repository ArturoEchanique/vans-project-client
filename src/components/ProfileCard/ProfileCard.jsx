import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const ProfileCard = () => {
    const { user, logOutUser, isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            <h1>{user.username}</h1>
            <img src={user.imageUrl} />
            <hr />

            <div>
                <h3>activ bookings</h3>
                <section>{user.bookings}</section>
            </div>

            <div>
                <h3>my vans</h3>
                <section>{user.vans}</section>
            </div>
        </div>
    );
};

export default ProfileCard;
