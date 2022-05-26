import "./BookingConfirmPage.css"
import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import VanService from "../../services/van.service"
import { Row, Col, Container, Card } from "react-bootstrap"
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm"
import BookingConfirmCard from "../../components/BookingConfirmCard/BookingConfirmCard"
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

    return (
        <>
            <section className="confirmPageSection1">
                <Container>
                    <Row fluid>
                        <Col lg={{ span: 6 }}>
                            <BookingConfirmCard {...vanDetails} bookedVan={van_id} startDate={startDate} endDate={endDate} price={price} />

                            <section id="sect1">
                                <Row className="d-flex justify-content-between">
                                    <Col>
                                        <h4 id="rowPay">Pay with</h4>

                                    </Col>
                                    <Col style={{padding:"0px", margin:"0px"}}>
                                        <img className="creditCardIcon" src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"></img>
                                        <img className="creditCardIcon" src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg"></img>
                                        <img className="creditCardIcon" src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg"></img>
                                        <img className="creditCardIcon" src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_postepay.65045e70e65761f29de3881049c6e9f3.svg"></img>
                                        <img className="creditCardIcon" src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_sofort.09a6b8666f72c0532ef1e01b516e1ac5.svg"></img>
                                        <img className="creditCardIcon" src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_paypal.faa3042fa2daf6b4a9822cc4b43e8609.svg"></img>
                                        <img className="creditCardIcon" src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_googlepay.3f786bc031b59575d24f504dfb859da0.svg"></img>

                                    </Col>
                                </Row>
                                
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
                            <Card id="priceDetail">
                                <Row>
                                    <Col lg={{ span: 8 }}>
                                        <Card.Img variant="top" id="impay" src={vanDetails.imageUrl} />
                                    </Col>
                                    <Col lg={{ span: 4 }} id="cardTi">
                                        <Card.Title>{vanDetails.name}</Card.Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <h5>Your van is protected by UpCover</h5>
                                                    <hr />
                                                </Col>
                                                <h4 id="rowTitle">Price </h4>
                                                <Col >
                                                    <h5>Price per day</h5>
                                                    <p> {vanDetails.dayPrice}$</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h5>Service comision</h5>
                                                    <p>{price}$</p>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col>
                                                    <h5>Total</h5>
                                                    <p>{price}$</p>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default BookingConfirmPage
