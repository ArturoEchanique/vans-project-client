import { Navbar, Container, Nav, Modal, Button, Card } from "react-bootstrap";

import { Link, NavLink } from "react-router-dom";

const VanCard = ({ _id, imageUrl, name, description, solarPower }) => {
    console.log("solar power is...", solarPower);

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>

                <Card.Text>
                    {}
                    {description}
                    {solarPower ? "  has solar Power" : "No solar power"}
                </Card.Text>
                <Button variant="dark">
                    <Link to={`/${_id}/details`}>see details</Link>
                </Button>
            </Card.Body>
        </Card>
    );
};

export default VanCard;
