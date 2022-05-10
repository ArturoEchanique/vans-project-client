import { Container, Button, Row, Col } from 'react-bootstrap'
import NewVanForm from '../../components/NewVanForm/NewVanForm'



const NewVanPage = () => {

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Add a new Vehicle</h1>
                    <hr />
                    <NewVanForm />

                </Col>
            </Row>
        </Container>
    )
}

export default NewVanPage