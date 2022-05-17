import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HostButton from "../../components/HostButton/HostButton";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import OwnerBookings from "../../components/OwnerBookings/OwnerBookings";
import FavoritesVans from "../../components/FavoritesVans/FavoritesVans";
import UserBookings from "../../components/UserBookings/UserBookings";
import UserVans from "../../components/UserVans/UserVans";
import userService from "../../services/user.service";


const AdminEditUserPage = () => {
    const { _id } = useParams();

    const [userDetails, setUserDetails] = useState({});

    const getUser = () => {
        userService
            .getOneUser(_id)

            .then(({ data }) => {
                setUserDetails(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <ProfileCard {...userDetails} />
                </Col>
                <Col>
                    <HostButton />
                </Col>
            </Row>
            <Row>
                <FavoritesVans {...userDetails} />
            </Row>
            <Row>
                <UserBookings {...userDetails} />
            </Row>
            <Row>
                <UserVans {...userDetails} />
            </Row>

            <Row>
                <OwnerBookings {...userDetails} />
            </Row>
        </Container>
    );
};

export default AdminEditUserPage;
