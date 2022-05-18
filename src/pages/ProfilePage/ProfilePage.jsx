<<<<<<< HEAD
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
import BarChart from "../../components/Charts/Charts";

=======
import { useContext } from "react"
import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import UserVans from "../../components/UserVans/UserVans"
import HostButton from "../../components/HostButton/HostButton"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import UserBookings from "../../components/UserBookings/UserBookings"
import OwnerBookings from "../../components/OwnerBookings/OwnerBookings"
import FavoritesVans from "../../components/FavoritesVans/FavoritesVans"
import DeleteButton from "../../components/DeleteUserButton/DeleteUserButton"
>>>>>>> bba9f07604401c0e912af1d56a7215f8b831dc6e

const ProfilePage = () => {
    const { user } = useContext(AuthContext)

<<<<<<< HEAD
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



=======
    const [userDetails, setUserDetails] = useState({})

    const getUser = () => {
        userService
            .getOneUser(user._id)

            .then(({ data }) => {
                setUserDetails(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getUser()
    }, [user])

    const { role } = userDetails

>>>>>>> bba9f07604401c0e912af1d56a7215f8b831dc6e
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

<<<<<<< HEAD
            <Row>
                <OwnerBookings {...userDetails} />
            </Row>
            <Row>
                <BarChart {...userDetails} />
            </Row>

=======
            {(role === "OWNER" || role === "ADMIN") && (
                <Row>
                    <OwnerBookings {...userDetails} />
                </Row>
            )}
>>>>>>> bba9f07604401c0e912af1d56a7215f8b831dc6e
        </Container>
    )
}

export default ProfilePage
