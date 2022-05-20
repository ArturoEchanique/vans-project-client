
import { Container, Row } from "react-bootstrap"
import UsersAdmin from "../../components/UsersAdmin/UsersAdmin"

const AdminPage = () => {
    return (
        <Container className="top-margin ">
            <h3 className="mb-3">All Users</h3>
            <hr />
            <Row className="background-profile-detalis">
                <UsersAdmin />
            </Row>
        </Container>
    )
}

export default AdminPage
