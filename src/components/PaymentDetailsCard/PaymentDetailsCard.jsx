
import { Col, Row, Card, Container, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"

import "./PaymentDetailsCard.css"

const PaymentDetailsCard = ({ closeModal }) => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card id="colCard">
                        <Card.Img id="imgcard" className="img-fluid" variant="top" src="https://a.mailmunch.co/user_data/landing_pages/1501739679705-animated-check.gif" />

                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default PaymentDetailsCard
