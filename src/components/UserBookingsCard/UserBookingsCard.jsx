import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import "./UserBookingsCard.css"
const UserBookingsCard = ({ startDate, endDate, price, bookedVan }) => {
    return (
        <h3>
            <Card style={{ width: "18rem", height:"35rem" }}>
                <Card.Img variant="top" src={bookedVan.imageUrl} />
                <Card.Body>
                    <Card.Title>{bookedVan.name}</Card.Title>
                    <hr />
                    <Card.Text>
                        <ul>
                            <h5>Price Details</h5>

                            <li className="list-details">{bookedVan.dayPrice}</li>
                            <li className="list-details">{startDate.toLocaleString()}</li>
                            <li className="list-details">{endDate.toLocaleString()}</li>
                            <li className="list-details">{price}€</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </h3>
    )
}

export default UserBookingsCard