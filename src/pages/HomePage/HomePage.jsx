import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Button, Row, Col } from "react-bootstrap"
import DatePicker from "../../components/DatePicker/DatePicker"
import "./HomePage.css"

const HomePage = ({ setFilterInfo }) => {
    const today = new Date()
    let tomorrow = new Date(today)
    tomorrow = tomorrow.setDate(today.getDate() + 1)

    return (
        <section className="home-background d-flex  align-items-center">
            <Container>
                <Row className="mb-3">
                    <Col className="d-flex justify-content-center">
                        <h1>VAN ME UP!</h1>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="d-flex justify-content-center">
                        <h3>Choose your Dates</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <>
                            <DatePicker startDate={today} endDate={tomorrow} handleDatesChange={setFilterInfo} />
                        </>
                        <>
                            <Button variant="dark">
                                <Link to="/results">Search Vans</Link>
                            </Button>
                        </>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center ">
                        <Link to="/singup" className="nav-link logo-img">
                            <img id="logo" src="./../images/signin.png" alt="" srcSet="" />
                            Sing up
                        </Link>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Link to="/login" className="nav-link  logo-img">
                            <img id="logo" src="./../images/login.png" alt="" srcSet="" />
                            Login
                        </Link>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HomePage
