import { Navbar, Container, Nav, Modal, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const VanCard = ({vanDetails}) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={vanDetails.imageUrl} />
            <Card.Body>
                <Card.Title>{vanDetails.name}</Card.Title>
                <Card.Text>
                    {vanDetails.description}
                </Card.Text>
                <Button variant="primary">See details</Button>
            </Card.Body>
        </Card>
    )
    
}

export default VanCard;
