import { Card, Button, } from "react-bootstrap";
import { useState } from "react";
import userService from "../../services/user.service";
import { Link } from "react-router-dom";
const UserCard = ({ setReload, _id, username, imageUrl }) => {
    const [deleteState, setDeleteState] = useState(false);
   
    const handleDelete = () => {
        setDeleteState(true);
        userService
            .deleteUser(_id)
            .then(() => {
                setReload(true);
            })
            .catch((err) => console.log(err));
    };


    return (
        <>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Button variant="dark" onClick={handleDelete}>
                    delete
                </Button>
                <Button variant="dark">
                    <Link to={`/admin/edit-user/${_id}`}>edit</Link>
                </Button>
            </Card.Body>
        </>
    );
};

export default UserCard;
