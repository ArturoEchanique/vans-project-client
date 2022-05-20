import UserBookingsCard from "../UserBookingsCard/UserBookingsCard"
import "./FavoritesVans.css"

import { Container, Row, Col } from "react-bootstrap"
import VanCard from "../VanCard/VanCard"

const FavoritesVans = ({ favoriteVans }) => {
    console.log(favoriteVans)
    const vansList = favoriteVans?.map((van) => {
        
        return <VanCard {...van} key={van._id}  />
    })

    return (
        <>
            <Container>
                <Row >
                    <h3 className="favorite">Favorite Vans</h3>
                    
                    {vansList}
                </Row>
            </Container>
        </>
    )
}

export default FavoritesVans
