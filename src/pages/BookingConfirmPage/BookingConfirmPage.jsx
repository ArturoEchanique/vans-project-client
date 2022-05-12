import { Button, Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import VanDetailsCard from "../../components/VanDetailsCard/VanDetailsCard";
import VanService from "../../services/van.service";

import "./BookingConfirmPage.css";


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
    );
};

export default BookingConfirmPage;
