import { Container, Row, Col } from "react-bootstrap";
import HostButton from "../../components/HostButton/HostButton";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserVans from "../../components/UserVans/UserVans";
import UserBookings from "../../components/UserBookings/UserBookings";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import { useEffect, useState } from "react";
import OwnerBookings from "../../components/OwnerBookings/OwnerBookings";
import FavoritesVans from "../../components/FavoritesVans/FavoritesVans";
import DeleteButton from "../../components/DeleteUserButton/DeleteUserButton";


const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState({});

    const getUser = () => {
        userService
            .getOneUser(user._id)

            .then(({ data }) => {
                setUserDetails(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUser();
    }, [user]);

    const { role } = userDetails;

    return (
        <Container>
            <Row>
                <Col>
                    <ProfileCard {...userDetails} />
                </Col>
                {role === "USER" && (
                    <Col>
                        <HostButton />
                    </Col>
                )}
                <Col>
                    <DeleteButton />
                </Col>
                {/* <Col>
                    <EditButton />
                </Col> */}
            </Row>
            <Row>
                <FavoritesVans {...userDetails} />
            </Row>
            <Row>
                <UserBookings {...userDetails} />
            </Row>
            <Row>
                <p>vans</p>
                <UserVans />
            </Row>

            {(role === "OWNER" || role === "ADMIN") && (
                <Row>
                    <OwnerBookings {...userDetails} />
                </Row>
            )}
        </Container>
    );
};

export default ProfilePage;
