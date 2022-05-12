import BookingConfirmCard from "../../components/BookingConfirmCard/BookingConfirmCard";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import VanDetailsCard from "../../components/VanDetailsCard/VanDetailsCard";
import VanService from "../../services/van.service";

import "./BookingConfirmPage.css";

const stripePromise = loadStripe("pk_test_51KwTPNGY00AWRT2Z6hsVVc0UNqWQLfAo9BUJlrRy5Nhcu1LKT4CeeEaJbZ2KmsQDmJaVFVT7ElohXWqPxZ5NmOrX00cLoHIJ5W");



const BookingConfirmPage = ({ startDate, endDate, price, van_id }) => {

    const [vanDetails, setVanDetails] = useState({});
    useEffect(() => {
        VanService.getOneVan(van_id)
            .then(({ data }) => {
                setVanDetails(data);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <>
            <Elements stripe={stripePromise}>
                <div className="container p-4">
                    <div className="row h-100">
                        <div className="col-md-4 offset-md-4 h-100">
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            </Elements>
            <Container>
                <Row>
                    <Col>
                        <section>
                            <h3>booking details</h3>
                            <p>start date : {startDate.toLocaleString()}</p>
                            <p>end date : {endDate.toLocaleString()}</p>
                            <p>price: {price}</p>
                        </section>
                    </Col>
                    <Col>
                        <div className="siceCard">
                            <VanDetailsCard {...vanDetails} />
                        </div>

                        <section>
                            <hr />
                            <h3>pasarela de pago</h3>
                            <hr />
                        </section>
                    </Col>
                </Row>
            </Container>
            {/* <BookingConfirmCard /> */}
        </>
    )
}


export default BookingConfirmPage;
