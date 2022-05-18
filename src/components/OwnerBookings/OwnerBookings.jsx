import { Container, Row, Col } from "react-bootstrap"
import UserBookingsCard from "../UserBookingsCard/UserBookingsCard"

const OwnerBookings = ({ ownerBookings }) => {
    const bookingList = ownerBookings?.map((booking) => {
        return (
            <Col key={booking._id}>
                <UserBookingsCard {...booking} />
            </Col>
        )
    })

    return (
        <>
            <Container>
                <Row>
                    <h3> Booked from you </h3>

                    {bookingList}
                </Row>
            </Container>
        </>
    )
}

export default OwnerBookings
