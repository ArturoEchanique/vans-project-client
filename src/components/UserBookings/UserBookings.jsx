import UserBookingsCard from "../UserBookingsCard/UserBookingsCard"
import { Container, Row, Col } from "react-bootstrap"

const UserBookings = ({ userBookings }) => {
    const bookingList = userBookings?.map((booking) => {
        return(
            <Col xs={12} lg={6}>
                <UserBookingsCard {...booking} />
                <br />
                <br />
            </Col>
           
        )
        
    })

    return (
        <>
            <Container>
                <Row className="g-4 " xs={2}>
                    <h3 className="favorite"> Bookings</h3>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />



                </Row>
                <Row>
                    {bookingList}
                </Row>
            </Container>
        </>
    )
}

export default UserBookings
