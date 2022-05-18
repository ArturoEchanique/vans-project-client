import { Container } from "react-bootstrap";
import { useState } from "react"
import DatePicker from "../../components/DatePicker/DatePicker";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";



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
        Geocode.setApiKey("AIzaSyAgl6fbZLuPOLVZf5xRxKGM6CcpkXf_FEc");

        const geoForn = { ...geoData }
        console.log("geodata is...", geoData)
        Geocode
            .fromAddress(`${geoData.street}, ${geoData.address},${geoData.country}`)
            .then((response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log("geocode results are:", "lat", lat, "lng,", lng)

                setFilterInfo({ ...filterData, address: "barcelona", mapInitLocationX: lat, mapInitLocationY: lng })
                navigate('/results')

            },
                (error) => {
                    console.error(error)
                    navigate('/results')
                    // navigate('/results')
                }
            );
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

    const { address, mapInitLocationX, mapInitLocationY } = filterData;

    return (
        <Container>
            <hr />
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
    );
};

export default HomePage;
