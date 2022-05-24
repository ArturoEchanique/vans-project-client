import { Card, ListGroup, ListGroupItem, Container, Row, Col, Button } from "react-bootstrap"
import './BookingConfimCard.css'

const BookingConfirmCard = ({ imageUrl, bookedVan, dayPrice, name, description, startDate, endDate, price }) => {

    return (
        <>
            <Container>
                {/* <Row>
                    <img id="vanImg" className="vanCardImage" src={imageUrl}></img>
                    <h3 className="filterRow">{name}</h3>
                    {/* <div className="form-control">{description}</div> */}
                {/* </Row> */}
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
                <Row>
                    <Col>
                        <h5>Cancellation policy</h5>
                        <h4>
                            Free cancellation for 48 hours.
                        </h4>

                        <p>
                            Cancel before <>{startDate.toLocaleString()}</> for a partial refund.
                        </p>
                        <p>
                            Our Extenuating Circumstances policy does not cover travel disruptions caused by COVID-19.
                        </p>
                    </Col>
                    <hr />
                </Row>





            </Container>
        </>
    )
}
export default BookingConfirmCard
