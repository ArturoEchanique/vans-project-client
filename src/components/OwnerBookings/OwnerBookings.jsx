import { Container, Row, Col } from "react-bootstrap"
import UserBookingsCard from "../UserBookingsCard/UserBookingsCard"

const OwnerBookings = ({ ownerBookings }) => {
    const bookingList = ownerBookings?.map((booking) => {
        return (
            <Col xs={12} xl={6} key={booking._id} className="mb-2">
                <UserBookingsCard {...booking} />
            </Col>
        )
    })

    return (
        <>
            <Container>
                <Row className="g-4 " xs={12}>
                    <h3 className="favorite"> Booked from You </h3>
                    <hr />

                    {bookingList}
                </Row>
            </Container>
        </>
    )
}

export default OwnerBookings
