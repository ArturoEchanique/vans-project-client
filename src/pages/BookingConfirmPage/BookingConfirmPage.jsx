import "./BookingConfirmPage.css"
import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import VanService from "../../services/van.service"
import { Row, Col, Container } from "react-bootstrap"
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
            <Container>
                <Row>
                    <Col>
                        <BookingConfirmCard {...vanDetails} bookedVan={van_id} startDate={startDate} endDate={endDate} price={price} />
                    </Col>
                    <Col>
                        <section>
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
                </Row>
            </Container>
        </>
    )
}

export default BookingConfirmPage
