import { Navbar, Container, Nav, Modal, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const VanCard = ({ imageUrl, name, description }) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button variant="primary">See details</Button>
            </Card.Body>
        </Card>
    )

}

export default VanCard;
