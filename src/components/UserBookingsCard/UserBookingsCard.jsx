import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
const UserBookingsCard = ({ startDate, endDate, price, bookedVan }) => {
    return (
        <h3>
            <Card style={{ width: "20rem" }}>
                <Card.Img variant="top" src={bookedVan.imageUrl} />
                <Card.Body>
                    <Card.Title>{bookedVan.name}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Price Details</ListGroupItem>
                    <ListGroupItem>{bookedVan.dayPrice}</ListGroupItem>
                    <ListGroupItem>{startDate.toLocaleString()}</ListGroupItem>
                    <ListGroupItem>{endDate.toLocaleString()}</ListGroupItem>
                    <ListGroupItem>{price}</ListGroupItem>
                </ListGroup>
            </Card>
        </h3>
    )
}

export default UserBookingsCard
