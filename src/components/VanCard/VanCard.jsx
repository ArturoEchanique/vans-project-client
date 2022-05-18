import { Link } from "react-router-dom"
import { Button, Card } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"

const VanCard = ({ setReload, isFavorite, addFavoriteVan, removeFavoriteVan, _id, imageUrl, name, description, solarPower, shower, bathroom, dayPrice, vanRating, owner, hideDeleteButton }) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const [deleteState, setDeleteState] = useState(false)

    const handleDelete = () => {
        setDeleteState(true)
        vanService.getOneVanAndRemove(_id).then(() => {
            setReload(true)
        })
    }

    return (
        <Card style={{ width: "25rem" }}>
            <Card.Img variant="top" src={imageUrl[0]} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>

                <Card.Text>
                    {description}
                    {solarPower ? "  has solar Power" : "No solar power"}
                    {shower ? "  has shower" : "No shower"}
                    {bathroom ? "  has bathroom" : "No bathroom"}
                    {dayPrice + "€"}
                    {vanRating + " stars"}
                </Card.Text>
                <Link to={`/${_id}/details`}>
                    <Button variant="outline-dark" size="lg">
                        see details
                    </Button>
                </Link>
                <Button onClick={isFavorite ? () => removeFavoriteVan(_id) : () => addFavoriteVan(_id)} variant={isFavorite ? "danger" : "outline-danger"} size="lg">
                    favorite
                </Button>
                {!hideDeleteButton && (user?.role == "ADMIN" || owner == user?._id) && (
                    <Button variant="dark" onClick={handleDelete}>
                        delete
                    </Button>
                )}
            </Card.Body>
        </Card>
    )
}

export default VanCard
