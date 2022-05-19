import { useContext } from "react"
import { useEffect, useState } from "react"

import { Container, Row, Col, ButtonGroup } from "react-bootstrap"
import BarChart from "../../components/Charts/Charts"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import UserVans from "../../components/UserVans/UserVans"
import HostButton from "../../components/HostButton/HostButton"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import UserBookings from "../../components/UserBookings/UserBookings"
import OwnerBookings from "../../components/OwnerBookings/OwnerBookings"
import FavoritesVans from "../../components/FavoritesVans/FavoritesVans"
import DeleteButton from "../../components/DeleteUserButton/DeleteUserButton"

import "./ProfilePage.css"

const ProfilePage = () => {
    const { user } = useContext(AuthContext)

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

    // const { role } = userDetails

    return (
        <section className="top-margin">
            <Container>
                <Row className="d-flex justify-content-start">
                    <Col sm={4}>
                        <div className="background-profile-detalis">
                            <ProfileCard {...userDetails} />
                            <ButtonGroup variant="outline-dark">
                                <HostButton />
                                <DeleteButton />
                            </ButtonGroup>
                        </div>
                    </Col>
                    
                    <Col className="background-profile-detalis">
                        <div className="Profile-details">
                            <FavoritesVans {...userDetails} />
                            <UserBookings {...userDetails} />
                            {(userDetails?.role === "OWNER" || userDetails?.role === "ADMIN") && (
                                <>
                                    <Row>
                                        <p>vans</p>
                                        <UserVans />
                                    </Row>
                                    <Row>
                                        <OwnerBookings {...userDetails} />
                                    </Row>
                                    <Row>
                                        <BarChart {...userDetails} />
                                    </Row>
                                </>
                            )}
                            </div>
                        </Col>
                   
                </Row>
            </Container>
        </section>
    )
}

export default ProfilePage
