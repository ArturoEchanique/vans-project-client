
import { Col, Row, Card, Container, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import { beautifulDate, daysBetweenTwoDates } from "../../utils/dateUtils"
import "./PaymentDetailsCard.css"
import { NavLink } from "react-router-dom"

const PaymentDetailsCard = ({ closeModal, startDate, endDate, price, bookedVan }) => {

    let totalDays = 0
    let daysPrice = 0
    let commision = 0
    let totalPrice = 0
    if (bookedVan) {
        totalDays = daysBetweenTwoDates(startDate, endDate)
        daysPrice = bookedVan?.dayPrice * totalDays
        commision = daysPrice * 0.05
        commision = Math.round(commision * 100) / 100
        totalPrice = daysPrice + daysPrice * 0.05
    }
    let reviewsArr = []
    let reviewsSum = 0
    let reviewsAvg = 0
    if (bookedVan && bookedVan.reviews) {
        reviewsArr = bookedVan.reviews.map(review => review.rating)
        reviewsSum = reviewsArr.reduce((a, b) => a + b, 0);
        reviewsAvg = (reviewsSum / reviewsArr.length) || 0;
        reviewsAvg = Math.round(reviewsAvg * 100) / 100
    }


    return (
        <Container className="paymentDetailsMain">
            <Row>
                <Col xs={{ span: 6, offset: 0 }} className="mt-2">
                    <Card id="colCard">

                        <Card.Img id="imgcard" className="img-fluid" variant="top" src="https://a.mailmunch.co/user_data/landing_pages/1501739679705-animated-check.gif" />

                        <div>

                            <h3>Booking confirmed</h3>
                        </div>

                    </Card>
                    <div className="paymentDetailsDates">
                        <Row className="justify-content-center filterRowSmall mt-5">
                            <Col className="">
                                <div className="paymentDetailsDateElem">
                                <h5>Starts </h5>
                                <p className="mt-2"> {beautifulDate(startDate)} 15:00</p>
                                </div>
                            </Col>
                            <Col className="">
                                <div className="paymentDetailsDateElem">
                                <h5>Ends </h5>
                                <p className="mt-2"> {beautifulDate(endDate)} 12:00</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="seeMyBookingsButton">
                        <NavLink  to="/profile" className="">
                            <button style={{ width: "200px" }} className="vanmeupButton mb-4" variant="light">
                                {"See my bookings"}
                            </button>
                        </NavLink>
                    
                    </div>
                </Col>
                
                
                <Col xs={{ span: 4, }} style={{ paddingLeft: "0px", marginTop: "160px" }} className="confirmBookingCardDetails">

                    <div className="confirmBookingInfoMain">
                        <Row className="d-flex justify-content-space-between align-items-center mb-4">
                            <Col className="">
                                <strong className="mainPrice">{bookedVan.dayPrice} €</strong>&nbsp; /day
                            </Col>
                            <Col >
                                {bookedVan.reviews && <div className="bookingInfoRating"><strong>{`★${reviewsAvg} - ${bookedVan.reviews.length} reviews`}</strong></div>}
                            </Col>

                        </Row>
                        <hr></hr>
                        <div className=" mb-4">
                            <Row>
                                <Col>
                                    <img className="confirmPageVanImage" src={bookedVan.imageUrl} />

                                </Col>
                                <Col style={{ padding: "0px" }}>
                                    <p className="confirmCardOwner" style={{ textAlign: "left" }}>{bookedVan?.owner?.username}</p>
                                    <p className="confirmCardVanName" style={{ textAlign: "left" }}>{bookedVan?.name}</p>
                                </Col>
                            </Row>


                        </div>
                        <hr></hr>
                        <div className="mb-4">
                            <p id="save">
                                Your van is protected by <strong id="upCover">UpCover </strong>
                            </p>
                            <hr />
                        </div>
                        <div className="bookingInfoPriceRow">
                            <p>{bookedVan.dayPrice} x {totalDays} days</p>
                            <p>{daysPrice} €</p>
                        </div>
                        <div className="bookingInfoPriceRow">
                            <p>Service commission</p>
                            <p>{commision} €</p>
                        </div>
                        <hr></hr>
                        <div className="bookingInfoPriceRow">
                            <strong><p>Total</p></strong>
                            <strong><p>{totalPrice} €</p></strong>
                        </div>
                    </div>
                </Col>
               

            </Row>
        </Container>
    )
}
export default PaymentDetailsCard
