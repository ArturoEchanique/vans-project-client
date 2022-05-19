import { useContext } from "react"
import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import { Navbar, Container, Nav, Offcanvas, Button, NavDropdown, Form, FormControl } from "react-bootstrap"
import "./Navigation.css"

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

    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className=" background-navbar fixed-top">
                    <Container fluid>
                        <Navbar.Brand>
                            <Link to="/" className="nav-link">
                                <img className="logo-nav"id="logo" src="./../images/1.png" alt="vanmeup"  />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle clasName="toggle-nav" aria-controls={`offcanvasNavbar-expand-${expand}`} />
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
                                            <NavLink to="/singup" className="nav-link logo-img">
                                                <img id="logo" src="./../images/signin.png" alt="" srcSet="" />
                                                Sing up
                                            </NavLink>
                                            <NavLink to="/login" className="nav-link  logo-img">
                                                <img id="logo" src="./../images/login.png" alt="" srcSet="" />
                                                Login
                                            </NavLink>
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
