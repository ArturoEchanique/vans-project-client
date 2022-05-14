import userService from "../../services/user.service";
import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";

const UsersAdmin = () => {
    const [users, setUsers] = useState({});

    const getUser = () => {
        userService
            .getUsers()
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((err) => console.log(err));
    };

    console.log(users);

    const usersList = users?.map(user => {

        return <UserCard {...user}/>
    
})

    useEffect(() => {
        getUser();
    }, []);

    return <>{usersList}</>;
};

export default UsersAdmin;
