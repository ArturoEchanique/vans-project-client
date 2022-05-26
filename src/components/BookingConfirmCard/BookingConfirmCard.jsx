import { Card, ListGroup, ListGroupItem, Container, Row, Col, Button } from "react-bootstrap"
import './BookingConfimCard.css'

const BookingConfirmCard = ({ imageUrl, bookedVan, dayPrice, name, description, startDate, endDate, price }) => {

    return (
        <>
            <Container>
                <h3 className="details">Comfirm and pay</h3>
                <Row className="justify-content-center filterRowSmall">
                    <h4 id="rowTitle">Your Dates </h4>
                    <Col >
                        <h5>Starts </h5>
                        <p> {startDate.toLocaleString()}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Ends </h5>
                        <p> {endDate.toLocaleString()}</p>
                    </Col>
                </Row>
                <hr />
            </Container>
        </>
    )
}
export default BookingConfirmCard
