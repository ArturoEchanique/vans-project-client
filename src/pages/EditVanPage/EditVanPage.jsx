import { Container, Row, Col } from 'react-bootstrap'
import EditVanForm from '../../components/EditVanForm/EditVanForm'



const EditVanPage = () => {

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Edit Vehicle</h1>
                    <hr />
                    <EditVanForm />

                </Col>
            </Row>
        </Container>
    )
}

export default EditVanPage