import { useEffect, useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DatePicker from "../../components/DatePicker/DatePicker";

import VanDetailsCard from "../../components/VanDetailsCard/VanDetailsCard";
import VanService from "../../services/van.service";

const VanDetails = ({ setBookingInfo }) => {
    const [vanDetails, setVanDetails] = useState({});
    const { van_id } = useParams();

    useEffect(() => {
        VanService.getOneVan(van_id)
            .then(({ data }) => {
                setVanDetails(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const setDateAndPrice = (dates) => {

        const startDay = dates.startDate.getTime()
        const endDay = dates.endDate.getTime();

      

        const bookingDays = (endDay - startDay).setTime()
        
          console.log(bookingDays);

        const bookingPrice = endDay - startDay * vanDetails.dayPrice;

        let bookingInfo = {
            startDate: dates.startDate,
            endDate: dates.endDate,
            price: bookingPrice,
        };
        
        setBookingInfo(bookingInfo);
    };

    // const setDateAndPriceHard = (dates) => {
    //     let bookingInfo = { ...dates, price: 100,van_id:van_id };
    //     setBookingInfo(bookingInfo);
    // };

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
                    <DatePicker handleDatesChange={setDateAndPrice} />
                    <Button variant="dark">
                        <Link to="/booking">reseve </Link>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default VanDetails;
