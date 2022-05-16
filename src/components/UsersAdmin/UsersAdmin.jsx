import userService from "../../services/user.service";
import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import { Card } from "react-bootstrap";

const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(true);

    const getAllUsers = () => {
        userService
            .getUsers()
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllUsers();
        setReload(false)
    }, [reload]);


    const usersList = users.map((user) => {
        return (
            <Card style={{ width: "10rem" }} key={user._id}>
                <UserCard setReload={ setReload}{...user} />
            </Card>
        );
    });
    return <>{usersList}</>;
};

export default UsersAdmin;
