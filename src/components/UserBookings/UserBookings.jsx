import UserBookingsCard from "../UserBookingsCard/UserBookingsCard"
import { Container, Row, Col } from "react-bootstrap"

const UserBookings = ({ userBookings }) => {
    const bookingList = userBookings?.map((booking) => {
        return <UserBookingsCard {...booking} />
    })

    return (
        <>
            <Container>
                <Row className="g-4 " xs={2}>
                    <h3 className="favorite"> Bookings</h3>
                    <hr />

                    {bookingList}
                </Row>
            </Container>
        </>
    )
}

export default UserBookings
