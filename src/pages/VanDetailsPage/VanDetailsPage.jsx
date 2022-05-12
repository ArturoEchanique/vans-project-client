import { useEffect, useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DatePicker from "../../components/DatePicker/DatePicker";

import VanDetailsCard from "../../components/VanDetailsCard/VanDetailsCard";
import VanService from "../../services/van.service";


const VanDetails = ({ setBookingState }) => {
    const [vanDetails, setVanDetails] = useState({});
    const { van_id } = useParams();

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
                <VanDetailsCard {...vanDetails} />
            </Row>
            <Row>
                <Col>
                    <h3>Aqui van nuestras reservas </h3>
                </Col>
                <Col>
                    <DatePicker setDatesState={setBookingState} />
                    <Button variant="dark">
                        <Link to="/booking">reseve </Link>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default VanDetails;
