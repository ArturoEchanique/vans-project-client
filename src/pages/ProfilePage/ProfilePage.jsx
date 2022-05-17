import { Container, Row, Col } from "react-bootstrap";
import HostButton from "../../components/HostButton/HostButton";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserVans from "../../components/UserVans/UserVans";
import UserBookings from "../../components/UserBookings/UserBookings";

const ProfilePage = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <ProfileCard />
                </Col>
                <Col>
                    <HostButton />
                </Col>
            </Row>
            <Row>
                <UserVans />
            </Row>
            <Row>
                <UserBookings />
            </Row>
        </Container>
    );
};

export default ProfilePage;
