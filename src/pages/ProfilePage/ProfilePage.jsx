import { Container, Row } from "react-bootstrap";
import HostButton from "../../components/HostButton/HostButton";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserVans from "../../components/UserVans/UserVans";
import UserBookings from "../../components/UserBookings/UserBookings";

const ProfilePage = () => {
    return (
        <Container>
            <Row>
                <ProfileCard />
                <HostButton />
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
