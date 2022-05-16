import {  Button, Card } from "react-bootstrap";
import { useContext } from "react"
import { Link } from "react-router-dom";
import userService from "./../../services/user.service";
import { AuthContext } from "../../context/auth.context"

const VanCard = ({ addFavorite, removeFavorite, _id, imageUrl, name, description, solarPower, shower, bathroom, dayPrice, vanRating, favorite }) => {

    const { isLoggedIn, isLoading, user } = useContext(AuthContext)

    // const addFavoriteVan = () => {
    //     userService
    //         .addFavoriteVan(user._id, _id)
    //         .catch((err) => console.log(err));
    // }
    // const removeFavoriteVan = () => {
    //     userService
    //         .removeFavoriteVan(user._id, _id)
    //         .catch((err) => console.log(err));
    // }


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
                <Button onClick={favorite ? (() => removeFavorite(_id)) : (() => addFavorite(_id))} variant={favorite ? "danger" : "outline-danger"} size="lg">
                    favorite
                </Button>
            </Card.Body>
        </Card>
    );
};

export default VanCard;
