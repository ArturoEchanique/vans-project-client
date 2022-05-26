import "./BookingConfirmPage.css"
import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import VanService from "../../services/van.service"
import { Row, Col, Container, Card } from "react-bootstrap"
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm"
import BookingConfirmCard from "../../components/BookingConfirmCard/BookingConfirmCard"
import { daysBetweenTwoDates } from "../../utils/dateUtils"
const stripePromise = loadStripe("pk_test_51KwTPNGY00AWRT2Z6hsVVc0UNqWQLfAo9BUJlrRy5Nhcu1LKT4CeeEaJbZ2KmsQDmJaVFVT7ElohXWqPxZ5NmOrX00cLoHIJ5W")

const BookingConfirmPage = ({ startDate, endDate, price, van_id }) => {
    const [vanDetails, setVanDetails] = useState({})

    const getDetails = () => {
        VanService.getOneVan(van_id)
            .then(({ data }) => {
                setVanDetails(data)
            })
            .catch((err) => console.log(err))

    }

    useEffect(() => {
        getDetails()

    }, [])
    let totalDays
    totalDays = daysBetweenTwoDates(startDate, endDate)

    return (
        <>
            <section className="section1">
                <Container>
                    <Row fluid>
                        <Col lg={{ span: 6 }}>
                            <BookingConfirmCard {...vanDetails} bookedVan={van_id} startDate={startDate} endDate={endDate} price={price} />

                            <section id="sect1">
                                <h4 id="rowPay">Pay with</h4>
                                <Elements stripe={stripePromise}>
                                    <div>
                                        <div>
                                            <div>
                                                <CheckoutForm bookedVan={van_id} startDate={startDate} endDate={endDate} price={price} />
                                            </div>
                                        </div>
                                    </div>
                                </Elements>
                            </section>
                        </Col>
                        <Col lg={{ span: 6 }} >
                            <Col id="priceDetail" className="d-flex justify-content-end">
                                <div id="priceBooking" className="bookingInfoMain">

                                    <Row className="d-flex justify-content-space-between align-items-center mb-4">

                                        <Row>
                                            <Col >
                                                <img variant="top" id="impay" src={vanDetails.imageUrl} />
                                            </Col>
                                            <Col id="cardTi">
                                                <h7>{vanDetails.name}</h7>
                                                {vanDetails.reviews && <div className="bookingInfoRating"><strong>{`★ ${vanDetails.reviews.length} reviews`}</strong></div>}
                                            </Col>
                                        </Row>
                                    </Row>
                                    <div className="mb-4">
                                        <hr />
                                        <p >The total price of the trip includes VAT and all applicable taxes.</p>
                                        <hr />
                                    </div>
                                    <div className="mb-4">
                                        <p id="save">
                                            Your van is protected by <strong id="upCover">UpCover </strong>
                                        </p>
                                        <hr />
                                    </div>
                                    <div className="bookingInfoPriceRow">
                                        <p>{vanDetails.dayPrice} x {totalDays} days</p>
                                        <p>{vanDetails.dayPrice} €</p>
                                    </div>
                                    <div className="bookingInfoPriceRow">
                                        <p>Service commission</p>
                                        <p>{price * 0.05} €</p>
                                    </div>
                                    <hr></hr>
                                    <div className="bookingInfoPriceRow">
                                        <strong><p>Total</p></strong>
                                        <strong ><p>{price}€</p></strong>
                                    </div>
                                </div>
                            </Col>

                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default BookingConfirmPage
