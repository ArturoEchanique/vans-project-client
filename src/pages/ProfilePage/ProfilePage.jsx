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
    const [selectedOption, setSelectedOption] = useState("favorites")
    const [start, setStart] = useState(true)

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
        setStart(false)
    }, [user])

    const setView = (view) => {
        return () => {
            setSelectedOption(view)
        }
    }

    const getProfileView = (view) => {
        switch (view) {
            case "favorites":
                return <FavoritesVans id="favorites-vans" {...userDetails} />
            case "userBookings":
                return <UserBookings id="user-bookings" {...userDetails} />
            case "vans":
                return <UserVans />
            case "ownerBookings":
                return <OwnerBookings {...userDetails} />
            case "barChart":
                return <BarChart {...userDetails} />
        }
    }

    const getButton = (view, title) => (
        <button className={selectedOption === view ? "button-profile current" : "button-profile"} onClick={setView(view)}>
            {title}
        </button>
    )

    // const { role } = userDetails

    return (
        <section className="top-margin">
            <Container>
                <Row className="d-flex justify-content-start">
                    <Col sm={4}>
                        <div className="background-profile-detalis">
                            <ProfileCard {...userDetails} />
                            <Row>{getButton("favorites", "Favorites")}</Row>
                            <Row>{getButton("userBookings", "Your Bookings")}</Row>

                            {(userDetails?.role === "OWNER" || userDetails?.role === "ADMIN") && (
                                <>
                                    <Row>{getButton("vans", "Your Vans")}</Row>
                                    <Row>{getButton("ownerBookings", "Booked from you")}</Row>
                                    <Row>{getButton("barChart", "Charts")}</Row>
                                </>
                            )}

                            <hr />
                            <ButtonGroup variant="outline-dark">
                                <HostButton />
                            </ButtonGroup>
                        </div>
                    </Col>

                    <Col className="background-profile-detalis">
                        {getProfileView(selectedOption)}
                        {/* <FavoritesVans id="favorites-vans" {...userDetails} />
                            <UserBookings id="user-bookings" {...userDetails} />
                            {(userDetails?.role === "OWNER" || userDetails?.role === "ADMIN") && (
                                <>
                                    <UserVans />

                                    <OwnerBookings {...userDetails} />

                                    <BarChart {...userDetails} />
                                </>
                            )} */}
                    </Col>
                </Row>
                <DeleteButton />
            </Container>
        </section>
    )
}

export default ProfilePage
