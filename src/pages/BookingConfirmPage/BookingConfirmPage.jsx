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
