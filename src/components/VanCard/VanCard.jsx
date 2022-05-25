import { Link } from "react-router-dom"
import { Button, Image, Card, Col, Row, Form, ToggleButton, Container } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import "./VanCard.css"
import React from "react";
import Heart from "react-animated-heart";



const VanCard = ({ setReload, isFavorite, addFavoriteVan, removeFavoriteVan, _id, imageUrl, name, description, solarPower, shower, bathroom, maxPassengers, dayPrice, vanRating, owner, hideDeleteButton, solarRoof, kitchen, heatedSeats }) => {
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


    return (

        <Container className="vanCardMain">
            <Link to={`/${_id}/details`} style={{ textDecoration: 'none', padding: "0px", margin: "0px" }}>
                <img className="vanCardImage" src={imageUrl[0]}>
                </img>
            </Link>

            
            <Row className="justify-content-left align-items-center">
                <Col xs={9} className="justify-content-center">
                    <h3 className="vanCardTitle">{name.length > 28 ? (name.slice(0,28)+" ...") : name}</h3>
                </Col>
                <Col xs={2} className="justify-content-center">
                    <button className="heartButton" onClick={isFavorite ? () => removeFavoriteVan(_id) : () => addFavoriteVan(_id)}>
                        <img className={"heartIcon " + (isFavorite ? "redHeart" : "greyHeart")} src="./../../images/heartIcon.png"></img>
                    </button>
                </Col>
            </Row>
            <p className="filterRow vanCardDescription">{description.length > 70 ? (description.slice(0, 70) + "...") : description}</p>
            <Row className="d-flex justify-content-start vanIconsRow">
                <Col className="justify-content-center">
                    <strong>{maxPassengers + " "}</strong> <img className="vanCardIcon" src="./../../images/peopleIcon.png"></img>
                </Col>
                {solarPower &&
                    <Col className="justify-content-center">
                        <img className="vanCardIcon" src="./../../images/sunIcon.png"></img>
                    </Col>
                }
                {shower &&
                    <Col className="justify-content-center">
                        <img className="vanCardIcon" src="./../../images/showerIcon.png"></img>
                    </Col>
                }
                {solarRoof &&
                    <Col className="justify-content-center" >
                        <img className="vanCardIcon" src="./../../images/solarRoofIcon.png"></img>
                    </Col>
                }
                {kitchen &&
                    <Col className="justify-content-center" >
                        <img className="vanCardIcon" src="./../../images/kitchenIcon.png"></img>
                    </Col>
                }
                {bathroom &&
                    <Col className="justify-content-center" >
                        <img className="vanCardIcon" src="./../../images/bathroomIcon.png"></img>
                    </Col>
                }
                {heatedSeats &&
                    <Col className="justify-content-center" >
                        <img className="vanCardIcon" src="./../../images/heatedSeatsIcon.png"></img>
                    </Col>
                }
            </Row>
       
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
