import { useState } from "react"
import { useContext } from "react"
import Geocode from "react-geocode"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import DatePicker from "../../components/DatePicker/DatePicker"
import { Container, Button, Row, Col, Card } from "react-bootstrap"
import "./HomePage.css"

const HomePage = ({ setFilterInfo, filterData }) => {
    const { user, logOutUser } = useContext(AuthContext)

    const [geoData, setGeoData] = useState({
        address: filterData.address,
    })
    const navigate = useNavigate()
    const today = new Date()
    let tomorrow = new Date(today)
    tomorrow = tomorrow.setDate(today.getDate() + 1)

    const searchVansClicked = (e) => {
        e.preventDefault()
        Geocode.setApiKey("AIzaSyAgl6fbZLuPOLVZf5xRxKGM6CcpkXf_FEc")

        console.log("geodata is...", geoData)
        Geocode.fromAddress(`${geoData.street}, ${geoData.address},${geoData.country}`).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location
                console.log("geocode results are:", "lat", lat, "lng,", lng)

                setFilterInfo({ ...filterData, address: geoData.address, mapInitLocationX: lat, mapInitLocationY: lng })
                navigate("/results")
            },
            (error) => {
                console.error(error)
                navigate("/results")
                // navigate('/results')
            }
        )
    }

    const handleFilterChange = (e) => {
        e.preventDefault()
    }

    const handleStreetChange = (e) => {
        const { name, value } = e.currentTarget
        setFilterInfo({ ...filterData, address: value })
        // const geoForn = { ...geoData, address: value }
        setGeoData({ ...geoData, address: value })
    }

    const { address, mapInitLocationX, mapInitLocationY } = filterData

    return (
        <>
            <section className="home-background nav-margin">
                <Container className="">
                    {/* d-flex flex-column justify-content-center */}
                    <Row className="mb-3">
                        <Col className="">
                            <h1 className="title">VAN ME UP!</h1>
                        </Col>
                    </Row>
                    <Row className="background-row">
                        <Row className="mb-3 ">
                            <Col className="d-flex justify-content-center">
                                <h3>Choose where and when</h3>
                            </Col>
                        </Row>
                        <Col className="d-flex justify-content-center">
                            <>
                                <form>
                                    <label>
                                        <input className="imput-location" type="text" value={address} name="country" onChange={handleStreetChange} />
                                    </label>
                                </form>
                            </>
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
                    {!user ? (
                        <Row className="d-flex d-flex justify-content-center row-cards">
                            <Card className="card-style" style={{ width: "8rem", height: "auto" }}>
                                <Card.Img variant="top" src="./../images/signin.png" />
                                <Card.Body className="d-flex justify-content-center">
                                    <Link to="/singup" className="nav-link logo-img">
                                        <Card.Title>Signup</Card.Title>
                                    </Link>
                                </Card.Body>
                            </Card>
                            <Card className="card-style" style={{ width: "8rem", height: "auto" }}>
                                <Card.Img variant="top" src="./../images/login.png" />
                                <Card.Body className="d-flex justify-content-center">
                                    <Link to="/login" className="nav-link  logo-img">
                                        <Card.Title>Login</Card.Title>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Row>
                    ) : (
                        <Row className="d-flex d-flex justify-content-center row-cards">
                            <Card className="card-style" style={{ width: "8rem", height: "auto" }}>
                                <Card.Img variant="top" src="./../images/logout.png" />
                                <Card.Body className="d-flex justify-content-center">
                                    <Button variant="light" onClick={logOutUser}>
                                        <Card.Title>logout</Card.Title>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Row>
                    )}
                </Container>
            </section>
        </>
    )
}

export default HomePage
