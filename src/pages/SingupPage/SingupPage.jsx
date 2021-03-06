import { Container, Row, Col } from "react-bootstrap"
import SignupForm from "../../components/SignupForm/SingupForm"

const SignupPage = () => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Sign Up</h1>
                    <hr />
                    <SignupForm />
                </Col>
            </Row>
        </Container>
    )
}

export default SignupPage
