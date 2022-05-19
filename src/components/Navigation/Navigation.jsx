import { useContext } from "react"
import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import { Navbar, Container, Nav, Offcanvas, Button, NavDropdown, Form, FormControl, Modal } from "react-bootstrap"
import "./Navigation.css"
import SignupForm from "../SignupForm/SingupForm"
import Loginform from "../LoginForm/LoginForm"


const Navigation = () => {
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

    const [showModal, setShowModal] = useState(false)

    const [showModals, setShowModals] = useState(false)


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const openModals = () => setShowModals(true)
    const closeLoginModal = () => setShowModals(false)

    const fireFinalActions = () => {
        closeModal()


    }
    // const fireFinalAction = () => {
    //     console.log("firing final actions")
    //     closeModals()

    // }

    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className=" background-navbar fixed-top">
                    <Container fluid>
                        <Modal show={showModal} onHide={closeModal}>
                            <div className="modal1">
                                <Modal.Header closeButton>
                                    <Modal.Title>Register</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <SignupForm closeModal={closeModal} />
                                </Modal.Body>
                            </div>
                        </Modal>
                        <Modal show={showModals} onHide={closeModal}>
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
                                <img className="logo-nav"id="logo" src="./../images/1.png" alt="vanmeup"  />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle className="toggle-nav" aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className="canvas-tittle" id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    WELCOME
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
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
                                        <>

                                            <button id="logo1" onClick={openModal} className="  logo-img" >
                                                <img id="logo" src="./../images/signin.png" alt="" srcSet="" />
                                                Sing up
                                            </button>

                                            <button id="logo1" onClick={openModals} className="  logo-img" >
                                                <img id="logo" src="./../images/login.png" alt="" srcSet="" />
                                                Log in
                                            </button>

                                        </>
                                    )}
                                    {user && (
                                        <NavLink to="/profile" className="nav-link justify-content-end  logo-img">
                                            <img id="logo" src="./../images/perfil.png" alt="" srcSet="" />
                                            Hello,{user.username}
                                        </NavLink>
                                    )}
                                    <NavLink to="/results" className="nav-link  logo-img">
                                        <img id="logo" src="./../images/results.png" alt="" srcSet="" />
                                        Results
                                    </NavLink>

                                    {user?.role == "ADMIN" && (
                                        <NavLink to="/admin" className="nav-link  logo-img">
                                            <img id="logo" src="./../images/admin.png" alt="" srcSet="" />
                                            Admin
                                        </NavLink>
                                    )}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

export default Navigation
