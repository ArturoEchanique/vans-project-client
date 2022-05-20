import UserBookingsCard from "../UserBookingsCard/UserBookingsCard"
import { Container, Row, Col } from "react-bootstrap"

const UserBookings = ({ userBookings }) => {
    const bookingList = userBookings?.map((booking) => {
        return (
            <Col>
                <UserBookingsCard {...booking} />
            </Col>
        )
    })

    return (
        <>
            <Container>
                <Row>
                    <h3 className="favorite">Your Bookings</h3>
                    <hr />

                    {bookingList}
                </Row>
            </Container>
        </>
    )
}

export default UserBookings
