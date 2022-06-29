import { useContext } from "react"
import { useEffect, useState } from "react"

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

import { Container, Row, Col, Button, ButtonGroup, Card, Modal } from "react-bootstrap"
import NewVanForm from "../../components/NewVanForm/NewVanForm"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

import Loginform from "../../components/LoginForm/LoginForm"

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

    const [showModal, setShowModal] = useState(false)
    const [showModals, setShowModals] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
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
                    <Col xs={12} md={5} lg={4}>
                        <div>
                            <ProfileCard {...userDetails} />
                            <div className="buttons-shortcuts">
                                <button className="message-btn">
                                    <Link to="/profile/messages">
                                        <img src="./images/mensaje.png" alt="" />
                                    </Link>
                                </button>
                                {(userDetails?.role === "OWNER" || userDetails?.role === "ADMIN") && (
                                    <button onClick={openModal} className="message-btn">
                                        <img src="./images/becomehost.png" alt="" />
                                    </button>
                                )}
                            </div>

                            <hr />
                            <div className="profileButtonsMain">
                                <Row>{getButton("favorites", "Favorites")}</Row>
                                <Row>{getButton("userBookings", "Your Bookings")}</Row>

                                {(userDetails?.role === "OWNER" || userDetails?.role === "ADMIN") && (
                                    <>
                                        <Row>{getButton("vans", "Your Vans")}</Row>
                                        <Row>{getButton("ownerBookings", "Booked from you")}</Row>
                                        <Row>{getButton("barChart", "Charts")}</Row>
                                    </>
                                )}
                            </div>

                        </div>
                    </Col>

                    <Col >
                        {getProfileView(selectedOption)}
                    </Col>
                    <Modal show={showModal} onHide={closeModal}>
                        <div className="modal1">
                            <Modal.Header closeButton>
                                <Modal.Title>Add a new van</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NewVanForm fireFinalActions={fireFinalActions} />
                            </Modal.Body>
                        </div>
                    </Modal>
                </Row>
            </Container>
        </section>
    )
}
export default ProfilePage
