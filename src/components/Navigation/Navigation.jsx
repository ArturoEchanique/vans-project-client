import './Navigation.css'
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
                        <img id="logo" src="https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652280470/LOGO_CUADRADO-VMP_r997hc.png" alt="" srcset="" />
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
                                <>
                                    <div className="nav-link" onClick={logOutUser}>Log out</div>
                                    <NavLink to="/newvan" className="nav-link">
                                        new van
                                    </NavLink>
                                    <NavLink to="/:van_id/edit" className="nav-link">
                                        edit van?
                                    </NavLink>
                                </>
                                :
                                <>
                                    <NavLink to="/singup" className="nav-link">Sing up</NavLink>
                                    <NavLink to="/login" className="nav-link">Login</NavLink>

                                </>
                        }

                        {
                            user && <NavLink to="/profile" className="nav-link justify-content-end">hello, {user.username}</NavLink>
                        }
                        <NavLink to="/results" className="nav-link">
                            results
                        </NavLink>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
