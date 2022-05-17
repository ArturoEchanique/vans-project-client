import vanService from "../../services/van.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useEffect, useState } from "react";
import VanCard from "../VanCard/VanCard";

const UserVans = () => {
    const { user } = useContext(AuthContext);

    const [userVans, setUserVans] = useState([]);

    const getUserVans = () => {
        vanService
            .getUserVans(user._id)
            .then(({ data }) => {
            
                setUserVans(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUserVans();
    }, [user]);

    console.log(userVans);

    const vansList = userVans.map((van) => {
        return <VanCard {...van} key={van._id} />;
    });

    return <>{vansList}</>;
};

export default UserVans;
