import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HostButton from "../../components/HostButton/HostButton";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import OwnerBookings from "../../components/OwnerBookings/OwnerBookings";
import FavoritesVans from "../../components/FavoritesVans/FavoritesVans";
import UserBookings from "../../components/UserBookings/UserBookings";

import userService from "../../services/user.service";
import AdminUserVans from "../../components/AdminUserVans/AdminUserVans";

import Loader from "../../components/Loader/Loader";

const AdminEditUserPage = () => {
    const { _id } = useParams();

    const [userDetails, setUserDetails] = useState(undefined);

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

    return userDetails === undefined ? (
        <Loader />
    ) : (
        <Container>
            <Row>
                <Col>
                    <ProfileCard {...userDetails} />
                </Col>
            </Row>

            <Row>
                <UserBookings {...userDetails} />
            </Row>
            <Row>
                <h3>vans</h3>

                <AdminUserVans {...userDetails} />
            </Row>

            <Row>
                <OwnerBookings {...userDetails} />
            </Row>
        </Container>
    );
};

export default AdminEditUserPage;
