import { Card, ListGroup, ListGroupItem, Container, Row, Col, Button } from "react-bootstrap"
import './BookingConfimCard.css'

const BookingConfirmCard = ({ imageUrl, bookedVan, dayPrice, name, description, startDate, endDate, price }) => {

    return (
        <>
            <Container>
                <Row>
                    <img id="vanImg" className="vanCardImage" src={imageUrl}></img>
                    <h3 className="filterRow">{name}</h3>
                    {/* <div className="form-control">{description}</div> */}
                </Row>
                <h3 className="details">Booking details</h3>

                <Row className="justify-content-center filterRowSmall">
                    <h4 id="rowTitle">Price </h4>
                    <hr />
                    <Col>
                        <Button className="filterButton" variant="light" disabled>Price per day: {dayPrice}$</Button>
                    </Col>
                    <Col>
                        <Button className="filterButton" variant="light" disabled>Total: {price}$</Button>
                    </Col>

                </Row>
                <Row className="justify-content-center filterRowSmall">
                    <h4 id="rowTitle">Booking Dates</h4>
                    <hr />

                    <Col>
                        <Button className="filterButton" variant="light" disabled>Starts at: {startDate.toLocaleString()}</Button>
                    </Col>
                    <Col>
                        <Button className="filterButton" variant="light" disabled>Ends at: {endDate.toLocaleString()}</Button>
                    </Col>

                </Row>
            </Container>

            {/* <Col lg={{ span: 6 }}>

                <Card.Img variant="top" src={imageUrl} />
            </Col>
            <Col lg={{ span: 6 }}>
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
            </Col> */}

        </>
    )
}
export default BookingConfirmCard
