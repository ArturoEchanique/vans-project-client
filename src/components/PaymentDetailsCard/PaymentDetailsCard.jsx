
import { Col, Row, Card, Container, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import { beautifulDate } from "../../utils/dateUtils"
import "./PaymentDetailsCard.css"

const PaymentDetailsCard = ({ closeModal, startDate, endDate, price, bookedVan }) => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card id="colCard">

                        <Card.Img id="imgcard" className="img-fluid" variant="top" src="https://a.mailmunch.co/user_data/landing_pages/1501739679705-animated-check.gif" />

                        <div>
                            <Row className="justify-content-center filterRowSmall">

                                <Col >
                                    <h5>Starts </h5>
                                    <p> {beautifulDate(startDate)}</p>
                                </Col>
                                <Col>
                                    <h5>Ends </h5>
                                    <p> {beautifulDate(endDate)}</p>
                                </Col>
                            </Row>
                            <p>{price}</p>
                            <p>{bookedVan}</p>
                        </div>

                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default PaymentDetailsCard
