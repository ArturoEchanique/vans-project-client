import "./ErrorPage.css"
import { Container, Row, Col } from "react-bootstrap"

const ErrorPage = () => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <div className="img404">
                        <img src="https://cdn.dribbble.com/users/469578/screenshots/2597126/404-drib23.gif" alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default ErrorPage
