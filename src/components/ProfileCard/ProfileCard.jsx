import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import { useEffect, useState } from "react";

const ProfileCard = () => {
    const { user } = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState({});

    const getUser = () => {
        userService
            .getOneUser(user._id)

            .then(({ data }) => {
                setUserDetails(data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getUser();
    }, [user]);

    // const { imageUrl } = userDetails;

    return (
        <div>
            <h1>{user.username}</h1>
            <img src={userDetails?.imageUrl} />
            <hr />
        </div>
    );
};

export default ProfileCard;
