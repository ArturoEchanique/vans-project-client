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
    const [showOffCanvas, setShowOffCanvas] = useState(false)

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
    const handleLogout = () => {
        setShowOffCanvas(false)
        logOutUser()
    }
    const handleSignup = () => {
        setShowOffCanvas(false)
        openRegisterModal()
    }
    const handleLogin = () => {
        setShowOffCanvas(false)
        openLoginModal()
    }


    console.log("user is", user)

    return (
        <>
            {[false].map((expand) => (
                <Navbar collapseOnSelect
                    as="nav" key={expand} expand={expand} className=" ">
                    <div className="navigationMainContainer">
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
                        <div className="logoContainer">
                            <Navbar.Brand>
                                <Link to="/" className="nav-link">
                                    <img className="logo-nav" id="logo" src="./../images/VANMEUP.png" alt="vanmeup" />
                                </Link>
                            </Navbar.Brand>
                        </div>
                        <div className="navSearchBar">
                                {pathname !== "/" && pathname !== "/results" && <CityAndDate filterData={filterData} setFilterInfo={setFilterInfo} handleDatesChange={setFilterInfo}></CityAndDate>}
                        </div>
                        <div className="becomeAndProfile">
                            <div className="becomeHost">
                                <NavLink onClick={() => setShowOffCanvas(false)} to="/become-host" className="">
                                    <button
                                        className={"becomeOwnerButton"}
                                        id="showFilters"
                                        type="checkbox"
                                        variant={"light"}

                                        name="showFilters"
                                    >
                                        <img className="becomeOwnerIcon" src="./../../images/vanIcon3.png"></img>
                                        <h7 id="hostBtn">
                                            Become a Host
                                        </h7>
                                    </button>
                                </NavLink>
                            </div>
                            <div className="dropDownContainer">
                                <NavDropdown
                                    align="end"
                                    className="myDropDown"
                                    eventKey={1}
                                    title={<>                                    <img className="dropdownHamIcon" src={"data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%280, 0, 0, 0.55%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e"} alt="user pic" />
                                        <img className="dropdownIcon" src={(userDetails?.imageUrl && user) ? userDetails.imageUrl : "https://i.stack.imgur.com/34AD2.jpg"} alt="user pic" /></>}
                                    id="basic-nav-dropdown"
                                >
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
                                    <hr style={{ margin: "8px" }}></hr>
                                    <Dropdown.Item>
                                        <NavLink to="/" className="nav-link justify-content-end  logo-img">
                                            Home
                                        </NavLink>
                                    </Dropdown.Item>
                                    {user && (
                                        <>
                                            <Dropdown.Item>
                                                <NavLink to="/profile" className="nav-link justify-content-end  logo-img">
                                                    My profile
                                                </NavLink>
                                            </Dropdown.Item>
                                        </>
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
                                    <Dropdown.Item>
                                        <NavLink to="/results" className="nav-link justify-content-end  logo-img">
                                            Search
                                        </NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <NavLink to="/become-host" className="nav-link justify-content-end  logo-img">
                                            Become a Host
                                        </NavLink>
                                    </Dropdown.Item>
                                </NavDropdown>
                            </div>
                        </div>
                    </div >
                </Navbar >
            ))
            }
        </>
    )
}

export default Navigation
