import { Link } from "react-router-dom"
import { Button, Image, Card, Col, Row, Form, ToggleButton, Container } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import "./VanCard.css"

const VanCard = ({ setReload, isFavorite, addFavoriteVan, removeFavoriteVan, _id, imageUrl, name, description, solarPower, shower, bathroom, dayPrice, vanRating, owner, hideDeleteButton }) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const [deleteState, setDeleteState] = useState(false)

    const handleDelete = () => {
        setDeleteState(true)
        vanService.getOneVanAndRemove(_id).then(() => {
            setReload(true)
        })
    }

    const handleFilterChange = () => {
        console.log("holi")
    }

    const kitchen = false
    const sunRoof = false
    const heatedSeats = false
    const priceStart = 0
    const priceEnd = 0


    return (

        <Container>
            {/* <Image
                source={imageUrl[0]}
                style={{
                    borderRadius: '50%',
                    overflow: 'hidden',
                    borderWidth: 3,
                    borderColor: 'red',
                }}
            /> */}
            <Link to={`/${_id}/details`} style={{ textDecoration: 'none', padding: "0px", margin: "0px" }}>
            <img className="vanCardImage" src={imageUrl[0]}></img>
            </Link>
            <h3 className="vanCardTitle">{name}</h3>
            <Row className="justify-content-center filterRowSmall">
                <Col>
                    <Button className="filterButton" variant="light" disabled>Solar power</Button>
                </Col>
                <Col>
                    <Button className="filterButton" variant="light" disabled>Solar power</Button>
                </Col>
                <Col>
                    <Button className="filterButton" variant="light" disabled>Solar power</Button>
                </Col>
                <Col>
                    <Button onClick={isFavorite ? () => removeFavoriteVan(_id) : () => addFavoriteVan(_id)} variant={isFavorite ? "danger" : "outline-danger"} size="lg">
                        favorite
                    </Button>
                </Col>
            </Row>
            <p className="filterRow">{description}</p>
            <Row className="justify-content-center filterRowSmall">

                {/* <Col>
                    <Button onClick={isFavorite ? () => removeFavoriteVan(_id) : () => addFavoriteVan(_id)} variant={isFavorite ? "danger" : "outline-danger"} size="lg">
                        favorite
                    </Button>
                </Col>


                {!hideDeleteButton && (user?.role == "ADMIN" || owner == user?._id) && (
                    <Col>
                        <Button variant="dark" onClick={handleDelete}>
                            delete
                        </Button>
                    </Col>

                )}
                {!hideDeleteButton && (user?.role == "ADMIN" || owner == user?._id) && (
                    <Col>
                        <Button variant="dark">
                            <Link to="/:van_id/edit">edit van</Link>
                        </Button>
                    </Col>

                )} */}
            </Row>

        </Container>


        // <Card style={{ width: "25rem" }}>
        //     <Card.Img variant="top" src={imageUrl[0]} />
        //     <Card.Body>
        //         <Card.Title>{name}</Card.Title>

        //         <Card.Text>
        //             {description}
        //             {solarPower ? "  has solar Power" : "No solar power"}
        //             {shower ? "  has shower" : "No shower"}
        //             {bathroom ? "  has bathroom" : "No bathroom"}
        //             {dayPrice + "€"}
        //             {vanRating + " stars"}
        //         </Card.Text>
        //         <Link to={`/${_id}/details`}>
        //             <Button variant="outline-dark" size="lg">
        //                 see details
        //             </Button>
        //         </Link>
        //         <Button onClick={isFavorite ? () => removeFavoriteVan(_id) : () => addFavoriteVan(_id)} variant={isFavorite ? "danger" : "outline-danger"} size="lg">
        //             favorite
        //         </Button>
        //         {!hideDeleteButton && (user?.role == "ADMIN" || owner == user?._id) && (
        //             <Button variant="dark" onClick={handleDelete}>
        //                 delete
        //             </Button>
        //         )}
        //         {!hideDeleteButton && (user?.role == "ADMIN" || owner == user?._id) && (
        //             <Button variant="dark">
        //                 <Link to="/:van_id/edit">edit vant</Link>
        //             </Button>
        //         )}
        //     </Card.Body>
        // </Card>
    )
}

export default VanCard
