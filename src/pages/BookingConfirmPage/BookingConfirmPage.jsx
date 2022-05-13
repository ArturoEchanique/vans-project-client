import BookingConfirmCard from "../../components/BookingConfirmCard/BookingConfirmCard";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

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
            <Container>
                <Row>
                    <Col>
                        <BookingConfirmCard {...vanDetails} startDate={startDate} endDate={endDate} price={price} />
                    </Col>
                    <Col>
                        <section>
                            <Elements stripe={stripePromise}>
                                <div>
                                    <div>
                                        <div>
                                            <CheckoutForm price={price} />
                                        </div>
                                    </div>
                                </div>
                            </Elements>
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BookingConfirmPage;
