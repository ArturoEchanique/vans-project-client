
import { Col, Row, Card, Container, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"

import "./PaymentDetailsCard.css"

const PaymentDetailsCard = ({ closeModal, dayPrice, name, description, startDate, endDate, price }) => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card id="colCard">
                        <Card.Img id="imgcard" className="img-fluid" variant="top" src="https://a.mailmunch.co/user_data/landing_pages/1501739679705-animated-check.gif" />
                        <Card.Body>
                            <Card.Title>Payment Accepted Successfully</Card.Title>
                            <Button onClick={closeModal} variant="dark">
                                <Link to={'/'}>Home Page</Link>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>


                {/* <Col md={{ span: 6, offset: 3 }}>
                    <Card id="colCard">
                        <Card.Body>
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>{description}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Booking Details</ListGroupItem>
                                <ListGroupItem>{startDate}</ListGroupItem>
                                <ListGroupItem>{endDate}</ListGroupItem>
                                <ListGroupItem>Day Price:{dayPrice}$</ListGroupItem>
                                <ListGroupItem>Total:{price}$</ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col> */}
            </Row>
        </Container>
    )
}
export default PaymentDetailsCard
