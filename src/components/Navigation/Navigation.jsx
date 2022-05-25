import { useEffect, useState, useContext } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import { Navbar, Container, Nav, Offcanvas, Row, Col, Button, NavDropdown, Form, FormControl, Dropdown, Modal } from "react-bootstrap"
import "./Navigation.css"
import SignupForm from "../SignupForm/SingupForm"
import Loginform from "../LoginForm/LoginForm"
import CityAndDate from "../CityAndDate/CityAndDate"

const Navigation = ({ setFilterInfo, filterData, hideFilter }) => {
    const location = useLocation()

    const { pathname } = location

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
    console.log("user is", user)

    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className=" background-navbar fixed-top navBarMain">
                    <div className="rowTest">
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
                        <Row className="">
                            <Col xs={3} className="d-flex align-items-center justify-content-start">
                                <Navbar.Brand>
                                    <Link to="/" className="nav-link">
                                        <img className="logo-nav" id="logo" src="./../images/VANMEUP.png" alt="vanmeup" />
                                    </Link>
                                </Navbar.Brand>
                            </Col>
                            <Col xs={6} className="d-flex align-items-center justify-content-center" style={{ padding: "0px", margin: "0px" }}>
                                {pathname !== "/" && pathname !== "/results" && <CityAndDate filterData={filterData} setFilterInfo={setFilterInfo} handleDatesChange={setFilterInfo}></CityAndDate>}
                            </Col>
                            <Col xs={3} className="d-flex align-items-center justify-content-end">
                                <NavDropdown
                                    align="end"
                                    className="myDropDown"
                                    eventKey={1}
                                    title={<img className="dropdownIcon" src={userDetails?.imageUrl ? userDetails.imageUrl : "https://i.stack.imgur.com/34AD2.jpg"} alt="user pic" />}
                                    id="basic-nav-dropdown"
                                >
                                    <Dropdown.Item>
                                        <NavLink to="/become-host" className="nav-link  logo-img">
                                            Become Host
                                        </NavLink>
                                    </Dropdown.Item>

                                    {isLoggedIn ? (
                                        <Dropdown.Item>
                                            <div className="nav-link  logo-img" onClick={logOutUser}>
                                                Log out
                                            </div>
                                        </Dropdown.Item>
                                    ) : (
                                        <div id="navi">
                                            <Dropdown.Item>
                                                <button id="logo1" onClick={openRegisterModal} className=" nav-link  logo-img active">
                                                    Sing up
                                                </button>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <button id="logo1" onClick={openLoginModal} className="nav-link  logo-img active">
                                                    Log in
                                                </button>
                                            </Dropdown.Item>
                                        </div>
                                    )}
                                    {user && (
                                        <Dropdown.Item>
                                            <NavLink to="/profile" className="nav-link justify-content-end  logo-img">
                                                My profile
                                            </NavLink>
                                        </Dropdown.Item>
                                    )}
                                    {user && (
                                        <Dropdown.Item>
                                            <NavLink to="/profile/messages" className="nav-link justify-content-end  logo-img">
                                                Messages
                                            </NavLink>
                                        </Dropdown.Item>
                                    )}
                                    {user?.role == "ADMIN" && (
                                        <Dropdown.Item>
                                            <NavLink to="/admin" className="nav-link  logo-img">
                                                Control panel
                                            </NavLink>
                                        </Dropdown.Item>
                                    )}
                                </NavDropdown>
                            </Col>
                        </Row>

                        {/* <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                D
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item ><NavLink to="/become-host" className="nav-link  logo-img">
                                    Become Host
                                </NavLink>
                                </Dropdown.Item>

                                {isLoggedIn ? (
                                    <Dropdown.Item>
                                        <div className="nav-link  logo-img" onClick={logOutUser}>
                                            Log out
                                        </div>
                                    </Dropdown.Item>
                                ) : (
                                    <div id="navi">
                                        <Dropdown.Item>
                                            <button id="logo1" onClick={openRegisterModal} className=" nav-link  logo-img active">
                                                Sing up
                                            </button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <button id="logo1" onClick={openLoginModal} className="nav-link  logo-img active">
                                                Log in
                                            </button>
                                        </Dropdown.Item>
                                    </div>
                                )}
                                {user && (
                                    <Dropdown.Item>
                                        <NavLink to="/profile" className="nav-link justify-content-end  logo-img">
                                            My profile
                                        </NavLink>
                                    </Dropdown.Item>
                                )}
                                {user && (
                                    <Dropdown.Item>
                                        <NavLink to="/profile/messages" className="nav-link justify-content-end  logo-img">
                                            Messages
                                        </NavLink>
                                    </Dropdown.Item>
                                )}
                                {user?.role == "ADMIN" && (
                                    <Dropdown.Item>
                                        <NavLink to="/admin" className="nav-link  logo-img">
                                            Control panel
                                        </NavLink>
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown> */}
                        {/* <Navbar.Toggle className="toggle-nav" aria-controls={`offcanvasNavbar-expand-${expand}`} />
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
                                                <img id="logo" src="./../images/profile.png" alt="" srcSet="" />
                                                Hello,{user.username}
                                            </NavLink>
                                        )}
                                        {user && (
                                            <NavLink to="/profile/messages" className="nav-link justify-content-end  logo-img">
                                                <img id="logo" src="./../images/mensaje.png" alt="" srcSet="" />
                                                Messages
                                            </NavLink>
                                        )}
                                        <NavLink to="/results" className="nav-link  logo-img">
                                            <img id="logo" src="./../images/results.png" alt="" srcSet="" />
                                            Search
                                        </NavLink>
                                        <NavLink to="/become-host" className="nav-link  logo-img">
                                            <img id="logo" src="./../images/becomehost.png" alt="" srcSet="" />
                                            Become Host
                                        </NavLink>

                                        {user?.role == "ADMIN" && (
                                            <NavLink to="/admin" className="nav-link  logo-img">
                                                <img id="logo" src="./../images/admin.png" alt="" srcSet="" />
                                                Control panel
                                            </NavLink>
                                        )}
                                    </Nav>
                                </Row>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas> */}
                    </div>
                </Navbar>
            ))}
        </>
    )
}

export default Navigation
