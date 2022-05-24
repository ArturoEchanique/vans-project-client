import { useState, useContext } from "react"
import Geocode from "react-geocode"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import DatePicker from "../../components/DatePicker/DatePicker"
import { Container, Button, Row, Col, Card } from "react-bootstrap"
import "./HomePage.css"
import CityAndDate from "../../components/CityAndDate/CityAndDate"

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
            <section className="homeMain nav-margin">
                <Container className="">
                    {/* d-flex flex-column justify-content-center */}
                    <Row className="mb-3">
                        <Col className="title-h1">
                        <h1 className="title">Find a van in seconds, you choose the destination</h1>
                        </Col>
                    </Row>
                    <Row className="background-row">
                        <Row className="mb-3 ">
                            <Col className="d-flex justify-content-center">
                                <h3>Where are you going?</h3>
                            </Col>
                        </Row>
                        <Col className="d-flex justify-content-center">
                        <CityAndDate filterData={filterData} setFilterInfo={setFilterInfo} handleDatesChange={setFilterInfo}></CityAndDate>

                            {/* <>
                                <form>
                                    <label>
                                        <input className="input-location" type="text" value={address} name="country" onChange={handleStreetChange} />
                                    </label>
                                </form>
                            </>
                            <>
                                <DatePicker startDate={today} endDate={tomorrow} handleDatesChange={setFilterInfo} />
                            </>
                            <>
                                <Link to="/results">
                                    <Button className="search-button" variant="dark" onClick={searchVansClicked}>Search Vans</Button>
                                </Link>
                            </> */}

                        </Col>
                    </Row>
              
                </Container>
            </section>
    )
}

export default HomePage
