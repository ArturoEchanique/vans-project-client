import {  Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

const VanCard = ({ _id, imageUrl, name, description, solarPower, shower, bathroom, dayPrice }) => {

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>

                <Card.Text>
                    {description}
                    {solarPower ? "  has solar Power" : "No solar power"}
                    {shower ? "  has shower" : "No shower"}
                    {bathroom ? "  has bathroom" : "No bathroom"}
                    <hr></hr>
                    {dayPrice + "€"}
                </Card.Text>
                <Button variant="dark">
                    <Link to={`/${_id}/details`}>see details</Link>
                </Button>
            </Card.Body>
        </Card>
    );
};

export default VanCard;
