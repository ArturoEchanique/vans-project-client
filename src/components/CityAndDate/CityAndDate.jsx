import "rsuite/dist/rsuite.css"
import { useState, useContext } from "react"
import "./CityAndDate.css"
import { Button, Col, Row, Form, ToggleButton, Container } from "react-bootstrap"
import Geocode from "react-geocode"
import { useNavigate } from "react-router-dom"
import DatePicker from "../../components/DatePicker/DatePicker"
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from "react-router-dom"

const CityAndDate = ({ filterData, setFilterInfo, startDate, endDate, handleDatesChange, reservedDays }) => {


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

    const handleStreetChange = (e) => {
        const { name, value } = e.currentTarget
        setFilterInfo({ ...filterData, address: value })
        // const geoForn = { ...geoData, address: value }
        setGeoData({ ...geoData, address: value })
    }
    
    const { address, mapInitLocationX, mapInitLocationY } = filterData

    return (
        <div className="cityAndDate">
                <form>
                    <label>
                    <input className="cityAndDateElem" type="text" value={address} name="address" onChange={handleStreetChange}/>
                    </label>
                </form>
                {/* <DatePicker /> */}
            <DatePicker startDate={today} endDate={tomorrow} handleDatesChange={setFilterInfo} />
            <Link  className="cityAndDateSearchButtonLink"to="/results">
                <button
                    className="cityAndDateSearchButton"
                    variant={"light"}
                    onClick={searchVansClicked}
                    id="search">
                    <img className="cityAndDateSearchIcon" src="./../../images/magnifyingGlassIcon.png"></img>
                    &nbsp;<p>Search</p>
                </button>
            </Link>

            {/* <button
                className="cityAndDateSearchButton"
                variant={"light"}
                onClick={searchVansClicked}
                id="search">
                <img className="cityAndDateSearchIcon" src="./../../images/magnifyingGlassIcon.png"></img>
                &nbsp;<p>Search</p>
            </button> */}
        </div>
    )
}

export default CityAndDate



