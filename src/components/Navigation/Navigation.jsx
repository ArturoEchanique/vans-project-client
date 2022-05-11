import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

const Navigation = () => {
    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="nav-link">
                        VANS-PROJECT
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            HOME
                        </NavLink>
                        {
                            isLoggedIn
                                ?
                                <div className="nav-link" onClick={logOutUser}>Log out</div>
                                :
                                <>
                                    <NavLink to="/singup" className="nav-link">Sing up</NavLink>
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </>
                        }

                        {
                            user && <NavLink to="/" className="nav-link justify-content-end">helo, {user.username}</NavLink>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
