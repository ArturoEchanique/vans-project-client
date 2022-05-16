import "./Navigation.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import { useEffect, useState } from "react";

const Navigation = () => {
    const { user, logOutUser, isLoggedIn } = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState({});

    const getUser = () => {
        userService
            .getOneUser(user?._id)

            .then(({ data }) => {
                setUserDetails(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUser();
    }, [user]);

    const { role } = userDetails;

   console.log(user);

    

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="nav-link">
                        <img
                            id="logo"
                            src="https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652435796/LOGO-vmup_BUENOREDONDO_tqzye2.png"
                            alt=""
                            srcSet=""
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            HOME
                        </NavLink>
                        {isLoggedIn ? (
                            <>
                                <div className="nav-link" onClick={logOutUser}>
                                    Log out
                                </div>
                                <NavLink to="/newvan" className="nav-link">
                                    new van
                                </NavLink>
                                <NavLink to="/:van_id/edit" className="nav-link">
                                    edit van?
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/singup" className="nav-link">
                                    Sing up
                                </NavLink>
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                            </>
                        )}
                        {user && (
                            <NavLink to="/profile" className="nav-link justify-content-end">
                                helo, {user.username}
                            </NavLink>
                        )}
                        <NavLink to="/results" className="nav-link">
                            results
                        </NavLink>

                        {role == "ADMIN" ? (
                            <NavLink to="/admin" className="nav-link">
                                admin
                            </NavLink>
                        ) : (
                            <NavLink to="/#" className="nav-link">
                            </NavLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
