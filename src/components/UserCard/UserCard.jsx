import { Card, Button } from "react-bootstrap";

import { useState } from "react";
import userService from "../../services/user.service";
const UserCard = ({ setReload, _id, username, imageUrl }) => {
    const [deleteState, setDeleteState] = useState(false);

    const handleDelete = () => {
        setDeleteState(true);
        userService.deleteUser(_id).then(() => {
            setReload(true);
        });
    };
    console.log(deleteState);

    return (
        <>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Button variant="dark" onClick={handleDelete}>
                    delete
                </Button>
            </Card.Body>
        </>
    );
};

export default UserCard;
