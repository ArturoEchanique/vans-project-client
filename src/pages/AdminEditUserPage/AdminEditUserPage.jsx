import { useParams } from "react-router-dom";
import vanService from "../../services/van.service";
import { useEffect, useState } from "react";
import VanCard from "../../components/VanCard/VanCard";



const AdminEditUserPage = () => {
     const [reload, setReload] = useState(true);
    const [userVans, setUserVans] = useState([]);
    const { user_id } = useParams();
    console.log(user_id);

    const getUserVans = () => {
        vanService
            .getUserVans(user_id)
            .then(({ data }) => {
                console.log(data)
                setUserVans(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUserVans();
        setReload(false);
    }, [reload]);
    

     const vansList = userVans.map((van) => {
         return <VanCard setReload={setReload} {...van} key={van._id} />;
     });

    return <> {vansList}</>;
};

export default AdminEditUserPage;
