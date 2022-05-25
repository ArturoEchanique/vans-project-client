import { useEffect, useState, useContext } from "react"
import { NavLink, Link } from "react-router-dom"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import { Navbar, Container, Nav, Offcanvas, Row, Button, NavDropdown, Form, FormControl, Modal } from "react-bootstrap"
import "./Navigation.css"
import SignupForm from "../SignupForm/SingupForm"
import Loginform from "../LoginForm/LoginForm"
import CityAndDate from "../CityAndDate/CityAndDate"

const Navigation = ({setFilterInfo, filterData}) => {
    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)

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
        if (user) getUser()
    }, [user])

    const [showRegisterModal, setShowRegisterModal] = useState(false)

    const [showLoginModal, setShowLoginModal] = useState(false)

    const openRegisterModal = () => setShowRegisterModal(true)
    const closeRegisterModal = () => setShowRegisterModal(false)

    const openLoginModal = () => setShowLoginModal(true)
    const closeLoginModal = () => setShowLoginModal(false)

    const fireFinalActions = () => {
        closeRegisterModal()
    }
    // const fireFinalAction = () => {
    //     console.log("firing final actions")
    //     closeModals()

    // }

    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className=" background-navbar fixed-top navBarMain">
                    <Container fluid>
                        <Modal className="modal-signin" show={showRegisterModal} onHide={closeRegisterModal}>
                            <div className="modal1">
                                <Modal.Header closeButton>
                                    <Modal.Title>Register</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <SignupForm closeModal={closeRegisterModal} />
                                </Modal.Body>
                            </div>
                        </Modal>
                        <Modal show={showLoginModal} onHide={closeLoginModal}>
                            <div className="modal1">
                                <Modal.Header closeButton>
                                    <Modal.Title>Log in</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Loginform closeModal={closeLoginModal} />
                                </Modal.Body>
                            </div>
                        </Modal>
                        <Navbar.Brand>
                            <Link to="/" className="nav-link">
                                <img className="logo-nav" id="logo" src="./../images/2.png" alt="vanmeup" />
                            </Link>
                        </Navbar.Brand>


                        <CityAndDate filterData={filterData} setFilterInfo={setFilterInfo} handleDatesChange={setFilterInfo}></CityAndDate>
                        <Navbar.Toggle className="toggle-nav" aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className="canvas-tittle" id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    WELCOME
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Row>
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <NavLink to="/" className="nav-link  logo-img">
                                            <img id="logo" src="./../images/home.png" alt="" srcSet="" />
                                            Home
                                        </NavLink>
                                        {isLoggedIn ? (
                                            <>
                                                <div className="nav-link  logo-img" onClick={logOutUser}>
                                                    <img id="logo" src="./../images/logout.png" alt="" srcSet="" />
                                                    Log out
                                                </div>
                                            </>
                                        ) : (
                                            <div id="navi">
                                                <button id="logo1" onClick={openRegisterModal} className=" nav-link  logo-img active">
                                                    <img id="logo" src="./../images/signin.png" alt="" srcSet="" />
                                                    Sing up
                                                </button>

                                                <button id="logo1" onClick={openLoginModal} className="nav-link  logo-img active">
                                                    <img id="logo" src="./../images/login.png" alt="" srcSet="" />
                                                    Log in
                                                </button>
                                            </div>

                                        )}
                                        {user && (
                                            <NavLink to="/profile" className="nav-link justify-content-end  logo-img">
                                                <img id="logo" src="./../images/perfil.png" alt="" srcSet="" />
                                                Hello,{user.username}
                                            </NavLink>
                                        )}
                                        {user && (
                                            <NavLink to="/profile/messages" className="nav-link justify-content-end  logo-img">
                                                <img id="logo" src="./../images/perfil.png" alt="" srcSet="" />
                                                Messages
                                            </NavLink>
                                        )}
                                        <NavLink to="/results" className="nav-link  logo-img">
                                            <img id="logo" src="./../images/results.png" alt="" srcSet="" />
                                            Search
                                        </NavLink>
                                        <NavLink to="/become-host" className="nav-link  logo-img">
                                            <img id="logo" src="./../images/host.png" alt="" srcSet="" />
                                            Become Host
                                        </NavLink>

                                        {user?.role == "ADMIN" && (
                                            <NavLink to="/admin" className="nav-link  logo-img">
                                                <img id="logo" src="./../images/admin.png" alt="" srcSet="" />
                                                Admin
                                            </NavLink>
                                        )}
                                    </Nav>
                                </Row>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

export default Navigation
