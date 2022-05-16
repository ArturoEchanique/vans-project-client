import { Button, Card } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import vanService from "../../services/van.service";

const VanCard = ({ setReload, _id, imageUrl, name, description, solarPower, shower, bathroom, dayPrice, vanRating }) => {
    const [deleteState, setDeleteState] = useState(false);

    const handleDelete = () => {
        setDeleteState(true);
        vanService.getOneVanAndRemove(_id).then(() => {
            setReload(true);
        });
    };

    return (
        <Card style={{ width: "25rem" }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>

                <Card.Text>
                    {description}
                    {solarPower ? "  has solar Power" : "No solar power"}
                    {shower ? "  has shower" : "No shower"}
                    {bathroom ? "  has bathroom" : "No bathroom"}
                    {dayPrice + "€"}
                    {vanRating + " stars"}
                </Card.Text>
                <Button variant="dark">
                    <Link to={`/${_id}/details`}>see details</Link>
                </Button>
                <Button variant="dark" onClick={handleDelete}>
                    delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default VanCard;
