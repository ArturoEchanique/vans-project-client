import {  Button, Card } from "react-bootstrap";
import { useContext } from "react"
import { Link } from "react-router-dom";
import userService from "./../../services/user.service";
import { AuthContext } from "../../context/auth.context"

const VanCard = ({ isFavorite, addFavoriteVan, removeFavoriteVan, _id, imageUrl, name, description, solarPower, shower, bathroom, dayPrice, vanRating, }) => {

    const { isLoggedIn, isLoading, user } = useContext(AuthContext)



    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>

                <Card.Text>
                    {description}
                    {solarPower ? "  has solar Power" : "No solar power"}
                    {shower ? "  has shower" : "No shower"}
                    {bathroom ? "  has bathroom" : "No bathroom"}
                    <hr></hr>
                    {dayPrice + "€"}
                    <hr></hr>
                    {vanRating + " stars"}
                </Card.Text>
                <Link to={`/${_id}/details`}>
                    <Button variant="outline-dark" size="lg">
                        see details
                    </Button>
                </Link>
                <Button onClick={isFavorite ? (() => removeFavoriteVan(_id)) : (() => addFavoriteVan(_id))} variant={isFavorite ? "danger" : "outline-danger"} size="lg">
                    favorite
                </Button>
            </Card.Body>
        </Card>
    );
};

export default VanCard;
