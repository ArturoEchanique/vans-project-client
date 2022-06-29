import { Col, Row, Container } from "react-bootstrap"
import { daysBetweenTwoDates } from "../../utils/dateUtils"
import "./UserBookingsCard.css"
const UserBookingsCard = ({ startDate, endDate, price, bookedVan }) => {
    let totalDays = 0
    let daysPrice = 0
    let commision = 0
    let totalPrice = 0
    if (bookedVan) {
        totalDays = daysBetweenTwoDates(startDate, endDate)
        if (totalDays === 0) totalDays = 2
        daysPrice = bookedVan.dayPrice * totalDays
        commision = daysPrice * 0.05
        commision = Math.round(commision * 100) / 100
        totalPrice = daysPrice + daysPrice * 0.05
    }
    let reviewsArr = []
    let reviewsSum = 0
    let reviewsAvg = 0
    if (bookedVan && bookedVan.reviews) {
        reviewsArr = bookedVan.reviews.map((review) => review.rating)
        reviewsSum = reviewsArr.reduce((a, b) => a + b, 0)
        reviewsAvg = reviewsSum / reviewsArr.length || 0
        reviewsAvg = Math.round(reviewsAvg * 100) / 100
        if ((reviewsArr.length !== 0) && (reviewsAvg === 0)) {
            reviewsAvg = Math.random() * 5
            reviewsAvg = Math.round(reviewsAvg * 100) / 100
        }
    }
    return (
        <>
            <Col xs={12} style={{ paddingLeft: "0px" }}>
                <div className="confirmBookingInfoMain">
                    <div className=" mb-4">
                        <Row>
                            <Col>
                                <img className="confirmPageVanImage" src={bookedVan.imageUrl} />
                                <hr />
                                <h6 style={{ textAlign: "left" }}>
                                    {bookedVan?.owner?.username}
                                </h6>
                                <h6 style={{ textAlign: "left" }}>
                                    {bookedVan?.name}
                                </h6>
                            </Col>
                        </Row>
                    </div>
                    <Row className="d-flex justify-content-space-between align-items-center mb-4">
                        <Col className="">
                            <strong className="mainPrice">{bookedVan.dayPrice} €</strong>&nbsp; /day
                        </Col>
                        <Col>
                            {bookedVan.reviews && (
                                <div className="bookingInfoRating">
                                    <strong>{`★${reviewsAvg} - ${bookedVan.reviews.length} reviews`}</strong>
                                </div>
                            )}
                        </Col>
                    </Row>

                    <hr></hr>
                    <div className="bookingInfoPriceRow">
                        <p>
                            {bookedVan.dayPrice} x {totalDays} days
                        </p>
                        <p>{daysPrice} €</p>
                    </div>
                    <div className="bookingInfoPriceRow">
                        <p>Service commission</p>
                        <p>{commision} €</p>
                    </div>
                    <hr></hr>
                    <div className="bookingInfoPriceRow">
                        <strong>
                            <p>Total</p>
                        </strong>
                        <strong>
                            <p>{totalPrice} €</p>
                        </strong>
                    </div>
                </div>
            </Col>
            {/* </Container> */}
        </>
    )
}

export default UserBookingsCard
