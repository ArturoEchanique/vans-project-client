import { Card, ListGroup, ListGroupItem, Button, Container, Row, Col } from "react-bootstrap";

const BookingConfirmCard = () => {
    return (
        <>


            < Container >
                <Row>
                    <Col md={{ span: 6, offset: 6 }}>
                        {/* VAN AND PRICE INFORMATION */}
                        <Card style={{ width: '30rem' }}>
                            <Card.Img variant="top" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ultimate-toys-camper-1634234458.jpg" />
                            <Card.Body>
                                <Card.Title>Van Title</Card.Title>
                                <Card.Text>
                                    Van descrition
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Price Details</ListGroupItem>
                                <ListGroupItem>price/day*days         total</ListGroupItem>
                                <ListGroupItem>Service comision        total</ListGroupItem>
                                <ListGroupItem>total</ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                    {/* RESERVATION ,PAYMENT AND MESSAGE TO RENTER */}
                    <Col md={{ span: 6 }}>
                        <Card style={{ width: '30rem' }}>
                            <Card.Body>
                                <Card.Title>YOUR BOOKING</Card.Title>
                                <Card.Title>dates</Card.Title>
                                <Card.Text> may 4- jun 1</Card.Text>
                            </Card.Body>
                            <div>AQUI VA STRIPE</div>
                            <Card.Title>Send a message to your renter</Card.Title>
                            <Card.Text>el mensajeee</Card.Text>

                        </Card>
                        <Button>BOOK NOW</Button>
                    </Col>
                </Row>
            </Container >
        </>
    )
}
export default BookingConfirmCard