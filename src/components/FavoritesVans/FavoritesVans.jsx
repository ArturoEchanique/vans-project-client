import UserBookingsCard from "../UserBookingsCard/UserBookingsCard"
import "./FavoritesVans.css"

import { Container, Row, Col } from "react-bootstrap"
import VanCard from "../VanCard/VanCard"

const FavoritesVans = ({ favoriteVans }) => {
    console.log(favoriteVans)
    const vansList = favoriteVans?.map((van) => {
        
        return (
            <Col >
                <VanCard {...van} key={van._id} />
            </Col>
        )
    })

    return (
        <>
            <Container>
                <h3 className="favorite">Favorite Vans</h3>
                <hr />
                <Row className="g-4" xs={2}>
                    {vansList}
                </Row>
            </Container>
        </>
    )
}

export default FavoritesVans
