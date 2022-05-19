import { useState } from "react"
import Geocode from "react-geocode"
import { Link } from "react-router-dom"
import { Container, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import DatePicker from "../../components/DatePicker/DatePicker"
import "./HomePage.css"

const HomePage = ({ setFilterInfo, filterData }) => {
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
                            <h3>Sing up</h3>
                        </Link>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Link to="/login" className="nav-link  logo-img">
                            <img id="logo" src="./../images/login.png" alt="" srcSet="" />
                            Login
                        </Link>
                    </Col>
                </Row>
                <form>
                    <label>
                        Search address
                        <input type="text" value={address} name="country" onChange={handleStreetChange} />
                    </label>
                    {/* <input type="submit" value="Submit" /> */}
                </form>
                <DatePicker startDate={today} endDate={tomorrow} handleDatesChange={setFilterInfo} />
                <Button variant="dark">
                    <Link onClick={searchVansClicked} to="/results">Search Vans</Link>
                </Button>
            </Container>
        </section>
    )
}

export default HomePage
