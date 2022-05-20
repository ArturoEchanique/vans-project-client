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
import { Link } from "react-router-dom"

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
                            <FavoritesVans id="favorites-vans" {...userDetails} />
                            <UserBookings id="user-bookings" {...userDetails} />
                            {(userDetails?.role === "OWNER" || userDetails?.role === "ADMIN") && (
                                <>
                                    <Row className="g-4 mt-5" xs={2}>
                                        <h3 className="favorite">Your Vans</h3>
                                        <hr />
                                        <UserVans />
                                    </Row>
                                    <Row>
                                        <OwnerBookings {...userDetails} />
                                    </Row>
                                    <Row className="mt-5">
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
