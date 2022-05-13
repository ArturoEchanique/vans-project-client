import { Card, ListGroup, ListGroupItem, Button, Container, Row, Col } from "react-bootstrap";

const BookingConfirmCard = ({ imageUrl, dayPrice, name, description, startDate, endDate, price }) => {

    return (
        <>
            <Container>
                <Row>
                    <Col >
                        {/* VAN AND PRICE INFORMATION */}
                        <Card>
                            <Card.Img variant="top" src={imageUrl} />
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>{description}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Price Details</ListGroupItem>
                                <ListGroupItem>{dayPrice}</ListGroupItem>
                                <ListGroupItem>{startDate.toLocaleString()}</ListGroupItem>
                                <ListGroupItem>{endDate.toLocaleString()}</ListGroupItem>
                                <ListGroupItem>{price}</ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default BookingConfirmCard;
