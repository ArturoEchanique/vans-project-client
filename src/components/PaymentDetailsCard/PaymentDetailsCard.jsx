import { Col, Row, Card, Container } from "react-bootstrap"
import './PaymentDetailsCard.css'


const PaymentDetailsCard = () => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card id="colCard" >
                        <Card.Img id="imgcard" className="img-fluid" variant="top" src="https://a.mailmunch.co/user_data/landing_pages/1501739679705-animated-check.gif" />
                        <Card.Body>
                            <Card.Title>Payment Accepted Successfully</Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={{ span: 6, offset: 3 }}>
                    <Card id="colCard" >
                        <Card.Body>
                            <Card.Title>Information</Card.Title>
                            <Card.Text>
                                Booking Information
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}
export default PaymentDetailsCard