import { useState, useContext, useEffect } from "react"
import Geocode from "react-geocode"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import "./HomePage.css"
import CityAndDate from "../../components/CityAndDate/CityAndDate"


const HomePage = ({ setFilterInfo, filterData, }) => {
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
            }
        )
    }

    return (
        <section className="homeMain">
            <div className="homeContentMain">
                    <h1 className="findAVan">Find a van in seconds, drive your home</h1>
                <div className="homeSearchMain" >
                        <h3>Where are you going?</h3>
                    <div className="cityAndDateContainer">
                        <CityAndDate filterData={filterData} setFilterInfo={setFilterInfo} handleDatesChange={setFilterInfo}></CityAndDate>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage
