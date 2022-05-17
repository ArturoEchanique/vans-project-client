import UserBookingsCard from "../UserBookingsCard/UserBookingsCard";

import { Container, Row, Col } from "react-bootstrap";
import VanCard from "../VanCard/VanCard";

const FavoritesVans = ({ favoriteVans }) => {
    const vansList = favoriteVans?.map((van) => {
        return (
            <Col>
                <VanCard {...van} />
            </Col>
        );
    });

    return (
        <>
            <Container>
                <Row>
                    <h3>faorite vans</h3>

                    {vansList}
                </Row>
            </Container>
        </>
    );
};

export default FavoritesVans;
