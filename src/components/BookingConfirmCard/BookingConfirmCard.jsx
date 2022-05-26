import { Card, ListGroup, ListGroupItem, Container, Row, Col, Button } from "react-bootstrap"
import './BookingConfimCard.css'
import { beautifulDate, beautifulHour, daysBetweenTwoDates } from "../../utils/dateUtils"

const BookingConfirmCard = ({ imageUrl, bookedVan, dayPrice, name, description, startDate, endDate, price }) => {

    return (
        <>
            <Container className="bookingConfirmCardMain">
                {/* <Row>
                    <img id="vanImg" className="vanCardImage" src={imageUrl}></img>
                    <h3 className="filterRow">{name}</h3>
                    {/* <div className="form-control">{description}</div> */}
                {/* </Row> */}
                <h3 className="confirmAndPayTitle">Comfirm and pay</h3>


                <Row className="justify-content-center filterRowSmall">

                    <Col >
                        <h5>Starts </h5>
                        <p> {beautifulDate(startDate)}</p>
                    </Col>
                    <Col>
                        <h5>Ends </h5>
                        <p> {endDate && beautifulDate(endDate)}</p>
                    </Col>
                </Row>
                <hr />
                <br></br>
                <Row>
                    <Col className="cancelationPolicy">
                        <h5>Cancellation policy: Free cancellation for 48 hours.</h5>
                        <br></br>
                        <p>
                            Cancel before <>{startDate?.toLocaleString()}</> for a partial refund.
                        </p>

                        <p>
                            Our Extenuating Circumstances policy does not cover travel disruptions caused by COVID-19.
                        </p>
                        <br></br>
                        <hr />
                    </Col>
                </Row>





            </Container>
        </>
    )
}
export default BookingConfirmCard
